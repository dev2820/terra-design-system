"use client";

import * as React from "react";

import { createPartContext, useRender, useRovingFocus, type PropsWithRender } from "../core";

export interface TabsState {
  disabled: boolean;
  orientation: "horizontal" | "vertical";
  activationMode: "automatic" | "manual";
}

export interface TabsChangeEventDetails {
  readonly reason: "tab-press" | "focus";
  readonly event: MouseEvent | FocusEvent;
  readonly tab: HTMLButtonElement;
  readonly isCanceled: boolean;
  cancel: () => void;
}

export interface TabsRootProps extends PropsWithRender<
  Omit<React.ComponentProps<"div">, "defaultValue">
> {
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string, eventDetails: TabsChangeEventDetails) => void;
  disabled?: boolean;
  orientation?: TabsState["orientation"];
  activationMode?: TabsState["activationMode"];
  loopFocus?: boolean;
}

interface TabsContextValue {
  id: string;
  value: string | null;
  state: TabsState;
  loopFocus: boolean;
  select: (
    value: string,
    reason: TabsChangeEventDetails["reason"],
    event: MouseEvent | FocusEvent,
    tab: HTMLButtonElement,
  ) => void;
}

const [TabsContext, useTabsContext] = createPartContext<TabsContextValue>("Tabs");

function getStateAttributes(state: TabsState) {
  return {
    "data-disabled": state.disabled ? "" : undefined,
    "data-orientation": state.orientation,
  };
}

function getIds(id: string, value: string) {
  const suffix = encodeURIComponent(value);

  return { tabId: `${id}-tab-${suffix}`, panelId: `${id}-panel-${suffix}` };
}

export function Root(props: TabsRootProps) {
  const {
    value: valueProp,
    defaultValue = null,
    onValueChange,
    disabled = false,
    orientation = "horizontal",
    activationMode = "automatic",
    loopFocus = true,
    id: idProp,
    render,
    ...rest
  } = props;

  const generatedId = React.useId();
  const id = idProp ?? (render?.props as React.ComponentProps<"div">)?.id ?? `${generatedId}-tabs`;
  const [uncontrolledValue, setValue] = React.useState(defaultValue);
  const controlled = valueProp !== undefined;
  const value = controlled ? valueProp : uncontrolledValue;
  const state: TabsState = { disabled, orientation, activationMode };

  function select(
    nextValue: string,
    reason: TabsChangeEventDetails["reason"],
    event: MouseEvent | FocusEvent,
    tab: HTMLButtonElement,
  ) {
    if (disabled || tab.matches(":disabled") || value === nextValue) {
      return;
    }

    let canceled = false;
    const details: TabsChangeEventDetails = {
      reason,
      event,
      tab,
      get isCanceled() {
        return canceled;
      },
      cancel() {
        canceled = true;
      },
    };

    onValueChange?.(nextValue, details);

    if (!controlled && !details.isCanceled) {
      setValue(nextValue);
    }
  }

  const element = useRender({
    defaultTagName: "div",
    render,
    props: rest,
    internalProps: { id, ...getStateAttributes(state) },
  });

  return <TabsContext value={{ id, value, state, loopFocus, select }}>{element}</TabsContext>;
}

export interface TabsListProps extends PropsWithRender<
  Omit<React.ComponentProps<"div">, "aria-orientation" | "role" | "tabIndex">
> {}

export function List(props: TabsListProps) {
  const { render, ...rest } = props;

  const tabs = useTabsContext("List");
  const focusProps = useRovingFocus({
    rootSelector: "[data-tabs-list]",
    itemSelector: "button[data-tabs-tab]",
    selectedSelector: "[data-active]",
    selectedAttribute: "data-active",
    orientation: tabs.state.orientation,
    loopFocus: tabs.loopFocus,
    entryFocus: "selected",
  });

  return useRender({
    defaultTagName: "div",
    render,
    props: rest,
    internalProps: {
      ...getStateAttributes(tabs.state),
      ...focusProps,
      role: "tablist",
      "aria-orientation": tabs.state.orientation,
      "data-tabs-list": "",
    },
  });
}

export interface TabsTabProps extends PropsWithRender<
  Omit<React.ComponentProps<"button">, "aria-selected" | "role" | "tabIndex" | "value">
> {
  value: string;
}

export function Tab(props: TabsTabProps) {
  const { value, disabled: disabledProp = false, id: idProp, render, ...rest } = props;

  const tabs = useTabsContext("Tab");
  const { tabId, panelId } = getIds(tabs.id, value);
  const id = idProp ?? (render?.props as React.ComponentProps<"button">)?.id ?? tabId;
  const pointerDown = React.useRef(false);
  const disabled = tabs.state.disabled || disabledProp;
  const active = tabs.value === value;

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    pointerDown.current = false;

    if (!event.defaultPrevented && !disabled) {
      tabs.select(value, "tab-press", event.nativeEvent, event.currentTarget);
    }
  }

  function handleFocus(event: React.FocusEvent<HTMLButtonElement>) {
    if (
      !event.defaultPrevented &&
      !disabled &&
      !pointerDown.current &&
      tabs.state.activationMode === "automatic"
    ) {
      tabs.select(value, "focus", event.nativeEvent, event.currentTarget);
    }
  }

  return useRender({
    defaultTagName: "button",
    render,
    defaultProps: { "aria-controls": panelId },
    props: { ...rest, type: rest.type ?? "button" },
    internalProps: {
      ...getStateAttributes({ ...tabs.state, disabled }),
      id,
      role: "tab",
      value,
      disabled,
      tabIndex: active && !disabled ? 0 : -1,
      "aria-selected": active,
      "data-tabs-tab": "",
      "data-active": active ? "" : undefined,
      "data-inactive": active ? undefined : "",
      onClick: handleClick,
      onFocus: handleFocus,
      onPointerDown() {
        pointerDown.current = true;
      },
      onPointerCancel() {
        pointerDown.current = false;
      },
      onBlur() {
        pointerDown.current = false;
      },
    },
  });
}

export interface TabsPanelProps extends PropsWithRender<
  Omit<React.ComponentProps<"div">, "hidden" | "role">
> {
  value: string;
}

export function Panel(props: TabsPanelProps) {
  const { value, id: idProp, render, ...rest } = props;

  const tabs = useTabsContext("Panel");
  const { tabId, panelId } = getIds(tabs.id, value);
  const id = idProp ?? (render?.props as React.ComponentProps<"div">)?.id ?? panelId;
  const active = tabs.value === value;

  return useRender({
    defaultTagName: "div",
    render,
    defaultProps: { tabIndex: 0, "aria-labelledby": tabId },
    props: rest,
    internalProps: {
      ...getStateAttributes(tabs.state),
      id,
      role: "tabpanel",
      hidden: !active,
      "data-active": active ? "" : undefined,
      "data-inactive": active ? undefined : "",
    },
  });
}

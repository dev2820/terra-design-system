"use client";

import * as React from "react";

import {
  changeDetails,
  context,
  mergeProps,
  part,
  type ChangeDetails,
  type WithRender,
} from "./shared";
import { useRovingFocus } from "./use-roving-focus";

export interface TabItem {
  value: string;
  disabled?: boolean;
  panel?: boolean;
  tabId?: string;
  panelId?: string;
}

export interface TabsOptions {
  items: readonly TabItem[];
  id?: string | undefined;
  value?: string | null | undefined;
  defaultValue?: string | null | undefined;
  onValueChange?: ((value: string, details: ChangeDetails) => void) | undefined;
  disabled?: boolean | undefined;
  orientation?: "horizontal" | "vertical" | undefined;
  activationMode?: "automatic" | "manual" | undefined;
  loopFocus?: boolean | undefined;
}

export function useTabs(options: TabsOptions) {
  const {
    items,
    disabled = false,
    orientation = "horizontal",
    activationMode = "automatic",
  } = options;
  const generatedId = React.useId();
  const id = options.id ?? `${generatedId}-tabs`;
  const [local, setLocal] = React.useState(options.defaultValue ?? null);
  const controlled = options.value !== undefined;
  const value = controlled ? options.value : local;
  const pointer = React.useRef<string | null>(null);
  const focus = useRovingFocus({
    rootSelector: "[data-hooks-tablist]",
    itemSelector: "button[data-hooks-tab]",
    selectedSelector: "[aria-selected=true]",
    selectedAttribute: "aria-selected",
    orientation,
    loopFocus: options.loopFocus ?? true,
    entryFocus: "selected",
  });

  function itemFor(itemValue: string) {
    const item = items.find((candidate) => candidate.value === itemValue);
    if (!item) throw new Error(`Unknown tab: ${itemValue}`);
    return item;
  }

  function ids(item: TabItem) {
    return {
      tab: item.tabId ?? `${id}-tab-${encodeURIComponent(item.value)}`,
      panel: item.panelId ?? `${id}-panel-${encodeURIComponent(item.value)}`,
    };
  }

  function select(next: string, event: React.SyntheticEvent<HTMLButtonElement>, reason: string) {
    if (
      event.defaultPrevented ||
      disabled ||
      itemFor(next).disabled ||
      event.currentTarget.matches(":disabled") ||
      next === value
    )
      return;
    const details = changeDetails(event.nativeEvent, reason);
    options.onValueChange?.(next, details);
    if (!controlled && !details.isCanceled) setLocal(next);
  }

  return {
    value,
    getRootProps(props: React.ComponentProps<"div"> = {}) {
      return mergeProps(props, { id, "data-orientation": orientation });
    },
    getListProps(props: React.ComponentProps<"div"> = {}) {
      return mergeProps(props, {
        ...focus,
        role: "tablist",
        "aria-orientation": orientation,
        "data-hooks-tablist": "",
      });
    },
    getTabProps(tabValue: string, props: React.ComponentProps<"button"> = {}) {
      const item = itemFor(tabValue);
      const inactive = disabled || item.disabled === true;
      const entry =
        items.find((candidate) => !disabled && !candidate.disabled && candidate.value === value) ??
        items.find((candidate) => !disabled && !candidate.disabled);
      return mergeProps(props, {
        id: ids(item).tab,
        type: "button",
        role: "tab",
        disabled: inactive,
        "data-hooks-tab": "",
        "aria-selected": value === tabValue,
        "aria-controls": item.panel === false ? undefined : ids(item).panel,
        tabIndex: entry?.value === tabValue ? 0 : -1,
        onPointerDown() {
          pointer.current = tabValue;
        },
        onPointerCancel() {
          pointer.current = null;
        },
        onBlur() {
          if (pointer.current === tabValue) pointer.current = null;
        },
        onFocus(event: React.FocusEvent<HTMLButtonElement>) {
          if (activationMode === "automatic" && pointer.current !== tabValue)
            select(tabValue, event, "focus");
        },
        onClick(event: React.MouseEvent<HTMLButtonElement>) {
          pointer.current = null;
          select(tabValue, event, "tab-press");
        },
      });
    },
    getPanelProps(tabValue: string, props: React.ComponentProps<"div"> = {}) {
      const item = itemFor(tabValue);
      return mergeProps(
        { tabIndex: 0, ...props },
        {
          id: ids(item).panel,
          role: "tabpanel",
          "aria-labelledby": ids(item).tab,
          hidden: value !== tabValue,
        },
      );
    },
  };
}

const [Context, useTabsContext] = context<ReturnType<typeof useTabs>>("Tabs");
type RootProps = TabsOptions &
  WithRender<Omit<React.ComponentProps<"div">, keyof TabsOptions | "defaultValue">>;

function Root(props: RootProps) {
  const {
    items,
    id,
    value,
    defaultValue,
    onValueChange,
    disabled,
    orientation,
    activationMode,
    loopFocus,
    ...rest
  } = props;
  const tabs = useTabs({
    items,
    id,
    value,
    defaultValue,
    onValueChange,
    disabled,
    orientation,
    activationMode,
    loopFocus,
  });
  return <Context value={tabs}>{part("div", tabs.getRootProps, rest)}</Context>;
}
function List(props: WithRender<React.ComponentProps<"div">>) {
  return part("div", useTabsContext().getListProps, props);
}
function Tab({
  value,
  ...props
}: Omit<React.ComponentProps<"button">, "value"> & { value: string }) {
  return <button {...useTabsContext().getTabProps(value, props)} />;
}
function Panel({ value, ...props }: WithRender<React.ComponentProps<"div">> & { value: string }) {
  const tabs = useTabsContext();
  return part("div", (userProps) => tabs.getPanelProps(value, userProps), props);
}
export const Tabs = { Root, List, Tab, Panel };

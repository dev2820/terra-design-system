"use client";

import * as React from "react";

import { createPartContext, useRender, type RenderProp } from "../core/index";
import {
  Root as ToggleRoot,
  type ToggleChangeEventDetails,
  type ToggleRootProps,
} from "../toggle/toggle";

export type ToggleGroupChangeEventDetails = ToggleChangeEventDetails;

export interface ToggleGroupState {
  disabled: boolean;
  multiple: boolean;
  orientation: "horizontal" | "vertical";
}

export interface ToggleGroupRootProps extends Omit<
  React.ComponentProps<"div">,
  "aria-orientation" | "defaultValue" | "role" | "tabIndex"
> {
  value?: readonly string[];
  defaultValue?: readonly string[];
  onValueChange?: (value: string[], eventDetails: ToggleGroupChangeEventDetails) => void;
  multiple?: boolean;
  disabled?: boolean;
  orientation?: ToggleGroupState["orientation"];
  loopFocus?: boolean;
  render?: RenderProp;
}

interface ToggleGroupContextValue {
  value: readonly string[];
  state: ToggleGroupState;
  toggle: (value: string, pressed: boolean, eventDetails: ToggleGroupChangeEventDetails) => void;
}

const [ToggleGroupContext, useToggleGroupContext] =
  createPartContext<ToggleGroupContextValue>("ToggleGroup");

const rootSelector = "[data-toggle-group-root]";
const itemSelector = "button[data-toggle-group-item]";

function normalizeValue(value: readonly string[] | undefined, multiple: boolean) {
  const values = [...new Set(value)];

  return multiple ? values : values.slice(0, 1);
}

function getStateAttributes(state: ToggleGroupState) {
  return {
    "data-disabled": state.disabled ? "" : undefined,
    "data-multiple": state.multiple ? "" : undefined,
    "data-orientation": state.orientation,
  };
}

function getItems(root: HTMLElement) {
  return Array.from(root.querySelectorAll<HTMLButtonElement>(itemSelector)).filter(
    (item) => item.closest(rootSelector) === root,
  );
}

function isFocusable(item: HTMLButtonElement) {
  return (
    !item.matches(":disabled") &&
    !item.closest("[inert]") &&
    item.checkVisibility({ visibilityProperty: true })
  );
}

function useGroupFocus(orientation: ToggleGroupState["orientation"], loopFocus: boolean) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const lastFocused = React.useRef<HTMLButtonElement | null>(null);
  const focusWithin = React.useRef(false);

  function syncTabStop() {
    const root = ref.current;

    if (!root) {
      return;
    }

    const items = getItems(root);
    const enabled = items.filter(isFocusable);
    const active = root.ownerDocument.activeElement;

    if (enabled.includes(active as HTMLButtonElement)) {
      lastFocused.current = active as HTMLButtonElement;
      focusWithin.current = true;
    }

    const previous = lastFocused.current;
    const entry =
      (previous && enabled.includes(previous) ? previous : undefined) ??
      enabled.find((item) => item.hasAttribute("data-pressed")) ??
      enabled[0];

    for (const item of items) {
      item.tabIndex = item === entry ? 0 : -1;
    }

    if (!entry) {
      focusWithin.current = false;
    } else if (
      focusWithin.current &&
      !enabled.includes(active as HTMLButtonElement) &&
      (active === root.ownerDocument.body || active === previous)
    ) {
      entry.focus();
    }
  }

  React.useLayoutEffect(() => {
    syncTabStop();

    const root = ref.current;

    if (!root) {
      return undefined;
    }

    // Descendants can mount, reorder or become disabled without rerendering Root.
    // Observe availability changes, but not the tabindex writes made above.
    const observer = new MutationObserver(syncTabStop);
    const attributeFilter = [
      "disabled",
      "hidden",
      "inert",
      "open",
      "class",
      "style",
      "data-pressed",
    ];
    observer.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter });

    for (let ancestor = root.parentElement; ancestor; ancestor = ancestor.parentElement) {
      observer.observe(ancestor, { attributes: true, attributeFilter });
    }

    const resizeObserver = new ResizeObserver(syncTabStop);
    resizeObserver.observe(root);

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
    };
  });

  function getItem(target: EventTarget | null) {
    const item = target instanceof Element ? target.closest<HTMLButtonElement>(itemSelector) : null;

    return item?.closest(rootSelector) === ref.current ? item : null;
  }

  function handleFocusCapture(event: React.FocusEvent<HTMLDivElement>) {
    const item = getItem(event.target);
    focusWithin.current = item !== null;

    if (item) {
      lastFocused.current = item;
      syncTabStop();
    }
  }

  function handleBlurCapture(event: React.FocusEvent<HTMLDivElement>) {
    const item = getItem(event.target);

    if (
      item &&
      !ref.current?.contains(event.relatedTarget) &&
      (event.relatedTarget !== null || isFocusable(item))
    ) {
      focusWithin.current = false;
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (
      event.defaultPrevented ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey
    ) {
      return;
    }

    const item = getItem(event.target);
    const root = ref.current;

    if (!item || !root) {
      return;
    }

    const items = getItems(root).filter(isFocusable);
    const index = items.indexOf(item);

    if (index === -1) {
      return;
    }

    const rtl = getComputedStyle(root).direction === "rtl";
    const previousKey = orientation === "vertical" ? "ArrowUp" : rtl ? "ArrowRight" : "ArrowLeft";
    const nextKey = orientation === "vertical" ? "ArrowDown" : rtl ? "ArrowLeft" : "ArrowRight";
    let nextIndex: number;

    if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = items.length - 1;
    } else if (event.key === previousKey || event.key === nextKey) {
      nextIndex = index + (event.key === nextKey ? 1 : -1);

      if (loopFocus) {
        nextIndex = (nextIndex + items.length) % items.length;
      }
    } else {
      return;
    }

    event.preventDefault();
    items[nextIndex]?.focus();
  }

  return {
    ref,
    onFocusCapture: handleFocusCapture,
    onBlurCapture: handleBlurCapture,
    onKeyDown: handleKeyDown,
  };
}

export function Root(props: ToggleGroupRootProps) {
  const {
    value: valueProp,
    defaultValue,
    onValueChange,
    multiple = false,
    disabled = false,
    orientation = "horizontal",
    loopFocus = true,
    render,
    ...rest
  } = props;
  const [uncontrolledValue, setValue] = React.useState(() =>
    normalizeValue(defaultValue, multiple),
  );
  const controlled = valueProp !== undefined;
  const value = normalizeValue(controlled ? valueProp : uncontrolledValue, multiple);
  const state: ToggleGroupState = { disabled, multiple, orientation };
  const focusProps = useGroupFocus(orientation, loopFocus);

  function toggle(
    itemValue: string,
    pressed: boolean,
    eventDetails: ToggleGroupChangeEventDetails,
  ) {
    if (disabled) {
      return;
    }

    const nextValue = pressed
      ? multiple
        ? [...value, itemValue]
        : [itemValue]
      : value.filter((valueItem) => valueItem !== itemValue);

    onValueChange?.(nextValue, eventDetails);

    if (!controlled && !eventDetails.isCanceled) {
      setValue([...nextValue]);
    }
  }

  const element = useRender({
    defaultTagName: "div",
    render,
    props: rest,
    internalProps: {
      ...getStateAttributes(state),
      ...focusProps,
      role: "group",
      "data-toggle-group-root": "",
    },
  });

  return <ToggleGroupContext value={{ value, state, toggle }}>{element}</ToggleGroupContext>;
}

export interface ToggleGroupItemProps extends Omit<
  ToggleRootProps,
  "defaultPressed" | "onPressedChange" | "pressed" | "tabIndex" | "value"
> {
  value: string;
}

export function Item(props: ToggleGroupItemProps) {
  const { value, disabled: disabledProp = false, ...rest } = props;
  const group = useToggleGroupContext("Item");
  const disabled = group.state.disabled || disabledProp;

  return (
    <ToggleRoot
      {...rest}
      value={value}
      pressed={group.value.includes(value)}
      disabled={disabled}
      onPressedChange={(pressed, eventDetails) => group.toggle(value, pressed, eventDetails)}
      data-toggle-group-item=""
      data-orientation={group.state.orientation}
      tabIndex={0}
    />
  );
}

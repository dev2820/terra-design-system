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

export interface ToggleGroupOptions {
  value?: readonly string[] | undefined;
  defaultValue?: readonly string[] | undefined;
  multiple?: boolean | undefined;
  disabled?: boolean | undefined;
  orientation?: "horizontal" | "vertical" | undefined;
  loopFocus?: boolean | undefined;
  onValueChange?: ((value: string[], details: ChangeDetails) => void) | undefined;
}

export function useToggleGroup(options: ToggleGroupOptions = {}) {
  const { multiple = false, disabled = false, orientation = "horizontal" } = options;
  function normalize(value: readonly string[]) {
    const unique = [...new Set(value)];
    return multiple ? unique : unique.slice(0, 1);
  }
  const [local, setLocal] = React.useState(() => normalize(options.defaultValue ?? []));
  const controlled = options.value !== undefined;
  const value = normalize(options.value ?? local);
  const focus = useRovingFocus({
    rootSelector: "[data-hooks-toggle-group]",
    itemSelector: "button[data-hooks-toggle-item]",
    selectedSelector: "[aria-pressed=true]",
    selectedAttribute: "aria-pressed",
    orientation,
    loopFocus: options.loopFocus ?? true,
  });
  return {
    value,
    getRootProps(props: React.ComponentProps<"div"> = {}) {
      return mergeProps(props, {
        ...focus,
        role: "group",
        "data-hooks-toggle-group": "",
        "data-orientation": orientation,
      });
    },
    getItemProps(itemValue: string, props: React.ComponentProps<"button"> = {}) {
      return mergeProps(props, {
        type: props.type ?? "button",
        value: itemValue,
        disabled: disabled || props.disabled === true,
        "data-hooks-toggle-item": "",
        "aria-pressed": value.includes(itemValue),
        tabIndex: 0,
        onClick(event: React.MouseEvent<HTMLButtonElement>) {
          if (event.defaultPrevented || disabled || event.currentTarget.matches(":disabled"))
            return;
          const next = value.includes(itemValue)
            ? value.filter((v) => v !== itemValue)
            : multiple
              ? [...value, itemValue]
              : [itemValue];
          const details = changeDetails(event.nativeEvent, "click");
          options.onValueChange?.(next, details);
          if (!controlled && !details.isCanceled) setLocal(next);
        },
      });
    },
  };
}

const [Context, useGroup] = context<ReturnType<typeof useToggleGroup>>("ToggleGroup");
function Root(
  props: ToggleGroupOptions &
    WithRender<Omit<React.ComponentProps<"div">, keyof ToggleGroupOptions | "defaultValue">>,
) {
  const {
    value,
    defaultValue,
    multiple,
    disabled,
    orientation,
    loopFocus,
    onValueChange,
    ...rest
  } = props;
  const group = useToggleGroup({
    value,
    defaultValue,
    multiple,
    disabled,
    orientation,
    loopFocus,
    onValueChange,
  });
  return <Context value={group}>{part("div", group.getRootProps, rest)}</Context>;
}
function Item({
  value,
  ...props
}: Omit<React.ComponentProps<"button">, "value"> & { value: string }) {
  return <button {...useGroup().getItemProps(value, props)} />;
}
export const ToggleGroup = { Root, Item };

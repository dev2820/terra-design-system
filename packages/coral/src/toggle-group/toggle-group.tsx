"use client";

import * as React from "react";

import { createPartContext, useRender, useRovingFocus, type RenderProp } from "../core";
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
  const focusProps = useRovingFocus({
    rootSelector,
    itemSelector,
    selectedSelector: "[data-pressed]",
    selectedAttribute: "data-pressed",
    orientation,
    loopFocus,
  });

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

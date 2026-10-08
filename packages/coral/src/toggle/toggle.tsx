"use client";

import * as React from "react";

import { useRender } from "../core/index";

export interface ToggleState {
  pressed: boolean;
  disabled: boolean;
}

export interface ToggleChangeEventDetails {
  readonly reason: "click";
  readonly event: Event;
  readonly button: HTMLButtonElement;
  readonly isCanceled: boolean;
  cancel: () => void;
}

export interface ToggleRootProps extends Omit<
  React.ComponentProps<"button">,
  "aria-pressed" | "role"
> {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean, eventDetails: ToggleChangeEventDetails) => void;
}

function createChangeEventDetails(event: Event, button: HTMLButtonElement) {
  let canceled = false;

  const details: ToggleChangeEventDetails = {
    reason: "click",
    event,
    button,
    get isCanceled() {
      return canceled;
    },
    cancel() {
      canceled = true;
    },
  };

  return details;
}

function getStateAttributes(state: ToggleState) {
  return {
    "data-pressed": state.pressed ? "" : undefined,
    "data-unpressed": state.pressed ? undefined : "",
    "data-disabled": state.disabled ? "" : undefined,
  };
}

export function Root(props: ToggleRootProps) {
  const {
    pressed: pressedProp,
    defaultPressed = false,
    onPressedChange,
    disabled = false,
    type = "button",
    ...rest
  } = props;
  const [uncontrolledPressed, setPressed] = React.useState(defaultPressed);
  const controlled = pressedProp !== undefined;
  const pressed = pressedProp ?? uncontrolledPressed;

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    if (disabled || event.defaultPrevented) {
      return;
    }

    const nextPressed = !pressed;
    const details = createChangeEventDetails(event.nativeEvent, event.currentTarget);

    onPressedChange?.(nextPressed, details);

    if (!details.isCanceled && !controlled) {
      setPressed(nextPressed);
    }
  }

  return useRender({
    defaultTagName: "button",
    render: undefined,
    props: rest,
    internalProps: {
      ...getStateAttributes({ pressed, disabled }),
      type,
      disabled,
      "aria-pressed": pressed,
      onClick: handleClick,
    },
  });
}

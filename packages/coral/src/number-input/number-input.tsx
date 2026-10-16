"use client";

import * as React from "react";

import { createPartContext, useRender, type PropsWithRender } from "../core";
import { Field } from "../field";
import { useFieldsetContext } from "../fieldset/fieldset-context";

export type NumberInputChangeReason = "input-change" | "increment" | "decrement" | "home" | "end";

export interface NumberInputChangeEventDetails {
  readonly reason: NumberInputChangeReason;
  readonly event: Event;
  readonly input: HTMLInputElement;
  readonly isCanceled: boolean;
  cancel: () => void;
}

export interface NumberInputState {
  value: number | null;
  disabled: boolean;
  readOnly: boolean;
  required: boolean;
}

interface NumberInputContextValue {
  state: NumberInputState;
  controlled: boolean;
  defaultValue: number | null;
  name: string | undefined;
  form: string | undefined;
  min: number | undefined;
  max: number | undefined;
  step: number;
  inputRef: React.RefObject<HTMLInputElement | null>;
  setValue: React.Dispatch<React.SetStateAction<number | null>>;
  changeValue: (value: number | null, reason: NumberInputChangeReason, event: Event) => void;
}

const [NumberInputContext, useNumberInputContext] =
  createPartContext<NumberInputContextValue>("NumberInput");

function getStateAttributes(state: NumberInputState) {
  return {
    "data-disabled": state.disabled ? "" : undefined,
    "data-readonly": state.readOnly ? "" : undefined,
    "data-required": state.required ? "" : undefined,
  };
}

function readValueFromInput($input: HTMLInputElement) {
  if ($input.validity.badInput) {
    return undefined;
  }

  if ($input.value === "") {
    return null;
  }

  const value = $input.valueAsNumber;
  return Number.isNaN(value) ? undefined : value;
}

function createChangeEventDetails(
  reason: NumberInputChangeReason,
  event: Event,
  input: HTMLInputElement,
) {
  let canceled = false;

  const details: NumberInputChangeEventDetails = {
    reason,
    event,
    input,
    get isCanceled() {
      return canceled;
    },
    cancel() {
      canceled = true;
    },
  };

  return details;
}

export interface NumberInputRootProps extends Omit<
  React.ComponentProps<"div">,
  "defaultValue" | "onChange" | "value"
> {
  value?: number | null;
  defaultValue?: number | null;
  onValueChange?: (value: number | null, details: NumberInputChangeEventDetails) => void;
  name?: string;
  form?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
}

export function Root(props: NumberInputRootProps) {
  const {
    value: valueProp,
    defaultValue = null,
    onValueChange,
    name,
    form,
    min,
    max,
    step = 1,
    disabled: disabledProp = false,
    readOnly = false,
    required = false,
    ...rest
  } = props;
  const [uncontrolledValue, setValue] = React.useState<number | null>(defaultValue);
  const controlled = valueProp !== undefined;
  const value = controlled ? valueProp : uncontrolledValue;
  const fieldState = Field.useFieldState();
  const fieldsetDisabled = useFieldsetContext("Root", true) ?? false;
  const state: NumberInputState = {
    value,
    disabled: disabledProp || fieldsetDisabled || fieldState?.disabled === true,
    readOnly,
    required,
  };
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  function changeValue(nextValue: number | null, reason: NumberInputChangeReason, event: Event) {
    const $input = inputRef.current;

    if (!$input) {
      return;
    }

    const details = createChangeEventDetails(reason, event, $input);
    onValueChange?.(nextValue, details);

    if (details.isCanceled || controlled) {
      $input.value = value === null ? "" : String(value);
    } else {
      setValue(nextValue);
    }
  }

  const element = useRender({
    defaultTagName: "div",
    render: undefined,
    props: rest,
    internalProps: getStateAttributes(state),
  });

  return (
    <NumberInputContext
      value={{
        state,
        controlled,
        defaultValue,
        name,
        form,
        min,
        max,
        step,
        inputRef,
        setValue,
        changeValue,
      }}
    >
      {element}
    </NumberInputContext>
  );
}

export interface NumberInputInputProps extends Omit<
  React.ComponentProps<"input">,
  | "type"
  | "value"
  | "defaultValue"
  | "disabled"
  | "readOnly"
  | "required"
  | "name"
  | "form"
  | "min"
  | "max"
  | "step"
  | "children"
> {}

export function Input(props: NumberInputInputProps) {
  const field = useNumberInputContext("Input");
  const { state, controlled, defaultValue, name, form, min, max, step, inputRef, setValue } = field;

  React.useEffect(() => {
    const $input = inputRef.current;
    const $inputForm = $input?.form;

    if (!$input || !$inputForm) {
      return undefined;
    }

    const handleReset = (event: Event) => {
      setTimeout(() => {
        if (event.defaultPrevented) {
          return;
        }

        if (controlled) {
          $input.value = state.value === null ? "" : String(state.value);
        } else {
          setValue(readValueFromInput($input) ?? null);
        }
      }, 0);
    };

    $inputForm.addEventListener("reset", handleReset);

    return () => $inputForm.removeEventListener("reset", handleReset);
  }, [controlled, defaultValue, form, inputRef, setValue, state.value]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const nextValue = readValueFromInput(event.currentTarget);

    if (nextValue !== undefined) {
      field.changeValue(nextValue, "input-change", event.nativeEvent);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.defaultPrevented || state.disabled || state.readOnly) {
      return;
    }

    const boundary = event.key === "Home" ? min : event.key === "End" ? max : undefined;

    if (boundary !== undefined) {
      event.preventDefault();
      event.currentTarget.value = String(boundary);
      field.changeValue(boundary, event.key === "Home" ? "home" : "end", event.nativeEvent);
    }
  }

  return useRender({
    defaultTagName: "input",
    render: <Field.Control />,
    props,
    internalProps: {
      type: "number",
      value: controlled ? (state.value ?? "") : undefined,
      defaultValue: controlled ? undefined : (defaultValue ?? ""),
      name,
      form,
      min,
      max,
      step,
      disabled: state.disabled,
      readOnly: state.readOnly,
      required: state.required,
      ...getStateAttributes(state),
      ref: inputRef,
      onChange: handleChange,
      onKeyDown: handleKeyDown,
    },
  });
}

export interface NumberInputIncrementTriggerProps extends PropsWithRender<
  Omit<React.ComponentProps<"button">, "type">
> {}

export function IncrementTrigger(props: NumberInputIncrementTriggerProps) {
  const { disabled: disabledProp = false, tabIndex, render, ...rest } = props;
  const field = useNumberInputContext("IncrementTrigger");
  const { state, max, inputRef } = field;
  const atLimit = state.value !== null && max !== undefined && state.value >= max;
  const disabled = disabledProp || state.disabled || state.readOnly || atLimit;

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    if (event.defaultPrevented) {
      return;
    }

    const $input = inputRef.current;

    if (!$input) {
      return;
    }

    const previousValue = $input.value;
    $input.stepUp();

    if ($input.value !== previousValue) {
      const nextValue = readValueFromInput($input);

      if (nextValue !== undefined) {
        field.changeValue(nextValue, "increment", event.nativeEvent);
      }
    }

    $input.focus();
  }

  return useRender({
    defaultTagName: "button",
    render,
    props: rest,
    internalProps: {
      type: "button",
      disabled,
      tabIndex: tabIndex ?? -1,
      ...getStateAttributes(state),
      onClick: handleClick,
    },
  });
}

export interface NumberInputDecrementTriggerProps extends PropsWithRender<
  Omit<React.ComponentProps<"button">, "type">
> {}

export function DecrementTrigger(props: NumberInputDecrementTriggerProps) {
  const { disabled: disabledProp = false, tabIndex, render, ...rest } = props;
  const field = useNumberInputContext("DecrementTrigger");
  const { state, min, inputRef } = field;
  const atLimit = state.value !== null && min !== undefined && state.value <= min;
  const disabled = disabledProp || state.disabled || state.readOnly || atLimit;

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    if (event.defaultPrevented) {
      return;
    }

    const $input = inputRef.current;

    if (!$input) {
      return;
    }

    const previousValue = $input.value;
    $input.stepDown();

    if ($input.value !== previousValue) {
      const nextValue = readValueFromInput($input);

      if (nextValue !== undefined) {
        field.changeValue(nextValue, "decrement", event.nativeEvent);
      }
    }

    $input.focus();
  }

  return useRender({
    defaultTagName: "button",
    render,
    props: rest,
    internalProps: {
      type: "button",
      disabled,
      tabIndex: tabIndex ?? -1,
      ...getStateAttributes(state),
      onClick: handleClick,
    },
  });
}

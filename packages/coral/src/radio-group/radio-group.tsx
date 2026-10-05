"use client";

import * as React from "react";

import { createPartContext, useRender, type RenderProp } from "../core/index";
import { useFieldState } from "../field/field";
import { useFieldsetContext } from "../fieldset/fieldset-context";

export interface RadioGroupChangeEventDetails {
  readonly reason: "input-change";
  readonly event: Event;
  readonly input: HTMLInputElement;
  readonly isCanceled: boolean;
  cancel: () => void;
}

interface RadioGroupContextValue {
  name: string;
  value: string | null;
  defaultValue: string | null;
  controlled: boolean;
  disabled: boolean;
  readOnly: boolean;
  required: boolean;
  form: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
  onValueChange: ((value: string, eventDetails: RadioGroupChangeEventDetails) => void) | undefined;
  restoreSelection: () => void;
}

const [RadioGroupContext, useRadioGroupContext] =
  createPartContext<RadioGroupContextValue>("RadioGroup");

function getGroupStateAttributes(
  state: Pick<RadioGroupContextValue, "disabled" | "readOnly" | "required">,
) {
  return {
    "data-disabled": state.disabled ? "" : undefined,
    "data-readonly": state.readOnly ? "" : undefined,
    "data-required": state.required ? "" : undefined,
  };
}

export interface RadioGroupItemState {
  checked: boolean;
  disabled: boolean;
  readOnly: boolean;
  required: boolean;
}

function getItemStateAttributes(state: RadioGroupItemState) {
  return {
    "data-checked": state.checked ? "" : undefined,
    "data-unchecked": state.checked ? undefined : "",
    ...getGroupStateAttributes(state),
  };
}

export interface RadioGroupRootProps extends Omit<
  React.ComponentProps<"fieldset">,
  "aria-hidden" | "defaultValue" | "onChange" | "role" | "value"
> {
  name: string;
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string, eventDetails: RadioGroupChangeEventDetails) => void;
  readOnly?: boolean;
  required?: boolean;
}

export function Root(props: RadioGroupRootProps) {
  const {
    name,
    value: valueProp,
    defaultValue = null,
    onValueChange,
    disabled: disabledProp = false,
    readOnly = false,
    required = false,
    form,
    ...rest
  } = props;
  const [uncontrolledValue, setValue] = React.useState<string | null>(defaultValue);
  const controlled = valueProp !== undefined;
  const value = valueProp === undefined ? uncontrolledValue : valueProp;
  const fieldState = useFieldState();
  const fieldsetDisabled = useFieldsetContext("Root", true) ?? false;
  const disabled = disabledProp || fieldsetDisabled || fieldState?.disabled === true;
  const groupRef = React.useRef<HTMLFieldSetElement | null>(null);

  React.useEffect(() => {
    const $form = groupRef.current?.form;

    if (controlled || !$form) {
      return undefined;
    }

    const handleReset = (event: Event) => {
      // Native radio inputs reset after the reset event's default action.
      setTimeout(() => {
        if (!event.defaultPrevented) {
          setValue(defaultValue);
        }
      }, 0);
    };

    $form.addEventListener("reset", handleReset);

    return () => $form.removeEventListener("reset", handleReset);
  }, [controlled, defaultValue, form]);

  function restoreSelection() {
    const inputs = groupRef.current?.querySelectorAll<HTMLInputElement>('input[type="radio"]');

    inputs?.forEach((input) => {
      input.checked = input.value === value;
    });
  }

  const element = useRender({
    defaultTagName: "fieldset",
    render: undefined,
    props: rest,
    internalProps: {
      disabled,
      form,
      ...getGroupStateAttributes({ disabled, readOnly, required }),
      ref: groupRef,
    },
  });

  return (
    <RadioGroupContext
      value={{
        name,
        value,
        defaultValue,
        controlled,
        disabled,
        readOnly,
        required,
        form,
        setValue,
        onValueChange,
        restoreSelection,
      }}
    >
      {element}
    </RadioGroupContext>
  );
}

export type RadioGroupLegendProps = React.ComponentProps<"legend">;

export function Legend(props: RadioGroupLegendProps) {
  const group = useRadioGroupContext("Legend");

  return useRender({
    defaultTagName: "legend",
    render: undefined,
    props,
    internalProps: { ...getGroupStateAttributes(group) },
  });
}

interface RadioItemContextValue {
  value: string;
  state: RadioGroupItemState;
}

const [RadioItemContext, useRadioItemContext] = createPartContext<RadioItemContextValue>(
  "RadioGroup",
  "Item",
);

function createChangeEventDetails(event: Event, input: HTMLInputElement) {
  let canceled = false;

  const details: RadioGroupChangeEventDetails = {
    reason: "input-change",
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

const visuallyHiddenStyle: React.CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  padding: 0,
  border: 0,
  overflow: "hidden",
  clipPath: "inset(50%)",
  whiteSpace: "nowrap",
};

export interface RadioGroupItemProps extends Omit<
  React.ComponentProps<"label">,
  "aria-hidden" | "checked" | "defaultChecked" | "htmlFor" | "name" | "onChange" | "role"
> {
  value: string;
  disabled?: boolean;
}

export function Item(props: RadioGroupItemProps) {
  const { value, disabled: disabledProp = false, ...rest } = props;
  const group = useRadioGroupContext("Item");
  const state: RadioGroupItemState = {
    checked: group.value === value,
    disabled: group.disabled || disabledProp,
    readOnly: group.readOnly,
    required: group.required,
  };
  const element = useRender({
    defaultTagName: "label",
    render: undefined,
    props: rest,
    internalProps: getItemStateAttributes(state),
  });

  return <RadioItemContext value={{ value, state }}>{element}</RadioItemContext>;
}

export interface RadioGroupItemHiddenInputProps extends Omit<
  React.ComponentProps<"input">,
  | "type"
  | "role"
  | "checked"
  | "defaultChecked"
  | "disabled"
  | "readOnly"
  | "required"
  | "name"
  | "value"
  | "defaultValue"
  | "form"
  | "aria-checked"
  | "aria-readonly"
  | "aria-hidden"
  | "hidden"
  | "children"
> {}

export function ItemHiddenInput(props: RadioGroupItemHiddenInputProps) {
  const group = useRadioGroupContext("ItemHiddenInput");
  const { value, state } = useRadioItemContext("ItemHiddenInput");
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  React.useLayoutEffect(() => {
    const $input = inputRef.current;

    if ($input && !group.controlled) {
      $input.defaultChecked = group.defaultValue === value;
    }
  }, [group.controlled, group.defaultValue, value]);

  function handleClick(event: React.MouseEvent<HTMLInputElement>) {
    if (state.readOnly) {
      event.preventDefault();
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (
      state.readOnly &&
      [" ", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)
    ) {
      event.preventDefault();
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;

    if (state.readOnly) {
      group.restoreSelection();
      return;
    }

    const details = createChangeEventDetails(event.nativeEvent, input);

    group.onValueChange?.(value, details);

    if (details.isCanceled) {
      group.restoreSelection();
    } else if (!group.controlled) {
      group.setValue(value);
    }
  }

  return useRender({
    defaultTagName: "input",
    render: undefined,
    props,
    internalProps: {
      type: "radio",
      name: group.name,
      value,
      checked: state.checked,
      disabled: state.disabled,
      required: state.required,
      form: group.form,
      "aria-readonly": state.readOnly || undefined,
      style: visuallyHiddenStyle,
      ref: inputRef,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      onChange: handleChange,
    },
  });
}

export interface RadioGroupItemControlProps extends Omit<
  React.ComponentProps<"span">,
  "aria-hidden" | "role"
> {
  render?: RenderProp;
}

export function ItemControl(props: RadioGroupItemControlProps) {
  const { render, ...rest } = props;
  const { state } = useRadioItemContext("ItemControl");

  return useRender({
    defaultTagName: "span",
    render,
    props: rest,
    internalProps: { ...getItemStateAttributes(state), "aria-hidden": true },
  });
}

export interface RadioGroupItemIndicatorProps extends Omit<
  React.ComponentProps<"span">,
  "aria-hidden"
> {
  keepMounted?: boolean;
  render?: RenderProp;
}

export function ItemIndicator(props: RadioGroupItemIndicatorProps) {
  const { keepMounted = false, render, ...rest } = props;
  const { state } = useRadioItemContext("ItemIndicator");
  const element = useRender({
    defaultTagName: "span",
    render,
    props: rest,
    internalProps: { ...getItemStateAttributes(state), "aria-hidden": true },
  });

  return keepMounted || state.checked ? element : null;
}

export interface RadioGroupItemTextProps extends React.ComponentProps<"span"> {
  render?: RenderProp;
}

export function ItemText(props: RadioGroupItemTextProps) {
  const { render, ...rest } = props;
  const { state } = useRadioItemContext("ItemText");

  return useRender({
    defaultTagName: "span",
    render,
    props: rest,
    internalProps: getItemStateAttributes(state),
  });
}

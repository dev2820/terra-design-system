"use client";

import * as React from "react";

import { useRender } from "../core/index";
import { createPartContext } from "../core/utils/create-part-context";
import { useFieldState } from "../field/field";
import { Field } from "../field/index";
import { useFieldsetContext } from "../fieldset/fieldset-context";

export interface CheckboxState {
  checked: boolean;
  indeterminate: boolean;
  disabled: boolean;
  readOnly: boolean;
  required: boolean;
}

export interface CheckboxChangeEventDetails {
  readonly reason: "input-change";
  readonly event: Event;
  readonly input: HTMLInputElement;
  readonly isCanceled: boolean;
  cancel: () => void;
}

interface CheckboxContextValue {
  state: CheckboxState;
  controlled: boolean;
  defaultChecked: boolean;
  name: string | undefined;
  value: string | undefined;
  form: string | undefined;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
  onCheckedChange: CheckboxRootProps["onCheckedChange"];
}

const [CheckboxContext, useCheckboxContext] = createPartContext<CheckboxContextValue>("Checkbox");

function createChangeEventDetails(event: Event, input: HTMLInputElement) {
  let canceled = false;

  const details: CheckboxChangeEventDetails = {
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

function getStateAttributes(state: CheckboxState) {
  return {
    "data-checked": state.checked ? "" : undefined,
    "data-unchecked": state.checked ? undefined : "",
    "data-indeterminate": state.indeterminate ? "" : undefined,
    "data-disabled": state.disabled ? "" : undefined,
    "data-readonly": state.readOnly ? "" : undefined,
    "data-required": state.required ? "" : undefined,
  };
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

export interface CheckboxRootProps extends Omit<
  React.ComponentProps<"label">,
  "aria-hidden" | "defaultChecked" | "onChange" | "role" | "htmlFor"
> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean, eventDetails: CheckboxChangeEventDetails) => void;
  indeterminate?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  form?: string;
}

export function Root(props: CheckboxRootProps) {
  const {
    checked: checkedProp,
    defaultChecked = false,
    onCheckedChange,
    indeterminate = false,
    disabled: disabledProp = false,
    readOnly = false,
    required = false,
    name,
    value,
    form,
    ...rest
  } = props;
  const [uncontrolledChecked, setChecked] = React.useState(defaultChecked);
  const controlled = checkedProp !== undefined;
  const checked = checkedProp ?? uncontrolledChecked;
  const fieldState = useFieldState();
  const fieldsetDisabled = useFieldsetContext("Root", true) ?? false;
  const disabled = disabledProp || fieldsetDisabled || fieldState?.disabled === true;
  const state = React.useMemo<CheckboxState>(
    () => ({ checked, indeterminate, disabled, readOnly, required }),
    [checked, indeterminate, disabled, readOnly, required],
  );
  const element = useRender({
    defaultTagName: "label",
    render: undefined,
    props: rest,
    internalProps: getStateAttributes(state),
  });

  return (
    <CheckboxContext
      value={{ state, controlled, defaultChecked, name, value, form, setChecked, onCheckedChange }}
    >
      {element}
    </CheckboxContext>
  );
}

export interface CheckboxHiddenInputProps extends Omit<
  React.ComponentProps<"input">,
  | "type"
  | "checked"
  | "defaultChecked"
  | "disabled"
  | "readOnly"
  | "required"
  | "name"
  | "value"
  | "defaultValue"
  | "form"
  | "aria-hidden"
  | "hidden"
  | "children"
> {}

export function HiddenInput(props: CheckboxHiddenInputProps) {
  const checkbox = useCheckboxContext("HiddenInput");
  const { state, controlled, defaultChecked, name, value, form, setChecked, onCheckedChange } =
    checkbox;
  const { checked, indeterminate, disabled, readOnly, required } = state;
  const controlRef = React.useRef<HTMLInputElement | null>(null);

  React.useLayoutEffect(() => {
    const input = controlRef.current;

    if (!input) {
      return;
    }

    input.indeterminate = indeterminate;

    if (!controlled) {
      input.defaultChecked = defaultChecked;
    }
  }, [checked, controlled, defaultChecked, indeterminate]);

  React.useEffect(() => {
    const input = controlRef.current;
    const inputForm = input?.form;

    if (controlled || !input || !inputForm) {
      return undefined;
    }

    const inputElement = input;

    function handleReset(event: Event) {
      // Read the input after the reset event's default action has completed.
      setTimeout(() => {
        if (!event.defaultPrevented) {
          setChecked(inputElement.checked);
          inputElement.indeterminate = indeterminate;
        }
      }, 0);
    }

    inputForm.addEventListener("reset", handleReset);

    return () => inputForm.removeEventListener("reset", handleReset);
  }, [controlled, form, indeterminate, setChecked]);

  function handleClick(event: React.MouseEvent<HTMLInputElement>) {
    if (readOnly) {
      event.preventDefault();
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const $input = event.currentTarget;
    const nextChecked = $input.checked;

    if (readOnly) {
      $input.checked = checked;
      $input.indeterminate = indeterminate;
      return;
    }

    const eventDetails = createChangeEventDetails(event.nativeEvent, $input);

    onCheckedChange?.(nextChecked, eventDetails);

    if (eventDetails.isCanceled) {
      $input.checked = checked;
    } else if (!controlled) {
      setChecked(nextChecked);
    }

    $input.indeterminate = indeterminate;
  }

  return useRender({
    defaultTagName: "input",
    render: <Field.Control />,
    props,
    internalProps: {
      type: "checkbox",
      checked,
      disabled,
      required,
      name,
      ...(value === undefined ? {} : { value }),
      form,
      "aria-readonly": readOnly || undefined,
      style: visuallyHiddenStyle,
      ref: controlRef,
      onClick: handleClick,
      onChange: handleChange,
    },
  });
}

export interface CheckboxControlProps extends Omit<
  React.ComponentProps<"span">,
  "aria-hidden" | "role"
> {}

export function Control(props: CheckboxControlProps) {
  const { state } = useCheckboxContext("Control");

  return <span {...props} {...getStateAttributes(state)} aria-hidden="true" />;
}

export interface CheckboxLabelProps extends React.ComponentProps<"span"> {}

export function Label(props: CheckboxLabelProps) {
  const { state } = useCheckboxContext("Label");

  return <span {...props} {...getStateAttributes(state)} />;
}

export interface CheckboxIndicatorProps extends Omit<
  React.ComponentProps<"span">,
  "aria-hidden" | "children"
> {
  children?: React.ReactNode | ((state: CheckboxState) => React.ReactNode);
  keepMounted?: boolean;
}

export function Indicator(props: CheckboxIndicatorProps) {
  const { children, keepMounted = false, ...rest } = props;
  const { state } = useCheckboxContext("Indicator");
  const visible = state.checked || state.indeterminate;

  if (!keepMounted && !visible) {
    return null;
  }

  return (
    <span {...rest} {...getStateAttributes(state)} aria-hidden="true">
      {typeof children === "function" ? children(state) : children}
    </span>
  );
}

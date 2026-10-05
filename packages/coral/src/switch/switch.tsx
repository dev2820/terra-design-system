"use client";

import * as React from "react";

import { createPartContext, useRender, type RenderProp } from "../core/index";
import { useFieldState } from "../field/field";
import { Field } from "../field/index";
import { useFieldsetContext } from "../fieldset/fieldset-context";

export interface SwitchState {
  checked: boolean;
  disabled: boolean;
  readOnly: boolean;
  required: boolean;
}

export interface SwitchChangeEventDetails {
  readonly reason: "input-change";
  readonly event: Event;
  readonly input: HTMLInputElement;
  readonly isCanceled: boolean;
  cancel: () => void;
}

interface SwitchContextValue {
  state: SwitchState;
  controlled: boolean;
  defaultChecked: boolean;
  name: string | undefined;
  value: string | undefined;
  form: string | undefined;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
  onCheckedChange: SwitchRootProps["onCheckedChange"];
}

const [SwitchContext, useSwitchContext] = createPartContext<SwitchContextValue>("Switch");

function createChangeEventDetails(event: Event, input: HTMLInputElement) {
  let canceled = false;

  const details: SwitchChangeEventDetails = {
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

function getStateAttributes(state: SwitchState) {
  return {
    "data-checked": state.checked ? "" : undefined,
    "data-unchecked": state.checked ? undefined : "",
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

export interface SwitchRootProps extends Omit<
  React.ComponentProps<"label">,
  "aria-hidden" | "defaultChecked" | "onChange" | "role" | "htmlFor"
> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean, eventDetails: SwitchChangeEventDetails) => void;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  form?: string;
}

export function Root(props: SwitchRootProps) {
  const {
    checked: checkedProp,
    defaultChecked = false,
    onCheckedChange,
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

  const state = React.useMemo<SwitchState>(
    () => ({ checked, disabled, readOnly, required }),
    [checked, disabled, readOnly, required],
  );

  const element = useRender({
    defaultTagName: "label",
    render: undefined,
    props: rest,
    internalProps: getStateAttributes(state),
  });

  return (
    <SwitchContext
      value={{ state, controlled, defaultChecked, name, value, form, setChecked, onCheckedChange }}
    >
      {element}
    </SwitchContext>
  );
}

export interface SwitchHiddenInputProps extends Omit<
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

export function HiddenInput(props: SwitchHiddenInputProps) {
  const { state, controlled, defaultChecked, name, value, form, setChecked, onCheckedChange } =
    useSwitchContext("HiddenInput");
  const { checked, disabled, readOnly, required } = state;
  const controlRef = React.useRef<HTMLInputElement | null>(null);

  React.useLayoutEffect(() => {
    const $input = controlRef.current;

    if ($input && !controlled) {
      $input.defaultChecked = defaultChecked;
    }
  }, [checked, controlled, defaultChecked]);

  React.useEffect(() => {
    const $input = controlRef.current;
    const $inputForm = $input?.form;

    if (controlled || !$input || !$inputForm) {
      return undefined;
    }

    const handleReset = (event: Event) => {
      // Read the input after the reset event's default action has completed.
      setTimeout(() => {
        if (!event.defaultPrevented) {
          setChecked($input.checked);
        }
      }, 0);
    };

    $inputForm.addEventListener("reset", handleReset);

    return () => $inputForm.removeEventListener("reset", handleReset);
  }, [controlled, form, setChecked]);

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
      return;
    }

    const eventDetails = createChangeEventDetails(event.nativeEvent, $input);

    onCheckedChange?.(nextChecked, eventDetails);

    if (eventDetails.isCanceled) {
      $input.checked = checked;
    } else if (!controlled) {
      setChecked(nextChecked);
    }
  }

  return useRender({
    defaultTagName: "input",
    render: <Field.Control />,
    props,
    internalProps: {
      type: "checkbox",
      role: "switch",
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

export interface SwitchControlProps extends Omit<
  React.ComponentProps<"span">,
  "aria-hidden" | "role"
> {
  render?: RenderProp;
}

export function Control(props: SwitchControlProps) {
  const { render, ...rest } = props;
  const { state } = useSwitchContext("Control");

  return useRender({
    defaultTagName: "span",
    render,
    props: rest,
    internalProps: { ...getStateAttributes(state), "aria-hidden": true },
  });
}

export interface SwitchLabelProps extends React.ComponentProps<"span"> {
  render?: RenderProp;
}

export function Label(props: SwitchLabelProps) {
  const { render, ...rest } = props;
  const { state } = useSwitchContext("Label");

  return useRender({
    defaultTagName: "span",
    render,
    props: rest,
    internalProps: { ...getStateAttributes(state) },
  });
}

export interface SwitchThumbProps extends Omit<
  React.ComponentProps<"span">,
  "aria-hidden" | "role"
> {
  render?: RenderProp;
}

export function Thumb(props: SwitchThumbProps) {
  const { render, ...rest } = props;
  const { state } = useSwitchContext("Thumb");

  return useRender({
    defaultTagName: "span",
    render,
    props: rest,
    internalProps: { ...getStateAttributes(state), "aria-hidden": true },
  });
}

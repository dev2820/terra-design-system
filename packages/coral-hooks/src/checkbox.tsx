"use client";

import * as React from "react";

import {
  changeDetails,
  context,
  mergeProps,
  part,
  useFormReset,
  visuallyHidden,
  type ChangeDetails,
  type WithRender,
} from "./shared";

export interface CheckboxOptions {
  id?: string | undefined;
  checked?: boolean | undefined;
  defaultChecked?: boolean | undefined;
  indeterminate?: boolean | undefined;
  disabled?: boolean | undefined;
  readOnly?: boolean | undefined;
  required?: boolean | undefined;
  name?: string | undefined;
  value?: string | undefined;
  form?: string | undefined;
  onCheckedChange?: ((checked: boolean, details: ChangeDetails) => void) | undefined;
}

export function useCheckbox(options: CheckboxOptions = {}) {
  const generatedId = React.useId();
  const id = options.id ?? `${generatedId}-checkbox`;
  const initial = React.useRef(options.defaultChecked ?? false);
  const [local, setLocal] = React.useState(initial.current);
  const controlled = options.checked !== undefined;
  const checked = options.checked ?? local;
  const { indeterminate = false, disabled = false, readOnly = false, required = false } = options;
  const inputs = React.useRef(new Map<number, HTMLInputElement>());
  React.useLayoutEffect(() => {
    const input = inputs.current.get(0);
    if (input) {
      input.defaultChecked = initial.current;
      input.checked = checked;
      input.indeterminate = indeterminate;
    }
  });
  const registerInput = useFormReset(inputs, () => {
    const next = controlled ? checked : initial.current;
    if (!controlled) setLocal(next);
    const input = inputs.current.get(0);
    if (input) {
      input.checked = next;
      input.indeterminate = indeterminate;
    }
  });
  const ref = React.useCallback(
    (input: HTMLInputElement | null) => {
      registerInput(0, input);
      if (input) {
        input.defaultChecked = initial.current;
        input.checked = checked;
        input.indeterminate = indeterminate;
      }
    },
    [registerInput, checked, indeterminate],
  );

  function getInputProps(props: React.ComponentProps<"input"> = {}) {
    return mergeProps(props, {
      id,
      ref,
      type: "checkbox",
      checked,
      disabled,
      required,
      name: options.name,
      value: options.value ?? "on",
      form: options.form,
      "aria-readonly": readOnly || undefined,
      onClick(event: React.MouseEvent<HTMLInputElement>) {
        if (readOnly) event.preventDefault();
      },
      onChange(event: React.ChangeEvent<HTMLInputElement>) {
        const input = event.currentTarget;
        const next = input.checked;
        const details = changeDetails(event.nativeEvent, "input-change");
        if (
          !event.defaultPrevented &&
          !event.nativeEvent.defaultPrevented &&
          !readOnly &&
          !disabled &&
          !input.matches(":disabled")
        ) {
          options.onCheckedChange?.(next, details);
          if (!controlled && !details.isCanceled) setLocal(next);
        }
        input.checked = checked;
        input.indeterminate = indeterminate;
      },
    });
  }

  return {
    checked,
    indeterminate,
    getRootProps(props: React.ComponentProps<"span"> = {}) {
      return mergeProps(props, {
        "data-checked": checked ? "" : undefined,
        "data-indeterminate": indeterminate ? "" : undefined,
      });
    },
    getLabelProps(props: React.ComponentProps<"label"> = {}) {
      return mergeProps(props, { htmlFor: id });
    },
    getControlProps(props: React.ComponentProps<"span"> = {}) {
      return mergeProps(props, {
        "aria-hidden": true,
        "data-checked": checked ? "" : undefined,
        "data-indeterminate": indeterminate ? "" : undefined,
      });
    },
    getInputProps,
    getHiddenInputProps(props: React.ComponentProps<"input"> = {}) {
      return getInputProps({ ...props, style: { ...visuallyHidden, ...props.style } });
    },
  };
}

const [Context, useCheck] = context<ReturnType<typeof useCheckbox>>("Checkbox");
function Root(
  props: CheckboxOptions &
    WithRender<Omit<React.ComponentProps<"span">, keyof CheckboxOptions | "defaultChecked">>,
) {
  const {
    id,
    checked,
    defaultChecked,
    indeterminate,
    disabled,
    readOnly,
    required,
    name,
    value,
    form,
    onCheckedChange,
    ...rest
  } = props;
  const checkbox = useCheckbox({
    id,
    checked,
    defaultChecked,
    indeterminate,
    disabled,
    readOnly,
    required,
    name,
    value,
    form,
    onCheckedChange,
  });
  return <Context value={checkbox}>{part("span", checkbox.getRootProps, rest)}</Context>;
}
function Label(props: React.ComponentProps<"label">) {
  return <label {...useCheck().getLabelProps(props)} />;
}
function Control(props: WithRender<React.ComponentProps<"span">>) {
  return part("span", useCheck().getControlProps, props);
}
function Input(props: React.ComponentProps<"input">) {
  return <input {...useCheck().getInputProps(props)} />;
}
function HiddenInput(props: React.ComponentProps<"input">) {
  const checkbox = useCheck();
  return <input {...checkbox.getHiddenInputProps(props)} />;
}
export const Checkbox = { Root, Label, Control, Input, HiddenInput };

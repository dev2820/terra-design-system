"use client";

import * as React from "react";

import {
  createPartContext,
  joinIds,
  useRender,
  visuallyHiddenStyle,
  type PropsWithRender,
} from "../core";
import { Field } from "../field";
import { FieldContext } from "../field/field-context";
import { useFieldsetContext } from "../fieldset/fieldset-context";

export type OtpFieldChangeReason = "input-change" | "input-paste" | "keyboard";
export type OtpFieldValidationType = "numeric" | "alphabet" | "alphanumeric";

export interface OtpFieldChangeEventDetails {
  readonly reason: OtpFieldChangeReason;
  readonly event: Event;
  readonly isCanceled: boolean;
  cancel: () => void;
}

export interface OtpFieldState {
  value: readonly string[];
  complete: boolean;
  disabled: boolean;
  readOnly: boolean;
  required: boolean;
  invalid: boolean;
}

interface OtpFieldContextValue {
  state: OtpFieldState;
  length: number;
  validationType: OtpFieldValidationType;
  baseId: string;
  name: string | undefined;
  form: string | undefined;
  labelledBy: string | undefined;
  describedBy: string | undefined;
  label: string | undefined;
  setLabelId: React.Dispatch<React.SetStateAction<string | null>>;
  inputRefs: React.RefObject<Map<number, HTMLInputElement>>;
  hiddenInputRef: React.RefObject<HTMLInputElement | null>;
  field: React.ContextType<typeof FieldContext>;
  focusInput: (index: number) => void;
  changeValue: (value: readonly string[], reason: OtpFieldChangeReason, event: Event) => boolean;
  resetValue: () => void;
}

const [OtpFieldContext, useOtpFieldContext] = createPartContext<OtpFieldContextValue>("OtpField");

const characterPatterns = {
  numeric: "[0-9]",
  alphabet: "[A-Za-z]",
  alphanumeric: "[A-Za-z0-9]",
};

function normalizeValue(
  value: readonly string[],
  length: number,
  validationType: OtpFieldValidationType,
) {
  const pattern = new RegExp(`^${characterPatterns[validationType]}$`);

  return Array.from({ length }, (_, index) =>
    pattern.test(value[index] ?? "") ? value[index]! : "",
  );
}

function getStateAttributes(state: OtpFieldState) {
  return {
    "data-complete": state.complete ? "" : undefined,
    "data-disabled": state.disabled ? "" : undefined,
    "data-readonly": state.readOnly ? "" : undefined,
    "data-required": state.required ? "" : undefined,
    "data-invalid": state.invalid ? "" : undefined,
  };
}

export interface OtpFieldRootProps extends Omit<
  React.ComponentProps<"div">,
  "defaultValue" | "onChange" | "value"
> {
  length?: number;
  validationType?: OtpFieldValidationType;
  value?: readonly string[];
  defaultValue?: readonly string[];
  onValueChange?: (value: string[], details: OtpFieldChangeEventDetails) => void;
  onValueComplete?: (value: string[], details: OtpFieldChangeEventDetails) => void;
  name?: string;
  form?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  invalid?: boolean;
}

export function Root(props: OtpFieldRootProps) {
  const {
    length = 6,
    validationType = "numeric",
    value: valueProp,
    defaultValue = [],
    onValueChange,
    onValueComplete,
    name,
    form,
    disabled: disabledProp = false,
    readOnly = false,
    required = false,
    invalid = false,
    id,
    "aria-labelledby": labelledByProp,
    "aria-describedby": describedByProp,
    "aria-label": label,
    ...rest
  } = props;

  if (!Number.isSafeInteger(length) || length < 1) {
    throw new RangeError("OtpField.Root length must be a positive safe integer.");
  }

  const generatedId = React.useId();
  const baseId = id ?? `${generatedId}-otp`;
  const [uncontrolledValue, setValue] = React.useState(() =>
    normalizeValue(defaultValue, length, validationType),
  );
  const controlled = valueProp !== undefined;
  const value = normalizeValue(valueProp ?? uncontrolledValue, length, validationType);
  const field = React.use(FieldContext);
  const fieldsetDisabled = useFieldsetContext("Root", true) ?? false;
  const state: OtpFieldState = {
    value,
    complete: value.every((character) => character !== ""),
    disabled: disabledProp || fieldsetDisabled || field?.state.disabled === true,
    readOnly,
    required,
    invalid: invalid || field?.state.invalid === true,
  };
  const inputRefs = React.useRef(new Map<number, HTMLInputElement>());
  const hiddenInputRef = React.useRef<HTMLInputElement | null>(null);
  const [labelId, setLabelId] = React.useState<string | null>(null);
  const [pendingComplete, setPendingComplete] = React.useState<{
    value: string;
    details: OtpFieldChangeEventDetails;
  } | null>(null);
  const labelledBy = labelledByProp ?? labelId ?? (label ? undefined : field?.meta.labelId);
  const describedBy = joinIds(
    describedByProp,
    field?.meta.descriptionIds,
    state.invalid ? field?.meta.errorIds : undefined,
  );

  function focusInput(index: number) {
    const input = inputRefs.current.get(Math.max(0, Math.min(index, length - 1)));
    input?.focus();
    input?.select();
  }

  function changeValue(nextValue: readonly string[], reason: OtpFieldChangeReason, event: Event) {
    if (state.disabled || state.readOnly) {
      return false;
    }

    const next = normalizeValue(nextValue, length, validationType);
    let canceled = false;
    const details: OtpFieldChangeEventDetails = {
      reason,
      event,
      get isCanceled() {
        return canceled;
      },
      cancel() {
        canceled = true;
      },
    };

    if (next.every((character, index) => character === value[index])) {
      return true;
    }

    onValueChange?.([...next], details);

    if (details.isCanceled) {
      return false;
    }

    if (!controlled) {
      setValue(next);
    }

    setPendingComplete(next.every(Boolean) ? { value: next.join(""), details } : null);

    return true;
  }

  function resetValue() {
    setPendingComplete(null);
    if (!controlled) {
      setValue(normalizeValue(defaultValue, length, validationType));
    }
  }

  React.useLayoutEffect(() => {
    if (!pendingComplete) {
      return;
    }

    setPendingComplete(null);

    if (state.complete && pendingComplete.value === value.join("")) {
      onValueComplete?.([...value], pendingComplete.details);
    }
  }, [onValueComplete, pendingComplete, state.complete, value]);

  const element = useRender({
    defaultTagName: "div",
    render: undefined,
    props: rest,
    internalProps: { id: baseId, ...getStateAttributes(state) },
  });

  return (
    <OtpFieldContext
      value={{
        state,
        length,
        validationType,
        baseId,
        name,
        form,
        label,
        labelledBy,
        describedBy,
        setLabelId,
        inputRefs,
        hiddenInputRef,
        field,
        focusInput,
        changeValue,
        resetValue,
      }}
    >
      {element}
    </OtpFieldContext>
  );
}

export interface OtpFieldLabelProps extends Omit<React.ComponentProps<"label">, "htmlFor"> {}

export function Label(props: OtpFieldLabelProps) {
  const { state, baseId, setLabelId } = useOtpFieldContext("Label");
  const id = props.id ?? `${baseId}-label`;

  React.useLayoutEffect(() => {
    setLabelId(id);
    return () => setLabelId(null);
  }, [id, setLabelId]);

  return useRender({
    defaultTagName: "label",
    render: undefined,
    props,
    internalProps: {
      ...getStateAttributes(state),
      id,
      htmlFor: `${baseId}-input-0`,
    },
  });
}

export interface OtpFieldControlProps extends Omit<
  React.ComponentProps<"div">,
  "role" | "aria-labelledby" | "aria-describedby"
> {}

export function Control(props: OtpFieldControlProps) {
  const { state, labelledBy, describedBy, label } = useOtpFieldContext("Control");
  return useRender({
    defaultTagName: "div",
    render: undefined,
    props,
    internalProps: {
      ...getStateAttributes(state),
      role: "group",
      "aria-label": label,
      "aria-labelledby": labelledBy,
      "aria-describedby": describedBy,
    },
  });
}

export interface OtpFieldInputProps extends Omit<
  React.ComponentProps<"input">,
  | "id"
  | "type"
  | "value"
  | "defaultValue"
  | "name"
  | "form"
  | "disabled"
  | "readOnly"
  | "required"
  | "minLength"
  | "maxLength"
  | "pattern"
  | "children"
> {
  index: number;
}

export function Input(props: OtpFieldInputProps) {
  const { index, ...rest } = props;
  const otp = useOtpFieldContext("Input");
  const { state, length, baseId, inputRefs, field } = otp;

  if (!Number.isInteger(index) || index < 0 || index >= length) {
    throw new RangeError("OtpField.Input index must be within the root length.");
  }

  const inputRef = React.useCallback(
    (input: HTMLInputElement | null) => {
      if (input) {
        inputRefs.current.set(index, input);
      } else {
        inputRefs.current.delete(index);
      }
    },
    [index, inputRefs],
  );

  function insertValue(text: string, reason: OtpFieldChangeReason, event: Event) {
    const characters = text.replace(/\s/g, "");

    if (!new RegExp(`^${characterPatterns[otp.validationType]}+$`).test(characters)) {
      return false;
    }

    const start = characters.length >= length ? 0 : index;
    const next = [...state.value];
    const inserted = characters.slice(0, length - start);

    for (let offset = 0; offset < inserted.length; offset++) {
      next[start + offset] = inserted[offset]!;
    }

    if (!otp.changeValue(next, reason, event)) {
      return false;
    }

    otp.focusInput(Math.min(start + inserted.length, length - 1));
    return true;
  }

  function restoreInputs() {
    for (const [slot, input] of inputRefs.current) {
      input.value = state.value[slot] ?? "";
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (
      event.defaultPrevented ||
      (event.nativeEvent instanceof InputEvent && event.nativeEvent.isComposing)
    ) {
      restoreInputs();
      return;
    }

    if (event.currentTarget.value === "") {
      const next = [...state.value];
      next[index] = "";
      otp.changeValue(next, "input-change", event.nativeEvent);
    } else {
      const inputEvent = event.nativeEvent instanceof InputEvent ? event.nativeEvent : null;
      const text = inputEvent?.inputType.startsWith("insert")
        ? (inputEvent.data ?? event.currentTarget.value)
        : event.currentTarget.value;
      insertValue(text, "input-change", event.nativeEvent);
    }

    restoreInputs();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (
      event.defaultPrevented ||
      event.nativeEvent.isComposing ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey
    ) {
      return;
    }

    const target =
      event.key === "ArrowLeft"
        ? index - 1
        : event.key === "ArrowRight"
          ? index + 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? length - 1
              : null;

    if (target !== null) {
      event.preventDefault();
      otp.focusInput(target);
      return;
    }

    if (state.disabled || state.readOnly || !["Backspace", "Delete"].includes(event.key)) {
      return;
    }

    event.preventDefault();
    const clearIndex =
      event.key === "Backspace" && !state.value[index] ? Math.max(0, index - 1) : index;
    const next = [...state.value];
    next[clearIndex] = "";

    if (otp.changeValue(next, "keyboard", event.nativeEvent)) {
      otp.focusInput(clearIndex);
    }
  }

  function handlePaste(event: React.ClipboardEvent<HTMLInputElement>) {
    if (event.defaultPrevented || state.disabled || state.readOnly) {
      return;
    }

    event.preventDefault();
    insertValue(event.clipboardData.getData("text"), "input-paste", event.nativeEvent);
  }

  function handleFocus(event: React.FocusEvent<HTMLInputElement>) {
    field?.actions.handleFocus();
    event.currentTarget.select();
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    if (![...inputRefs.current.values()].includes(event.relatedTarget as HTMLInputElement)) {
      field?.actions.handleBlur();
    }
  }

  const hasOwnName = props["aria-label"] !== undefined || props["aria-labelledby"] !== undefined;

  return useRender({
    defaultTagName: "input",
    render: undefined,
    props: rest,
    internalProps: {
      id: `${baseId}-input-${index}`,
      type: "text",
      value: state.value[index],
      form: otp.form,
      disabled: state.disabled,
      readOnly: state.readOnly,
      inputMode: props.inputMode ?? (otp.validationType === "numeric" ? "numeric" : "text"),
      autoCapitalize: props.autoCapitalize ?? "none",
      autoComplete: props.autoComplete ?? (index === 0 ? "one-time-code" : "off"),
      spellCheck: false,
      "aria-label": props["aria-label"] ?? (hasOwnName ? undefined : otp.label),
      "aria-labelledby": hasOwnName ? props["aria-labelledby"] : otp.labelledBy,
      "aria-describedby": joinIds(props["aria-describedby"], otp.describedBy),
      "aria-invalid": state.invalid ? true : undefined,
      "aria-required": state.required || undefined,
      ...getStateAttributes(state),
      ref: inputRef,
      onChange: handleChange,
      onKeyDown: handleKeyDown,
      onPaste: handlePaste,
      onFocus: handleFocus,
      onBlur: handleBlur,
    },
  });
}

export interface OtpFieldHiddenInputProps extends Omit<
  React.ComponentProps<"input">,
  | "type"
  | "value"
  | "defaultValue"
  | "name"
  | "form"
  | "disabled"
  | "readOnly"
  | "required"
  | "minLength"
  | "maxLength"
  | "pattern"
  | "tabIndex"
  | "aria-hidden"
  | "hidden"
  | "children"
> {}

export function HiddenInput(props: OtpFieldHiddenInputProps) {
  const otp = useOtpFieldContext("HiddenInput");
  const { state, length, name, form, hiddenInputRef, field } = otp;
  const value = state.value.join("");
  const previousValue = React.useRef(value);
  const resetStateRef = React.useRef({ resetValue: otp.resetValue, value });
  resetStateRef.current = { resetValue: otp.resetValue, value };

  React.useLayoutEffect(() => {
    const input = hiddenInputRef.current;

    if (input && previousValue.current !== value) {
      previousValue.current = value;
      field?.actions.handleChange(input);
    }
  }, [field?.actions, hiddenInputRef, value]);

  React.useEffect(() => {
    const input = hiddenInputRef.current;
    const inputForm = input?.form;

    if (!input || !inputForm) {
      return undefined;
    }

    function handleReset(event: Event) {
      setTimeout(() => {
        if (!event.defaultPrevented) {
          resetStateRef.current.resetValue();
          input!.value = resetStateRef.current.value;
        }
      }, 0);
    }

    inputForm.addEventListener("reset", handleReset);
    return () => inputForm.removeEventListener("reset", handleReset);
  }, [form, hiddenInputRef]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    otp.changeValue(event.currentTarget.value.split(""), "input-change", event.nativeEvent);
  }

  function handleInvalid(event: React.InvalidEvent<HTMLInputElement>) {
    event.preventDefault();
    otp.focusInput(
      Math.max(
        0,
        state.value.findIndex((character) => character === ""),
      ),
    );
  }

  return useRender({
    defaultTagName: "input",
    render: <Field.Control />,
    props,
    internalProps: {
      type: "text",
      name,
      form,
      value,
      disabled: state.disabled,
      readOnly: state.readOnly,
      required: state.required,
      pattern: `${characterPatterns[otp.validationType]}{${length}}`,
      ...getStateAttributes(state),
      tabIndex: -1,
      "aria-hidden": true,
      style: visuallyHiddenStyle,
      ref: hiddenInputRef,
      onChange: handleChange,
      onInvalid: handleInvalid,
      onFocus: () => otp.focusInput(0),
    },
  });
}

export interface OtpFieldSeparatorProps extends PropsWithRender<
  Omit<React.ComponentProps<"span">, "aria-hidden">
> {}

export function Separator(props: OtpFieldSeparatorProps) {
  const { render, ...rest } = props;
  const { state } = useOtpFieldContext("Separator");

  return useRender({
    defaultTagName: "span",
    render,
    props: rest,
    internalProps: { ...getStateAttributes(state), "aria-hidden": true },
  });
}

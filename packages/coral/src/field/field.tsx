"use client";

import * as React from "react";

import { areValuesEqual, isPromise, joinIds, useRender, type RenderProp } from "../core/index";
import { useFieldsetContext } from "../fieldset/fieldset-context";

export type FieldValidationMode = "onSubmit" | "onBlur" | "onChange";
export type FieldValidationResult = string | readonly string[] | null;
export type FieldFormValues = Readonly<Record<string, unknown>>;
export type FieldValidate = (
  value: unknown,
  formValues: FieldFormValues,
) => FieldValidationResult | Promise<FieldValidationResult>;

export interface FieldValidityState {
  badInput: boolean;
  customError: boolean;
  patternMismatch: boolean;
  rangeOverflow: boolean;
  rangeUnderflow: boolean;
  stepMismatch: boolean;
  tooLong: boolean;
  tooShort: boolean;
  typeMismatch: boolean;
  valid: boolean;
  valueMissing: boolean;
}

export interface FieldState {
  disabled: boolean;
  touched: boolean;
  dirty: boolean;
  valid: boolean | null;
  invalid: boolean;
  filled: boolean;
  focused: boolean;
}

type FieldControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
type ValidationOutcome = boolean | Promise<boolean>;

interface InternalFieldState {
  invalid: boolean | null;
  touched: boolean;
  dirty: boolean;
  filled: boolean;
  focused: boolean;
  errors: string[];
  validity: FieldValidityState | null;
}

interface FieldContextValue {
  state: FieldState;
  actions: {
    setControl: (control: FieldControlElement | null) => void;
    setControlId: (id: string | null) => void;
    syncControl: (control: FieldControlElement) => void;
    handleChange: (control: FieldControlElement) => void;
    handleBlur: () => void;
    handleFocus: () => void;
    handleInvalid: (control: FieldControlElement) => void;
    registerDescription: (id: string) => () => void;
    registerError: (id: string) => () => void;
  };
  meta: {
    controlId: string;
    defaultControlId: string;
    labelId: string;
    name: string | undefined;
    descriptionIds: readonly string[];
    errorIds: readonly string[];
    errors: readonly string[];
    validity: FieldValidityState | null;
  };
}

interface RegisteredField {
  getControl: () => FieldControlElement | null;
  validate: (formValues: FieldFormValues) => ValidationOutcome;
}

interface RegisteredForm {
  fields: Set<RegisteredField>;
  handleSubmit: (event: SubmitEvent) => void;
}

const FieldContext = React.createContext<FieldContextValue | null>(null);
const registeredForms = new WeakMap<HTMLFormElement, RegisteredForm>();
const resumedForms = new WeakSet<HTMLFormElement>();
const initialValueUnset = Symbol("initial-value-unset");

function isFieldControlElement(value: EventTarget | null): value is FieldControlElement {
  return (
    value instanceof HTMLInputElement ||
    value instanceof HTMLSelectElement ||
    value instanceof HTMLTextAreaElement
  );
}

function readControlValue(control: FieldControlElement): unknown {
  if (control instanceof HTMLInputElement) {
    if (control.type === "checkbox") {
      return control.checked;
    }

    if (control.type === "radio") {
      return control.checked ? control.value : null;
    }

    if (control.type === "file") {
      return control.files;
    }
  }

  if (control instanceof HTMLSelectElement && control.multiple) {
    return Array.from(control.selectedOptions, (option) => option.value);
  }

  return control.value;
}

function hasControlValue(control: FieldControlElement) {
  if (control instanceof HTMLInputElement && ["checkbox", "radio"].includes(control.type)) {
    return control.checked;
  }

  if (control instanceof HTMLInputElement && control.type === "file") {
    return (control.files?.length ?? 0) > 0;
  }

  if (control instanceof HTMLSelectElement && control.multiple) {
    return control.selectedOptions.length > 0;
  }

  return control.value !== "";
}

function snapshotValidity(validity: ValidityState): FieldValidityState {
  return {
    badInput: validity.badInput,
    customError: validity.customError,
    patternMismatch: validity.patternMismatch,
    rangeOverflow: validity.rangeOverflow,
    rangeUnderflow: validity.rangeUnderflow,
    stepMismatch: validity.stepMismatch,
    tooLong: validity.tooLong,
    tooShort: validity.tooShort,
    typeMismatch: validity.typeMismatch,
    valid: validity.valid,
    valueMissing: validity.valueMissing,
  };
}

function withCustomError(validity: FieldValidityState, invalid: boolean): FieldValidityState {
  return {
    ...validity,
    customError: invalid,
    valid: !invalid,
  };
}

function getFormValues(form: HTMLFormElement): FieldFormValues {
  const values: Record<string, unknown> = {};

  for (const [name, value] of new FormData(form)) {
    const previousValue = values[name];

    if (previousValue === undefined) {
      values[name] = value;
    } else if (Array.isArray(previousValue)) {
      previousValue.push(value);
    } else {
      values[name] = [previousValue, value];
    }
  }

  return values;
}

function sortFieldsByDocumentOrder(fields: readonly RegisteredField[]) {
  return fields.toSorted((first, second) => {
    const firstControl = first.getControl();
    const secondControl = second.getControl();

    if (!firstControl || !secondControl || firstControl === secondControl) {
      return 0;
    }

    return firstControl.compareDocumentPosition(secondControl) & Node.DOCUMENT_POSITION_FOLLOWING
      ? -1
      : 1;
  });
}

function focusFirstInvalid(fields: readonly RegisteredField[], results: readonly boolean[]) {
  const firstInvalidIndex = results.findIndex((valid) => !valid);
  const control = firstInvalidIndex === -1 ? null : fields[firstInvalidIndex]?.getControl();

  queueMicrotask(() => control?.focus());
}

function resumeFormSubmission(form: HTMLFormElement, submitter: HTMLElement | null) {
  setTimeout(() => {
    resumedForms.add(form);

    if (submitter instanceof HTMLButtonElement || submitter instanceof HTMLInputElement) {
      form.requestSubmit(submitter);
    } else {
      form.requestSubmit();
    }

    queueMicrotask(() => resumedForms.delete(form));
  });
}

function registerField(form: HTMLFormElement, field: RegisteredField) {
  let registeredForm = registeredForms.get(form);

  if (!registeredForm) {
    const fields = new Set<RegisteredField>();
    const handleSubmit = (event: SubmitEvent) => {
      if (resumedForms.delete(form)) {
        return;
      }

      const orderedFields = sortFieldsByDocumentOrder([...fields]);
      const formValues = getFormValues(form);
      const outcomes = orderedFields.map((registeredField) => registeredField.validate(formValues));
      const hasAsyncValidation = outcomes.some((outcome) => outcome instanceof Promise);

      if (hasAsyncValidation) {
        event.preventDefault();
        event.stopPropagation();

        void Promise.all(outcomes).then((results) => {
          if (results.every(Boolean)) {
            resumeFormSubmission(form, event.submitter);
          } else {
            focusFirstInvalid(orderedFields, results);
          }
        });

        return;
      }

      const results = outcomes as boolean[];

      if (results.some((valid) => !valid)) {
        event.preventDefault();
        event.stopPropagation();
        focusFirstInvalid(orderedFields, results);
      }
    };

    registeredForm = { fields, handleSubmit };
    registeredForms.set(form, registeredForm);
    form.addEventListener("submit", handleSubmit, { capture: true });
  }

  registeredForm.fields.add(field);

  return () => {
    const currentForm = registeredForms.get(form);

    if (!currentForm) {
      return;
    }

    currentForm.fields.delete(field);

    if (currentForm.fields.size === 0) {
      form.removeEventListener("submit", currentForm.handleSubmit, {
        capture: true,
      });
      registeredForms.delete(form);
    }
  };
}

function getStateAttributes(state: FieldState) {
  return {
    "data-disabled": state.disabled ? "" : undefined,
    "data-valid": state.valid === true ? "" : undefined,
    "data-invalid": state.invalid ? "" : undefined,
    "data-dirty": state.dirty ? "" : undefined,
    "data-touched": state.touched ? "" : undefined,
    "data-filled": state.filled ? "" : undefined,
    "data-focused": state.focused ? "" : undefined,
  };
}

function useFieldContext(part: string) {
  const context = React.use(FieldContext);

  if (context === null) {
    throw new globalThis.Error(`Field.${part} must be used within Field.Root.`);
  }

  return context;
}

interface FieldRenderProps {
  render?: RenderProp;
}

export interface FieldRootProps extends React.ComponentProps<"div">, FieldRenderProps {
  name?: string;
  disabled?: boolean;
  invalid?: boolean;
  touched?: boolean;
  dirty?: boolean;
  validate?: FieldValidate;
  validationMode?: FieldValidationMode;
  validationDebounceTime?: number;
}

export function Root(props: FieldRootProps) {
  const {
    name,
    disabled: disabledProp = false,
    invalid: invalidProp,
    touched: touchedProp,
    dirty: dirtyProp,
    validate,
    validationMode = "onSubmit",
    validationDebounceTime = 0,
    id: idProp,
    render,
    ref,
    ...rest
  } = props;
  const fieldsetDisabled = useFieldsetContext("Field.Root", true) ?? false;
  const disabled = fieldsetDisabled || disabledProp;
  const hasCustomValidator = validate !== undefined;
  const generatedId = React.useId();
  const baseId = idProp ?? `${generatedId}-field`;
  const rootId = idProp ?? `${baseId}-root`;
  const defaultControlId = `${baseId}-control`;
  const controlRef = React.useRef<FieldControlElement | null>(null);
  const initialValueRef = React.useRef<unknown>(initialValueUnset);
  const validationRunRef = React.useRef(0);
  const hasValidatedRef = React.useRef(false);
  const validationTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const validateRef = React.useRef(validate);
  const validationModeRef = React.useRef(validationMode);
  const validationDebounceTimeRef = React.useRef(validationDebounceTime);
  const disabledRef = React.useRef(disabled);
  const nameRef = React.useRef(name);
  const [controlElement, setControlElement] = React.useState<FieldControlElement | null>(null);
  const [controlId, setControlId] = React.useState<string | null>(null);
  const [descriptionIds, setDescriptionIds] = React.useState<string[]>([]);
  const [errorIds, setErrorIds] = React.useState<string[]>([]);
  const [internalState, setInternalState] = React.useState<InternalFieldState>({
    invalid: null,
    touched: false,
    dirty: false,
    filled: false,
    focused: false,
    errors: [],
    validity: null,
  });

  validateRef.current = validate;
  validationModeRef.current = validationMode;
  validationDebounceTimeRef.current = validationDebounceTime;
  disabledRef.current = disabled;
  nameRef.current = name;

  const syncControl = React.useCallback((control: FieldControlElement) => {
    const value = readControlValue(control);

    if (initialValueRef.current === initialValueUnset) {
      initialValueRef.current = value;
    }

    setInternalState((current) => {
      const filled = hasControlValue(control);
      const dirty = !areValuesEqual(initialValueRef.current, value);

      if (current.filled === filled && current.dirty === dirty) {
        return current;
      }

      return { ...current, filled, dirty };
    });
  }, []);

  const applyNativeInvalid = React.useCallback((control: FieldControlElement) => {
    validationRunRef.current += 1;
    hasValidatedRef.current = true;
    const validity = snapshotValidity(control.validity);

    setInternalState((current) => ({
      ...current,
      invalid: true,
      errors: control.validationMessage ? [control.validationMessage] : [],
      validity,
    }));
  }, []);

  const runValidation = React.useCallback(
    (providedFormValues?: FieldFormValues): ValidationOutcome => {
      const control = controlRef.current;

      if (!control || disabledRef.current) {
        return true;
      }

      const runId = validationRunRef.current + 1;
      validationRunRef.current = runId;
      hasValidatedRef.current = true;
      const nativeValidity = snapshotValidity(control.validity);

      if (!nativeValidity.valid) {
        setInternalState((current) => ({
          ...current,
          invalid: true,
          errors: control.validationMessage ? [control.validationMessage] : [],
          validity: nativeValidity,
        }));
        return false;
      }

      const validator = validateRef.current;

      if (!validator) {
        setInternalState((current) => ({
          ...current,
          invalid: false,
          errors: [],
          validity: nativeValidity,
        }));
        return true;
      }

      const value = readControlValue(control);
      const formValues =
        providedFormValues ??
        (control.form
          ? getFormValues(control.form)
          : nameRef.current
            ? { [nameRef.current]: value }
            : {});
      const result = validator(value, formValues);

      const applyResult = (validationResult: FieldValidationResult) => {
        if (runId !== validationRunRef.current) {
          return false;
        }

        const errors =
          validationResult === null
            ? []
            : typeof validationResult === "string"
              ? [validationResult]
              : [...validationResult];
        const invalid = errors.length > 0;

        setInternalState((current) => ({
          ...current,
          invalid,
          errors,
          validity: withCustomError(nativeValidity, invalid),
        }));

        return !invalid;
      };

      return isPromise(result) ? result.then(applyResult) : applyResult(result);
    },
    [],
  );

  const scheduleValidation = React.useCallback(() => {
    validationRunRef.current += 1;

    if (validationTimerRef.current !== null) {
      clearTimeout(validationTimerRef.current);
    }

    const debounceTime = validationDebounceTimeRef.current;

    if (debounceTime > 0) {
      validationTimerRef.current = setTimeout(() => {
        validationTimerRef.current = null;
        void runValidation();
      }, debounceTime);
    } else {
      void runValidation();
    }
  }, [runValidation]);

  const setControl = React.useCallback(
    (control: FieldControlElement | null) => {
      controlRef.current = control;
      setControlElement(control);
      setControlId(control?.id ?? null);

      if (control) {
        syncControl(control);
      }
    },
    [syncControl],
  );

  const handleChange = React.useCallback(
    (control: FieldControlElement) => {
      syncControl(control);

      if (
        validationModeRef.current === "onChange" ||
        (validationModeRef.current === "onSubmit" && hasValidatedRef.current)
      ) {
        scheduleValidation();
      }
    },
    [scheduleValidation, syncControl],
  );

  const handleBlur = React.useCallback(() => {
    setInternalState((current) => ({
      ...current,
      focused: false,
      touched: true,
    }));

    if (validationModeRef.current === "onBlur") {
      void runValidation();
    }
  }, [runValidation]);

  const handleFocus = React.useCallback(() => {
    setInternalState((current) => ({ ...current, focused: true }));
  }, []);

  const registerDescription = React.useCallback((id: string) => {
    setDescriptionIds((current) => (current.includes(id) ? current : [...current, id]));

    return () => {
      setDescriptionIds((current) => current.filter((currentId) => currentId !== id));
    };
  }, []);

  const registerError = React.useCallback((id: string) => {
    setErrorIds((current) => (current.includes(id) ? current : [...current, id]));

    return () => {
      setErrorIds((current) => current.filter((currentId) => currentId !== id));
    };
  }, []);

  React.useEffect(() => {
    return () => {
      if (validationTimerRef.current !== null) {
        clearTimeout(validationTimerRef.current);
      }
    };
  }, []);

  React.useEffect(() => {
    const form = controlElement?.form;

    if (!form || !hasCustomValidator) {
      return undefined;
    }

    return registerField(form, {
      getControl: () => controlRef.current,
      validate: runValidation,
    });
  }, [controlElement, hasCustomValidator, runValidation]);

  const invalid = invalidProp ?? internalState.invalid === true;
  const valid =
    invalidProp === undefined
      ? internalState.invalid === null
        ? null
        : !internalState.invalid
      : !invalidProp;
  const state: FieldState = {
    disabled,
    touched: touchedProp ?? internalState.touched,
    dirty: dirtyProp ?? internalState.dirty,
    valid,
    invalid,
    filled: internalState.filled,
    focused: internalState.focused,
  };
  const actions = React.useMemo(
    () => ({
      setControl,
      setControlId,
      syncControl,
      handleChange,
      handleBlur,
      handleFocus,
      handleInvalid: applyNativeInvalid,
      registerDescription,
      registerError,
    }),
    [
      applyNativeInvalid,
      handleBlur,
      handleChange,
      handleFocus,
      registerDescription,
      registerError,
      setControl,
      syncControl,
    ],
  );
  const context = React.useMemo<FieldContextValue>(
    () => ({
      state,
      actions,
      meta: {
        controlId: controlId ?? defaultControlId,
        defaultControlId,
        labelId: `${baseId}-label`,
        name,
        descriptionIds,
        errorIds,
        errors: internalState.errors,
        validity: internalState.validity,
      },
    }),
    [
      actions,
      controlId,
      defaultControlId,
      descriptionIds,
      errorIds,
      internalState.errors,
      internalState.validity,
      name,
      state,
    ],
  );
  const element = useRender({
    defaultTagName: "div",
    render,
    props: { ...rest, ref },
    internalProps: {
      id: rootId,
      ...getStateAttributes(state),
    },
  });

  return <FieldContext value={context}>{element}</FieldContext>;
}

export interface FieldLabelProps
  extends Omit<React.ComponentProps<"label">, "htmlFor">, FieldRenderProps {}

export function Label(props: FieldLabelProps) {
  const { render, ref, ...rest } = props;
  const field = useFieldContext("Label");

  return useRender({
    defaultTagName: "label",
    render,
    props: { ...rest, ref },
    internalProps: {
      id: props.id ?? field.meta.labelId,
      htmlFor: field.meta.controlId,
      ...getStateAttributes(field.state),
    },
  });
}

export interface FieldControlProps extends React.ComponentProps<"input">, FieldRenderProps {}

export function Control(props: FieldControlProps) {
  const {
    disabled: disabledProp = false,
    render,
    ref,
    "aria-describedby": ariaDescribedBy,
    ...rest
  } = props;
  const field = React.use(FieldContext);
  const setControl = field?.actions.setControl;
  const setControlId = field?.actions.setControlId;
  const syncControl = field?.actions.syncControl;
  const controlRef = React.useRef<HTMLInputElement | null>(null);
  const value = props.value;
  const checked = props.checked;
  const id = field ? (props.id ?? field.meta.defaultControlId) : props.id;

  const handleControlRef = React.useCallback(
    (control: HTMLInputElement | null) => {
      controlRef.current = control;
      setControl?.(control);
    },
    [setControl],
  );

  React.useLayoutEffect(() => {
    const control = controlRef.current;

    if (isFieldControlElement(control)) {
      syncControl?.(control);
    }
  }, [checked, syncControl, value]);

  React.useLayoutEffect(() => {
    if (controlRef.current) {
      setControlId?.(controlRef.current.id);
    }
  }, [id, setControlId]);

  const disabled = field ? field.state.disabled || disabledProp : disabledProp;
  const describedBy = field
    ? joinIds(
        ariaDescribedBy,
        field.meta.descriptionIds,
        field.state.invalid ? field.meta.errorIds : undefined,
      )
    : ariaDescribedBy;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (field && isFieldControlElement(event.currentTarget)) {
      field.actions.handleChange(event.currentTarget);
    }
  }

  function handleInvalid(event: React.InvalidEvent<HTMLInputElement>) {
    if (field && isFieldControlElement(event.currentTarget)) {
      field.actions.handleInvalid(event.currentTarget);
    }
  }

  const internalProps = field
    ? {
        id,
        name: field.meta.name ?? rest.name,
        disabled,
        "aria-invalid": field.state.invalid ? true : undefined,
        "aria-describedby": describedBy,
        ...getStateAttributes(field.state),
        ref: handleControlRef,
        onChange: handleChange,
        onBlur: field.actions.handleBlur,
        onFocus: field.actions.handleFocus,
        onInvalid: handleInvalid,
      }
    : {
        disabled,
        "data-disabled": disabled ? "" : undefined,
        ref: handleControlRef,
      };

  return useRender({
    defaultTagName: "input",
    render,
    props: { ...rest, "aria-describedby": ariaDescribedBy, ref },
    internalProps,
  });
}

export interface FieldDescriptionProps extends React.ComponentProps<"p">, FieldRenderProps {}

export function Description(props: FieldDescriptionProps) {
  const { render, ref, ...rest } = props;
  const field = useFieldContext("Description");
  const generatedId = React.useId();
  const id = props.id ?? `${generatedId}-field-description`;

  React.useLayoutEffect(() => {
    if (!id) {
      return undefined;
    }

    return field.actions.registerDescription(id);
  }, [field.actions, id]);

  return useRender({
    defaultTagName: "p",
    render,
    props: { ...rest, ref },
    internalProps: {
      id,
      ...getStateAttributes(field.state),
    },
  });
}

export type FieldErrorMatch =
  | boolean
  | "badInput"
  | "customError"
  | "patternMismatch"
  | "rangeOverflow"
  | "rangeUnderflow"
  | "stepMismatch"
  | "tooLong"
  | "tooShort"
  | "typeMismatch"
  | "valueMissing";

export interface FieldErrorProps extends React.ComponentProps<"div">, FieldRenderProps {
  match?: FieldErrorMatch;
}

export function Error(props: FieldErrorProps) {
  const { match, children, render, ref, ...rest } = props;
  const field = useFieldContext("Error");
  const generatedId = React.useId();
  const id = props.id ?? `${generatedId}-field-error`;
  let visible: boolean;

  if (match === undefined) {
    visible = field.state.invalid;
  } else if (typeof match === "boolean") {
    visible = match;
  } else {
    visible = Boolean(field.meta.validity?.[match]);
  }

  React.useLayoutEffect(() => {
    if (!visible || !id) {
      return undefined;
    }

    return field.actions.registerError(id);
  }, [field.actions, id, visible]);

  const element = useRender({
    defaultTagName: "div",
    render,
    props: { ...rest, children: children ?? field.meta.errors.join(" "), ref },
    internalProps: {
      id,
      ...getStateAttributes(field.state),
    },
  });

  return visible ? element : null;
}

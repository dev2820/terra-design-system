"use client";

import { createPartContext } from "../core";
import type { FieldState, FieldValidityState } from "./field";

export type FieldControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
export interface FieldContextValue {
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

export const [FieldContext, useFieldContext] = createPartContext<FieldContextValue>("Field");

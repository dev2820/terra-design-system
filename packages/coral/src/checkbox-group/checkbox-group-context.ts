"use client";

import type { CheckboxChangeEventDetails } from "../checkbox";
import { createPartContext } from "../core";

export interface CheckboxGroupState {
  disabled: boolean;
  readOnly: boolean;
}

export interface CheckboxGroupContextValue {
  name: string;
  form: string | undefined;
  value: readonly string[];
  state: CheckboxGroupState;
  toggle: (value: string, checked: boolean, details: CheckboxChangeEventDetails) => void;
}

export const [CheckboxGroupContext, useCheckboxGroupContext] =
  createPartContext<CheckboxGroupContextValue>("CheckboxGroup");

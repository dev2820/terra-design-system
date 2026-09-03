"use client";

import { Field } from "../field/index";
import type { FieldControlProps } from "../field/index";

export interface InputProps extends FieldControlProps {}

export function Input(props: InputProps) {
  return <Field.Control {...props} />;
}

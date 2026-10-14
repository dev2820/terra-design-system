"use client";

import { Field } from "../field";
import type { FieldControlProps } from "../field";

export interface InputProps extends FieldControlProps {}

export function Input(props: InputProps) {
  return <Field.Control {...props} />;
}

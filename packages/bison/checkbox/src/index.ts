import type { Pattern } from "@bison/core";

import { connect } from "./connect";
import { machine } from "./machine";
import type {
  CheckboxEvent,
  CheckboxPatternTypes,
  CheckboxProps,
  CheckboxPropTypes,
  CheckboxState,
} from "./types";

export type { CheckboxApi, CheckboxCheckedState, CheckboxProps } from "./types";

export const checkbox = {
  machine,
  connect,
} as Pattern<CheckboxProps, CheckboxState, CheckboxEvent, CheckboxPropTypes, CheckboxPatternTypes>;

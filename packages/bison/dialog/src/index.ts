import type { Pattern } from "@bison/core";

import { connect } from "./connect";
import { machine } from "./machine";
import type {
  DialogEvent,
  DialogPatternTypes,
  DialogPropTypes,
  DialogProps,
  DialogState,
} from "./types";

export type { DialogApi, DialogContentProps, DialogModalContract, DialogProps } from "./types";

export const dialog = {
  machine,
  connect,
} as Pattern<DialogProps, DialogState, DialogEvent, DialogPropTypes, DialogPatternTypes>;

import type { Pattern } from "@bison/core";

import { connect } from "./connect";
import { machine } from "./machine";
import type {
  AlertDialogEvent,
  AlertDialogPatternTypes,
  AlertDialogPropTypes,
  AlertDialogProps,
  AlertDialogState,
} from "./types";

export type { AlertDialogApi, AlertDialogContentProps, AlertDialogProps } from "./types";

export const alertDialog = {
  machine,
  connect,
} as Pattern<
  AlertDialogProps,
  AlertDialogState,
  AlertDialogEvent,
  AlertDialogPropTypes,
  AlertDialogPatternTypes
>;

import type { Pattern } from "@bison/core";

import { connect } from "./connect";
import { machine } from "./machine";
import type {
  AlertEvent,
  AlertPatternTypes,
  AlertPropTypes,
  AlertProps,
  AlertState,
} from "./types";

export const alert = {
  machine,
  connect,
} as Pattern<AlertProps, AlertState, AlertEvent, AlertPropTypes, AlertPatternTypes>;

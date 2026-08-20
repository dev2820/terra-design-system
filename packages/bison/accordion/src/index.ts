import type { Pattern } from "@bison/core";

import { connect } from "./connect";
import { machine } from "./machine";
import type {
  AccordionEvent,
  AccordionPatternTypes,
  AccordionPropTypes,
  AccordionProps,
  AccordionState,
} from "./types";

export type { AccordionApi, AccordionProps } from "./types";

export const accordion = {
  machine,
  connect,
} as Pattern<
  AccordionProps,
  AccordionState,
  AccordionEvent,
  AccordionPropTypes,
  AccordionPatternTypes
>;

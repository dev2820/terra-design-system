import { connect } from "./connect";
import { machine } from "./machine";

export type { AccordionApi, AccordionProps } from "./types";

export const accordion = {
  machine,
  connect,
};

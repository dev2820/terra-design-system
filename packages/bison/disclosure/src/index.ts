import type { Pattern } from "@bison/core";

import { connect } from "./connect";
import { machine } from "./machine";
import type {
  DisclosureEvent,
  DisclosurePatternTypes,
  DisclosureProps,
  DisclosurePropTypes,
  DisclosureState,
} from "./types";

export type { DisclosureApi, DisclosureProps } from "./types";

export const disclosure = {
  machine,
  connect,
} as Pattern<
  DisclosureProps,
  DisclosureState,
  DisclosureEvent,
  DisclosurePropTypes,
  DisclosurePatternTypes
>;

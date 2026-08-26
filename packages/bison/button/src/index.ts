import type { Pattern } from "@bison/core";

import { connect } from "./connect";
import { machine } from "./machine";
import type {
  ButtonEvent,
  ButtonPatternTypes,
  ButtonPropTypes,
  ButtonProps,
  ButtonState,
} from "./types";

export type { ButtonApi, ButtonProps, ButtonType } from "./types";

export const button = {
  machine,
  connect,
} as Pattern<ButtonProps, ButtonState, ButtonEvent, ButtonPropTypes, ButtonPatternTypes>;

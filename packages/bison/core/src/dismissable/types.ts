import type { OpenableEvent, OpenableProps, OpenableState } from "../openable/types";

export type DismissableProps = OpenableProps;

export type DismissableState = OpenableState;

export type DismissableEvent = OpenableEvent | { type: "dismiss" };

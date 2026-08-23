import type { Actor, ElementProps, MachineSnapshot, PatternTypes } from "@bison/core";

export type AlertProps = Record<never, never>;

export type AlertState = undefined;

export type AlertEvent = never;

export type AlertSnapshot = MachineSnapshot<AlertProps, AlertState>;

export type AlertActor = Actor<AlertProps, AlertState, AlertEvent>;

export interface AlertPropTypes {
  element: unknown;
}

interface DefaultAlertPropTypes {
  element: ElementProps;
}

export interface AlertApi<Props extends AlertPropTypes = DefaultAlertPropTypes> {
  getRootProps: () => Props["element"];
}

export interface AlertPatternTypes extends PatternTypes {
  api: this["props"] extends AlertProps
    ? this["propTypes"] extends AlertPropTypes
      ? AlertApi<this["propTypes"]>
      : never
    : never;
}

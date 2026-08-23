import type { Actor, NormalizeProps } from "@bison/core";

import type { AlertApi, AlertEvent, AlertPropTypes, AlertProps, AlertState } from "./types";

export function connect<MachineProps extends AlertProps, Props extends AlertPropTypes>(
  _actor: Actor<MachineProps, AlertState, AlertEvent>,
  normalize: NormalizeProps<Props>,
): AlertApi<Props> {
  return {
    getRootProps: () => normalize.element({ role: "alert" }),
  };
}

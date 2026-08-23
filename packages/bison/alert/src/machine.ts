import type { Machine } from "@bison/core";

import type { AlertEvent, AlertProps, AlertState } from "./types";

export const machine: Machine<AlertProps, AlertState, AlertEvent> = {
  initial: () => undefined,
  transition: (state) => state,
};

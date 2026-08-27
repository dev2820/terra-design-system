import { dismissableMachine, type Machine } from "@bison/core";

import type { AlertDialogEvent, AlertDialogProps, AlertDialogState } from "./types";

export const machine: Machine<AlertDialogProps, AlertDialogState, AlertDialogEvent> =
  dismissableMachine;

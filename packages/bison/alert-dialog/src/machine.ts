import { dismissableMachine, type Machine } from "@bison/core";

import type { AlertDialogEvent, AlertDialogProps, AlertDialogState } from "./types";

type AlertDialogMachine = Machine<AlertDialogProps, AlertDialogState, AlertDialogEvent> & {
  getOpen: (state: AlertDialogState, props: AlertDialogProps) => boolean;
};

export const machine: AlertDialogMachine = dismissableMachine;

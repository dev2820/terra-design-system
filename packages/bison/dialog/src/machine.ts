import { dismissableMachine, type Machine } from "@bison/core";

import type { DialogEvent, DialogProps, DialogState } from "./types";

type DialogMachine = Machine<DialogProps, DialogState, DialogEvent> & {
  getOpen: (state: DialogState, props: DialogProps) => boolean;
};

export const machine: DialogMachine = dismissableMachine;

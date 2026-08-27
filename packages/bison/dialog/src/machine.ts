import { dismissableMachine, type Machine } from "@bison/core";

import type { DialogEvent, DialogProps, DialogState } from "./types";

export const machine: Machine<DialogProps, DialogState, DialogEvent> = dismissableMachine;

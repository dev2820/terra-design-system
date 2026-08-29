import { openableMachine, type Machine } from "@bison/core";

import type { DisclosureEvent, DisclosureProps, DisclosureState } from "./types";

export const machine: Machine<DisclosureProps, DisclosureState, DisclosureEvent> = {
  ...openableMachine,
  transition(state: DisclosureState, event: DisclosureEvent, props: DisclosureProps) {
    if (event.type === "toggle" && props.disabled) {
      return state;
    }

    return openableMachine.transition(state, event, props);
  },
};

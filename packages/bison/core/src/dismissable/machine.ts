import type { Machine } from "../index";
import { openableMachine } from "../openable/machine";
import type { DismissableEvent, DismissableProps, DismissableState } from "./types";

export const dismissableMachine = {
  ...openableMachine,

  transition(
    state: DismissableState,
    event: DismissableEvent,
    props: DismissableProps,
  ): DismissableState {
    if (event.type === "dismiss") {
      return openableMachine.transition(state, { type: "close" }, props);
    }

    return openableMachine.transition(state, event, props);
  },
} satisfies Machine<DismissableProps, DismissableState, DismissableEvent>;

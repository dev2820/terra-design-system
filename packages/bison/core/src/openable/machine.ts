import type { Machine } from "../index";
import type { OpenableEvent, OpenableProps, OpenableState } from "./types";

function getOpen(state: OpenableState, props: OpenableProps) {
  return props.open ?? state.open;
}

export const openableMachine = {
  getOpen,

  initial(props: OpenableProps): OpenableState {
    return { open: props.defaultOpen ?? false };
  },

  transition(state: OpenableState, event: OpenableEvent, props: OpenableProps): OpenableState {
    const open = getOpen(state, props);
    const nextOpen =
      event.type === "open"
        ? true
        : event.type === "close"
          ? false
          : event.type === "toggle"
            ? !open
            : event.open;

    if (open === nextOpen) {
      return state;
    }

    props.onOpenChange?.(nextOpen);

    return { open: nextOpen };
  },
} satisfies Machine<OpenableProps, OpenableState, OpenableEvent> & {
  getOpen: typeof getOpen;
};

import type { Actor, Machine } from "@bison/core";
import { useRef, useSyncExternalStore } from "react";

interface MachineStore<Props, State, Event> {
  getSnapshot: () => State;
  send: (event: Event, props: Props) => void;
  subscribe: (listener: () => void) => () => void;
}

function createStore<Props, State, Event>(
  machine: Machine<Props, State, Event>,
  props: Props,
): MachineStore<Props, State, Event> {
  let state = machine.initial(props);
  const listeners = new Set<() => void>();

  return {
    getSnapshot: () => state,
    send(event, currentProps) {
      const nextState = machine.transition(state, event, currentProps);

      if (Object.is(state, nextState)) {
        return;
      }

      state = nextState;

      for (const listener of listeners) {
        listener();
      }
    },
    subscribe(listener) {
      listeners.add(listener);

      return () => listeners.delete(listener);
    },
  };
}

export function useMachine<MachineProps, const Props extends MachineProps, State, Event>(
  machine: Machine<MachineProps, State, Event>,
  props: Props,
): Actor<Props, State, Event> {
  const storeRef = useRef<MachineStore<MachineProps, State, Event> | null>(null);
  let store = storeRef.current;

  if (store === null) {
    const initialStore = createStore<MachineProps, State, Event>(machine, props);

    storeRef.current = initialStore;
    store = initialStore;
  }

  const state = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);

  return {
    getSnapshot: () => ({ props, state }),
    send: (event) => store.send(event, props),
  };
}

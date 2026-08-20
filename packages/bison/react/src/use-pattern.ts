import type {
  Actor,
  Machine,
  NormalizeProps,
  Pattern,
  PatternApi,
  PatternTypes,
} from "@bison/core";
import type { ButtonHTMLAttributes, HTMLAttributes } from "react";
import { useRef, useSyncExternalStore } from "react";

interface ReactPropTypes {
  element: HTMLAttributes<HTMLElement>;
  button: ButtonHTMLAttributes<HTMLButtonElement>;
}

interface PatternStore<Props, State, Event> {
  getSnapshot: () => State;
  send: (event: Event, props: Props) => void;
  subscribe: (listener: () => void) => () => void;
}

const normalizeProps: NormalizeProps<ReactPropTypes> = {
  element: (props) => props as HTMLAttributes<HTMLElement>,
  button: (props) => props as ButtonHTMLAttributes<HTMLButtonElement>,
};

function createStore<Props, State, Event>(
  machine: Machine<Props, State, Event>,
  props: Props,
): PatternStore<Props, State, Event> {
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

export function usePattern<
  PatternProps,
  const Props extends PatternProps,
  State,
  Event,
  SupportedPropTypes extends object,
  Types extends PatternTypes,
>(
  pattern: Pattern<PatternProps, State, Event, SupportedPropTypes, Types> &
    (ReactPropTypes extends SupportedPropTypes ? unknown : never),
  props: Props,
): PatternApi<Types, Props, ReactPropTypes> {
  const storeRef = useRef<PatternStore<PatternProps, State, Event> | null>(null);
  let store = storeRef.current;

  if (store === null) {
    store = createStore<PatternProps, State, Event>(pattern.machine, props);
    storeRef.current = store;
  }

  const state = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
  const actor: Actor<Props, State, Event> = {
    getSnapshot: () => ({ props, state }),
    send: (event) => store.send(event, props),
  };

  const connect = pattern.connect as (
    actor: Actor<Props, State, Event>,
    normalize: NormalizeProps<ReactPropTypes>,
  ) => PatternApi<Types, Props, ReactPropTypes>;

  return connect(actor, normalizeProps);
}

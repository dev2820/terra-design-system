"use client";

import * as React from "react";

export interface ChangeDetails {
  readonly event: Event;
  readonly reason: string;
  readonly isCanceled: boolean;
  cancel(): void;
}

export function changeDetails(event: Event, reason: string): ChangeDetails {
  let canceled = false;
  return {
    event,
    reason,
    get isCanceled() {
      return canceled;
    },
    cancel() {
      canceled = true;
    },
  };
}

function setRef(ref: React.Ref<unknown>, node: unknown) {
  if (typeof ref === "function") return ref(node);
  if (ref) ref.current = node;
}

// Getters own required attributes. User handlers run before the internal handler.
export function mergeProps<T extends object>(user: T, owned: object): T {
  const result: Record<string, unknown> = { ...user } as Record<string, unknown>;
  for (const [key, value] of Object.entries(owned)) {
    const previous = result[key];
    if (key === "ref" && previous && value) {
      result[key] = (node: unknown) => {
        const refs = [previous, value] as React.Ref<unknown>[];
        const cleanups = refs.map((ref) => setRef(ref, node));
        return () =>
          refs.forEach((ref, i) => {
            const cleanup = cleanups[i];
            if (typeof cleanup === "function") cleanup();
            else setRef(ref, null);
          });
      };
    } else if (
      /^on[A-Z]/.test(key) &&
      typeof previous === "function" &&
      typeof value === "function"
    ) {
      result[key] = (event: React.SyntheticEvent) => {
        previous(event);
        value(event);
      };
    } else if (key === "style") {
      result[key] = { ...(value as object), ...(previous as object) };
    } else {
      result[key] = value;
    }
  }
  return result as T;
}

export type WithRender<T> = T & { render?: React.ReactElement };

export function part<T extends object>(
  tag: keyof React.JSX.IntrinsicElements,
  getter: (props: T) => T,
  props: WithRender<T>,
) {
  const { render, ...rest } = props;
  const element = render ?? React.createElement(tag);
  const user = mergeProps(element.props as T, rest);
  return React.cloneElement(element, getter(user));
}

export function context<T>(name: string) {
  const Context = React.createContext<T | null>(null);
  function useContext() {
    const value = React.use(Context);
    if (!value) throw new Error(`${name} Part requires its Root.`);
    return value;
  }
  return [Context, useContext] as const;
}

export const visuallyHidden: React.CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clipPath: "inset(50%)",
  whiteSpace: "nowrap",
  border: 0,
};

export function useFormReset(
  inputs: React.RefObject<Map<number, HTMLInputElement>>,
  reset: () => void,
) {
  const resetRef = React.useRef(reset);
  const bindings = React.useRef(new Map<HTMLFormElement, (event: Event) => void>());
  const timers = React.useRef(new Set<ReturnType<typeof setTimeout>>());
  const sync = React.useCallback(() => {
    const forms = new Set([...inputs.current.values()].map((input) => input.form).filter(Boolean));
    for (const [form, handler] of bindings.current) {
      if (!forms.has(form)) {
        form.removeEventListener("reset", handler);
        bindings.current.delete(form);
      }
    }
    for (const form of forms) {
      if (!form || bindings.current.has(form)) continue;
      const handler = (event: Event) => {
        const timer = setTimeout(() => {
          timers.current.delete(timer);
          if (!event.defaultPrevented) resetRef.current();
        }, 0);
        timers.current.add(timer);
      };
      form.addEventListener("reset", handler);
      bindings.current.set(form, handler);
    }
  }, [inputs]);
  React.useLayoutEffect(() => {
    resetRef.current = reset;
    sync();
  });
  React.useLayoutEffect(() => {
    sync();
    return () => {
      for (const [form, handler] of bindings.current) form.removeEventListener("reset", handler);
      bindings.current.clear();
      for (const timer of timers.current) clearTimeout(timer);
      timers.current.clear();
    };
  }, [sync]);
  return React.useCallback(
    (index: number, input: HTMLInputElement | null) => {
      if (input) inputs.current.set(index, input);
      else inputs.current.delete(index);
      sync();
    },
    [inputs, sync],
  );
}

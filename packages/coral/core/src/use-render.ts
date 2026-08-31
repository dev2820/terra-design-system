"use client";

import * as React from "react";

type Props = Record<string, unknown>;
type EventHandler = (...args: unknown[]) => unknown;
type RefCleanup = (() => void) | undefined;

export type RenderProp = React.ReactElement;

export interface UseRenderOptions {
  defaultTagName: keyof React.JSX.IntrinsicElements;
  render: RenderProp | undefined;
  props: object;
  internalProps?: object;
}

function isEventHandler(name: string, value: unknown): value is EventHandler {
  const firstLetter = name.charAt(2);

  return (
    name.startsWith("on") &&
    firstLetter !== "" &&
    firstLetter === firstLetter.toUpperCase() &&
    typeof value === "function"
  );
}

function composeEventHandlers(first: EventHandler, second: EventHandler): EventHandler {
  return function composedEventHandler(this: unknown, ...args) {
    first.apply(this, args);
    second.apply(this, args);
  };
}

function mergeClassNames(first: unknown, second: unknown) {
  if (
    (typeof first === "string" || first === undefined) &&
    (typeof second === "string" || second === undefined)
  ) {
    const className = [first, second].filter(Boolean).join(" ");

    return className || undefined;
  }

  return second;
}

function isStyle(value: unknown): value is Props {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function mergeStyles(first: unknown, second: unknown) {
  if (isStyle(first) && isStyle(second)) {
    return { ...first, ...second };
  }

  return second ?? first;
}

function mergeProps(...sources: Props[]) {
  const merged: Props = {};

  for (const source of sources) {
    for (const [name, value] of Object.entries(source)) {
      if (name === "ref") {
        continue;
      }

      const previousValue = merged[name];

      if (name === "className") {
        merged[name] = mergeClassNames(previousValue, value);
      } else if (name === "style") {
        merged[name] = mergeStyles(previousValue, value);
      } else if (isEventHandler(name, previousValue) && isEventHandler(name, value)) {
        merged[name] = composeEventHandlers(previousValue, value);
      } else {
        merged[name] = value;
      }
    }
  }

  return merged;
}

function readRef(value: unknown): React.Ref<unknown> | undefined {
  if (
    value === null ||
    typeof value === "function" ||
    (typeof value === "object" && value !== null && "current" in value)
  ) {
    return value as React.Ref<unknown>;
  }

  return undefined;
}

function setRef(ref: Exclude<React.Ref<unknown>, null>, value: unknown): RefCleanup {
  if (typeof ref === "function") {
    const cleanup = ref(value);

    return typeof cleanup === "function" ? cleanup : undefined;
  }

  ref.current = value;
  return undefined;
}

function mergeRefs(...refs: Array<React.Ref<unknown> | undefined>) {
  const activeRefs = refs.filter(
    (ref): ref is Exclude<React.Ref<unknown>, null> => ref !== null && ref !== undefined,
  );

  if (activeRefs.length === 0) {
    return undefined;
  }

  if (activeRefs.length === 1) {
    return activeRefs[0];
  }

  return (value: unknown) => {
    const cleanups = activeRefs.map((ref) => setRef(ref, value));

    if (value === null) {
      return;
    }

    return () => {
      for (const [index, ref] of activeRefs.entries()) {
        const cleanup = cleanups[index];

        if (cleanup) {
          cleanup();
        } else {
          setRef(ref, null);
        }
      }
    };
  };
}

export function useRender(options: UseRenderOptions) {
  const { defaultTagName, render, props, internalProps = {} } = options;
  const element = render ?? React.createElement(defaultTagName);
  const renderProps = element.props as Props;
  const partProps = props as Props;
  const ownedProps = internalProps as Props;
  const renderRef = readRef(renderProps.ref);
  const partRef = readRef(partProps.ref);
  const internalRef = readRef(ownedProps.ref);
  const ref = React.useMemo(
    () => mergeRefs(renderRef, partRef, internalRef),
    [renderRef, partRef, internalRef],
  );
  const mergedProps = mergeProps(renderProps, partProps, ownedProps);

  if (ref !== undefined) {
    mergedProps.ref = ref;
  }

  return React.cloneElement(element as React.ReactElement<Props>, mergedProps);
}

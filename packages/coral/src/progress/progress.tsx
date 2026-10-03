"use client";

import * as React from "react";

import {
  isUndefined,
  createPartContext,
  useRender,
  isNumber,
  clamp,
  type RenderProp,
} from "../core";

type ProgressState = "indeterminate" | "progressing" | "complete";

interface ProgressContextValue {
  value: number | undefined;
  max: number;
  formattedValue: string | undefined;
  state: ProgressState;
}

const [ProgressContext, useProgressContext] = createPartContext<ProgressContextValue>("Progress");

function getStateAttributes(state: ProgressState) {
  return {
    "data-indeterminate": state === "indeterminate" ? "" : undefined,
    "data-progressing": state === "progressing" ? "" : undefined,
    "data-complete": state === "complete" ? "" : undefined,
  };
}

export interface ProgressRootProps extends Omit<
  React.ComponentProps<"div">,
  "role" | "aria-valuemin" | "aria-valuemax" | "aria-valuenow" | "defaultValue"
> {
  value?: number;
  max?: number;
  format?: (value: number) => string;
}

function isInvalidValue(value: unknown): boolean {
  return !isNumber(value) || !Number.isFinite(value);
}

function isIndeterminate(value: unknown): value is undefined {
  return isUndefined(value);
}

function formatValue(
  value: number | undefined,
  max: number,
  format?: ProgressRootProps["format"],
): string | undefined {
  if (isIndeterminate(value)) return undefined;

  return format
    ? format(value)
    : new Intl.NumberFormat(undefined, { style: "percent" }).format(value / max);
}

export function Root(props: ProgressRootProps) {
  const { value: valueProp, max = 100, format, "aria-valuetext": ariaValueText, ...rest } = props;

  if (!Number.isFinite(max) || max <= 0) {
    throw new Error("Progress.Root max must be a finite positive number.");
  }

  const indeterminate = isIndeterminate(valueProp);
  const value = indeterminate
    ? undefined
    : isInvalidValue(valueProp)
      ? 0
      : clamp(valueProp, 0, max);
  const formattedValue = formatValue(value, max, format);

  const state: ProgressState = indeterminate
    ? "indeterminate"
    : value === max
      ? "complete"
      : "progressing";

  const context = React.useMemo(
    () => ({ value, max, formattedValue, state }),
    [value, max, formattedValue, state],
  );

  const element = useRender({
    defaultTagName: "div",
    render: undefined,
    props: rest,
    internalProps: {
      role: "progressbar",
      "aria-valuemin": 0,
      "aria-valuemax": max,
      "aria-valuenow": value,
      "aria-valuetext": ariaValueText ?? formattedValue,
      ...getStateAttributes(state),
    },
  });

  return <ProgressContext value={context}>{element}</ProgressContext>;
}

export interface ProgressLabelProps extends React.ComponentProps<"span"> {
  render?: RenderProp;
}

export function Label(props: ProgressLabelProps) {
  const { render, ...rest } = props;
  const progress = useProgressContext("Label");

  return useRender({
    defaultTagName: "span",
    render,
    props: rest,
    internalProps: { ...getStateAttributes(progress.state) },
  });
}

export interface ProgressValueProps extends Omit<React.ComponentProps<"span">, "children"> {
  render?: RenderProp;
}

export function Value(props: ProgressValueProps) {
  const { render, ...rest } = props;
  const progress = useProgressContext("Value");

  return useRender({
    defaultTagName: "span",
    render,
    props: rest,
    internalProps: {
      children: progress.formattedValue,
      ...getStateAttributes(progress.state),
    },
  });
}

export interface ProgressTrackProps extends React.ComponentProps<"div"> {
  render?: RenderProp;
}

export function Track(props: ProgressTrackProps) {
  const { render, ...rest } = props;
  const progress = useProgressContext("Track");

  return useRender({
    defaultTagName: "div",
    render,
    props: rest,
    internalProps: {
      ...getStateAttributes(progress.state),
    },
  });
}

export interface ProgressIndicatorProps extends React.ComponentProps<"div"> {
  render?: RenderProp;
}

export function Indicator(props: ProgressIndicatorProps) {
  const { render, ...rest } = props;
  const progress = useProgressContext("Indicator");
  const { value, max, state } = progress;

  return useRender({
    defaultTagName: "div",
    render,
    props: rest,
    internalProps: {
      style: value === undefined ? undefined : { inlineSize: `${(value / max) * 100}%` },
      ...getStateAttributes(state),
    },
  });
}

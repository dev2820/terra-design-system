"use client";

import * as React from "react";

import { clamp, createPartContext, isNumber, useRender, type RenderProp } from "../core";

interface MeterContextValue {
  value: number;
  percentage: number;
  formattedValue: string;
}

const [MeterContext, useMeterContext] = createPartContext<MeterContextValue>("Meter");

export interface MeterRootProps extends Omit<
  React.ComponentProps<"div">,
  "role" | "aria-valuemin" | "aria-valuemax" | "aria-valuenow"
> {
  value: number;
  min?: number;
  max?: number;
  format?: (value: number) => string;
}

function isValidValue(value: unknown): value is number {
  return isNumber(value) && Number.isFinite(value);
}

function formatValue(value: number, ratio: number, format?: MeterRootProps["format"]): string {
  return format
    ? format(value)
    : new Intl.NumberFormat(undefined, { style: "percent" }).format(ratio);
}

export function Root(props: MeterRootProps) {
  const {
    value: valueProp,
    min = 0,
    max = 100,
    format,
    "aria-valuetext": ariaValueText,
    ...rest
  } = props;

  if (!isValidValue(valueProp) || !Number.isFinite(min) || !Number.isFinite(max)) {
    throw new Error("Meter.Root value, min, and max must be finite numbers.");
  }

  if (min >= max) {
    throw new Error("Meter.Root min must be less than max.");
  }

  const value = clamp(valueProp, min, max);
  const range = max - min;
  // 유한한 min과 max의 차도 Infinity로 넘칠 수 있으므로, 그때는 빼기 전에 각 항을 반으로 나눈다.
  const ratio = Number.isFinite(range)
    ? (value - min) / range
    : (value / 2 - min / 2) / (max / 2 - min / 2);
  const formattedValue = formatValue(value, ratio, format);

  const context = React.useMemo(
    () => ({ value, percentage: ratio * 100, formattedValue }),
    [value, ratio, formattedValue],
  );
  const element = useRender({
    defaultTagName: "div",
    render: undefined,
    props: rest,
    internalProps: {
      role: "meter",
      "aria-valuemin": min,
      "aria-valuemax": max,
      "aria-valuenow": value,
      "aria-valuetext": ariaValueText ?? formattedValue,
    },
  });

  return <MeterContext value={context}>{element}</MeterContext>;
}

export interface MeterLabelProps extends React.ComponentProps<"span"> {
  render?: RenderProp;
}

export function Label(props: MeterLabelProps) {
  const { render, ...rest } = props;
  useMeterContext("Label");

  return useRender({
    defaultTagName: "span",
    render,
    props: rest,
  });
}

export interface MeterValueProps extends Omit<React.ComponentProps<"span">, "children"> {
  render?: RenderProp;
}

export function Value(props: MeterValueProps) {
  const { render, ...rest } = props;
  const meter = useMeterContext("Value");

  return useRender({
    defaultTagName: "span",
    render,
    props: rest,
    internalProps: { children: meter.formattedValue },
  });
}

export interface MeterTrackProps extends React.ComponentProps<"div"> {
  render?: RenderProp;
}

export function Track(props: MeterTrackProps) {
  const { render, ...rest } = props;
  useMeterContext("Track");

  return useRender({ defaultTagName: "div", render, props: rest });
}

export interface MeterIndicatorProps extends React.ComponentProps<"div"> {
  render?: RenderProp;
}

export function Indicator(props: MeterIndicatorProps) {
  const { render, ...rest } = props;
  const meter = useMeterContext("Indicator");

  return useRender({
    defaultTagName: "div",
    render,
    props: rest,
    internalProps: { style: { inlineSize: `${meter.percentage}%` } },
  });
}

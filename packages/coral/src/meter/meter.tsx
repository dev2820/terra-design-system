"use client";

import * as React from "react";

import { useRender } from "../core/index";

interface MeterContextValue {
  value: number;
  percentage: number;
  formattedValue: string;
  setLabelId: React.Dispatch<React.SetStateAction<string | null>>;
}

const MeterContext = React.createContext<MeterContextValue | null>(null);

function useMeterContext(part: string) {
  const context = React.use(MeterContext);

  if (context === null) {
    throw new Error(`Meter.${part} must be used within Meter.Root.`);
  }

  return context;
}

export interface MeterRootProps extends Omit<
  React.ComponentProps<"div">,
  "role" | "aria-valuemin" | "aria-valuemax" | "aria-valuenow"
> {
  value: number;
  min?: number;
  max?: number;
  format?: Intl.NumberFormatOptions;
  locale?: Intl.LocalesArgument;
}

export function Root(props: MeterRootProps) {
  const {
    value: valueProp,
    min = 0,
    max = 100,
    format,
    locale,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-valuetext": ariaValueText,
    ...rest
  } = props;
  const [labelId, setLabelId] = React.useState<string | null>(null);

  if (!Number.isFinite(valueProp) || !Number.isFinite(min) || !Number.isFinite(max)) {
    throw new Error("Meter.Root value, min, and max must be finite numbers.");
  }

  if (min >= max) {
    throw new Error("Meter.Root min must be less than max.");
  }

  const value = Math.min(max, Math.max(min, valueProp));
  const range = max - min;
  const ratio = Number.isFinite(range)
    ? (value - min) / range
    : (value / 2 - min / 2) / (max / 2 - min / 2);
  const formatOptions: Intl.NumberFormatOptions = format ?? { style: "percent" };
  const formattedValue = new Intl.NumberFormat(locale, formatOptions).format(
    formatOptions.style === "percent" ? ratio : value,
  );
  const context = React.useMemo(
    () => ({ value, percentage: ratio * 100, formattedValue, setLabelId }),
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
      "aria-label": ariaLabel,
      "aria-labelledby":
        ariaLabelledBy ?? (ariaLabel === undefined ? (labelId ?? undefined) : undefined),
    },
  });

  return <MeterContext value={context}>{element}</MeterContext>;
}

export type MeterLabelProps = React.ComponentProps<"span">;

export function Label(props: MeterLabelProps) {
  const meter = useMeterContext("Label");
  const generatedId = React.useId();
  const id = props.id ?? `${generatedId}-meter-label`;
  const setLabelId = meter.setLabelId;

  React.useLayoutEffect(() => {
    setLabelId(id);

    return () => setLabelId(null);
  }, [id, setLabelId]);

  return useRender({
    defaultTagName: "span",
    render: undefined,
    props,
    internalProps: { id },
  });
}

export interface MeterValueProps extends Omit<React.ComponentProps<"span">, "children"> {
  children?: React.ReactNode | ((formattedValue: string, value: number) => React.ReactNode);
}

export function Value(props: MeterValueProps) {
  const { children, ...rest } = props;
  const meter = useMeterContext("Value");

  return useRender({
    defaultTagName: "span",
    render: undefined,
    props: rest,
    internalProps: {
      children:
        typeof children === "function"
          ? children(meter.formattedValue, meter.value)
          : children === undefined
            ? meter.formattedValue
            : children,
    },
  });
}

export type MeterTrackProps = React.ComponentProps<"div">;

export function Track(props: MeterTrackProps) {
  useMeterContext("Track");

  return useRender({ defaultTagName: "div", render: undefined, props });
}

export type MeterIndicatorProps = React.ComponentProps<"div">;

export function Indicator(props: MeterIndicatorProps) {
  const meter = useMeterContext("Indicator");

  return useRender({
    defaultTagName: "div",
    render: undefined,
    props,
    internalProps: { style: { inlineSize: `${meter.percentage}%` } },
  });
}

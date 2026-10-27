"use client";

import * as React from "react";

import {
  changeDetails,
  context,
  mergeProps,
  part,
  useFormReset,
  visuallyHidden,
  type ChangeDetails,
  type WithRender,
} from "./shared";

export interface SliderOptions {
  id?: string | undefined;
  value?: readonly number[] | undefined;
  defaultValue?: readonly number[] | undefined;
  min?: number | undefined;
  max?: number | undefined;
  step?: number | undefined;
  disabled?: boolean | undefined;
  readOnly?: boolean | undefined;
  orientation?: "horizontal" | "vertical" | undefined;
  name?: string | undefined;
  form?: string | undefined;
  format?: ((value: number, index: number) => string) | undefined;
  onValueChange?:
    | ((value: number[], details: ChangeDetails & { index: number }) => void)
    | undefined;
}

function tolerance(value: number) {
  return Math.min(1e-7, Number.EPSILON * Math.max(1, value) * 4);
}

export function useSlider(options: SliderOptions = {}) {
  const {
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    readOnly = false,
    orientation = "horizontal",
  } = options;
  if (
    !Number.isFinite(min) ||
    !Number.isFinite(max) ||
    min > max ||
    !Number.isFinite(step) ||
    step <= 0 ||
    !Number.isFinite((max - min) / step)
  ) {
    throw new RangeError("Slider requires finite min <= max and positive step.");
  }
  function snap(value: number) {
    const ratio = (Math.max(min, Math.min(max, value)) - min) / step;
    const maxRatio = (max - min) / step;
    const steps = Math.min(
      Math.floor(maxRatio + tolerance(maxRatio)),
      Math.round(ratio + tolerance(ratio)),
    );
    const precision = Math.max(
      ...[min, step].map((n) => {
        const [coefficient, exponent = "0"] = String(n).split("e");
        return Math.max(0, (coefficient!.split(".")[1]?.length ?? 0) - Number(exponent));
      }),
    );
    const result = min + steps * step;
    return Math.max(
      min,
      Math.min(max, precision <= 100 ? Number(result.toFixed(precision)) : result),
    );
  }
  function normalize(value: readonly number[]) {
    if (!value.length || value.some((v) => !Number.isFinite(v)))
      throw new RangeError("Slider requires finite values.");
    return value.map(snap).toSorted((a, b) => a - b);
  }
  const generatedId = React.useId();
  const id = options.id ?? `${generatedId}-slider`;
  const initial = React.useRef(options.defaultValue ?? [min + (max - min) / 2]);
  const [local, setLocal] = React.useState(() => normalize(initial.current));
  const controlled = options.value !== undefined;
  const value = normalize(options.value ?? local);
  const inputs = React.useRef(new Map<number, HTMLInputElement>());
  const inputRefs = React.useRef(new Map<number, React.RefCallback<HTMLInputElement>>());
  const control = React.useRef<HTMLDivElement | null>(null);
  const drag = React.useRef<{
    id: number;
    index: number;
    offset: number;
    node: HTMLDivElement;
  } | null>(null);
  const [dragging, setDragging] = React.useState(false);
  const [rtl, setRtl] = React.useState(false);
  const vertical = orientation === "vertical";

  const stop = React.useCallback(() => {
    const current = drag.current;
    drag.current = null;
    setDragging(false);
    if (current?.node.hasPointerCapture(current.id)) current.node.releasePointerCapture(current.id);
  }, []);
  const setControl = React.useCallback(
    (node: HTMLDivElement | null) => {
      control.current = node;
      if (!node && drag.current) stop();
    },
    [stop],
  );
  React.useEffect(() => {
    if (disabled || readOnly) stop();
    return stop;
  }, [disabled, readOnly, stop]);
  React.useLayoutEffect(() => {
    if (control.current) setRtl(getComputedStyle(control.current).direction === "rtl");
    if (
      drag.current &&
      (drag.current.node !== control.current || !inputs.current.has(drag.current.index))
    )
      stop();
    for (const [index, input] of inputs.current) {
      input.defaultValue = String(normalize(initial.current)[index] ?? min);
      input.value = String(value[index]);
    }
  });
  const registerInput = useFormReset(inputs, () => {
    const next = controlled ? value : normalize(initial.current);
    if (!controlled) setLocal(next);
    for (const [index, input] of inputs.current) input.value = String(next[index]);
  });

  function change(index: number, next: number, event: Event, reason: string) {
    const input = inputs.current.get(index);
    if (disabled || readOnly || input?.matches(":disabled")) return;
    const values = [...value];
    values[index] = Math.max(
      value[index - 1] ?? min,
      Math.min(value[index + 1] ?? max, snap(next)),
    );
    if (values[index] === value[index]) return;
    const details = Object.assign(changeDetails(event, reason), { index });
    options.onValueChange?.(values, details);
    if (!controlled && !details.isCanceled) setLocal(values);
  }
  function valueAt(event: React.PointerEvent<HTMLDivElement>, offset = 0) {
    const node = event.currentTarget;
    const rect = node.getBoundingClientRect();
    const size = vertical ? rect.height : rect.width;
    if (!size) return min;
    let ratio = ((vertical ? event.clientY - rect.top : event.clientX - rect.left) - offset) / size;
    if (vertical || getComputedStyle(node).direction === "rtl") ratio = 1 - ratio;
    return min + Math.max(0, Math.min(1, ratio)) * (max - min);
  }
  function inputId(index: number) {
    return `${id}-input-${index}`;
  }

  function getInputProps(index = 0, props: React.ComponentProps<"input"> = {}) {
    if (!Number.isInteger(index) || index < 0 || index >= value.length)
      throw new RangeError("Invalid Slider index.");
    if (!inputRefs.current.has(index))
      inputRefs.current.set(index, (node) => {
        registerInput(index, node);
      });
    return mergeProps(props, {
      id: inputId(index),
      ref: inputRefs.current.get(index),
      type: "range",
      value: value[index],
      min: value[index - 1] ?? min,
      max: value[index + 1] ?? max,
      step,
      name: options.name,
      form: options.form,
      disabled,
      required: undefined,
      readOnly: undefined,
      "aria-readonly": readOnly || undefined,
      "aria-orientation": vertical ? "vertical" : undefined,
      "aria-valuetext": options.format?.(value[index]!, index),
      ...(vertical ? { style: { writingMode: "vertical-lr", direction: "rtl" } } : {}),
      onChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (!event.defaultPrevented)
          change(index, event.currentTarget.valueAsNumber, event.nativeEvent, "input-change");
        event.currentTarget.value = String(value[index]);
      },
      onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (readOnly && /^(Arrow|Home|End|Page)/.test(event.key)) event.preventDefault();
      },
    });
  }

  return {
    value,
    dragging,
    getRootProps(props: React.ComponentProps<"div"> = {}) {
      return mergeProps(props, {
        id,
        "data-orientation": orientation,
        "data-dragging": dragging ? "" : undefined,
      });
    },
    getLabelProps(index = 0, props: React.ComponentProps<"label"> = {}) {
      return mergeProps(props, { htmlFor: inputId(index) });
    },
    getInputProps,
    getHiddenInputProps(index = 0, props: React.ComponentProps<"input"> = {}) {
      return getInputProps(index, { ...props, style: { ...visuallyHidden, ...props.style } });
    },
    getControlProps(props: React.ComponentProps<"div"> = {}) {
      return mergeProps(props, {
        ref: setControl,
        style: { position: "relative", touchAction: vertical ? "pan-x" : "pan-y" },
        onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
          if (event.defaultPrevented || disabled || readOnly || event.button !== 0 || drag.current)
            return;
          const next = valueAt(event);
          const thumb = (event.target as Element).closest<HTMLElement>("[data-hooks-thumb]");
          const hit =
            thumb && event.currentTarget.contains(thumb)
              ? Number(thumb.dataset.hooksThumb)
              : undefined;
          let index = hit ?? 0;
          if (hit === undefined)
            value.forEach((v, i) => {
              if (
                Math.abs(v - next) < Math.abs(value[index]! - next) ||
                (v === value[index] && next > v && i > index)
              )
                index = i;
            });
          const input = inputs.current.get(index);
          if (!input || input.matches(":disabled")) return;
          event.preventDefault();
          input.focus({ preventScroll: true });
          const rect = hit === undefined ? undefined : thumb!.getBoundingClientRect();
          const offset = rect
            ? vertical
              ? event.clientY - rect.top - rect.height / 2
              : event.clientX - rect.left - rect.width / 2
            : 0;
          drag.current = { id: event.pointerId, index, offset, node: event.currentTarget };
          event.currentTarget.setPointerCapture(event.pointerId);
          setDragging(true);
          if (hit === undefined) change(index, next, event.nativeEvent, "track-press");
        },
        onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
          const current = drag.current;
          if (event.defaultPrevented || !current || current.id !== event.pointerId) return;
          change(current.index, valueAt(event, current.offset), event.nativeEvent, "drag");
        },
        onPointerUp(event: React.PointerEvent<HTMLDivElement>) {
          if (drag.current?.id === event.pointerId) stop();
        },
        onPointerCancel(event: React.PointerEvent<HTMLDivElement>) {
          if (drag.current?.id === event.pointerId) stop();
        },
        onLostPointerCapture(event: React.PointerEvent<HTMLDivElement>) {
          if (drag.current?.id === event.pointerId) stop();
        },
      });
    },
    getThumbProps(index = 0, props: React.ComponentProps<"span"> = {}) {
      const percent = max === min ? 0 : ((value[index]! - min) / (max - min)) * 100;
      return mergeProps(props, {
        "data-hooks-thumb": index,
        style: vertical
          ? { position: "absolute", bottom: `${percent}%`, transform: "translateY(50%)" }
          : {
              position: "absolute",
              left: `${rtl ? 100 - percent : percent}%`,
              top: 0,
              transform: "translateX(-50%)",
            },
      });
    },
  };
}

const [Context, useSlide] = context<ReturnType<typeof useSlider>>("Slider");
function Root(
  props: SliderOptions &
    WithRender<Omit<React.ComponentProps<"div">, keyof SliderOptions | "defaultValue">>,
) {
  const {
    id,
    value,
    defaultValue,
    min,
    max,
    step,
    disabled,
    readOnly,
    orientation,
    name,
    form,
    format,
    onValueChange,
    ...rest
  } = props;
  const slider = useSlider({
    id,
    value,
    defaultValue,
    min,
    max,
    step,
    disabled,
    readOnly,
    orientation,
    name,
    form,
    format,
    onValueChange,
  });
  return <Context value={slider}>{part("div", slider.getRootProps, rest)}</Context>;
}
function Label({ index = 0, ...props }: React.ComponentProps<"label"> & { index?: number }) {
  return <label {...useSlide().getLabelProps(index, props)} />;
}
function Input({ index = 0, ...props }: React.ComponentProps<"input"> & { index?: number }) {
  return <input {...useSlide().getInputProps(index, props)} />;
}
function HiddenInput({ index = 0, ...props }: React.ComponentProps<"input"> & { index?: number }) {
  return <input {...useSlide().getHiddenInputProps(index, props)} />;
}
function Control(props: WithRender<React.ComponentProps<"div">>) {
  return part("div", useSlide().getControlProps, props);
}
function Thumb({
  index = 0,
  ...props
}: WithRender<React.ComponentProps<"span">> & { index?: number }) {
  const slider = useSlide();
  return part("span", (userProps) => slider.getThumbProps(index, userProps), props);
}
export const Slider = { Root, Label, Input, HiddenInput, Control, Thumb };

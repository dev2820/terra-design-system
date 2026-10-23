"use client";

import * as React from "react";

import { clamp, createPartContext, joinIds, snap, useRender, type PropsWithRender } from "../core";
import { FieldContext } from "../field/field-context";
import { useFieldsetContext } from "../fieldset/fieldset-context";

export type SliderOrientation = "horizontal" | "vertical";
export type SliderChangeReason = "input-change" | "track-press" | "drag";

export interface SliderChangeEventDetails {
  readonly reason: SliderChangeReason;
  readonly event: Event;
  readonly index: number;
  readonly isCanceled: boolean;
  cancel: () => void;
}

export interface SliderState {
  value: readonly number[];
  disabled: boolean;
  readOnly: boolean;
  invalid: boolean;
  dragging: boolean;
}

interface SliderContextValue {
  state: SliderState;
  orientation: SliderOrientation;
  rtl: boolean;
  min: number;
  max: number;
  step: number;
  baseId: string;
  name: string | undefined;
  form: string | undefined;
  label: string | undefined;
  labelledBy: string | undefined;
  describedBy: string | undefined;
  format: SliderRootProps["format"];
  field: React.ContextType<typeof FieldContext>;
  track: HTMLElement | null;
  setTrack: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  setLabelId: React.Dispatch<React.SetStateAction<string | null>>;
  setDragging: React.Dispatch<React.SetStateAction<boolean>>;
  inputs: React.RefObject<Map<number, HTMLInputElement>>;
  thumbs: React.RefObject<Map<number, HTMLElement>>;
  changeValue: (index: number, value: number, reason: SliderChangeReason, event: Event) => void;
  resetValue: () => void;
}

const [SliderContext, useSliderContext] = createPartContext<SliderContextValue>("Slider");
const [ThumbContext, useThumbContext] = createPartContext<number>("Slider", "Thumb");

function normalizeValue(value: readonly number[], min: number, max: number, step: number) {
  if (value.length === 0 || value.some((item) => !Number.isFinite(item))) {
    throw new RangeError("Slider.Root value must contain at least one finite number.");
  }
  return value.map((item) => snap(item, min, max, step)).toSorted((a, b) => a - b);
}

function percentage(value: number, min: number, max: number) {
  return max === min ? 0 : ((value - min) / (max - min)) * 100;
}

function getStateAttributes(slider: SliderContextValue) {
  return {
    "data-orientation": slider.orientation,
    "data-disabled": slider.state.disabled ? "" : undefined,
    "data-readonly": slider.state.readOnly ? "" : undefined,
    "data-invalid": slider.state.invalid ? "" : undefined,
    "data-dragging": slider.state.dragging ? "" : undefined,
  };
}

export interface SliderRootProps extends PropsWithRender<
  Omit<React.ComponentProps<"div">, "defaultValue" | "onChange" | "value">
> {
  value?: readonly number[];
  defaultValue?: readonly number[];
  onValueChange?: (value: number[], details: SliderChangeEventDetails) => void;
  min?: number;
  max?: number;
  step?: number;
  orientation?: SliderOrientation;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  name?: string;
  form?: string;
  format?: (value: number, index: number) => string;
}

export function Root(props: SliderRootProps) {
  const {
    render,
    value: valueProp,
    defaultValue,
    onValueChange,
    min = 0,
    max = 100,
    step = 1,
    orientation = "horizontal",
    disabled = false,
    readOnly = false,
    invalid = false,
    name,
    form,
    format,
    ...rest
  } = props;

  if (
    !Number.isFinite(min) ||
    !Number.isFinite(max) ||
    min > max ||
    !Number.isFinite(step) ||
    step <= 0 ||
    !Number.isFinite((max - min) / step)
  ) {
    throw new RangeError("Slider.Root requires finite min <= max and a finite positive step.");
  }

  const initialValue = defaultValue ?? [min + (max - min) / 2];
  const [uncontrolledValue, setValue] = React.useState(() =>
    normalizeValue(initialValue, min, max, step),
  );
  const controlled = valueProp !== undefined;
  const value = normalizeValue(valueProp ?? uncontrolledValue, min, max, step);
  const field = React.use(FieldContext);
  const fieldsetDisabled = useFieldsetContext("Root", true) ?? false;
  const generatedId = React.useId();
  const mergedProps = { ...(render?.props as React.ComponentProps<"div">), ...rest };
  const baseId = mergedProps.id ?? `${generatedId}-slider`;

  const [track, setTrack] = React.useState<HTMLElement | null>(null);
  const [labelId, setLabelId] = React.useState<string | null>(null);
  const [rtl, setRtl] = React.useState(mergedProps.dir === "rtl");
  const [dragging, setDragging] = React.useState(false);
  const inputs = React.useRef(new Map<number, HTMLInputElement>());
  const thumbs = React.useRef(new Map<number, HTMLElement>());
  const state: SliderState = {
    value,
    disabled: disabled || fieldsetDisabled || field?.state.disabled === true,
    readOnly,
    invalid: invalid || field?.state.invalid === true,
    dragging,
  };

  React.useLayoutEffect(() => {
    if (track) {
      setRtl(getComputedStyle(track).direction === "rtl");
    }
  }, [track, mergedProps.dir]);

  function changeValue(index: number, nextValue: number, reason: SliderChangeReason, event: Event) {
    if (state.disabled || state.readOnly) {
      return;
    }
    const next = [...value];
    next[index] = clamp(
      snap(nextValue, min, max, step),
      value[index - 1] ?? min,
      value[index + 1] ?? max,
    );
    if (next[index] === value[index]) {
      return;
    }

    let canceled = false;
    const details: SliderChangeEventDetails = {
      index,
      reason,
      event,
      get isCanceled() {
        return canceled;
      },
      cancel() {
        canceled = true;
      },
    };
    onValueChange?.([...next], details);
    if (!canceled && !controlled) {
      setValue(next);
    }
  }

  const context: SliderContextValue = {
    state,
    orientation,
    rtl,
    min,
    max,
    step,
    baseId,
    name: field?.meta.name ?? name,
    form,
    label: mergedProps["aria-label"],
    labelledBy:
      mergedProps["aria-labelledby"] ??
      labelId ??
      (mergedProps["aria-label"] ? undefined : field?.meta.labelId),
    describedBy: joinIds(
      mergedProps["aria-describedby"],
      field?.meta.descriptionIds,
      state.invalid ? field?.meta.errorIds : undefined,
    ),
    format,
    field,
    track,
    setTrack,
    setLabelId,
    setDragging,
    inputs,
    thumbs,
    changeValue,
    resetValue() {
      const next = controlled ? value : normalizeValue(initialValue, min, max, step);
      if (!controlled) {
        setValue(next);
      }
      for (const [index, input] of inputs.current) {
        input.value = String(next[index]);
      }
    },
  };

  const element = useRender({
    defaultTagName: "div",
    render,
    props: rest,
    internalProps: { id: baseId, ...getStateAttributes(context) },
  });

  return <SliderContext value={context}>{element}</SliderContext>;
}

export interface SliderLabelProps extends PropsWithRender<
  Omit<React.ComponentProps<"label">, "htmlFor">
> {}

export function Label(props: SliderLabelProps) {
  const { render, ...rest } = props;

  const slider = useSliderContext("Label");
  const { baseId, setLabelId } = slider;
  const id = rest.id ?? (render?.props as SliderLabelProps)?.id ?? `${baseId}-label`;

  React.useLayoutEffect(() => {
    setLabelId(id);
    return () => setLabelId(null);
  }, [id, setLabelId]);

  return useRender({
    defaultTagName: "label",
    render,
    props: rest,
    internalProps: { id, htmlFor: `${baseId}-input-0`, ...getStateAttributes(slider) },
  });
}

export interface SliderValueTextProps extends PropsWithRender<
  Omit<React.ComponentProps<"span">, "children">
> {}

export function ValueText(props: SliderValueTextProps) {
  const { render, ...rest } = props;

  const slider = useSliderContext("ValueText");

  return useRender({
    defaultTagName: "span",
    render,
    props: rest,
    internalProps: {
      ...getStateAttributes(slider),
      children: slider.state.value
        .map((value, index) => slider.format?.(value, index) ?? String(value))
        .join(" – "),
    },
  });
}

export interface SliderControlProps extends PropsWithRender<React.ComponentProps<"div">> {}

export function Control(props: SliderControlProps) {
  const { render, ...rest } = props;

  const slider = useSliderContext("Control");
  const { orientation, rtl, min, max, track, state, inputs, thumbs, setDragging } = slider;
  const vertical = orientation === "vertical";
  const activeIndex = React.useRef(0);
  const drag = React.useRef<{
    id: number;
    index: number;
    offset: number;
    control: HTMLElement;
  } | null>(null);

  const stopDrag = React.useCallback(() => {
    const current = drag.current;
    drag.current = null;
    setDragging(false);
    if (current?.control.hasPointerCapture(current.id)) {
      current.control.releasePointerCapture(current.id);
    }
  }, [setDragging]);

  React.useEffect(() => {
    if (state.disabled || state.readOnly) {
      stopDrag();
    }
    return stopDrag;
  }, [state.disabled, state.readOnly, stopDrag]);

  function valueAt(event: React.PointerEvent<HTMLElement>, offset = 0) {
    const rect = track!.getBoundingClientRect();
    const size = vertical ? rect.height : rect.width;
    if (size === 0) {
      return null;
    }
    let ratio = ((vertical ? event.clientY - rect.top : event.clientX - rect.left) - offset) / size;
    if (vertical || rtl) {
      ratio = 1 - ratio;
    }
    return min + clamp(ratio, 0, 1) * (max - min);
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.defaultPrevented || state.disabled || event.button !== 0 || drag.current || !track) {
      return;
    }
    const nextValue = valueAt(event);
    if (nextValue === null) {
      return;
    }
    const hit = [...thumbs.current].find(([, thumb]) => thumb.contains(event.target as Node));
    const focusedIndex = [...inputs.current].find(
      ([, input]) => input === input.ownerDocument.activeElement,
    )?.[0];
    let index = hit?.[0] ?? focusedIndex ?? Math.min(activeIndex.current, state.value.length - 1);
    if (!hit) {
      state.value.forEach((value, candidate) => {
        const current = state.value[index]!;
        const canSeparateOverlap =
          value === current &&
          (nextValue > value ? candidate > index : nextValue < value && candidate < index);
        if (Math.abs(value - nextValue) < Math.abs(current - nextValue) || canSeparateOverlap) {
          index = candidate;
        }
      });
    }
    const input = inputs.current.get(index);
    if (!input) {
      return;
    }

    event.preventDefault();
    activeIndex.current = index;
    input.focus({ preventScroll: true });
    if (state.readOnly) {
      return;
    }
    const rect = hit?.[1].getBoundingClientRect();
    const offset = rect
      ? vertical
        ? event.clientY - rect.top - rect.height / 2
        : event.clientX - rect.left - rect.width / 2
      : 0;
    drag.current = { id: event.pointerId, index, offset, control: event.currentTarget };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
    if (!hit) {
      slider.changeValue(index, nextValue, "track-press", event.nativeEvent);
    }
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const current = drag.current;
    if (event.defaultPrevented || !current || current.id !== event.pointerId || !track) {
      return;
    }
    const nextValue = valueAt(event, current.offset);
    if (nextValue !== null) {
      slider.changeValue(current.index, nextValue, "drag", event.nativeEvent);
    }
  }

  function handlePointerEnd(event: React.PointerEvent<HTMLDivElement>) {
    if (drag.current?.id === event.pointerId) {
      stopDrag();
    }
  }

  return useRender({
    defaultTagName: "div",
    render,
    props: rest,
    internalProps: {
      ...getStateAttributes(slider),
      style: { position: "relative", touchAction: vertical ? "pan-x" : "pan-y" },
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerEnd,
      onPointerCancel: handlePointerEnd,
      onLostPointerCapture: handlePointerEnd,
    },
  });
}

export interface SliderTrackProps extends PropsWithRender<React.ComponentProps<"div">> {}

export function Track(props: SliderTrackProps) {
  const { render, ...rest } = props;

  const slider = useSliderContext("Track");

  return useRender({
    defaultTagName: "div",
    render,
    props: rest,
    internalProps: {
      ...getStateAttributes(slider),
      ref: slider.setTrack,
      style: { position: "relative" },
    },
  });
}

export interface SliderIndicatorProps extends PropsWithRender<React.ComponentProps<"div">> {}

export function Indicator(props: SliderIndicatorProps) {
  const { render, ...rest } = props;

  const slider = useSliderContext("Indicator");
  const { state, min, max, orientation, rtl } = slider;
  const start = state.value.length === 1 ? 0 : percentage(state.value[0]!, min, max);
  const end = percentage(state.value.at(-1)!, min, max);

  return useRender({
    defaultTagName: "div",
    render,
    props: rest,
    internalProps: {
      ...getStateAttributes(slider),
      style:
        orientation === "vertical"
          ? { position: "absolute", bottom: `${start}%`, height: `${end - start}%`, width: "100%" }
          : {
              position: "absolute",
              left: `${rtl ? 100 - end : start}%`,
              width: `${end - start}%`,
              height: "100%",
            },
    },
  });
}

export interface SliderThumbProps extends PropsWithRender<React.ComponentProps<"div">> {
  index?: number;
}

export function Thumb(props: SliderThumbProps) {
  const { render, index = 0, ...rest } = props;

  const slider = useSliderContext("Thumb");
  const { state, min, max, orientation, rtl, thumbs } = slider;
  if (!Number.isInteger(index) || index < 0 || index >= state.value.length) {
    throw new RangeError("Slider.Thumb index must be within the root value array.");
  }
  const ref = React.useCallback(
    (element: HTMLElement | null) => {
      if (element) {
        thumbs.current.set(index, element);
      } else {
        thumbs.current.delete(index);
      }
    },
    [index, thumbs],
  );
  const [focused, setFocused] = React.useState(false);
  const position = percentage(state.value[index]!, min, max);

  const element = useRender({
    defaultTagName: "div",
    render,
    props: rest,
    internalProps: {
      ...getStateAttributes(slider),
      "data-index": index,
      "data-focused": focused ? "" : undefined,
      ref,
      style: {
        position: "absolute",
        left: orientation === "vertical" ? "50%" : `${rtl ? 100 - position : position}%`,
        top: orientation === "vertical" ? `${100 - position}%` : "50%",
        transform: "translate(-50%, -50%)",
      },
      onFocus: () => setFocused(true),
      onBlur: () => setFocused(false),
    },
  });

  return <ThumbContext value={index}>{element}</ThumbContext>;
}

export interface SliderHiddenInputProps extends PropsWithRender<
  Omit<
    React.ComponentProps<"input">,
    | "id"
    | "type"
    | "value"
    | "defaultValue"
    | "min"
    | "max"
    | "step"
    | "name"
    | "form"
    | "disabled"
    | "readOnly"
    | "required"
    | "children"
    | "hidden"
    | "aria-hidden"
    | "role"
    | "aria-valuemin"
    | "aria-valuemax"
    | "aria-valuenow"
  >
> {}

export function HiddenInput(props: SliderHiddenInputProps) {
  const { render, ...rest } = props;

  const slider = useSliderContext("HiddenInput");
  const index = useThumbContext("HiddenInput");
  const { state, min, max, step, baseId, inputs, field, form } = slider;
  const primary = index === 0;
  const value = state.value[index]!;
  const setControl = field?.actions.setControl;
  const setControlId = field?.actions.setControlId;
  const syncControl = field?.actions.syncControl;
  const handleFieldChange = field?.actions.handleChange;
  const inputRef = React.useCallback(
    (input: HTMLInputElement | null) => {
      if (input) {
        inputs.current.set(index, input);
      } else {
        inputs.current.delete(index);
      }
      if (primary) {
        setControl?.(input);
      }
    },
    [index, primary, inputs, setControl],
  );
  const previousValue = React.useRef(state.value.join(","));
  const valueKey = state.value.join(",");
  const resetState = React.useRef(slider.resetValue);
  resetState.current = slider.resetValue;

  React.useLayoutEffect(() => {
    const input = inputs.current.get(index);
    if (!primary || !input) {
      return;
    }
    setControlId?.(input.id);
    syncControl?.(input);
    if (previousValue.current !== valueKey) {
      previousValue.current = valueKey;
      handleFieldChange?.(input);
    }
  }, [index, primary, inputs, baseId, valueKey, setControlId, syncControl, handleFieldChange]);

  React.useEffect(() => {
    const inputForm = primary ? inputs.current.get(index)?.form : null;
    if (!inputForm) {
      return;
    }
    let timer: ReturnType<typeof setTimeout> | undefined;
    function handleReset(event: Event) {
      timer = setTimeout(() => {
        if (!event.defaultPrevented) {
          resetState.current();
        }
      }, 0);
    }
    inputForm.addEventListener("reset", handleReset);
    return () => {
      inputForm.removeEventListener("reset", handleReset);
      clearTimeout(timer);
    };
  }, [primary, index, inputs, form]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.defaultPrevented) {
      slider.changeValue(
        index,
        event.currentTarget.valueAsNumber,
        "input-change",
        event.nativeEvent,
      );
    }
    // React commits accepted state after this handler; restore the current value for canceled/controlled changes.
    event.currentTarget.value = String(value);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (
      state.readOnly &&
      [
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Home",
        "End",
        "PageUp",
        "PageDown",
      ].includes(event.key)
    ) {
      event.preventDefault();
    }
  }

  const {
    "aria-label": label,
    "aria-labelledby": labelledBy,
    "aria-describedby": describedBy,
  } = { ...(render?.props as SliderHiddenInputProps), ...rest };
  const hasOwnName = label !== undefined || labelledBy !== undefined;

  return useRender({
    defaultTagName: "input",
    defaultProps: {
      "aria-label": hasOwnName ? undefined : slider.label,
      "aria-labelledby": hasOwnName ? undefined : slider.labelledBy,
      "aria-valuetext": slider.format?.(value, index),
    },
    render,
    props: rest,
    internalProps: {
      ...getStateAttributes(slider),
      id: `${baseId}-input-${index}`,
      type: "range",
      value,
      min: state.value[index - 1] ?? min,
      max: state.value[index + 1] ?? max,
      step,
      name: slider.name,
      form,
      disabled: state.disabled,
      "aria-readonly": state.readOnly || undefined,
      "aria-invalid": state.invalid || undefined,
      "aria-orientation": slider.orientation === "vertical" ? "vertical" : undefined,
      "aria-describedby": joinIds(describedBy, slider.describedBy),
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        margin: 0,
        opacity: 0,
        pointerEvents: "none",
        ...(slider.orientation === "vertical"
          ? { writingMode: "vertical-lr", direction: "rtl" }
          : {}),
      },
      ref: inputRef,
      onChange: handleChange,
      onKeyDown: handleKeyDown,
      onFocus: () => field?.actions.handleFocus(),
      onBlur: (event: React.FocusEvent<HTMLInputElement>) => {
        if (![...inputs.current.values()].includes(event.relatedTarget as HTMLInputElement)) {
          field?.actions.handleBlur();
        }
      },
    },
  });
}

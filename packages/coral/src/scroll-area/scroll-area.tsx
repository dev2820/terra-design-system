"use client";

import * as React from "react";

import { clamp, createPartContext, useRender, type PropsWithRender } from "../core";

export type ScrollAreaOrientation = "horizontal" | "vertical";

interface Metrics {
  width: number;
  height: number;
  scrollWidth: number;
  scrollHeight: number;
  left: number;
  top: number;
  rtl: boolean;
  verticalSize: number;
  horizontalSize: number;
  verticalPadding: number;
  horizontalPadding: number;
  verticalWidth: number;
  horizontalHeight: number;
}

interface ScrollAreaContextValue {
  metrics: Metrics;
  viewport: HTMLElement | null;
  verticalBar: HTMLElement | null;
  horizontalBar: HTMLElement | null;
  setViewport: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  setContent: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  setVerticalBar: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  setHorizontalBar: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  dragging: ScrollAreaOrientation | null;
  setDragging: React.Dispatch<React.SetStateAction<ScrollAreaOrientation | null>>;
  measure: () => void;
}

interface ScrollbarContextValue {
  orientation: ScrollAreaOrientation;
  size: number;
  offset: number;
  padding: number;
  thumbRef: React.RefObject<HTMLElement | null>;
}

const [ScrollAreaContext, useScrollAreaContext] =
  createPartContext<ScrollAreaContextValue>("ScrollArea");
const [ScrollbarContext, useScrollbarContext] = createPartContext<ScrollbarContextValue>(
  "ScrollArea",
  "Scrollbar",
);

const initialMetrics: Metrics = {
  width: 0,
  height: 0,
  scrollWidth: 0,
  scrollHeight: 0,
  left: 0,
  top: 0,
  rtl: false,
  verticalSize: 0,
  horizontalSize: 0,
  verticalPadding: 0,
  horizontalPadding: 0,
  verticalWidth: 0,
  horizontalHeight: 0,
};

function getStateAttributes(metrics: Metrics) {
  return {
    "data-overflow-x": metrics.scrollWidth > metrics.width ? "" : undefined,
    "data-overflow-y": metrics.scrollHeight > metrics.height ? "" : undefined,
  };
}

function readTrack(track: HTMLElement | null, vertical: boolean) {
  if (!track) return { size: 0, padding: 0 };
  const style = getComputedStyle(track);
  const padding = parseFloat(vertical ? style.paddingTop : style.paddingLeft) || 0;
  const endPadding = parseFloat(vertical ? style.paddingBottom : style.paddingRight) || 0;
  return {
    size: Math.max(0, (vertical ? track.clientHeight : track.clientWidth) - padding - endPadding),
    padding,
  };
}

function createMetrics(
  viewport: HTMLElement,
  verticalBar: HTMLElement | null,
  horizontalBar: HTMLElement | null,
): Metrics {
  const vertical = readTrack(verticalBar, true);
  const horizontal = readTrack(horizontalBar, false);

  return {
    width: viewport.clientWidth,
    height: viewport.clientHeight,
    scrollWidth: viewport.scrollWidth,
    scrollHeight: viewport.scrollHeight,
    left: viewport.scrollLeft,
    top: viewport.scrollTop,
    rtl: getComputedStyle(viewport).direction === "rtl",
    verticalSize: vertical.size,
    horizontalSize: horizontal.size,
    verticalPadding: vertical.padding,
    horizontalPadding: horizontal.padding,
    verticalWidth: verticalBar?.offsetWidth ?? 0,
    horizontalHeight: horizontalBar?.offsetHeight ?? 0,
  };
}

export interface ScrollAreaRootProps extends PropsWithRender<React.ComponentProps<"div">> {}

export function Root(props: ScrollAreaRootProps) {
  const { render, ...rest } = props;
  const { dir } = { ...(render?.props as React.HTMLAttributes<HTMLElement> | undefined), ...rest };
  const [viewport, setViewport] = React.useState<HTMLElement | null>(null);
  const [content, setContent] = React.useState<HTMLElement | null>(null);
  const [verticalBar, setVerticalBar] = React.useState<HTMLElement | null>(null);
  const [horizontalBar, setHorizontalBar] = React.useState<HTMLElement | null>(null);
  const [metrics, setMetrics] = React.useState(initialMetrics);
  const [dragging, setDragging] = React.useState<ScrollAreaOrientation | null>(null);

  const measure = React.useCallback(() => {
    if (!viewport) return;

    const next = createMetrics(viewport, verticalBar, horizontalBar);
    setMetrics((current) =>
      (Object.keys(next) as Array<keyof Metrics>).every((key) => next[key] === current[key])
        ? current
        : next,
    );
  }, [horizontalBar, verticalBar, viewport]);

  React.useLayoutEffect(() => {
    if (!viewport) return undefined;

    let frame = 0;
    const schedule = () => {
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0;
          measure();
        });
    };
    const observer = new ResizeObserver(schedule);
    for (const element of [viewport, content, verticalBar, horizontalBar]) {
      if (element) observer.observe(element);
    }
    measure();

    viewport.addEventListener("scroll", schedule, { passive: true });
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      viewport.removeEventListener("scroll", schedule);
    };
  }, [content, horizontalBar, measure, verticalBar, viewport]);

  React.useLayoutEffect(() => measure(), [measure, dir]);

  const element = useRender({
    defaultTagName: "div",
    render,
    props: rest,
    internalProps: {
      ...getStateAttributes(metrics),
      "data-dragging": dragging ? "" : undefined,
      style: { position: "relative" },
    },
  });

  return (
    <ScrollAreaContext
      value={{
        metrics,
        viewport,
        verticalBar,
        horizontalBar,
        setViewport,
        setContent,
        setVerticalBar,
        setHorizontalBar,
        dragging,
        setDragging,
        measure,
      }}
    >
      {element}
    </ScrollAreaContext>
  );
}

export interface ScrollAreaViewportProps extends PropsWithRender<React.ComponentProps<"div">> {}

export function Viewport(props: ScrollAreaViewportProps) {
  const { render, ...rest } = props;

  const resolvedProps = {
    ...(render?.props as React.HTMLAttributes<HTMLElement> | undefined),
    ...rest,
  };
  const area = useScrollAreaContext("Viewport");
  const { metrics } = area;
  const overflowing = metrics.scrollWidth > metrics.width || metrics.scrollHeight > metrics.height;
  const named =
    resolvedProps["aria-label"] !== undefined || resolvedProps["aria-labelledby"] !== undefined;
  return useRender({
    defaultTagName: "div",
    render,
    props: rest,
    internalProps: {
      ...getStateAttributes(metrics),
      ref: area.setViewport,
      role: resolvedProps.role ?? (named ? "region" : undefined),
      tabIndex: resolvedProps.tabIndex ?? (overflowing ? 0 : -1),
      style: {
        width: "100%",
        height: "100%",
        overflow: "auto",
        scrollbarWidth: area.verticalBar || area.horizontalBar ? "none" : undefined,
      },
    },
  });
}

export interface ScrollAreaContentProps extends PropsWithRender<React.ComponentProps<"div">> {}

export function Content(props: ScrollAreaContentProps) {
  const { render, ...rest } = props;

  const area = useScrollAreaContext("Content");
  return useRender({
    defaultTagName: "div",
    render,
    props: rest,
    internalProps: {
      ref: area.setContent,
      style: { display: "flow-root", minWidth: "100%", width: "fit-content" },
    },
  });
}

export interface ScrollAreaScrollbarProps extends PropsWithRender<
  Omit<React.ComponentProps<"div">, "role" | "aria-hidden" | "tabIndex" | "hidden">
> {
  orientation?: ScrollAreaOrientation;
}

export function Scrollbar(props: ScrollAreaScrollbarProps) {
  const { render, orientation = "vertical", ...rest } = props;

  const area = useScrollAreaContext("Scrollbar");
  const { metrics, viewport, dragging, setDragging, measure } = area;
  const vertical = orientation === "vertical";
  const bar = vertical ? area.verticalBar : area.horizontalBar;
  const viewportSize = vertical ? metrics.height : metrics.width;
  const scrollSize = vertical ? metrics.scrollHeight : metrics.scrollWidth;
  const range = Math.max(0, scrollSize - viewportSize);
  const trackSize = vertical ? metrics.verticalSize : metrics.horizontalSize;
  const padding = vertical ? metrics.verticalPadding : metrics.horizontalPadding;
  const size =
    scrollSize > 0 ? Math.min(trackSize, Math.max(24, (trackSize * viewportSize) / scrollSize)) : 0;
  const travel = Math.max(0, trackSize - size);
  const position = vertical ? metrics.top : metrics.rtl ? range + metrics.left : metrics.left;
  const offset = range > 0 ? (clamp(position, 0, range) / range) * travel : 0;

  const thumbRef = React.useRef<HTMLElement | null>(null);
  const drag = React.useRef<{ pointerId: number; offset: number } | null>(null);
  const hasBothBars =
    metrics.scrollWidth > metrics.width &&
    metrics.scrollHeight > metrics.height &&
    area.verticalBar !== null &&
    area.horizontalBar !== null;

  React.useEffect(
    () => () => setDragging((current) => (current === orientation ? null : current)),
    [orientation, setDragging],
  );

  React.useEffect(() => {
    if (!bar || !viewport) return undefined;

    function handleWheel(event: WheelEvent) {
      if (event.defaultPrevented || event.ctrlKey) return;
      const delta = vertical ? event.deltaY : event.deltaX || event.deltaY;
      const unit =
        event.deltaMode === 1
          ? parseFloat(getComputedStyle(viewport!).lineHeight) || 16
          : event.deltaMode === 2
            ? viewportSize
            : 1;
      const min = !vertical && metrics.rtl ? -range : 0;
      const max = !vertical && metrics.rtl ? 0 : range;
      const property = vertical ? "scrollTop" : "scrollLeft";
      const previous = viewport![property];
      const next = Math.max(min, Math.min(previous + delta * unit, max));
      if (next !== previous) {
        event.preventDefault();
        viewport![property] = next;
        measure();
      }
    }

    bar.addEventListener("wheel", handleWheel, { passive: false });
    return () => bar.removeEventListener("wheel", handleWheel);
  }, [bar, measure, metrics.rtl, range, vertical, viewport, viewportSize]);

  function moveTo(event: React.PointerEvent<HTMLElement>, grip: number) {
    if (!viewport || travel === 0) return;
    const track = event.currentTarget;
    const rect = track.getBoundingClientRect();
    const coordinate = vertical
      ? event.clientY - rect.top - track.clientTop
      : event.clientX - rect.left - track.clientLeft;
    const next = clamp((coordinate - padding - grip) / travel, 0, 1) * range;
    if (vertical) viewport.scrollTop = next;
    else viewport.scrollLeft = metrics.rtl ? next - range : next;
    measure();
  }

  function handlePointerDown(event: React.PointerEvent<HTMLElement>) {
    if (event.defaultPrevented || event.button !== 0 || range === 0 || !thumbRef.current) return;
    event.preventDefault();
    const thumb = thumbRef.current;
    const rect = thumb.getBoundingClientRect();
    const grip = thumb.contains(event.target as Node)
      ? vertical
        ? event.clientY - rect.top
        : event.clientX - rect.left
      : size / 2;
    drag.current = { pointerId: event.pointerId, offset: grip };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(orientation);
    moveTo(event, grip);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    if (!event.defaultPrevented && drag.current?.pointerId === event.pointerId)
      moveTo(event, drag.current.offset);
  }

  function handlePointerUp(event: React.PointerEvent<HTMLElement>) {
    if (drag.current?.pointerId !== event.pointerId) return;
    drag.current = null;
    setDragging(null);
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  }

  const element = useRender({
    defaultTagName: "div",
    render,
    props: rest,
    internalProps: {
      ...getStateAttributes(metrics),
      "data-orientation": orientation,
      "data-dragging": dragging === orientation ? "" : undefined,
      hidden: range === 0,
      "aria-hidden": true,
      ref: vertical ? area.setVerticalBar : area.setHorizontalBar,
      style: {
        position: "absolute",
        ...(range === 0 && { display: "none" }),
        touchAction: "none",
        userSelect: "none",
        ...(vertical
          ? { top: 0, bottom: hasBothBars ? metrics.horizontalHeight : 0, insetInlineEnd: 0 }
          : {
              bottom: 0,
              insetInlineStart: 0,
              insetInlineEnd: hasBothBars ? metrics.verticalWidth : 0,
            }),
      },
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerCancel: handlePointerUp,
      onLostPointerCapture: handlePointerUp,
    },
  });

  return (
    <ScrollbarContext value={{ orientation, size, offset, padding, thumbRef }}>
      {element}
    </ScrollbarContext>
  );
}

export interface ScrollAreaThumbProps extends PropsWithRender<
  Omit<React.ComponentProps<"div">, "role" | "aria-hidden" | "tabIndex">
> {}

export function Thumb(props: ScrollAreaThumbProps) {
  const { render, ...rest } = props;

  const { orientation, size, offset, padding, thumbRef } = useScrollbarContext("Thumb");
  const vertical = orientation === "vertical";

  return useRender({
    defaultTagName: "div",
    render,
    props: rest,
    internalProps: {
      "data-orientation": orientation,
      ref: thumbRef,
      style: {
        position: "absolute",
        ...(vertical
          ? {
              left: 0,
              top: padding,
              width: "100%",
              height: size,
              transform: `translateY(${offset}px)`,
            }
          : {
              top: 0,
              left: padding,
              height: "100%",
              width: size,
              transform: `translateX(${offset}px)`,
            }),
      },
    },
  });
}

export interface ScrollAreaCornerProps extends PropsWithRender<
  Omit<React.ComponentProps<"div">, "role" | "aria-hidden" | "tabIndex" | "hidden">
> {}

export function Corner(props: ScrollAreaCornerProps) {
  const { render, ...rest } = props;

  const { metrics, verticalBar, horizontalBar } = useScrollAreaContext("Corner");
  const visible =
    metrics.scrollWidth > metrics.width &&
    metrics.scrollHeight > metrics.height &&
    verticalBar !== null &&
    horizontalBar !== null;

  return useRender({
    defaultTagName: "div",
    render,
    props: rest,
    internalProps: {
      "aria-hidden": true,
      hidden: !visible,
      style: {
        position: "absolute",
        bottom: 0,
        insetInlineEnd: 0,
        ...(!visible && { display: "none" }),
        width: metrics.verticalWidth,
        height: metrics.horizontalHeight,
      },
    },
  });
}

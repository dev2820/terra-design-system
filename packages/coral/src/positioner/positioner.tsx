"use client";

import { arrow, autoUpdate, computePosition, flip, offset, shift, size } from "@floating-ui/dom";
import * as React from "react";

import { useRender, type PropsWithRender } from "../core";

export type PositionerSide = "top" | "right" | "bottom" | "left";
export type PositionerAlign = "start" | "center" | "end";

export interface PositionerPlacement {
  side: PositionerSide;
  align: PositionerAlign;
  arrowStyle: React.CSSProperties;
}

export interface PositionerProps extends PropsWithRender<
  Omit<React.ComponentProps<"div">, "popover">
> {
  open: boolean;
  anchorRef: React.RefObject<HTMLElement | null>;
  side?: PositionerSide;
  align?: PositionerAlign;
  sideOffset?: number;
  collisionPadding?: number;
  arrowElement?: HTMLElement | null;
  onPlacementChange?: (placement: PositionerPlacement | null) => void;
}

export function Positioner(props: PositionerProps) {
  const {
    open,
    anchorRef,
    side = "bottom",
    align = "center",
    sideOffset = 0,
    collisionPadding = 8,
    arrowElement,
    onPlacementChange,
    render,
    ...rest
  } = props;
  const elementRef = React.useRef<HTMLDivElement>(null);
  const [placement, setPlacement] = React.useState<PositionerPlacement>({
    side,
    align,
    arrowStyle: {},
  });
  const previousPlacement = React.useRef<PositionerPlacement | null>(null);
  const settings = React.useRef(onPlacementChange);
  React.useLayoutEffect(() => {
    settings.current = onPlacementChange;
  });

  React.useLayoutEffect(() => {
    const element = elementRef.current;
    if (!open || !element) return;
    const anchor = anchorRef.current;
    element.showPopover(anchor ? { source: anchor } : {});
    return () => {
      previousPlacement.current = null;
      settings.current?.(null);
      if (element.matches(":popover-open")) element.hidePopover();
    };
  }, [open, anchorRef]);

  React.useLayoutEffect(() => {
    const element = elementRef.current;
    const anchor = anchorRef.current;
    if (!open || !element || !anchor) return;
    let disposed = false;
    let revision = 0;
    const update = () => {
      const currentRevision = ++revision;
      void computePosition(anchor, element, {
        strategy: "fixed",
        placement: align === "center" ? side : `${side}-${align}`,
        middleware: [
          offset(sideOffset),
          flip({ padding: collisionPadding }),
          shift({ padding: collisionPadding }),
          size({
            padding: collisionPadding,
            apply({ availableWidth, availableHeight, rects }) {
              if (disposed || revision !== currentRevision) return;
              element.style.setProperty("--anchor-width", `${rects.reference.width}px`);
              element.style.setProperty("--anchor-height", `${rects.reference.height}px`);
              element.style.setProperty("--available-width", `${Math.max(0, availableWidth)}px`);
              element.style.setProperty("--available-height", `${Math.max(0, availableHeight)}px`);
            },
          }),
          arrowElement ? arrow({ element: arrowElement, padding: collisionPadding }) : undefined,
        ],
      }).then(({ x, y, placement: resolved, middlewareData }) => {
        if (disposed || revision !== currentRevision) return;
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        const [resolvedSide, resolvedAlign = "center"] = resolved.split("-") as [
          PositionerSide,
          PositionerAlign?,
        ];
        const oppositeSide = (
          { top: "bottom", right: "left", bottom: "top", left: "right" } as const
        )[resolvedSide];
        const arrowSize =
          resolvedSide === "top" || resolvedSide === "bottom"
            ? (arrowElement?.offsetHeight ?? 0)
            : (arrowElement?.offsetWidth ?? 0);
        const arrowStyle: React.CSSProperties = arrowElement
          ? {
              left: middlewareData.arrow?.x,
              top: middlewareData.arrow?.y,
              [oppositeSide]: -arrowSize / 2,
            }
          : {};
        const previous = previousPlacement.current;
        if (
          previous?.side === resolvedSide &&
          previous.align === resolvedAlign &&
          previous.arrowStyle.left === arrowStyle.left &&
          previous.arrowStyle.top === arrowStyle.top &&
          previous.arrowStyle[oppositeSide] === arrowStyle[oppositeSide]
        )
          return;
        const next = { side: resolvedSide, align: resolvedAlign, arrowStyle };
        previousPlacement.current = next;
        setPlacement(next);
        settings.current?.(next);
      });
    };
    const cleanup = autoUpdate(anchor, element, update);
    const observer = new ResizeObserver(update);
    if (arrowElement) observer.observe(arrowElement);
    return () => {
      disposed = true;
      cleanup();
      observer.disconnect();
    };
  }, [open, anchorRef, side, align, sideOffset, collisionPadding, arrowElement]);

  const element = useRender({
    defaultTagName: "div",
    render,
    defaultProps: {
      style: {
        position: "fixed",
        inset: "auto",
        top: 0,
        left: 0,
        margin: 0,
        padding: 0,
        border: 0,
        background: "transparent",
        color: "inherit",
        overflow: "visible",
        width: "max-content",
        pointerEvents: "auto",
      },
    },
    props: rest,
    internalProps: {
      ref: elementRef,
      popover: "manual",
      "data-open": open ? "" : undefined,
      "data-side": placement.side,
      "data-align": placement.align,
    },
  });
  return open ? element : null;
}

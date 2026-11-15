"use client";

import * as React from "react";

import { useRender, type PropsWithRender } from "../core";

export type PositionerSide = "top" | "right" | "bottom" | "left";
export type PositionerAlign = "start" | "center" | "end";
export interface PositionerVirtualAnchor {
  getBoundingClientRect: () => Pick<
    DOMRect,
    "top" | "right" | "bottom" | "left" | "width" | "height"
  >;
  contextElement?: Element | undefined;
}
export type PositionerAnchor = HTMLElement | PositionerVirtualAnchor;

export interface PositionerPlacement {
  side: PositionerSide;
  align: PositionerAlign;
  arrowStyle: React.CSSProperties;
}

export interface PositionerProps extends PropsWithRender<
  Omit<React.ComponentProps<"div">, "popover">
> {
  open: boolean;
  anchorRef: React.RefObject<PositionerAnchor | null>;
  side?: PositionerSide;
  align?: PositionerAlign;
  sideOffset?: number;
  collisionPadding?: number;
  arrowElement?: HTMLElement | null;
  onPlacementChange?: (placement: PositionerPlacement | null) => void;
}

interface AnchorRegistration {
  original: string;
  priority: string;
  base: string;
  names: Set<string>;
  applied: string;
}
const registrations = new WeakMap<HTMLElement, AnchorRegistration>();
let nextAnchorId = 0;

function registerAnchor(element: HTMLElement, name: string) {
  let entry = registrations.get(element);
  if (!entry) {
    const computed = getComputedStyle(element).getPropertyValue("anchor-name").trim();
    entry = {
      original: element.style.getPropertyValue("anchor-name"),
      priority: element.style.getPropertyPriority("anchor-name"),
      base: computed === "none" ? "" : computed,
      names: new Set(),
      applied: "",
    };
    registrations.set(element, entry);
  }
  const registration = entry;
  function apply() {
    registration.applied = [registration.base, ...registration.names].filter(Boolean).join(", ");
    element.style.setProperty("anchor-name", registration.applied);
  }
  registration.names.add(name);
  apply();
  return () => {
    registration.names.delete(name);
    if (element.style.getPropertyValue("anchor-name") === registration.applied) {
      if (registration.names.size) apply();
      else if (registration.original)
        element.style.setProperty("anchor-name", registration.original, registration.priority);
      else element.style.removeProperty("anchor-name");
    }
    if (!registration.names.size) registrations.delete(element);
  };
}

const opposite = { top: "bottom", right: "left", bottom: "top", left: "right" } as const;
function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, Math.max(min, max)));
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
  const syncAnchorRef = React.useRef<(() => HTMLElement | null) | null>(null);
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
    const name = "--coral-positioner-" + ++nextAnchorId;
    let reference: PositionerAnchor | null = null;
    let anchorElement: HTMLElement | null = null;
    let ghost: HTMLSpanElement | null = null;
    let unregister: (() => void) | undefined;
    function sync() {
      const next = anchorRef.current;
      if (next !== reference) {
        if (element!.matches(":popover-open")) element!.hidePopover();
        unregister?.();
        ghost?.remove();
        ghost = null;
        reference = next;
        anchorElement = null;
        if (next) {
          if (next instanceof HTMLElement) anchorElement = next;
          else {
            ghost = element!.ownerDocument.createElement("span");
            ghost.setAttribute("aria-hidden", "true");
            ghost.dataset.positionerAnchor = "";
            ghost.style.cssText =
              "position:fixed;margin:0;padding:0;border:0;opacity:0;pointer-events:none";
            element!.ownerDocument.body.append(ghost);
            anchorElement = ghost;
          }
          unregister = registerAnchor(anchorElement, name);
          element!.style.setProperty("position-anchor", name);
        }
      }
      if (reference && ghost) {
        const rect = reference.getBoundingClientRect();
        Object.assign(ghost.style, {
          left: rect.left + "px",
          top: rect.top + "px",
          width: rect.width + "px",
          height: rect.height + "px",
        });
      }
      if (reference && anchorElement?.isConnected && !element!.matches(":popover-open")) {
        const source = reference instanceof HTMLElement ? reference : reference.contextElement;
        element!.showPopover(source instanceof HTMLElement ? { source } : {});
      }
      return anchorElement;
    }
    syncAnchorRef.current = sync;
    sync();
    return () => {
      syncAnchorRef.current = null;
      unregister?.();
      ghost?.remove();
      previousPlacement.current = null;
      settings.current?.(null);
      if (element.matches(":popover-open")) element.hidePopover();
    };
  }, [open, anchorRef]);

  React.useLayoutEffect(() => {
    const element = elementRef.current;
    if (!open || !element) return;
    const document = element.ownerDocument;
    const window = document.defaultView!;
    let frame = 0;
    let direction = "";
    let shiftX = 0;
    let shiftY = 0;
    element.style.translate = "0px 0px";

    function setStyle(property: string, value: string) {
      if (element!.style.getPropertyValue(property) !== value)
        element!.style.setProperty(property, value);
    }
    function update() {
      frame = window.requestAnimationFrame(update);
      const anchor = syncAnchorRef.current?.();
      if (!anchor?.isConnected || !element!.isConnected) return;
      const rtl = getComputedStyle(element!).direction === "rtl";
      const nextDirection = rtl ? "rtl" : "ltr";
      const vertical = side === "top" || side === "bottom";
      if (direction !== nextDirection) {
        direction = nextDirection;
        const edge = vertical
          ? align === "start"
            ? rtl
              ? "left"
              : "right"
            : rtl
              ? "right"
              : "left"
          : align === "start"
            ? "bottom"
            : "top";
        setStyle("position-area", align === "center" ? side : side + " span-" + edge);
        setStyle(
          "position-try-fallbacks",
          vertical
            ? "flip-block, flip-inline, flip-block flip-inline"
            : "flip-inline, flip-block, flip-inline flip-block",
        );
        for (const boundary of ["top", "right", "bottom", "left"])
          setStyle("margin-" + boundary, "0px");
        setStyle("margin-" + side, collisionPadding + "px");
        for (const cross of vertical ? ["left", "right"] : ["top", "bottom"]) {
          if (align === "center" || cross === edge)
            setStyle("margin-" + cross, collisionPadding + "px");
        }
        setStyle("margin-" + opposite[side], sideOffset + "px");
      }
      const area = getComputedStyle(element!).getPropertyValue("position-area").split(" ");
      const resolvedSide = area.find((value) => value in opposite) as PositionerSide | undefined;
      if (!resolvedSide) return;
      const resolvedVertical = resolvedSide === "top" || resolvedSide === "bottom";
      const resolvedAlign: PositionerAlign = area.some((value) => value.startsWith("span-"))
        ? resolvedVertical
          ? area.includes(rtl ? "span-left" : "span-right")
            ? "start"
            : "end"
          : area.includes("span-bottom")
            ? "start"
            : "end"
        : "center";
      const viewport = window.visualViewport;
      const left = viewport?.offsetLeft ?? 0;
      const top = viewport?.offsetTop ?? 0;
      const width = viewport?.width ?? document.documentElement.clientWidth;
      const height = viewport?.height ?? document.documentElement.clientHeight;
      let rect = element!.getBoundingClientRect();
      const baseX = rect.left - shiftX;
      const baseY = rect.top - shiftY;
      const nextX = resolvedVertical
        ? clamp(baseX, left + collisionPadding, left + width - rect.width - collisionPadding) -
          baseX
        : 0;
      const nextY = resolvedVertical
        ? 0
        : clamp(baseY, top + collisionPadding, top + height - rect.height - collisionPadding) -
          baseY;
      if (shiftX !== nextX || shiftY !== nextY) {
        shiftX = nextX;
        shiftY = nextY;
        setStyle("translate", shiftX + "px " + shiftY + "px");
        rect = element!.getBoundingClientRect();
      }
      const target = anchor.getBoundingClientRect();
      const availableWidth = resolvedVertical
        ? width - 2 * collisionPadding
        : resolvedSide === "right"
          ? left + width - target.right - sideOffset - collisionPadding
          : target.left - left - sideOffset - collisionPadding;
      const availableHeight = !resolvedVertical
        ? height - 2 * collisionPadding
        : resolvedSide === "bottom"
          ? top + height - target.bottom - sideOffset - collisionPadding
          : target.top - top - sideOffset - collisionPadding;
      setStyle("--anchor-width", target.width + "px");
      setStyle("--anchor-height", target.height + "px");
      setStyle("--available-width", Math.max(0, availableWidth) + "px");
      setStyle("--available-height", Math.max(0, availableHeight) + "px");
      const arrowStyle: React.CSSProperties = {};
      if (arrowElement) {
        const arrowWidth = arrowElement.offsetWidth;
        const arrowHeight = arrowElement.offsetHeight;
        if (resolvedVertical)
          arrowStyle.left = clamp(
            target.left + target.width / 2 - rect.left - arrowWidth / 2,
            collisionPadding,
            rect.width - arrowWidth - collisionPadding,
          );
        else
          arrowStyle.top = clamp(
            target.top + target.height / 2 - rect.top - arrowHeight / 2,
            collisionPadding,
            rect.height - arrowHeight - collisionPadding,
          );
        arrowStyle[opposite[resolvedSide]] = -(resolvedVertical ? arrowHeight : arrowWidth) / 2;
      }
      const previous = previousPlacement.current;
      if (
        previous?.side === resolvedSide &&
        previous.align === resolvedAlign &&
        (["top", "right", "bottom", "left"] as const).every(
          (key) => previous.arrowStyle[key] === arrowStyle[key],
        )
      )
        return;
      const next = { side: resolvedSide, align: resolvedAlign, arrowStyle };
      previousPlacement.current = next;
      setPlacement(next);
      settings.current?.(next);
    }
    frame = window.requestAnimationFrame(update);
    return () => window.cancelAnimationFrame(frame);
  }, [open, anchorRef, side, align, sideOffset, collisionPadding, arrowElement]);

  const element = useRender({
    defaultTagName: "div",
    render,
    defaultProps: {
      style: {
        position: "fixed",
        inset: "auto",
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

"use client";

import * as React from "react";

import {
  createFocusRestoration,
  createPartContext,
  focusElement,
  useRender,
  type PropsWithRender,
} from "../core";
import { Portal as BasePortal, type PortalProps } from "../portal";
import {
  Positioner as BasePositioner,
  type PositionerAlign,
  type PositionerPlacement,
  type PositionerProps,
  type PositionerSide,
} from "../positioner";
import {
  focusInitialElement,
  getPopoverManager,
  resolveFocusTarget,
  type PopoverLayer,
} from "./popover-layer";

export type PopoverInteractionType = "mouse" | "touch" | "pen" | "keyboard" | "";
export type PopoverFocusTarget =
  | boolean
  | React.RefObject<HTMLElement | null>
  | ((interactionType: PopoverInteractionType) => HTMLElement | boolean | null | void);
export type PopoverSide = PositionerSide;
export type PopoverAlign = PositionerAlign;

export interface PopoverChangeEventDetails {
  readonly reason:
    | "trigger-press"
    | "close-press"
    | "escape-key"
    | "outside-press"
    | "focus-outside";
  readonly event: Event;
  readonly trigger: HTMLElement | null;
  readonly isCanceled: boolean;
  cancel: () => void;
}

export interface PopoverRootProps {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean, eventDetails: PopoverChangeEventDetails) => void;
}

type Placement = PositionerPlacement;

interface PopoverContextValue {
  open: boolean;
  ready: boolean;
  parentReady: boolean;
  setReady: React.Dispatch<React.SetStateAction<boolean>>;
  contentId: string;
  ancestors: string[];
  triggerRef: React.RefObject<HTMLElement | null>;
  positionerRef: React.RefObject<HTMLDivElement | null>;
  arrowElement: HTMLDivElement | null;
  setArrowElement: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
  previousFocusRef: React.RefObject<HTMLElement | null>;
  openInteractionRef: React.RefObject<PopoverInteractionType>;
  closeInteractionRef: React.RefObject<PopoverInteractionType>;
  titleId: string | undefined;
  setTitleId: React.Dispatch<React.SetStateAction<string | undefined>>;
  descriptionId: string | undefined;
  setDescriptionId: React.Dispatch<React.SetStateAction<string | undefined>>;
  placement: Placement;
  setPlacement: React.Dispatch<React.SetStateAction<Placement>>;
  requestOpen: (
    open: boolean,
    event: Event,
    reason: PopoverChangeEventDetails["reason"],
    interaction: PopoverInteractionType,
  ) => void;
}

const [PopoverContext, usePopoverContext] = createPartContext<PopoverContextValue>("Popover");

export function Root(props: PopoverRootProps) {
  const { children, open: openProp, defaultOpen = false, onOpenChange } = props;

  const parent = usePopoverContext("Root", true);
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const [ready, setReady] = React.useState(false);
  const [titleId, setTitleId] = React.useState<string>();
  const [descriptionId, setDescriptionId] = React.useState<string>();
  const [arrowElement, setArrowElement] = React.useState<HTMLDivElement | null>(null);
  const [placement, setPlacement] = React.useState<Placement>({
    side: "bottom",
    align: "center",
    arrowStyle: {},
  });
  const contentId = `${React.useId()}-popover`;
  const triggerRef = React.useRef<HTMLElement>(null);
  const positionerRef = React.useRef<HTMLDivElement>(null);
  const previousFocusRef = React.useRef<HTMLElement>(null);
  const openInteractionRef = React.useRef<PopoverInteractionType>("");
  const closeInteractionRef = React.useRef<PopoverInteractionType>("");
  const open = openProp ?? uncontrolledOpen;
  const ancestors = React.useMemo(
    () => (parent ? [...parent.ancestors, parent.contentId] : []),
    [parent?.ancestors, parent?.contentId],
  );

  React.useEffect(() => {
    if (open) {
      closeInteractionRef.current = "";
      return;
    }
    openInteractionRef.current = "";
    function rememberFocus() {
      previousFocusRef.current =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
    }
    rememberFocus();
    document.addEventListener("focusin", rememberFocus);
    return () => document.removeEventListener("focusin", rememberFocus);
  }, [open]);

  function requestOpen(
    nextOpen: boolean,
    event: Event,
    reason: PopoverChangeEventDetails["reason"],
    interaction: PopoverInteractionType,
  ) {
    if (nextOpen === open) return;
    let canceled = false;
    const details: PopoverChangeEventDetails = {
      reason,
      event,
      trigger: triggerRef.current,
      get isCanceled() {
        return canceled;
      },
      cancel() {
        canceled = true;
      },
    };
    onOpenChange?.(nextOpen, details);
    if (details.isCanceled) return;
    if (nextOpen) openInteractionRef.current = interaction;
    else closeInteractionRef.current = interaction;
    if (openProp === undefined) setUncontrolledOpen(nextOpen);
  }

  return (
    <PopoverContext
      value={{
        open,
        ready,
        parentReady: parent?.ready ?? true,
        setReady,
        contentId,
        ancestors,
        triggerRef,
        positionerRef,
        arrowElement,
        setArrowElement,
        previousFocusRef,
        openInteractionRef,
        closeInteractionRef,
        titleId,
        setTitleId,
        descriptionId,
        setDescriptionId,
        placement,
        setPlacement,
        requestOpen,
      }}
    >
      {children}
    </PopoverContext>
  );
}

export interface PopoverTriggerProps extends PropsWithRender<
  Omit<React.ComponentProps<"button">, "aria-controls" | "aria-expanded" | "aria-haspopup">
> {}

export function Trigger(props: PopoverTriggerProps) {
  const { render, ...rest } = props;

  const popover = usePopoverContext("Trigger");
  const pointerType = React.useRef<PopoverInteractionType>("mouse");

  return useRender({
    defaultTagName: "button",
    render,
    props: render ? rest : { ...rest, type: rest.type ?? "button" },
    internalProps: {
      ref: popover.triggerRef,
      "aria-haspopup": "dialog",
      "aria-expanded": popover.open,
      "aria-controls": popover.open ? popover.contentId : undefined,
      "data-open": popover.open ? "" : undefined,
      onPointerDown(event: React.PointerEvent<HTMLButtonElement>) {
        pointerType.current = event.pointerType as PopoverInteractionType;
      },
      onClick(event: React.MouseEvent<HTMLButtonElement>) {
        if (!event.defaultPrevented && !event.currentTarget.matches(":disabled")) {
          popover.requestOpen(
            !popover.open,
            event.nativeEvent,
            "trigger-press",
            event.detail === 0 ? "keyboard" : pointerType.current,
          );
        }
      },
    },
  });
}

export interface PopoverPortalProps extends PortalProps {}

export function Portal(props: PopoverPortalProps) {
  const { open } = usePopoverContext("Portal");
  return open ? <BasePortal {...props} /> : null;
}

export interface PopoverPositionerProps extends Omit<
  PositionerProps,
  "open" | "anchorRef" | "arrowElement" | "onPlacementChange"
> {}

export function Positioner(props: PopoverPositionerProps) {
  const {
    side = "bottom",
    align = "center",
    sideOffset = 0,
    collisionPadding = 8,
    render,
    ...rest
  } = props;
  const { open, parentReady, positionerRef, triggerRef, arrowElement, setReady, setPlacement } =
    usePopoverContext("Positioner");
  const handlePlacementChange = React.useCallback(
    (placement: PositionerPlacement | null) => {
      if (placement) setPlacement(placement);
      setReady(placement !== null);
    },
    [setPlacement, setReady],
  );

  const element = useRender({
    defaultTagName: "div",
    defaultProps: { style: { pointerEvents: "none" } },
    render,
    props: rest,
    internalProps: { ref: positionerRef },
  });
  return (
    <BasePositioner
      open={open && parentReady}
      anchorRef={triggerRef}
      side={side}
      align={align}
      sideOffset={sideOffset}
      collisionPadding={collisionPadding}
      arrowElement={arrowElement}
      onPlacementChange={handlePlacementChange}
      render={element}
    />
  );
}

export interface PopoverContentProps extends PropsWithRender<
  Omit<React.ComponentProps<"div">, "id" | "role" | "aria-modal" | "tabIndex">
> {
  initialFocus?: PopoverFocusTarget;
  finalFocus?: PopoverFocusTarget;
}

export function Content(props: PopoverContentProps) {
  const { initialFocus, finalFocus, render, ...rest } = props;

  const popover = usePopoverContext("Content");
  const contentRef = React.useRef<HTMLDivElement>(null);
  const settings = React.useRef({ popover, initialFocus, finalFocus });
  React.useLayoutEffect(() => {
    settings.current = { popover, initialFocus, finalFocus };
  });

  React.useLayoutEffect(() => {
    const content = contentRef.current;
    if (!popover.open || !popover.ready || !content) return;
    const document = content.ownerDocument;
    const restoreFocus = createFocusRestoration(content, popover.previousFocusRef.current);
    const layer: PopoverLayer = {
      id: popover.contentId,
      ancestors: popover.ancestors,
      content,
      trigger: () => settings.current.popover.triggerRef.current,
      dismiss: (event, reason, interaction) =>
        settings.current.popover.requestOpen(false, event, reason, interaction),
    };
    const manager = getPopoverManager(document);
    const remove = manager.add(layer);
    const target = resolveFocusTarget(
      settings.current.initialFocus,
      popover.openInteractionRef.current,
    );
    if (manager.isTop(layer) && target !== false && target !== undefined) {
      if (
        target === true ||
        target === null ||
        !content.contains(target) ||
        !focusElement(target)
      ) {
        focusInitialElement(layer, popover.openInteractionRef.current);
      }
    }
    return () => {
      const wasTop = manager.isTop(layer);
      const active = document.activeElement;
      const restoreDefaultFocus = active === document.body || content.contains(active);
      remove();
      if (!wasTop) return;
      queueMicrotask(() => {
        if (content.isConnected) return;
        const current = settings.current;
        restoreFocus(
          resolveFocusTarget(current.finalFocus, current.popover.closeInteractionRef.current),
          current.popover.triggerRef.current,
          restoreDefaultFocus,
        );
      });
    };
  }, [popover.open, popover.ready, popover.contentId, popover.ancestors]);

  const element = useRender({
    defaultTagName: "div",
    render,
    defaultProps: {
      "aria-labelledby": rest["aria-label"] ? undefined : popover.titleId,
      "aria-describedby": popover.descriptionId,
      style: { pointerEvents: "auto" },
    },
    props: rest,
    internalProps: {
      ref: contentRef,
      id: popover.contentId,
      role: "dialog",
      "aria-modal": undefined,
      tabIndex: -1,
      "data-open": popover.open ? "" : undefined,
      "data-side": popover.placement.side,
      "data-align": popover.placement.align,
    },
  });

  return popover.open ? element : null;
}

export interface PopoverArrowProps extends PropsWithRender<
  Omit<React.ComponentProps<"div">, "aria-hidden">
> {}

export function Arrow(props: PopoverArrowProps) {
  const { render, ...rest } = props;

  const popover = usePopoverContext("Arrow");

  return useRender({
    defaultTagName: "div",
    render,
    props: rest,
    internalProps: {
      ref: popover.setArrowElement,
      "aria-hidden": true,
      "data-side": popover.placement.side,
      style: { position: "absolute", pointerEvents: "none", ...popover.placement.arrowStyle },
    },
  });
}

export interface PopoverTitleProps extends PropsWithRender<React.ComponentProps<"h2">> {}

export function Title(props: PopoverTitleProps) {
  const { render, ...rest } = props;

  const { setTitleId } = usePopoverContext("Title");
  const generatedId = React.useId();
  const id = rest.id ?? generatedId;

  React.useLayoutEffect(() => {
    setTitleId(id);
    return () => setTitleId(undefined);
  }, [id, setTitleId]);

  return useRender({ defaultTagName: "h2", render, props: rest, internalProps: { id } });
}

export interface PopoverDescriptionProps extends PropsWithRender<React.ComponentProps<"p">> {}

export function Description(props: PopoverDescriptionProps) {
  const { render, ...rest } = props;

  const { setDescriptionId } = usePopoverContext("Description");
  const generatedId = React.useId();
  const id = rest.id ?? generatedId;

  React.useLayoutEffect(() => {
    setDescriptionId(id);
    return () => setDescriptionId(undefined);
  }, [id, setDescriptionId]);

  return useRender({ defaultTagName: "p", render, props: rest, internalProps: { id } });
}

export interface PopoverCloseProps extends PropsWithRender<React.ComponentProps<"button">> {}

export function Close(props: PopoverCloseProps) {
  const { render, ...rest } = props;

  const popover = usePopoverContext("Close");
  const pointerType = React.useRef<PopoverInteractionType>("mouse");

  return useRender({
    defaultTagName: "button",
    render,
    props: render ? rest : { ...rest, type: rest.type ?? "button" },
    internalProps: {
      onPointerDown(event: React.PointerEvent<HTMLButtonElement>) {
        pointerType.current = event.pointerType as PopoverInteractionType;
      },
      onClick(event: React.MouseEvent<HTMLButtonElement>) {
        if (!event.defaultPrevented && !event.currentTarget.matches(":disabled")) {
          popover.requestOpen(
            false,
            event.nativeEvent,
            "close-press",
            event.detail === 0 ? "keyboard" : pointerType.current,
          );
        }
      },
    },
  });
}

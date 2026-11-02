"use client";

import * as React from "react";
import { createPortal } from "react-dom";

import {
  createFocusRestoration,
  createPartContext,
  focusElement,
  useRender,
  visuallyHiddenStyle,
  type PropsWithRender,
} from "../core";
import {
  focusInitialElement,
  getDialogManager,
  resolveFocusTarget,
  type DialogLayer,
} from "../dialog/dialog-layer";

export type AlertDialogInteractionType = "mouse" | "touch" | "pen" | "keyboard" | "";
export type AlertDialogFocusTarget =
  | boolean
  | React.RefObject<HTMLElement | null>
  | ((interactionType: AlertDialogInteractionType) => HTMLElement | boolean | null | void);

export interface AlertDialogChangeEventDetails {
  readonly reason: "trigger-press" | "close-press" | "escape-key" | "outside-press";
  readonly event: Event;
  readonly trigger: HTMLElement | null;
  readonly isCanceled: boolean;
  cancel: () => void;
}

export interface AlertDialogRootProps {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean, eventDetails: AlertDialogChangeEventDetails) => void;
}

interface AlertDialogContextValue {
  open: boolean;
  contentId: string;
  ancestors: string[];
  triggerRef: React.RefObject<HTMLElement | null>;
  previousFocusRef: React.RefObject<HTMLElement | null>;
  backdropRef: React.RefObject<HTMLDivElement | null>;
  openInteractionRef: React.RefObject<AlertDialogInteractionType>;
  closeInteractionRef: React.RefObject<AlertDialogInteractionType>;
  requestOpen: (
    open: boolean,
    event: Event,
    reason: AlertDialogChangeEventDetails["reason"],
    interaction: AlertDialogInteractionType,
    trigger?: HTMLElement,
  ) => void;
}

const [AlertDialogContext, useAlertDialogContext] =
  createPartContext<AlertDialogContextValue>("AlertDialog");

export function Root(props: AlertDialogRootProps) {
  const { children, open: openProp, defaultOpen = false, onOpenChange } = props;

  const parent = useAlertDialogContext("Root", true);
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const contentId = `${React.useId()}-alert-dialog`;
  const triggerRef = React.useRef<HTMLElement>(null);
  const previousFocusRef = React.useRef<HTMLElement>(null);
  const backdropRef = React.useRef<HTMLDivElement>(null);
  const openInteractionRef = React.useRef<AlertDialogInteractionType>("");
  const closeInteractionRef = React.useRef<AlertDialogInteractionType>("");
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
      if (document.getElementById(contentId)?.contains(document.activeElement)) {
        return;
      }
      previousFocusRef.current =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
    }

    rememberFocus();
    document.addEventListener("focusin", rememberFocus);
    return () => document.removeEventListener("focusin", rememberFocus);
  }, [open, contentId]);

  function requestOpen(
    nextOpen: boolean,
    event: Event,
    reason: AlertDialogChangeEventDetails["reason"],
    interaction: AlertDialogInteractionType,
    trigger?: HTMLElement,
  ) {
    if (nextOpen === open || reason === "outside-press") {
      return;
    }
    let canceled = false;
    const details: AlertDialogChangeEventDetails = {
      reason,
      event,
      trigger: trigger ?? triggerRef.current,
      get isCanceled() {
        return canceled;
      },
      cancel() {
        canceled = true;
      },
    };
    onOpenChange?.(nextOpen, details);
    if (details.isCanceled) {
      return;
    }
    if (nextOpen) {
      openInteractionRef.current = interaction;
    } else {
      closeInteractionRef.current = interaction;
    }
    if (nextOpen && trigger) {
      triggerRef.current = trigger;
    }
    if (openProp === undefined) {
      setUncontrolledOpen(nextOpen);
    }
  }

  return (
    <AlertDialogContext
      value={{
        open,
        contentId,
        ancestors,
        triggerRef,
        previousFocusRef,
        backdropRef,
        openInteractionRef,
        closeInteractionRef,
        requestOpen,
      }}
    >
      {children}
    </AlertDialogContext>
  );
}

export interface AlertDialogTriggerProps extends PropsWithRender<
  Omit<React.ComponentProps<"button">, "aria-controls" | "aria-expanded" | "aria-haspopup">
> {}

export function Trigger(props: AlertDialogTriggerProps) {
  const { render, ...rest } = props;
  const dialog = useAlertDialogContext("Trigger");
  const pointerType = React.useRef<AlertDialogInteractionType>("mouse");

  return useRender({
    defaultTagName: "button",
    render,
    props: render ? rest : { ...rest, type: rest.type ?? "button" },
    internalProps: {
      "aria-haspopup": "dialog",
      "aria-expanded": dialog.open,
      "aria-controls": dialog.open ? dialog.contentId : undefined,
      "data-open": dialog.open ? "" : undefined,
      onPointerDown(event: React.PointerEvent<HTMLButtonElement>) {
        pointerType.current = event.pointerType as AlertDialogInteractionType;
      },
      onClick(event: React.MouseEvent<HTMLButtonElement>) {
        if (!event.defaultPrevented && !event.currentTarget.matches(":disabled")) {
          dialog.requestOpen(
            true,
            event.nativeEvent,
            "trigger-press",
            event.detail === 0 ? "keyboard" : pointerType.current,
            event.currentTarget,
          );
        }
      },
    },
  });
}

export interface AlertDialogPortalProps extends PropsWithRender<React.ComponentProps<"div">> {
  container?: HTMLElement | null;
}

export function Portal(props: AlertDialogPortalProps) {
  const { container, render, ...rest } = props;
  const dialog = useAlertDialogContext("Portal");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const element = useRender({ defaultTagName: "div", render, props: rest });

  return mounted && dialog.open ? createPortal(element, container ?? document.body) : null;
}

export interface AlertDialogBackdropProps extends PropsWithRender<
  Omit<React.ComponentProps<"div">, "aria-hidden">
> {}

export function Backdrop(props: AlertDialogBackdropProps) {
  const { render, ...rest } = props;
  const dialog = useAlertDialogContext("Backdrop");
  const element = useRender({
    defaultTagName: "div",
    render,
    props: rest,
    internalProps: {
      ref: dialog.backdropRef,
      "aria-hidden": true,
      "data-open": dialog.open ? "" : undefined,
    },
  });
  return dialog.open ? element : null;
}

export interface AlertDialogPositionerProps extends PropsWithRender<React.ComponentProps<"div">> {}

export function Positioner(props: AlertDialogPositionerProps) {
  const { render, ...rest } = props;
  const dialog = useAlertDialogContext("Positioner");
  const element = useRender({
    defaultTagName: "div",
    render,
    props: rest,
    internalProps: { "data-open": dialog.open ? "" : undefined },
  });
  return dialog.open ? element : null;
}

export interface AlertDialogContentProps extends PropsWithRender<
  Omit<React.ComponentProps<"div">, "id" | "role" | "aria-modal" | "tabIndex">
> {
  initialFocus?: AlertDialogFocusTarget;
  finalFocus?: AlertDialogFocusTarget;
}

export function Content(props: AlertDialogContentProps) {
  const { initialFocus, finalFocus, render, ...rest } = props;
  const dialog = useAlertDialogContext("Content");
  const contentRef = React.useRef<HTMLDivElement>(null);
  const beforeGuardRef = React.useRef<HTMLSpanElement>(null);
  const afterGuardRef = React.useRef<HTMLSpanElement>(null);
  const settings = React.useRef({ dialog, initialFocus, finalFocus });
  React.useLayoutEffect(() => {
    settings.current = { dialog, initialFocus, finalFocus };
  });

  React.useLayoutEffect(() => {
    const content = contentRef.current;
    if (!dialog.open || !content) {
      return;
    }
    const document = content.ownerDocument;
    const restoreFocus = createFocusRestoration(content, dialog.previousFocusRef.current);
    const layer: DialogLayer = {
      id: dialog.contentId,
      ancestors: dialog.ancestors,
      modal: true,
      content,
      beforeGuard: beforeGuardRef.current,
      afterGuard: afterGuardRef.current,
      backdrop: () => settings.current.dialog.backdropRef.current,
      dismiss: (event, reason, interaction) =>
        settings.current.dialog.requestOpen(false, event, reason, interaction),
    };
    const manager = getDialogManager(document);
    const remove = manager.add(layer);
    const target = resolveFocusTarget(
      settings.current.initialFocus,
      dialog.openInteractionRef.current,
    );
    if (manager.isTop(layer) && target !== false && target !== undefined) {
      if (
        target === true ||
        target === null ||
        !content.contains(target) ||
        !focusElement(target)
      ) {
        focusInitialElement(layer, dialog.openInteractionRef.current);
      }
    }

    return () => {
      const wasTop = manager.isTop(layer);
      remove();
      if (!wasTop) {
        return;
      }
      // Wait for removed Portal nodes and other modal cleanups in this commit.
      queueMicrotask(() => {
        // Strict Mode replays effects while keeping the mounted Content.
        if (content.isConnected) {
          return;
        }
        const current = settings.current;
        const finalTarget = resolveFocusTarget(
          current.finalFocus,
          current.dialog.closeInteractionRef.current,
        );
        restoreFocus(finalTarget, current.dialog.triggerRef.current, true);
      });
    };
  }, [dialog.open, dialog.contentId, dialog.ancestors]);

  const element = useRender({
    defaultTagName: "div",
    defaultProps: { style: { pointerEvents: "auto" } },
    render,
    props: rest,
    internalProps: {
      ref: contentRef,
      id: dialog.contentId,
      role: "alertdialog",
      "aria-modal": true,
      tabIndex: -1,
      "data-open": dialog.open ? "" : undefined,
    },
  });
  return dialog.open ? (
    <>
      <span
        ref={beforeGuardRef}
        tabIndex={0}
        data-dialog-focus-guard=""
        style={visuallyHiddenStyle}
      />
      {element}
      <span
        ref={afterGuardRef}
        tabIndex={0}
        data-dialog-focus-guard=""
        style={visuallyHiddenStyle}
      />
    </>
  ) : null;
}

export interface AlertDialogTitleProps extends PropsWithRender<React.ComponentProps<"h2">> {}

export function Title(props: AlertDialogTitleProps) {
  const { render, ...rest } = props;
  useAlertDialogContext("Title");
  return useRender({ defaultTagName: "h2", render, props: rest });
}

export interface AlertDialogDescriptionProps extends PropsWithRender<React.ComponentProps<"p">> {}

export function Description(props: AlertDialogDescriptionProps) {
  const { render, ...rest } = props;
  useAlertDialogContext("Description");
  return useRender({ defaultTagName: "p", render, props: rest });
}

export interface AlertDialogHeaderProps extends PropsWithRender<React.ComponentProps<"div">> {}

export function Header(props: AlertDialogHeaderProps) {
  const { render, ...rest } = props;
  useAlertDialogContext("Header");
  return useRender({ defaultTagName: "div", render, props: rest });
}

export interface AlertDialogBodyProps extends PropsWithRender<React.ComponentProps<"div">> {}

export function Body(props: AlertDialogBodyProps) {
  const { render, ...rest } = props;
  useAlertDialogContext("Body");
  return useRender({ defaultTagName: "div", render, props: rest });
}

export interface AlertDialogFooterProps extends PropsWithRender<React.ComponentProps<"div">> {}

export function Footer(props: AlertDialogFooterProps) {
  const { render, ...rest } = props;
  useAlertDialogContext("Footer");
  return useRender({ defaultTagName: "div", render, props: rest });
}

export interface AlertDialogCloseProps extends PropsWithRender<React.ComponentProps<"button">> {}

export function Close(props: AlertDialogCloseProps) {
  const { render, ...rest } = props;
  const dialog = useAlertDialogContext("Close");
  const pointerType = React.useRef<AlertDialogInteractionType>("mouse");
  return useRender({
    defaultTagName: "button",
    render,
    props: render ? rest : { ...rest, type: rest.type ?? "button" },
    internalProps: {
      onPointerDown(event: React.PointerEvent<HTMLButtonElement>) {
        pointerType.current = event.pointerType as AlertDialogInteractionType;
      },
      onClick(event: React.MouseEvent<HTMLButtonElement>) {
        if (!event.defaultPrevented && !event.currentTarget.matches(":disabled")) {
          dialog.requestOpen(
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

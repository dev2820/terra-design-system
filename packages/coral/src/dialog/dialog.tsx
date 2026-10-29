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
} from "./dialog-layer";

export type DialogInteractionType = "mouse" | "touch" | "pen" | "keyboard" | "";
export type DialogFocusTarget =
  | boolean
  | React.RefObject<HTMLElement | null>
  | ((interactionType: DialogInteractionType) => HTMLElement | boolean | null | void);

export interface DialogChangeEventDetails {
  readonly reason: "trigger-press" | "close-press" | "escape-key" | "outside-press";
  readonly event: Event;
  readonly trigger: HTMLElement | null;
  readonly isCanceled: boolean;
  cancel: () => void;
}

export interface DialogRootProps {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  modal?: boolean;
  onOpenChange?: (open: boolean, eventDetails: DialogChangeEventDetails) => void;
}

interface DialogContextValue {
  open: boolean;
  modal: boolean;
  contentId: string;
  ancestors: string[];
  triggerRef: React.RefObject<HTMLElement | null>;
  previousFocusRef: React.RefObject<HTMLElement | null>;
  backdropRef: React.RefObject<HTMLDivElement | null>;
  openInteractionRef: React.RefObject<DialogInteractionType>;
  closeInteractionRef: React.RefObject<DialogInteractionType>;
  requestOpen: (
    open: boolean,
    event: Event,
    reason: DialogChangeEventDetails["reason"],
    interaction: DialogInteractionType,
    trigger?: HTMLElement,
  ) => void;
}

const [DialogContext, useDialogContext] = createPartContext<DialogContextValue>("Dialog");

export function Root(props: DialogRootProps) {
  const { children, open: openProp, defaultOpen = false, modal = true, onOpenChange } = props;

  const parent = useDialogContext("Root", true);
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const contentId = `${React.useId()}-dialog`;
  const triggerRef = React.useRef<HTMLElement>(null);
  const previousFocusRef = React.useRef<HTMLElement>(null);
  const backdropRef = React.useRef<HTMLDivElement>(null);
  const openInteractionRef = React.useRef<DialogInteractionType>("");
  const closeInteractionRef = React.useRef<DialogInteractionType>("");
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
    reason: DialogChangeEventDetails["reason"],
    interaction: DialogInteractionType,
    trigger?: HTMLElement,
  ) {
    if (nextOpen === open) {
      return;
    }
    let canceled = false;
    const details: DialogChangeEventDetails = {
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
    <DialogContext
      value={{
        open,
        modal,
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
    </DialogContext>
  );
}

export interface DialogTriggerProps extends PropsWithRender<
  Omit<React.ComponentProps<"button">, "aria-controls" | "aria-expanded" | "aria-haspopup">
> {}

export function Trigger(props: DialogTriggerProps) {
  const { render, ...rest } = props;
  const dialog = useDialogContext("Trigger");
  const pointerType = React.useRef<DialogInteractionType>("mouse");

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
        pointerType.current = event.pointerType as DialogInteractionType;
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

export interface DialogPortalProps extends PropsWithRender<React.ComponentProps<"div">> {
  container?: HTMLElement | null;
}

export function Portal(props: DialogPortalProps) {
  const { container, render, ...rest } = props;
  const dialog = useDialogContext("Portal");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const element = useRender({ defaultTagName: "div", render, props: rest });

  return mounted && dialog.open ? createPortal(element, container ?? document.body) : null;
}

export interface DialogBackdropProps extends PropsWithRender<
  Omit<React.ComponentProps<"div">, "aria-hidden">
> {}

export function Backdrop(props: DialogBackdropProps) {
  const { render, ...rest } = props;
  const dialog = useDialogContext("Backdrop");
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
  return dialog.open && dialog.modal ? element : null;
}

export interface DialogPositionerProps extends PropsWithRender<React.ComponentProps<"div">> {}

export function Positioner(props: DialogPositionerProps) {
  const { render, ...rest } = props;
  const dialog = useDialogContext("Positioner");
  const element = useRender({
    defaultTagName: "div",
    defaultProps: dialog.modal ? {} : { style: { pointerEvents: "none" } },
    render,
    props: rest,
    internalProps: { "data-open": dialog.open ? "" : undefined },
  });
  return dialog.open ? element : null;
}

export interface DialogContentProps extends PropsWithRender<
  Omit<React.ComponentProps<"div">, "id" | "role" | "aria-modal" | "tabIndex">
> {
  initialFocus?: DialogFocusTarget;
  finalFocus?: DialogFocusTarget;
}

export function Content(props: DialogContentProps) {
  const { initialFocus, finalFocus, render, ...rest } = props;
  const dialog = useDialogContext("Content");
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
      modal: dialog.modal,
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
      const active = document.activeElement;
      const restoreDefaultFocus =
        layer.modal || active === document.body || content.contains(active);
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
        restoreFocus(finalTarget, current.dialog.triggerRef.current, restoreDefaultFocus);
      });
    };
  }, [dialog.open, dialog.contentId, dialog.ancestors]);

  React.useLayoutEffect(() => {
    if (dialog.open && contentRef.current) {
      getDialogManager(contentRef.current.ownerDocument).setModal(contentRef.current, dialog.modal);
    }
  }, [dialog.open, dialog.modal]);

  const element = useRender({
    defaultTagName: "div",
    defaultProps: { style: { pointerEvents: "auto" } },
    render,
    props: rest,
    internalProps: {
      ref: contentRef,
      id: dialog.contentId,
      role: "dialog",
      "aria-modal": dialog.modal ? true : undefined,
      tabIndex: -1,
      "data-open": dialog.open ? "" : undefined,
    },
  });
  return dialog.open ? (
    <>
      <span
        ref={beforeGuardRef}
        tabIndex={dialog.modal ? 0 : -1}
        data-dialog-focus-guard=""
        style={visuallyHiddenStyle}
      />
      {element}
      <span
        ref={afterGuardRef}
        tabIndex={dialog.modal ? 0 : -1}
        data-dialog-focus-guard=""
        style={visuallyHiddenStyle}
      />
    </>
  ) : null;
}

export interface DialogTitleProps extends PropsWithRender<React.ComponentProps<"h2">> {}

export function Title(props: DialogTitleProps) {
  const { render, ...rest } = props;
  useDialogContext("Title");
  return useRender({ defaultTagName: "h2", render, props: rest });
}

export interface DialogDescriptionProps extends PropsWithRender<React.ComponentProps<"p">> {}

export function Description(props: DialogDescriptionProps) {
  const { render, ...rest } = props;
  useDialogContext("Description");
  return useRender({ defaultTagName: "p", render, props: rest });
}

export interface DialogHeaderProps extends PropsWithRender<React.ComponentProps<"div">> {}

export function Header(props: DialogHeaderProps) {
  const { render, ...rest } = props;
  useDialogContext("Header");
  return useRender({ defaultTagName: "div", render, props: rest });
}

export interface DialogBodyProps extends PropsWithRender<React.ComponentProps<"div">> {}

export function Body(props: DialogBodyProps) {
  const { render, ...rest } = props;
  useDialogContext("Body");
  return useRender({ defaultTagName: "div", render, props: rest });
}

export interface DialogFooterProps extends PropsWithRender<React.ComponentProps<"div">> {}

export function Footer(props: DialogFooterProps) {
  const { render, ...rest } = props;
  useDialogContext("Footer");
  return useRender({ defaultTagName: "div", render, props: rest });
}

export interface DialogCloseProps extends PropsWithRender<React.ComponentProps<"button">> {}

export function Close(props: DialogCloseProps) {
  const { render, ...rest } = props;
  const dialog = useDialogContext("Close");
  const pointerType = React.useRef<DialogInteractionType>("mouse");
  return useRender({
    defaultTagName: "button",
    render,
    props: render ? rest : { ...rest, type: rest.type ?? "button" },
    internalProps: {
      onPointerDown(event: React.PointerEvent<HTMLButtonElement>) {
        pointerType.current = event.pointerType as DialogInteractionType;
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

"use client";

import * as React from "react";

import {
  createFocusRestoration,
  createPartContext,
  focusElement,
  isElementAvailableForFocus,
  useRender,
  type PropsWithRender,
} from "../core";
import { Portal as BasePortal, type PortalProps } from "../portal";
import {
  Positioner as BasePositioner,
  type PositionerAnchor,
  type PositionerPlacement,
  type PositionerProps,
} from "../positioner";

export interface MenuChangeEventDetails {
  readonly reason:
    | "trigger-press"
    | "context-menu"
    | "keyboard"
    | "trigger-hover"
    | "item-press"
    | "item-focus"
    | "sibling-open"
    | "escape-key"
    | "tab-key"
    | "outside-press"
    | "focus-outside";
  readonly event: Event;
  readonly trigger: HTMLElement | null;
  readonly isCanceled: boolean;
  cancel: () => void;
}

export interface MenuRootProps {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean, details: MenuChangeEventDetails) => void;
}

type MenuRef = React.RefObject<MenuContextValue | null>;
type EntryFocus = "first" | "last" | "none";
interface OpenOptions {
  point?: { x: number; y: number };
  focus?: EntryFocus;
}
interface MenuContextValue {
  parent: MenuContextValue | null;
  selfRef: MenuRef;
  rootRef: MenuRef;
  parentRef: MenuRef | null;
  childrenRef: React.RefObject<Map<string, MenuRef>>;
  open: boolean;
  ready: boolean;
  setReady: React.Dispatch<React.SetStateAction<boolean>>;
  contentId: string;
  triggerId: string | undefined;
  defaultTriggerId: string;
  setTriggerId: React.Dispatch<React.SetStateAction<string | undefined>>;
  triggerKind: React.RefObject<"button" | "context" | "submenu">;
  triggerRef: React.RefObject<HTMLElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  returnFocusRef: React.RefObject<HTMLElement | null>;
  anchorRef: React.RefObject<PositionerAnchor | null>;
  entryFocusRef: React.RefObject<EntryFocus>;
  closeReasonRef: React.RefObject<MenuChangeEventDetails["reason"] | null>;
  ignoreFocusRef: React.RefObject<boolean>;
  ownedIds: string[];
  registerContent: (id: string, content: HTMLElement) => () => void;
  requestOpen: (
    open: boolean,
    event: Event,
    reason: MenuChangeEventDetails["reason"],
    options?: OpenOptions,
  ) => boolean;
}

const [MenuContext, useMenuContext] = createPartContext<MenuContextValue>("Menu");

function createDetails(
  reason: MenuChangeEventDetails["reason"],
  event: Event,
  trigger: HTMLElement | null,
): MenuChangeEventDetails {
  let canceled = false;
  return {
    reason,
    event,
    trigger,
    get isCanceled() {
      return canceled;
    },
    cancel() {
      canceled = true;
    },
  };
}

function getItems(menu: MenuContextValue) {
  return [
    ...(menu.contentRef.current?.querySelectorAll<HTMLElement>("[data-menu-item]") ?? []),
  ].filter((item) => item.dataset.menuItem === menu.contentId && isElementAvailableForFocus(item));
}

function getOpenMenus(menu: MenuContextValue): MenuContextValue[] {
  return [
    menu,
    ...[...menu.childrenRef.current.values()].flatMap((ref) =>
      ref.current?.open ? getOpenMenus(ref.current) : [],
    ),
  ];
}

function contains(menu: MenuContextValue, target: Node | null) {
  return getOpenMenus(menu).some((node) => node.contentRef.current?.contains(target));
}

function focusEntry(menu: MenuContextValue) {
  if (!menu.ready || menu.entryFocusRef.current === "none") return;
  const items = getItems(menu);
  const expandedTrigger = [...menu.childrenRef.current.values()].find((ref) => ref.current?.open)
    ?.current?.triggerRef.current;
  focusElement(
    (expandedTrigger && items.includes(expandedTrigger) ? expandedTrigger : undefined) ??
      (menu.entryFocusRef.current === "last" ? items.at(-1) : items[0]) ??
      menu.contentRef.current,
  );
}

function isComposing(event: React.KeyboardEvent | KeyboardEvent) {
  return (
    ("nativeEvent" in event ? event.nativeEvent.isComposing : event.isComposing) ||
    event.keyCode === 229
  );
}

export function Root(props: MenuRootProps) {
  const { children, open: openProp, defaultOpen = false, onOpenChange } = props;

  const parent = useMenuContext("Root", true);
  const [uncontrolledOpen, setOpen] = React.useState(defaultOpen);
  const [point, setPoint] = React.useState<OpenOptions["point"]>();
  const [ready, setReady] = React.useState(false);
  const [ownedIds, setOwnedIds] = React.useState<string[]>([]);
  const id = React.useId();
  const contentId = `${id}-menu`;
  const defaultTriggerId = `${id}-menu-trigger`;
  const [triggerId, setTriggerId] = React.useState<string | undefined>(defaultTriggerId);
  const selfRef = React.useRef<MenuContextValue>(null);
  const rootRef = parent?.rootRef ?? selfRef;
  const parentRef = parent?.selfRef ?? null;
  const childrenRef = React.useRef(new Map<string, MenuRef>());
  const triggerRef = React.useRef<HTMLElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const returnFocusRef = React.useRef<HTMLElement>(null);
  const triggerKind = React.useRef<"button" | "context" | "submenu">(parent ? "submenu" : "button");
  const entryFocusRef = React.useRef<EntryFocus>("first");
  const closeReasonRef = React.useRef<MenuChangeEventDetails["reason"] | null>(null);
  const ownIgnoreFocus = React.useRef(false);
  const ignoreFocusRef = parent?.ignoreFocusRef ?? ownIgnoreFocus;
  const pendingRequest = React.useRef<boolean | null>(null);
  const open = (openProp ?? uncontrolledOpen) && (parent?.open ?? true);
  const pointRef = React.useMemo<React.RefObject<PositionerAnchor | null>>(
    () => ({
      current: point
        ? {
            get contextElement() {
              return triggerRef.current ?? undefined;
            },
            getBoundingClientRect: () => new DOMRect(point.x, point.y, 0, 0),
          }
        : null,
    }),
    [point],
  );

  React.useLayoutEffect(() => {
    selfRef.current = context;
    pendingRequest.current = null;
  });
  React.useLayoutEffect(() => {
    if (open) closeReasonRef.current = null;
    else {
      setPoint(undefined);
      entryFocusRef.current = "first";
    }
  }, [open]);
  React.useLayoutEffect(() => {
    if (!parent?.childrenRef) return;
    const siblings = parent.childrenRef.current;
    siblings.set(contentId, selfRef);
    return () => {
      siblings.delete(contentId);
    };
  }, [parent?.childrenRef, contentId]);
  React.useEffect(() => {
    if (parent && !parent.open && openProp === undefined) setOpen(false);
  }, [parent?.open, openProp]);

  const registerContent = React.useCallback((childId: string, content: HTMLElement) => {
    if (contentRef.current?.contains(content)) return () => {};
    setOwnedIds((current) => (current.includes(childId) ? current : [...current, childId]));
    return () => setOwnedIds((current) => current.filter((ownedId) => ownedId !== childId));
  }, []);

  function requestOpen(
    nextOpen: boolean,
    event: Event,
    reason: MenuChangeEventDetails["reason"],
    options: OpenOptions = {},
  ) {
    if (nextOpen && parentRef && !parentRef.current?.open) return false;
    if (pendingRequest.current === nextOpen) return true;
    if (nextOpen && parentRef?.current) {
      for (const sibling of parentRef.current.childrenRef.current.values()) {
        if (
          sibling !== selfRef &&
          sibling.current?.open &&
          !sibling.current.requestOpen(false, event, "sibling-open")
        )
          return false;
      }
    }
    if (nextOpen !== open) {
      const details = createDetails(reason, event, triggerRef.current);
      onOpenChange?.(nextOpen, details);
      if (details.isCanceled) return false;
      pendingRequest.current = nextOpen;
      queueMicrotask(() => {
        pendingRequest.current = null;
      });
    }
    if (nextOpen) {
      const active = triggerRef.current?.ownerDocument.activeElement;
      returnFocusRef.current =
        active instanceof HTMLElement && triggerRef.current?.contains(active)
          ? active
          : triggerRef.current;
      closeReasonRef.current = null;
      entryFocusRef.current = options.focus ?? "first";
      setPoint(options.point);
      if (open) focusEntry(context);
    } else closeReasonRef.current = reason;
    if (openProp === undefined) setOpen(nextOpen);
    return true;
  }

  const context: MenuContextValue = {
    parent,
    selfRef,
    rootRef,
    parentRef,
    childrenRef,
    open,
    ready,
    setReady,
    contentId,
    defaultTriggerId,
    triggerId,
    setTriggerId,
    triggerKind,
    triggerRef,
    contentRef,
    returnFocusRef,
    anchorRef: point ? pointRef : triggerRef,
    entryFocusRef,
    closeReasonRef,
    ignoreFocusRef,
    ownedIds,
    registerContent,
    requestOpen,
  };

  React.useEffect(() => {
    if (parentRef || !open) return;
    const document = triggerRef.current?.ownerDocument;
    if (!document) return;
    let pressing = false;
    function handlePointerUp() {
      pressing = false;
    }
    function handleOutside(event: PointerEvent | MouseEvent) {
      const current = selfRef.current!;
      if (event.type === "pointerdown") pressing = true;
      if (contains(current, event.target as Node)) return;
      const onTrigger = current.triggerRef.current?.contains(event.target as Node);
      if (event.type === "contextmenu") {
        if (onTrigger) return;
      } else if (
        event.defaultPrevented ||
        event.button !== 0 ||
        (onTrigger && current.triggerKind.current === "button")
      )
        return;
      current.requestOpen(false, event, "outside-press");
    }
    function handleFocus(event: FocusEvent) {
      const current = selfRef.current!;
      if (!pressing && !current.ignoreFocusRef.current && !contains(current, event.target as Node))
        current.requestOpen(false, event, "focus-outside");
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.defaultPrevented || isComposing(event) || event.key !== "Escape") return;
      const current = selfRef.current!;
      const owner =
        getOpenMenus(current)
          .toReversed()
          .find((menu) => menu.contentRef.current?.contains(event.target as Node)) ?? current;
      event.preventDefault();
      event.stopPropagation();
      owner.requestOpen(false, event, "escape-key");
    }
    document.addEventListener("pointerdown", handleOutside);
    document.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("pointercancel", handlePointerUp);
    document.addEventListener("contextmenu", handleOutside);
    document.addEventListener("focusin", handleFocus);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("pointerdown", handleOutside);
      document.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("pointercancel", handlePointerUp);
      document.removeEventListener("contextmenu", handleOutside);
      document.removeEventListener("focusin", handleFocus);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, parentRef]);

  return <MenuContext value={context}>{children}</MenuContext>;
}

function useTriggerId(
  menu: MenuContextValue,
  props: { id?: string | undefined; render?: React.ReactElement | undefined },
) {
  const id = props.id ?? (props.render?.props as { id?: string })?.id ?? menu.defaultTriggerId;

  React.useLayoutEffect(() => {
    menu.setTriggerId(id);
    return () => menu.setTriggerId(undefined);
  }, [id, menu.setTriggerId]);

  return id;
}

export interface MenuTriggerProps extends PropsWithRender<
  Omit<React.ComponentProps<"button">, "aria-haspopup" | "aria-expanded" | "aria-controls">
> {}
export function Trigger(props: MenuTriggerProps) {
  const { render, ...rest } = props;

  const menu = useMenuContext("Trigger");
  const id = useTriggerId(menu, props);
  React.useLayoutEffect(() => {
    menu.triggerKind.current = "button";
  }, [menu.triggerKind]);

  return useRender({
    defaultTagName: "button",
    render,
    props: render ? rest : { ...rest, type: rest.type ?? "button" },
    internalProps: {
      id,
      ref: menu.triggerRef,
      "aria-haspopup": "menu",
      "aria-expanded": menu.open,
      "aria-controls": menu.open ? menu.contentId : undefined,
      "data-open": menu.open ? "" : undefined,
      onClick(event: React.MouseEvent<HTMLElement>) {
        if (!event.defaultPrevented && !rest.disabled && !event.currentTarget.matches(":disabled"))
          menu.requestOpen(!menu.open, event.nativeEvent, "trigger-press");
      },
      onKeyDown(event: React.KeyboardEvent<HTMLElement>) {
        if (
          event.defaultPrevented ||
          rest.disabled ||
          event.currentTarget.matches(":disabled") ||
          isComposing(event) ||
          event.altKey ||
          event.ctrlKey ||
          event.metaKey ||
          event.shiftKey
        )
          return;
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
          event.preventDefault();
          menu.requestOpen(true, event.nativeEvent, "keyboard", {
            focus: event.key === "ArrowUp" ? "last" : "first",
          });
        } else if (
          (event.key === "Enter" || event.key === " ") &&
          !(event.currentTarget instanceof HTMLButtonElement)
        ) {
          event.preventDefault();
          event.currentTarget.click();
        }
      },
    },
  });
}

export interface MenuContextTriggerProps extends PropsWithRender<
  Omit<React.ComponentProps<"div">, "aria-haspopup" | "aria-controls">
> {
  disabled?: boolean;
}
export function ContextTrigger(props: MenuContextTriggerProps) {
  const { disabled = false, render, ...rest } = props;

  const menu = useMenuContext("ContextTrigger");
  const id = useTriggerId(menu, props);

  React.useLayoutEffect(() => {
    menu.triggerKind.current = "context";
  }, [menu.triggerKind]);

  return useRender({
    defaultTagName: "div",
    render,
    props: rest,
    defaultProps: { tabIndex: 0 },
    internalProps: {
      id,
      ref: menu.triggerRef,
      "aria-haspopup": disabled ? undefined : "menu",
      "aria-controls": menu.open ? menu.contentId : undefined,
      "data-open": menu.open ? "" : undefined,
      "data-disabled": disabled ? "" : undefined,
      onContextMenu(event: React.MouseEvent<HTMLDivElement>) {
        if (event.defaultPrevented || disabled || event.currentTarget.matches(":disabled")) return;
        event.preventDefault();
        menu.requestOpen(true, event.nativeEvent, "context-menu", {
          point: { x: event.clientX, y: event.clientY },
        });
      },
      onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
        if (
          event.defaultPrevented ||
          disabled ||
          event.currentTarget.matches(":disabled") ||
          isComposing(event) ||
          event.altKey ||
          event.ctrlKey ||
          event.metaKey
        )
          return;
        if (event.key !== "ContextMenu" && !(event.key === "F10" && event.shiftKey)) return;
        event.preventDefault();
        const target = event.target instanceof HTMLElement ? event.target : event.currentTarget;
        const rect = target.getBoundingClientRect();
        menu.requestOpen(true, event.nativeEvent, "keyboard", {
          point: {
            x: getComputedStyle(target).direction === "rtl" ? rect.right : rect.left,
            y: rect.bottom,
          },
        });
      },
    },
  });
}

export interface MenuPortalProps extends PortalProps {}
export function Portal(props: MenuPortalProps) {
  return useMenuContext("Portal").open ? <BasePortal {...props} /> : null;
}

export interface MenuPositionerProps extends Omit<
  PositionerProps,
  "open" | "anchorRef" | "arrowElement" | "onPlacementChange"
> {}
export function Positioner(props: MenuPositionerProps) {
  const menu = useMenuContext("Positioner");
  const rtl = menu.triggerRef.current
    ? getComputedStyle(menu.triggerRef.current).direction === "rtl"
    : false;
  const {
    side = menu.parentRef ? (rtl ? "left" : "right") : "bottom",
    align = "start",
    sideOffset = 0,
    collisionPadding = 8,
    ...rest
  } = props;

  const handlePlacementChange = React.useCallback(
    (placement: PositionerPlacement | null) => menu.setReady(placement !== null),
    [menu.setReady],
  );
  return (
    <BasePositioner
      {...rest}
      open={menu.open && (menu.parent?.ready ?? true)}
      anchorRef={menu.anchorRef}
      side={side}
      align={align}
      sideOffset={sideOffset}
      collisionPadding={collisionPadding}
      onPlacementChange={handlePlacementChange}
    />
  );
}

export interface MenuContentProps extends PropsWithRender<
  Omit<
    React.ComponentProps<"div">,
    "id" | "role" | "tabIndex" | "aria-orientation" | "aria-activedescendant" | "aria-owns"
  >
> {}
export function Content(props: MenuContentProps) {
  const { render, ...rest } = props;
  const menu = useMenuContext("Content");
  const search = React.useRef("");
  const searchTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  React.useLayoutEffect(() => {
    const content = menu.contentRef.current;
    if (!menu.open || !menu.ready || !content) return;
    const document = content.ownerDocument;
    const restoreFocus = createFocusRestoration(content);
    const unregister = menu.parentRef?.current?.registerContent(menu.contentId, content);
    let lastFocused: HTMLElement | null = null;
    function rememberFocus(event: FocusEvent) {
      lastFocused = event.target as HTMLElement;
    }
    content.addEventListener("focusin", rememberFocus);
    focusEntry(menu);
    function syncFocus() {
      const current = menu.selfRef.current!;
      const active = document.activeElement;
      if (
        (active === content && current.entryFocusRef.current !== "none") ||
        (lastFocused &&
          !isElementAvailableForFocus(lastFocused) &&
          (active === document.body || content!.contains(active)))
      )
        focusElement(getItems(current)[0] ?? content);
    }
    const observer = new MutationObserver(syncFocus);
    observer.observe(content, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["hidden", "disabled", "inert", "style", "class"],
    });
    return () => {
      observer.disconnect();
      unregister?.();
      content.removeEventListener("focusin", rememberFocus);
      clearTimeout(searchTimer.current);
      search.current = "";
      queueMicrotask(() => {
        if (content.isConnected) return;
        const current = menu.selfRef.current!;
        if (
          (current.parentRef && !current.parentRef.current?.open) ||
          ["outside-press", "focus-outside", "tab-key", "sibling-open", "item-focus"].includes(
            current.closeReasonRef.current ?? "",
          )
        )
          return;
        const active = document.activeElement;
        restoreFocus(
          true,
          current.returnFocusRef.current ?? current.triggerRef.current,
          active === document.body || active === null || content.contains(active),
        );
      });
    };
  }, [menu.open, menu.ready, menu.contentId, menu.parentRef]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (
      event.defaultPrevented ||
      isComposing(event) ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      (event.target as Element).closest("[data-menu-content]") !== event.currentTarget
    )
      return;
    if (event.key === "Tab") {
      const root = menu.rootRef.current!;
      if (!root.requestOpen(false, event.nativeEvent, "tab-key")) {
        event.preventDefault();
        return;
      }
      menu.ignoreFocusRef.current = true;
      focusElement(root.returnFocusRef.current ?? root.triggerRef.current);
      menu.ignoreFocusRef.current = false;
      return;
    }
    const rtl = getComputedStyle(event.currentTarget).direction === "rtl";
    if (menu.parentRef && event.key === (rtl ? "ArrowRight" : "ArrowLeft")) {
      event.preventDefault();
      event.stopPropagation();
      menu.requestOpen(false, event.nativeEvent, "keyboard");
      return;
    }
    const items = getItems(menu);
    const index = items.indexOf(event.currentTarget.ownerDocument.activeElement as HTMLElement);
    let next: HTMLElement | undefined;
    if (event.key === "Home") next = items[0];
    else if (event.key === "End") next = items.at(-1);
    else if (event.key === "ArrowDown") next = items[(index + 1) % items.length];
    else if (event.key === "ArrowUp") next = items[index <= 0 ? items.length - 1 : index - 1];
    else if (event.key.length === 1 && event.key !== " ") {
      clearTimeout(searchTimer.current);
      search.current += event.key.toLocaleLowerCase();
      const query = [...search.current].every((character) => character === search.current[0])
        ? search.current[0]!
        : search.current;
      const start = query.length === 1 ? index + 1 : Math.max(index, 0);
      next = Array.from(
        { length: items.length },
        (_, offset) => items[(start + offset) % items.length]!,
      ).find((item) =>
        (item.dataset.textValue ?? item.getAttribute("aria-label") ?? item.textContent ?? "")
          .trim()
          .toLocaleLowerCase()
          .startsWith(query),
      );
      searchTimer.current = setTimeout(() => {
        search.current = "";
      }, 500);
    } else return;
    event.preventDefault();
    focusElement(next);
  }

  const element = useRender({
    defaultTagName: "div",
    render,
    props: rest,
    defaultProps: {
      style: { pointerEvents: "auto" },
      "aria-labelledby":
        rest["aria-label"] || (render?.props as React.ComponentProps<"div">)?.["aria-label"]
          ? undefined
          : menu.triggerId,
    },
    internalProps: {
      ref: menu.contentRef,
      id: menu.contentId,
      role: "menu",
      tabIndex: -1,
      "aria-owns": menu.ownedIds.join(" ") || undefined,
      "data-menu-content": "",
      "data-open": menu.open ? "" : undefined,
      onKeyDown: handleKeyDown,
      onFocusCapture(event: React.FocusEvent<HTMLDivElement>) {
        if (event.defaultPrevented) return;
        const target = event.target as HTMLElement;
        if (target.closest("[data-menu-content]") !== event.currentTarget) return;
        for (const child of menu.childrenRef.current.values()) {
          if (
            child.current?.open &&
            child.current.triggerRef.current !== target &&
            !contains(child.current, target)
          )
            child.current.requestOpen(false, event.nativeEvent, "item-focus");
        }
      },
      onContextMenu(event: React.MouseEvent<HTMLDivElement>) {
        if (!event.defaultPrevented) event.preventDefault();
      },
    },
  });
  return menu.open ? element : null;
}

export interface MenuItemProps extends PropsWithRender<
  Omit<React.ComponentProps<"button">, "role" | "tabIndex" | "onSelect" | "aria-disabled">
> {
  onSelect?: (details: MenuChangeEventDetails) => void;
  textValue?: string;
}
export function Item(props: MenuItemProps) {
  const { disabled = false, onSelect, textValue, render, ...rest } = props;
  const menu = useMenuContext("Item");
  const [highlighted, setHighlighted] = React.useState(false);

  return useRender({
    defaultTagName: "button",
    render,
    props: render ? rest : { ...rest, type: rest.type ?? "button" },
    internalProps: {
      role: "menuitem",
      tabIndex: -1,
      disabled: false,
      "aria-disabled": disabled ? true : undefined,
      "data-menu-item": menu.contentId,
      "data-text-value": textValue,
      "data-highlighted": highlighted ? "" : undefined,
      "data-disabled": disabled ? "" : undefined,
      onFocus() {
        setHighlighted(true);
      },
      onBlur() {
        setHighlighted(false);
      },
      onPointerMove(event: React.PointerEvent<HTMLElement>) {
        if (!event.defaultPrevented && event.pointerType !== "touch")
          focusElement(event.currentTarget);
      },
      onKeyDown(event: React.KeyboardEvent<HTMLElement>) {
        if (
          event.defaultPrevented ||
          isComposing(event) ||
          event.altKey ||
          event.ctrlKey ||
          event.metaKey ||
          event.shiftKey
        )
          return;
        if (
          (event.key === "Enter" || event.key === " ") &&
          !(event.currentTarget instanceof HTMLButtonElement)
        ) {
          event.preventDefault();
          event.currentTarget.click();
        }
      },
      onClick(event: React.MouseEvent<HTMLElement>) {
        if (disabled || event.currentTarget.matches(":disabled")) {
          event.preventDefault();
          return;
        }
        if (event.defaultPrevented || event.button !== 0) return;
        const details = createDetails("item-press", event.nativeEvent, menu.triggerRef.current);
        onSelect?.(details);
        if (details.isCanceled) {
          event.preventDefault();
          return;
        }
        menu.rootRef.current!.requestOpen(false, event.nativeEvent, "item-press");
      },
    },
  });
}

export interface MenuTriggerItemProps extends Omit<
  MenuItemProps,
  "onSelect" | "aria-haspopup" | "aria-controls" | "aria-expanded"
> {}
export function TriggerItem(props: MenuTriggerItemProps) {
  const { disabled = false, render, ...rest } = props;

  const menu = useMenuContext("TriggerItem");
  const parent = menu.parent;
  const id = useTriggerId(menu, props);

  const element = useRender({
    defaultTagName: "button",
    render,
    props: render ? rest : { ...rest, type: rest.type ?? "button" },
    internalProps: {
      id,
      ref: menu.triggerRef,
      "aria-haspopup": "menu",
      "aria-expanded": menu.open,
      "aria-controls": menu.open ? menu.contentId : undefined,
      "data-open": menu.open ? "" : undefined,
      onPointerMove(event: React.PointerEvent<HTMLElement>) {
        if (event.defaultPrevented || event.pointerType === "touch" || disabled) return;
        focusElement(event.currentTarget);
        menu.requestOpen(true, event.nativeEvent, "trigger-hover", { focus: "none" });
      },
      onKeyDown(event: React.KeyboardEvent<HTMLElement>) {
        if (
          event.defaultPrevented ||
          disabled ||
          isComposing(event) ||
          event.altKey ||
          event.ctrlKey ||
          event.metaKey ||
          event.shiftKey
        )
          return;
        if (
          event.key ===
          (getComputedStyle(event.currentTarget).direction === "rtl" ? "ArrowLeft" : "ArrowRight")
        ) {
          event.preventDefault();
          event.stopPropagation();
          menu.requestOpen(true, event.nativeEvent, "keyboard");
        }
      },
      onClick(event: React.MouseEvent<HTMLElement>) {
        if (event.defaultPrevented || disabled || event.currentTarget.matches(":disabled")) return;
        event.preventDefault();
        menu.requestOpen(true, event.nativeEvent, "trigger-press");
      },
    },
  });

  if (!parent) {
    throw new Error("Menu.TriggerItem requires a Menu.Root nested inside another Menu.Root.");
  }

  return (
    <MenuContext value={parent}>
      <Item disabled={disabled} render={element} />
    </MenuContext>
  );
}

export interface MenuSeparatorProps extends PropsWithRender<
  Omit<React.ComponentProps<"hr">, "role" | "tabIndex" | "aria-orientation">
> {}
export function Separator(props: MenuSeparatorProps) {
  const { render, ...rest } = props;

  useMenuContext("Separator");

  return useRender({
    defaultTagName: "hr",
    render,
    props: rest,
    internalProps: { role: "separator", tabIndex: undefined },
  });
}

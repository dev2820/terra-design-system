import { focusElement, isElementAvailableForFocus } from "../core";
import type { PopoverFocusTarget, PopoverInteractionType } from "./popover";

export interface PopoverLayer {
  id: string;
  ancestors: string[];
  content: HTMLElement;
  trigger: () => HTMLElement | null;
  dismiss: (
    event: Event,
    reason: "escape-key" | "outside-press" | "focus-outside",
    interaction: PopoverInteractionType,
  ) => void;
}

const focusableSelector =
  'a[href], area[href], button, input, select, textarea, iframe, summary, [tabindex], [contenteditable]:not([contenteditable="false"]), audio[controls], video[controls]';

function getTabbableElements(content: HTMLElement) {
  const candidates = [...content.querySelectorAll<HTMLElement>(focusableSelector)].filter(
    (element) => getTabIndex(element) >= 0 && isElementAvailableForFocus(element),
  );

  return candidates
    .filter((element) => {
      if (!element.matches('input[type="radio"]')) return true;
      const radio = element as HTMLInputElement;
      if (!radio.name) return true;
      const group = candidates.filter(
        (candidate): candidate is HTMLInputElement =>
          candidate.matches('input[type="radio"]') &&
          (candidate as HTMLInputElement).name === radio.name &&
          (candidate as HTMLInputElement).form === radio.form,
      );
      return radio === (group.find((candidate) => candidate.checked) ?? group[0]);
    })
    .toSorted((first, second) => {
      const firstOrder = getTabIndex(first) || Infinity;
      const secondOrder = getTabIndex(second) || Infinity;
      return firstOrder === secondOrder
        ? first.compareDocumentPosition(second) & Node.DOCUMENT_POSITION_FOLLOWING
          ? -1
          : 1
        : firstOrder - secondOrder;
    });
}

function getTabIndex(element: HTMLElement) {
  if (
    !element.hasAttribute("tabindex") &&
    ((element.isContentEditable && !element.parentElement?.isContentEditable) ||
      element.matches("audio[controls], video[controls]"))
  )
    return 0;
  return element.tabIndex;
}

export function resolveFocusTarget(
  target: PopoverFocusTarget | undefined,
  interaction: PopoverInteractionType,
) {
  if (typeof target === "function") return target(interaction);
  if (target && typeof target === "object") return target.current;
  return target ?? true;
}

export function focusInitialElement(layer: PopoverLayer, interaction: PopoverInteractionType) {
  const { content } = layer;
  const active = content.ownerDocument.activeElement;
  if (
    active instanceof HTMLElement &&
    content.contains(active) &&
    isElementAvailableForFocus(active)
  )
    return;
  if (focusElement(content.querySelector<HTMLElement>("[autofocus]"))) return;
  const first = interaction === "touch" ? content : getTabbableElements(content)[0];
  if (!focusElement(first)) focusElement(content);
}

interface PointerStart {
  layer: PopoverLayer;
  id: number;
  x: number;
  y: number;
  interaction: PopoverInteractionType;
  released: boolean;
}

const managers = new WeakMap<Document, ReturnType<typeof createManager>>();

function isScrollbarPress(event: PointerEvent) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return false;
  const rect = target.getBoundingClientRect();
  const style = getComputedStyle(target);
  const verticalScrollbar =
    target.offsetWidth -
    target.clientWidth -
    parseFloat(style.borderLeftWidth) -
    parseFloat(style.borderRightWidth);
  const horizontalScrollbar =
    target.offsetHeight -
    target.clientHeight -
    parseFloat(style.borderTopWidth) -
    parseFloat(style.borderBottomWidth);
  return (
    (verticalScrollbar > 0 &&
      (event.clientX < rect.left + target.clientLeft ||
        event.clientX >= rect.left + target.clientLeft + target.clientWidth)) ||
    (horizontalScrollbar > 0 && event.clientY >= rect.top + target.clientTop + target.clientHeight)
  );
}

function createManager(document: Document) {
  const layers: PopoverLayer[] = [];
  let pointerStart: PointerStart | null = null;

  function handleFocus(event: FocusEvent) {
    const layer = layers.at(-1);
    if (
      layer &&
      !pointerStart &&
      event.target instanceof HTMLElement &&
      !layer.content.contains(event.target)
    ) {
      layer.dismiss(event, "focus-outside", "keyboard");
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    const layer = layers.at(-1);
    if (layer && !event.defaultPrevented && !event.isComposing && event.key === "Escape") {
      event.preventDefault();
      layer.dismiss(event, "escape-key", "keyboard");
    }
  }

  function handlePointerDown(event: PointerEvent) {
    const layer = layers.at(-1);
    pointerStart = null;
    if (
      !layer ||
      event.defaultPrevented ||
      event.button !== 0 ||
      !event.isPrimary ||
      event.composedPath().includes(layer.content) ||
      isScrollbarPress(event)
    )
      return;
    pointerStart = {
      layer,
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      interaction: event.pointerType as PopoverInteractionType,
      released: false,
    };
  }

  function handlePointerUp(event: PointerEvent) {
    if (!pointerStart) return;
    pointerStart.released =
      !event.defaultPrevented &&
      event.pointerId === pointerStart.id &&
      !event.composedPath().includes(pointerStart.layer.content) &&
      Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y) <= 10;
  }

  function handleClick(event: MouseEvent) {
    const start = pointerStart;
    pointerStart = null;
    const trigger = start?.layer.trigger();
    if (
      start?.released &&
      start.layer === layers.at(-1) &&
      !event.defaultPrevented &&
      !event.composedPath().includes(start.layer.content) &&
      !(trigger && event.composedPath().includes(trigger))
    ) {
      start.layer.dismiss(event, "outside-press", start.interaction);
    }
  }

  function handlePointerCancel() {
    pointerStart = null;
  }

  function listen() {
    document.addEventListener("focusin", handleFocus);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("pointercancel", handlePointerCancel);
    document.addEventListener("click", handleClick);
  }

  function unlisten() {
    document.removeEventListener("focusin", handleFocus);
    document.removeEventListener("keydown", handleKeyDown);
    document.removeEventListener("pointerdown", handlePointerDown);
    document.removeEventListener("pointerup", handlePointerUp);
    document.removeEventListener("pointercancel", handlePointerCancel);
    document.removeEventListener("click", handleClick);
    pointerStart = null;
  }

  return {
    add(layer: PopoverLayer) {
      if (layers.length === 0) listen();
      // A nested Content's layout effect can run before its parent's effect.
      const descendantIndex = layers.findIndex((item) => item.ancestors.includes(layer.id));
      layers.splice(descendantIndex < 0 ? layers.length : descendantIndex, 0, layer);
      return () => {
        layers.splice(layers.indexOf(layer), 1);
        if (layers.length === 0) unlisten();
      };
    },
    isTop(layer: PopoverLayer) {
      return layers.at(-1) === layer;
    },
  };
}

export function getPopoverManager(document: Document) {
  let manager = managers.get(document);
  if (!manager) {
    manager = createManager(document);
    managers.set(document, manager);
  }
  return manager;
}

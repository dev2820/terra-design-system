import { focusElement, isElementAvailableForFocus, removeScroll } from "../core";
import type { DialogFocusTarget, DialogInteractionType } from "./dialog";

export interface DialogLayer {
  id: string;
  ancestors: string[];
  modal: boolean;
  content: HTMLElement;
  beforeGuard: HTMLElement | null;
  afterGuard: HTMLElement | null;
  backdrop: () => HTMLElement | null;
  dismiss: (
    event: Event,
    reason: "escape-key" | "outside-press",
    interaction: DialogInteractionType,
  ) => void;
}

const focusableSelector =
  'a[href], area[href], button, input, select, textarea, iframe, summary, [tabindex], [contenteditable]:not([contenteditable="false"]), audio[controls], video[controls]';

function getTabbableElements(contents: readonly HTMLElement[]) {
  const candidates = [
    ...new Set(
      contents.flatMap((content) => [...content.querySelectorAll<HTMLElement>(focusableSelector)]),
    ),
  ].filter(
    (element) =>
      !element.hasAttribute("data-dialog-focus-guard") &&
      getTabIndex(element) >= 0 &&
      isElementAvailableForFocus(element),
  );

  return candidates
    .filter((element) => {
      if (!element.matches('input[type="radio"]')) {
        return true;
      }

      const radio = element as HTMLInputElement;
      if (!radio.name) {
        return true;
      }

      const group = candidates.filter(
        (candidate): candidate is HTMLInputElement =>
          candidate.matches('input[type="radio"]') &&
          (candidate as HTMLInputElement).name === radio.name &&
          (candidate as HTMLInputElement).form === radio.form,
      );
      return radio === (group.find((candidate) => candidate.checked) ?? group[0]);
    })
    .toSorted((first, second) => {
      if (first === second) {
        return 0;
      }
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
  ) {
    return 0;
  }
  return element.tabIndex;
}

export function resolveFocusTarget(
  target: DialogFocusTarget | undefined,
  interaction: DialogInteractionType,
) {
  if (typeof target === "function") {
    return target(interaction);
  }
  if (target && typeof target === "object") {
    return target.current;
  }
  return target ?? true;
}

export function focusInitialElement(layer: DialogLayer, interaction: DialogInteractionType) {
  const { content } = layer;
  const active = content.ownerDocument.activeElement;
  // React's autoFocus runs during mount, before the Dialog layout effect.
  if (
    active instanceof HTMLElement &&
    content.contains(active) &&
    isElementAvailableForFocus(active)
  ) {
    return;
  }

  const autoFocus = content.querySelector<HTMLElement>("[autofocus]");
  if (focusElement(autoFocus)) {
    return;
  }
  const first = interaction === "touch" ? content : getTabbableElements([content])[0];
  if (!focusElement(first)) {
    focusElement(content);
  }
}

interface LayerEntry {
  layer: DialogLayer;
  lastFocused: HTMLElement | null;
  hasFocused: boolean;
}

interface PointerStart {
  layer: DialogLayer;
  id: number;
  x: number;
  y: number;
  interaction: DialogInteractionType;
  released: boolean;
}

const managers = new WeakMap<Document, ReturnType<typeof createManager>>();

function isScrollbarPress(event: PointerEvent) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return false;
  }
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
  const layers: LayerEntry[] = [];
  const inertElements = new Map<HTMLElement, boolean>();
  let pointerStart: PointerStart | null = null;
  let restoringFocus = false;
  let tabOrigin: Element | null = null;
  let tabBackward = false;
  let unlockScroll: (() => void) | undefined;

  function top() {
    const modal = topModal();
    return modal
      ? layers.findLast(
          (entry) => entry === modal || entry.layer.ancestors.includes(modal.layer.id),
        )
      : layers.at(-1);
  }

  function topModal() {
    return layers.findLast((entry) => entry.layer.modal);
  }

  function modalScope() {
    const modal = topModal();
    return modal
      ? layers.filter((entry) => entry === modal || entry.layer.ancestors.includes(modal.layer.id))
      : [];
  }

  function updateGuard() {
    const scope = modalScope();
    const first = getTabbableElements(scope.map((entry) => entry.layer.content))[0];
    const tabIndex = first ? getTabIndex(first) : 0;
    for (const entry of layers) {
      const active = scope.includes(entry);
      const { beforeGuard, afterGuard } = entry.layer;
      // Non-modal descendants share their parent's modal focus boundary.
      if (beforeGuard && beforeGuard.tabIndex !== (active ? tabIndex : -1)) {
        beforeGuard.tabIndex = active ? tabIndex : -1;
      }
      if (afterGuard && afterGuard.tabIndex !== (active ? 0 : -1)) {
        afterGuard.tabIndex = active ? 0 : -1;
      }
    }
  }

  function restoreInert() {
    for (const [element, inert] of inertElements) {
      element.inert = inert;
    }
    inertElements.clear();
  }

  function updateInert() {
    restoreInert();
    const scope = modalScope();
    if (scope.length === 0) {
      return;
    }

    const allowed = scope
      .flatMap(({ layer }) => [
        layer.content,
        layer.beforeGuard,
        layer.afterGuard,
        layer.backdrop(),
      ])
      .filter((element): element is HTMLElement => element !== null);

    function visit(parent: Element) {
      for (const child of parent.children) {
        if (!(child instanceof HTMLElement) || allowed.includes(child)) {
          continue;
        }
        if (allowed.some((element) => child.contains(element))) {
          visit(child);
        } else {
          inertElements.set(child, child.inert);
          child.inert = true;
        }
      }
    }

    visit(document.body);
  }

  function recoverFocus() {
    const entry = topModal();
    if (!entry || !entry.hasFocused || restoringFocus) {
      return;
    }
    const active = document.activeElement;
    if (
      active instanceof HTMLElement &&
      modalScope().some((item) => item.layer.content.contains(active)) &&
      isElementAvailableForFocus(active)
    ) {
      return;
    }

    restoringFocus = true;
    if (!focusElement(entry.lastFocused)) {
      focusInitialElement(entry.layer, "");
    }
    restoringFocus = false;
  }

  function handleFocus(event: FocusEvent) {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    for (const item of layers) {
      if (item.layer.content.contains(target)) {
        item.lastFocused = target;
        item.hasFocused = true;
      }
    }
    const entry = topModal();
    if (!entry) {
      return;
    }
    const scope = modalScope();
    const guard = scope.find(
      (item) => target === item.layer.beforeGuard || target === item.layer.afterGuard,
    );
    if (guard) {
      const items = getTabbableElements(scope.map((item) => item.layer.content));
      const index = items.indexOf(tabOrigin as HTMLElement);
      const next =
        index >= 0
          ? items[(index + (tabBackward ? -1 : 1) + items.length) % items.length]
          : target === guard.layer.beforeGuard
            ? items.at(-1)
            : items[0];
      focusElement(next ?? entry.layer.content, false);
    } else if (scope.some((item) => item.layer.content.contains(target))) {
      entry.lastFocused = target;
      entry.hasFocused = true;
    } else {
      recoverFocus();
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    const entry = top();
    if (!entry || event.defaultPrevented || event.isComposing) {
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      entry.layer.dismiss(event, "escape-key", "keyboard");
    } else if (
      event.key === "Tab" &&
      topModal() &&
      !event.altKey &&
      !event.ctrlKey &&
      !event.metaKey
    ) {
      const modal = topModal()!;
      const scope = modalScope();
      tabOrigin = document.activeElement;
      tabBackward = event.shiftKey;
      // Keep native Tab behavior, including date-input fields and media controls.
      // The two guards redirect focus only when it leaves the Content.
      if (!scope.some((item) => item.layer.content.contains(tabOrigin))) {
        const items = getTabbableElements(scope.map((item) => item.layer.content));
        event.preventDefault();
        focusElement((event.shiftKey ? items.at(-1) : items[0]) ?? modal.layer.content, false);
      }
    }
  }

  function handlePointerDown(event: PointerEvent) {
    const layer = top()?.layer;
    pointerStart = null;
    tabOrigin = null;
    if (
      !layer ||
      event.defaultPrevented ||
      event.button !== 0 ||
      !event.isPrimary ||
      event.composedPath().includes(layer.content) ||
      isScrollbarPress(event)
    ) {
      return;
    }
    pointerStart = {
      layer,
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      interaction: event.pointerType as DialogInteractionType,
      released: false,
    };
  }

  function handlePointerUp(event: PointerEvent) {
    if (!pointerStart) {
      return;
    }
    pointerStart.released =
      !event.defaultPrevented &&
      event.pointerId === pointerStart.id &&
      !event.composedPath().includes(pointerStart.layer.content) &&
      Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y) <= 10;
  }

  function handleClick(event: MouseEvent) {
    const start = pointerStart;
    pointerStart = null;
    if (
      start?.released &&
      start.layer === top()?.layer &&
      !event.defaultPrevented &&
      !event.composedPath().includes(start.layer.content)
    ) {
      start.layer.dismiss(event, "outside-press", start.interaction);
    }
  }

  function handlePointerCancel() {
    pointerStart = null;
  }

  const observer = new MutationObserver((records) => {
    if (records.some((record) => record.type === "childList")) {
      updateInert();
    }
    updateGuard();
    recoverFocus();
  });

  function listen() {
    document.addEventListener("focusin", handleFocus);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("pointercancel", handlePointerCancel);
    document.addEventListener("click", handleClick);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["disabled", "hidden", "inert", "style", "class", "tabindex", "open"],
    });
  }

  function unlisten() {
    document.removeEventListener("focusin", handleFocus);
    document.removeEventListener("keydown", handleKeyDown);
    document.removeEventListener("pointerdown", handlePointerDown);
    document.removeEventListener("pointerup", handlePointerUp);
    document.removeEventListener("pointercancel", handlePointerCancel);
    document.removeEventListener("click", handleClick);
    observer.disconnect();
    pointerStart = null;
  }

  function update() {
    updateInert();
    updateGuard();
    if (topModal()) {
      unlockScroll ??= removeScroll(document);
    } else {
      unlockScroll?.();
      unlockScroll = undefined;
    }
    recoverFocus();
  }

  return {
    setModal(content: HTMLElement, modal: boolean) {
      const entry = layers.find((item) => item.layer.content === content);
      if (entry && entry.layer.modal !== modal) {
        entry.layer.modal = modal;
        update();
      }
    },
    add(layer: DialogLayer) {
      if (layers.length === 0) {
        listen();
      }
      const active = document.activeElement;
      const lastFocused =
        active instanceof HTMLElement && layer.content.contains(active) ? active : null;
      const entry = { layer, lastFocused, hasFocused: lastFocused !== null };
      // A nested Content's layout effect can run before its parent's effect.
      const descendantIndex = layers.findIndex((item) => item.layer.ancestors.includes(layer.id));
      layers.splice(descendantIndex < 0 ? layers.length : descendantIndex, 0, entry);
      update();

      return () => {
        layers.splice(layers.indexOf(entry), 1);
        update();
        if (layers.length === 0) {
          unlisten();
        }
      };
    },
    isTop(layer: DialogLayer) {
      return top()?.layer === layer;
    },
  };
}

export function getDialogManager(document: Document) {
  let manager = managers.get(document);
  if (!manager) {
    manager = createManager(document);
    managers.set(document, manager);
  }
  return manager;
}

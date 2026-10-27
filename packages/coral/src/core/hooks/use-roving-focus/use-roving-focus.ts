"use client";

import * as React from "react";

interface UseRovingFocusOptions {
  rootSelector: string;
  itemSelector: string;
  selectedSelector: string;
  selectedAttribute: string;
  orientation: "horizontal" | "vertical";
  loopFocus: boolean;
  entryFocus?: "last-focused" | "selected";
}

function isFocusable(item: HTMLElement) {
  return (
    !item.matches(":disabled") &&
    !item.closest("[inert]") &&
    item.checkVisibility({ visibilityProperty: true })
  );
}

export function useRovingFocus(options: UseRovingFocusOptions) {
  const {
    rootSelector,
    itemSelector,
    selectedSelector,
    selectedAttribute,
    orientation,
    loopFocus,
    entryFocus = "last-focused",
  } = options;
  const ref = React.useRef<HTMLDivElement | null>(null);
  const lastFocused = React.useRef<HTMLElement | null>(null);
  const focusWithin = React.useRef(false);

  function getItems(root: HTMLElement) {
    return Array.from(root.querySelectorAll<HTMLElement>(itemSelector)).filter(
      (item) => item.closest(rootSelector) === root,
    );
  }

  function syncTabStop() {
    const root = ref.current;

    if (!root) {
      return;
    }

    const items = getItems(root);
    const enabled = items.filter(isFocusable);
    const active = root.ownerDocument.activeElement;

    if (enabled.includes(active as HTMLElement)) {
      lastFocused.current = active as HTMLElement;
      focusWithin.current = true;
    }

    const previous = lastFocused.current;
    const entry =
      ((entryFocus === "last-focused" || focusWithin.current) &&
      previous &&
      enabled.includes(previous)
        ? previous
        : undefined) ??
      enabled.find((item) => item.matches(selectedSelector)) ??
      enabled[0];

    for (const item of items) {
      item.tabIndex = item === entry ? 0 : -1;
    }

    if (!entry) {
      focusWithin.current = false;
    } else if (
      focusWithin.current &&
      !enabled.includes(active as HTMLElement) &&
      (active === root.ownerDocument.body || active === previous)
    ) {
      entry.focus();
    }
  }

  React.useLayoutEffect(() => {
    syncTabStop();

    const root = ref.current;

    if (!root) {
      return undefined;
    }

    // Descendants can mount, reorder or become disabled without rerendering Root.
    // Observe availability changes, but not the tabindex writes made above.
    const observer = new MutationObserver(syncTabStop);
    const attributeFilter = [
      "disabled",
      "hidden",
      "inert",
      "open",
      "class",
      "style",
      selectedAttribute,
    ];
    observer.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter });

    for (let ancestor = root.parentElement; ancestor; ancestor = ancestor.parentElement) {
      observer.observe(ancestor, { attributes: true, attributeFilter });
    }

    const resizeObserver = new ResizeObserver(syncTabStop);
    resizeObserver.observe(root);

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
    };
  });

  function getItem(target: EventTarget | null) {
    const item = target instanceof Element ? target.closest<HTMLElement>(itemSelector) : null;

    return item?.closest(rootSelector) === ref.current ? item : null;
  }

  function handleFocusCapture(event: React.FocusEvent<HTMLDivElement>) {
    const item = getItem(event.target);
    focusWithin.current = item !== null;

    if (item) {
      lastFocused.current = item;
      syncTabStop();
    }
  }

  function handleBlurCapture(event: React.FocusEvent<HTMLDivElement>) {
    const item = getItem(event.target);

    if (
      item &&
      !ref.current?.contains(event.relatedTarget) &&
      (event.relatedTarget !== null || isFocusable(item))
    ) {
      focusWithin.current = false;

      if (entryFocus === "selected") {
        // Wait for the browser to move focus before restoring the selected tab stop.
        queueMicrotask(syncTabStop);
      }
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (
      event.defaultPrevented ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey
    ) {
      return;
    }

    const item = getItem(event.target);
    const root = ref.current;

    if (!item || !root) {
      return;
    }

    const items = getItems(root).filter(isFocusable);
    const index = items.indexOf(item);

    if (index === -1) {
      return;
    }

    const rtl = getComputedStyle(root).direction === "rtl";
    const previousKey = orientation === "vertical" ? "ArrowUp" : rtl ? "ArrowRight" : "ArrowLeft";
    const nextKey = orientation === "vertical" ? "ArrowDown" : rtl ? "ArrowLeft" : "ArrowRight";
    let nextIndex: number;

    if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = items.length - 1;
    } else if (event.key === previousKey || event.key === nextKey) {
      nextIndex = index + (event.key === nextKey ? 1 : -1);

      if (loopFocus) {
        nextIndex = (nextIndex + items.length) % items.length;
      }
    } else {
      return;
    }

    event.preventDefault();
    items[nextIndex]?.focus();
  }

  return {
    ref,
    onFocusCapture: handleFocusCapture,
    onBlurCapture: handleBlurCapture,
    onKeyDown: handleKeyDown,
  };
}

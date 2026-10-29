import { focusElement } from "../focus-element";

export function createFocusRestoration(
  scope: HTMLElement,
  previousFocus: HTMLElement | null = null,
) {
  const active = scope.ownerDocument.activeElement;
  const capturedFocus =
    active instanceof HTMLElement && !scope.contains(active) ? active : previousFocus;

  return function restoreFocus(
    target: HTMLElement | boolean | null | void,
    fallbackTarget?: HTMLElement | null,
    restoreFallback = true,
  ) {
    if (target === false || target === undefined) {
      return false;
    }
    if (target !== true && target !== null && focusElement(target)) {
      return true;
    }
    return restoreFallback && (focusElement(fallbackTarget) || focusElement(capturedFocus));
  };
}

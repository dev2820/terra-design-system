export function isElementAvailableForFocus(element: HTMLElement) {
  return (
    element.isConnected &&
    !element.matches(':disabled, input[type="hidden"]') &&
    !element.closest("[hidden], [inert]") &&
    element.getClientRects().length > 0 &&
    !["hidden", "collapse"].includes(getComputedStyle(element).visibility)
  );
}

export function focusElement(element: HTMLElement | null | undefined, preventScroll = true) {
  if (!element || !isElementAvailableForFocus(element)) {
    return false;
  }

  element.focus({ preventScroll });
  return element.ownerDocument.activeElement === element;
}

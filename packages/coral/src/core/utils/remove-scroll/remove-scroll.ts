export function removeScroll(document: Document) {
  const root = document.documentElement;
  const body = document.body;
  const properties = [
    [root.style, "overflow"],
    [body.style, "overflow"],
    [body.style, "padding-right"],
  ] as const;
  const previous = properties.map(([style, name]) => ({
    style,
    name,
    value: style.getPropertyValue(name),
    priority: style.getPropertyPriority(name),
  }));
  const gap = (document.defaultView?.innerWidth ?? root.clientWidth) - root.clientWidth;
  if (gap > 0 && !getComputedStyle(root).scrollbarGutter.includes("stable")) {
    body.style.paddingRight = `${parseFloat(getComputedStyle(body).paddingRight) + gap}px`;
  }
  root.style.overflow = "hidden";
  body.style.overflow = "hidden";
  return () => {
    for (const { style, name, value, priority } of previous) {
      style.setProperty(name, value, priority);
    }
  };
}

"use client";

import * as React from "react";
import { createPortal } from "react-dom";

import { useRender, type PropsWithRender } from "../core";

export interface PortalProps extends PropsWithRender<React.ComponentProps<"div">> {
  container?: HTMLElement | null;
}

export function Portal(props: PortalProps) {
  const { container, render, ...rest } = props;
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const element = useRender({ defaultTagName: "div", render, props: rest });

  return mounted ? createPortal(element, container ?? document.body) : null;
}

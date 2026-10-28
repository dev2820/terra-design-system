"use client";

import type * as React from "react";

import { createPartContext, useRender, useRovingFocus, type PropsWithRender } from "../core";

export interface ToolbarState {
  orientation: "horizontal" | "vertical";
}

const [ToolbarContext, useToolbarContext] = createPartContext<ToolbarState>("Toolbar");

export interface ToolbarRootProps extends PropsWithRender<
  Omit<React.ComponentProps<"div">, "aria-orientation" | "role" | "tabIndex">
> {
  orientation?: ToolbarState["orientation"];
  loopFocus?: boolean;
}

export function Root(props: ToolbarRootProps) {
  const { orientation = "horizontal", loopFocus = true, render, ...rest } = props;

  const focusProps = useRovingFocus({
    rootSelector: "[data-toolbar-root]",
    itemSelector: "button[data-toolbar-item], a[href][data-toolbar-item]",
    orientation,
    loopFocus,
  });

  const element = useRender({
    defaultTagName: "div",
    render,
    props: rest,
    internalProps: {
      ...focusProps,
      role: "toolbar",
      "aria-orientation": orientation,
      "data-toolbar-root": "",
      "data-orientation": orientation,
    },
  });

  return <ToolbarContext value={{ orientation }}>{element}</ToolbarContext>;
}

export interface ToolbarGroupProps extends PropsWithRender<
  Omit<React.ComponentProps<"div">, "aria-orientation" | "role" | "tabIndex">
> {}

export function Group(props: ToolbarGroupProps) {
  const { render, ...rest } = props;

  const toolbar = useToolbarContext("Group");

  return useRender({
    defaultTagName: "div",
    render,
    props: rest,
    internalProps: {
      role: "group",
      "data-orientation": toolbar.orientation,
    },
  });
}

export interface ToolbarButtonProps extends PropsWithRender<
  Omit<React.ComponentProps<"button">, "tabIndex">
> {}

export function Button(props: ToolbarButtonProps) {
  const { render, ...rest } = props;

  const toolbar = useToolbarContext("Button");

  return useRender({
    defaultTagName: "button",
    render,
    props: render ? rest : { ...rest, type: rest.type ?? "button" },
    internalProps: {
      tabIndex: 0,
      "data-toolbar-item": "",
      "data-orientation": toolbar.orientation,
    },
  });
}

export interface ToolbarLinkProps extends PropsWithRender<
  Omit<React.ComponentProps<"a">, "tabIndex">
> {
  href: string;
}

export function Link(props: ToolbarLinkProps) {
  const { render, ...rest } = props;

  const toolbar = useToolbarContext("Link");

  return useRender({
    defaultTagName: "a",
    render,
    props: rest,
    internalProps: {
      tabIndex: 0,
      "data-toolbar-item": "",
      "data-orientation": toolbar.orientation,
    },
  });
}

export interface ToolbarSeparatorProps extends PropsWithRender<
  Omit<React.ComponentProps<"hr">, "aria-hidden" | "aria-orientation" | "role" | "tabIndex">
> {
  decorative?: boolean;
}

export function Separator(props: ToolbarSeparatorProps) {
  const { decorative = false, render, ...rest } = props;

  const toolbar = useToolbarContext("Separator");
  const orientation = toolbar.orientation === "horizontal" ? "vertical" : "horizontal";

  return useRender({
    defaultTagName: "hr",
    render,
    props: rest,
    internalProps: {
      role: decorative ? "presentation" : "separator",
      "aria-hidden": decorative ? true : undefined,
      "aria-orientation": !decorative && orientation === "vertical" ? "vertical" : undefined,
      "data-orientation": orientation,
    },
  });
}

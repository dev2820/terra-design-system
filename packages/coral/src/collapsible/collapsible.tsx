"use client";

import * as React from "react";

import { createPartContext, useRender, type PropsWithRender } from "../core";

export interface CollapsibleChangeEventDetails {
  readonly reason: "trigger-press";
  readonly event: MouseEvent;
  readonly trigger: HTMLButtonElement;
  readonly isCanceled: boolean;
  cancel: () => void;
}

export interface CollapsibleRootProps extends PropsWithRender<React.ComponentProps<"div">> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean, eventDetails: CollapsibleChangeEventDetails) => void;
  disabled?: boolean;
}

interface CollapsibleContextValue {
  open: boolean;
  disabled: boolean;
  triggerId: string;
  panelId: string;
  toggle: (event: MouseEvent, trigger: HTMLButtonElement) => void;
}

const [CollapsibleContext, useCollapsibleContext] =
  createPartContext<CollapsibleContextValue>("Collapsible");

function createChangeEventDetails(event: MouseEvent, trigger: HTMLButtonElement) {
  let canceled = false;

  const details: CollapsibleChangeEventDetails = {
    reason: "trigger-press",
    event,
    trigger,
    get isCanceled() {
      return canceled;
    },
    cancel() {
      canceled = true;
    },
  };

  return details;
}

export function Root(props: CollapsibleRootProps) {
  const {
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    disabled = false,
    id: idProp,
    render,
    ref,
    ...rest
  } = props;
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const generatedId = React.useId();
  const id = idProp ?? `${generatedId}-collapsible`;
  const triggerId = `${id}-trigger`;
  const panelId = `${id}-panel`;
  const controlled = openProp !== undefined;
  const open = openProp ?? uncontrolledOpen;

  function toggle(event: MouseEvent, trigger: HTMLButtonElement) {
    if (disabled) {
      return;
    }

    const nextOpen = !open;
    const eventDetails = createChangeEventDetails(event, trigger);

    onOpenChange?.(nextOpen, eventDetails);

    if (!controlled && !eventDetails.isCanceled) {
      setUncontrolledOpen(nextOpen);
    }
  }

  const element = useRender({
    defaultTagName: "div",
    render,
    props: { ...rest, ref },
    internalProps: {
      id,
      "data-open": open ? "" : undefined,
      "data-disabled": disabled ? "" : undefined,
    },
  });

  return (
    <CollapsibleContext.Provider value={{ open, disabled, triggerId, panelId, toggle }}>
      {element}
    </CollapsibleContext.Provider>
  );
}

export interface CollapsibleTriggerProps extends Omit<
  React.ComponentProps<"button">,
  "aria-controls" | "aria-expanded" | "id"
> {}

export function Trigger(props: CollapsibleTriggerProps) {
  const { disabled: disabledProp = false, ...rest } = props;
  const collapsible = useCollapsibleContext("Trigger");
  const disabled = collapsible.disabled || disabledProp;

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    if (!event.defaultPrevented && !disabled) {
      collapsible.toggle(event.nativeEvent, event.currentTarget);
    }
  }

  return useRender({
    defaultTagName: "button",
    render: undefined,
    props: { ...rest, type: rest.type ?? "button" },
    internalProps: {
      id: collapsible.triggerId,
      "aria-controls": collapsible.panelId,
      "aria-expanded": collapsible.open,
      disabled,
      "data-panel-open": collapsible.open ? "" : undefined,
      "data-disabled": disabled ? "" : undefined,
      onClick: handleClick,
    },
  });
}

export interface CollapsiblePanelProps extends PropsWithRender<
  Omit<React.ComponentProps<"div">, "hidden" | "id">
> {}

export function Panel(props: CollapsiblePanelProps) {
  const { render, ref, ...rest } = props;
  const collapsible = useCollapsibleContext("Panel");

  return useRender({
    defaultTagName: "div",
    render,
    props: { ...rest, ref },
    internalProps: {
      id: collapsible.panelId,
      hidden: !collapsible.open,
      "data-open": collapsible.open ? "" : undefined,
      "data-disabled": collapsible.disabled ? "" : undefined,
    },
  });
}

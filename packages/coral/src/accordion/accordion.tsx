"use client";

import * as React from "react";

import { useRender, type RenderProp } from "../core/index";

interface AccordionRenderProps {
  render?: RenderProp;
}

export interface AccordionChangeEventDetails {
  readonly reason: "trigger-press";
  readonly event: MouseEvent;
  readonly trigger: HTMLButtonElement;
  readonly isCanceled: boolean;
  cancel: () => void;
}

export interface AccordionRootProps
  extends Omit<React.ComponentProps<"div">, "defaultValue">, AccordionRenderProps {
  value?: readonly string[];
  defaultValue?: readonly string[];
  onValueChange?: (value: string[], eventDetails: AccordionChangeEventDetails) => void;
  multiple?: boolean;
  disabled?: boolean;
}

interface AccordionRootContextValue {
  value: readonly string[];
  disabled: boolean;
  toggle: (value: string, event: MouseEvent, trigger: HTMLButtonElement) => void;
}

const AccordionRootContext = React.createContext<AccordionRootContextValue | null>(null);

function useAccordionRootContext(part: string) {
  const context = React.useContext(AccordionRootContext);

  if (context === null) {
    throw new Error(`Accordion.${part} must be used within Accordion.Root.`);
  }

  return context;
}

function normalizeValue(value: readonly string[] | undefined, multiple: boolean) {
  const nextValue = value === undefined ? [] : [...value];

  return multiple ? nextValue : nextValue.slice(0, 1);
}

function createChangeEventDetails(event: MouseEvent, trigger: HTMLButtonElement) {
  let canceled = false;

  const details: AccordionChangeEventDetails = {
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

export function Root(props: AccordionRootProps) {
  const {
    value: valueProp,
    defaultValue,
    onValueChange,
    multiple = false,
    disabled = false,
    render,
    ref,
    ...rest
  } = props;
  const [uncontrolledValue, setUncontrolledValue] = React.useState(() =>
    normalizeValue(defaultValue, multiple),
  );
  const controlled = valueProp !== undefined;
  const value = normalizeValue(controlled ? valueProp : uncontrolledValue, multiple);

  function toggle(itemValue: string, event: MouseEvent, trigger: HTMLButtonElement) {
    if (disabled) {
      return;
    }

    const open = value.includes(itemValue);
    const nextValue = open
      ? value.filter((valueItem) => valueItem !== itemValue)
      : multiple
        ? [...value, itemValue]
        : [itemValue];
    const eventDetails = createChangeEventDetails(event, trigger);

    onValueChange?.(nextValue, eventDetails);

    if (!controlled && !eventDetails.isCanceled) {
      setUncontrolledValue([...nextValue]);
    }
  }

  const element = useRender({
    defaultTagName: "div",
    render,
    props: { ...rest, ref },
    internalProps: {
      "data-disabled": disabled ? "" : undefined,
      "data-multiple": multiple ? "" : undefined,
    },
  });

  return (
    <AccordionRootContext.Provider value={{ value, disabled, toggle }}>
      {element}
    </AccordionRootContext.Provider>
  );
}

export interface AccordionItemProps extends React.ComponentProps<"div">, AccordionRenderProps {
  value: string;
  disabled?: boolean;
}

interface AccordionItemContextValue {
  value: string;
  open: boolean;
  disabled: boolean;
  triggerId: string;
  panelId: string;
}

const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null);

function useAccordionItemContext(part: string) {
  const context = React.useContext(AccordionItemContext);

  if (context === null) {
    throw new Error(`Accordion.${part} must be used within Accordion.Item.`);
  }

  return context;
}

export function Item(props: AccordionItemProps) {
  const { value, disabled: disabledProp = false, id: idProp, render, ref, ...rest } = props;
  const root = useAccordionRootContext("Item");
  const generatedId = React.useId();
  const baseId = idProp ?? `${generatedId}-accordion`;
  const id = idProp ?? `${baseId}-item`;
  const open = root.value.includes(value);
  const disabled = root.disabled || disabledProp;
  const context: AccordionItemContextValue = {
    value,
    open,
    disabled,
    triggerId: `${baseId}-trigger`,
    panelId: `${baseId}-panel`,
  };
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

  return <AccordionItemContext.Provider value={context}>{element}</AccordionItemContext.Provider>;
}

export type AccordionHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface AccordionHeaderProps
  extends Omit<React.ComponentProps<"h3">, "aria-level">, AccordionRenderProps {
  level?: AccordionHeadingLevel;
}

export function Header(props: AccordionHeaderProps) {
  const { level = 3, render, ref, ...rest } = props;
  const item = useAccordionItemContext("Header");
  const Heading = `h${level}` as const;

  return useRender({
    defaultTagName: Heading,
    render,
    props: { ...rest, ref },
    internalProps: {
      "data-open": item.open ? "" : undefined,
      "data-disabled": item.disabled ? "" : undefined,
    },
  });
}

export interface AccordionTriggerProps
  extends
    Omit<React.ComponentProps<"button">, "aria-controls" | "aria-expanded" | "id">,
    AccordionRenderProps {}

export function Trigger(props: AccordionTriggerProps) {
  const { disabled: disabledProp = false, render, ...rest } = props;
  const root = useAccordionRootContext("Trigger");
  const item = useAccordionItemContext("Trigger");
  const disabled = item.disabled || disabledProp;

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    if (!event.defaultPrevented && !disabled) {
      root.toggle(item.value, event.nativeEvent, event.currentTarget);
    }
  }

  return useRender({
    defaultTagName: "button",
    render,
    props: { ...rest, type: rest.type ?? "button" },
    internalProps: {
      id: item.triggerId,
      "aria-controls": item.panelId,
      "aria-expanded": item.open,
      disabled,
      "data-panel-open": item.open ? "" : undefined,
      "data-disabled": disabled ? "" : undefined,
      onClick: handleClick,
    },
  });
}

export interface AccordionPanelProps
  extends
    Omit<React.ComponentProps<"div">, "aria-labelledby" | "hidden" | "id" | "role">,
    AccordionRenderProps {
  region?: boolean;
}

export function Panel(props: AccordionPanelProps) {
  const { region = false, render, ref, ...rest } = props;
  const item = useAccordionItemContext("Panel");

  return useRender({
    defaultTagName: "div",
    render,
    props: { ...rest, ref },
    internalProps: {
      id: item.panelId,
      hidden: !item.open,
      role: region ? "region" : undefined,
      "aria-labelledby": region ? item.triggerId : undefined,
      "data-open": item.open ? "" : undefined,
      "data-disabled": item.disabled ? "" : undefined,
    },
  });
}

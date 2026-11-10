"use client";

import * as React from "react";

import { createPartContext, useRender, type PropsWithRender } from "../core";
import { Field } from "../field";
import { useFieldContext } from "../field/field-context";
import { useFieldsetContext } from "../fieldset/fieldset-context";
import { Portal as BasePortal, type PortalProps } from "../portal";
import { Positioner as BasePositioner, type PositionerProps } from "../positioner";

export interface AutocompleteChangeEventDetails {
  readonly reason:
    | "input-change"
    | "input-press"
    | "item-press"
    | "arrow-key"
    | "escape-key"
    | "focus-outside"
    | "outside-press";
  readonly event: Event;
  readonly isCanceled: boolean;
  cancel: () => void;
}

export interface AutocompleteRootProps extends PropsWithRender<
  Omit<React.ComponentProps<"div">, "defaultValue" | "onChange">
> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string, details: AutocompleteChangeEventDetails) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean, details: AutocompleteChangeEventDetails) => void;
  disabled?: boolean;
  readOnly?: boolean;
}

interface AutocompleteContextValue {
  value: string;
  defaultValue: string;
  controlled: boolean;
  open: boolean;
  disabled: boolean;
  readOnly: boolean;
  listId: string;
  activeId: string | null;
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>;
  inputRef: React.RefObject<HTMLInputElement | null>;
  listRef: React.RefObject<HTMLDivElement | null>;
  positionerRef: React.RefObject<HTMLDivElement | null>;
  pendingNavigation: React.RefObject<"first" | "last" | null>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  resetOpen: () => void;
  changeValue: (value: string, details: AutocompleteChangeEventDetails) => boolean;
  changeOpen: (open: boolean, details: AutocompleteChangeEventDetails) => void;
  select: (item: HTMLElement, event: Event) => void;
}

const [AutocompleteContext, useAutocompleteContext] =
  createPartContext<AutocompleteContextValue>("Autocomplete");

function createDetails(reason: AutocompleteChangeEventDetails["reason"], event: Event) {
  let canceled = false;
  return {
    reason,
    event,
    get isCanceled() {
      return canceled;
    },
    cancel() {
      canceled = true;
    },
  };
}

function getItems(list: HTMLElement | null) {
  return [...(list?.querySelectorAll<HTMLElement>("[data-autocomplete-item]") ?? [])].filter(
    (item) =>
      item.getAttribute("aria-disabled") !== "true" &&
      item.checkVisibility({ checkVisibilityCSS: true }),
  );
}

function highlight(autocomplete: AutocompleteContextValue, item: HTMLElement | undefined) {
  autocomplete.setActiveId(item?.id ?? null);
  item?.scrollIntoView({ block: "nearest", inline: "nearest" });
}

export function Root(props: AutocompleteRootProps) {
  const {
    value: valueProp,
    defaultValue = "",
    onValueChange,
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    disabled: disabledProp = false,
    readOnly = false,
    render,
    ...rest
  } = props;
  const [uncontrolledValue, setValue] = React.useState(defaultValue);
  const [uncontrolledOpen, setOpen] = React.useState(defaultOpen);
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const field = useFieldContext("Root", true);
  const fieldsetDisabled = useFieldsetContext("Root", true) ?? false;
  const disabled = disabledProp || fieldsetDisabled || field?.state.disabled === true;
  const value = valueProp ?? uncontrolledValue;
  const open = (openProp ?? uncontrolledOpen) && !disabled && !readOnly;
  const listId = `${React.useId()}-autocomplete-list`;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);
  const positionerRef = React.useRef<HTMLDivElement>(null);
  const pendingNavigation = React.useRef<"first" | "last" | null>(null);
  const pendingSelection = React.useRef(false);

  React.useLayoutEffect(() => {
    setActiveId(null);
  }, [value]);
  React.useLayoutEffect(() => {
    if (!open) setActiveId(null);
  }, [open]);
  React.useLayoutEffect(() => {
    // A controlled value is committed by the parent after the selection callback.
    if (pendingSelection.current && inputRef.current) {
      pendingSelection.current = false;
      field?.actions.handleChange(inputRef.current);
    }
  });

  function changeValue(nextValue: string, details: AutocompleteChangeEventDetails) {
    if (disabled || readOnly) return false;
    if (value !== nextValue) onValueChange?.(nextValue, details);
    if (details.isCanceled) return false;
    if (valueProp === undefined) setValue(nextValue);
    setActiveId(null);
    return true;
  }

  function changeOpen(nextOpen: boolean, details: AutocompleteChangeEventDetails) {
    if (nextOpen === open || (nextOpen && (disabled || readOnly))) return;
    onOpenChange?.(nextOpen, details);
    if (details.isCanceled) {
      pendingNavigation.current = null;
      return;
    }
    if (openProp === undefined) setOpen(nextOpen);
    if (!nextOpen) {
      setActiveId(null);
      pendingNavigation.current = null;
    }
  }

  function select(item: HTMLElement, event: Event) {
    const input = inputRef.current;
    if (!input || input.matches(":disabled") || !getItems(listRef.current).includes(item)) return;
    const nextValue = item.dataset.value!;
    if (!changeValue(nextValue, createDetails("item-press", event))) return;
    pendingSelection.current = true;
    input.value = valueProp === undefined ? nextValue : value;
    input.focus({ preventScroll: true });
    input.setSelectionRange(input.value.length, input.value.length);
    changeOpen(false, createDetails("item-press", event));
  }

  const context: AutocompleteContextValue = {
    value,
    defaultValue,
    controlled: valueProp !== undefined,
    open,
    disabled,
    readOnly,
    listId,
    activeId,
    setActiveId,
    inputRef,
    listRef,
    positionerRef,
    pendingNavigation,
    setValue,
    resetOpen: () => {
      if (openProp === undefined) setOpen(defaultOpen);
      setActiveId(null);
      pendingNavigation.current = null;
    },
    changeValue,
    changeOpen,
    select,
  };
  const settings = React.useRef(context);

  React.useLayoutEffect(() => {
    settings.current = context;
  });

  React.useEffect(() => {
    if (!open) return;
    const document = inputRef.current?.ownerDocument;
    function handleOutside(event: MouseEvent) {
      const current = settings.current;
      const path = event.composedPath();
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        (current.inputRef.current && path.includes(current.inputRef.current)) ||
        (current.positionerRef.current && path.includes(current.positionerRef.current))
      )
        return;
      current.changeOpen(false, createDetails("outside-press", event));
    }
    document?.addEventListener("click", handleOutside);
    return () => document?.removeEventListener("click", handleOutside);
  }, [open]);

  const element = useRender({
    defaultTagName: "div",
    render,
    props: rest,
    internalProps: {
      "data-open": open ? "" : undefined,
      "data-disabled": disabled ? "" : undefined,
      "data-readonly": readOnly ? "" : undefined,
    },
  });

  return <AutocompleteContext value={context}>{element}</AutocompleteContext>;
}

export interface AutocompleteInputProps extends PropsWithRender<
  Omit<
    React.ComponentProps<"input">,
    | "type"
    | "value"
    | "defaultValue"
    | "disabled"
    | "readOnly"
    | "list"
    | "role"
    | "aria-autocomplete"
    | "aria-controls"
    | "aria-expanded"
    | "aria-activedescendant"
    | "aria-haspopup"
  >
> {}

export function Input(props: AutocompleteInputProps) {
  const { render, ...rest } = props;
  const autocomplete = useAutocompleteContext("Input");
  const { inputRef, controlled, defaultValue, value, setValue } = autocomplete;
  const settings = React.useRef(autocomplete);

  React.useLayoutEffect(() => {
    settings.current = autocomplete;
    if (inputRef.current) inputRef.current.defaultValue = defaultValue;
  });
  React.useEffect(() => {
    const input = inputRef.current;
    const form = input?.form;
    if (!input || !form) return;
    let timer: ReturnType<typeof setTimeout>;
    function handleReset(event: Event) {
      timer = setTimeout(() => {
        if (event.defaultPrevented) return;
        const current = settings.current;
        if (!controlled) setValue(defaultValue);
        input!.value = controlled ? current.value : defaultValue;
        current.resetOpen();
      }, 0);
    }
    form.addEventListener("reset", handleReset);
    return () => {
      clearTimeout(timer);
      form.removeEventListener("reset", handleReset);
    };
  }, [inputRef, controlled, defaultValue, rest.form, setValue]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (
      event.defaultPrevented ||
      event.nativeEvent.isComposing ||
      event.keyCode === 229 ||
      autocomplete.disabled ||
      autocomplete.readOnly ||
      event.currentTarget.matches(":disabled")
    )
      return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      event.preventDefault();
      const last = event.key === "ArrowUp";
      if (!autocomplete.open) {
        autocomplete.pendingNavigation.current = last ? "last" : "first";
        autocomplete.changeOpen(true, createDetails("arrow-key", event.nativeEvent));
      } else {
        const items = getItems(autocomplete.listRef.current);
        const index = items.findIndex((item) => item.id === autocomplete.activeId);
        highlight(
          autocomplete,
          items[
            index < 0
              ? last
                ? items.length - 1
                : 0
              : Math.max(0, Math.min(items.length - 1, index + (last ? -1 : 1)))
          ],
        );
      }
    } else if (event.key === "Enter" && autocomplete.open) {
      const active = getItems(autocomplete.listRef.current).find(
        (item) => item.id === autocomplete.activeId,
      );
      if (active) {
        event.preventDefault();
        autocomplete.select(active, event.nativeEvent);
      }
    } else if (event.key === "Escape" && autocomplete.open) {
      event.preventDefault();
      event.stopPropagation();
      autocomplete.changeOpen(false, createDetails("escape-key", event.nativeEvent));
    } else if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
      autocomplete.setActiveId(null);
    }
  }

  return useRender({
    defaultTagName: "input",
    render: render ? <Field.Control render={render} /> : <Field.Control />,
    props: rest,
    defaultProps: { autoComplete: "off" },
    internalProps: {
      ref: inputRef,
      type: "text",
      role: "combobox",
      value,
      disabled: autocomplete.disabled,
      readOnly: autocomplete.readOnly,
      list: undefined,
      "aria-autocomplete": "list",
      "aria-haspopup": "listbox",
      "aria-expanded": autocomplete.open,
      "aria-controls": autocomplete.open ? autocomplete.listId : undefined,
      "aria-activedescendant": autocomplete.open ? (autocomplete.activeId ?? undefined) : undefined,
      onChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.defaultPrevented) {
          event.currentTarget.value = value;
          return;
        }
        const accepted = autocomplete.changeValue(
          event.currentTarget.value,
          createDetails("input-change", event.nativeEvent),
        );
        if (!accepted) event.currentTarget.value = value;
        else autocomplete.changeOpen(true, createDetails("input-change", event.nativeEvent));
      },
      onClick(event: React.MouseEvent<HTMLInputElement>) {
        if (!event.defaultPrevented && !event.currentTarget.matches(":disabled"))
          autocomplete.changeOpen(true, createDetails("input-press", event.nativeEvent));
      },
      onBlur(event: React.FocusEvent<HTMLInputElement>) {
        if (
          !event.defaultPrevented &&
          !autocomplete.positionerRef.current?.contains(event.relatedTarget)
        )
          autocomplete.changeOpen(false, createDetails("focus-outside", event.nativeEvent));
      },
      onKeyDown: handleKeyDown,
    },
  });
}

export interface AutocompletePortalProps extends PortalProps {}

export function Portal(props: AutocompletePortalProps) {
  const { open } = useAutocompleteContext("Portal");
  return open ? <BasePortal {...props} /> : null;
}

export interface AutocompletePositionerProps extends Omit<
  PositionerProps,
  "open" | "anchorRef" | "arrowElement" | "onPlacementChange" | "side"
> {
  side?: "top" | "bottom";
}

export function Positioner(props: AutocompletePositionerProps) {
  const {
    side = "bottom",
    align = "start",
    sideOffset = 0,
    collisionPadding = 8,
    render,
    ...rest
  } = props;
  const { open, inputRef, positionerRef } = useAutocompleteContext("Positioner");
  const element = useRender({
    defaultTagName: "div",
    defaultProps: { style: { pointerEvents: "none" } },
    render,
    props: rest,
    internalProps: { ref: positionerRef },
  });
  return (
    <BasePositioner
      open={open}
      anchorRef={inputRef}
      side={side}
      align={align}
      sideOffset={sideOffset}
      collisionPadding={collisionPadding}
      render={element}
    />
  );
}

export interface AutocompleteListProps extends PropsWithRender<
  Omit<React.ComponentProps<"div">, "id" | "role" | "tabIndex" | "aria-multiselectable">
> {}

export function List(props: AutocompleteListProps) {
  const { render, ...rest } = props;
  const autocomplete = useAutocompleteContext("List");
  const { open, listRef, activeId, setActiveId, pendingNavigation } = autocomplete;

  React.useEffect(() => {
    const list = listRef.current;
    if (!open || !list) return;
    if (pendingNavigation.current) {
      const items = getItems(list);
      highlight(autocomplete, pendingNavigation.current === "last" ? items.at(-1) : items[0]);
      pendingNavigation.current = null;
    }
    function validateActiveItem() {
      if (activeId && !getItems(list).some((item) => item.id === activeId)) setActiveId(null);
    }
    validateActiveItem();
    const observer = new MutationObserver(validateActiveItem);
    observer.observe(list, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["id", "hidden", "aria-disabled", "style", "class"],
    });
    return () => observer.disconnect();
  }, [open, listRef, activeId, setActiveId, pendingNavigation]);

  const element = useRender({
    defaultTagName: "div",
    render,
    defaultProps: { style: { pointerEvents: "auto" } },
    props: rest,
    internalProps: {
      id: autocomplete.listId,
      ref: listRef,
      role: "listbox",
      "data-open": open ? "" : undefined,
    },
  });

  return open ? element : null;
}

export interface AutocompleteItemProps extends PropsWithRender<
  Omit<React.ComponentProps<"div">, "role" | "tabIndex" | "aria-selected" | "aria-disabled">
> {
  value: string;
  disabled?: boolean;
}

export function Item(props: AutocompleteItemProps) {
  const { value, disabled = false, id: idProp, render, ...rest } = props;
  const autocomplete = useAutocompleteContext("Item");
  const generatedId = React.useId();
  const id = idProp ?? (render?.props as React.ComponentProps<"div">)?.id ?? `${generatedId}-item`;
  const highlighted = autocomplete.activeId === id;

  const element = useRender({
    defaultTagName: "div",
    render,
    props: rest,
    internalProps: {
      id,
      role: "option",
      tabIndex: -1,
      "aria-selected": highlighted,
      "aria-disabled": disabled ? true : undefined,
      "data-autocomplete-item": "",
      "data-value": value,
      "data-highlighted": highlighted ? "" : undefined,
      "data-disabled": disabled ? "" : undefined,
      onMouseDown(event: React.MouseEvent<HTMLDivElement>) {
        if (!event.defaultPrevented && event.button === 0) event.preventDefault();
      },
      onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
        if (!event.defaultPrevented && event.pointerType !== "touch" && !disabled)
          autocomplete.setActiveId(id);
      },
      onClick(event: React.MouseEvent<HTMLDivElement>) {
        if (!event.defaultPrevented && !disabled)
          autocomplete.select(event.currentTarget, event.nativeEvent);
      },
    },
  });

  return value.toLowerCase().includes(autocomplete.value.toLowerCase()) ? element : null;
}

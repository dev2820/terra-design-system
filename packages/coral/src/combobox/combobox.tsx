"use client";

import * as React from "react";

import {
  createPartContext,
  joinIds,
  useRender,
  visuallyHiddenStyle,
  type PropsWithRender,
} from "../core";
import { useFieldContext } from "../field/field-context";
import { useFieldsetContext } from "../fieldset/fieldset-context";
import { Portal as BasePortal, type PortalProps } from "../portal";
import { Positioner as BasePositioner, type PositionerProps } from "../positioner";

export interface ComboboxItem {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxChangeEventDetails {
  readonly reason:
    | "input-change"
    | "input-press"
    | "trigger-press"
    | "clear-press"
    | "item-press"
    | "arrow-key"
    | "escape-key"
    | "focus-outside"
    | "outside-press";
  readonly event: Event;
  readonly isCanceled: boolean;
  cancel: () => void;
}

interface ComboboxRootBaseProps extends PropsWithRender<
  Omit<React.ComponentProps<"div">, "defaultValue" | "onChange">
> {
  items: readonly ComboboxItem[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean, details: ComboboxChangeEventDetails) => void;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  form?: string;
}

export type ComboboxRootProps = ComboboxRootBaseProps &
  (
    | {
        multiple?: false;
        value?: string | null;
        defaultValue?: string | null;
        onValueChange?: (value: string | null, details: ComboboxChangeEventDetails) => void;
      }
    | {
        multiple: true;
        value?: readonly string[];
        defaultValue?: readonly string[];
        onValueChange?: (value: string[], details: ComboboxChangeEventDetails) => void;
      }
  );

interface ComboboxContextValue {
  items: readonly ComboboxItem[];
  value: readonly string[];
  multiple: boolean;
  disabled: boolean;
  readOnly: boolean;
  required: boolean;
  name: string | undefined;
  form: string | undefined;
  open: boolean;
  query: string | null;
  setQuery: React.Dispatch<React.SetStateAction<string | null>>;
  activeId: string | null;
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>;
  listId: string;
  inputId: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  listRef: React.RefObject<HTMLDivElement | null>;
  positionerRef: React.RefObject<HTMLDivElement | null>;
  selectRef: React.RefObject<HTMLSelectElement | null>;
  pendingNavigation: React.RefObject<"first" | "last" | null>;
  changeOpen: (open: boolean, details: ComboboxChangeEventDetails) => void;
  changeValue: (value: string[], details: ComboboxChangeEventDetails) => boolean;
  select: (item: HTMLElement, event: Event) => void;
  reset: () => string[];
}

const [ComboboxContext, useComboboxContext] = createPartContext<ComboboxContextValue>("Combobox");
const [ItemContext, useItemContext] = createPartContext<boolean>("Combobox.Item");

function createDetails(reason: ComboboxChangeEventDetails["reason"], event: Event) {
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

function normalizeValue(
  valueProp: string | readonly string[] | null | undefined,
  items: readonly ComboboxItem[],
  multiple: boolean,
) {
  const values = typeof valueProp === "string" ? [valueProp] : (valueProp ?? []);
  const valid = [...new Set(values)].filter((value) => items.some((item) => item.value === value));
  return multiple ? valid : valid.slice(0, 1);
}

function getItems(list: HTMLElement | null) {
  return [...(list?.querySelectorAll<HTMLElement>("[data-combobox-item]") ?? [])].filter(
    (item) =>
      item.getAttribute("aria-disabled") !== "true" &&
      item.checkVisibility({ checkVisibilityCSS: true }),
  );
}

function highlight(combobox: ComboboxContextValue, item: HTMLElement | undefined) {
  combobox.setActiveId(item?.id ?? null);
  item?.scrollIntoView({ block: "nearest", inline: "nearest" });
}

function isInteractive(combobox: ComboboxContextValue) {
  return (
    !combobox.disabled && !combobox.readOnly && !combobox.inputRef.current?.matches(":disabled")
  );
}

function focusInput(combobox: ComboboxContextValue) {
  const input = combobox.inputRef.current;
  input?.focus({ preventScroll: true });
  input?.setSelectionRange(input.value.length, input.value.length);
}

export function Root(props: ComboboxRootProps) {
  const {
    items,
    value: valueProp,
    defaultValue,
    onValueChange: _onValueChange,
    multiple = false,
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    disabled: disabledProp = false,
    readOnly = false,
    required = false,
    name,
    form,
    render,
    ...rest
  } = props;
  if (
    items.some(
      (item, index) =>
        item.value === "" || items.findIndex((other) => other.value === item.value) !== index,
    )
  ) {
    throw new Error("Combobox.Root items require unique, non-empty values.");
  }
  const [uncontrolledValue, setValue] = React.useState(() =>
    normalizeValue(defaultValue, items, multiple),
  );
  const [uncontrolledOpen, setOpen] = React.useState(defaultOpen);
  const [query, setQuery] = React.useState<string | null>(null);
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const field = useFieldContext("Root", true);
  const fieldsetDisabled = useFieldsetContext("Root", true) ?? false;
  const disabled = disabledProp || fieldsetDisabled || field?.state.disabled === true;
  const value = normalizeValue(
    valueProp === undefined ? uncontrolledValue : valueProp,
    items,
    multiple,
  );
  const open = (openProp ?? uncontrolledOpen) && !disabled && !readOnly;
  const id = React.useId();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);
  const positionerRef = React.useRef<HTMLDivElement>(null);
  const selectRef = React.useRef<HTMLSelectElement>(null);
  const pendingNavigation = React.useRef<"first" | "last" | null>(null);
  const [pendingChange, setPendingChange] = React.useState(false);
  const pendingCaret = React.useRef(false);

  React.useLayoutEffect(() => {
    if (!open) {
      setQuery(null);
      setActiveId(null);
      pendingNavigation.current = null;
    }
  }, [open]);
  React.useLayoutEffect(() => {
    if (pendingCaret.current && inputRef.current) {
      pendingCaret.current = false;
      const input = inputRef.current;
      input.setSelectionRange(input.value.length, input.value.length);
    }
    if (pendingChange) {
      setPendingChange(false);
      if (selectRef.current) field?.actions.handleChange(selectRef.current);
    }
  });

  function changeValue(nextValue: string[], details: ComboboxChangeEventDetails) {
    if (!isInteractive(context)) return false;
    if (
      value.length !== nextValue.length ||
      value.some((item, index) => item !== nextValue[index])
    ) {
      if (props.multiple) props.onValueChange?.([...nextValue], details);
      else props.onValueChange?.(nextValue[0] ?? null, details);
    }
    if (details.isCanceled) return false;
    if (valueProp === undefined) setValue(nextValue);
    setPendingChange(true);
    return true;
  }

  function changeOpen(nextOpen: boolean, details: ComboboxChangeEventDetails) {
    if (nextOpen === open || (nextOpen && !isInteractive(context))) return;
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
    if (!isInteractive(context) || !getItems(listRef.current).includes(item)) return;
    const itemValue = item.dataset.value!;
    const nextValue = multiple
      ? value.includes(itemValue)
        ? value.filter((selectedValue) => selectedValue !== itemValue)
        : [...value, itemValue]
      : [itemValue];
    if (!changeValue(nextValue, createDetails("item-press", event))) return;
    setQuery(null);
    pendingCaret.current = true;
    if (!multiple) changeOpen(false, createDetails("item-press", event));
    focusInput(context);
  }

  const context: ComboboxContextValue = {
    items,
    value,
    multiple,
    disabled,
    readOnly,
    required,
    name: field?.meta.name ?? name,
    form,
    open,
    query,
    setQuery,
    activeId,
    setActiveId,
    listId: `${id}-combobox-list`,
    inputId: `${id}-combobox-input`,
    inputRef,
    listRef,
    positionerRef,
    selectRef,
    pendingNavigation,
    changeOpen,
    changeValue,
    select,
    reset() {
      const nextValue =
        valueProp === undefined ? normalizeValue(defaultValue, items, multiple) : [...value];
      if (valueProp === undefined) setValue(nextValue);
      if (openProp === undefined) setOpen(defaultOpen);
      setQuery(null);
      setActiveId(null);
      pendingNavigation.current = null;
      return nextValue;
    },
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
        path.some(
          (target) =>
            target instanceof Element &&
            target.closest("[data-combobox-action]")?.getAttribute("data-combobox-action") ===
              current.inputId,
        ) ||
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
      "data-multiple": multiple ? "" : undefined,
      "data-disabled": disabled ? "" : undefined,
      "data-readonly": readOnly ? "" : undefined,
      "data-required": required ? "" : undefined,
    },
  });
  return <ComboboxContext value={context}>{element}</ComboboxContext>;
}

export interface ComboboxInputProps extends PropsWithRender<
  Omit<
    React.ComponentProps<"input">,
    | "type"
    | "value"
    | "defaultValue"
    | "name"
    | "form"
    | "disabled"
    | "readOnly"
    | "required"
    | "list"
    | "role"
    | "aria-autocomplete"
    | "aria-controls"
    | "aria-expanded"
    | "aria-activedescendant"
    | "aria-haspopup"
    | "aria-required"
  >
> {}

export function Input(props: ComboboxInputProps) {
  const { render, ...rest } = props;
  const combobox = useComboboxContext("Input");
  const field = useFieldContext("Input", true);
  const { inputRef, open, activeId, setActiveId } = combobox;
  const value =
    combobox.query ??
    (combobox.multiple
      ? ""
      : (combobox.items.find((item) => item.value === combobox.value[0])?.label ?? ""));
  const id = rest.id ?? (render?.props as React.ComponentProps<"input">)?.id ?? combobox.inputId;
  React.useLayoutEffect(() => {
    field?.actions.setControlId(id);
  }, [field?.actions, id]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (
      event.defaultPrevented ||
      event.nativeEvent.isComposing ||
      event.keyCode === 229 ||
      !isInteractive(combobox)
    )
      return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      event.preventDefault();
      const last = event.key === "ArrowUp";
      if (!open) {
        combobox.pendingNavigation.current = last ? "last" : "first";
        combobox.changeOpen(true, createDetails("arrow-key", event.nativeEvent));
      } else {
        const items = getItems(combobox.listRef.current);
        const index = items.findIndex((item) => item.id === activeId);
        highlight(
          combobox,
          items[
            index < 0
              ? last
                ? items.length - 1
                : 0
              : Math.max(0, Math.min(items.length - 1, index + (last ? -1 : 1)))
          ],
        );
      }
    } else if (event.key === "Enter" && open) {
      const active = getItems(combobox.listRef.current).find((item) => item.id === activeId);
      if (active) {
        event.preventDefault();
        combobox.select(active, event.nativeEvent);
      }
    } else if (event.key === "Escape" && open) {
      event.preventDefault();
      event.stopPropagation();
      combobox.changeOpen(false, createDetails("escape-key", event.nativeEvent));
    } else if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) setActiveId(null);
  }

  return useRender({
    defaultTagName: "input",
    render,
    props: rest,
    defaultProps: { autoComplete: "off" },
    internalProps: {
      id,
      ref: inputRef,
      type: "text",
      role: "combobox",
      value,
      name: undefined,
      form: combobox.form,
      disabled: combobox.disabled,
      readOnly: combobox.readOnly,
      required: false,
      list: undefined,
      "aria-autocomplete": "list",
      "aria-haspopup": "listbox",
      "aria-expanded": open,
      "aria-controls": open ? combobox.listId : undefined,
      "aria-activedescendant": open ? (activeId ?? undefined) : undefined,
      "aria-required": combobox.required ? true : undefined,
      "aria-invalid": field?.state.invalid ? true : rest["aria-invalid"],
      "aria-labelledby":
        rest["aria-labelledby"] ??
        (render?.props as React.ComponentProps<"input">)?.["aria-labelledby"] ??
        (rest["aria-label"] || (render?.props as React.ComponentProps<"input">)?.["aria-label"]
          ? undefined
          : field?.meta.labelId),
      "aria-describedby": joinIds(
        rest["aria-describedby"],
        (render?.props as React.ComponentProps<"input">)?.["aria-describedby"],
        field?.meta.descriptionIds,
        field?.state.invalid ? field.meta.errorIds : undefined,
      ),
      onChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.defaultPrevented || !isInteractive(combobox)) {
          event.currentTarget.value = value;
          return;
        }
        combobox.setQuery(event.currentTarget.value);
        setActiveId(null);
        combobox.changeOpen(true, createDetails("input-change", event.nativeEvent));
      },
      onClick(event: React.MouseEvent<HTMLInputElement>) {
        if (!event.defaultPrevented)
          combobox.changeOpen(true, createDetails("input-press", event.nativeEvent));
      },
      onFocus(event: React.FocusEvent<HTMLInputElement>) {
        if (!event.defaultPrevented) field?.actions.handleFocus();
      },
      onBlur(event: React.FocusEvent<HTMLInputElement>) {
        if (event.defaultPrevented || combobox.positionerRef.current?.contains(event.relatedTarget))
          return;
        field?.actions.handleBlur();
        combobox.changeOpen(false, createDetails("focus-outside", event.nativeEvent));
      },
      onKeyDown: handleKeyDown,
    },
  });
}

export interface ComboboxTriggerProps extends PropsWithRender<
  Omit<React.ComponentProps<"button">, "type" | "aria-controls" | "aria-expanded" | "aria-haspopup">
> {}

export function Trigger(props: ComboboxTriggerProps) {
  const { render, disabled, ...rest } = props;
  const combobox = useComboboxContext("Trigger");
  return useRender({
    defaultTagName: "button",
    render,
    props: rest,
    internalProps: {
      type: "button",
      tabIndex: -1,
      disabled: disabled || combobox.disabled || combobox.readOnly,
      "data-combobox-action": combobox.inputId,
      "aria-haspopup": "listbox",
      "aria-expanded": combobox.open,
      "aria-controls": combobox.open ? combobox.listId : undefined,
      onMouseDown(event: React.MouseEvent<HTMLButtonElement>) {
        if (!event.defaultPrevented && event.button === 0) event.preventDefault();
      },
      onClick(event: React.MouseEvent<HTMLButtonElement>) {
        if (event.defaultPrevented || disabled || !isInteractive(combobox)) return;
        focusInput(combobox);
        combobox.changeOpen(!combobox.open, createDetails("trigger-press", event.nativeEvent));
      },
    },
  });
}

export interface ComboboxClearProps extends PropsWithRender<
  Omit<React.ComponentProps<"button">, "type">
> {}

export function Clear(props: ComboboxClearProps) {
  const { render, disabled, ...rest } = props;
  const combobox = useComboboxContext("Clear");
  return useRender({
    defaultTagName: "button",
    render,
    props: rest,
    internalProps: {
      type: "button",
      tabIndex: -1,
      disabled: disabled || combobox.disabled || combobox.readOnly,
      "data-combobox-action": combobox.inputId,
      "data-empty": combobox.value.length === 0 ? "" : undefined,
      onMouseDown(event: React.MouseEvent<HTMLButtonElement>) {
        if (!event.defaultPrevented && event.button === 0) event.preventDefault();
      },
      onClick(event: React.MouseEvent<HTMLButtonElement>) {
        if (
          event.defaultPrevented ||
          disabled ||
          !combobox.changeValue([], createDetails("clear-press", event.nativeEvent))
        )
          return;
        combobox.setQuery(null);
        combobox.setActiveId(null);
        focusInput(combobox);
      },
    },
  });
}

export interface ComboboxValueProps extends PropsWithRender<React.ComponentProps<"span">> {}

export function Value(props: ComboboxValueProps) {
  const { render, children, ...rest } = props;
  const combobox = useComboboxContext("Value");
  return useRender({
    defaultTagName: "span",
    render,
    props: {
      ...rest,
      children:
        children ??
        combobox.value
          .map((value) => combobox.items.find((item) => item.value === value)!.label)
          .join(", "),
    },
    internalProps: { "data-empty": combobox.value.length === 0 ? "" : undefined },
  });
}

export interface ComboboxPortalProps extends PortalProps {}
export function Portal(props: ComboboxPortalProps) {
  return useComboboxContext("Portal").open ? <BasePortal {...props} /> : null;
}

export interface ComboboxPositionerProps extends Omit<
  PositionerProps,
  "open" | "anchorRef" | "arrowElement" | "onPlacementChange" | "side"
> {
  side?: "top" | "bottom";
}
export function Positioner(props: ComboboxPositionerProps) {
  const {
    side = "bottom",
    align = "start",
    sideOffset = 0,
    collisionPadding = 8,
    render,
    ...rest
  } = props;
  const { open, inputRef, positionerRef } = useComboboxContext("Positioner");
  const element = useRender({
    defaultTagName: "div",
    render,
    defaultProps: { style: { pointerEvents: "none" } },
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

export interface ComboboxListProps extends PropsWithRender<
  Omit<React.ComponentProps<"div">, "id" | "role" | "tabIndex" | "aria-multiselectable">
> {}
export function List(props: ComboboxListProps) {
  const { render, ...rest } = props;
  const combobox = useComboboxContext("List");
  const { open, listRef, activeId, setActiveId, pendingNavigation } = combobox;
  React.useEffect(() => {
    const list = listRef.current;
    if (!open || !list) return;
    if (pendingNavigation.current) {
      const items = getItems(list);
      highlight(combobox, pendingNavigation.current === "last" ? items.at(-1) : items[0]);
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
    props: rest,
    defaultProps: { style: { pointerEvents: "auto" } },
    internalProps: {
      id: combobox.listId,
      ref: listRef,
      role: "listbox",
      "aria-multiselectable": combobox.multiple ? true : undefined,
      "data-open": open ? "" : undefined,
    },
  });
  return open ? element : null;
}

export interface ComboboxItemProps extends PropsWithRender<
  Omit<React.ComponentProps<"div">, "role" | "tabIndex" | "aria-selected" | "aria-disabled">
> {
  value: string;
}
export function Item(props: ComboboxItemProps) {
  const { value, render, children, ...rest } = props;
  const combobox = useComboboxContext("Item");
  const generatedId = React.useId();
  const id = rest.id ?? (render?.props as React.ComponentProps<"div">)?.id ?? `${generatedId}-item`;
  const item = combobox.items.find((option) => option.value === value);
  const disabled = item?.disabled === true;
  const selected = combobox.value.includes(value);
  const highlighted = combobox.activeId === id;
  const element = useRender({
    defaultTagName: "div",
    render,
    props: { ...rest, children: children ?? item?.label },
    internalProps: {
      id,
      role: "option",
      tabIndex: -1,
      "aria-selected": selected,
      "aria-disabled": disabled ? true : undefined,
      "data-combobox-item": "",
      "data-value": value,
      "data-selected": selected ? "" : undefined,
      "data-highlighted": highlighted ? "" : undefined,
      "data-disabled": disabled ? "" : undefined,
      onMouseDown(event: React.MouseEvent<HTMLDivElement>) {
        if (!event.defaultPrevented && event.button === 0) event.preventDefault();
      },
      onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
        if (
          !event.defaultPrevented &&
          event.pointerType !== "touch" &&
          !disabled &&
          isInteractive(combobox)
        )
          combobox.setActiveId(id);
      },
      onClick(event: React.MouseEvent<HTMLDivElement>) {
        if (!event.defaultPrevented && !disabled)
          combobox.select(event.currentTarget, event.nativeEvent);
      },
    },
  });
  return item && item.label.toLowerCase().includes((combobox.query ?? "").toLowerCase()) ? (
    <ItemContext value={selected}>{element}</ItemContext>
  ) : null;
}

export interface ComboboxItemIndicatorProps extends PropsWithRender<
  Omit<React.ComponentProps<"span">, "aria-hidden">
> {}
export function ItemIndicator(props: ComboboxItemIndicatorProps) {
  const { render, ...rest } = props;
  const selected = useItemContext("ItemIndicator");
  const element = useRender({
    defaultTagName: "span",
    render,
    props: rest,
    internalProps: { "aria-hidden": true, "data-selected": selected ? "" : undefined },
  });
  return selected ? element : null;
}

export interface ComboboxHiddenSelectProps extends PropsWithRender<
  Omit<
    React.ComponentProps<"select">,
    | "children"
    | "value"
    | "defaultValue"
    | "multiple"
    | "name"
    | "form"
    | "required"
    | "disabled"
    | "tabIndex"
    | "aria-hidden"
  >
> {}

export function HiddenSelect(props: ComboboxHiddenSelectProps) {
  const { render, ...rest } = props;
  const combobox = useComboboxContext("HiddenSelect");
  const field = useFieldContext("HiddenSelect", true);
  const { selectRef, inputRef, value, multiple } = combobox;
  const setControl = field?.actions.setControl;
  const handleRef = React.useCallback(
    (select: HTMLSelectElement | null) => {
      selectRef.current = select;
      setControl?.(select);
    },
    [selectRef, setControl],
  );
  const settings = React.useRef(combobox);
  React.useLayoutEffect(() => {
    settings.current = combobox;
    if (selectRef.current) field?.actions.syncControl(selectRef.current);
    if (inputRef.current) field?.actions.setControlId(inputRef.current.id);
  });
  React.useEffect(() => {
    const select = selectRef.current;
    const form = select?.form;
    if (!form || !select) return;
    let timer: ReturnType<typeof setTimeout>;
    function handleReset(event: Event) {
      timer = setTimeout(() => {
        if (event.defaultPrevented) return;
        // Re-render even controlled values after the browser's native reset algorithm.
        const current = settings.current;
        const nextValue = current.reset();
        if (current.multiple) {
          for (const option of select!.options) option.selected = nextValue.includes(option.value);
        } else select!.value = nextValue[0] ?? "";
        field?.actions.syncControl(select!);
      }, 0);
    }
    form.addEventListener("reset", handleReset);
    return () => {
      clearTimeout(timer);
      form.removeEventListener("reset", handleReset);
    };
  }, [selectRef, combobox.form, field?.actions]);
  return useRender({
    defaultTagName: "select",
    render,
    props: rest,
    internalProps: {
      ref: handleRef,
      value: multiple ? value : (value[0] ?? ""),
      multiple,
      name: combobox.name,
      form: combobox.form,
      disabled: combobox.disabled,
      required: combobox.required && !combobox.readOnly,
      tabIndex: -1,
      "aria-hidden": true,
      style: visuallyHiddenStyle,
      children: (
        <>
          {!multiple && <option value="" />}
          {combobox.items.map((item) => (
            <option key={item.value} value={item.value} disabled={item.disabled}>
              {item.label}
            </option>
          ))}
        </>
      ),
      onChange() {
        if (multiple) {
          for (const option of selectRef.current!.options)
            option.selected = value.includes(option.value);
        } else selectRef.current!.value = value[0] ?? "";
      },
      onFocus() {
        inputRef.current?.focus({ preventScroll: true });
      },
      onInvalid(event: React.InvalidEvent<HTMLSelectElement>) {
        if (!event.defaultPrevented) field?.actions.handleInvalid(event.currentTarget);
      },
    },
  });
}

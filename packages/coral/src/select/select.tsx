"use client";

import * as React from "react";

import {
  createPartContext,
  focusElement,
  isElementAvailableForFocus,
  joinIds,
  useRender,
  visuallyHiddenStyle,
  type PropsWithRender,
} from "../core";
import { useFieldContext } from "../field/field-context";
import { useFieldsetContext } from "../fieldset/fieldset-context";
import { Portal as BasePortal, type PortalProps } from "../portal";
import {
  Positioner as BasePositioner,
  type PositionerPlacement,
  type PositionerProps,
} from "../positioner";

export interface SelectItem {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectChangeEventDetails {
  readonly reason:
    | "trigger-press"
    | "item-press"
    | "keyboard"
    | "typeahead"
    | "escape-key"
    | "tab-key"
    | "outside-press"
    | "focus-outside"
    | "native-change";
  readonly event: Event;
  readonly isCanceled: boolean;
  cancel: () => void;
}

interface SelectRootBaseProps extends PropsWithRender<
  Omit<React.ComponentProps<"div">, "defaultValue" | "onChange">
> {
  items: readonly SelectItem[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean, details: SelectChangeEventDetails) => void;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  form?: string;
}

export type SelectRootProps = SelectRootBaseProps &
  (
    | {
        multiple?: false;
        value?: string | null;
        defaultValue?: string | null;
        onValueChange?: (value: string | null, details: SelectChangeEventDetails) => void;
      }
    | {
        multiple: true;
        value?: readonly string[];
        defaultValue?: readonly string[];
        onValueChange?: (value: string[], details: SelectChangeEventDetails) => void;
      }
  );

type Entry = "selected" | "first" | "last" | { query: string };
interface SelectContextValue {
  items: readonly SelectItem[];
  value: readonly string[];
  multiple: boolean;
  disabled: boolean;
  readOnly: boolean;
  required: boolean;
  name: string | undefined;
  form: string | undefined;
  open: boolean;
  ready: boolean;
  setReady: React.Dispatch<React.SetStateAction<boolean>>;
  activeId: string | null;
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>;
  listId: string;
  triggerId: string;
  defaultTriggerId: string;
  setTriggerId: React.Dispatch<React.SetStateAction<string>>;
  valueId: string | undefined;
  defaultValueId: string;
  setValueId: React.Dispatch<React.SetStateAction<string | undefined>>;
  triggerRef: React.RefObject<HTMLElement | null>;
  listRef: React.RefObject<HTMLDivElement | null>;
  positionerRef: React.RefObject<HTMLDivElement | null>;
  selectRef: React.RefObject<HTMLSelectElement | null>;
  entry: React.RefObject<Entry>;
  changeOpen: (open: boolean, details: SelectChangeEventDetails, entry?: Entry) => boolean;
  changeValue: (value: string[], details: SelectChangeEventDetails) => boolean;
  select: (item: HTMLElement, details: SelectChangeEventDetails) => boolean;
  finish: (details: SelectChangeEventDetails, commit?: boolean) => boolean;
  handleKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
  reset: () => string[];
}

const [SelectContext, useSelectContext] = createPartContext<SelectContextValue>("Select");
const [ItemContext, useItemContext] = createPartContext<boolean>("Select.Item");
const [GroupContext, useGroupContext] = createPartContext<{
  defaultLabelId: string;
  setLabelId: React.Dispatch<React.SetStateAction<string | undefined>>;
}>("Select", "Group");

function createDetails(reason: SelectChangeEventDetails["reason"], event: Event) {
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
  items: readonly SelectItem[],
  multiple: boolean,
) {
  const values = typeof valueProp === "string" ? [valueProp] : (valueProp ?? []);
  const valid = [...new Set(values)].filter((value) => items.some((item) => item.value === value));
  return multiple ? valid : valid.slice(0, 1);
}

function getItems(select: SelectContextValue) {
  return [...(select.listRef.current?.querySelectorAll<HTMLElement>("[data-select-item]") ?? [])]
    .filter((item) => item.dataset.selectItem === select.listId)
    .filter(
      (item) => item.getAttribute("aria-disabled") !== "true" && isElementAvailableForFocus(item),
    );
}

function highlight(select: SelectContextValue, item: HTMLElement | undefined) {
  select.setActiveId(item?.id ?? null);
  item?.scrollIntoView({ block: "nearest", inline: "nearest" });
}

function isInteractive(select: SelectContextValue) {
  return !select.disabled && !select.readOnly && !select.triggerRef.current?.matches(":disabled");
}

function findMatch(items: HTMLElement[], query: string, start = 0) {
  return Array.from(
    { length: items.length },
    (_, offset) => items[(start + offset) % items.length]!,
  ).find((item) => item.dataset.textValue!.toLocaleLowerCase().startsWith(query));
}

function getNextItem(items: HTMLElement[], index: number, key: string) {
  const lastIndex = items.length - 1;
  switch (key) {
    case "Home":
      return items[0];
    case "End":
      return items[lastIndex];
    case "ArrowDown":
      return items[Math.min(index + 1, lastIndex)];
    case "ArrowUp":
      return items[index < 0 ? lastIndex : Math.max(index - 1, 0)];
    case "PageDown":
      return items[index < 0 ? 0 : Math.min(index + 10, lastIndex)];
    case "PageUp":
      return items[index < 0 ? lastIndex : Math.max(index - 10, 0)];
  }
  return undefined;
}

function syncNativeValue(element: HTMLSelectElement, value: readonly string[]) {
  if (element.multiple) {
    for (const option of element.options) option.selected = value.includes(option.value);
  } else element.value = value[0] ?? "";
}

export function Root(props: SelectRootProps) {
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
  )
    throw new Error("Select.Root items require unique, non-empty values.");
  const field = useFieldContext("Root", true);
  const fieldsetDisabled = useFieldsetContext("Root", true) ?? false;
  const disabled = disabledProp || fieldsetDisabled || field?.state.disabled === true;
  const [uncontrolledValue, setValue] = React.useState(() =>
    normalizeValue(defaultValue, items, multiple),
  );
  const [uncontrolledOpen, setOpen] = React.useState(defaultOpen);
  const [ready, setReady] = React.useState(false);
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [pendingChange, setPendingChange] = React.useState(false);
  const id = React.useId();
  const defaultTriggerId = `${id}-select-trigger`;
  const [triggerId, setTriggerId] = React.useState(defaultTriggerId);
  const [valueId, setValueId] = React.useState<string>();
  const triggerRef = React.useRef<HTMLElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);
  const positionerRef = React.useRef<HTMLDivElement>(null);
  const selectRef = React.useRef<HTMLSelectElement>(null);
  const entry = React.useRef<Entry>("selected");
  const search = React.useRef("");
  const searchTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const value = normalizeValue(
    valueProp === undefined ? uncontrolledValue : valueProp,
    items,
    multiple,
  );
  const open = (openProp ?? uncontrolledOpen) && !disabled && !readOnly;

  React.useLayoutEffect(() => {
    if (!open) {
      setActiveId(null);
      search.current = "";
      clearTimeout(searchTimer.current);
    }
  }, [open]);

  React.useEffect(() => () => clearTimeout(searchTimer.current), []);

  React.useLayoutEffect(() => {
    if (pendingChange) {
      setPendingChange(false);
      if (selectRef.current) field?.actions.handleChange(selectRef.current);
    }
  });

  function changeValue(nextValue: string[], details: SelectChangeEventDetails) {
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

  function changeOpen(
    nextOpen: boolean,
    details: SelectChangeEventDetails,
    nextEntry: Entry = "selected",
  ) {
    if (nextOpen === open) return true;
    if (nextOpen && !isInteractive(context)) return false;
    onOpenChange?.(nextOpen, details);
    if (details.isCanceled) return false;
    if (nextOpen) entry.current = nextEntry;
    if (openProp === undefined) setOpen(nextOpen);
    return true;
  }

  function select(item: HTMLElement, details: SelectChangeEventDetails) {
    if (!getItems(context).includes(item)) return false;
    const itemValue = item.dataset.value!;
    const nextValue = multiple
      ? value.includes(itemValue)
        ? value.filter((selectedValue) => selectedValue !== itemValue)
        : [...value, itemValue]
      : [itemValue];
    return changeValue(nextValue, details);
  }

  function finish(details: SelectChangeEventDetails, commit = false) {
    if (!open) return true;
    const active = getItems(context).find((item) => item.id === activeId);
    if (commit && !multiple && active && !select(active, details)) return false;
    return changeOpen(false, details);
  }

  function typeahead(key: string, details: SelectChangeEventDetails) {
    clearTimeout(searchTimer.current);
    search.current += key.toLocaleLowerCase();
    const query = [...search.current].every((character) => character === search.current[0])
      ? search.current[0]!
      : search.current;
    if (!open) changeOpen(true, details, { query });
    else {
      const options = getItems(context);
      const index = options.findIndex((item) => item.id === activeId);
      const start = query.length === 1 ? index + 1 : Math.max(index, 0);
      highlight(context, findMatch(options, query, start) ?? options[index]);
    }
    searchTimer.current = setTimeout(() => {
      search.current = "";
    }, 500);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (
      event.defaultPrevented ||
      !isInteractive(context) ||
      event.nativeEvent.isComposing ||
      event.keyCode === 229 ||
      event.ctrlKey ||
      event.metaKey
    )
      return;
    const details = (reason: SelectChangeEventDetails["reason"]) =>
      createDetails(reason, event.nativeEvent);
    if (event.key === "Tab" && open) {
      if (finish(details("tab-key"), true)) {
        if (multiple) focusElement(triggerRef.current);
      } else event.preventDefault();
      return;
    }
    if (event.key === "Escape" && open) {
      event.preventDefault();
      event.stopPropagation();
      if (finish(details("escape-key"))) focusElement(triggerRef.current);
      return;
    }
    if (event.altKey) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        changeOpen(true, details("keyboard"));
      } else if (event.key === "ArrowUp" && open) {
        event.preventDefault();
        if (finish(details("keyboard"), true)) focusElement(triggerRef.current);
      }
      return;
    }
    if (event.shiftKey && event.key.length !== 1) return;
    if (["ArrowDown", "ArrowUp", "Home", "End", "PageDown", "PageUp"].includes(event.key)) {
      event.preventDefault();
      if (!open) {
        changeOpen(
          true,
          details("keyboard"),
          event.key === "Home" ? "first" : event.key === "End" ? "last" : "selected",
        );
      } else {
        const options = getItems(context);
        const index = options.findIndex((item) => item.id === activeId);
        highlight(context, getNextItem(options, index, event.key));
      }
    } else if (event.key === "Enter" || (event.key === " " && !search.current)) {
      event.preventDefault();
      if (!open) changeOpen(true, details("keyboard"));
      else if (multiple) {
        const active = getItems(context).find((item) => item.id === activeId);
        if (active) select(active, details("item-press"));
      } else if (finish(details("item-press"), true)) focusElement(triggerRef.current);
    } else if (event.key.length === 1) {
      event.preventDefault();
      typeahead(event.key, details("typeahead"));
    }
  }

  const context: SelectContextValue = {
    items,
    value,
    multiple,
    disabled,
    readOnly,
    required,
    name: field?.meta.name ?? name,
    form,
    open,
    ready,
    setReady,
    activeId,
    setActiveId,
    triggerId,
    defaultTriggerId,
    setTriggerId,
    valueId,
    defaultValueId: `${id}-select-value`,
    setValueId,
    listId: `${id}-select-list`,
    triggerRef,
    listRef,
    positionerRef,
    selectRef,
    entry,
    changeOpen,
    changeValue,
    select,
    finish,
    handleKeyDown,
    reset() {
      const nextValue =
        valueProp === undefined ? normalizeValue(defaultValue, items, multiple) : [...value];
      if (valueProp === undefined) setValue(nextValue);
      if (openProp === undefined) setOpen(defaultOpen);
      setActiveId(null);
      return nextValue;
    },
  };
  const settings = React.useRef(context);

  React.useLayoutEffect(() => {
    settings.current = context;
  });

  React.useEffect(() => {
    if (!open) return;
    const document = triggerRef.current?.ownerDocument;
    function handleOutside(event: PointerEvent) {
      const current = settings.current;
      const path = event.composedPath();
      if (
        event.defaultPrevented ||
        path.includes(current.triggerRef.current!) ||
        path.includes(current.positionerRef.current!)
      )
        return;
      current.finish(createDetails("outside-press", event), true);
    }
    document?.addEventListener("pointerdown", handleOutside);
    return () => document?.removeEventListener("pointerdown", handleOutside);
  }, [open]);

  const element = useRender({
    defaultTagName: "div",
    render,
    props: rest,
    internalProps: {
      "data-open": open ? "" : undefined,
      "data-disabled": disabled ? "" : undefined,
      "data-readonly": readOnly ? "" : undefined,
      "data-empty": value.length === 0 ? "" : undefined,
    },
  });
  return <SelectContext value={context}>{element}</SelectContext>;
}

export interface SelectTriggerProps extends PropsWithRender<
  Omit<
    React.ComponentProps<"button">,
    "type" | "role" | "aria-controls" | "aria-expanded" | "aria-haspopup" | "aria-activedescendant"
  >
> {}
export function Trigger(props: SelectTriggerProps) {
  const { render, disabled, ...rest } = props;

  const select = useSelectContext("Trigger");
  const field = useFieldContext("Trigger", true);
  const id =
    rest.id ??
    (render?.props as React.ComponentProps<"button">)?.id ??
    field?.meta.controlId ??
    select.defaultTriggerId;

  React.useLayoutEffect(() => {
    select.setTriggerId(id);
  }, [id, select.setTriggerId]);

  return useRender({
    defaultTagName: "button",
    render,
    props: rest,
    internalProps: {
      id,
      type: "button",
      ref: select.triggerRef,
      tabIndex: disabled || select.disabled ? -1 : 0,
      role: select.multiple ? undefined : "combobox",
      disabled: disabled || select.disabled,
      "aria-disabled": select.readOnly ? true : undefined,
      "aria-haspopup": "listbox",
      "aria-expanded": select.open,
      "aria-controls": select.open ? select.listId : undefined,
      "aria-activedescendant":
        !select.multiple && select.open ? (select.activeId ?? undefined) : undefined,
      "aria-required": !select.multiple && select.required ? true : undefined,
      "aria-readonly": !select.multiple && select.readOnly ? true : undefined,
      "aria-invalid": field?.state.invalid ? true : rest["aria-invalid"],
      "aria-labelledby":
        rest["aria-labelledby"] ??
        (render?.props as React.ComponentProps<"button">)?.["aria-labelledby"] ??
        (rest["aria-label"] || (render?.props as React.ComponentProps<"button">)?.["aria-label"]
          ? undefined
          : field?.meta.labelId),
      "aria-describedby": joinIds(
        select.multiple ? select.valueId : undefined,
        rest["aria-describedby"],
        (render?.props as React.ComponentProps<"button">)?.["aria-describedby"],
        field?.meta.descriptionIds,
        field?.state.invalid ? field.meta.errorIds : undefined,
      ),
      "data-open": select.open ? "" : undefined,
      "data-empty": select.value.length === 0 ? "" : undefined,
      onMouseDown(event: React.MouseEvent<HTMLElement>) {
        // Keep presses on Value from changing WebKit's sequential focus starting point.
        if (!event.defaultPrevented && event.button === 0 && !disabled && isInteractive(select))
          event.preventDefault();
      },
      onClick(event: React.MouseEvent<HTMLElement>) {
        if (event.defaultPrevented || disabled || !isInteractive(select)) return;
        focusElement(event.currentTarget);
        select.changeOpen(!select.open, createDetails("trigger-press", event.nativeEvent));
      },
      onKeyDown(event: React.KeyboardEvent<HTMLElement>) {
        if (!disabled) select.handleKeyDown(event);
      },
      onFocus(event: React.FocusEvent<HTMLElement>) {
        if (!event.defaultPrevented) field?.actions.handleFocus();
      },
      onBlur(event: React.FocusEvent<HTMLElement>) {
        if (event.defaultPrevented || select.positionerRef.current?.contains(event.relatedTarget))
          return;
        field?.actions.handleBlur();
        select.finish(createDetails("focus-outside", event.nativeEvent), true);
      },
    },
  });
}

export interface SelectValueProps extends PropsWithRender<React.ComponentProps<"span">> {
  placeholder?: React.ReactNode;
}
export function Value(props: SelectValueProps) {
  const { render, children, placeholder, ...rest } = props;

  const select = useSelectContext("Value");
  const id =
    rest.id ?? (render?.props as React.ComponentProps<"span">)?.id ?? select.defaultValueId;

  React.useLayoutEffect(() => {
    select.setValueId(id);
    return () => select.setValueId(undefined);
  }, [id, select.setValueId]);

  return useRender({
    defaultTagName: "span",
    render,
    props: {
      ...rest,
      children:
        children ??
        (select.value.length
          ? select.value
              .map((value) => select.items.find((item) => item.value === value)!.label)
              .join(", ")
          : placeholder),
    },
    internalProps: { id, "data-empty": select.value.length === 0 ? "" : undefined },
  });
}

export interface SelectPortalProps extends PortalProps {}
export function Portal(props: SelectPortalProps) {
  return useSelectContext("Portal").open ? <BasePortal {...props} /> : null;
}

export interface SelectPositionerProps extends Omit<
  PositionerProps,
  "open" | "anchorRef" | "arrowElement" | "onPlacementChange" | "side"
> {
  side?: "top" | "bottom";
}
export function Positioner(props: SelectPositionerProps) {
  const {
    side = "bottom",
    align = "start",
    sideOffset = 0,
    collisionPadding = 8,
    render,
    ...rest
  } = props;

  const select = useSelectContext("Positioner");
  const handlePlacementChange = React.useCallback(
    (placement: PositionerPlacement | null) => select.setReady(placement !== null),
    [select.setReady],
  );
  const element = useRender({
    defaultTagName: "div",
    render,
    props: rest,
    defaultProps: { style: { pointerEvents: "none" } },
    internalProps: { ref: select.positionerRef },
  });
  return (
    <BasePositioner
      open={select.open}
      anchorRef={select.triggerRef}
      side={side}
      align={align}
      sideOffset={sideOffset}
      collisionPadding={collisionPadding}
      onPlacementChange={handlePlacementChange}
      render={element}
    />
  );
}

export interface SelectListProps extends PropsWithRender<
  Omit<
    React.ComponentProps<"div">,
    "id" | "role" | "tabIndex" | "aria-multiselectable" | "aria-activedescendant"
  >
> {}
export function List(props: SelectListProps) {
  const { render, ...rest } = props;

  const select = useSelectContext("List");
  const field = useFieldContext("List", true);
  const { open, ready, listRef, multiple, activeId, setActiveId, entry } = select;

  React.useLayoutEffect(() => {
    if (!open || !ready) return;
    const items = getItems(select);
    const target = entry.current;
    highlight(
      select,
      target === "first"
        ? items[0]
        : target === "last"
          ? items.at(-1)
          : typeof target === "object"
            ? findMatch(items, target.query)
            : (items.find((item) => select.value.includes(item.dataset.value!)) ?? items[0]),
    );
    if (multiple) focusElement(listRef.current);
  }, [open, ready, listRef, multiple, entry]);

  React.useEffect(() => {
    const list = listRef.current;
    if (!open || !ready || !list) return;
    function validateActive() {
      if (activeId && !getItems(select).some((item) => item.id === activeId))
        highlight(select, getItems(select)[0]);
    }
    validateActive();
    const observer = new MutationObserver(validateActive);
    observer.observe(list, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["id", "hidden", "inert", "aria-disabled", "style", "class"],
    });
    return () => observer.disconnect();
  }, [open, ready, listRef, activeId, setActiveId]);

  const element = useRender({
    defaultTagName: "div",
    render,
    props: rest,
    defaultProps: {
      style: { pointerEvents: "auto" },
      "aria-labelledby":
        rest["aria-label"] || (render?.props as React.ComponentProps<"div">)?.["aria-label"]
          ? undefined
          : (field?.meta.labelId ?? select.triggerId),
    },
    internalProps: {
      id: select.listId,
      ref: listRef,
      role: "listbox",
      tabIndex: -1,
      "aria-multiselectable": multiple ? true : undefined,
      "aria-activedescendant": multiple ? (activeId ?? undefined) : undefined,
      "aria-required": multiple && select.required ? true : undefined,
      "data-open": open ? "" : undefined,
      onKeyDown(event: React.KeyboardEvent<HTMLElement>) {
        if (multiple) select.handleKeyDown(event);
      },
      onBlur(event: React.FocusEvent<HTMLDivElement>) {
        if (
          event.defaultPrevented ||
          event.relatedTarget === select.triggerRef.current ||
          select.positionerRef.current?.contains(event.relatedTarget)
        )
          return;
        field?.actions.handleBlur();
        select.finish(createDetails("focus-outside", event.nativeEvent), true);
      },
    },
  });
  return open ? element : null;
}

export interface SelectGroupProps extends PropsWithRender<
  Omit<React.ComponentProps<"div">, "role">
> {}
export function Group(props: SelectGroupProps) {
  const { render, ...rest } = props;

  useSelectContext("Group");
  const id = React.useId();
  const [labelId, setLabelId] = React.useState<string>();
  const element = useRender({
    defaultTagName: "div",
    render,
    props: rest,
    defaultProps: {
      "aria-labelledby":
        rest["aria-label"] || (render?.props as React.ComponentProps<"div">)?.["aria-label"]
          ? undefined
          : labelId,
    },
    internalProps: { role: "group" },
  });
  return (
    <GroupContext value={{ defaultLabelId: `${id}-select-group-label`, setLabelId }}>
      {element}
    </GroupContext>
  );
}

export interface SelectGroupLabelProps extends PropsWithRender<React.ComponentProps<"div">> {}
export function GroupLabel(props: SelectGroupLabelProps) {
  const { render, ...rest } = props;

  const group = useGroupContext("GroupLabel");
  const id = rest.id ?? (render?.props as React.ComponentProps<"div">)?.id ?? group.defaultLabelId;

  React.useLayoutEffect(() => {
    group.setLabelId(id);
    return () => group.setLabelId(undefined);
  }, [id, group.setLabelId]);

  return useRender({
    defaultTagName: "div",
    render,
    props: rest,
    internalProps: { id },
  });
}

export interface SelectItemProps extends PropsWithRender<
  Omit<React.ComponentProps<"div">, "role" | "tabIndex" | "aria-selected" | "aria-disabled">
> {
  value: string;
}
export function Item(props: SelectItemProps) {
  const { value, render, children, ...rest } = props;

  const select = useSelectContext("Item");
  const generatedId = React.useId();
  const id = rest.id ?? (render?.props as React.ComponentProps<"div">)?.id ?? `${generatedId}-item`;
  const item = select.items.find((option) => option.value === value);
  const selected = select.value.includes(value);
  const disabled = item?.disabled === true;
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
      "data-select-item": select.listId,
      "data-value": value,
      "data-text-value": item?.label,
      "data-selected": selected ? "" : undefined,
      "data-highlighted": select.activeId === id ? "" : undefined,
      "data-disabled": disabled ? "" : undefined,
      onMouseDown(event: React.MouseEvent<HTMLDivElement>) {
        if (!event.defaultPrevented && event.button === 0) event.preventDefault();
      },
      onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
        if (
          !event.defaultPrevented &&
          event.pointerType !== "touch" &&
          !disabled &&
          isInteractive(select)
        )
          select.setActiveId(id);
      },
      onClick(event: React.MouseEvent<HTMLDivElement>) {
        if (
          event.defaultPrevented ||
          disabled ||
          !select.select(event.currentTarget, createDetails("item-press", event.nativeEvent))
        )
          return;
        if (!select.multiple) {
          select.changeOpen(false, createDetails("item-press", event.nativeEvent));
          focusElement(select.triggerRef.current);
        } else focusElement(select.listRef.current);
      },
    },
  });
  return item ? <ItemContext value={selected}>{element}</ItemContext> : null;
}

export interface SelectItemIndicatorProps extends PropsWithRender<
  Omit<React.ComponentProps<"span">, "aria-hidden">
> {}
export function ItemIndicator(props: SelectItemIndicatorProps) {
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

export interface SelectHiddenSelectProps extends PropsWithRender<
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
export function HiddenSelect(props: SelectHiddenSelectProps) {
  const { render, ...rest } = props;

  const select = useSelectContext("HiddenSelect");
  const field = useFieldContext("HiddenSelect", true);
  const { selectRef, triggerRef, value, multiple } = select;
  const setControl = field?.actions.setControl;
  const handleRef = React.useCallback(
    (element: HTMLSelectElement | null) => {
      selectRef.current = element;
      setControl?.(element);
    },
    [selectRef, setControl],
  );
  const settings = React.useRef(select);

  React.useLayoutEffect(() => {
    settings.current = select;
    if (selectRef.current) field?.actions.syncControl(selectRef.current);
    if (triggerRef.current) field?.actions.setControlId(triggerRef.current.id);
  });

  React.useEffect(() => {
    const element = selectRef.current;
    const form = element?.form;
    if (!form || !element) return;
    let timer: ReturnType<typeof setTimeout>;
    function handleReset(event: Event) {
      timer = setTimeout(() => {
        if (event.defaultPrevented) return;
        syncNativeValue(element!, settings.current.reset());
        field?.actions.syncControl(element!);
      }, 0);
    }
    form.addEventListener("reset", handleReset);
    return () => {
      clearTimeout(timer);
      form.removeEventListener("reset", handleReset);
    };
  }, [selectRef, select.form, field?.actions]);

  return useRender({
    defaultTagName: "select",
    render,
    props: rest,
    internalProps: {
      ref: handleRef,
      value: multiple ? value : (value[0] ?? ""),
      multiple,
      name: select.name,
      form: select.form,
      disabled: select.disabled,
      required: select.required && !select.readOnly,
      tabIndex: -1,
      "aria-hidden": true,
      style: visuallyHiddenStyle,
      children: (
        <>
          {!multiple && <option value="" />}
          {select.items.map((item) => (
            <option key={item.value} value={item.value} disabled={item.disabled}>
              {item.label}
            </option>
          ))}
        </>
      ),
      onChange(event: React.ChangeEvent<HTMLSelectElement>) {
        if (!event.defaultPrevented) {
          const next = normalizeValue(
            Array.from(event.currentTarget.selectedOptions, (option) => option.value),
            select.items,
            multiple,
          );
          select.changeValue(next, createDetails("native-change", event.nativeEvent));
        }
        syncNativeValue(event.currentTarget, value);
      },
      onFocus() {
        focusElement(triggerRef.current);
      },
      onInvalid(event: React.InvalidEvent<HTMLSelectElement>) {
        if (!event.defaultPrevented) field?.actions.handleInvalid(event.currentTarget);
      },
    },
  });
}

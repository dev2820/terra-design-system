import type { ElementProps, NormalizeProps } from "@bison/core";

interface AccordionCommonProps {
  id: string;
  collapsible?: boolean;
}

interface AccordionSingleProps extends AccordionCommonProps {
  multiple?: false;
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (details: ValueChangeDetails<false>) => void;
}

interface AccordionMultipleProps extends AccordionCommonProps {
  multiple: true;
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (details: ValueChangeDetails<true>) => void;
}

type AccordionValue<Multiple extends boolean> = Multiple extends true ? string[] : string | null;

export type AccordionProps<Multiple extends boolean = boolean> = Multiple extends true
  ? AccordionMultipleProps
  : AccordionSingleProps;

export interface ValueChangeDetails<Multiple extends boolean = boolean> {
  value: AccordionValue<Multiple>;
}

export interface AccordionState {
  value: string[];
}

export type AccordionEvent =
  | {
      type: "trigger.activate";
      value: string;
    }
  | {
      type: "value.set";
      value: string[];
    };

export interface AccordionSnapshot<Multiple extends boolean = boolean> {
  props: AccordionProps<Multiple>;
  state: AccordionState;
}

export interface AccordionActor<Multiple extends boolean = boolean> {
  getSnapshot: () => AccordionSnapshot<Multiple>;
  send: (event: AccordionEvent) => void;
}

export interface AccordionItemProps {
  value: string;
}

export interface AccordionPanelProps extends AccordionItemProps {
  region?: boolean;
}

export interface AccordionItemState {
  expanded: boolean;
  collapsible: boolean;
}

interface AccordionPropTypes {
  element: unknown;
  button: unknown;
}

type DefaultAccordionPropTypes = {
  element: ElementProps;
  button: ElementProps;
};

export interface AccordionApi<
  Multiple extends boolean = boolean,
  Props extends AccordionPropTypes = DefaultAccordionPropTypes,
> {
  value: AccordionValue<Multiple>;
  setValue: (value: AccordionValue<Multiple>) => void;
  getItemState: (props: AccordionItemProps) => AccordionItemState;
  getTriggerProps: (props: AccordionItemProps) => Props["button"];
  getPanelProps: (props: AccordionPanelProps) => Props["element"];
}

function normalizeValue(value: string[], props: AccordionProps) {
  return props.multiple ? [...value] : value.slice(0, 1);
}

function getInitialValue(props: AccordionProps) {
  if (props.multiple) {
    return [...(props.defaultValue ?? [])];
  }

  return props.defaultValue == null ? [] : [props.defaultValue];
}

function getValue(state: AccordionState, props: AccordionProps) {
  if (props.value === undefined) {
    return state.value;
  }

  if (props.multiple) {
    return props.value;
  }

  return props.value === null ? [] : [props.value];
}

function toInternalValue(value: AccordionValue<boolean>) {
  if (Array.isArray(value)) {
    return value;
  }

  return value === null ? [] : [value];
}

function toPublicValue(value: string[], props: AccordionProps) {
  return props.multiple ? value : (value[0] ?? null);
}

function notifyValueChange(props: AccordionProps, value: string[]) {
  if (props.multiple) {
    props.onValueChange?.({ value });
    return;
  }

  props.onValueChange?.({ value: value[0] ?? null });
}

function canCollapse(props: AccordionProps) {
  return props.multiple === true || props.collapsible === true;
}

function isEqual(a: string[], b: string[]) {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

export const machine = {
  initial(props: AccordionProps): AccordionState {
    return {
      value: getInitialValue(props),
    };
  },

  transition(state: AccordionState, event: AccordionEvent, props: AccordionProps): AccordionState {
    const currentValue = getValue(state, props);
    let nextValue: string[];

    switch (event.type) {
      case "trigger.activate": {
        const expanded = currentValue.includes(event.value);

        if (expanded) {
          if (!canCollapse(props)) {
            return state;
          }

          nextValue = currentValue.filter((value) => value !== event.value);
        } else if (props.multiple) {
          nextValue = [...currentValue, event.value];
        } else {
          nextValue = [event.value];
        }

        break;
      }

      case "value.set": {
        nextValue = normalizeValue(event.value, props);
        break;
      }
    }

    if (isEqual(currentValue, nextValue)) {
      return state;
    }

    notifyValueChange(props, nextValue);

    return { value: nextValue };
  },
};

function getTriggerId(id: string, value: string) {
  return `${id}-trigger-${encodeURIComponent(value)}`;
}

function getPanelId(id: string, value: string) {
  return `${id}-panel-${encodeURIComponent(value)}`;
}

export function connect<Props extends AccordionPropTypes>(
  actor: AccordionActor<false>,
  normalize: NormalizeProps<Props>,
): AccordionApi<false, Props>;
export function connect<Props extends AccordionPropTypes>(
  actor: AccordionActor<true>,
  normalize: NormalizeProps<Props>,
): AccordionApi<true, Props>;
export function connect<Props extends AccordionPropTypes>(
  actor: AccordionActor,
  normalize: NormalizeProps<Props>,
): AccordionApi<boolean, Props>;
export function connect(
  actor: AccordionActor,
  normalize: NormalizeProps<AccordionPropTypes>,
): AccordionApi<boolean, AccordionPropTypes> {
  const { props, state } = actor.getSnapshot();
  const value = getValue(state, props);
  const collapsible = canCollapse(props);

  function getItemState(item: AccordionItemProps): AccordionItemState {
    return {
      expanded: value.includes(item.value),
      collapsible,
    };
  }

  return {
    value: toPublicValue(value, props),

    setValue(nextValue) {
      actor.send({ type: "value.set", value: toInternalValue(nextValue) });
    },

    getItemState,

    getTriggerProps(item) {
      const itemState = getItemState(item);
      const disabled = itemState.expanded && !itemState.collapsible;

      return normalize.button({
        type: "button",
        id: getTriggerId(props.id, item.value),
        "aria-controls": getPanelId(props.id, item.value),
        "aria-expanded": itemState.expanded,
        "aria-disabled": disabled || undefined,
        onClick() {
          actor.send({ type: "trigger.activate", value: item.value });
        },
      });
    },

    getPanelProps(item) {
      const itemState = getItemState(item);

      return normalize.element({
        id: getPanelId(props.id, item.value),
        hidden: !itemState.expanded,
        role: item.region ? "region" : undefined,
        "aria-labelledby": item.region ? getTriggerId(props.id, item.value) : undefined,
      });
    },
  };
}

export const accordion = {
  machine,
  connect,
};

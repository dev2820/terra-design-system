import type { NormalizeProps } from "@bison/core";

import { canCollapse, getValue } from "./machine";
import type {
  AccordionActor,
  AccordionApi,
  AccordionItemProps,
  AccordionItemState,
  AccordionPropTypes,
  AccordionValue,
} from "./types";

function toInternalValue(value: AccordionValue<boolean>) {
  if (Array.isArray(value)) {
    return value;
  }

  return value === null ? [] : [value];
}

function toPublicValue(value: string[], multiple: boolean) {
  return multiple ? value : (value[0] ?? null);
}

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
    value: toPublicValue(value, props.multiple === true),

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

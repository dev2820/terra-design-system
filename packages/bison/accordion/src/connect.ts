import type { Actor, NormalizeProps } from "@bison/core";

import { canCollapse, getValue } from "./machine";
import type {
  AccordionApi,
  AccordionEvent,
  AccordionItemProps,
  AccordionItemState,
  AccordionPropTypes,
  AccordionProps,
  AccordionState,
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

export function connect<MachineProps extends AccordionProps, Props extends AccordionPropTypes>(
  actor: Actor<MachineProps, AccordionState, AccordionEvent>,
  normalize: NormalizeProps<Props>,
): AccordionApi<MachineProps extends { multiple: true } ? true : false, Props> {
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
    value: toPublicValue(value, props.multiple === true) as AccordionValue<
      MachineProps extends { multiple: true } ? true : false
    >,

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

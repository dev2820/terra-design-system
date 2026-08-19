import type { AccordionEvent, AccordionProps, AccordionState } from "./types";

function normalizeValue(value: string[], props: AccordionProps) {
  return props.multiple ? [...value] : value.slice(0, 1);
}

function getInitialValue(props: AccordionProps) {
  if (props.multiple) {
    return [...(props.defaultValue ?? [])];
  }

  return props.defaultValue == null ? [] : [props.defaultValue];
}

export function getValue(state: AccordionState, props: AccordionProps) {
  if (props.value === undefined) {
    return state.value;
  }

  if (props.multiple) {
    return props.value;
  }

  return props.value === null ? [] : [props.value];
}

function notifyValueChange(props: AccordionProps, value: string[]) {
  if (props.multiple) {
    props.onValueChange?.(value);
    return;
  }

  props.onValueChange?.(value[0] ?? null);
}

export function canCollapse(props: AccordionProps) {
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

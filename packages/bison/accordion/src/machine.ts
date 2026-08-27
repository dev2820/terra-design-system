import type { AccordionEvent, AccordionProps, AccordionState } from "./types";

function normalizeValue(value: string[], props: AccordionProps) {
  return props.multiple ? [...value] : value.slice(0, 1);
}

function notifyValueChange(props: AccordionProps, value: string[]) {
  if (props.multiple) {
    props.onValueChange?.(value);
    return;
  }

  props.onValueChange?.(value[0] ?? null);
}

function isEqual(a: string[], b: string[]) {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

export const machine = {
  initial(props: AccordionProps): AccordionState {
    return {
      value: props.multiple
        ? [...(props.defaultValue ?? [])]
        : props.defaultValue == null
          ? []
          : [props.defaultValue],
    };
  },

  transition(state: AccordionState, event: AccordionEvent, props: AccordionProps): AccordionState {
    const currentValue =
      props.value === undefined
        ? state.value
        : props.multiple
          ? props.value
          : props.value === null
            ? []
            : [props.value];
    let nextValue: string[];

    switch (event.type) {
      case "trigger.activate": {
        const expanded = currentValue.includes(event.value);

        if (expanded) {
          if (props.multiple !== true && props.collapsible !== true) {
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

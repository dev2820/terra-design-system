import type { CheckboxCheckedState, CheckboxEvent, CheckboxProps, CheckboxState } from "./types";

function updateChecked(state: CheckboxState, props: CheckboxProps, checked: CheckboxCheckedState) {
  if ((props.checked ?? state.checkedState) === checked) {
    return state;
  }

  props.onCheckedChange?.(checked);

  return { checkedState: checked };
}

export const machine = {
  initial(props: CheckboxProps): CheckboxState {
    return {
      checkedState: props.defaultChecked ?? false,
    };
  },

  transition(state: CheckboxState, event: CheckboxEvent, props: CheckboxProps): CheckboxState {
    switch (event.type) {
      case "activate": {
        if (props.disabled) {
          return state;
        }

        return updateChecked(state, props, (props.checked ?? state.checkedState) !== true);
      }

      case "checked.set": {
        return updateChecked(state, props, event.checked);
      }
    }
  },
};

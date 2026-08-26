import type { ButtonEvent, ButtonProps, ButtonState } from "./types";

export function getPressed(state: ButtonState, props: ButtonProps) {
  if (props.toggle !== true) {
    return false;
  }

  return props.pressed ?? state.pressed;
}

function updatePressed(state: ButtonState, props: ButtonProps, pressed: boolean) {
  if (props.toggle !== true || getPressed(state, props) === pressed) {
    return state;
  }

  props.onPressedChange?.(pressed);

  return { pressed };
}

export const machine = {
  initial(props: ButtonProps): ButtonState {
    return {
      pressed: props.toggle === true ? (props.defaultPressed ?? false) : false,
    };
  },

  transition(state: ButtonState, event: ButtonEvent, props: ButtonProps): ButtonState {
    switch (event.type) {
      case "activate": {
        if (props.disabled) {
          return state;
        }

        props.onActivate?.();

        return updatePressed(state, props, !getPressed(state, props));
      }

      case "pressed.set": {
        return updatePressed(state, props, event.pressed);
      }
    }
  },
};

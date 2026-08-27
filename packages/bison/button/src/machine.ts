import type { ButtonEvent, ButtonProps, ButtonState } from "./types";

function updatePressed(state: ButtonState, props: ButtonProps, pressed: boolean) {
  const currentPressed = props.toggle === true ? (props.pressed ?? state.pressed) : false;

  if (props.toggle !== true || currentPressed === pressed) {
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

        return updatePressed(state, props, !(props.pressed ?? state.pressed));
      }

      case "pressed.set": {
        return updatePressed(state, props, event.pressed);
      }
    }
  },
};

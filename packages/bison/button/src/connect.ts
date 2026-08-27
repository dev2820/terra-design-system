import type { Actor, NormalizeProps } from "@bison/core";

import type { ButtonApi, ButtonEvent, ButtonPropTypes, ButtonProps, ButtonState } from "./types";

export function connect<MachineProps extends ButtonProps, Props extends ButtonPropTypes>(
  actor: Actor<MachineProps, ButtonState, ButtonEvent>,
  normalize: NormalizeProps<Props>,
): ButtonApi<MachineProps extends { toggle: true } ? true : false, Props> {
  const { props, state } = actor.getSnapshot();
  const pressed = props.toggle === true ? (props.pressed ?? state.pressed) : false;
  const api = {
    getRootProps: () =>
      normalize.button({
        type: props.type ?? "button",
        disabled: props.disabled || undefined,
        "aria-pressed": props.toggle === true ? pressed : undefined,
        onClick() {
          actor.send({ type: "activate" });
        },
      }),
  };

  if (props.toggle !== true) {
    return api as ButtonApi<MachineProps extends { toggle: true } ? true : false, Props>;
  }

  return {
    ...api,
    pressed,
    setPressed(nextPressed: boolean) {
      actor.send({ type: "pressed.set", pressed: nextPressed });
    },
  } as ButtonApi<MachineProps extends { toggle: true } ? true : false, Props>;
}

import type { Actor, NormalizeProps } from "@bison/core";

import type {
  CheckboxApi,
  CheckboxEvent,
  CheckboxProps,
  CheckboxPropTypes,
  CheckboxState,
} from "./types";

export function connect<MachineProps extends CheckboxProps, Props extends CheckboxPropTypes>(
  actor: Actor<MachineProps, CheckboxState, CheckboxEvent>,
  normalize: NormalizeProps<Props>,
): CheckboxApi<Props> {
  const { props, state } = actor.getSnapshot();
  const checkedState = props.checked ?? state.checkedState;

  return {
    checked: checkedState === true,
    indeterminate: checkedState === "indeterminate",
    checkedState,
    setChecked(checked) {
      actor.send({ type: "checked.set", checked });
    },
    getInputProps: () =>
      normalize.input({
        type: "checkbox",
        checked: checkedState === true,
        indeterminate: checkedState === "indeterminate",
        disabled: props.disabled || undefined,
        onChange() {
          actor.send({ type: "activate" });
        },
      }),
  };
}

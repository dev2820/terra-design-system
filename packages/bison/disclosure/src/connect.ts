import type { Actor, NormalizeProps } from "@bison/core";

import type {
  DisclosureApi,
  DisclosureEvent,
  DisclosureProps,
  DisclosurePropTypes,
  DisclosureState,
} from "./types";

function getContentId(id: string) {
  return `${id}-content`;
}

export function connect<MachineProps extends DisclosureProps, Props extends DisclosurePropTypes>(
  actor: Actor<MachineProps, DisclosureState, DisclosureEvent>,
  normalize: NormalizeProps<Props>,
): DisclosureApi<Props> {
  const { props, state } = actor.getSnapshot();
  const open = props.open ?? state.open;
  const contentId = getContentId(props.id);

  return {
    open,
    setOpen(nextOpen) {
      actor.send({ type: "open.set", open: nextOpen });
    },
    getTriggerProps: () =>
      normalize.button({
        type: "button",
        disabled: props.disabled || undefined,
        "aria-expanded": open,
        "aria-controls": contentId,
        onClick() {
          actor.send({ type: "toggle" });
        },
      }),
    getContentProps: () =>
      normalize.element({
        id: contentId,
        hidden: !open,
      }),
  };
}

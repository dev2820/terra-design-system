import type { Actor, NormalizeProps } from "@bison/core";

import type {
  DialogApi,
  DialogContentProps,
  DialogEvent,
  DialogPropTypes,
  DialogProps,
  DialogState,
} from "./types";

function getDialogId(id: string) {
  return `${id}-dialog`;
}

function getTriggerId(id: string) {
  return `${id}-trigger`;
}

function getTitleId(id: string) {
  return `${id}-title`;
}

function getDescriptionId(id: string) {
  return `${id}-description`;
}

export function connect<MachineProps extends DialogProps, Props extends DialogPropTypes>(
  actor: Actor<MachineProps, DialogState, DialogEvent>,
  normalize: NormalizeProps<Props>,
): DialogApi<Props> {
  const { props, state } = actor.getSnapshot();
  const open = props.open ?? state.open;
  const dialogId = getDialogId(props.id);
  const triggerId = getTriggerId(props.id);

  return {
    open,
    modal: {
      active: open,
      focus: {
        moveInside: true,
        contain: true,
        restore: true,
        initialFocusId: props.initialFocusId,
      },
      outside: {
        inert: true,
        preventScroll: true,
      },
    },

    setOpen(nextOpen) {
      actor.send({ type: "open.set", open: nextOpen });
    },

    getTriggerProps: () =>
      normalize.button({
        type: "button",
        id: triggerId,
        "aria-haspopup": "dialog",
        "aria-controls": dialogId,
        "aria-expanded": open,
        onClick() {
          actor.send({ type: "open" });
        },
      }),

    getDialogProps(content: DialogContentProps) {
      return normalize.element({
        id: dialogId,
        role: "dialog",
        hidden: !open,
        "aria-modal": true,
        "aria-label": "label" in content ? content.label : undefined,
        "aria-labelledby": content.labelledBy ? getTitleId(props.id) : undefined,
        "aria-describedby": content.describedBy ? getDescriptionId(props.id) : undefined,
        onKeyDown(event: KeyboardEvent) {
          if (event.key !== "Escape") {
            return;
          }

          event.preventDefault();
          actor.send({ type: "dismiss" });
        },
      });
    },

    getTitleProps: () => normalize.element({ id: getTitleId(props.id) }),

    getDescriptionProps: () => normalize.element({ id: getDescriptionId(props.id) }),

    getCloseTriggerProps: () =>
      normalize.button({
        type: "button",
        onClick: () => actor.send({ type: "close" }),
      }),
  };
}

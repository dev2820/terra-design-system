import type { Actor, NormalizeProps } from "@bison/core";

import type {
  AlertDialogApi,
  AlertDialogContentProps,
  AlertDialogEvent,
  AlertDialogPropTypes,
  AlertDialogProps,
  AlertDialogState,
} from "./types";

function getAlertDialogId(id: string) {
  return `${id}-alert-dialog`;
}

function getTriggerId(id: string) {
  return `${id}-trigger`;
}

function getTitleId(id: string) {
  return `${id}-title`;
}

function getMessageId(id: string) {
  return `${id}-message`;
}

export function connect<MachineProps extends AlertDialogProps, Props extends AlertDialogPropTypes>(
  actor: Actor<MachineProps, AlertDialogState, AlertDialogEvent>,
  normalize: NormalizeProps<Props>,
): AlertDialogApi<Props> {
  const { props, state } = actor.getSnapshot();
  const open = props.open ?? state.open;
  const alertDialogId = getAlertDialogId(props.id);

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
        id: getTriggerId(props.id),
        "aria-haspopup": "dialog",
        "aria-controls": alertDialogId,
        "aria-expanded": open,
        onClick() {
          actor.send({ type: "open" });
        },
      }),

    getAlertDialogProps(content: AlertDialogContentProps) {
      return normalize.element({
        id: alertDialogId,
        role: "alertdialog",
        hidden: !open,
        "aria-modal": true,
        "aria-label": "label" in content ? content.label : undefined,
        "aria-labelledby": content.labelledBy ? getTitleId(props.id) : undefined,
        "aria-describedby": getMessageId(props.id),
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

    getMessageProps: () => normalize.element({ id: getMessageId(props.id) }),

    getCloseTriggerProps: () =>
      normalize.button({
        type: "button",
        onClick: () => actor.send({ type: "close" }),
      }),
  };
}

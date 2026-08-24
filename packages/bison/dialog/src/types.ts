import type {
  Actor,
  DismissableEvent,
  DismissableProps,
  DismissableState,
  ElementProps,
  MachineSnapshot,
  PatternTypes,
} from "@bison/core";

export interface DialogProps extends DismissableProps {
  id: string;
  initialFocusId?: string;
}

export type DialogState = DismissableState;

export type DialogEvent = DismissableEvent;

export type DialogSnapshot = MachineSnapshot<DialogProps, DialogState>;

export type DialogActor = Actor<DialogProps, DialogState, DialogEvent>;

export type DialogContentProps =
  | {
      label: string;
      labelledBy?: never;
      describedBy?: boolean;
    }
  | {
      label?: never;
      labelledBy: true;
      describedBy?: boolean;
    };

export interface DialogModalContract {
  active: boolean;
  focus: {
    moveInside: true;
    contain: true;
    restore: true;
    initialFocusId: string | undefined;
  };
  outside: {
    inert: true;
    preventScroll: true;
  };
}

export interface DialogPropTypes {
  element: unknown;
  button: unknown;
}

interface DefaultDialogPropTypes {
  element: ElementProps;
  button: ElementProps;
}

export interface DialogApi<Props extends DialogPropTypes = DefaultDialogPropTypes> {
  open: boolean;
  modal: DialogModalContract;
  setOpen: (open: boolean) => void;
  getTriggerProps: () => Props["button"];
  getDialogProps: (props: DialogContentProps) => Props["element"];
  getTitleProps: () => Props["element"];
  getDescriptionProps: () => Props["element"];
  getCloseTriggerProps: () => Props["button"];
}

export interface DialogPatternTypes extends PatternTypes {
  api: this["props"] extends DialogProps
    ? this["propTypes"] extends DialogPropTypes
      ? DialogApi<this["propTypes"]>
      : never
    : never;
}

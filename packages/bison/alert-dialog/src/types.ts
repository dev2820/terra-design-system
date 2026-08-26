import type {
  Actor,
  DismissableEvent,
  DismissableState,
  ElementProps,
  MachineSnapshot,
  PatternTypes,
} from "@bison/core";
import type { DialogModalContract, DialogProps } from "@bison/dialog";

export interface AlertDialogProps extends DialogProps {}

export type AlertDialogState = DismissableState;

export type AlertDialogEvent = DismissableEvent;

export type AlertDialogSnapshot = MachineSnapshot<AlertDialogProps, AlertDialogState>;

export type AlertDialogActor = Actor<AlertDialogProps, AlertDialogState, AlertDialogEvent>;

export type AlertDialogContentProps =
  | {
      label: string;
      labelledBy?: never;
    }
  | {
      label?: never;
      labelledBy: true;
    };

export interface AlertDialogPropTypes {
  element: unknown;
  button: unknown;
}

interface DefaultAlertDialogPropTypes {
  element: ElementProps;
  button: ElementProps;
}

export interface AlertDialogApi<Props extends AlertDialogPropTypes = DefaultAlertDialogPropTypes> {
  open: boolean;
  modal: DialogModalContract;
  setOpen: (open: boolean) => void;
  getTriggerProps: () => Props["button"];
  getAlertDialogProps: (props: AlertDialogContentProps) => Props["element"];
  getTitleProps: () => Props["element"];
  getMessageProps: () => Props["element"];
  getCloseTriggerProps: () => Props["button"];
}

export interface AlertDialogPatternTypes extends PatternTypes {
  api: this["props"] extends AlertDialogProps
    ? this["propTypes"] extends AlertDialogPropTypes
      ? AlertDialogApi<this["propTypes"]>
      : never
    : never;
}

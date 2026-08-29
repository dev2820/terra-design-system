import type {
  Actor,
  ElementProps,
  MachineSnapshot,
  OpenableEvent,
  OpenableProps,
  OpenableState,
  PatternTypes,
} from "@bison/core";

export interface DisclosureProps extends OpenableProps {
  id: string;
  disabled?: boolean;
}

export type DisclosureState = OpenableState;

export type DisclosureEvent = OpenableEvent;

export type DisclosureSnapshot = MachineSnapshot<DisclosureProps, DisclosureState>;

export type DisclosureActor = Actor<DisclosureProps, DisclosureState, DisclosureEvent>;

export interface DisclosurePropTypes {
  element: unknown;
  button: unknown;
}

interface DefaultDisclosurePropTypes {
  element: ElementProps;
  button: ElementProps;
}

export interface DisclosureApi<Props extends DisclosurePropTypes = DefaultDisclosurePropTypes> {
  open: boolean;
  setOpen: (open: boolean) => void;
  getTriggerProps: () => Props["button"];
  getContentProps: () => Props["element"];
}

export interface DisclosurePatternTypes extends PatternTypes {
  api: this["props"] extends DisclosureProps
    ? this["propTypes"] extends DisclosurePropTypes
      ? DisclosureApi<this["propTypes"]>
      : never
    : never;
}

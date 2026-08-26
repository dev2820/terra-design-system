import type { Actor, ElementProps, MachineSnapshot, PatternTypes } from "@bison/core";

export type ButtonType = "button" | "submit" | "reset";

interface ButtonCommonProps {
  type?: ButtonType;
  disabled?: boolean;
  onActivate?: () => void;
}

interface CommandButtonProps extends ButtonCommonProps {
  toggle?: false;
  pressed?: never;
  defaultPressed?: never;
  onPressedChange?: never;
}

interface ToggleButtonProps extends ButtonCommonProps {
  toggle: true;
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
}

export type ButtonProps<Toggle extends boolean = boolean> = Toggle extends true
  ? ToggleButtonProps
  : CommandButtonProps;

export interface ButtonState {
  pressed: boolean;
}

export type ButtonEvent =
  | {
      type: "activate";
    }
  | {
      type: "pressed.set";
      pressed: boolean;
    };

export type ButtonSnapshot<Toggle extends boolean = boolean> = MachineSnapshot<
  ButtonProps<Toggle>,
  ButtonState
>;

export type ButtonActor<Toggle extends boolean = boolean> = Actor<
  ButtonProps<Toggle>,
  ButtonState,
  ButtonEvent
>;

export interface ButtonPropTypes {
  button: unknown;
}

interface DefaultButtonPropTypes {
  button: ElementProps;
}

interface CommandButtonApi<Props extends ButtonPropTypes> {
  getRootProps: () => Props["button"];
}

interface ToggleButtonApi<Props extends ButtonPropTypes> extends CommandButtonApi<Props> {
  pressed: boolean;
  setPressed: (pressed: boolean) => void;
}

export type ButtonApi<
  Toggle extends boolean = boolean,
  Props extends ButtonPropTypes = DefaultButtonPropTypes,
> = Toggle extends true ? ToggleButtonApi<Props> : CommandButtonApi<Props>;

export interface ButtonPatternTypes extends PatternTypes {
  api: this["props"] extends ButtonProps
    ? this["propTypes"] extends ButtonPropTypes
      ? ButtonApi<this["props"] extends { toggle: true } ? true : false, this["propTypes"]>
      : never
    : never;
}

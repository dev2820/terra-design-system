import type { Actor, ElementProps, MachineSnapshot, PatternTypes } from "@bison/core";

export type CheckboxCheckedState = boolean | "indeterminate";

export interface CheckboxProps {
  checked?: CheckboxCheckedState;
  defaultChecked?: CheckboxCheckedState;
  disabled?: boolean;
  onCheckedChange?: (checked: CheckboxCheckedState) => void;
}

export interface CheckboxState {
  checkedState: CheckboxCheckedState;
}

export type CheckboxEvent =
  | {
      type: "activate";
    }
  | {
      type: "checked.set";
      checked: CheckboxCheckedState;
    };

export type CheckboxSnapshot = MachineSnapshot<CheckboxProps, CheckboxState>;

export type CheckboxActor = Actor<CheckboxProps, CheckboxState, CheckboxEvent>;

export interface CheckboxPropTypes {
  input: unknown;
}

interface DefaultCheckboxPropTypes {
  input: ElementProps;
}

export interface CheckboxApi<Props extends CheckboxPropTypes = DefaultCheckboxPropTypes> {
  checked: boolean;
  indeterminate: boolean;
  checkedState: CheckboxCheckedState;
  setChecked: (checked: CheckboxCheckedState) => void;
  getInputProps: () => Props["input"];
}

export interface CheckboxPatternTypes extends PatternTypes {
  api: this["props"] extends CheckboxProps
    ? this["propTypes"] extends CheckboxPropTypes
      ? CheckboxApi<this["propTypes"]>
      : never
    : never;
}

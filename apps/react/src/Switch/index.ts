import { Root, HiddenInput, Control, Thumb, Label } from './Switch';
import {
  RootProps,
  HiddenInputProps,
  ControlProps,
  ThumbProps,
  LabelProps,
} from './Switch';

export const Switch = {
  Root,
  HiddenInput,
  Control,
  Thumb,
  Label,
};

export type * from '@ark-ui/react/switch';
export type SwitchProps = {
  Root: RootProps;
  HiddenInput: HiddenInputProps;
  Control: ControlProps;
  Thumb: ThumbProps;
  Label: LabelProps;
};

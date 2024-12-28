import { Root, Label, HelperText, ErrorText } from './Field';
import type {
  RootProps,
  LabelProps,
  HelperTextProps,
  ErrorTextProps,
} from './Field';

export const Field = {
  Root,
  Label,
  HelperText,
  ErrorText,
};

export type * from '@ark-ui/react/field';
export type FieldProps = {
  Root: RootProps;
  Label: LabelProps;
  HelperText: HelperTextProps;
  ErrorText: ErrorTextProps;
};

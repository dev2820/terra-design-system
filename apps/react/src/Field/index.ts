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

export type FieldProps = {
  root: RootProps;
  label: LabelProps;
  helperText: HelperTextProps;
  errorText: ErrorTextProps;
};

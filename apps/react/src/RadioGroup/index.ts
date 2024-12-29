import {
  Root,
  Item,
  ItemControl,
  ItemText,
  ItemHiddenInput,
  Label,
  Indicator,
} from './RadioGroup';
import type {
  RootProps,
  ItemProps,
  ItemControlProps,
  ItemTextProps,
  ItemHiddenInputProps,
  LabelProps,
  IndicatorProps,
} from './RadioGroup';

export const RadioGroup = {
  Root,
  Item,
  ItemControl,
  ItemText,
  ItemHiddenInput,
  Label,
  Indicator,
};
export type * from '@ark-ui/react/radio-group';
export type RadioGroupProps = {
  Root: RootProps;
  Item: ItemProps;
  ItemControl: ItemControlProps;
  ItemText: ItemTextProps;
  ItemHiddenInput: ItemHiddenInputProps;
  Label: LabelProps;
  Indicator: IndicatorProps;
};

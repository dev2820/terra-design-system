import {
  Root,
  Item,
  Indicator,
  ItemControl,
  ItemText,
  ItemHiddenInput,
} from './SegmentGroup';
import type {
  RootProps,
  ItemProps,
  IndicatorProps,
  ItemControlProps,
  ItemTextProps,
  ItemHiddenInputProps,
} from './SegmentGroup';

export const SegmentGroup = {
  Root,
  Item,
  Indicator,
  ItemControl,
  ItemText,
  ItemHiddenInput,
};
export type * from '@ark-ui/react/segment-group';
export type SegmentGroupProps = {
  Root: RootProps;
  Item: ItemProps;
  Indicator: IndicatorProps;
  ItemControl: ItemControlProps;
  ItemText: ItemTextProps;
  ItemHiddenInput: ItemHiddenInputProps;
};

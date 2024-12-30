import {
  Root,
  Thumb,
  Track,
  Control,
  Range,
  HiddenInput,
  Marker,
  MarkerGroup,
  Label,
  ValueText,
} from './Slider';
import type {
  RootProps,
  ThumbProps,
  TrackProps,
  ControlProps,
  RangeProps,
  HiddenInputProps,
  MarkerProps,
  MarkerGroupProps,
  LabelProps,
  ValueTextProps,
} from './Slider';

export const Slider = {
  Root,
  Thumb,
  Track,
  Control,
  Range,
  HiddenInput,
  Marker,
  MarkerGroup,
  Label,
  ValueText,
};

export type * from '@ark-ui/react/slider';
export type SliderProps = {
  Root: RootProps;
  Thumb: ThumbProps;
  Track: TrackProps;
  Control: ControlProps;
  Range: RangeProps;
  HiddenInput: HiddenInputProps;
  Marker: MarkerProps;
  MarkerGroup: MarkerGroupProps;
  Label: LabelProps;
  ValueText: ValueTextProps;
};

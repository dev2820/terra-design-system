import {
  Area,
  AreaBackground,
  AreaThumb,
  EyeDropperTrigger,
  TransparencyGrid,
  ChannelInput,
  ChannelSlider,
  ChannelSliderThumb,
  ChannelSliderTrack,
  Context,
  Content,
  Trigger,
  Control,
  Positioner,
  Root,
  Swatch,
  SwatchGroup,
  SwatchTrigger,
  type RootProps,
  type SwatchTriggerProps,
  type SwatchProps,
  type SwatchGroupProps,
  type EyeDropperTriggerProps,
  type TransparencyGridProps,
  type ContextProps,
  type ContentProps,
  type TriggerProps,
  type ControlProps,
  type AreaBackgroundProps,
  type AreaThumbProps,
  type AreaProps,
  type PositionerProps,
  type ChannelInputProps,
  type ChannelSliderProps,
  type ChannelSliderThumbProps,
  type ChannelSliderTrackProps,
} from './ColorPicker';

export const ColorPicker = {
  Root,
  SwatchTrigger,
  Swatch,
  SwatchGroup,
  Context,
  EyeDropperTrigger,
  TransparencyGrid,
  Content,
  Trigger,
  Control,
  AreaBackground,
  AreaThumb,
  Area,
  Positioner,
  ChannelInput,
  ChannelSlider,
  ChannelSliderThumb,
  ChannelSliderTrack,
};

export type * from '@ark-ui/react/color-picker';
export type ColorPickerProps = {
  root: RootProps;
  Root: RootProps;
  Swatch: SwatchProps;
  SwatchTrigger: SwatchTriggerProps;
  SwatchGroup: SwatchGroupProps;
  EyeDropperTrigger: EyeDropperTriggerProps;
  TransparencyGrid: TransparencyGridProps;
  Control: ControlProps;
  Content: ContentProps;
  Context: ContextProps;
  Trigger: TriggerProps;
  AreaThumb: AreaThumbProps;
  AreaBackground: AreaBackgroundProps;
  Area: AreaProps;
  ChannelInput: ChannelInputProps;
  ChannelSlider: ChannelSliderProps;
  Positioner: PositionerProps;
  ChannelSliderThumb: ChannelSliderThumbProps;
  ChannelSliderTrack: ChannelSliderTrackProps;
};

import {
  Root,
  Item,
  Control,
  Viewport,
  PrevTrigger,
  NextTrigger,
  IndicatorGroup,
  Indicator,
  ItemGroup,
  type RootProps,
  type ItemProps,
  type ControlProps,
  type ViewportProps,
  type PrevTriggerProps,
  type NextTriggerProps,
  type IndicatorGroupProps,
  type IndicatorProps,
  type ItemGroupProps,
} from './Carousel';

export const Carousel = {
  Root,
  Control,
  Viewport,
  PrevTrigger,
  NextTrigger,
  IndicatorGroup,
  Indicator,
  ItemGroup,
  Item,
};
export type * from '@ark-ui/react/carousel';
export type CarouselProps = {
  Root: RootProps;
  Item: ItemProps;
  Control: ControlProps;
  Viewport: ViewportProps;
  PrevTrigger: PrevTriggerProps;
  NextTrigger: NextTriggerProps;
  IndicatorGroup: IndicatorGroupProps;
  Indicator: IndicatorProps;
  ItemGroup: ItemGroupProps;
};

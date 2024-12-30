import {
  Root,
  Item,
  ItemText,
  ValueText,
  ItemIndicator,
  ItemGroup,
  ItemGroupLabel,
  Trigger,
  Content,
  Control,
  Positioner,
  HiddenSelect,
  ClearTrigger,
  Indicator,
  Label,
} from './Select';
import type {
  RootProps,
  ItemProps,
  ItemTextProps,
  ValueTextProps,
  ItemIndicatorProps,
  ItemGroupProps,
  ItemGroupLabelProps,
  TriggerProps,
  ContentProps,
  ControlProps,
  PositionerProps,
  HiddenSelectProps,
  IndicatorProps,
  ClearTriggerProps,
  LabelProps,
} from './Select';

export const Select = {
  Root,
  Item,
  ItemText,
  ValueText,
  ItemIndicator,
  ItemGroup,
  ItemGroupLabel,
  Trigger,
  Content,
  Control,
  Positioner,
  HiddenSelect,
  ClearTrigger,
  Indicator,
  Label,
};

export type * from '@ark-ui/react/select';
export type SelectProps = {
  Root: RootProps;
  Item: ItemProps;
  Indicator: IndicatorProps;
  ItemText: ItemTextProps;
  ValueText: ValueTextProps;
  ItemIndicator: ItemIndicatorProps;
  ItemGroup: ItemGroupProps;
  ItemGroupLabel: ItemGroupLabelProps;
  Trigger: TriggerProps;
  Content: ContentProps;
  Control: ControlProps;
  Positioner: PositionerProps;
  HiddenSelect: HiddenSelectProps;
  ClearTrigger: ClearTriggerProps;
  Label: LabelProps;
};

import {
  Root,
  ItemGroup,
  Item,
  Control,
  Content,
  Input,
  ItemGroupLabel,
  ItemIndicator,
  ItemText,
  Positioner,
  Trigger,
  ClearTrigger,
} from './Combobox';
import type {
  RootProps,
  ItemGroupProps,
  ItemProps,
  ControlProps,
  ContentProps,
  InputProps,
  ItemGroupLabelProps,
  ItemIndicatorProps,
  ItemTextProps,
  PositionerProps,
  TriggerProps,
  ClearTriggerProps,
} from './Combobox';

export const Combobox = {
  Root,
  Item,
  Content,
  ItemGroup,
  ItemGroupLabel,
  ItemText,
  ItemIndicator,
  Positioner,
  Control,
  Trigger,
  Input,
  ClearTrigger,
};

export type * from '@ark-ui/react/combobox';
export type ComboboxProps = {
  Root: RootProps;
  Content: ContentProps;
  ItemGroup: ItemGroupProps;
  Item: ItemProps;
  ItemGroupLabel: ItemGroupLabelProps;
  ItemText: ItemTextProps;
  ItemIndicator: ItemIndicatorProps;
  Positioner: PositionerProps;
  Control: ControlProps;
  Trigger: TriggerProps;
  Input: InputProps;
  ClearTrigger: ClearTriggerProps;
};

import {
  Root,
  Trigger,
  Positioner,
  Content,
  Title,
  Description,
  CloseTrigger,
  Arrow,
} from './Popover';
import type {
  ArrowProps,
  CloseTriggerProps,
  ContentProps,
  PositionerProps,
  DescriptionProps,
  RootProps,
  TitleProps,
  TriggerProps,
} from './Popover';

export const Popover = {
  Root,
  Trigger,
  Content,
  Positioner,
  Title,
  Description,
  CloseTrigger,
  Arrow,
};

export type * from '@ark-ui/react/popover';
export type PopoverProps = {
  Root: RootProps;
  Trigger: TriggerProps;
  Content: ContentProps;
  Positioner: PositionerProps;
  Title: TitleProps;
  Description: DescriptionProps;
  CloseTrigger: CloseTriggerProps;
  Arrow: ArrowProps;
};

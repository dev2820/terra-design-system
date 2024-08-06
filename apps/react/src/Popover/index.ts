import {
  Root,
  Trigger,
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
  DescriptionProps,
  RootProps,
  TitleProps,
  TriggerProps,
} from './Popover';

export const Popover = {
  Root,
  Trigger,
  Content,
  Title,
  Description,
  CloseTrigger,
  Arrow,
};

export type PopoverProps = {
  root: RootProps;
  trigger: TriggerProps;
  content: ContentProps;
  title: TitleProps;
  description: DescriptionProps;
  closeTrigger: CloseTriggerProps;
  arrow: ArrowProps;
};

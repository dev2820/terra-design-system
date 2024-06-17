import { Root, Item, Trigger, Content } from './Accordion';
import type {
  RootProps,
  ItemProps,
  TriggerProps,
  ContentProps,
} from './Accordion';

export const Accordion = {
  Root,
  Item,
  Trigger,
  Content,
};

export type AccordionProps = {
  Root: RootProps;
  Item: ItemProps;
  Trigger: TriggerProps;
  Content: ContentProps;
};

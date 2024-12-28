import { Root, Item, ItemIndicator, ItemTrigger, Content } from './Accordion';
import type {
  RootProps,
  ItemProps,
  ItemIndicatorProps,
  ItemTriggerProps,
  ContentProps,
} from './Accordion';

export const Accordion = {
  Root,
  Item,
  ItemIndicator,
  ItemTrigger,
  Content,
};

export type AccordionProps = {
  Root: RootProps;
  Item: ItemProps;
  ItemTrigger: ItemIndicatorProps;
  Trigger: ItemTriggerProps;
  Content: ContentProps;
};

export type * from '@ark-ui/react/accordion';

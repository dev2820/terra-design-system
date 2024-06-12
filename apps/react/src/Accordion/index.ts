import {
  Root,
  Item,
  Trigger,
  Content,
  RootProvider,
  Context,
} from './Accordion';
import type {
  ContextProps,
  RootProps,
  ItemProps,
  TriggerProps,
  ContentProps,
  RootProviderProps,
} from './Accordion';

export const Accordion = {
  Root,
  Item,
  Trigger,
  Content,
  RootProvider,
  Context,
};

export type AccordionProps = {
  Root: RootProps;
  Item: ItemProps;
  Trigger: TriggerProps;
  Content: ContentProps;
  RootProvider: RootProviderProps;
  Context: ContextProps;
};

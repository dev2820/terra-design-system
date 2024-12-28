import { Root, Trigger, Content } from './Collapsible';
import type { ContentProps, RootProps, TriggerProps } from './Collapsible';

export const Collapsible = {
  Root,
  Trigger,
  Content,
};

export type * from '@ark-ui/react/collapsible';
export type CollapsibleProps = {
  root: RootProps;
  content: ContentProps;
  trigger: TriggerProps;
};

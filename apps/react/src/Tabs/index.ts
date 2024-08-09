import { Root, Trigger, Content, List, Indicator } from './Tabs';
import type {
  RootProps,
  TriggerProps,
  ContentProps,
  ListProps,
  IndicatorProps,
} from './Tabs';

export type TabsProps = {
  root: RootProps;
  trigger: TriggerProps;
  content: ContentProps;
  list: ListProps;
  indicator: IndicatorProps;
};

export const Tabs = { Root, Trigger, Content, List, Indicator };

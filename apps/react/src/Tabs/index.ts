import { Root, Trigger, Content, List, Indicator } from './Tabs';
import type {
  RootProps,
  TriggerProps,
  ContentProps,
  ListProps,
  IndicatorProps,
} from './Tabs';

export type * from '@ark-ui/react/tabs';
export type TabsProps = {
  Root: RootProps;
  Trigger: TriggerProps;
  Content: ContentProps;
  List: ListProps;
  Indicator: IndicatorProps;
};

export const Tabs = { Root, Trigger, Content, List, Indicator };

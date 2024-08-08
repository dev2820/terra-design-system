import { Root, Trigger, Content, Arrow } from './Tooltip';
import type {
  ArrowProps,
  ContentProps,
  RootProps,
  TriggerProps,
} from './Tooltip';

export const Tooltip = {
  Root,
  Trigger,
  Content,
  Arrow,
};

export type TooltipProps = {
  root: RootProps;
  trigger: TriggerProps;
  content: ContentProps;
  arrow: ArrowProps;
};

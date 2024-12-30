import { Root, Trigger, Content, Arrow, Positioner, ArrowTip } from './Tooltip';
import type {
  ArrowProps,
  ContentProps,
  RootProps,
  TriggerProps,
  PositionerProps,
  ArrowTipProps,
} from './Tooltip';

export const Tooltip = {
  Root,
  Trigger,
  Content,
  Arrow,
  Positioner,
  ArrowTip,
};

export type * from '@ark-ui/react/tooltip';
export type TooltipProps = {
  Root: RootProps;
  Trigger: TriggerProps;
  Content: ContentProps;
  Arrow: ArrowProps;
  ArrowTip: ArrowTipProps;
  Positioner: PositionerProps;
};

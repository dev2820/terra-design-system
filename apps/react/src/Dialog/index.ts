import {
  Root,
  Trigger,
  Content,
  Title,
  Description,
  Positioner,
  Backdrop,
  CloseTrigger,
} from './Dialog';
import type {
  CloseTriggerProps,
  ContentProps,
  DescriptionProps,
  PositionerProps,
  BackdropProps,
  RootProps,
  TitleProps,
  TriggerProps,
} from './Dialog';

export const Dialog = {
  Root,
  Trigger,
  Content,
  Title,
  Description,
  Positioner,
  Backdrop,
  CloseTrigger,
};

export type * from '@ark-ui/react/dialog';
export type DialogProps = {
  Root: RootProps;
  Content: ContentProps;
  Trigger: TriggerProps;
  Title: TitleProps;
  Description: DescriptionProps;
  CloseTrigger: CloseTriggerProps;
  Positioner: PositionerProps;
  Backdrop: BackdropProps;
};

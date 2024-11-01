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

export type DialogProps = {
  root: RootProps;
  content: ContentProps;
  trigger: TriggerProps;
  title: TitleProps;
  description: DescriptionProps;
  closeTrigger: CloseTriggerProps;
  positioner: PositionerProps;
  backdrop: BackdropProps;
};

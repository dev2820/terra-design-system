import {
  Root,
  Trigger,
  Content,
  Title,
  Description,
  CloseTrigger,
} from './Dialog';
import type {
  CloseTriggerProps,
  ContentProps,
  DescriptionProps,
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
  CloseTrigger,
};

export type DialogProps = {
  root: RootProps;
  content: ContentProps;
  trigger: TriggerProps;
  title: TitleProps;
  description: DescriptionProps;
  closeTrigger: CloseTriggerProps;
};

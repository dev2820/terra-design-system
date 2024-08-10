import {
  Toaster,
  Root,
  ActionTrigger,
  CloseTrigger,
  Title,
  Description,
  createToaster,
} from './Toast';
import type {
  ToasterProps,
  RootProps,
  ActionTriggerProps,
  CloseTriggerProps,
  TitleProps,
  DescriptionProps,
  CreateToasterProps,
} from './Toast';

export const Toast = {
  Toaster,
  Root,
  ActionTrigger,
  CloseTrigger,
  Title,
  Description,
  createToaster,
};

export type ToastProps = {
  toaster: ToasterProps;
  root: RootProps;
  actionTrigger: ActionTriggerProps;
  closeTrigger: CloseTriggerProps;
  title: TitleProps;
  description: DescriptionProps;
  createToaster: CreateToasterProps;
};

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

export type * from '@ark-ui/react/toast';
export type ToastProps = {
  Toaster: ToasterProps;
  Root: RootProps;
  ActionTrigger: ActionTriggerProps;
  CloseTrigger: CloseTriggerProps;
  Title: TitleProps;
  Description: DescriptionProps;
  CreateToaster: CreateToasterProps;
};

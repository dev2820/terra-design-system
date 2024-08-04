import {
  Root,
  Trigger,
  Content,
  Title,
  Header,
  Body,
  Footer,
  Description,
  CloseTrigger,
} from './Drawer';
import type {
  CloseTriggerProps,
  ContentProps,
  DescriptionProps,
  HeaderProps,
  BodyProps,
  FooterProps,
  RootProps,
  TitleProps,
  TriggerProps,
} from './Drawer';

export const Drawer = {
  Root,
  Trigger,
  Content,
  Header,
  Body,
  Footer,
  Title,
  Description,
  CloseTrigger,
};

export type DrawerProps = {
  root: RootProps;
  content: ContentProps;
  trigger: TriggerProps;
  title: TitleProps;
  header: HeaderProps;
  footer: FooterProps;
  body: BodyProps;
  description: DescriptionProps;
  closeTrigger: CloseTriggerProps;
};

import {
  Root,
  Trigger,
  Content,
  Title,
  Header,
  Body,
  Footer,
  Description,
  Backdrop,
  Positioner,
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
  BackdropProps,
  PositionerProps,
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
  Backdrop,
  Positioner,
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
  backdrop: BackdropProps;
  positioner: PositionerProps;
  closeTrigger: CloseTriggerProps;
};

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
  Root: RootProps;
  Content: ContentProps;
  Trigger: TriggerProps;
  Title: TitleProps;
  Header: HeaderProps;
  Footer: FooterProps;
  Body: BodyProps;
  Description: DescriptionProps;
  Backdrop: BackdropProps;
  Positioner: PositionerProps;
  CloseTrigger: CloseTriggerProps;
};

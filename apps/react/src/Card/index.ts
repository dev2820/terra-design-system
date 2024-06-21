import {
  Root,
  Header,
  Content,
  Footer,
  Title,
  Description,
  type ContentProps,
  type DescriptionProps,
  type FooterProps,
  type HeaderProps,
  type RootProps,
  type TitleProps,
} from './Card';

export const Card = {
  Root,
  Header,
  Content,
  Footer,
  Title,
  Description,
} as const;

export type CardProps = {
  Root: RootProps;
  Header: HeaderProps;
  Content: ContentProps;
  Footer: FooterProps;
  Title: TitleProps;
  Description: DescriptionProps;
};

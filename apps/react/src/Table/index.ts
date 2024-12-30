import { Root, Header, Body, Footer, Head, Row, Cell, Caption } from './Table';
import type {
  RootProps,
  HeaderProps,
  BodyProps,
  FooterProps,
  HeadProps,
  RowProps,
  CellProps,
  CaptionProps,
} from './Table';

export type TableProps = {
  Root: RootProps;
  Header: HeaderProps;
  Body: BodyProps;
  Footer: FooterProps;
  Head: HeadProps;
  Row: RowProps;
  Cell: CellProps;
  Caption: CaptionProps;
};

export const Table = { Root, Header, Body, Footer, Head, Row, Cell, Caption };

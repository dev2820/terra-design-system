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
  root: RootProps;
  header: HeaderProps;
  body: BodyProps;
  footer: FooterProps;
  head: HeadProps;
  row: RowProps;
  cell: CellProps;
  caption: CaptionProps;
};

export const Table = { Root, Header, Body, Footer, Head, Row, Cell, Caption };

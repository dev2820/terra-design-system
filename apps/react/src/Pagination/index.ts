import {
  Root,
  NextTrigger,
  PrevTrigger,
  Item,
  Ellipsis,
  Context,
} from './Pagination';
import type {
  RootProps,
  NextTriggerProps,
  PrevTriggerProps,
  ItemProps,
  EllipsisProps,
  ContextProps,
} from './Pagination';

export const Pagination = {
  Root,
  NextTrigger,
  PrevTrigger,
  Item,
  Ellipsis,
  Context,
};

export type * from '@ark-ui/react/pagination';
export type PaginationProps = {
  Root: RootProps;
  NextTrigger: NextTriggerProps;
  PrevTrigger: PrevTriggerProps;
  Item: ItemProps;
  Ellipsis: EllipsisProps;
  Context: ContextProps;
};

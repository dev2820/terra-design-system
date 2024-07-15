import { Root, ItemGroup, Item } from './Select';
import type { RootProps, ItemGroupProps, ItemProps } from './Select';

export const Select = {
  Root,
  ItemGroup,
  Item,
};

export type SelectProps = {
  root: RootProps;
  itemGroup: ItemGroupProps;
  item: ItemProps;
};

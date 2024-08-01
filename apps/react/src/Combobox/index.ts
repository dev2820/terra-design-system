import { Root, ItemGroup, Item } from './Combobox';
import type { RootProps, ItemGroupProps, ItemProps } from './Combobox';

export const Combobox = {
  Root,
  ItemGroup,
  Item,
};

export type ComboboxProps = {
  root: RootProps;
  itemGroup: ItemGroupProps;
  item: ItemProps;
};

import {
  Root,
  Tree,
  Item,
  ItemText,
  Branch,
  BranchControl,
  BranchText,
  BranchContent,
  BranchIndicator,
} from './TreeView';
import type {
  RootProps,
  TreeProps,
  ItemProps,
  ItemTextProps,
  BranchProps,
  BranchControlProps,
  BranchTextProps,
  BranchContentProps,
  BranchIndicatorProps,
} from './TreeView';

export const TreeView = {
  Root,
  Tree,
  Item,
  ItemText,
  Branch,
  BranchControl,
  BranchText,
  BranchContent,
  BranchIndicator,
};

export type * from '@ark-ui/react/tree-view';
export type TreeViewProps = {
  Root: RootProps;
  Tree: TreeProps;
  Item: ItemProps;
  ItemText: ItemTextProps;
  Branch: BranchProps;
  BranchControl: BranchControlProps;
  BranchText: BranchTextProps;
  BranchContent: BranchContentProps;
  BranchIndicator: BranchIndicatorProps;
};

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

export type TreeViewProps = {
  root: RootProps;
  tree: TreeProps;
  item: ItemProps;
  itemText: ItemTextProps;
  branch: BranchProps;
  branchControl: BranchControlProps;
  branchText: BranchTextProps;
  branchContent: BranchContentProps;
  branchIndicator: BranchIndicatorProps;
};
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

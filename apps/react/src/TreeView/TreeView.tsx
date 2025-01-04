import { TreeView, type TreeViewRootProps } from '@ark-ui/react/tree-view';
import { IDENTIFIER } from 'env';

import {
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
} from 'react';

import { createReactContext } from '../create-react-context';
import { cx } from '../cx';
import { tv, VariantProps } from '../tv';

export const treeViewVariant = tv({
  base: `${IDENTIFIER.scope} treeView`,
  slots: {
    root: 'trds-w-full',
    branch: '',
    branchContent: 'trds-relative',
    branchText: '',
    branchControl:
      'trds-flex trds-items-center trds-rounded-md trds-text-fg-caption trds-font-medium trds-gap-1.5 trds-ps-[calc((var(--depth)-1)*22px)] trds-py-1.5 trds-text-sm trds-transition trds-duration-normal trds-transition-[background,color] trds-ease-in-out hover:trds-bg-layer1 hover:trds-text-fg-highlight trds-cursor-pointer data-disabled:trds-bg-transparent',
    branchIndicator:
      'trds-text-fg-caption trds-transform-origin-center trds-transition trds-duration-normal trds-transition-[transform] trds-ease-in-out [&_svg]:text-md [&_svg]-w-4 [&_svg]-h-4 data-open:trds-text-primary data-open:trds-rotate-90',
    item: [
      'trds-relative trds-rounded-md trds-text-fg-caption trds-cursor-pointer trds-font-medium',
      'trds-ps-[calc(((var(--depth)-1)*22px)+22px)] trds-py-1.5 trds-text-sm trds-transition trds-duration-normal trds-transition-[background,color] trds-ease-in-out',
      'hover:trds-bg-layer1 hover:trds-text-fg-highlight',
      'data-selected:trds-bg-layer1 data-selected:trds-text-fg-highlight data-selected:before:trds-absolute data-selected:before:trds-left-2 data-selected:before:trds-top-0 data-selected:before:trds-w-[2px] data-selected:before:trds-h-full data-selected:before:trds-bg-primary data-selected:before:trds-z-elevated',
      'data-disabled:trds-bg-transparent data-disabled:trds-text-muted data-disabled:trds-cursor-not-allowed',
    ],
    itemText: '',
    tree: 'trds-flex trds-flex-col trds-gap-0',
  },
});

type TreeViewProviderProps = {
  classes: ReturnType<typeof treeViewVariant>;
};

const [TreeViewProvider, useTreeViewContext] =
  createReactContext<TreeViewProviderProps>({
    name: 'treeView',
    hookName: 'useTreeViewContext',
    providerName: 'TreeViewProvider',
    defaultValue: {
      classes: {} as ReturnType<typeof treeViewVariant>,
    },
  });

export type RootProps = TreeViewRootProps &
  VariantProps<typeof treeViewVariant>;

const Root = forwardRef<ElementRef<typeof TreeView.Root>, RootProps>(
  function (props, ref) {
    const { className, children, ...rest } = props;
    const classes = treeViewVariant();
    const ctx = {
      classes,
    };

    return (
      <TreeViewProvider value={ctx}>
        <TreeView.Root
          ref={ref}
          className={cx(classes.root(), className)}
          {...rest}
        >
          {children}
        </TreeView.Root>
      </TreeViewProvider>
    );
  },
);
Root.displayName = 'TreeView.Root';

export type TreeProps = ComponentProps<typeof Tree>;
const Tree = forwardRef<
  ElementRef<typeof TreeView.Tree>,
  ComponentPropsWithoutRef<typeof TreeView.Tree>
>(function (props, ref) {
  const { className, children, ...rest } = props;
  const { classes } = useTreeViewContext();

  return (
    <TreeView.Tree
      className={cx(classes.tree(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </TreeView.Tree>
  );
});
Tree.displayName = 'TreeView.Tree';

export type ItemProps = ComponentProps<typeof Item>;
const Item = forwardRef<
  ElementRef<typeof TreeView.Item>,
  ComponentPropsWithoutRef<typeof TreeView.Item>
>(function (props, ref) {
  const { className, children, ...rest } = props;
  const { classes } = useTreeViewContext();

  return (
    <TreeView.Item
      className={cx(classes.item(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </TreeView.Item>
  );
});
Item.displayName = 'TreeView.Item';

export type ItemTextProps = ComponentProps<typeof ItemText>;
const ItemText = forwardRef<
  ElementRef<typeof TreeView.ItemText>,
  ComponentPropsWithoutRef<typeof TreeView.ItemText>
>(function (props, ref) {
  const { className, children, ...rest } = props;
  const { classes } = useTreeViewContext();

  return (
    <TreeView.ItemText
      className={cx(classes.itemText(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </TreeView.ItemText>
  );
});
ItemText.displayName = 'TreeView.ItemText';

export type BranchProps = ComponentProps<typeof Branch>;
const Branch = forwardRef<
  ElementRef<typeof TreeView.Branch>,
  ComponentPropsWithoutRef<typeof TreeView.Branch>
>(function (props, ref) {
  const { className, children, ...rest } = props;
  const { classes } = useTreeViewContext();

  return (
    <TreeView.Branch
      className={cx(classes.branch(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </TreeView.Branch>
  );
});
Branch.displayName = 'TreeView.Branch';

export type BranchTextProps = ComponentProps<typeof BranchText>;
const BranchText = forwardRef<
  ElementRef<typeof TreeView.BranchText>,
  ComponentPropsWithoutRef<typeof TreeView.BranchText>
>(function (props, ref) {
  const { className, children, ...rest } = props;
  const { classes } = useTreeViewContext();

  return (
    <TreeView.BranchText
      className={cx(classes.branchText(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </TreeView.BranchText>
  );
});
BranchText.displayName = 'TreeView.BranchText';

export type BranchIndicatorProps = ComponentProps<typeof BranchIndicator>;
const BranchIndicator = forwardRef<
  ElementRef<typeof TreeView.BranchIndicator>,
  ComponentPropsWithoutRef<typeof TreeView.BranchIndicator>
>(function (props, ref) {
  const { className, children, ...rest } = props;
  const { classes } = useTreeViewContext();

  return (
    <TreeView.BranchIndicator
      className={cx(classes.branchIndicator(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </TreeView.BranchIndicator>
  );
});
BranchIndicator.displayName = 'TreeView.BranchIndicator';

export type BranchControlProps = ComponentProps<typeof BranchControl>;
const BranchControl = forwardRef<
  ElementRef<typeof TreeView.BranchControl>,
  ComponentPropsWithoutRef<typeof TreeView.BranchControl>
>(function (props, ref) {
  const { className, children, ...rest } = props;
  const { classes } = useTreeViewContext();

  return (
    <TreeView.BranchControl
      className={cx(classes.branchControl(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </TreeView.BranchControl>
  );
});
BranchControl.displayName = 'TreeView.BranchControl';

export type BranchContentProps = ComponentProps<typeof BranchContent>;
const BranchContent = forwardRef<
  ElementRef<typeof TreeView.BranchContent>,
  ComponentPropsWithoutRef<typeof TreeView.BranchContent>
>(function (props, ref) {
  const { className, children, ...rest } = props;
  const { classes } = useTreeViewContext();

  return (
    <TreeView.BranchContent
      className={cx(classes.branchContent(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </TreeView.BranchContent>
  );
});
BranchContent.displayName = 'TreeView.BranchContent';

export {
  Root,
  Tree,
  Item,
  ItemText,
  Branch,
  BranchText,
  BranchIndicator,
  BranchControl,
  BranchContent,
};

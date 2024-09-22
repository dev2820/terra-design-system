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
    root: 'w-full',
    branch: '',
    branchContent: 'relative',
    branchText: '',
    branchControl:
      'flex items-center rounded-md text-fg-caption font-medium gap-1.5 ps-[calc((var(--depth)-1)*22px)] py-1.5 text-sm transition duration-normal transition-[background,color] ease-default hover:bg-layer1 hover:text-fg-highlight cursor-pointer data-disabled:bg-transparent',
    branchIndicator:
      'text-fg-caption transform-origin-center transition duration-normal transition-[transform] ease-default [&_svg]:text-md [&_svg]-w-4 [&_svg]-h-4 data-open:text-primary-500 data-open:rotate-90',
    item: [
      'relative rounded-md text-fg-caption cursor-pointer font-medium',
      'ps-[calc(((var(--depth)-1)*22px)+22px)] py-1.5 text-sm transition duration-normal transition-[background,color] ease-default',
      'hover:bg-layer1 hover:text-fg-highlight',
      'data-selected:bg-layer1 data-selected:text-fg-highlight data-selected:before:absolute data-selected:before:left-2 data-selected:before:top-0 data-selected:before:w-[2px] data-selected:before:h-full data-selected:before:bg-primary data-selected:before:z-elevated',
      'data-disabled:bg-transparent data-disabled:text-muted data-disabled:cursor-not-allowed',
    ],
    itemText: '',
    tree: 'flex flex-col gap-0',
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

import { treeViewAnatomy } from '@ark-ui/anatomy';
import { TreeView, type TreeViewRootProps } from '@ark-ui/react/tree-view';

import {
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
} from 'react';

import { RecipeVariantProps, cx, sva } from '../../styled-system/css';
import { createReactContext } from '../create-react-context';

export const treeViewVariant = sva({
  className: 'treeView',
  slots: treeViewAnatomy.keys(),
  base: {
    root: {
      width: 'full',
    },
    branch: {},
    branchContent: {
      position: 'relative',
    },
    branchControl: {
      alignItems: 'center',
      borderRadius: 'md',
      color: 'neutral.400',
      display: 'flex',
      fontWeight: 'medium',
      gap: '1.5',
      ps: 'calc((var(--depth) - 1) * 22px)',
      py: '1.5',
      textStyle: 'sm',
      transitionDuration: 'normal',
      transitionProperty: 'background, color',
      transitionTimingFunction: 'default',
      _hover: {
        background: 'neutral.100',
        color: 'neutral.800',
      },
      cursor: 'pointer',
    },
    branchIndicator: {
      color: 'neutral.300',
      transformOrigin: 'center',
      transitionDuration: 'normal',
      transitionProperty: 'transform',
      transitionTimingFunction: 'default',
      '& svg': {
        fontSize: 'md',
        width: '4',
        height: '4',
      },
      _open: {
        color: 'primary.500',
        transform: 'rotate(90deg)',
      },
    },
    item: {
      borderRadius: 'md',
      color: 'neutral.400',
      cursor: 'pointer',
      fontWeight: 'medium',
      position: 'relative',
      ps: 'calc(((var(--depth) - 1) * 22px) + 22px)',
      py: '1.5',
      textStyle: 'sm',
      transitionDuration: 'normal',
      transitionProperty: 'background, color',
      transitionTimingFunction: 'default',
      _hover: {
        background: 'neutral.100',
        color: 'neutral.800',
      },
      _selected: {
        background: 'neutral.100',
        color: 'neutral.800',
        _before: {
          content: '""',
          position: 'absolute',
          left: '2',
          top: '0',
          width: '2px',
          height: 'full',
          bg: 'primary.500',
          zIndex: '1',
        },
      },
      _disabled: {
        color: 'disabled',
        cursor: 'not-allowed',
        _hover: {
          background: 'transparent',
          color: 'disabled',
        },
      },
    },
    tree: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0',
    },
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
      classes: {},
    },
  });

export type RootProps = TreeViewRootProps &
  RecipeVariantProps<typeof treeViewVariant>;

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
          className={cx(classes.root, className)}
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
    <TreeView.Tree className={cx(classes.tree, className)} ref={ref} {...rest}>
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
    <TreeView.Item className={cx(classes.item, className)} ref={ref} {...rest}>
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
      className={cx(classes.itemText, className)}
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
      className={cx(classes.branch, className)}
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
      className={cx(classes.branchText, className)}
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
      className={cx(classes.branchIndicator, className)}
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
      className={cx(classes.branchControl, className)}
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
      className={cx(classes.branchContent, className)}
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

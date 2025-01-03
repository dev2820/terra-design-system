import { Pagination, PaginationContextProps } from '@ark-ui/react/pagination';
import { IDENTIFIER } from 'env';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ComponentProps,
} from 'react';

import { createReactContext } from '../create-react-context';
import { cx } from '../cx';
import { tv, type VariantProps } from '../tv';

export const paginationVariants = tv({
  base: `${IDENTIFIER.scope} pagination`,
  slots: {
    root: 'trds-text-fg trds-flex trds-gap-1',
    item: ['trds-font-tabular-nums'],
    prevTrigger: '',
    nextTrigger: '',
    ellipsis:
      'trds-inline-flex trds-items-center trds-text-fg-title trds-font-semibold trds-px-2',
  },
});

type PaginationProviderProps = {
  classes: ReturnType<typeof paginationVariants>;
};

const [PaginationProvider, usePaginationContext] =
  createReactContext<PaginationProviderProps>({
    name: 'pagination',
    hookName: 'usePaginationContext',
    providerName: 'PaginationProvider',
    defaultValue: {
      classes: {} as ReturnType<typeof paginationVariants>,
    },
  });

export type RootProps = ComponentProps<typeof Root>;
const Root = forwardRef<
  ElementRef<typeof Pagination.Root>,
  ComponentPropsWithoutRef<typeof Pagination.Root> &
    VariantProps<typeof paginationVariants>
>(function (props, ref) {
  const { children, className, ...rest } = props;
  const classes = paginationVariants();
  const ctx = {
    classes,
  };

  return (
    <PaginationProvider value={ctx}>
      <Pagination.Root
        ref={ref}
        className={cx(classes.root(), className)}
        {...rest}
      >
        {children}
      </Pagination.Root>
    </PaginationProvider>
  );
});
Root.displayName = 'Pagination.Root';

export type PrevTriggerProps = ComponentProps<typeof PrevTrigger>;
const PrevTrigger = forwardRef<
  ElementRef<typeof Pagination.PrevTrigger>,
  ComponentPropsWithoutRef<typeof Pagination.PrevTrigger>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = usePaginationContext();

  return (
    <Pagination.PrevTrigger
      className={classes.prevTrigger()}
      ref={ref}
      {...rest}
    />
  );
});
PrevTrigger.displayName = 'Pagination.PrevTrigger';

export type NextTriggerProps = ComponentProps<typeof NextTrigger>;
const NextTrigger = forwardRef<
  ElementRef<typeof Pagination.NextTrigger>,
  ComponentPropsWithoutRef<typeof Pagination.NextTrigger>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = usePaginationContext();

  return (
    <Pagination.NextTrigger
      className={classes.nextTrigger()}
      ref={ref}
      {...rest}
    />
  );
});
NextTrigger.displayName = 'Pagination.NextTrigger';

export type ContextProps = PaginationContextProps;
const Context = Pagination.Context;

export type ItemProps = ComponentProps<typeof Item>;
const Item = forwardRef<
  ElementRef<typeof Pagination.Item>,
  ComponentPropsWithoutRef<typeof Pagination.Item>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = usePaginationContext();

  return <Pagination.Item className={classes.item()} ref={ref} {...rest} />;
});
Item.displayName = 'Pagination.Item';

export type EllipsisProps = ComponentProps<typeof Ellipsis>;
const Ellipsis = forwardRef<
  ElementRef<typeof Pagination.Ellipsis>,
  ComponentPropsWithoutRef<typeof Pagination.Ellipsis>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = usePaginationContext();

  return (
    <Pagination.Ellipsis className={classes.ellipsis()} ref={ref} {...rest} />
  );
});
Ellipsis.displayName = 'Pagination.Ellipsis';

export { Root, PrevTrigger, NextTrigger, Context, Item, Ellipsis };

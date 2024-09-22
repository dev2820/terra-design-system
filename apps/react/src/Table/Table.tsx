import { IDENTIFIER } from 'env';

import { ComponentProps, ComponentPropsWithoutRef, forwardRef } from 'react';

import { createReactContext } from '../create-react-context';
import { cx } from '../cx';
import { tv, VariantProps } from '../tv';

export const tableVariant = tv({
  base: `${IDENTIFIER.scope} table`,
  slots: {
    root: 'caption-bottom w-full',
    body: '[&_tr:last-child]:border-b-0',
    caption: 'text-fg-caption',
    cell: 'align-middle text-fg-description',
    footer: 'font-medium border-t border-boundary [&_tr:last-child]:border-b-0',
    header: 'text-fg-title font-medium text-left align-middle',
    head: 'align-middle',
    row: 'border-b border-boundary transition duration-normal transition-[background,color] ease-default',
  },

  variants: {
    variant: {
      outline: {
        root: 'border border-boundary border-[1px]',
        header: 'bg-layer1 border-b border-boundary border-b-[1px]',
        head: 'bg-layer1',
        footer: 'bg-layer1',
      },
      plain: {
        header: 'bg-layer1 border-b border-boundary border-b-[1px]',
        row: 'hover:bg-layer1 data-selected:bg-layer1',
        footer: 'bg-layer1',
      },
    },
    size: {
      sm: {
        root: 'text-sm',
        caption: 'mt-4',
        cell: 'h-11 px-3',
        head: 'h-11 px-3',
        header: 'h-11 px-3',
      },
      md: {
        root: 'text-sm',
        caption: 'mt-4',
        cell: 'h-14 px-4',
        head: 'h-14 px-4',
        header: 'h-11 px-4',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'plain',
  },
});

type TableProviderProps = {
  classes: ReturnType<typeof tableVariant>;
};

const [TableProvider, useTableContext] = createReactContext<TableProviderProps>(
  {
    name: 'table',
    hookName: 'useTableContext',
    providerName: 'TableProvider',
    defaultValue: {
      classes: {} as ReturnType<typeof tableVariant>,
    },
  },
);

export type RootProps = ComponentProps<'table'> &
  VariantProps<typeof tableVariant>;
const Root = forwardRef<HTMLTableElement, RootProps>(function (props, ref) {
  const { size, variant, className, children, ...rest } = props;
  const classes = tableVariant({ size, variant });
  const ctx = {
    classes,
  };

  return (
    <TableProvider value={ctx}>
      <table ref={ref} className={cx(classes.root(), className)} {...rest}>
        {children}
      </table>
    </TableProvider>
  );
});

export type HeaderProps = ComponentProps<'thead'>;
const Header = forwardRef<
  HTMLTableSectionElement,
  ComponentPropsWithoutRef<'thead'>
>(function (props, ref) {
  const { className, children, ...rest } = props;
  const { classes } = useTableContext();

  return (
    <thead className={cx(classes.header(), className)} ref={ref} {...rest}>
      {children}
    </thead>
  );
});

export type BodyProps = ComponentProps<'tbody'>;
const Body = forwardRef<
  HTMLTableSectionElement,
  ComponentPropsWithoutRef<'tbody'>
>(function (props, ref) {
  const { className, children, ...rest } = props;
  const { classes } = useTableContext();

  return (
    <tbody className={cx(classes.body(), className)} ref={ref} {...rest}>
      {children}
    </tbody>
  );
});

export type FooterProps = ComponentProps<'tfoot'>;
const Footer = forwardRef<
  HTMLTableSectionElement,
  ComponentPropsWithoutRef<'tfoot'>
>(function (props, ref) {
  const { className, children, ...rest } = props;
  const { classes } = useTableContext();

  return (
    <tfoot className={cx(classes.footer(), className)} ref={ref} {...rest}>
      {children}
    </tfoot>
  );
});

export type HeadProps = ComponentProps<'th'>;
const Head = forwardRef<HTMLTableCellElement, ComponentPropsWithoutRef<'th'>>(
  function (props, ref) {
    const { className, children, ...rest } = props;
    const { classes } = useTableContext();

    return (
      <th className={cx(classes.head(), className)} ref={ref} {...rest}>
        {children}
      </th>
    );
  },
);

export type RowProps = ComponentProps<'tr'>;
const Row = forwardRef<HTMLTableRowElement, ComponentPropsWithoutRef<'tr'>>(
  function (props, ref) {
    const { className, children, ...rest } = props;
    const { classes } = useTableContext();

    return (
      <tr className={cx(classes.row(), className)} ref={ref} {...rest}>
        {children}
      </tr>
    );
  },
);

export type CellProps = ComponentProps<'td'>;
const Cell = forwardRef<HTMLTableCellElement, ComponentPropsWithoutRef<'td'>>(
  function (props, ref) {
    const { className, children, ...rest } = props;
    const { classes } = useTableContext();

    return (
      <td className={cx(classes.cell(), className)} ref={ref} {...rest}>
        {children}
      </td>
    );
  },
);

export type CaptionProps = ComponentProps<'caption'>;
const Caption = forwardRef<
  HTMLTableCellElement,
  ComponentPropsWithoutRef<'caption'>
>(function (props, ref) {
  const { className, children, ...rest } = props;
  const { classes } = useTableContext();

  return (
    <caption className={cx(classes.caption(), className)} ref={ref} {...rest}>
      {children}
    </caption>
  );
});

export { Root, Header, Body, Footer, Head, Row, Cell, Caption };

import { IDENTIFIER } from 'env';

import { ComponentProps, ComponentPropsWithoutRef, forwardRef } from 'react';

import { createReactContext } from '../create-react-context';
import { cx } from '../cx';
import { tv, VariantProps } from '../tv';

export const tableVariant = tv({
  base: `${IDENTIFIER.scope} table`,
  slots: {
    root: 'trds-caption-bottom trds-w-full',
    body: '[&_tr:last-child]:trds-border-b-0',
    caption: 'trds-text-fg-caption',
    cell: 'trds-align-middle trds-text-neutral-description',
    footer:
      'trds-font-medium trds-border-t trds-border-boundary [&_tr:last-child]:trds-border-b-0',
    header:
      'trds-text-neutral-title trds-font-medium trds-text-left trds-align-middle',
    head: 'trds-align-middle',
    row: 'trds-border-b trds-border-boundary trds-transition trds-duration-normal trds-transition-[background,color] trds-ease-default',
  },

  variants: {
    variant: {
      outline: {
        root: 'trds-border trds-border-boundary trds-border-[1px]',
        header:
          'trds-bg-layer1 trds-border-b trds-border-boundary trds-border-b-[1px]',
        head: 'trds-bg-layer1',
        footer: 'trds-bg-layer1',
      },
      plain: {
        header:
          'trds-bg-layer1 trds-border-b trds-border-boundary trds-border-b-[1px]',
        row: 'hover:trds-bg-layer1 data-selected:trds-bg-layer1',
        footer: 'trds-bg-layer1',
      },
    },
    size: {
      sm: {
        root: 'trds-text-sm',
        caption: 'trds-mt-4',
        cell: 'trds-h-11 trds-px-3',
        head: 'trds-h-11 trds-px-3',
        header: 'trds-h-11 trds-px-3',
      },
      md: {
        root: 'trds-text-sm',
        caption: 'trds-mt-4',
        cell: 'trds-h-14 trds-px-4',
        head: 'trds-h-14 trds-px-4',
        header: 'trds-h-11 trds-px-4',
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
Root.displayName = 'Table.Root';

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
Header.displayName = 'Table.Header';

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
Body.displayName = 'Table.Body';

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
Footer.displayName = 'Table.Footer';

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
Head.displayName = 'Table.Head';

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
Row.displayName = 'Table.Row';

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
Cell.displayName = 'Table.Cell';

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
Caption.displayName = 'Table.Caption';

export { Root, Header, Body, Footer, Head, Row, Cell, Caption };

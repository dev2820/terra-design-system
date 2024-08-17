import { IDENTIFIER } from 'env';

import { ComponentProps, ComponentPropsWithoutRef, forwardRef } from 'react';

import { RecipeVariantProps, cx, sva } from '../../styled-system/css';
import { createReactContext } from '../create-react-context';

export const tableVariant = sva({
  className: `${IDENTIFIER.scope} table`,
  slots: ['root', 'body', 'cell', 'footer', 'head', 'header', 'row', 'caption'],
  base: {
    root: {
      captionSide: 'bottom',
      width: 'full',
    },
    body: {
      '& tr:last-child': {
        borderBottomWidth: '0',
      },
    },
    caption: {
      color: 'neutral.400',
    },
    cell: {
      verticalAlign: 'middle',
      color: 'neutral.600',
    },
    footer: {
      fontWeight: 'medium',
      borderTopWidth: '1px',
      borderColor: 'neutral.400',
      '& tr:last-child': {
        borderBottomWidth: '0',
      },
    },
    header: {
      color: 'neutral.600',
      fontWeight: 'medium',
      textAlign: 'left',
      verticalAlign: 'middle',
    },
    head: {
      verticalAlign: 'middle',
    },
    row: {
      borderBottomWidth: '1px',
      borderColor: 'neutral.400',
      transitionDuration: 'normal',
      transitionProperty: 'background, color',
      transitionTimingFunction: 'default',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'plain',
  },
  variants: {
    variant: {
      outline: {
        root: {
          borderWidth: '1px',
          borderColor: 'neutral.400',
        },
        header: {
          bg: 'neutral.100',
          borderBottomWidth: '1px',
          borderColor: 'neutral.400',
        },
        head: {
          bg: 'neutral.100',
        },
        footer: {
          bg: 'neutral.100',
        },
      },
      plain: {
        header: {
          bg: 'neutral.100',
          borderBottomWidth: '1px',
          borderColor: 'neutral.400',
        },
        row: {
          _hover: {
            bg: 'neutral.100',
          },
          _selected: {
            bg: 'neutral.100',
          },
        },
        footer: {
          bg: 'neutral.100',
        },
      },
    },
    size: {
      sm: {
        root: {
          textStyle: 'sm',
        },
        caption: {
          mt: '4',
        },
        cell: {
          height: '11',
          px: '3',
        },
        head: {
          height: '11',
          px: '3',
        },
        header: {
          height: '11',
          px: '3',
        },
      },
      md: {
        root: {
          textStyle: 'sm',
        },
        caption: {
          mt: '4',
        },
        cell: {
          height: '14',
          px: '4',
        },
        head: {
          height: '14',
          px: '4',
        },
        header: {
          height: '11',
          px: '4',
        },
      },
    },
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
      classes: {},
    },
  },
);

export type RootProps = ComponentProps<'table'> &
  RecipeVariantProps<typeof tableVariant>;
const Root = forwardRef<HTMLTableElement, RootProps>(function (props, ref) {
  const { size, variant, className, children, ...rest } = props;
  const classes = tableVariant({ size, variant });
  const ctx = {
    classes,
  };

  return (
    <TableProvider value={ctx}>
      <table ref={ref} className={cx(classes.root, className)} {...rest}>
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
    <thead className={cx(classes.header, className)} ref={ref} {...rest}>
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
    <tbody className={cx(classes.body, className)} ref={ref} {...rest}>
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
    <tfoot className={cx(classes.footer, className)} ref={ref} {...rest}>
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
      <th className={cx(classes.head, className)} ref={ref} {...rest}>
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
      <tr className={cx(classes.row, className)} ref={ref} {...rest}>
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
      <td className={cx(classes.cell, className)} ref={ref} {...rest}>
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
    <caption className={cx(classes.caption, className)} ref={ref} {...rest}>
      {children}
    </caption>
  );
});

export { Root, Header, Body, Footer, Head, Row, Cell, Caption };

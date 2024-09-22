import {
  DatePicker,
  DatePickerRootProps,
  DatePickerContextProps,
} from '@ark-ui/react/date-picker';
import { Portal } from '@ark-ui/react/portal';
import { IDENTIFIER } from 'env';

import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  forwardRef,
  type ElementRef,
} from 'react';

import { createReactContext } from '../create-react-context';
import { cx } from '../cx';
import { tv, VariantProps } from '../tv';

export const datePickerVariants = tv({
  base: `${IDENTIFIER.scope} datePicker`,
  slots: {
    root: 'flex flex-col gap-1.5',
    control: 'flex flex-row gap-2',
    trigger: '',
    clearTrigger: '',
    content:
      'bg-white rounded-lg shadow-lg flex flex-col gap-3 p-4 w-[344px] z-dropdown data-open:animate-fade-in data-closed:animate-fade-out data-hidden:hidden',
    view: 'flex flex-col gap-3',
    viewControl: 'flex gap-2 justify-between',
    prevTrigger: '',
    nextTrigger: '',
    table: 'w-full border-boundary border-spacing-1 -m-1',
    tableHeader: 'text-title font-semibold h-10 text-sm',
    tableHead: '',
    tableBody: '',
    tableRow: '',
    tableCell: 'text-center',
    tableCellTrigger:
      "w-full data-in-range:bg-primary-300 data-today:before:content-['●'] data-today:before:text-[6px] data-today:before:text-primary-800 data-today:before:absolute data-today:before:mt-6 data-selected:bg-primary data-in-range:data-selected:bg-primary data-selected:text-fg-primary data-selected:hover:bg-primary data-selected:hover:text-fg-primary",
    input: '',
    rangeText: '',
    positioner: '',
    viewTrigger: '',
    label: '',
    monthSelect: '',
    yearSelect: '',
    presetTrigger: '',
  },
});

type DatePickerProviderProps = {
  classes: ReturnType<typeof datePickerVariants>;
};

const [DatePickerProvider, useDatePickerContext] =
  createReactContext<DatePickerProviderProps>({
    name: 'datePicker',
    hookName: 'useDatePickerContext',
    providerName: 'DatePickerProvider',
    defaultValue: {
      classes: {} as ReturnType<typeof datePickerVariants>,
    },
  });

export type RootProps = DatePickerRootProps &
  VariantProps<typeof datePickerVariants>;

const Root = forwardRef<ElementRef<typeof DatePicker.Root>, RootProps>(
  function (props, ref) {
    const { children, className, ...rest } = props;
    const classes = datePickerVariants();
    const ctx = {
      classes,
    };

    return (
      <DatePickerProvider value={ctx}>
        <DatePicker.Root
          className={cx(classes.root(), className)}
          {...rest}
          ref={ref}
        >
          {children}
        </DatePicker.Root>
      </DatePickerProvider>
    );
  },
);

export type ControlProps = ComponentProps<typeof Control>;
const Control = forwardRef<
  ElementRef<typeof DatePicker.Control>,
  ComponentPropsWithoutRef<typeof DatePicker.Control>
>(function (props, ref) {
  const { classes } = useDatePickerContext();
  const { children, className, ...rest } = props;

  return (
    <DatePicker.Control
      className={cx(classes.control(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </DatePicker.Control>
  );
});

export type TriggerProps = ComponentProps<typeof Trigger>;
const Trigger = forwardRef<
  ElementRef<typeof DatePicker.Trigger>,
  ComponentPropsWithoutRef<typeof DatePicker.Trigger>
>(function (props, ref) {
  const { classes } = useDatePickerContext();
  const { children, className, ...rest } = props;

  return (
    <DatePicker.Trigger
      className={cx(classes.trigger(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </DatePicker.Trigger>
  );
});

export type ClearTriggerProps = ComponentProps<typeof ClearTrigger>;
const ClearTrigger = forwardRef<
  ElementRef<typeof DatePicker.ClearTrigger>,
  ComponentPropsWithoutRef<typeof DatePicker.ClearTrigger>
>(function (props, ref) {
  const { classes } = useDatePickerContext();
  const { children, className, ...rest } = props;

  return (
    <DatePicker.ClearTrigger
      className={cx(classes.clearTrigger(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </DatePicker.ClearTrigger>
  );
});

export type ContentProps = ComponentProps<typeof Content>;
const Content = forwardRef<
  ElementRef<typeof DatePicker.Content>,
  ComponentPropsWithoutRef<typeof DatePicker.Content>
>(function (props, ref) {
  const { classes } = useDatePickerContext();
  const { children, className, ...rest } = props;

  return (
    <Portal>
      <DatePicker.Positioner className={classes.positioner()}>
        <DatePicker.Content
          className={cx(classes.content(), className)}
          ref={ref}
          {...rest}
        >
          {children}
        </DatePicker.Content>
      </DatePicker.Positioner>
    </Portal>
  );
});

export type ViewProps = ComponentProps<typeof View>;
const View = forwardRef<
  ElementRef<typeof DatePicker.View>,
  ComponentPropsWithoutRef<typeof DatePicker.View>
>(function (props, ref) {
  const { classes } = useDatePickerContext();
  const { children, className, ...rest } = props;

  return (
    <DatePicker.View
      className={cx(classes.view(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </DatePicker.View>
  );
});

export type ViewControlProps = ComponentProps<typeof ViewControl>;
const ViewControl = forwardRef<
  ElementRef<typeof DatePicker.ViewControl>,
  ComponentPropsWithoutRef<typeof DatePicker.ViewControl>
>(function (props, ref) {
  const { classes } = useDatePickerContext();
  const { children, className, ...rest } = props;

  return (
    <DatePicker.ViewControl
      className={cx(classes.viewControl(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </DatePicker.ViewControl>
  );
});

export type PrevTriggerProps = ComponentProps<typeof PrevTrigger>;
const PrevTrigger = forwardRef<
  ElementRef<typeof DatePicker.PrevTrigger>,
  ComponentPropsWithoutRef<typeof DatePicker.PrevTrigger>
>(function (props, ref) {
  const { classes } = useDatePickerContext();
  const { children, className, ...rest } = props;

  return (
    <DatePicker.PrevTrigger
      className={cx(classes.prevTrigger(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </DatePicker.PrevTrigger>
  );
});

export type NextTriggerProps = ComponentProps<typeof NextTrigger>;
const NextTrigger = forwardRef<
  ElementRef<typeof DatePicker.NextTrigger>,
  ComponentPropsWithoutRef<typeof DatePicker.NextTrigger>
>(function (props, ref) {
  const { classes } = useDatePickerContext();
  const { children, className, ...rest } = props;

  return (
    <DatePicker.NextTrigger
      className={cx(classes.nextTrigger(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </DatePicker.NextTrigger>
  );
});

export type ViewTriggerProps = ComponentProps<typeof ViewTrigger>;
const ViewTrigger = forwardRef<
  ElementRef<typeof DatePicker.ViewTrigger>,
  ComponentPropsWithoutRef<typeof DatePicker.ViewTrigger>
>(function (props, ref) {
  const { classes } = useDatePickerContext();
  const { children, className, ...rest } = props;

  return (
    <DatePicker.ViewTrigger
      className={cx(classes.viewTrigger(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </DatePicker.ViewTrigger>
  );
});

export type TableProps = ComponentProps<typeof Table>;
const Table = forwardRef<
  ElementRef<typeof DatePicker.Table>,
  ComponentPropsWithoutRef<typeof DatePicker.Table>
>(function (props, ref) {
  const { classes } = useDatePickerContext();
  const { children, className, ...rest } = props;

  return (
    <DatePicker.Table
      className={cx(classes.table(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </DatePicker.Table>
  );
});

export type TableHeadProps = ComponentProps<typeof TableHead>;
const TableHead = forwardRef<
  ElementRef<typeof DatePicker.TableHead>,
  ComponentPropsWithoutRef<typeof DatePicker.TableHead>
>(function (props, ref) {
  const { classes } = useDatePickerContext();
  const { children, className, ...rest } = props;

  return (
    <DatePicker.TableHead
      className={cx(classes.tableHead(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </DatePicker.TableHead>
  );
});

export type TableRowProps = ComponentProps<typeof TableRow>;
const TableRow = forwardRef<
  ElementRef<typeof DatePicker.TableRow>,
  ComponentPropsWithoutRef<typeof DatePicker.TableRow>
>(function (props, ref) {
  const { classes } = useDatePickerContext();
  const { children, className, ...rest } = props;

  return (
    <DatePicker.TableRow
      className={cx(classes.tableRow(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </DatePicker.TableRow>
  );
});

export type TableHeaderProps = ComponentProps<typeof TableHeader>;
const TableHeader = forwardRef<
  ElementRef<typeof DatePicker.TableHeader>,
  ComponentPropsWithoutRef<typeof DatePicker.TableHeader>
>(function (props, ref) {
  const { classes } = useDatePickerContext();
  const { children, className, ...rest } = props;

  return (
    <DatePicker.TableHeader
      className={cx(classes.tableHeader(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </DatePicker.TableHeader>
  );
});

export type TableBodyProps = ComponentProps<typeof TableBody>;
const TableBody = forwardRef<
  ElementRef<typeof DatePicker.TableBody>,
  ComponentPropsWithoutRef<typeof DatePicker.TableBody>
>(function (props, ref) {
  const { classes } = useDatePickerContext();
  const { children, className, ...rest } = props;

  return (
    <DatePicker.TableBody
      className={cx(classes.tableBody(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </DatePicker.TableBody>
  );
});

export type TableCellProps = ComponentProps<typeof TableCell>;
const TableCell = forwardRef<
  ElementRef<typeof DatePicker.TableCell>,
  ComponentPropsWithoutRef<typeof DatePicker.TableCell>
>(function (props, ref) {
  const { classes } = useDatePickerContext();
  const { children, className, ...rest } = props;

  return (
    <DatePicker.TableCell
      className={cx(classes.tableCell(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </DatePicker.TableCell>
  );
});

export type TableCellTriggerProps = ComponentProps<typeof TableCellTrigger>;
const TableCellTrigger = forwardRef<
  ElementRef<typeof DatePicker.TableCellTrigger>,
  ComponentPropsWithoutRef<typeof DatePicker.TableCellTrigger>
>(function (props, ref) {
  const { classes } = useDatePickerContext();
  const { children, className, ...rest } = props;

  return (
    <DatePicker.TableCellTrigger
      ref={ref}
      {...rest}
      className={cx(classes.tableCellTrigger(), className)}
    >
      {children}
    </DatePicker.TableCellTrigger>
  );
});

export type RangeTextProps = ComponentProps<typeof RangeText>;
const RangeText = forwardRef<
  ElementRef<typeof DatePicker.RangeText>,
  ComponentPropsWithoutRef<typeof DatePicker.RangeText>
>(function (props, ref) {
  const { classes } = useDatePickerContext();
  const { children, className, ...rest } = props;

  return (
    <DatePicker.RangeText
      className={cx(classes.rangeText(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </DatePicker.RangeText>
  );
});

export type InputProps = ComponentProps<typeof Input>;
const Input = forwardRef<
  ElementRef<typeof DatePicker.Input>,
  ComponentPropsWithoutRef<typeof DatePicker.Input>
>(function (props, ref) {
  const { classes } = useDatePickerContext();
  const { children, className, ...rest } = props;

  return (
    <DatePicker.Input
      className={cx(classes.input(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </DatePicker.Input>
  );
});

export type ContextProps = DatePickerContextProps;
const Context = DatePicker.Context;

export {
  Root,
  Control,
  Trigger,
  ClearTrigger,
  Content,
  View,
  ViewControl,
  ViewTrigger,
  NextTrigger,
  PrevTrigger,
  RangeText,
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableCellTrigger,
  Input,
  Context,
};

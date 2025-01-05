import { DatePicker, DatePickerContextProps } from '@ark-ui/react/date-picker';
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
    root: 'trds-flex trds-flex-col trds-gap-1.5',
    control: 'trds-flex trds-flex-row trds-gap-2',
    trigger: [''],
    clearTrigger: '',
    content:
      'trds-bg-layer-popover trds-text-fg-popover trds-rounded-lg trds-shadow-lg trds-flex trds-flex-col trds-gap-3 trds-p-4 trds-w-[344px] trds-z-dropdown data-open:trds-animate-fade-in data-closed:trds-animate-fade-out data-hidden:trds-hidden',
    view: 'trds-flex trds-flex-col trds-gap-3',
    viewControl: 'trds-flex trds-gap-2 trds-justify-between',
    prevTrigger: [''],
    nextTrigger: [''],
    table:
      'trds-text-fg-popover trds-w-full trds-border-boundary trds-border-spacing-1 -trds-m-1',
    tableHeader: 'trds-text-title trds-font-semibold trds-h-10 trds-text-sm',
    tableHead: '',
    tableBody: '',
    tableRow: '',
    tableCell: 'trds-text-center',
    tableCellTrigger: [
      'trds-w-full',
      'data-in-range:trds-bg-primary-subtle data-in-range:trds-text-primary-inverse',
      "data-today:before:trds-content-['●'] data-today:before:trds-text-[6px] data-today:before:trds-text-primary-stronger data-today:before:trds-absolute data-today:before:trds-mt-6",
      'data-selected:trds-bg-primary data-selected:trds-text-primary-inverse data-selected:hover:trds-bg-primary data-selected:hover:trds-text-primary-inverse',
      'data-in-range:data-selected:trds-bg-primary data-in-range:data-selected:trds-text-primary-inverse',
      'data-disabled:trds-text-fg-muted data-disabled:trds-cursor-not-allowed data-disabled:trds-bg-transparent data-disabled:hover:trds-bg-transparent data-disabled:active:trds-bg-transparent',
    ],
    input: 'trds-bg-layer-input trds-text-fg-input',
    rangeText: '',
    positioner: '',
    viewTrigger: [''],
    label: '',
    monthSelect: '',
    yearSelect: '',
    presetTrigger: [''],
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

export type RootProps = ComponentProps<typeof Root>;

const Root = forwardRef<
  ElementRef<typeof DatePicker.Root>,
  ComponentPropsWithoutRef<typeof DatePicker.Root> &
    VariantProps<typeof datePickerVariants>
>(function (props, ref) {
  const { className, ...rest } = props;
  const classes = datePickerVariants();
  const ctx = {
    classes,
  };

  return (
    <DatePickerProvider value={ctx}>
      <DatePicker.Root
        className={cx(classes.root(), className)}
        ref={ref}
        {...rest}
      />
    </DatePickerProvider>
  );
});
Root.displayName = 'DatePicker.Root';

export type ControlProps = ComponentProps<typeof Control>;
const Control = forwardRef<
  ElementRef<typeof DatePicker.Control>,
  ComponentPropsWithoutRef<typeof DatePicker.Control>
>(function (props, ref) {
  const { classes } = useDatePickerContext();
  const { className, ...rest } = props;

  return (
    <DatePicker.Control
      className={cx(classes.control(), className)}
      ref={ref}
      {...rest}
    />
  );
});
Control.displayName = 'DatePicker.Control';

export type TriggerProps = ComponentProps<typeof Trigger>;
const Trigger = forwardRef<
  ElementRef<typeof DatePicker.Trigger>,
  ComponentPropsWithoutRef<typeof DatePicker.Trigger>
>(function (props, ref) {
  const { classes } = useDatePickerContext();
  const { className, ...rest } = props;

  return (
    <DatePicker.Trigger
      className={cx(classes.trigger(), className)}
      ref={ref}
      {...rest}
    />
  );
});
Trigger.displayName = 'DatePicker.Trigger';

export type ClearTriggerProps = ComponentProps<typeof ClearTrigger>;
const ClearTrigger = forwardRef<
  ElementRef<typeof DatePicker.ClearTrigger>,
  ComponentPropsWithoutRef<typeof DatePicker.ClearTrigger>
>(function (props, ref) {
  const { classes } = useDatePickerContext();
  const { className, ...rest } = props;

  return (
    <DatePicker.ClearTrigger
      className={cx(classes.clearTrigger(), className)}
      ref={ref}
      {...rest}
    />
  );
});
ClearTrigger.displayName = 'DatePicker.ClearTrigger';

export type PositionerProps = ComponentProps<typeof Positioner>;
const Positioner = forwardRef<
  ElementRef<typeof DatePicker.Positioner>,
  ComponentPropsWithoutRef<typeof DatePicker.Positioner>
>(function (props, ref) {
  const { classes } = useDatePickerContext();
  const { className, ...rest } = props;

  return (
    <DatePicker.Positioner
      className={cx(classes.positioner(), className)}
      ref={ref}
      {...rest}
    />
  );
});
Positioner.displayName = 'DatePicker.Positioner';

export type ContentProps = ComponentProps<typeof Content>;
const Content = forwardRef<
  ElementRef<typeof DatePicker.Content>,
  ComponentPropsWithoutRef<typeof DatePicker.Content>
>(function (props, ref) {
  const { classes } = useDatePickerContext();
  const { className, ...rest } = props;

  return (
    <DatePicker.Content
      className={cx(classes.content(), className)}
      ref={ref}
      {...rest}
    />
  );
});
Content.displayName = 'DatePicker.Content';

export type ViewProps = ComponentProps<typeof View>;
const View = forwardRef<
  ElementRef<typeof DatePicker.View>,
  ComponentPropsWithoutRef<typeof DatePicker.View>
>(function (props, ref) {
  const { classes } = useDatePickerContext();
  const { className, ...rest } = props;

  return (
    <DatePicker.View
      className={cx(classes.view(), className)}
      ref={ref}
      {...rest}
    />
  );
});
View.displayName = 'DatePicker.View';

export type ViewControlProps = ComponentProps<typeof ViewControl>;
const ViewControl = forwardRef<
  ElementRef<typeof DatePicker.ViewControl>,
  ComponentPropsWithoutRef<typeof DatePicker.ViewControl>
>(function (props, ref) {
  const { classes } = useDatePickerContext();
  const { className, ...rest } = props;

  return (
    <DatePicker.ViewControl
      className={cx(classes.viewControl(), className)}
      ref={ref}
      {...rest}
    />
  );
});
ViewControl.displayName = 'DatePicker.ViewControl';

export type PrevTriggerProps = ComponentProps<typeof PrevTrigger>;
const PrevTrigger = forwardRef<
  ElementRef<typeof DatePicker.PrevTrigger>,
  ComponentPropsWithoutRef<typeof DatePicker.PrevTrigger>
>(function (props, ref) {
  const { classes } = useDatePickerContext();
  const { className, ...rest } = props;

  return (
    <DatePicker.PrevTrigger
      className={cx(classes.prevTrigger(), className)}
      ref={ref}
      {...rest}
    />
  );
});
PrevTrigger.displayName = 'DatePicker.PrevTrigger';

export type NextTriggerProps = ComponentProps<typeof NextTrigger>;
const NextTrigger = forwardRef<
  ElementRef<typeof DatePicker.NextTrigger>,
  ComponentPropsWithoutRef<typeof DatePicker.NextTrigger>
>(function (props, ref) {
  const { classes } = useDatePickerContext();
  const { className, ...rest } = props;

  return (
    <DatePicker.NextTrigger
      className={cx(classes.nextTrigger(), className)}
      ref={ref}
      {...rest}
    />
  );
});
NextTrigger.displayName = 'DatePicker.NextTrigger';

export type ViewTriggerProps = ComponentProps<typeof ViewTrigger>;
const ViewTrigger = forwardRef<
  ElementRef<typeof DatePicker.ViewTrigger>,
  ComponentPropsWithoutRef<typeof DatePicker.ViewTrigger>
>(function (props, ref) {
  const { classes } = useDatePickerContext();
  const { className, ...rest } = props;

  return (
    <DatePicker.ViewTrigger
      className={cx(classes.viewTrigger(), className)}
      ref={ref}
      {...rest}
    />
  );
});
ViewTrigger.displayName = 'DatePicker.ViewTrigger';

export type TableProps = ComponentProps<typeof Table>;
const Table = forwardRef<
  ElementRef<typeof DatePicker.Table>,
  ComponentPropsWithoutRef<typeof DatePicker.Table>
>(function (props, ref) {
  const { classes } = useDatePickerContext();
  const { className, ...rest } = props;

  return (
    <DatePicker.Table
      className={cx(classes.table(), className)}
      ref={ref}
      {...rest}
    />
  );
});
Table.displayName = 'DatePicker.Table';

export type TableHeadProps = ComponentProps<typeof TableHead>;
const TableHead = forwardRef<
  ElementRef<typeof DatePicker.TableHead>,
  ComponentPropsWithoutRef<typeof DatePicker.TableHead>
>(function (props, ref) {
  const { classes } = useDatePickerContext();
  const { className, ...rest } = props;

  return (
    <DatePicker.TableHead
      className={cx(classes.tableHead(), className)}
      ref={ref}
      {...rest}
    />
  );
});
TableHead.displayName = 'DatePicker.TableHead';

export type TableRowProps = ComponentProps<typeof TableRow>;
const TableRow = forwardRef<
  ElementRef<typeof DatePicker.TableRow>,
  ComponentPropsWithoutRef<typeof DatePicker.TableRow>
>(function (props, ref) {
  const { classes } = useDatePickerContext();
  const { className, ...rest } = props;

  return (
    <DatePicker.TableRow
      className={cx(classes.tableRow(), className)}
      ref={ref}
      {...rest}
    />
  );
});
TableRow.displayName = 'DatePicker.TableRow';

export type TableHeaderProps = ComponentProps<typeof TableHeader>;
const TableHeader = forwardRef<
  ElementRef<typeof DatePicker.TableHeader>,
  ComponentPropsWithoutRef<typeof DatePicker.TableHeader>
>(function (props, ref) {
  const { classes } = useDatePickerContext();
  const { className, ...rest } = props;

  return (
    <DatePicker.TableHeader
      className={cx(classes.tableHeader(), className)}
      ref={ref}
      {...rest}
    />
  );
});
TableHeader.displayName = 'DatePicker.TableHeader';

export type TableBodyProps = ComponentProps<typeof TableBody>;
const TableBody = forwardRef<
  ElementRef<typeof DatePicker.TableBody>,
  ComponentPropsWithoutRef<typeof DatePicker.TableBody>
>(function (props, ref) {
  const { classes } = useDatePickerContext();
  const { className, ...rest } = props;

  return (
    <DatePicker.TableBody
      className={cx(classes.tableBody(), className)}
      ref={ref}
      {...rest}
    />
  );
});
TableBody.displayName = 'DatePicker.TableBody';

export type TableCellProps = ComponentProps<typeof TableCell>;
const TableCell = forwardRef<
  ElementRef<typeof DatePicker.TableCell>,
  ComponentPropsWithoutRef<typeof DatePicker.TableCell>
>(function (props, ref) {
  const { classes } = useDatePickerContext();
  const { className, ...rest } = props;

  return (
    <DatePicker.TableCell
      className={cx(classes.tableCell(), className)}
      ref={ref}
      {...rest}
    />
  );
});
TableCell.displayName = 'DatePicker.TableCell';

export type TableCellTriggerProps = ComponentProps<typeof TableCellTrigger>;
const TableCellTrigger = forwardRef<
  ElementRef<typeof DatePicker.TableCellTrigger>,
  ComponentPropsWithoutRef<typeof DatePicker.TableCellTrigger>
>(function (props, ref) {
  const { classes } = useDatePickerContext();
  const { className, ...rest } = props;

  return (
    <DatePicker.TableCellTrigger
      ref={ref}
      {...rest}
      className={cx(classes.tableCellTrigger(), className)}
    />
  );
});
TableCellTrigger.displayName = 'DatePicker.TableCellTrigger';

export type RangeTextProps = ComponentProps<typeof RangeText>;
const RangeText = forwardRef<
  ElementRef<typeof DatePicker.RangeText>,
  ComponentPropsWithoutRef<typeof DatePicker.RangeText>
>(function (props, ref) {
  const { classes } = useDatePickerContext();
  const { className, ...rest } = props;

  return (
    <DatePicker.RangeText
      className={cx(classes.rangeText(), className)}
      ref={ref}
      {...rest}
    />
  );
});
RangeText.displayName = 'DatePicker.RangeText';

export type InputProps = ComponentProps<typeof Input>;
const Input = forwardRef<
  ElementRef<typeof DatePicker.Input>,
  ComponentPropsWithoutRef<typeof DatePicker.Input>
>(function (props, ref) {
  const { classes } = useDatePickerContext();
  const { className, ...rest } = props;

  return (
    <DatePicker.Input
      className={cx(classes.input(), className)}
      ref={ref}
      {...rest}
    />
  );
});
Input.displayName = 'DatePicker.Input';

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
  Positioner,
  Context,
};

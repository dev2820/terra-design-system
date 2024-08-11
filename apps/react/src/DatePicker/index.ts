import {
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
} from './DatePicker';
import type {
  RootProps,
  ControlProps,
  TriggerProps,
  ClearTriggerProps,
  ContentProps,
  ViewProps,
  ViewControlProps,
  ViewTriggerProps,
  NextTriggerProps,
  PrevTriggerProps,
  RangeTextProps,
  TableProps,
  TableHeaderProps,
  TableHeadProps,
  TableBodyProps,
  TableRowProps,
  TableCellProps,
  TableCellTriggerProps,
  InputProps,
  ContextProps,
} from './DatePicker';

export const DatePicker = {
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

export type DatePickerProps = {
  root: RootProps;
  control: ControlProps;
  trigger: TriggerProps;
  clearTrigger: ClearTriggerProps;
  content: ContentProps;
  view: ViewProps;
  viewControl: ViewControlProps;
  viewTrigger: ViewTriggerProps;
  nextTrigger: NextTriggerProps;
  prevTrigger: PrevTriggerProps;
  rangeText: RangeTextProps;
  table: TableProps;
  tableHeader: TableHeaderProps;
  tableHead: TableHeadProps;
  tableBody: TableBodyProps;
  tableRow: TableRowProps;
  tableCell: TableCellProps;
  tableCellTrigger: TableCellTriggerProps;
  context: ContextProps;
  input: InputProps;
};

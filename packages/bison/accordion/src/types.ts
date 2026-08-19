import type { ElementProps } from "@bison/core";

export type AccordionValue<Multiple extends boolean> = Multiple extends true
  ? string[]
  : string | null;

interface AccordionCommonProps {
  id: string;
  collapsible?: boolean;
}

interface AccordionSingleProps extends AccordionCommonProps {
  multiple?: false;
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: AccordionValue<false>) => void;
}

interface AccordionMultipleProps extends AccordionCommonProps {
  multiple: true;
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: AccordionValue<true>) => void;
}

export type AccordionProps<Multiple extends boolean = boolean> = Multiple extends true
  ? AccordionMultipleProps
  : AccordionSingleProps;

export interface AccordionState {
  value: string[];
}

export type AccordionEvent =
  | {
      type: "trigger.activate";
      value: string;
    }
  | {
      type: "value.set";
      value: string[];
    };

export interface AccordionSnapshot<Multiple extends boolean = boolean> {
  props: AccordionProps<Multiple>;
  state: AccordionState;
}

export interface AccordionActor<Multiple extends boolean = boolean> {
  getSnapshot: () => AccordionSnapshot<Multiple>;
  send: (event: AccordionEvent) => void;
}

export interface AccordionItemProps {
  value: string;
}

export interface AccordionPanelProps extends AccordionItemProps {
  region?: boolean;
}

export interface AccordionItemState {
  expanded: boolean;
  collapsible: boolean;
}

export interface AccordionPropTypes {
  element: unknown;
  button: unknown;
}

interface DefaultAccordionPropTypes {
  element: ElementProps;
  button: ElementProps;
}

export interface AccordionApi<
  Multiple extends boolean = boolean,
  Props extends AccordionPropTypes = DefaultAccordionPropTypes,
> {
  value: AccordionValue<Multiple>;
  setValue: (value: AccordionValue<Multiple>) => void;
  getItemState: (props: AccordionItemProps) => AccordionItemState;
  getTriggerProps: (props: AccordionItemProps) => Props["button"];
  getPanelProps: (props: AccordionPanelProps) => Props["element"];
}

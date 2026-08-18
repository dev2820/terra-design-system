export type ElementProps = Record<string, unknown>;

export type NormalizeProps<Props extends object> = {
  [Element in keyof Props]: (props: ElementProps) => Props[Element];
};

export type ElementProps = Record<string, unknown>;

export type NormalizeProps<Props extends object> = {
  [Element in keyof Props]: (props: ElementProps) => Props[Element];
};

export interface Machine<Props, State, Event> {
  initial: (props: Props) => State;
  transition: (state: State, event: Event, props: Props) => State;
}

export interface MachineSnapshot<Props, State> {
  props: Props;
  state: State;
}

export interface Actor<Props, State, Event> {
  getSnapshot: () => MachineSnapshot<Props, State>;
  send: (event: Event) => void;
}

export interface PatternTypes {
  props: unknown;
  propTypes: object;
  api: unknown;
}

export type PatternApi<Types extends PatternTypes, Props, PropTypes extends object> = (Types & {
  props: Props;
  propTypes: PropTypes;
})["api"];

export interface Pattern<
  Props,
  State,
  Event,
  PropTypes extends object,
  Types extends PatternTypes,
> {
  machine: Machine<Props, State, Event>;
  connect: <CurrentProps extends Props, CurrentPropTypes extends PropTypes>(
    actor: Actor<CurrentProps, State, Event>,
    normalize: NormalizeProps<CurrentPropTypes>,
  ) => PatternApi<Types, CurrentProps, CurrentPropTypes>;
}

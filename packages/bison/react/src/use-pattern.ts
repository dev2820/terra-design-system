import type { Actor, NormalizeProps, Pattern, PatternApi, PatternTypes } from "@bison/core";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ComponentPropsWithRef,
  HTMLAttributes,
} from "react";

import { useMachine } from "./use-machine";

interface ReactPropTypes {
  element: HTMLAttributes<HTMLElement>;
  link: AnchorHTMLAttributes<HTMLAnchorElement>;
  button: ButtonHTMLAttributes<HTMLButtonElement>;
  input: ComponentPropsWithRef<"input">;
}

const normalizeProps: NormalizeProps<ReactPropTypes> = {
  element: (props) => props as HTMLAttributes<HTMLElement>,
  link: (props) => props as AnchorHTMLAttributes<HTMLAnchorElement>,
  button: (props) => props as ButtonHTMLAttributes<HTMLButtonElement>,
  input: (props) => {
    const { indeterminate, ...inputProps } = props;

    return {
      ...inputProps,
      ref(element: HTMLInputElement | null) {
        if (element) {
          element.indeterminate = indeterminate === true;
        }
      },
    } as ComponentPropsWithRef<"input">;
  },
};

export function usePattern<
  PatternProps,
  const Props extends PatternProps,
  State,
  Event,
  SupportedPropTypes extends object,
  Types extends PatternTypes,
>(
  pattern: Pattern<PatternProps, State, Event, SupportedPropTypes, Types> &
    (ReactPropTypes extends SupportedPropTypes ? unknown : never),
  props: Props,
): PatternApi<Types, Props, ReactPropTypes> {
  const actor = useMachine(pattern.machine, props);

  const connect = pattern.connect as (
    actor: Actor<Props, State, Event>,
    normalize: NormalizeProps<ReactPropTypes>,
  ) => PatternApi<Types, Props, ReactPropTypes>;

  return connect(actor, normalizeProps);
}

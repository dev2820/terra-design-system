import type { Actor, NormalizeProps } from "@bison/core";

import type {
  BreadcrumbApi,
  BreadcrumbEvent,
  BreadcrumbPropTypes,
  BreadcrumbProps,
  BreadcrumbState,
} from "./types";

export function connect<MachineProps extends BreadcrumbProps, Props extends BreadcrumbPropTypes>(
  actor: Actor<MachineProps, BreadcrumbState, BreadcrumbEvent>,
  normalize: NormalizeProps<Props>,
): BreadcrumbApi<Props> {
  const { props } = actor.getSnapshot();

  return {
    getRootProps: () =>
      normalize.element({
        role: "navigation",
        "aria-label": props.label,
        "aria-labelledby": props.labelledBy,
      }),

    getLinkProps: ({ current = false } = {}) =>
      normalize.link({
        "aria-current": current ? "page" : undefined,
      }),
  };
}

import type { Machine } from "@bison/core";

import type { BreadcrumbEvent, BreadcrumbProps, BreadcrumbState } from "./types";

export const machine: Machine<BreadcrumbProps, BreadcrumbState, BreadcrumbEvent> = {
  initial: () => undefined,
  transition: (state) => state,
};

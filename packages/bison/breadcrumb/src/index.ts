import type { Pattern } from "@bison/core";

import { connect } from "./connect";
import { machine } from "./machine";
import type {
  BreadcrumbEvent,
  BreadcrumbPatternTypes,
  BreadcrumbPropTypes,
  BreadcrumbProps,
  BreadcrumbState,
} from "./types";

export type { BreadcrumbApi, BreadcrumbLinkProps, BreadcrumbProps } from "./types";

export const breadcrumb = {
  machine,
  connect,
} as Pattern<
  BreadcrumbProps,
  BreadcrumbState,
  BreadcrumbEvent,
  BreadcrumbPropTypes,
  BreadcrumbPatternTypes
>;

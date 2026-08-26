import type { Actor, ElementProps, MachineSnapshot, PatternTypes } from "@bison/core";

export type BreadcrumbProps =
  | {
      label: string;
      labelledBy?: never;
    }
  | {
      label?: never;
      labelledBy: string;
    };

export type BreadcrumbState = undefined;

export type BreadcrumbEvent = never;

export type BreadcrumbSnapshot = MachineSnapshot<BreadcrumbProps, BreadcrumbState>;

export type BreadcrumbActor = Actor<BreadcrumbProps, BreadcrumbState, BreadcrumbEvent>;

export interface BreadcrumbPropTypes {
  element: unknown;
  /** Props for a native `<a href>` or a router link that renders one. */
  link: unknown;
}

export interface BreadcrumbLinkProps {
  /** Whether the link represents the current page. */
  current?: boolean;
}

interface DefaultBreadcrumbPropTypes {
  element: ElementProps;
  link: ElementProps;
}

export interface BreadcrumbApi<Props extends BreadcrumbPropTypes = DefaultBreadcrumbPropTypes> {
  getRootProps: () => Props["element"];
  /** Returns props that must be connected to a native `<a href>`. */
  getLinkProps: (props?: BreadcrumbLinkProps) => Props["link"];
}

export interface BreadcrumbPatternTypes extends PatternTypes {
  api: this["props"] extends BreadcrumbProps
    ? this["propTypes"] extends BreadcrumbPropTypes
      ? BreadcrumbApi<this["propTypes"]>
      : never
    : never;
}

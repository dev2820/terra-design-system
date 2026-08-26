import { describe, expectTypeOf, it } from "vitest";

import type { BreadcrumbApi, BreadcrumbLinkProps, BreadcrumbProps } from "./index";

describe("Breadcrumb", () => {
  describe("types", () => {
    it("navigation landmark 이름을 aria-label 또는 aria-labelledby 중 하나로 요구한다", () => {
      type LabelledDirectly = Extract<BreadcrumbProps, { label: string }>;
      type LabelledByElement = Extract<BreadcrumbProps, { labelledBy: string }>;

      expectTypeOf<LabelledDirectly["label"]>().toEqualTypeOf<string>();
      expectTypeOf<LabelledByElement["labelledBy"]>().toEqualTypeOf<string>();
    });

    it("Root와 Link Props를 제공한다", () => {
      expectTypeOf<ReturnType<BreadcrumbApi["getRootProps"]>>().toEqualTypeOf<
        Record<string, unknown>
      >();
      expectTypeOf<ReturnType<BreadcrumbApi["getLinkProps"]>>().toEqualTypeOf<
        Record<string, unknown>
      >();
    });

    it("Link의 current 상태를 boolean으로 제한한다", () => {
      expectTypeOf<BreadcrumbLinkProps["current"]>().toEqualTypeOf<boolean | undefined>();
      expectTypeOf<Parameters<BreadcrumbApi["getLinkProps"]>[0]>().toEqualTypeOf<
        BreadcrumbLinkProps | undefined
      >();
    });
  });
});

import { describe, expectTypeOf, it } from "vitest";

import type { DisclosureApi, DisclosureProps } from "./index";

describe("Disclosure", () => {
  describe("types", () => {
    it("id를 요구하고 controlled와 uncontrolled open 상태를 제공한다", () => {
      type OpenChangeValue = Parameters<NonNullable<DisclosureProps["onOpenChange"]>>[0];

      expectTypeOf<DisclosureProps["id"]>().toEqualTypeOf<string>();
      expectTypeOf<DisclosureProps["open"]>().toEqualTypeOf<boolean | undefined>();
      expectTypeOf<DisclosureProps["defaultOpen"]>().toEqualTypeOf<boolean | undefined>();
      expectTypeOf<OpenChangeValue>().toEqualTypeOf<boolean>();
    });

    it("현재 open 상태와 외부 설정 및 두 part의 props API를 제공한다", () => {
      expectTypeOf<DisclosureApi["open"]>().toEqualTypeOf<boolean>();
      expectTypeOf<Parameters<DisclosureApi["setOpen"]>[0]>().toEqualTypeOf<boolean>();
      expectTypeOf<ReturnType<DisclosureApi["getTriggerProps"]>>().toEqualTypeOf<
        Record<string, unknown>
      >();
      expectTypeOf<ReturnType<DisclosureApi["getContentProps"]>>().toEqualTypeOf<
        Record<string, unknown>
      >();
    });
  });
});

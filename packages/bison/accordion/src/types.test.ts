import { describe, expectTypeOf, it } from "vitest";

import type { AccordionApi, AccordionProps } from "./index";

describe("Accordion", () => {
  describe("types", () => {
    it("multiple이 false이면 value를 단일 값으로 제한한다", () => {
      type SingleProps = Extract<AccordionProps, { multiple?: false }>;
      type SingleChangeValue = Parameters<NonNullable<SingleProps["onValueChange"]>>[0];

      expectTypeOf<SingleProps["value"]>().toEqualTypeOf<string | null | undefined>();
      expectTypeOf<SingleChangeValue>().toEqualTypeOf<string | null>();
      expectTypeOf<AccordionApi<false>["value"]>().toEqualTypeOf<string | null>();
      expectTypeOf<Parameters<AccordionApi<false>["setValue"]>[0]>().toEqualTypeOf<string | null>();
    });

    it("multiple이 true이면 value를 배열로 제한한다", () => {
      type MultipleProps = Extract<AccordionProps, { multiple: true }>;
      type MultipleChangeValue = Parameters<NonNullable<MultipleProps["onValueChange"]>>[0];

      expectTypeOf<MultipleProps["value"]>().toEqualTypeOf<string[] | undefined>();
      expectTypeOf<MultipleChangeValue>().toEqualTypeOf<string[]>();
      expectTypeOf<AccordionApi<true>["value"]>().toEqualTypeOf<string[]>();
      expectTypeOf<Parameters<AccordionApi<true>["setValue"]>[0]>().toEqualTypeOf<string[]>();
    });
  });
});

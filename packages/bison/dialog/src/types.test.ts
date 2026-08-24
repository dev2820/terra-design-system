import { describe, expectTypeOf, it } from "vitest";

import type { DialogApi, DialogContentProps, DialogModalContract, DialogProps } from "./index";

describe("Dialog", () => {
  describe("types", () => {
    it("열림 상태를 boolean으로 제한한다", () => {
      expectTypeOf<DialogProps["open"]>().toEqualTypeOf<boolean | undefined>();
      expectTypeOf<Parameters<DialogApi["setOpen"]>[0]>().toEqualTypeOf<boolean>();
    });

    it("Dialog 이름을 aria-label 또는 Title 중 하나로 요구한다", () => {
      type LabelledByTitle = Extract<DialogContentProps, { labelledBy: true }>;
      type LabelledDirectly = Extract<DialogContentProps, { label: string }>;

      expectTypeOf<LabelledByTitle["labelledBy"]>().toEqualTypeOf<true>();
      expectTypeOf<LabelledDirectly["label"]>().toEqualTypeOf<string>();
    });

    it("modal 구현에 필요한 Focus와 외부 영역 계약을 제공한다", () => {
      expectTypeOf<DialogApi["modal"]>().toEqualTypeOf<DialogModalContract>();
      expectTypeOf<DialogModalContract["active"]>().toEqualTypeOf<boolean>();
      expectTypeOf<DialogModalContract["focus"]["initialFocusId"]>().toEqualTypeOf<
        string | undefined
      >();
      expectTypeOf<DialogModalContract["focus"]["moveInside"]>().toEqualTypeOf<true>();
      expectTypeOf<DialogModalContract["focus"]["contain"]>().toEqualTypeOf<true>();
      expectTypeOf<DialogModalContract["focus"]["restore"]>().toEqualTypeOf<true>();
      expectTypeOf<DialogModalContract["outside"]["inert"]>().toEqualTypeOf<true>();
      expectTypeOf<DialogModalContract["outside"]["preventScroll"]>().toEqualTypeOf<true>();
    });
  });
});

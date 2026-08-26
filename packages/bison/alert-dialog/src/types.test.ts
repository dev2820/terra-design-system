import { describe, expectTypeOf, it } from "vitest";

import type { AlertDialogApi, AlertDialogContentProps, AlertDialogProps } from "./index";

describe("Alert Dialog", () => {
  describe("types", () => {
    it("열림 상태를 boolean으로 제한한다", () => {
      expectTypeOf<AlertDialogProps["open"]>().toEqualTypeOf<boolean | undefined>();
      expectTypeOf<Parameters<AlertDialogApi["setOpen"]>[0]>().toEqualTypeOf<boolean>();
    });

    it("Alert Dialog 이름을 aria-label 또는 Title 중 하나로 요구한다", () => {
      type LabelledByTitle = Extract<AlertDialogContentProps, { labelledBy: true }>;
      type LabelledDirectly = Extract<AlertDialogContentProps, { label: string }>;

      expectTypeOf<LabelledByTitle["labelledBy"]>().toEqualTypeOf<true>();
      expectTypeOf<LabelledDirectly["label"]>().toEqualTypeOf<string>();
    });

    it("modal 구현 계약과 경고 메시지 Props를 제공한다", () => {
      expectTypeOf<AlertDialogApi["modal"]["focus"]["contain"]>().toEqualTypeOf<true>();
      expectTypeOf<AlertDialogApi["modal"]["outside"]["inert"]>().toEqualTypeOf<true>();
      expectTypeOf<ReturnType<AlertDialogApi["getMessageProps"]>>().toEqualTypeOf<
        Record<string, unknown>
      >();
    });
  });
});

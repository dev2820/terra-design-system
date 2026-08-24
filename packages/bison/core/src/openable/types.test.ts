import { describe, expectTypeOf, it } from "vitest";

import type { OpenableEvent, OpenableProps, OpenableState } from "./types";

describe("Openable", () => {
  describe("types", () => {
    it("제어 및 비제어 열림 상태를 boolean으로 제한한다", () => {
      expectTypeOf<OpenableProps["open"]>().toEqualTypeOf<boolean | undefined>();
      expectTypeOf<OpenableProps["defaultOpen"]>().toEqualTypeOf<boolean | undefined>();
      expectTypeOf<OpenableState["open"]>().toEqualTypeOf<boolean>();
    });

    it("열림 상태를 설정하는 이벤트의 값을 boolean으로 제한한다", () => {
      type SetOpenEvent = Extract<OpenableEvent, { type: "open.set" }>;

      expectTypeOf<SetOpenEvent["open"]>().toEqualTypeOf<boolean>();
    });
  });
});

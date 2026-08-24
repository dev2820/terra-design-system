import { describe, expectTypeOf, it } from "vitest";

import type { OpenableEvent, OpenableProps, OpenableState } from "../openable/types";
import type { DismissableEvent, DismissableProps, DismissableState } from "./types";

describe("Dismissable", () => {
  describe("types", () => {
    it("Openable의 props와 state를 포함한다", () => {
      expectTypeOf<DismissableProps>().toEqualTypeOf<OpenableProps>();
      expectTypeOf<DismissableState>().toEqualTypeOf<OpenableState>();
    });

    it("Openable의 모든 이벤트를 포함한다", () => {
      expectTypeOf<Extract<DismissableEvent, OpenableEvent>>().toEqualTypeOf<OpenableEvent>();
    });
  });
});

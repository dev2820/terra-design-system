import { describe, expect, it } from "vitest";

import { machine } from "./machine";

describe("Alert", () => {
  describe("machine", () => {
    it("초기 상태를 만들지 않는다", () => {
      expect(machine.initial({})).toBeUndefined();
    });
  });
});

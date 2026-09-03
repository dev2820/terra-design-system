import { describe, expect, it } from "vitest";

import { areValuesEqual } from "./are-values-equal";

describe("areValuesEqual", () => {
  it("같은 순서와 값을 가진 배열이면 true를 반환한다", () => {
    expect(areValuesEqual(["first", "second"], ["first", "second"])).toBe(true);
  });

  it("배열의 길이, 순서 또는 값이 다르면 false를 반환한다", () => {
    expect(areValuesEqual(["first"], ["first", "second"])).toBe(false);
    expect(areValuesEqual(["first", "second"], ["second", "first"])).toBe(false);
    expect(areValuesEqual(["first", "second"], ["first", "third"])).toBe(false);
  });

  it("배열이 아닌 값은 Object.is로 비교한다", () => {
    const value = { id: "same-reference" };

    expect(areValuesEqual(Number.NaN, Number.NaN)).toBe(true);
    expect(areValuesEqual(0, -0)).toBe(false);
    expect(areValuesEqual(value, value)).toBe(true);
    expect(areValuesEqual({ id: "same-value" }, { id: "same-value" })).toBe(false);
  });
});

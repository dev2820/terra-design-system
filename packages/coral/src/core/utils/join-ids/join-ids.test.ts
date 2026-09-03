import { describe, expect, it } from "vitest";

import { joinIds } from "./join-ids";

describe("joinIds", () => {
  it("문자열과 ID 배열을 전달된 순서대로 합친다", () => {
    expect(joinIds("external-help", ["field-description", "field-error"])).toBe(
      "external-help field-description field-error",
    );
  });

  it("공백으로 구분된 ID를 나누고 중복과 빈 값을 제거한다", () => {
    expect(joinIds("first  second\nfirst", ["", "second", "third"], undefined)).toBe(
      "first second third",
    );
  });

  it("유효한 ID가 없으면 undefined를 반환한다", () => {
    expect(joinIds(undefined, "  ", [])).toBeUndefined();
  });
});

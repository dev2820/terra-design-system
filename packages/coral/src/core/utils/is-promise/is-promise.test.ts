import { describe, expect, it } from "vitest";

import { isPromise } from "./is-promise";

describe("isPromise", () => {
  it("Promise이면 true를 반환한다", () => {
    expect(isPromise(Promise.resolve("완료"))).toBe(true);
  });

  it("동기 결과이면 false를 반환한다", () => {
    expect(isPromise("오류 메시지")).toBe(false);
    expect(isPromise(["첫 번째 오류", "두 번째 오류"])).toBe(false);
    expect(isPromise(null)).toBe(false);
  });
});

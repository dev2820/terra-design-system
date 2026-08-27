import { describe, expectTypeOf, it } from "vitest";

import type { CheckboxApi, CheckboxCheckedState, CheckboxProps } from "./index";

describe("Checkbox", () => {
  describe("types", () => {
    it("checked 상태를 boolean 또는 indeterminate로 제한한다", () => {
      expectTypeOf<CheckboxCheckedState>().toEqualTypeOf<boolean | "indeterminate">();
    });

    it("controlled와 uncontrolled checked 상태를 제공한다", () => {
      type CheckedChangeValue = Parameters<NonNullable<CheckboxProps["onCheckedChange"]>>[0];

      expectTypeOf<CheckboxProps["checked"]>().toEqualTypeOf<CheckboxCheckedState | undefined>();
      expectTypeOf<CheckboxProps["defaultChecked"]>().toEqualTypeOf<
        CheckboxCheckedState | undefined
      >();
      expectTypeOf<CheckedChangeValue>().toEqualTypeOf<CheckboxCheckedState>();
    });

    it("checked 상태와 native input 연결 API를 제공한다", () => {
      expectTypeOf<CheckboxApi["checked"]>().toEqualTypeOf<boolean>();
      expectTypeOf<CheckboxApi["indeterminate"]>().toEqualTypeOf<boolean>();
      expectTypeOf<CheckboxApi["checkedState"]>().toEqualTypeOf<CheckboxCheckedState>();
      expectTypeOf<
        Parameters<CheckboxApi["setChecked"]>[0]
      >().toEqualTypeOf<CheckboxCheckedState>();
    });
  });
});

import type * as React from "react";
import { describe, expectTypeOf, it } from "vitest";

import { Checkbox } from "./index";
import type { CheckboxChangeEventDetails, CheckboxState } from "./index";

describe("Checkbox 타입", () => {
  it("Root와 HiddenInput ref를 구분한다", () => {
    type Props = React.ComponentProps<typeof Checkbox.Root>;

    expectTypeOf<Props["ref"]>().toEqualTypeOf<React.Ref<HTMLLabelElement> | undefined>();
    expectTypeOf<React.ComponentProps<typeof Checkbox.HiddenInput>["ref"]>().toEqualTypeOf<
      React.Ref<HTMLInputElement> | undefined
    >();
  });

  it("native change 대신 checked 값과 변경 세부 정보를 제공한다", () => {
    type Props = React.ComponentProps<typeof Checkbox.Root>;
    type Change = NonNullable<Props["onCheckedChange"]>;

    expectTypeOf<"onChange">().not.toExtend<keyof Props>();
    expectTypeOf<Parameters<Change>[0]>().toEqualTypeOf<boolean>();
    expectTypeOf<Parameters<Change>[1]>().toEqualTypeOf<CheckboxChangeEventDetails>();
    expectTypeOf<CheckboxChangeEventDetails["reason"]>().toEqualTypeOf<"input-change">();
  });

  it("Indicator children 함수에 Checkbox 상태를 전달한다", () => {
    type Children = React.ComponentProps<typeof Checkbox.Indicator>["children"];

    expectTypeOf<Children>().toEqualTypeOf<
      React.ReactNode | ((state: CheckboxState) => React.ReactNode)
    >();
  });

  it("Root에서 role과 aria-hidden을 허용하지 않는다", () => {
    type Props = React.ComponentProps<typeof Checkbox.Root>;

    expectTypeOf<"role">().not.toExtend<keyof Props>();
    expectTypeOf<"aria-hidden">().not.toExtend<keyof Props>();
  });
});

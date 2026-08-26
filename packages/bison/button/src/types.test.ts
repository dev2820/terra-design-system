import { describe, expectTypeOf, it } from "vitest";

import type { ButtonApi, ButtonProps, ButtonType } from "./index";

describe("Button", () => {
  describe("types", () => {
    it("native button type을 세 가지 값으로 제한한다", () => {
      expectTypeOf<ButtonType>().toEqualTypeOf<"button" | "submit" | "reset">();
    });

    it("기본 Button에서는 pressed 상태를 허용하지 않는다", () => {
      type DefaultButtonProps = Extract<ButtonProps, { toggle?: false }>;

      expectTypeOf<DefaultButtonProps["pressed"]>().toEqualTypeOf<undefined>();
      expectTypeOf<ButtonApi<false>>().not.toHaveProperty("pressed");
    });

    it("toggle: true Button에 controlled와 uncontrolled pressed 상태를 제공한다", () => {
      type ToggleProps = Extract<ButtonProps, { toggle: true }>;
      type PressedChangeValue = Parameters<NonNullable<ToggleProps["onPressedChange"]>>[0];

      expectTypeOf<ToggleProps["pressed"]>().toEqualTypeOf<boolean | undefined>();
      expectTypeOf<ToggleProps["defaultPressed"]>().toEqualTypeOf<boolean | undefined>();
      expectTypeOf<PressedChangeValue>().toEqualTypeOf<boolean>();
      expectTypeOf<ButtonApi<true>["pressed"]>().toEqualTypeOf<boolean>();
      expectTypeOf<Parameters<ButtonApi<true>["setPressed"]>[0]>().toEqualTypeOf<boolean>();
    });
  });
});

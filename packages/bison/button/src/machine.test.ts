import { describe, expect, it, vi } from "vitest";

import type { ButtonProps } from "./index";
import { getPressed, machine } from "./machine";

describe("Button", () => {
  describe("machine", () => {
    it("기본 Button은 pressed 상태 없이 시작한다", () => {
      const props = {} satisfies ButtonProps<false>;

      expect(machine.initial(props)).toEqual({ pressed: false });
    });

    it("toggle: true Button은 기본적으로 눌리지 않은 상태로 시작한다", () => {
      const props = { toggle: true } satisfies ButtonProps<true>;

      expect(machine.initial(props)).toEqual({ pressed: false });
    });

    it("toggle: true Button은 defaultPressed가 true이면 눌린 상태로 시작한다", () => {
      const props = { toggle: true, defaultPressed: true } satisfies ButtonProps<true>;

      expect(machine.initial(props)).toEqual({ pressed: true });
    });

    it("기본 Button을 활성화하면 결과를 알리고 상태를 유지한다", () => {
      const onActivate = vi.fn();
      const props = { onActivate } satisfies ButtonProps<false>;
      const state = machine.initial(props);

      const nextState = machine.transition(state, { type: "activate" }, props);

      expect(nextState).toBe(state);
      expect(onActivate).toHaveBeenCalledOnce();
    });

    it("toggle: true Button을 활성화하면 pressed 상태를 반전한다", () => {
      const onPressedChange = vi.fn();
      const props = { toggle: true, onPressedChange } satisfies ButtonProps<true>;
      const state = machine.initial(props);

      const nextState = machine.transition(state, { type: "activate" }, props);

      expect(nextState).toEqual({ pressed: true });
      expect(onPressedChange).toHaveBeenCalledWith(true);
    });

    it("controlled toggle: true Button은 외부 pressed 상태를 기준으로 활성화한다", () => {
      const onPressedChange = vi.fn();
      const props = {
        toggle: true,
        pressed: true,
        onPressedChange,
      } satisfies ButtonProps<true>;
      const state = machine.initial(props);

      const nextState = machine.transition(state, { type: "activate" }, props);

      expect(nextState).toEqual({ pressed: false });
      expect(onPressedChange).toHaveBeenCalledWith(false);
      expect(getPressed(nextState, props)).toBe(true);
    });

    it("외부에서 toggle: true Button의 pressed 상태를 설정할 수 있다", () => {
      const onPressedChange = vi.fn();
      const props = { toggle: true, onPressedChange } satisfies ButtonProps<true>;
      const state = machine.initial(props);

      const nextState = machine.transition(state, { type: "pressed.set", pressed: true }, props);

      expect(nextState).toEqual({ pressed: true });
      expect(onPressedChange).toHaveBeenCalledWith(true);
    });

    it("toggle: true Button에 같은 pressed 상태를 설정하면 상태와 알림을 유지한다", () => {
      const onPressedChange = vi.fn();
      const props = { toggle: true, onPressedChange } satisfies ButtonProps<true>;
      const state = machine.initial(props);

      const nextState = machine.transition(state, { type: "pressed.set", pressed: false }, props);

      expect(nextState).toBe(state);
      expect(onPressedChange).not.toHaveBeenCalled();
    });

    it("disabled Button의 활성화를 무시한다", () => {
      const onActivate = vi.fn();
      const onPressedChange = vi.fn();
      const props = {
        toggle: true,
        disabled: true,
        onActivate,
        onPressedChange,
      } satisfies ButtonProps<true>;
      const state = machine.initial(props);

      const nextState = machine.transition(state, { type: "activate" }, props);

      expect(nextState).toBe(state);
      expect(onActivate).not.toHaveBeenCalled();
      expect(onPressedChange).not.toHaveBeenCalled();
    });
  });
});

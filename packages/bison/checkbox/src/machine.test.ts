import { describe, expect, it, vi } from "vitest";

import type { CheckboxProps } from "./index";
import { machine } from "./machine";

describe("Checkbox", () => {
  describe("machine", () => {
    it("기본적으로 선택되지 않은 상태로 시작한다", () => {
      const props = {} satisfies CheckboxProps;

      expect(machine.initial(props)).toEqual({ checkedState: false });
    });

    it("defaultChecked 상태로 시작한다", () => {
      const props = { defaultChecked: "indeterminate" } satisfies CheckboxProps;

      expect(machine.initial(props)).toEqual({ checkedState: "indeterminate" });
    });

    it("선택되지 않은 Checkbox를 활성화하면 선택한다", () => {
      const onCheckedChange = vi.fn();
      const props = { onCheckedChange } satisfies CheckboxProps;
      const state = machine.initial(props);

      const nextState = machine.transition(state, { type: "activate" }, props);

      expect(nextState).toEqual({ checkedState: true });
      expect(onCheckedChange).toHaveBeenCalledWith(true);
    });

    it("선택된 Checkbox를 활성화하면 선택을 해제한다", () => {
      const onCheckedChange = vi.fn();
      const props = { defaultChecked: true, onCheckedChange } satisfies CheckboxProps;
      const state = machine.initial(props);

      const nextState = machine.transition(state, { type: "activate" }, props);

      expect(nextState).toEqual({ checkedState: false });
      expect(onCheckedChange).toHaveBeenCalledWith(false);
    });

    it("indeterminate Checkbox를 활성화하면 선택한다", () => {
      const onCheckedChange = vi.fn();
      const props = {
        defaultChecked: "indeterminate",
        onCheckedChange,
      } satisfies CheckboxProps;
      const state = machine.initial(props);

      const nextState = machine.transition(state, { type: "activate" }, props);

      expect(nextState).toEqual({ checkedState: true });
      expect(onCheckedChange).toHaveBeenCalledWith(true);
    });

    it("controlled Checkbox는 외부 checked 상태를 기준으로 활성화한다", () => {
      const onCheckedChange = vi.fn();
      const props = { checked: true, onCheckedChange } satisfies CheckboxProps;
      const state = machine.initial(props);

      const nextState = machine.transition(state, { type: "activate" }, props);

      expect(nextState).toEqual({ checkedState: false });
      expect(onCheckedChange).toHaveBeenCalledWith(false);
    });

    it("외부에서 checked 상태를 설정한다", () => {
      const onCheckedChange = vi.fn();
      const props = { onCheckedChange } satisfies CheckboxProps;
      const state = machine.initial(props);

      const nextState = machine.transition(
        state,
        { type: "checked.set", checked: "indeterminate" },
        props,
      );

      expect(nextState).toEqual({ checkedState: "indeterminate" });
      expect(onCheckedChange).toHaveBeenCalledWith("indeterminate");
    });

    it("같은 checked 상태를 설정하면 상태와 알림을 유지한다", () => {
      const onCheckedChange = vi.fn();
      const props = { onCheckedChange } satisfies CheckboxProps;
      const state = machine.initial(props);

      const nextState = machine.transition(state, { type: "checked.set", checked: false }, props);

      expect(nextState).toBe(state);
      expect(onCheckedChange).not.toHaveBeenCalled();
    });

    it("disabled Checkbox의 활성화를 무시한다", () => {
      const onCheckedChange = vi.fn();
      const props = { disabled: true, onCheckedChange } satisfies CheckboxProps;
      const state = machine.initial(props);

      const nextState = machine.transition(state, { type: "activate" }, props);

      expect(nextState).toBe(state);
      expect(onCheckedChange).not.toHaveBeenCalled();
    });
  });
});

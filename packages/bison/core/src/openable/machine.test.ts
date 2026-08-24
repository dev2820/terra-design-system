import { describe, expect, it, vi } from "vitest";

import { openableMachine } from "./machine";
import type { OpenableProps } from "./types";

describe("Openable", () => {
  describe("machine", () => {
    it("기본적으로 닫힌 상태로 시작한다", () => {
      expect(openableMachine.initial({})).toEqual({ open: false });
    });

    it("defaultOpen이 true이면 열린 상태로 시작한다", () => {
      expect(openableMachine.initial({ defaultOpen: true })).toEqual({ open: true });
    });

    it("open 이벤트를 받으면 연다", () => {
      const props = {} satisfies OpenableProps;
      const state = openableMachine.initial(props);

      expect(openableMachine.transition(state, { type: "open" }, props)).toEqual({ open: true });
    });

    it("close 이벤트를 받으면 닫는다", () => {
      const props = { defaultOpen: true } satisfies OpenableProps;
      const state = openableMachine.initial(props);

      expect(openableMachine.transition(state, { type: "close" }, props)).toEqual({ open: false });
    });

    it("toggle 이벤트를 받으면 현재 상태를 반전한다", () => {
      const props = {} satisfies OpenableProps;
      const state = openableMachine.initial(props);

      expect(openableMachine.transition(state, { type: "toggle" }, props)).toEqual({ open: true });
    });

    it("open.set 이벤트의 값으로 상태를 변경한다", () => {
      const props = {} satisfies OpenableProps;
      const state = openableMachine.initial(props);

      expect(openableMachine.transition(state, { type: "open.set", open: true }, props)).toEqual({
        open: true,
      });
    });

    it("open이 주어지면 내부 상태보다 제어된 값을 사용한다", () => {
      const props = { open: true } satisfies OpenableProps;
      const state = { open: false };

      expect(openableMachine.getOpen(state, props)).toBe(true);
    });

    it("상태가 변경되면 변경된 값을 알린다", () => {
      const onOpenChange = vi.fn();
      const props = { onOpenChange } satisfies OpenableProps;
      const state = openableMachine.initial(props);

      openableMachine.transition(state, { type: "open" }, props);

      expect(onOpenChange).toHaveBeenCalledOnce();
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    it("상태가 같으면 변경을 알리지 않는다", () => {
      const onOpenChange = vi.fn();
      const props = { onOpenChange } satisfies OpenableProps;
      const state = openableMachine.initial(props);

      openableMachine.transition(state, { type: "close" }, props);

      expect(onOpenChange).not.toHaveBeenCalled();
    });
  });
});

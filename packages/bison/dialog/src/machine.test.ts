import { describe, expect, it, vi } from "vitest";

import { machine } from "./machine";

describe("Dialog", () => {
  describe("machine", () => {
    it("기본적으로 닫힌 상태로 시작한다", () => {
      const state = machine.initial({ id: "dialog" });

      expect(state).toEqual({ open: false });
    });

    it("defaultOpen이 true이면 열린 상태로 시작한다", () => {
      const state = machine.initial({ id: "dialog", defaultOpen: true });

      expect(state).toEqual({ open: true });
    });

    it("열기 요청을 받으면 연다", () => {
      const props = { id: "dialog" };
      const state = machine.initial(props);

      const nextState = machine.transition(state, { type: "open" }, props);

      expect(nextState).toEqual({ open: true });
    });

    it("dismiss 요청을 받으면 닫는다", () => {
      const props = { id: "dialog", defaultOpen: true };
      const state = machine.initial(props);

      const nextState = machine.transition(state, { type: "dismiss" }, props);

      expect(nextState).toEqual({ open: false });
    });

    it("외부에서 열림 상태를 설정할 수 있다", () => {
      const props = { id: "dialog" };
      const state = machine.initial(props);

      const nextState = machine.transition(state, { type: "open.set", open: true }, props);

      expect(nextState).toEqual({ open: true });
    });

    it("열림 상태가 바뀌면 변경된 값을 알린다", () => {
      const onOpenChange = vi.fn();
      const props = { id: "dialog", onOpenChange };
      const state = machine.initial(props);

      machine.transition(state, { type: "open" }, props);

      expect(onOpenChange).toHaveBeenCalledWith(true);
    });
  });
});

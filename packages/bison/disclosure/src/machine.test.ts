import { describe, expect, it, vi } from "vitest";

import type { DisclosureProps } from "./index";
import { machine } from "./machine";

describe("Disclosure", () => {
  describe("machine", () => {
    it("기본적으로 닫힌 상태로 시작한다", () => {
      expect(machine.initial({ id: "details" })).toEqual({ open: false });
    });

    it("defaultOpen이 true이면 열린 상태로 시작한다", () => {
      expect(machine.initial({ id: "details", defaultOpen: true })).toEqual({ open: true });
    });

    it("닫힌 Trigger를 활성화하면 Content를 연다", () => {
      const props = { id: "details" } satisfies DisclosureProps;
      const state = machine.initial(props);

      expect(machine.transition(state, { type: "toggle" }, props)).toEqual({ open: true });
    });

    it("열린 Trigger를 활성화하면 Content를 닫는다", () => {
      const props = { id: "details", defaultOpen: true } satisfies DisclosureProps;
      const state = machine.initial(props);

      expect(machine.transition(state, { type: "toggle" }, props)).toEqual({ open: false });
    });

    it("controlled open을 기준으로 상태를 반전한다", () => {
      const props = { id: "details", open: true } satisfies DisclosureProps;
      const state = machine.initial(props);

      const nextState = machine.transition(state, { type: "toggle" }, props);

      expect(nextState).toEqual({ open: false });
    });

    it("외부에서 open 상태를 설정한다", () => {
      const props = { id: "details" } satisfies DisclosureProps;
      const state = machine.initial(props);

      const nextState = machine.transition(state, { type: "open.set", open: true }, props);

      expect(nextState).toEqual({ open: true });
    });

    it("open 상태가 바뀌면 변경된 값을 알린다", () => {
      const onOpenChange = vi.fn();
      const props = { id: "details", onOpenChange } satisfies DisclosureProps;
      const state = machine.initial(props);

      machine.transition(state, { type: "toggle" }, props);

      expect(onOpenChange).toHaveBeenCalledOnce();
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    it("같은 open 상태를 설정하면 상태와 알림을 유지한다", () => {
      const onOpenChange = vi.fn();
      const props = { id: "details", onOpenChange } satisfies DisclosureProps;
      const state = machine.initial(props);

      const nextState = machine.transition(state, { type: "open.set", open: false }, props);

      expect(nextState).toBe(state);
      expect(onOpenChange).not.toHaveBeenCalled();
    });

    it("disabled Trigger의 활성화를 무시한다", () => {
      const onOpenChange = vi.fn();
      const props = { id: "details", disabled: true, onOpenChange } satisfies DisclosureProps;
      const state = machine.initial(props);

      const nextState = machine.transition(state, { type: "toggle" }, props);

      expect(nextState).toBe(state);
      expect(onOpenChange).not.toHaveBeenCalled();
    });

    it("disabled 상태에서도 외부에서 open 상태를 설정한다", () => {
      const props = { id: "details", disabled: true } satisfies DisclosureProps;
      const state = machine.initial(props);

      const nextState = machine.transition(state, { type: "open.set", open: true }, props);

      expect(nextState).toEqual({ open: true });
    });
  });
});

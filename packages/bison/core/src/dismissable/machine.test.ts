import { describe, expect, it, vi } from "vitest";

import { dismissableMachine } from "./machine";
import type { DismissableProps } from "./types";

describe("Dismissable", () => {
  describe("machine", () => {
    it("Openable의 열기 이벤트를 처리한다", () => {
      const props = {} satisfies DismissableProps;
      const state = dismissableMachine.initial(props);

      expect(dismissableMachine.transition(state, { type: "open" }, props)).toEqual({ open: true });
    });

    it("dismiss 이벤트를 받으면 닫는다", () => {
      const props = { defaultOpen: true } satisfies DismissableProps;
      const state = dismissableMachine.initial(props);

      expect(dismissableMachine.transition(state, { type: "dismiss" }, props)).toEqual({
        open: false,
      });
    });

    it("dismiss 이벤트로 닫히면 변경된 값을 알린다", () => {
      const onOpenChange = vi.fn();
      const props = { defaultOpen: true, onOpenChange } satisfies DismissableProps;
      const state = dismissableMachine.initial(props);

      dismissableMachine.transition(state, { type: "dismiss" }, props);

      expect(onOpenChange).toHaveBeenCalledOnce();
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it("이미 닫혀 있으면 dismiss 이벤트로 변경을 알리지 않는다", () => {
      const onOpenChange = vi.fn();
      const props = { onOpenChange } satisfies DismissableProps;
      const state = dismissableMachine.initial(props);

      dismissableMachine.transition(state, { type: "dismiss" }, props);

      expect(onOpenChange).not.toHaveBeenCalled();
    });
  });
});

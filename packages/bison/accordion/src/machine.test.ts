import { describe, expect, it } from "vitest";

import type { AccordionProps } from "./index";
import { machine } from "./machine";

describe("Accordion", () => {
  describe("machine", () => {
    it("접힌 헤더를 활성화하면 연결된 패널을 펼친다", () => {
      const props = {
        id: "accordion",
      } satisfies AccordionProps<false>;
      const state = machine.initial(props);

      const nextState = machine.transition(
        state,
        { type: "trigger.activate", value: "first" },
        props,
      );

      expect(nextState.value).toEqual(["first"]);
    });

    it("multiple이 false이고 collapsible이 true이면 펼쳐진 패널을 접는다", () => {
      const props = {
        id: "accordion",
        multiple: false,
        collapsible: true,
        defaultValue: "first",
      } satisfies AccordionProps<false>;
      const state = machine.initial(props);

      const nextState = machine.transition(
        state,
        { type: "trigger.activate", value: "first" },
        props,
      );

      expect(nextState.value).toEqual([]);
    });

    it("multiple이 true이면 기존 패널을 펼친 상태로 유지한다", () => {
      const props = {
        id: "accordion",
        multiple: true,
        defaultValue: ["first"],
      } satisfies AccordionProps<true>;
      const state = machine.initial(props);

      const nextState = machine.transition(
        state,
        { type: "trigger.activate", value: "second" },
        props,
      );

      expect(nextState.value).toEqual(["first", "second"]);
    });

    it("multiple이 true이면 활성화한 패널만 접는다", () => {
      const props = {
        id: "accordion",
        multiple: true,
        defaultValue: ["first", "second"],
      } satisfies AccordionProps<true>;
      const state = machine.initial(props);

      const nextState = machine.transition(
        state,
        { type: "trigger.activate", value: "first" },
        props,
      );

      expect(nextState.value).toEqual(["second"]);
    });

    it("multiple이 false이면 새 패널을 펼칠 때 기존 패널을 접는다", () => {
      const props = {
        id: "accordion",
        multiple: false,
        defaultValue: "first",
      } satisfies AccordionProps<false>;
      const state = machine.initial(props);

      const nextState = machine.transition(
        state,
        { type: "trigger.activate", value: "second" },
        props,
      );

      expect(nextState.value).toEqual(["second"]);
    });

    it("multiple이 false이고 collapsible이 false이면 펼쳐진 패널을 유지한다", () => {
      const props = {
        id: "accordion",
        multiple: false,
        collapsible: false,
        defaultValue: "first",
      } satisfies AccordionProps<false>;
      const state = machine.initial(props);

      const nextState = machine.transition(
        state,
        { type: "trigger.activate", value: "first" },
        props,
      );

      expect(nextState.value).toEqual(["first"]);
    });
  });
});

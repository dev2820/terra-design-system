import type { ElementProps, NormalizeProps } from "@bison/core";
import { describe, expect, it } from "vitest";

import { connect } from "./connect";
import { machine } from "./machine";
import type { AccordionActor, AccordionEvent, AccordionProps, AccordionState } from "./types";

type TestElementProps = {
  element: {
    id?: string;
    hidden?: boolean;
    role?: string;
    "aria-labelledby"?: string;
  };
  button: {
    type?: string;
    id?: string;
    "aria-controls"?: string;
    "aria-expanded"?: boolean;
    "aria-disabled"?: true;
    onClick?: () => void;
  };
};

const normalize: NormalizeProps<TestElementProps> = {
  element: (props: ElementProps) => props as TestElementProps["element"],
  button: (props: ElementProps) => props as TestElementProps["button"],
};

function setup<Multiple extends boolean>(props: AccordionProps<Multiple>) {
  const events: AccordionEvent[] = [];
  const state: AccordionState = machine.initial(props);
  const actor: AccordionActor<Multiple> = {
    getSnapshot: () => ({ props, state }),
    send: (event) => events.push(event),
  };

  return { api: connect(actor, normalize), events };
}

describe("Accordion", () => {
  describe("connect", () => {
    describe("event", () => {
      it("setValue에 단일 value를 전달하면 배열로 변환해 value.set Event를 보낸다", () => {
        const { api, events } = setup({ id: "accordion" });

        api.setValue("first");

        expect(events).toEqual([{ type: "value.set", value: ["first"] }]);
      });

      it("setValue에 null을 전달하면 빈 배열로 변환해 value.set Event를 보낸다", () => {
        const { api, events } = setup({ id: "accordion" });

        api.setValue(null);

        expect(events).toEqual([{ type: "value.set", value: [] }]);
      });

      it("multiple의 setValue에 배열을 전달하면 그대로 value.set Event를 보낸다", () => {
        const { api, events } = setup({ id: "accordion", multiple: true });

        api.setValue(["first", "second"]);

        expect(events).toEqual([{ type: "value.set", value: ["first", "second"] }]);
      });

      it("Trigger의 onClick이 item value로 trigger.activate Event를 보낸다", () => {
        const { api, events } = setup({ id: "accordion" });
        const triggerProps = api.getTriggerProps({ value: "first" });

        triggerProps.onClick?.();

        expect(events).toEqual([{ type: "trigger.activate", value: "first" }]);
      });
    });

    describe("api", () => {
      it("단일 선택에서 펼친 item의 value를 노출한다", () => {
        const { api } = setup({ id: "accordion", defaultValue: "first" });

        expect(api.value).toBe("first");
      });

      it("단일 선택에서 펼친 item이 없으면 value를 null로 노출한다", () => {
        const { api } = setup({ id: "accordion" });

        expect(api.value).toBeNull();
      });

      it("multiple에서 펼친 item의 value를 배열로 노출한다", () => {
        const { api } = setup({
          id: "accordion",
          multiple: true,
          defaultValue: ["first", "second"],
        });

        expect(api.value).toEqual(["first", "second"]);
      });

      it("현재 value에 포함된 item을 펼친 상태로 노출한다", () => {
        const { api } = setup({ id: "accordion", defaultValue: "first" });

        expect(api.getItemState({ value: "first" }).expanded).toBe(true);
      });

      it("현재 value에 포함되지 않은 item을 접힌 상태로 노출한다", () => {
        const { api } = setup({ id: "accordion", defaultValue: "first" });

        expect(api.getItemState({ value: "second" }).expanded).toBe(false);
      });

      it("multiple이거나 collapsible이면 item을 접을 수 있다고 노출한다", () => {
        const multiple = setup({ id: "accordion", multiple: true });
        const collapsible = setup({ id: "accordion", collapsible: true });

        expect(multiple.api.getItemState({ value: "first" }).collapsible).toBe(true);
        expect(collapsible.api.getItemState({ value: "first" }).collapsible).toBe(true);
      });

      it("multiple이 아니고 collapsible이 아니면 item을 접을 수 없다고 노출한다", () => {
        const { api } = setup({ id: "accordion" });

        expect(api.getItemState({ value: "first" }).collapsible).toBe(false);
      });

      it("Trigger의 type을 button으로 설정한다", () => {
        const { api } = setup({ id: "accordion" });

        expect(api.getTriggerProps({ value: "first" }).type).toBe("button");
      });

      it("펼친 Trigger의 aria-expanded를 true로 설정한다", () => {
        const { api } = setup({ id: "accordion", defaultValue: "first" });

        expect(api.getTriggerProps({ value: "first" })["aria-expanded"]).toBe(true);
      });

      it("접힌 Trigger의 aria-expanded를 false로 설정한다", () => {
        const { api } = setup({ id: "accordion" });

        expect(api.getTriggerProps({ value: "first" })["aria-expanded"]).toBe(false);
      });

      it("aria-controls가 연결된 Panel의 ID를 가리킨다", () => {
        const { api } = setup({ id: "accordion" });
        const triggerProps = api.getTriggerProps({ value: "first" });
        const panelProps = api.getPanelProps({ value: "first" });

        expect(triggerProps["aria-controls"]).toBe(panelProps.id);
      });

      it("접을 수 없는 펼친 Trigger의 aria-disabled를 true로 설정한다", () => {
        const { api } = setup({
          id: "accordion",
          defaultValue: "first",
          collapsible: false,
        });

        expect(api.getTriggerProps({ value: "first" })["aria-disabled"]).toBe(true);
      });

      it("접을 수 있거나 접힌 Trigger에는 aria-disabled를 설정하지 않는다", () => {
        const collapsible = setup({
          id: "accordion",
          defaultValue: "first",
          collapsible: true,
        });
        const collapsed = setup({ id: "accordion" });

        expect(
          collapsible.api.getTriggerProps({ value: "first" })["aria-disabled"],
        ).toBeUndefined();
        expect(collapsed.api.getTriggerProps({ value: "first" })["aria-disabled"]).toBeUndefined();
      });

      it("접힌 Panel을 숨긴다", () => {
        const { api } = setup({ id: "accordion" });

        expect(api.getPanelProps({ value: "first" }).hidden).toBe(true);
      });

      it("펼친 Panel을 표시한다", () => {
        const { api } = setup({ id: "accordion", defaultValue: "first" });

        expect(api.getPanelProps({ value: "first" }).hidden).toBe(false);
      });

      it("요청하면 Panel을 region으로 노출한다", () => {
        const { api } = setup({ id: "accordion" });

        expect(api.getPanelProps({ value: "first", region: true }).role).toBe("region");
      });

      it("요청하지 않으면 Panel을 region으로 노출하지 않는다", () => {
        const { api } = setup({ id: "accordion" });

        expect(api.getPanelProps({ value: "first" }).role).toBeUndefined();
      });

      it("region인 Panel의 aria-labelledby가 Trigger의 ID를 가리킨다", () => {
        const { api } = setup({ id: "accordion" });
        const triggerProps = api.getTriggerProps({ value: "first" });
        const panelProps = api.getPanelProps({ value: "first", region: true });

        expect(panelProps["aria-labelledby"]).toBe(triggerProps.id);
      });

      it("region이 아닌 Panel에는 aria-labelledby를 설정하지 않는다", () => {
        const { api } = setup({ id: "accordion" });

        expect(api.getPanelProps({ value: "first" })["aria-labelledby"]).toBeUndefined();
      });
    });
  });
});

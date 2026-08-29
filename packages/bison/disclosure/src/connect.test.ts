import type { ElementProps, NormalizeProps } from "@bison/core";
import { afterEach, describe, expect, it, vi } from "vitest";
import { userEvent } from "vitest/browser";

import { connect } from "./connect";
import { machine } from "./machine";
import type { DisclosureActor, DisclosureProps, DisclosureState } from "./types";

interface TestElementProps {
  id?: string;
  hidden?: boolean;
}

interface TestButtonProps {
  type?: "button";
  disabled?: boolean;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
  onClick?: () => void;
}

interface TestDisclosurePropTypes {
  element: TestElementProps;
  button: TestButtonProps;
}

const normalize: NormalizeProps<TestDisclosurePropTypes> = {
  element: (props: ElementProps) => props as TestElementProps,
  button: (props: ElementProps) => props as TestButtonProps,
};

const fixtureRoots: HTMLElement[] = [];
const clickHandlers = new WeakMap<HTMLButtonElement, TestButtonProps["onClick"]>();

afterEach(() => {
  for (const root of fixtureRoots) {
    root.remove();
  }

  fixtureRoots.length = 0;
});

function applyAttribute(element: HTMLElement, name: string, value: string | boolean | undefined) {
  if (value === undefined) {
    element.removeAttribute(name);
    return;
  }

  element.setAttribute(name, String(value));
}

function applyButtonProps(element: HTMLButtonElement, props: TestButtonProps) {
  element.type = props.type ?? "submit";
  element.disabled = props.disabled ?? false;
  applyAttribute(element, "aria-expanded", props["aria-expanded"]);
  applyAttribute(element, "aria-controls", props["aria-controls"]);
  clickHandlers.set(element, props.onClick);
}

function applyContentProps(element: HTMLElement, props: TestElementProps) {
  applyAttribute(element, "id", props.id);
  element.hidden = props.hidden ?? false;
}

function setup(props: DisclosureProps = { id: "details" }) {
  const root = document.createElement("div");
  const form = document.createElement("form");
  const trigger = document.createElement("button");
  const content = document.createElement("div");
  let state: DisclosureState = machine.initial(props);
  let submissionCount = 0;
  let setOpen: (open: boolean) => void;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submissionCount += 1;
  });
  trigger.addEventListener("click", () => clickHandlers.get(trigger)?.());
  trigger.textContent = "상세 보기";
  content.textContent = "상세 내용";
  form.append(trigger, content);
  root.append(form);
  document.body.append(root);
  fixtureRoots.push(root);

  const actor: DisclosureActor = {
    getSnapshot: () => ({ props, state }),
    send(event) {
      state = machine.transition(state, event, props);
      render();
    },
  };

  function render() {
    const api = connect(actor, normalize);

    setOpen = api.setOpen;
    applyButtonProps(trigger, api.getTriggerProps());
    applyContentProps(content, api.getContentProps());
  }

  render();

  return {
    content,
    trigger,
    get submissionCount() {
      return submissionCount;
    },
    setOpen(open: boolean) {
      setOpen(open);
    },
  };
}

describe("Disclosure", () => {
  describe("connect", () => {
    describe("html", () => {
      it("Trigger를 button으로 만들어 form을 제출하지 않는다", async () => {
        const fixture = setup();

        await userEvent.click(fixture.trigger);

        expect(fixture.trigger.type).toBe("button");
        expect(fixture.submissionCount).toBe(0);
      });

      it("닫힌 Content를 숨기고 Trigger를 Content에 연결한다", () => {
        const fixture = setup();

        expect(fixture.content.hidden).toBe(true);
        expect(fixture.trigger.getAttribute("aria-expanded")).toBe("false");
        expect(fixture.trigger.getAttribute("aria-controls")).toBe(fixture.content.id);
        expect(document.getElementById(fixture.trigger.getAttribute("aria-controls") ?? "")).toBe(
          fixture.content,
        );
      });

      it("defaultOpen이 true이면 Content를 표시한다", () => {
        const fixture = setup({ id: "details", defaultOpen: true });

        expect(fixture.content.hidden).toBe(false);
        expect(fixture.trigger.getAttribute("aria-expanded")).toBe("true");
      });

      it("controlled open이 true이면 Content를 표시한다", () => {
        const fixture = setup({ id: "details", open: true });

        expect(fixture.content.hidden).toBe(false);
        expect(fixture.trigger.getAttribute("aria-expanded")).toBe("true");
      });

      it("disabled Trigger는 native disabled 속성을 사용한다", () => {
        const fixture = setup({ id: "details", disabled: true });

        expect(fixture.trigger.disabled).toBe(true);
        expect(fixture.trigger.hasAttribute("aria-disabled")).toBe(false);
      });
    });

    describe("accessibility", () => {
      it("Trigger를 활성화하면 Content와 aria-expanded를 함께 갱신한다", async () => {
        const onOpenChange = vi.fn();
        const fixture = setup({ id: "details", onOpenChange });

        await userEvent.click(fixture.trigger);

        expect(fixture.content.hidden).toBe(false);
        expect(fixture.trigger.getAttribute("aria-expanded")).toBe("true");
        expect(onOpenChange).toHaveBeenCalledWith(true);
      });

      it("외부에서 Content와 aria-expanded 상태를 설정한다", () => {
        const fixture = setup();

        fixture.setOpen(true);

        expect(fixture.content.hidden).toBe(false);
        expect(fixture.trigger.getAttribute("aria-expanded")).toBe("true");
      });

      it("disabled Trigger를 활성화해도 Content를 열지 않는다", () => {
        const onOpenChange = vi.fn();
        const fixture = setup({ id: "details", disabled: true, onOpenChange });

        fixture.trigger.click();

        expect(fixture.content.hidden).toBe(true);
        expect(fixture.trigger.getAttribute("aria-expanded")).toBe("false");
        expect(onOpenChange).not.toHaveBeenCalled();
      });
    });

    describe("keyboard", () => {
      it.skip("Enter와 Space로 Trigger를 활성화하고 Focus를 유지한다", () => {
        // 네이티브 <button>이 보장하는 동작이므로 Bison에서는 테스트하지 않는다.
      });

      it.skip("disabled Trigger를 Tab 순서에서 제외한다", () => {
        // 네이티브 <button disabled>가 보장하는 동작이므로 Bison에서는 테스트하지 않는다.
      });
    });
  });
});

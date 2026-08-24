import type { ElementProps, NormalizeProps } from "@bison/core";
import { afterEach, describe, expect, it } from "vitest";
import { userEvent } from "vitest/browser";

import { connect } from "./connect";
import { machine } from "./machine";
import type {
  DialogActor,
  DialogContentProps,
  DialogModalContract,
  DialogProps,
  DialogState,
} from "./types";

interface TestElementProps {
  id?: string;
  role?: string;
  hidden?: boolean;
  "aria-modal"?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  onKeyDown?: (event: KeyboardEvent) => void;
}

interface TestButtonProps {
  type?: "button";
  id?: string;
  "aria-haspopup"?: "dialog";
  "aria-controls"?: string;
  "aria-expanded"?: boolean;
  onClick?: () => void;
}

interface TestDialogPropTypes {
  element: TestElementProps;
  button: TestButtonProps;
}

const normalize: NormalizeProps<TestDialogPropTypes> = {
  element: (props: ElementProps) => props as TestElementProps,
  button: (props: ElementProps) => props as TestButtonProps,
};

const fixtureRoots: HTMLElement[] = [];
const keyDownHandlers = new WeakMap<HTMLElement, TestElementProps["onKeyDown"]>();
const clickHandlers = new WeakMap<HTMLButtonElement, TestButtonProps["onClick"]>();
const elementsWithKeyDownHandler = new WeakSet<HTMLElement>();
const elementsWithClickHandler = new WeakSet<HTMLButtonElement>();

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

function applyDialogProps(element: HTMLElement, props: TestElementProps) {
  if (props.id === undefined) {
    element.removeAttribute("id");
  } else {
    element.id = props.id;
  }

  applyAttribute(element, "role", props.role);
  applyAttribute(element, "aria-modal", props["aria-modal"]);
  applyAttribute(element, "aria-label", props["aria-label"]);
  applyAttribute(element, "aria-labelledby", props["aria-labelledby"]);
  applyAttribute(element, "aria-describedby", props["aria-describedby"]);
  element.hidden = props.hidden ?? false;
  keyDownHandlers.set(element, props.onKeyDown);

  if (!elementsWithKeyDownHandler.has(element)) {
    element.addEventListener("keydown", (event) => keyDownHandlers.get(element)?.(event));
    elementsWithKeyDownHandler.add(element);
  }
}

function applyButtonProps(element: HTMLButtonElement, props: TestButtonProps) {
  element.type = props.type ?? "submit";

  if (props.id === undefined) {
    element.removeAttribute("id");
  } else {
    element.id = props.id;
  }

  applyAttribute(element, "aria-haspopup", props["aria-haspopup"]);
  applyAttribute(element, "aria-controls", props["aria-controls"]);
  applyAttribute(element, "aria-expanded", props["aria-expanded"]);
  clickHandlers.set(element, props.onClick);

  if (!elementsWithClickHandler.has(element)) {
    element.addEventListener("click", () => clickHandlers.get(element)?.());
    elementsWithClickHandler.add(element);
  }
}

function applyElementId(element: HTMLElement, props: TestElementProps) {
  if (props.id === undefined) {
    element.removeAttribute("id");
    return;
  }

  element.id = props.id;
}

function setup({
  props = { id: "dialog" },
  content = { labelledBy: true, describedBy: true },
}: {
  props?: DialogProps;
  content?: DialogContentProps;
} = {}) {
  const fixtureRoot = document.createElement("div");
  const form = document.createElement("form");
  const trigger = document.createElement("button");
  const dialog = document.createElement("div");
  const title = document.createElement("h2");
  const description = document.createElement("p");
  const close = document.createElement("button");
  let state: DialogState = machine.initial(props);
  let modal: DialogModalContract | undefined;
  let submissionCount = 0;

  const actor: DialogActor = {
    getSnapshot: () => ({ props, state }),
    send(event) {
      state = machine.transition(state, event, props);
      render();
    },
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submissionCount += 1;
  });

  trigger.textContent = "열기";
  title.textContent = "제목";
  description.textContent = "설명";
  close.textContent = "닫기";
  dialog.append(title, description, close);
  form.append(trigger, dialog);
  fixtureRoot.append(form);
  document.body.append(fixtureRoot);
  fixtureRoots.push(fixtureRoot);

  function render() {
    const api = connect(actor, normalize);

    modal = api.modal;
    applyButtonProps(trigger, api.getTriggerProps());
    applyDialogProps(dialog, api.getDialogProps(content));
    applyElementId(title, api.getTitleProps());
    applyElementId(description, api.getDescriptionProps());
    applyButtonProps(close, api.getCloseTriggerProps());
  }

  render();

  return {
    close,
    description,
    dialog,
    get modal() {
      if (modal === undefined) {
        throw new Error("Dialog modal 계약을 찾을 수 없습니다.");
      }

      return modal;
    },
    get submissionCount() {
      return submissionCount;
    },
    title,
    trigger,
  };
}

describe("Dialog", () => {
  describe("connect", () => {
    describe("html", () => {
      it("닫힌 Dialog를 숨기고 Trigger가 연결된 Dialog를 가리킨다", () => {
        const fixture = setup();

        expect(fixture.dialog.hidden).toBe(true);
        expect(fixture.trigger.getAttribute("aria-haspopup")).toBe("dialog");
        expect(fixture.trigger.getAttribute("aria-controls")).toBe(fixture.dialog.id);
        expect(document.getElementById(fixture.trigger.getAttribute("aria-controls") ?? "")).toBe(
          fixture.dialog,
        );
        expect(fixture.trigger.getAttribute("aria-expanded")).toBe("false");
      });

      it("Trigger와 Close trigger를 button으로 만들어 form을 제출하지 않는다", async () => {
        const fixture = setup();

        await userEvent.click(fixture.trigger);
        await userEvent.click(fixture.close);

        expect(fixture.trigger.type).toBe("button");
        expect(fixture.close.type).toBe("button");
        expect(fixture.submissionCount).toBe(0);
      });
    });

    describe("accessibility", () => {
      it("Dialog를 modal dialog로 노출하고 Title 및 설명을 연결한다", () => {
        const fixture = setup({ props: { id: "dialog", defaultOpen: true } });

        expect(fixture.dialog.getAttribute("role")).toBe("dialog");
        expect(fixture.dialog.getAttribute("aria-modal")).toBe("true");
        expect(fixture.dialog.getAttribute("aria-labelledby")).toBe(fixture.title.id);
        expect(document.getElementById(fixture.dialog.getAttribute("aria-labelledby") ?? "")).toBe(
          fixture.title,
        );
        expect(fixture.dialog.getAttribute("aria-describedby")).toBe(fixture.description.id);
        expect(document.getElementById(fixture.dialog.getAttribute("aria-describedby") ?? "")).toBe(
          fixture.description,
        );
      });

      it("aria-label로 이름을 제공하면 Title과 설명을 참조하지 않는다", () => {
        const fixture = setup({ content: { label: "설정" } });

        expect(fixture.dialog.getAttribute("aria-label")).toBe("설정");
        expect(fixture.dialog.hasAttribute("aria-labelledby")).toBe(false);
        expect(fixture.dialog.hasAttribute("aria-describedby")).toBe(false);
      });

      it("modal 구현에 필요한 Focus와 외부 영역 동작을 요구한다", () => {
        const fixture = setup({ props: { id: "dialog", initialFocusId: "primary-action" } });

        expect(fixture.modal).toEqual({
          active: false,
          focus: {
            moveInside: true,
            contain: true,
            restore: true,
            initialFocusId: "primary-action",
          },
          outside: {
            inert: true,
            preventScroll: true,
          },
        });
      });

      it("Dialog가 열리면 modal 구현 계약을 활성화한다", async () => {
        const fixture = setup();

        await userEvent.click(fixture.trigger);

        expect(fixture.modal.active).toBe(true);
      });
    });

    describe("keyboard", () => {
      it("Enter로 Trigger를 활성화하면 Dialog를 연다", async () => {
        const fixture = setup();

        fixture.trigger.focus();
        await userEvent.keyboard("{Enter}");

        expect(fixture.dialog.hidden).toBe(false);
        expect(fixture.trigger.getAttribute("aria-expanded")).toBe("true");
      });

      it("Space로 Trigger를 활성화하면 Dialog를 연다", async () => {
        const fixture = setup();

        fixture.trigger.focus();
        await userEvent.keyboard("{Space}");

        expect(fixture.dialog.hidden).toBe(false);
        expect(fixture.trigger.getAttribute("aria-expanded")).toBe("true");
      });

      it("Escape로 Dialog를 닫는다", async () => {
        const fixture = setup({ props: { id: "dialog", defaultOpen: true } });

        fixture.close.focus();
        await userEvent.keyboard("{Escape}");

        expect(fixture.dialog.hidden).toBe(true);
        expect(fixture.trigger.getAttribute("aria-expanded")).toBe("false");
      });

      it("Close trigger를 활성화하면 Dialog를 닫는다", async () => {
        const fixture = setup({ props: { id: "dialog", defaultOpen: true } });

        fixture.close.focus();
        await userEvent.keyboard("{Enter}");

        expect(fixture.dialog.hidden).toBe(true);
        expect(fixture.trigger.getAttribute("aria-expanded")).toBe("false");
      });
    });
  });
});

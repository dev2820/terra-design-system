import type { ElementProps, NormalizeProps } from "@bison/core";
import { afterEach, describe, expect, it } from "vitest";
import { userEvent } from "vitest/browser";

import { connect } from "./connect";
import { machine } from "./machine";
import type {
  AlertDialogActor,
  AlertDialogContentProps,
  AlertDialogProps,
  AlertDialogState,
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

interface TestAlertDialogPropTypes {
  element: TestElementProps;
  button: TestButtonProps;
}

const normalize: NormalizeProps<TestAlertDialogPropTypes> = {
  element: (props: ElementProps) => props as TestElementProps,
  button: (props: ElementProps) => props as TestButtonProps,
};

const fixtureRoots: HTMLElement[] = [];
const keyDownHandlers = new WeakMap<HTMLElement, TestElementProps["onKeyDown"]>();
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

function applyAlertDialogProps(element: HTMLElement, props: TestElementProps) {
  element.id = props.id ?? "";
  element.hidden = props.hidden ?? false;
  applyAttribute(element, "role", props.role);
  applyAttribute(element, "aria-modal", props["aria-modal"]);
  applyAttribute(element, "aria-label", props["aria-label"]);
  applyAttribute(element, "aria-labelledby", props["aria-labelledby"]);
  applyAttribute(element, "aria-describedby", props["aria-describedby"]);
  keyDownHandlers.set(element, props.onKeyDown);
}

function applyButtonProps(element: HTMLButtonElement, props: TestButtonProps) {
  element.type = props.type ?? "submit";
  element.id = props.id ?? "";
  applyAttribute(element, "aria-haspopup", props["aria-haspopup"]);
  applyAttribute(element, "aria-controls", props["aria-controls"]);
  applyAttribute(element, "aria-expanded", props["aria-expanded"]);
  clickHandlers.set(element, props.onClick);
}

function setup({
  props = { id: "delete-confirmation" },
  content = { labelledBy: true },
}: {
  props?: AlertDialogProps;
  content?: AlertDialogContentProps;
} = {}) {
  const root = document.createElement("div");
  const form = document.createElement("form");
  const trigger = document.createElement("button");
  const alertDialog = document.createElement("div");
  const title = document.createElement("h2");
  const message = document.createElement("p");
  const close = document.createElement("button");
  let state: AlertDialogState = machine.initial(props);
  let modal = connect(
    {
      getSnapshot: () => ({ props, state }),
      send: () => undefined,
    },
    normalize,
  ).modal;
  let submissionCount = 0;

  const actor: AlertDialogActor = {
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
  trigger.addEventListener("click", () => clickHandlers.get(trigger)?.());
  close.addEventListener("click", () => clickHandlers.get(close)?.());
  alertDialog.addEventListener("keydown", (event) => keyDownHandlers.get(alertDialog)?.(event));

  trigger.textContent = "삭제";
  title.textContent = "파일을 삭제하시겠습니까?";
  message.textContent = "이 작업은 되돌릴 수 없습니다.";
  close.textContent = "취소";
  alertDialog.append(title, message, close);
  form.append(trigger, alertDialog);
  root.append(form);
  document.body.append(root);
  fixtureRoots.push(root);

  function render() {
    const api = connect(actor, normalize);

    modal = api.modal;
    applyButtonProps(trigger, api.getTriggerProps());
    applyAlertDialogProps(alertDialog, api.getAlertDialogProps(content));
    title.id = api.getTitleProps().id ?? "";
    message.id = api.getMessageProps().id ?? "";
    applyButtonProps(close, api.getCloseTriggerProps());
  }

  render();

  return {
    alertDialog,
    close,
    message,
    get modal() {
      return modal;
    },
    get submissionCount() {
      return submissionCount;
    },
    title,
    trigger,
  };
}

describe("Alert Dialog", () => {
  describe("connect", () => {
    describe("html", () => {
      it("닫힌 Alert Dialog를 숨기고 Trigger가 연결된 Alert Dialog를 가리킨다", () => {
        const fixture = setup();

        expect(fixture.alertDialog.hidden).toBe(true);
        expect(fixture.trigger.getAttribute("aria-haspopup")).toBe("dialog");
        expect(fixture.trigger.getAttribute("aria-controls")).toBe(fixture.alertDialog.id);
        expect(document.getElementById(fixture.trigger.getAttribute("aria-controls") ?? "")).toBe(
          fixture.alertDialog,
        );
        expect(fixture.trigger.getAttribute("aria-expanded")).toBe("false");
      });

      it("controlled open이 true이면 Alert Dialog를 표시한다", () => {
        const fixture = setup({ props: { id: "delete-confirmation", open: true } });

        expect(fixture.alertDialog.hidden).toBe(false);
        expect(fixture.trigger.getAttribute("aria-expanded")).toBe("true");
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
      it("Alert Dialog를 modal alertdialog로 노출하고 Title과 경고 메시지를 연결한다", () => {
        const fixture = setup({ props: { id: "delete-confirmation", defaultOpen: true } });

        expect(fixture.alertDialog.getAttribute("role")).toBe("alertdialog");
        expect(fixture.alertDialog.getAttribute("aria-modal")).toBe("true");
        expect(fixture.alertDialog.getAttribute("aria-labelledby")).toBe(fixture.title.id);
        expect(
          document.getElementById(fixture.alertDialog.getAttribute("aria-labelledby") ?? ""),
        ).toBe(fixture.title);
        expect(fixture.alertDialog.getAttribute("aria-describedby")).toBe(fixture.message.id);
        expect(
          document.getElementById(fixture.alertDialog.getAttribute("aria-describedby") ?? ""),
        ).toBe(fixture.message);
      });

      it("aria-label로 이름을 제공해도 경고 메시지를 연결한다", () => {
        const fixture = setup({ content: { label: "파일 삭제 확인" } });

        expect(fixture.alertDialog.getAttribute("aria-label")).toBe("파일 삭제 확인");
        expect(fixture.alertDialog.hasAttribute("aria-labelledby")).toBe(false);
        expect(fixture.alertDialog.getAttribute("aria-describedby")).toBe(fixture.message.id);
      });

      it("modal 구현에 필요한 Focus와 외부 영역 동작을 요구한다", () => {
        const fixture = setup({
          props: { id: "delete-confirmation", initialFocusId: "cancel-delete" },
        });

        expect(fixture.modal).toEqual({
          active: false,
          focus: {
            moveInside: true,
            contain: true,
            restore: true,
            initialFocusId: "cancel-delete",
          },
          outside: {
            inert: true,
            preventScroll: true,
          },
        });
      });

      it("Alert Dialog가 열리면 modal 구현 계약을 활성화한다", async () => {
        const fixture = setup();

        await userEvent.click(fixture.trigger);

        expect(fixture.modal.active).toBe(true);
      });
    });

    describe("keyboard", () => {
      it("Enter로 Trigger를 활성화하면 Alert Dialog를 연다", async () => {
        const fixture = setup();

        fixture.trigger.focus();
        await userEvent.keyboard("{Enter}");

        expect(fixture.alertDialog.hidden).toBe(false);
        expect(fixture.trigger.getAttribute("aria-expanded")).toBe("true");
      });

      it("Space로 Trigger를 활성화하면 Alert Dialog를 연다", async () => {
        const fixture = setup();

        fixture.trigger.focus();
        await userEvent.keyboard("{Space}");

        expect(fixture.alertDialog.hidden).toBe(false);
        expect(fixture.trigger.getAttribute("aria-expanded")).toBe("true");
      });

      it("Escape로 Alert Dialog를 닫는다", async () => {
        const fixture = setup({ props: { id: "delete-confirmation", defaultOpen: true } });

        fixture.close.focus();
        await userEvent.keyboard("{Escape}");

        expect(fixture.alertDialog.hidden).toBe(true);
        expect(fixture.trigger.getAttribute("aria-expanded")).toBe("false");
      });

      it("Close trigger를 활성화하면 Alert Dialog를 닫는다", async () => {
        const fixture = setup({ props: { id: "delete-confirmation", defaultOpen: true } });

        fixture.close.focus();
        await userEvent.keyboard("{Enter}");

        expect(fixture.alertDialog.hidden).toBe(true);
        expect(fixture.trigger.getAttribute("aria-expanded")).toBe("false");
      });
    });
  });
});

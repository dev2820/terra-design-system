import type { ElementProps, NormalizeProps } from "@bison/core";
import { afterEach, describe, expect, it, vi } from "vitest";
import { userEvent } from "vitest/browser";

import { connect } from "./connect";
import { machine } from "./machine";
import type { ButtonActor, ButtonProps, ButtonState, ButtonType } from "./types";

interface TestButtonProps {
  type?: ButtonType;
  disabled?: boolean;
  "aria-pressed"?: boolean;
  onClick?: () => void;
}

interface TestButtonPropTypes {
  button: TestButtonProps;
}

const normalize: NormalizeProps<TestButtonPropTypes> = {
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

function setOptionalAttribute(element: Element, name: string, value: boolean | undefined) {
  if (value === undefined) {
    element.removeAttribute(name);
    return;
  }

  element.setAttribute(name, String(value));
}

function applyButtonProps(element: HTMLButtonElement, props: TestButtonProps) {
  element.type = props.type ?? "submit";
  element.disabled = props.disabled ?? false;
  setOptionalAttribute(element, "aria-pressed", props["aria-pressed"]);
  clickHandlers.set(element, props.onClick);
}

function setup<Toggle extends boolean>(props: ButtonProps<Toggle>) {
  const root = document.createElement("div");
  const form = document.createElement("form");
  const buttonElement = document.createElement("button");
  let state: ButtonState = machine.initial(props);
  let submissionCount = 0;
  let render: () => void;
  let setPressed: ((pressed: boolean) => void) | undefined;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submissionCount += 1;
  });
  buttonElement.addEventListener("click", () => clickHandlers.get(buttonElement)?.());
  buttonElement.textContent = "실행";
  form.append(buttonElement);
  root.append(form);
  document.body.append(root);
  fixtureRoots.push(root);

  const actor: ButtonActor<Toggle> = {
    getSnapshot: () => ({ props, state }),
    send(event) {
      state = machine.transition(state, event, props);
      render();
    },
  };

  render = () => {
    const api = connect(actor, normalize);

    applyButtonProps(buttonElement, api.getRootProps());

    if ("setPressed" in api) {
      setPressed = api.setPressed;
    }
  };

  render();

  return {
    button: buttonElement,
    get submissionCount() {
      return submissionCount;
    },
    setPressed(pressed: boolean) {
      if (!setPressed) {
        throw new Error("기본 Button에는 pressed 상태가 없습니다.");
      }

      setPressed(pressed);
    },
  };
}

describe("Button", () => {
  describe("connect", () => {
    describe("html", () => {
      it("기본 type을 button으로 설정해 form을 제출하지 않는다", async () => {
        const fixture = setup({});

        await userEvent.click(fixture.button);

        expect(fixture.button.type).toBe("button");
        expect(fixture.submissionCount).toBe(0);
      });

      it("요청하면 submit button으로 form을 제출한다", async () => {
        const fixture = setup({ type: "submit" });

        await userEvent.click(fixture.button);

        expect(fixture.button.type).toBe("submit");
        expect(fixture.submissionCount).toBe(1);
      });

      it("disabled Button은 native disabled 속성을 사용한다", () => {
        const fixture = setup({ disabled: true });

        expect(fixture.button.disabled).toBe(true);
        expect(fixture.button.hasAttribute("aria-disabled")).toBe(false);
      });
    });

    describe("accessibility", () => {
      it("기본 Button에는 aria-pressed를 설정하지 않는다", () => {
        const fixture = setup({});

        expect(fixture.button.hasAttribute("aria-pressed")).toBe(false);
      });

      it("toggle: true Button의 pressed 상태를 aria-pressed로 노출한다", () => {
        const fixture = setup({ toggle: true, defaultPressed: true });

        expect(fixture.button.getAttribute("aria-pressed")).toBe("true");
      });

      it("toggle: true Button을 활성화하면 aria-pressed를 갱신한다", async () => {
        const fixture = setup({ toggle: true });

        await userEvent.click(fixture.button);

        expect(fixture.button.getAttribute("aria-pressed")).toBe("true");
      });

      it("외부에서 toggle: true Button의 aria-pressed를 설정한다", () => {
        const fixture = setup({ toggle: true });

        fixture.setPressed(true);

        expect(fixture.button.getAttribute("aria-pressed")).toBe("true");
      });

      it("disabled Button을 활성화해도 결과를 알리지 않는다", () => {
        const onActivate = vi.fn();
        const fixture = setup({ disabled: true, onActivate });

        fixture.button.click();

        expect(onActivate).not.toHaveBeenCalled();
      });
    });

    describe("keyboard", () => {
      it("Enter로 Button을 활성화하고 Focus를 유지한다", async () => {
        const onActivate = vi.fn();
        const fixture = setup({ onActivate });

        fixture.button.focus();
        await userEvent.keyboard("{Enter}");

        expect(onActivate).toHaveBeenCalledOnce();
        expect(document.activeElement).toBe(fixture.button);
      });

      it("Space로 Button을 활성화하고 Focus를 유지한다", async () => {
        const onActivate = vi.fn();
        const fixture = setup({ onActivate });

        fixture.button.focus();
        await userEvent.keyboard("{Space}");

        expect(onActivate).toHaveBeenCalledOnce();
        expect(document.activeElement).toBe(fixture.button);
      });

      it("disabled Button을 Tab 순서에서 제외한다", async () => {
        const fixture = setup({ disabled: true });

        await userEvent.tab();

        expect(document.activeElement).not.toBe(fixture.button);
      });
    });
  });
});

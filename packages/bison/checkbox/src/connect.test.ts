import type { ElementProps, NormalizeProps } from "@bison/core";
import { afterEach, describe, expect, it, vi } from "vitest";
import { userEvent } from "vitest/browser";

import { connect } from "./connect";
import { machine } from "./machine";
import type { CheckboxActor, CheckboxCheckedState, CheckboxProps, CheckboxState } from "./types";

interface TestInputProps {
  type?: "checkbox";
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  onChange?: () => void;
}

interface TestCheckboxPropTypes {
  input: TestInputProps;
}

const normalize: NormalizeProps<TestCheckboxPropTypes> = {
  input: (props: ElementProps) => props as TestInputProps,
};

const fixtureRoots: HTMLElement[] = [];
const changeHandlers = new WeakMap<HTMLInputElement, TestInputProps["onChange"]>();

afterEach(() => {
  for (const root of fixtureRoots) {
    root.remove();
  }

  fixtureRoots.length = 0;
});

function applyInputProps(element: HTMLInputElement, props: TestInputProps) {
  element.type = props.type ?? "text";
  element.checked = props.checked ?? false;
  element.indeterminate = props.indeterminate ?? false;
  element.disabled = props.disabled ?? false;
  changeHandlers.set(element, props.onChange);
}

function setup(props: CheckboxProps) {
  const root = document.createElement("div");
  const label = document.createElement("label");
  const input = document.createElement("input");
  let state: CheckboxState = machine.initial(props);
  let render: () => void;
  let setChecked: (checked: CheckboxCheckedState) => void;

  label.append(input, " 알림 받기");
  root.append(label);
  document.body.append(root);
  fixtureRoots.push(root);

  input.addEventListener("change", () => changeHandlers.get(input)?.());

  const actor: CheckboxActor = {
    getSnapshot: () => ({ props, state }),
    send(event) {
      state = machine.transition(state, event, props);
      render();
    },
  };

  render = () => {
    const api = connect(actor, normalize);

    applyInputProps(input, api.getInputProps());
    setChecked = api.setChecked;
  };

  render();

  return {
    input,
    label,
    setChecked(checked: CheckboxCheckedState) {
      setChecked(checked);
    },
  };
}

describe("Checkbox", () => {
  describe("connect", () => {
    describe("html", () => {
      it("native checkbox input을 사용한다", () => {
        const fixture = setup({});

        expect(fixture.input.type).toBe("checkbox");
        expect(fixture.input.hasAttribute("role")).toBe(false);
        expect(fixture.input.hasAttribute("aria-checked")).toBe(false);
      });

      it("checked 상태를 native checked property로 표현한다", () => {
        const fixture = setup({ defaultChecked: true });

        expect(fixture.input.checked).toBe(true);
        expect(fixture.input.indeterminate).toBe(false);
      });

      it("controlled checked 상태를 native checked property로 표현한다", () => {
        const fixture = setup({ checked: true });

        expect(fixture.input.checked).toBe(true);
        expect(fixture.input.indeterminate).toBe(false);
      });

      it("indeterminate 상태를 native indeterminate property로 표현한다", () => {
        const fixture = setup({ defaultChecked: "indeterminate" });

        expect(fixture.input.checked).toBe(false);
        expect(fixture.input.indeterminate).toBe(true);
      });

      it("외부에서 native checked와 indeterminate property를 설정한다", () => {
        const fixture = setup({});

        fixture.setChecked("indeterminate");

        expect(fixture.input.checked).toBe(false);
        expect(fixture.input.indeterminate).toBe(true);

        fixture.setChecked(true);

        expect(fixture.input.checked).toBe(true);
        expect(fixture.input.indeterminate).toBe(false);
      });

      it("disabled Checkbox는 native disabled 속성을 사용한다", () => {
        const fixture = setup({ disabled: true });

        expect(fixture.input.disabled).toBe(true);
        expect(fixture.input.hasAttribute("aria-disabled")).toBe(false);
      });
    });

    describe("accessibility", () => {
      it("wrapping label로 이름을 얻고 label을 누르면 상태를 변경한다", async () => {
        const onCheckedChange = vi.fn();
        const fixture = setup({ onCheckedChange });

        expect(Array.from(fixture.input.labels ?? [])).toContain(fixture.label);

        await userEvent.click(fixture.label);

        expect(fixture.input.checked).toBe(true);
        expect(onCheckedChange).toHaveBeenCalledWith(true);
      });

      it("indeterminate Checkbox를 활성화하면 선택 상태가 된다", async () => {
        const fixture = setup({ defaultChecked: "indeterminate" });

        await userEvent.click(fixture.input);

        expect(fixture.input.checked).toBe(true);
        expect(fixture.input.indeterminate).toBe(false);
      });

      it("disabled Checkbox를 활성화해도 상태를 변경하지 않는다", () => {
        const onCheckedChange = vi.fn();
        const fixture = setup({ disabled: true, onCheckedChange });

        fixture.label.click();

        expect(fixture.input.checked).toBe(false);
        expect(onCheckedChange).not.toHaveBeenCalled();
      });
    });

    describe("keyboard", () => {
      it.skip("Space로 Checkbox를 활성화하고 Focus를 유지한다", () => {
        // 네이티브 <input type="checkbox">가 보장하는 동작이므로 Bison에서는 테스트하지 않는다.
      });

      it.skip("disabled Checkbox를 Tab 순서에서 제외한다", () => {
        // 네이티브 <input type="checkbox" disabled>가 보장하는 동작이므로 Bison에서는 테스트하지 않는다.
      });
    });
  });
});

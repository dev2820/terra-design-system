import axe from "axe-core";
import { Component, createRef, type ReactNode, useState } from "react";
import { flushSync } from "react-dom";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import { Field } from "../field/index";
import { Fieldset } from "../fieldset/index";
import { Checkbox as RootExportCheckbox } from "../index";
import { Checkbox } from "./index";

const fixtures: Array<{ container: HTMLDivElement; root: Root }> = [];

afterEach(() => {
  for (const fixture of fixtures) {
    flushSync(() => fixture.root.unmount());
    fixture.container.remove();
  }

  fixtures.length = 0;
});

function render(children: ReactNode) {
  const container = document.createElement("div");
  const root = createRoot(container);

  document.body.append(container);
  fixtures.push({ container, root });
  flushSync(() => root.render(children));

  return {
    container,
    rerender(next: ReactNode) {
      flushSync(() => root.render(next));
    },
  };
}

class TestErrorBoundary extends Component<
  { children: ReactNode },
  { error: globalThis.Error | null }
> {
  state: { error: globalThis.Error | null } = { error: null };

  static getDerivedStateFromError(error: globalThis.Error) {
    return { error };
  }

  render() {
    return this.state.error ? this.state.error.message : this.props.children;
  }
}

function ControlledFixture() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox.Root checked={checked} onCheckedChange={setChecked}>
      <Checkbox.Indicator>{checked ? "선택" : "해제"}</Checkbox.Indicator>
      <Checkbox.HiddenInput aria-label="알림" />
    </Checkbox.Root>
  );
}

function FieldDisabledFixture({ disabled }: { disabled: boolean }) {
  return (
    <Field.Root disabled={disabled}>
      <Checkbox.Root>
        <Checkbox.Control data-testid="control">
          <Checkbox.Indicator keepMounted>✓</Checkbox.Indicator>
        </Checkbox.Control>
        <Checkbox.Label>옵션</Checkbox.Label>
        <Checkbox.HiddenInput />
      </Checkbox.Root>
    </Field.Root>
  );
}

describe("Checkbox", () => {
  it("루트와 하위 경로에서 같은 Checkbox를 제공한다", () => {
    expect(RootExportCheckbox).toBe(Checkbox);
  });

  describe("구조", () => {
    it("label Root에 Control, Label과 명시적인 HiddenInput을 조합한다", () => {
      const rootRef = createRef<HTMLLabelElement>();
      const inputRef = createRef<HTMLInputElement>();
      const { container } = render(
        <Checkbox.Root
          ref={rootRef}
          id="notifications-root"
          name="notifications"
          value="enabled"
          required
          style={{ position: "static" }}
        >
          <Checkbox.Control data-testid="control">
            <Checkbox.Indicator>✓</Checkbox.Indicator>
          </Checkbox.Control>
          <Checkbox.Label>알림</Checkbox.Label>
          <Checkbox.HiddenInput ref={inputRef} id="notifications" />
        </Checkbox.Root>,
      );
      const root = container.querySelector("label");
      const input = container.querySelector("input");

      expect(rootRef.current).toBe(root);
      expect(inputRef.current).toBe(input);
      expect(root?.style.position).toBe("static");
      expect(root?.hasAttribute("role")).toBe(false);
      expect(input?.type).toBe("checkbox");
      expect(input?.id).toBe("notifications");
      expect(input?.name).toBe("notifications");
      expect(input?.value).toBe("enabled");
      expect(input?.required).toBe(true);
      expect(root?.id).toBe("notifications-root");
      expect(container.querySelector("[data-testid=control]")?.getAttribute("aria-hidden")).toBe(
        "true",
      );
      expect(container.querySelector("[data-testid=control]")?.hasAttribute("tabindex")).toBe(
        false,
      );
      expect(input?.style.position).toBe("absolute");
      expect(input?.style.clipPath).toBe("inset(50%)");
      expect(input?.style.width).toBe("1px");
      expect(input?.style.height).toBe("1px");
      expect(input?.hidden).toBe(false);
      expect(input?.hasAttribute("aria-hidden")).toBe(false);
    });

    it("HiddenInput을 명시하지 않으면 input을 자동으로 만들지 않는다", () => {
      const { container } = render(
        <Checkbox.Root>
          <Checkbox.Control />
          <Checkbox.Label>알림</Checkbox.Label>
        </Checkbox.Root>,
      );

      expect(container.querySelector("input")).toBeNull();
      expect(container.querySelector("label")?.style.position).toBe("");
    });

    it.each(["Control", "Label", "HiddenInput", "Indicator"] as const)(
      "%s는 Root 밖에서 사용할 수 없다",
      (part) => {
        const Part = Checkbox[part];
        const error = vi.spyOn(console, "error").mockImplementation(() => {});

        try {
          const { container } = render(
            <TestErrorBoundary>
              <Part />
            </TestErrorBoundary>,
          );

          expect(container.textContent).toBe(`Checkbox.${part} must be used within Checkbox.Root.`);
        } finally {
          error.mockRestore();
        }
      },
    );
  });

  describe("상태", () => {
    it("uncontrolled checked 상태와 변경 세부 정보를 제공한다", async () => {
      const onCheckedChange = vi.fn();
      const { container } = render(
        <Checkbox.Root onCheckedChange={onCheckedChange}>
          <Checkbox.Indicator>✓</Checkbox.Indicator>
          <Checkbox.HiddenInput />
          <Checkbox.Label>알림 받기</Checkbox.Label>
        </Checkbox.Root>,
      );
      const label = container.querySelector("label");
      const root = container.querySelector("label");
      const input = container.querySelector("input");

      if (!label || !input) {
        throw new Error("Checkbox 테스트 구성이 완전하지 않습니다.");
      }

      expect(root?.hasAttribute("data-unchecked")).toBe(true);
      expect(container.querySelector("[aria-hidden=true]")).toBeNull();

      flushSync(() => label.click());

      expect(input.checked).toBe(true);
      expect(root?.hasAttribute("data-checked")).toBe(true);
      expect(container.querySelector("[aria-hidden=true]")?.textContent).toBe("✓");
      expect(onCheckedChange).toHaveBeenCalledOnce();
      expect(onCheckedChange.mock.calls[0]?.[0]).toBe(true);
      expect(onCheckedChange.mock.calls[0]?.[1].reason).toBe("input-change");
      expect(onCheckedChange.mock.calls[0]?.[1].input).toBe(input);
      expect(onCheckedChange.mock.calls[0]?.[1].isCanceled).toBe(false);
      expect(onCheckedChange.mock.calls[0]?.[1].event).toBeInstanceOf(Event);
    });

    it("controlled 상태를 외부 값과 동기화한다", async () => {
      const { container } = render(<ControlledFixture />);
      const input = container.querySelector("input");

      if (!input) {
        throw new Error("Checkbox 테스트 구성이 완전하지 않습니다.");
      }

      expect(input.checked).toBe(false);
      flushSync(() => input.click());
      expect(input.checked).toBe(true);
      expect(container.textContent).toBe("선택");
    });

    it("변경을 취소하면 이전 상태를 유지한다", async () => {
      const onCheckedChange = vi.fn((_checked, details) => details.cancel());
      const { container } = render(
        <Checkbox.Root onCheckedChange={onCheckedChange}>
          <Checkbox.Indicator>✓</Checkbox.Indicator>
          <Checkbox.HiddenInput aria-label="동의" />
        </Checkbox.Root>,
      );
      const input = container.querySelector("input");

      if (!input) {
        throw new Error("Checkbox 테스트 구성이 완전하지 않습니다.");
      }

      flushSync(() => input.click());

      expect(input.checked).toBe(false);
      expect(container.firstElementChild?.hasAttribute("data-unchecked")).toBe(true);
      expect(onCheckedChange.mock.calls[0]?.[1].isCanceled).toBe(true);
    });

    it("checked와 indeterminate를 독립적으로 유지한다", async () => {
      const onCheckedChange = vi.fn();
      const { container, rerender } = render(
        <Checkbox.Root defaultChecked indeterminate onCheckedChange={onCheckedChange}>
          <Checkbox.Indicator>
            {(state) => (state.indeterminate ? "부분 선택" : "전체 선택")}
          </Checkbox.Indicator>
          <Checkbox.HiddenInput aria-label="전체 선택" />
        </Checkbox.Root>,
      );
      const root = container.firstElementChild;
      const input = container.querySelector("input");

      if (!input) {
        throw new Error("Checkbox 테스트 구성이 완전하지 않습니다.");
      }

      expect(input.checked).toBe(true);
      expect(input.indeterminate).toBe(true);
      expect(root?.hasAttribute("data-checked")).toBe(true);
      expect(root?.hasAttribute("data-indeterminate")).toBe(true);
      expect(container.textContent).toBe("부분 선택");

      flushSync(() => input.click());

      expect(onCheckedChange).toHaveBeenLastCalledWith(false, expect.anything());
      expect(input.checked).toBe(false);
      expect(input.indeterminate).toBe(true);
      expect(root?.hasAttribute("data-unchecked")).toBe(true);
      expect(container.textContent).toBe("부분 선택");

      rerender(
        <Checkbox.Root>
          <Checkbox.Indicator>
            {(state) => (state.indeterminate ? "부분 선택" : "전체 선택")}
          </Checkbox.Indicator>
          <Checkbox.HiddenInput aria-label="전체 선택" />
        </Checkbox.Root>,
      );
      expect(input.indeterminate).toBe(false);
      expect(container.querySelectorAll("span")).toHaveLength(0);
    });

    it("keepMounted Indicator에 모든 상태를 전달한다", () => {
      const { container } = render(
        <Checkbox.Root disabled readOnly required>
          <Checkbox.Indicator keepMounted>{(state) => JSON.stringify(state)}</Checkbox.Indicator>
          <Checkbox.HiddenInput aria-label="옵션" />
        </Checkbox.Root>,
      );
      const indicator = container.querySelector("span");

      expect(indicator?.getAttribute("aria-hidden")).toBe("true");
      expect(indicator?.hasAttribute("data-unchecked")).toBe(true);
      expect(indicator?.hasAttribute("data-disabled")).toBe(true);
      expect(indicator?.hasAttribute("data-readonly")).toBe(true);
      expect(indicator?.hasAttribute("data-required")).toBe(true);
      expect(indicator?.textContent).toBe(
        JSON.stringify({
          checked: false,
          indeterminate: false,
          disabled: true,
          readOnly: true,
          required: true,
        }),
      );
    });
  });

  describe("Field와 Form", () => {
    it("Field의 label, description과 disabled 상태에 연결된다", async () => {
      const { container } = render(
        <Field.Root name="terms" disabled>
          <Field.Label>약관 동의</Field.Label>
          <Checkbox.Root data-testid="checkbox-root">
            <Checkbox.Indicator>✓</Checkbox.Indicator>
            <Checkbox.HiddenInput />
          </Checkbox.Root>
          <Field.Description>필수 약관입니다.</Field.Description>
        </Field.Root>,
      );
      const checkboxRoot = container.querySelector("[data-testid=checkbox-root]");
      const input = container.querySelector("input");
      const label = container.querySelector("label");
      const description = container.querySelector("p");

      expect(label?.htmlFor).toBe(input?.id);
      expect(input?.name).toBe("terms");
      expect(input?.disabled).toBe(true);
      expect(input?.getAttribute("aria-describedby")).toBe(description?.id);
      expect(checkboxRoot?.hasAttribute("data-disabled")).toBe(true);
      await expect.element(page.getByRole("checkbox", { name: "약관 동의" })).toBeDisabled();
    });

    it("Fieldset의 disabled 상태를 Root와 native input에 반영한다", () => {
      const { container } = render(
        <Fieldset.Root disabled>
          <Fieldset.Legend>선택</Fieldset.Legend>
          <Checkbox.Root>
            <Checkbox.HiddenInput />
          </Checkbox.Root>
        </Fieldset.Root>,
      );
      const checkboxRoot = container.querySelector("fieldset > label");
      const input = container.querySelector("input");

      expect(input?.disabled).toBe(true);
      expect(checkboxRoot?.hasAttribute("data-disabled")).toBe(true);
    });

    it("Field disabled 변경을 모든 Part와 HiddenInput에 함께 반영한다", () => {
      const { container, rerender } = render(<FieldDisabledFixture disabled={false} />);
      const parts = container.querySelectorAll("label, span");
      const input = container.querySelector("input");

      expect(input?.disabled).toBe(false);
      for (const part of parts) expect(part.hasAttribute("data-disabled")).toBe(false);
      rerender(<FieldDisabledFixture disabled />);
      expect(input?.disabled).toBe(true);
      for (const part of parts) expect(part.hasAttribute("data-disabled")).toBe(true);
      rerender(<FieldDisabledFixture disabled={false} />);
      expect(input?.disabled).toBe(false);
      for (const part of parts) expect(part.hasAttribute("data-disabled")).toBe(false);
    });

    it("외부 form 연결과 required validation을 HiddenInput에서 유지한다", async () => {
      const { container } = render(
        <>
          <form id="settings" />
          <Checkbox.Root form="settings" name="consent" required>
            <Checkbox.Label>동의</Checkbox.Label>
            <Checkbox.HiddenInput />
          </Checkbox.Root>
        </>,
      );
      const form = container.querySelector("form");
      const input = container.querySelector("input");
      if (!form || !input) throw new Error("Checkbox 테스트 구성이 완전하지 않습니다.");

      expect(input.form).toBe(form);
      expect(input.validity.valueMissing).toBe(true);
      await page.getByText("동의").click();
      expect(input.validity.valueMissing).toBe(false);
      expect(Array.from(new FormData(form))).toEqual([["consent", "on"]]);
      form.reset();
      await vi.waitFor(() => {
        expect(input.checked).toBe(false);
        expect(container.querySelector("label")?.hasAttribute("data-unchecked")).toBe(true);
      });
    });

    it.each([false, true])(
      "reset 버튼으로 checked를 초기값 %s로 복원하고 모든 Part를 동기화한다",
      async (defaultChecked) => {
        const { container } = render(
          <form>
            <Checkbox.Root
              defaultChecked={defaultChecked}
              indeterminate
              name="feature"
              value="enabled"
            >
              <Checkbox.Control data-testid="control">
                <Checkbox.Indicator keepMounted data-testid="indicator">
                  ✓
                </Checkbox.Indicator>
              </Checkbox.Control>
              <Checkbox.Label>기능</Checkbox.Label>
              <Checkbox.HiddenInput />
            </Checkbox.Root>
            <button type="reset">초기화</button>
          </form>,
        );
        const form = container.querySelector("form");
        const input = container.querySelector("input");
        const reset = container.querySelector("button");

        if (!form || !input || !reset) {
          throw new Error("Checkbox 테스트 구성이 완전하지 않습니다.");
        }

        expect(Array.from(new FormData(form))).toEqual(
          defaultChecked ? [["feature", "enabled"]] : [],
        );
        await page.getByText("기능").click();
        expect(input.checked).toBe(!defaultChecked);
        expect(input.indeterminate).toBe(true);
        expect(Array.from(new FormData(form))).toEqual(
          defaultChecked ? [] : [["feature", "enabled"]],
        );

        await page.getByRole("button", { name: "초기화" }).click();
        await vi.waitFor(() => {
          expect(input.checked).toBe(defaultChecked);
          for (const part of container.querySelectorAll("label, span")) {
            expect(part.hasAttribute("data-checked")).toBe(defaultChecked);
            expect(part.hasAttribute("data-unchecked")).toBe(!defaultChecked);
          }
        });
        expect(input.indeterminate).toBe(true);
        expect(Array.from(new FormData(form))).toEqual(
          defaultChecked ? [["feature", "enabled"]] : [],
        );
      },
    );
  });

  describe("HiddenInput 생명주기", () => {
    it("HiddenInput을 다시 마운트해도 Root 상태를 유지하고 ref를 정리한다", () => {
      const inputRef = createRef<HTMLInputElement>();
      function fixture(show: boolean) {
        return (
          <Checkbox.Root indeterminate>
            <Checkbox.Label>알림</Checkbox.Label>
            {show && <Checkbox.HiddenInput ref={inputRef} />}
          </Checkbox.Root>
        );
      }
      const { container, rerender } = render(fixture(true));
      const input = container.querySelector("input");
      if (!input) throw new Error("Checkbox 테스트 구성이 완전하지 않습니다.");
      flushSync(() => input.click());
      expect(input.checked).toBe(true);
      rerender(fixture(false));
      expect(inputRef.current).toBeNull();
      expect(container.querySelector("input")).toBeNull();
      rerender(fixture(true));
      expect(inputRef.current?.checked).toBe(true);
      expect(inputRef.current?.indeterminate).toBe(true);
    });

    it("reset이 취소되면 checked와 indeterminate를 유지한다", async () => {
      const { container } = render(
        <form onReset={(event) => event.preventDefault()}>
          <Checkbox.Root indeterminate>
            <Checkbox.Label>알림</Checkbox.Label>
            <Checkbox.HiddenInput />
          </Checkbox.Root>
        </form>,
      );
      const form = container.querySelector("form");
      const input = container.querySelector("input");
      if (!form || !input) throw new Error("Checkbox 테스트 구성이 완전하지 않습니다.");
      flushSync(() => input.click());
      form.reset();
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(input.checked).toBe(true);
      expect(input.indeterminate).toBe(true);
      expect(container.querySelector("label")?.hasAttribute("data-checked")).toBe(true);
    });
  });

  describe("상호작용과 접근성", () => {
    it("Root의 label 영역을 누르면 HiddenInput이 활성화된다", async () => {
      render(
        <Checkbox.Root
          data-testid="checkbox-root"
          style={{ display: "inline-block", inlineSize: 24, blockSize: 24 }}
        >
          <Checkbox.Indicator keepMounted>✓</Checkbox.Indicator>
          <Checkbox.HiddenInput aria-label="알림" />
        </Checkbox.Root>,
      );

      await page.getByTestId("checkbox-root").click();
      await expect.element(page.getByRole("checkbox", { name: "알림" })).toBeChecked();
    });

    it("Control과 Label 클릭은 한 번씩 토글하고 HiddenInput에서 Space로 변경한다", async () => {
      const onCheckedChange = vi.fn();
      const { container } = render(
        <Checkbox.Root
          onCheckedChange={onCheckedChange}
          style={{ display: "inline-flex", gap: 12 }}
        >
          <Checkbox.Control data-testid="control" style={{ width: 24, height: 24 }}>
            <Checkbox.Indicator keepMounted>✓</Checkbox.Indicator>
          </Checkbox.Control>
          <Checkbox.Label>새 소식 받기</Checkbox.Label>
          <Checkbox.HiddenInput />
        </Checkbox.Root>,
      );
      const input = container.querySelector("input");
      const checkbox = page.getByRole("checkbox", { name: "새 소식 받기" });

      await page.getByTestId("control").click();
      await expect.element(checkbox).toBeChecked();
      expect(onCheckedChange).toHaveBeenCalledTimes(1);
      expect(document.activeElement).toBe(input);

      await page.getByText("새 소식 받기").click();
      await expect.element(checkbox).not.toBeChecked();
      expect(onCheckedChange).toHaveBeenCalledTimes(2);

      await userEvent.keyboard(" ");
      await expect.element(checkbox).toBeChecked();
      expect(onCheckedChange).toHaveBeenCalledTimes(3);
      expect(container.querySelector("[data-testid=control]")?.hasAttribute("data-checked")).toBe(
        true,
      );
    });

    it("Tab은 시각 Part를 건너뛰고 HiddenInput에 포커스한다", async () => {
      const { container } = render(
        <>
          <button>이전</button>
          <Checkbox.Root>
            <Checkbox.Control>
              <Checkbox.Indicator keepMounted>✓</Checkbox.Indicator>
            </Checkbox.Control>
            <Checkbox.Label>선택 항목</Checkbox.Label>
            <Checkbox.HiddenInput />
          </Checkbox.Root>
          <button>다음</button>
        </>,
      );

      await page.getByRole("button", { name: "이전" }).click();
      await userEvent.tab();
      expect(document.activeElement).toBe(container.querySelector("input"));
      await userEvent.keyboard(" ");
      await expect.element(page.getByRole("checkbox", { name: "선택 항목" })).toBeChecked();
      await userEvent.tab();
      await expect.element(page.getByRole("button", { name: "다음" })).toHaveFocus();
    });

    it("readOnly는 focus와 FormData를 유지하면서 포인터와 Space 변경을 막는다", async () => {
      const onCheckedChange = vi.fn();
      const { container } = render(
        <form>
          <Checkbox.Root
            defaultChecked
            readOnly
            name="status"
            value="active"
            onCheckedChange={onCheckedChange}
          >
            <Checkbox.HiddenInput aria-label="상태" />
          </Checkbox.Root>
        </form>,
      );
      const form = container.querySelector("form");
      const input = container.querySelector("input");

      if (!form || !input) {
        throw new Error("Checkbox 테스트 구성이 완전하지 않습니다.");
      }

      input.focus();
      flushSync(() => input.click());
      expect(input.checked).toBe(true);
      expect(document.activeElement).toBe(input);

      await userEvent.keyboard(" ");
      expect(input.checked).toBe(true);
      expect(input.getAttribute("aria-readonly")).toBe("true");
      expect(Array.from(new FormData(form))).toEqual([["status", "active"]]);
      expect(onCheckedChange).not.toHaveBeenCalled();
    });

    it("label과 description을 가진 기본 조합에 자동 감지 가능한 위반이 없다", async () => {
      const { container } = render(
        <Field.Root name="updates">
          <Field.Label>업데이트 받기</Field.Label>
          <Checkbox.Root>
            <Checkbox.Control>
              <Checkbox.Indicator>✓</Checkbox.Indicator>
            </Checkbox.Control>
            <Checkbox.HiddenInput />
          </Checkbox.Root>
          <Field.Description>새 소식을 이메일로 보냅니다.</Field.Description>
        </Field.Root>,
      );
      const results = await axe.run(container);

      expect(results.violations).toEqual([]);
    });
  });
});

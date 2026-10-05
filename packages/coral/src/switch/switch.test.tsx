import axe from "axe-core";
import { Component, createRef, type ComponentProps, type ReactNode, useState } from "react";
import { flushSync } from "react-dom";
import { createRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import { Field } from "../field/index";
import { Fieldset } from "../fieldset/index";
import { Switch as RootExportSwitch } from "../index";
import { Switch } from "./index";

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

function Parts() {
  return (
    <>
      <Switch.Control
        data-testid="control"
        style={{ display: "inline-block", width: 40, height: 24 }}
      >
        <Switch.Thumb data-testid="thumb" />
      </Switch.Control>
      <Switch.Label>알림</Switch.Label>
      <Switch.HiddenInput />
    </>
  );
}

function ControlledFixture() {
  const [checked, setChecked] = useState(false);
  return (
    <Switch.Root checked={checked} onCheckedChange={setChecked}>
      <Parts />
    </Switch.Root>
  );
}

function FieldFixture({ invalid }: { invalid: boolean }) {
  return (
    <Field.Root name="notifications" invalid={invalid}>
      <Field.Label>알림</Field.Label>
      <Switch.Root required>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Switch.HiddenInput />
      </Switch.Root>
      <Field.Description>새 소식을 보냅니다.</Field.Description>
      <Field.Error>알림을 켜 주세요.</Field.Error>
    </Field.Root>
  );
}

function Box(props: ComponentProps<"span">) {
  return <span {...props} />;
}

function Text(props: ComponentProps<"span">) {
  return <span {...props} />;
}

// Native input owns keyboard activation, label activation, FormData and validation.
// These tests verify their integration with Coral state, hidden input and composed Parts;
// they do not repeat the browser's full checkbox interaction or validation matrix.
describe("Switch", () => {
  it("루트와 하위 경로에서 같은 Switch를 제공한다", () => {
    expect(RootExportSwitch).toBe(Switch);
  });

  it("label Root와 switch 역할을 가진 네이티브 input을 연결한다", async () => {
    const rootRef = createRef<HTMLLabelElement>();
    const inputRef = createRef<HTMLInputElement>();
    const { container } = render(
      <Switch.Root ref={rootRef} id="notifications-root" name="notifications" value="enabled">
        <Switch.Control>
          <Switch.Thumb>장식</Switch.Thumb>
        </Switch.Control>
        <Switch.Label id="notifications-label">알림</Switch.Label>
        <Switch.HiddenInput ref={inputRef} id="notifications" />
      </Switch.Root>,
    );
    const input = container.querySelector("input")!;

    expect(rootRef.current).toBe(container.querySelector("label"));
    expect(inputRef.current).toBe(input);
    expect(rootRef.current?.id).toBe("notifications-root");
    expect(rootRef.current?.hasAttribute("role")).toBe(false);
    expect(rootRef.current?.style.position).toBe("");
    expect(input.type).toBe("checkbox");
    expect(input.id).toBe("notifications");
    expect(input.name).toBe("notifications");
    expect(input.value).toBe("enabled");
    expect(input.labels?.[0]).toBe(rootRef.current);
    expect(input.hasAttribute("aria-checked")).toBe(false);
    expect(input.hasAttribute("aria-readonly")).toBe(false);
    expect(input.hasAttribute("aria-hidden")).toBe(false);
    expect(input.hidden).toBe(false);
    expect(input.style.clipPath).toBe("inset(50%)");
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(2);
    await expect.element(page.getByRole("switch", { name: "알림", exact: true })).not.toBeChecked();
  });

  it("서버 HTML에서도 label 연결과 초기 상태가 완성된다", () => {
    const { container } = render(null);
    container.innerHTML = renderToString(
      <Switch.Root defaultChecked>
        <Parts />
      </Switch.Root>,
    );
    const input = container.querySelector("input")!;

    expect(input.labels?.[0]).toBe(container.querySelector("label"));
    expect(input.getAttribute("role")).toBe("switch");
    expect(input.checked).toBe(true);
    for (const part of container.querySelectorAll("label, span")) {
      expect(part.hasAttribute("data-checked")).toBe(true);
    }
    expect(input.hasAttribute("aria-labelledby")).toBe(false);
  });

  it("HiddenInput을 생략하면 input을 자동으로 만들지 않는다", () => {
    const { container } = render(
      <Switch.Root>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Switch.Label>알림</Switch.Label>
      </Switch.Root>,
    );

    expect(container.querySelector("input")).toBeNull();
    expect(container.querySelectorAll("span")).toHaveLength(3);
  });

  it.each(["Control", "Thumb", "Label", "HiddenInput"] as const)(
    "%s를 Root 밖에서 사용하면 오류가 발생한다",
    (part) => {
      const Part = Switch[part];
      const error = vi.spyOn(console, "error").mockImplementation(() => {});

      try {
        const { container } = render(
          <TestErrorBoundary>
            <Part />
          </TestErrorBoundary>,
        );
        expect(container.textContent).toBe(`Switch.${part} must be used within Switch.Root.`);
      } finally {
        error.mockRestore();
      }
    },
  );

  it("Control과 Label 클릭 및 Space 입력이 상태를 한 번씩 바꾼다", async () => {
    const onCheckedChange = vi.fn();
    const { container } = render(
      <Switch.Root onCheckedChange={onCheckedChange}>
        <Parts />
      </Switch.Root>,
    );
    const input = container.querySelector("input")!;
    const thumb = container.querySelector("[data-testid=thumb]");
    const control = page.getByRole("switch", { name: "알림" });

    await page.getByTestId("control").click();
    await expect.element(control).toBeChecked();
    expect(document.activeElement).toBe(input);
    expect(onCheckedChange).toHaveBeenCalledTimes(1);
    expect(onCheckedChange.mock.calls[0]?.[0]).toBe(true);
    expect(onCheckedChange.mock.calls[0]?.[1].reason).toBe("input-change");
    expect(onCheckedChange.mock.calls[0]?.[1].input).toBe(input);
    expect(onCheckedChange.mock.calls[0]?.[1].isCanceled).toBe(false);
    expect(onCheckedChange.mock.calls[0]?.[1].event).toBeInstanceOf(Event);
    for (const part of container.querySelectorAll("label, span")) {
      expect(part.hasAttribute("data-checked")).toBe(true);
      expect(part.hasAttribute("data-unchecked")).toBe(false);
    }

    await page.getByText("알림", { exact: true }).click();
    await expect.element(control).not.toBeChecked();
    expect(onCheckedChange).toHaveBeenCalledTimes(2);
    expect(container.querySelector("[data-testid=thumb]")).toBe(thumb);
    for (const part of container.querySelectorAll("label, span")) {
      expect(part.hasAttribute("data-checked")).toBe(false);
      expect(part.hasAttribute("data-unchecked")).toBe(true);
    }

    await userEvent.keyboard(" ");
    await expect.element(control).toBeChecked();
    expect(onCheckedChange).toHaveBeenCalledTimes(3);
  });

  it("Tab은 HiddenInput을 한 번 방문하고 시각 Part를 건너뛴다", async () => {
    render(
      <>
        <button>이전</button>
        <Switch.Root>
          <Parts />
        </Switch.Root>
        <button>다음</button>
      </>,
    );

    await page.getByRole("button", { name: "이전" }).click();
    await userEvent.tab();
    await expect.element(page.getByRole("switch", { name: "알림" })).toHaveFocus();
    await userEvent.tab();
    await expect.element(page.getByRole("button", { name: "다음" })).toHaveFocus();
  });

  it("controlled 값의 변경을 요청하고 부모의 갱신을 반영한다", async () => {
    render(<ControlledFixture />);

    await page.getByText("알림", { exact: true }).click();
    await expect.element(page.getByRole("switch", { name: "알림" })).toBeChecked();
    await expect.element(page.getByTestId("thumb")).toHaveAttribute("data-checked");
  });

  it("부모가 controlled 값을 갱신하지 않으면 기존 상태를 유지한다", async () => {
    const onCheckedChange = vi.fn();
    const { rerender } = render(
      <Switch.Root checked={false} onCheckedChange={onCheckedChange}>
        <Parts />
      </Switch.Root>,
    );

    await page.getByText("알림", { exact: true }).click();
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
    await expect.element(page.getByRole("switch", { name: "알림" })).not.toBeChecked();
    await expect.element(page.getByTestId("thumb")).toHaveAttribute("data-unchecked");

    rerender(
      <Switch.Root checked onCheckedChange={onCheckedChange}>
        <Parts />
      </Switch.Root>,
    );
    await expect.element(page.getByRole("switch", { name: "알림" })).toBeChecked();
    await expect.element(page.getByTestId("thumb")).toHaveAttribute("data-checked");
  });

  it.each([false, true])(
    "변경을 취소하면 초기 상태 %s와 폼 값을 유지한다",
    async (defaultChecked) => {
      const onCheckedChange = vi.fn((_checked, details) => details.cancel());
      const { container } = render(
        <form>
          <Switch.Root
            defaultChecked={defaultChecked}
            name="notifications"
            onCheckedChange={onCheckedChange}
          >
            <Parts />
          </Switch.Root>
        </form>,
      );

      await page.getByText("알림", { exact: true }).click();
      expect(container.querySelector("input")?.checked).toBe(defaultChecked);
      expect(container.querySelector("[data-testid=thumb]")?.hasAttribute("data-checked")).toBe(
        defaultChecked,
      );
      expect(onCheckedChange.mock.calls[0]?.[1].isCanceled).toBe(true);
      expect(Array.from(new FormData(container.querySelector("form")!))).toEqual(
        defaultChecked ? [["notifications", "on"]] : [],
      );
    },
  );

  it.each([false, true])(
    "readOnly는 상태 %s에서 클릭과 Space 변경을 막고 포커스와 폼 참여를 유지한다",
    async (defaultChecked) => {
      const onCheckedChange = vi.fn();
      const { container, rerender } = render(
        <form>
          <Switch.Root
            defaultChecked={defaultChecked}
            readOnly
            name="notifications"
            onCheckedChange={onCheckedChange}
          >
            <Parts />
          </Switch.Root>
        </form>,
      );
      const input = container.querySelector("input")!;

      await page.getByText("알림", { exact: true }).click();
      expect(document.activeElement).toBe(input);
      expect(input.checked).toBe(defaultChecked);
      await userEvent.keyboard(" ");
      expect(input.checked).toBe(defaultChecked);
      expect(input.getAttribute("aria-readonly")).toBe("true");
      expect(input.hasAttribute("readonly")).toBe(false);
      expect(onCheckedChange).not.toHaveBeenCalled();
      expect(Array.from(new FormData(container.querySelector("form")!))).toEqual(
        defaultChecked ? [["notifications", "on"]] : [],
      );
      for (const part of container.querySelectorAll("label, span"))
        expect(part.hasAttribute("data-readonly")).toBe(true);

      rerender(
        <form>
          <Switch.Root
            defaultChecked={defaultChecked}
            name="notifications"
            onCheckedChange={onCheckedChange}
          >
            <Parts />
          </Switch.Root>
        </form>,
      );
      expect(input.hasAttribute("aria-readonly")).toBe(false);
      for (const part of container.querySelectorAll("label, span"))
        expect(part.hasAttribute("data-readonly")).toBe(false);
      await page.getByText("알림", { exact: true }).click();
      expect(input.checked).toBe(!defaultChecked);
    },
  );

  it.each(["Root", "Field", "Fieldset"] as const)(
    "%s의 disabled 변경을 모든 Part와 input에 반영한다",
    async (owner) => {
      const onCheckedChange = vi.fn();
      function fixture(disabled: boolean) {
        const control = (
          <Switch.Root
            disabled={owner === "Root" && disabled}
            name="notifications"
            defaultChecked
            onCheckedChange={onCheckedChange}
          >
            <Parts />
          </Switch.Root>
        );
        return (
          <form>
            {owner === "Field" ? (
              <Field.Root disabled={disabled}>{control}</Field.Root>
            ) : owner === "Fieldset" ? (
              <Fieldset.Root disabled={disabled}>{control}</Fieldset.Root>
            ) : (
              control
            )}
          </form>
        );
      }
      const { container, rerender } = render(fixture(true));
      const input = container.querySelector("input")!;

      // Send the pointer input without waiting for the disabled label to become enabled.
      await page.getByText("알림", { exact: true }).click({ force: true });
      expect(input.disabled).toBe(true);
      expect(input.checked).toBe(true);
      expect(onCheckedChange).not.toHaveBeenCalled();
      expect(Array.from(new FormData(container.querySelector("form")!))).toEqual([]);
      for (const part of container.querySelectorAll("label, span"))
        expect(part.hasAttribute("data-disabled")).toBe(true);

      rerender(fixture(false));
      expect(input.disabled).toBe(false);
      for (const part of container.querySelectorAll("label, span"))
        expect(part.hasAttribute("data-disabled")).toBe(false);
      await page.getByText("알림", { exact: true }).click();
      expect(input.checked).toBe(false);
    },
  );

  it.each([false, true])(
    "form reset은 초기값 %s로 input과 시각 상태를 함께 복원한다",
    async (defaultChecked) => {
      const onCheckedChange = vi.fn();
      const { container } = render(
        <form>
          <Switch.Root
            defaultChecked={defaultChecked}
            name="notifications"
            value="enabled"
            onCheckedChange={onCheckedChange}
          >
            <Parts />
          </Switch.Root>
          <button type="reset">초기화</button>
        </form>,
      );
      const form = container.querySelector("form")!;
      const input = container.querySelector("input")!;

      await page.getByText("알림", { exact: true }).click();
      expect(Array.from(new FormData(form))).toEqual(
        defaultChecked ? [] : [["notifications", "enabled"]],
      );
      await page.getByRole("button", { name: "초기화" }).click();
      await vi.waitFor(() => {
        expect(input.checked).toBe(defaultChecked);
        for (const part of container.querySelectorAll("label, span"))
          expect(part.hasAttribute("data-checked")).toBe(defaultChecked);
      });
      expect(Array.from(new FormData(form))).toEqual(
        defaultChecked ? [["notifications", "enabled"]] : [],
      );
      expect(onCheckedChange).toHaveBeenCalledTimes(1);
    },
  );

  it("취소된 reset은 현재 상태를 유지한다", async () => {
    const { container } = render(
      <form onReset={(event) => event.preventDefault()}>
        <Switch.Root>
          <Parts />
        </Switch.Root>
      </form>,
    );

    await page.getByText("알림", { exact: true }).click();
    container.querySelector("form")!.reset();
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(container.querySelector("input")?.checked).toBe(true);
    expect(container.querySelector("[data-testid=thumb]")?.hasAttribute("data-checked")).toBe(true);
  });

  it("외부 form과 required를 연결하고 기본 제출값 on을 유지한다", async () => {
    const { container } = render(
      <>
        <form id="settings" />
        <Switch.Root form="settings" required name="notifications">
          <Parts />
        </Switch.Root>
      </>,
    );
    const form = container.querySelector("form")!;
    const input = container.querySelector("input")!;

    expect(input.form).toBe(form);
    expect(input.required).toBe(true);
    expect(input.validity.valueMissing).toBe(true);
    for (const part of container.querySelectorAll("label, span"))
      expect(part.hasAttribute("data-required")).toBe(true);
    await page.getByText("알림", { exact: true }).click();
    expect(input.validity.valueMissing).toBe(false);
    expect(Array.from(new FormData(form))).toEqual([["notifications", "on"]]);
    form.reset();
    await vi.waitFor(() => {
      expect(input.checked).toBe(false);
      expect(container.querySelector("[data-testid=thumb]")?.hasAttribute("data-unchecked")).toBe(
        true,
      );
    });
  });

  it("Field의 이름, 설명, 오류와 validation을 HiddenInput에 연결한다", async () => {
    const { container, rerender } = render(<FieldFixture invalid />);
    const input = container.querySelector("input")!;
    const label = container.querySelector("label")!;

    expect(input.name).toBe("notifications");
    expect(label.htmlFor).toBe(input.id);
    expect(input.getAttribute("aria-invalid")).toBe("true");
    const descriptions = input
      .getAttribute("aria-describedby")!
      .split(" ")
      .map((id) => document.getElementById(id)?.textContent);
    expect(descriptions).toEqual(["새 소식을 보냅니다.", "알림을 켜 주세요."]);
    await expect.element(page.getByRole("switch", { name: "알림" })).toBeVisible();
    expect((await axe.run(container)).violations).toEqual([]);

    rerender(<FieldFixture invalid={false} />);
    expect(input.hasAttribute("aria-invalid")).toBe(false);
    expect(input.getAttribute("aria-describedby")?.split(" ")).toHaveLength(1);
    await page.getByText("알림", { exact: true }).click();
    expect(input.validity.valueMissing).toBe(false);
  });

  it("Label 없이 HiddenInput에서 접근 가능한 이름을 지정할 수 있다", async () => {
    render(
      <Switch.Root>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Switch.HiddenInput aria-label="자동 저장" />
      </Switch.Root>,
    );

    await expect.element(page.getByRole("switch", { name: "자동 저장" })).toBeInTheDocument();
  });

  it("HiddenInput을 다시 마운트해도 Root 상태를 유지하고 ref를 정리한다", async () => {
    const inputRef = createRef<HTMLInputElement>();
    function fixture(show: boolean) {
      return (
        <Switch.Root>
          <Switch.Label>알림</Switch.Label>
          {show && <Switch.HiddenInput ref={inputRef} />}
        </Switch.Root>
      );
    }
    const { rerender } = render(fixture(true));

    await page.getByText("알림", { exact: true }).click();
    expect(inputRef.current?.checked).toBe(true);
    rerender(fixture(false));
    expect(inputRef.current).toBeNull();
    rerender(fixture(true));
    expect(inputRef.current?.checked).toBe(true);
  });

  it("Control, Thumb과 Label을 사용자 컴포넌트와 합성한다", async () => {
    const controlRef = createRef<HTMLSpanElement>();
    const renderRef = createRef<HTMLSpanElement>();
    const thumbRef = createRef<HTMLSpanElement>();
    const labelRef = createRef<HTMLSpanElement>();
    const onRenderClick = vi.fn();
    const onPartClick = vi.fn();
    const { container } = render(
      <Switch.Root>
        <Switch.Control
          render={<Box ref={renderRef} className="box" onClick={onRenderClick} />}
          ref={controlRef}
          className="control"
          onClick={onPartClick}
        >
          <Switch.Thumb render={<Box />} ref={thumbRef}>
            장식
          </Switch.Thumb>
        </Switch.Control>
        <Switch.Label render={<Text className="text" />} ref={labelRef}>
          알림
        </Switch.Label>
        <Switch.HiddenInput />
      </Switch.Root>,
    );

    expect(controlRef.current).toBe(renderRef.current);
    expect(controlRef.current?.className).toBe("box control");
    expect(controlRef.current?.contains(thumbRef.current)).toBe(true);
    expect(thumbRef.current?.getAttribute("aria-hidden")).toBe("true");
    expect(labelRef.current?.textContent).toBe("알림");
    expect(labelRef.current?.className).toBe("text");
    await page.getByText("장식").click();
    expect(onRenderClick).toHaveBeenCalledOnce();
    expect(onPartClick).toHaveBeenCalledOnce();
    await expect.element(page.getByRole("switch", { name: "알림", exact: true })).toBeChecked();
    for (const part of container.querySelectorAll("label, span"))
      expect(part.hasAttribute("data-checked")).toBe(true);
  });
});

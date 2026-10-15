import axe from "axe-core";
import { Component, createRef, type ReactNode, useState } from "react";
import { flushSync } from "react-dom";
import { createRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import { CheckboxGroup, type CheckboxGroupChangeEventDetails } from ".";
import { CheckboxGroup as RootExportCheckboxGroup } from "..";
import { Checkbox } from "../checkbox";

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

  return container;
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

function Parts({ value, label }: { value: string; label: string }) {
  return (
    <Checkbox.Root value={value} data-testid={`item-${value}`}>
      <Checkbox.Control>
        <Checkbox.Indicator>✓</Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.Label>{label}</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox.Root>
  );
}

function ControlledFixture() {
  const [value, setValue] = useState(["search"]);

  return (
    <form>
      <CheckboxGroup.Root name="features" value={value} onValueChange={setValue}>
        <CheckboxGroup.Legend>기능</CheckboxGroup.Legend>
        <Parts value="search" label="검색" />
        <Parts value="alerts" label="알림" />
      </CheckboxGroup.Root>
    </form>
  );
}

// Native checkbox inputs own Space activation, form data and per-input validation.
// These tests cover the group's state synchronization and rendered HTML contract.
describe("CheckboxGroup", () => {
  it("루트와 하위 경로에서 같은 CheckboxGroup을 제공한다", () => {
    expect(RootExportCheckboxGroup).toBe(CheckboxGroup);
  });

  it("그룹 안의 Checkbox.Root에는 value가 필요하다", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});

    try {
      const container = render(
        <TestErrorBoundary>
          <CheckboxGroup.Root name="features">
            <CheckboxGroup.Legend>기능</CheckboxGroup.Legend>
            <Checkbox.Root>
              <Checkbox.Label>검색</Checkbox.Label>
              <Checkbox.HiddenInput />
            </Checkbox.Root>
          </CheckboxGroup.Root>
        </TestErrorBoundary>,
      );

      expect(container.textContent).toBe(
        "Checkbox.Root requires a value within CheckboxGroup.Root.",
      );
    } finally {
      error.mockRestore();
    }
  });

  it("그룹 안의 Checkbox.Root에는 독립적인 선택 상태를 지정할 수 없다", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});

    try {
      const container = render(
        <TestErrorBoundary>
          <CheckboxGroup.Root name="features">
            <CheckboxGroup.Legend>기능</CheckboxGroup.Legend>
            <Checkbox.Root value="search" checked>
              <Checkbox.Label>검색</Checkbox.Label>
              <Checkbox.HiddenInput />
            </Checkbox.Root>
          </CheckboxGroup.Root>
        </TestErrorBoundary>,
      );

      expect(container.textContent).toBe(
        "Checkbox.Root cannot set checked, defaultChecked, name, or form within CheckboxGroup.Root.",
      );
    } finally {
      error.mockRestore();
    }
  });

  it("fieldset, legend, label과 네이티브 checkbox input을 연결한다", async () => {
    const groupRef = createRef<HTMLFieldSetElement>();
    const itemRef = createRef<HTMLLabelElement>();
    const inputRef = createRef<HTMLInputElement>();
    const container = render(
      <CheckboxGroup.Root ref={groupRef} name="features" defaultValue={["search"]}>
        <CheckboxGroup.Legend>기능</CheckboxGroup.Legend>
        <Checkbox.Root ref={itemRef} value="search" data-testid="item-search">
          <Checkbox.Control>
            <Checkbox.Indicator>✓</Checkbox.Indicator>
          </Checkbox.Control>
          <Checkbox.Label>검색</Checkbox.Label>
          <Checkbox.HiddenInput ref={inputRef} />
        </Checkbox.Root>
        <Parts value="alerts" label="알림" />
      </CheckboxGroup.Root>,
    );
    const input = inputRef.current!;

    expect(groupRef.current).toBe(container.querySelector("fieldset"));
    expect(itemRef.current).toBe(input.labels?.[0]);
    expect(groupRef.current?.querySelector("legend")?.textContent).toBe("기능");
    expect(input.type).toBe("checkbox");
    expect(input.name).toBe("features");
    expect(input.value).toBe("search");
    expect(input.checked).toBe(true);
    expect(input.hasAttribute("aria-checked")).toBe(false);
    expect(input.hasAttribute("aria-hidden")).toBe(false);
    expect(input.style.clipPath).toBe("inset(50%)");
    await expect.element(page.getByRole("group", { name: "기능" })).toBeInTheDocument();
    await expect.element(page.getByRole("checkbox", { name: "검색" })).toBeChecked();
    await expect.element(page.getByRole("checkbox", { name: "알림" })).not.toBeChecked();
    expect((await axe.run(container)).violations).toEqual([]);
  });

  it("서버 HTML에서 기본 선택과 상태 속성을 제공한다", () => {
    const container = render(null);
    container.innerHTML = renderToString(
      <CheckboxGroup.Root name="features" defaultValue={["alerts"]}>
        <CheckboxGroup.Legend>기능</CheckboxGroup.Legend>
        <Parts value="search" label="검색" />
        <Parts value="alerts" label="알림" />
      </CheckboxGroup.Root>,
    );

    expect(container.querySelector<HTMLInputElement>('input[value="search"]')?.checked).toBe(false);
    expect(container.querySelector<HTMLInputElement>('input[value="alerts"]')?.checked).toBe(true);
    expect(
      container.querySelector('[data-testid="item-search"]')?.hasAttribute("data-unchecked"),
    ).toBe(true);
    expect(
      container.querySelector('[data-testid="item-alerts"]')?.hasAttribute("data-checked"),
    ).toBe(true);
  });

  it("클릭과 Space가 선택 값, 시각 상태와 FormData를 동기화한다", async () => {
    const onValueChange = vi.fn();
    const container = render(
      <form>
        <CheckboxGroup.Root name="features" defaultValue={["search"]} onValueChange={onValueChange}>
          <CheckboxGroup.Legend>기능</CheckboxGroup.Legend>
          <Parts value="search" label="검색" />
          <Parts value="alerts" label="알림" />
        </CheckboxGroup.Root>
      </form>,
    );
    const form = container.querySelector("form")!;
    const alerts = container.querySelector<HTMLInputElement>('input[value="alerts"]')!;

    await page.getByText("알림", { exact: true }).click();
    await expect.element(page.getByRole("checkbox", { name: "알림" })).toBeChecked();
    expect(
      container.querySelector('[data-testid="item-alerts"]')?.hasAttribute("data-checked"),
    ).toBe(true);
    expect(Array.from(new FormData(form))).toEqual([
      ["features", "search"],
      ["features", "alerts"],
    ]);
    expect(onValueChange).toHaveBeenCalledOnce();
    expect(onValueChange.mock.calls[0]?.[0]).toEqual(["search", "alerts"]);
    expect(onValueChange.mock.calls[0]?.[1].reason).toBe("input-change");
    expect(onValueChange.mock.calls[0]?.[1].input).toBe(alerts);
    expect(onValueChange.mock.calls[0]?.[1].isCanceled).toBe(false);

    await userEvent.keyboard(" ");
    await expect.element(page.getByRole("checkbox", { name: "알림" })).not.toBeChecked();
    expect(onValueChange.mock.calls[1]?.[0]).toEqual(["search"]);
    expect(Array.from(new FormData(form))).toEqual([["features", "search"]]);
  });

  it("변경을 취소하면 이전 선택을 유지한다", async () => {
    const onValueChange = vi.fn((_value, details: CheckboxGroupChangeEventDetails) =>
      details.cancel(),
    );
    const container = render(
      <CheckboxGroup.Root name="features" defaultValue={["search"]} onValueChange={onValueChange}>
        <CheckboxGroup.Legend>기능</CheckboxGroup.Legend>
        <Parts value="search" label="검색" />
        <Parts value="alerts" label="알림" />
      </CheckboxGroup.Root>,
    );

    await page.getByText("알림", { exact: true }).click();
    await expect.element(page.getByRole("checkbox", { name: "알림" })).not.toBeChecked();
    expect(
      container.querySelector('[data-testid="item-alerts"]')?.hasAttribute("data-unchecked"),
    ).toBe(true);
    expect(onValueChange).toHaveBeenCalledOnce();
    expect(onValueChange.mock.calls[0]?.[1].isCanceled).toBe(true);
  });

  it("개별 Checkbox의 변경 취소는 그룹 변경 콜백도 막는다", async () => {
    const onCheckedChange = vi.fn((_checked, details: CheckboxGroupChangeEventDetails) =>
      details.cancel(),
    );
    const onValueChange = vi.fn();
    const container = render(
      <CheckboxGroup.Root name="features" onValueChange={onValueChange}>
        <CheckboxGroup.Legend>기능</CheckboxGroup.Legend>
        <Checkbox.Root value="search" onCheckedChange={onCheckedChange}>
          <Checkbox.Label>검색</Checkbox.Label>
          <Checkbox.HiddenInput />
        </Checkbox.Root>
      </CheckboxGroup.Root>,
    );

    await page.getByText("검색", { exact: true }).click();
    expect(container.querySelector("input")?.checked).toBe(false);
    expect(onCheckedChange).toHaveBeenCalledOnce();
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("uncontrolled 그룹은 Form reset 뒤 기본 선택을 복원한다", async () => {
    const container = render(
      <form>
        <CheckboxGroup.Root name="features" defaultValue={["search"]}>
          <CheckboxGroup.Legend>기능</CheckboxGroup.Legend>
          <Parts value="search" label="검색" />
          <Parts value="alerts" label="알림" />
        </CheckboxGroup.Root>
      </form>,
    );
    const form = container.querySelector("form")!;

    await page.getByText("검색", { exact: true }).click();
    await page.getByText("알림", { exact: true }).click();
    expect(Array.from(new FormData(form))).toEqual([["features", "alerts"]]);

    form.reset();
    await vi.waitFor(() => {
      expect(Array.from(new FormData(form))).toEqual([["features", "search"]]);
      expect(
        container.querySelector('[data-testid="item-search"]')?.hasAttribute("data-checked"),
      ).toBe(true);
      expect(
        container.querySelector('[data-testid="item-alerts"]')?.hasAttribute("data-unchecked"),
      ).toBe(true);
    });
  });

  it("controlled 그룹은 값 변경과 Form reset 뒤 전달받은 선택을 유지한다", async () => {
    const container = render(<ControlledFixture />);
    const form = container.querySelector("form")!;

    await page.getByText("알림", { exact: true }).click();
    await expect.element(page.getByRole("checkbox", { name: "알림" })).toBeChecked();
    expect(Array.from(new FormData(form))).toEqual([
      ["features", "search"],
      ["features", "alerts"],
    ]);

    form.reset();
    await vi.waitFor(() => {
      expect(Array.from(new FormData(form))).toEqual([
        ["features", "search"],
        ["features", "alerts"],
      ]);
    });
  });

  it("readOnly는 포커스와 Form 참여를 유지하면서 변경을 막는다", async () => {
    const container = render(
      <form>
        <CheckboxGroup.Root name="features" defaultValue={["search"]} readOnly>
          <CheckboxGroup.Legend>기능</CheckboxGroup.Legend>
          <Parts value="search" label="검색" />
          <Parts value="alerts" label="알림" />
        </CheckboxGroup.Root>
      </form>,
    );
    const alerts = container.querySelector<HTMLInputElement>('input[value="alerts"]')!;

    await page.getByText("알림", { exact: true }).click();
    alerts.focus();
    await userEvent.keyboard(" ");
    expect(document.activeElement).toBe(alerts);
    expect(alerts.checked).toBe(false);
    expect(alerts.getAttribute("aria-readonly")).toBe("true");
    expect(container.querySelector("fieldset")?.hasAttribute("data-readonly")).toBe(true);
    expect(container.querySelector("legend")?.hasAttribute("data-readonly")).toBe(true);
    expect(
      container.querySelector('[data-testid="item-alerts"]')?.hasAttribute("data-readonly"),
    ).toBe(true);
    expect(Array.from(new FormData(container.querySelector("form")!))).toEqual([
      ["features", "search"],
    ]);
  });

  it("disabled와 item별 required를 input과 상태 속성에 전달한다", () => {
    const container = render(
      <form>
        <CheckboxGroup.Root name="features" disabled defaultValue={["search"]}>
          <CheckboxGroup.Legend>기능</CheckboxGroup.Legend>
          <Parts value="search" label="검색" />
        </CheckboxGroup.Root>
        <CheckboxGroup.Root name="other">
          <CheckboxGroup.Legend>기타</CheckboxGroup.Legend>
          <Checkbox.Root value="required" required>
            <Checkbox.Label>필수 항목</Checkbox.Label>
            <Checkbox.HiddenInput />
          </Checkbox.Root>
          <Parts value="optional" label="선택 항목" />
        </CheckboxGroup.Root>
      </form>,
    );
    const disabledGroup = container.querySelector("fieldset")!;
    const required = container.querySelector<HTMLInputElement>('input[value="required"]')!;
    const optional = container.querySelector<HTMLInputElement>('input[value="optional"]')!;

    expect(disabledGroup.disabled).toBe(true);
    expect(disabledGroup.hasAttribute("data-disabled")).toBe(true);
    expect(disabledGroup.querySelector("legend")?.hasAttribute("data-disabled")).toBe(true);
    expect(disabledGroup.querySelector("label")?.hasAttribute("data-disabled")).toBe(true);
    expect(disabledGroup.querySelector("input")?.disabled).toBe(true);
    expect(Array.from(new FormData(container.querySelector("form")!))).toEqual([]);
    expect(required.required).toBe(true);
    expect(required.validity.valueMissing).toBe(true);
    expect(optional.required).toBe(false);
    expect(optional.validity.valueMissing).toBe(false);
  });

  it("외부 Form에 각 Checkbox의 input을 연결한다", async () => {
    const container = render(
      <>
        <form id="settings" />
        <CheckboxGroup.Root name="features" form="settings">
          <CheckboxGroup.Legend>기능</CheckboxGroup.Legend>
          <Parts value="search" label="검색" />
          <Parts value="alerts" label="알림" />
        </CheckboxGroup.Root>
      </>,
    );
    const form = container.querySelector("form")!;
    const inputs = container.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');

    expect(inputs[0]?.form).toBe(form);
    expect(inputs[1]?.form).toBe(form);
    await page.getByText("알림", { exact: true }).click();
    expect(Array.from(new FormData(form))).toEqual([["features", "alerts"]]);
  });
});

import axe from "axe-core";
import { Component, createRef, type ComponentProps, type ReactNode, useState } from "react";
import { flushSync } from "react-dom";
import { createRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import { RadioGroup as RootExportRadioGroup } from "../index";
import { RadioGroup } from "./index";

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

function Parts({ value, label }: { value: string; label: string }) {
  return (
    <RadioGroup.Item value={value} data-testid={`item-${value}`}>
      <RadioGroup.ItemControl data-testid={`control-${value}`}>
        <RadioGroup.ItemIndicator data-testid={`indicator-${value}`}>✓</RadioGroup.ItemIndicator>
      </RadioGroup.ItemControl>
      <RadioGroup.ItemText>{label}</RadioGroup.ItemText>
      <RadioGroup.ItemHiddenInput />
    </RadioGroup.Item>
  );
}

function Text(props: ComponentProps<"span">) {
  return <span {...props} />;
}

function Box(props: ComponentProps<"span">) {
  return <span {...props} />;
}

function ControlledFixture() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <RadioGroup.Root name="plan" value={value} onValueChange={setValue}>
      <RadioGroup.Legend>요금제</RadioGroup.Legend>
      <Parts value="monthly" label="월간" />
      <Parts value="yearly" label="연간" />
    </RadioGroup.Root>
  );
}

// Native radio inputs own arrow navigation, Space activation, form data and validation.
// These tests cover Coral's state synchronization and its rendered HTML contract.
describe("RadioGroup", () => {
  it("루트와 하위 경로에서 같은 RadioGroup을 제공한다", () => {
    expect(RootExportRadioGroup).toBe(RadioGroup);
  });

  it("Item은 RadioGroup.Root 안에서만 사용한다", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});

    try {
      const { container } = render(
        <TestErrorBoundary>
          <RadioGroup.Item value="monthly">
            <RadioGroup.ItemText>월간</RadioGroup.ItemText>
            <RadioGroup.ItemHiddenInput />
          </RadioGroup.Item>
        </TestErrorBoundary>,
      );

      expect(container.textContent).toBe("RadioGroup.Item must be used within RadioGroup.Root.");
    } finally {
      error.mockRestore();
    }
  });

  it("fieldset, legend, label과 네이티브 radio input을 연결한다", async () => {
    const groupRef = createRef<HTMLFieldSetElement>();
    const itemRef = createRef<HTMLLabelElement>();
    const inputRef = createRef<HTMLInputElement>();
    const { container } = render(
      <RadioGroup.Root ref={groupRef} name="plan" defaultValue="monthly" required>
        <RadioGroup.Legend>요금제</RadioGroup.Legend>
        <RadioGroup.Item ref={itemRef} value="monthly">
          <RadioGroup.ItemControl>
            <RadioGroup.ItemIndicator>✓</RadioGroup.ItemIndicator>
          </RadioGroup.ItemControl>
          <RadioGroup.ItemText>월간</RadioGroup.ItemText>
          <RadioGroup.ItemHiddenInput ref={inputRef} />
        </RadioGroup.Item>
        <Parts value="yearly" label="연간" />
      </RadioGroup.Root>,
    );
    const input = inputRef.current!;

    expect(groupRef.current).toBe(container.querySelector("fieldset"));
    expect(itemRef.current).toBe(input.labels?.[0]);
    expect(groupRef.current?.querySelector("legend")?.textContent).toBe("요금제");
    expect(input.type).toBe("radio");
    expect(input.name).toBe("plan");
    expect(input.value).toBe("monthly");
    expect(input.required).toBe(true);
    expect(input.checked).toBe(true);
    expect(input.hasAttribute("aria-checked")).toBe(false);
    expect(input.hasAttribute("aria-readonly")).toBe(false);
    expect(input.hasAttribute("aria-hidden")).toBe(false);
    expect(input.style.clipPath).toBe("inset(50%)");
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(3);
    await expect.element(page.getByRole("radio", { name: "월간" })).toBeChecked();
    await expect.element(page.getByRole("radio", { name: "연간" })).not.toBeChecked();
    expect((await axe.run(container)).violations).toEqual([]);
  });

  it("서버 HTML에서 기본 선택과 접근 가능한 이름을 제공한다", () => {
    const { container } = render(null);
    container.innerHTML = renderToString(
      <RadioGroup.Root name="plan" defaultValue="yearly">
        <RadioGroup.Legend>요금제</RadioGroup.Legend>
        <Parts value="monthly" label="월간" />
        <Parts value="yearly" label="연간" />
      </RadioGroup.Root>,
    );

    expect(container.querySelector<HTMLInputElement>('input[value="monthly"]')?.checked).toBe(
      false,
    );
    expect(container.querySelector<HTMLInputElement>('input[value="yearly"]')?.checked).toBe(true);
    expect(
      container.querySelector('[data-testid="item-yearly"]')?.hasAttribute("data-checked"),
    ).toBe(true);
    expect(
      container.querySelector('[data-testid="item-monthly"]')?.hasAttribute("data-unchecked"),
    ).toBe(true);
  });

  it("클릭과 방향키가 선택, 시각 상태와 FormData를 동기화한다", async () => {
    const onValueChange = vi.fn();
    const { container } = render(
      <form>
        <RadioGroup.Root name="plan" defaultValue="monthly" onValueChange={onValueChange}>
          <RadioGroup.Legend>요금제</RadioGroup.Legend>
          <Parts value="monthly" label="월간" />
          <Parts value="yearly" label="연간" />
        </RadioGroup.Root>
      </form>,
    );
    const monthly = container.querySelector<HTMLInputElement>('input[value="monthly"]')!;
    const yearly = container.querySelector<HTMLInputElement>('input[value="yearly"]')!;

    await page.getByText("연간", { exact: true }).click();
    await expect.element(page.getByRole("radio", { name: "연간" })).toBeChecked();
    expect(monthly.checked).toBe(false);
    expect(
      container.querySelector('[data-testid="item-yearly"]')?.hasAttribute("data-checked"),
    ).toBe(true);
    expect(
      container.querySelector('[data-testid="item-monthly"]')?.hasAttribute("data-unchecked"),
    ).toBe(true);
    expect(Array.from(new FormData(container.querySelector("form")!))).toEqual([
      ["plan", "yearly"],
    ]);
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange.mock.calls[0]?.[0]).toBe("yearly");
    expect(onValueChange.mock.calls[0]?.[1].input).toBe(yearly);

    await userEvent.keyboard("{ArrowLeft}");
    await expect.element(page.getByRole("radio", { name: "월간" })).toBeChecked();
    expect(document.activeElement).toBe(monthly);
    expect(onValueChange).toHaveBeenCalledTimes(2);
    expect(Array.from(new FormData(container.querySelector("form")!))).toEqual([
      ["plan", "monthly"],
    ]);
  });

  it("변경 취소 시 uncontrolled 그룹의 이전 선택을 복원한다", async () => {
    const onValueChange = vi.fn((_value, details) => details.cancel());
    const { container } = render(
      <RadioGroup.Root name="plan" defaultValue="monthly" onValueChange={onValueChange}>
        <RadioGroup.Legend>요금제</RadioGroup.Legend>
        <Parts value="monthly" label="월간" />
        <Parts value="yearly" label="연간" />
      </RadioGroup.Root>,
    );

    await page.getByText("연간", { exact: true }).click();
    expect(container.querySelector<HTMLInputElement>('input[value="monthly"]')?.checked).toBe(true);
    expect(container.querySelector<HTMLInputElement>('input[value="yearly"]')?.checked).toBe(false);
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange.mock.calls[0]?.[1].isCanceled).toBe(true);
    expect(
      container.querySelector('[data-testid="item-monthly"]')?.hasAttribute("data-checked"),
    ).toBe(true);
  });

  it("readOnly는 포커스와 FormData를 유지하면서 클릭과 방향키 선택을 막는다", async () => {
    const { container } = render(
      <form>
        <RadioGroup.Root name="plan" defaultValue="monthly" readOnly>
          <RadioGroup.Legend>요금제</RadioGroup.Legend>
          <Parts value="monthly" label="월간" />
          <Parts value="yearly" label="연간" />
        </RadioGroup.Root>
      </form>,
    );
    const monthly = container.querySelector<HTMLInputElement>('input[value="monthly"]')!;

    await page.getByText("연간", { exact: true }).click();
    expect(monthly.checked).toBe(true);
    monthly.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(monthly.checked).toBe(true);
    expect(document.activeElement).toBe(monthly);
    expect(monthly.getAttribute("aria-readonly")).toBe("true");
    expect(
      container.querySelector('[data-testid="item-yearly"]')?.hasAttribute("data-readonly"),
    ).toBe(true);
    expect(Array.from(new FormData(container.querySelector("form")!))).toEqual([
      ["plan", "monthly"],
    ]);
  });

  it("disabled 항목을 건너뛰고 required 및 외부 form을 연결한다", async () => {
    const { container } = render(
      <>
        <form id="settings" />
        <RadioGroup.Root name="plan" form="settings" required>
          <RadioGroup.Legend>요금제</RadioGroup.Legend>
          <RadioGroup.Item value="monthly" disabled>
            <RadioGroup.ItemText>월간</RadioGroup.ItemText>
            <RadioGroup.ItemHiddenInput />
          </RadioGroup.Item>
          <Parts value="yearly" label="연간" />
        </RadioGroup.Root>
      </>,
    );
    const inputs = container.querySelectorAll<HTMLInputElement>('input[type="radio"]');
    const form = container.querySelector("form")!;

    expect(inputs[0]?.disabled).toBe(true);
    expect(inputs[0]?.form).toBe(form);
    expect(inputs[1]?.form).toBe(form);
    expect(inputs[1]?.validity.valueMissing).toBe(true);
    expect(
      container.querySelector('[data-testid="item-yearly"]')?.hasAttribute("data-required"),
    ).toBe(true);
    await page.getByText("연간", { exact: true }).click();
    expect(inputs[1]?.validity.valueMissing).toBe(false);
    expect(Array.from(new FormData(form))).toEqual([["plan", "yearly"]]);
  });

  it("Group의 disabled를 fieldset, input과 시각 Part에 반영한다", () => {
    const { container } = render(
      <RadioGroup.Root name="plan" disabled>
        <RadioGroup.Legend>요금제</RadioGroup.Legend>
        <Parts value="monthly" label="월간" />
      </RadioGroup.Root>,
    );

    expect(container.querySelector("fieldset")?.disabled).toBe(true);
    expect(container.querySelector("input")?.disabled).toBe(true);
    expect(container.querySelector("fieldset")?.hasAttribute("data-disabled")).toBe(true);
    expect(container.querySelector("legend")?.hasAttribute("data-disabled")).toBe(true);
    expect(
      container.querySelector('[data-testid="item-monthly"]')?.hasAttribute("data-disabled"),
    ).toBe(true);
  });

  it("form reset이 초기값과 시각 상태를 복원한다", async () => {
    const { container } = render(
      <form>
        <RadioGroup.Root name="plan" defaultValue="monthly">
          <RadioGroup.Legend>요금제</RadioGroup.Legend>
          <Parts value="monthly" label="월간" />
          <Parts value="yearly" label="연간" />
        </RadioGroup.Root>
      </form>,
    );

    await page.getByText("연간", { exact: true }).click();
    container.querySelector("form")!.reset();
    await vi.waitFor(() => {
      expect(container.querySelector<HTMLInputElement>('input[value="monthly"]')?.checked).toBe(
        true,
      );
      expect(
        container.querySelector('[data-testid="item-monthly"]')?.hasAttribute("data-checked"),
      ).toBe(true);
    });
  });

  it("시각 Part의 render 합성에도 상태와 aria-hidden을 보존한다", () => {
    const { container } = render(
      <RadioGroup.Root name="plan" defaultValue="monthly">
        <RadioGroup.Legend>요금제</RadioGroup.Legend>
        <RadioGroup.Item value="monthly">
          <RadioGroup.ItemControl render={<Box data-testid="control" />}>
            <RadioGroup.ItemIndicator render={<Box data-testid="indicator" />} />
          </RadioGroup.ItemControl>
          <RadioGroup.ItemText render={<Text data-testid="label" />}>월간</RadioGroup.ItemText>
          <RadioGroup.ItemHiddenInput />
        </RadioGroup.Item>
      </RadioGroup.Root>,
    );

    for (const testId of ["control", "indicator", "label"]) {
      expect(
        container.querySelector(`[data-testid="${testId}"]`)?.hasAttribute("data-checked"),
      ).toBe(true);
    }
    expect(container.querySelector('[data-testid="control"]')?.getAttribute("aria-hidden")).toBe(
      "true",
    );
    expect(container.querySelector('[data-testid="indicator"]')?.getAttribute("aria-hidden")).toBe(
      "true",
    );
  });

  it("controlled 변경은 사용처의 값 갱신에 따른다", async () => {
    render(<ControlledFixture />);
    await page.getByText("월간", { exact: true }).click();
    await expect.element(page.getByRole("radio", { name: "월간" })).toBeChecked();
    await page.getByText("연간", { exact: true }).click();
    await expect.element(page.getByRole("radio", { name: "연간" })).toBeChecked();
  });
});

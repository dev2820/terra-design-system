import axe from "axe-core";
import { createRef, type ReactNode, useState } from "react";
import { flushSync } from "react-dom";
import { createRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import { Fieldset } from "../fieldset/index";
import { Toggle as RootExportToggle } from "../index";
import { Toggle, type ToggleChangeEventDetails } from "./index";

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

function expectPressed(button: HTMLButtonElement, pressed: boolean) {
  expect(button.getAttribute("aria-pressed")).toBe(String(pressed));
  expect(button.getAttribute("data-pressed")).toBe(pressed ? "" : null);
  expect(button.getAttribute("data-unpressed")).toBe(pressed ? null : "");
}

function ControlledFixture() {
  const [pressed, setPressed] = useState(false);

  return (
    <Toggle.Root pressed={pressed} onPressedChange={setPressed}>
      굵게
    </Toggle.Root>
  );
}

// Native button owns keyboard activation, focus, disabled and form actions.
// Verify their integration with Coral state and cancellation, not the browser's full matrix.
describe("Toggle", () => {
  it("루트와 하위 경로에서 같은 Toggle을 제공한다", () => {
    expect(RootExportToggle).toBe(Toggle);
  });

  it("네이티브 button의 의미와 이름을 유지하고 Ref와 일반 속성을 전달한다", async () => {
    const ref = createRef<HTMLButtonElement>();
    const { container } = render(
      <Toggle.Root ref={ref} id="bold-toggle" className="toggle" title="굵게 표시">
        굵게
      </Toggle.Root>,
    );
    const button = container.querySelector("button")!;

    expect(ref.current).toBe(button);
    expect(button.id).toBe("bold-toggle");
    expect(button.className).toBe("toggle");
    expect(button.title).toBe("굵게 표시");
    expect(button.type).toBe("button");
    expect(button.hasAttribute("role")).toBe(false);
    expect(button.hasAttribute("aria-checked")).toBe(false);
    expect(button.hasAttribute("aria-labelledby")).toBe(false);
    expect(button.hasAttribute("data-disabled")).toBe(false);
    expectPressed(button, false);
    await expect.element(page.getByRole("button", { name: "굵게", exact: true })).toBeVisible();
  });

  it.each([false, true])("서버 HTML에서도 초기 상태 %s와 이름이 완성된다", (defaultPressed) => {
    const container = document.createElement("div");
    container.innerHTML = renderToString(
      <Toggle.Root defaultPressed={defaultPressed}>굵게</Toggle.Root>,
    );
    const button = container.querySelector("button")!;

    expectPressed(button, defaultPressed);
    expect(button.textContent).toBe("굵게");
    expect(button.type).toBe("button");
  });

  it.each([false, true])(
    "uncontrolled 초기 상태 %s를 토글하고 변경 정보를 전달한다",
    async (defaultPressed) => {
      const onPressedChange = vi.fn();
      const { container } = render(
        <Toggle.Root defaultPressed={defaultPressed} onPressedChange={onPressedChange}>
          굵게
        </Toggle.Root>,
      );
      const button = container.querySelector("button")!;
      const toggle = page.getByRole("button", { name: "굵게", exact: true });

      expect(onPressedChange).not.toHaveBeenCalled();
      expectPressed(button, defaultPressed);
      await toggle.click();
      expectPressed(button, !defaultPressed);
      expect(onPressedChange).toHaveBeenCalledTimes(1);
      const [pressed, details] = onPressedChange.mock.calls[0]!;
      expect(pressed).toBe(!defaultPressed);
      expect(details.reason).toBe("click");
      expect(details.event).toBeInstanceOf(Event);
      expect(details.event.type).toBe("click");
      expect(details.button).toBe(button);
      expect(details.isCanceled).toBe(false);

      await toggle.click();
      expectPressed(button, defaultPressed);
      expect(onPressedChange).toHaveBeenCalledTimes(2);
      expect(onPressedChange.mock.calls[1]?.[0]).toBe(defaultPressed);
      await expect.element(toggle).toBeInTheDocument();
    },
  );

  it("defaultPressed의 변경은 현재 uncontrolled 상태를 초기화하지 않는다", async () => {
    const { container, rerender } = render(<Toggle.Root defaultPressed={false}>굵게</Toggle.Root>);
    const button = container.querySelector("button")!;

    rerender(<Toggle.Root defaultPressed>굵게</Toggle.Root>);
    expectPressed(button, false);
    await page.getByRole("button", { name: "굵게" }).click();
    rerender(<Toggle.Root defaultPressed={false}>굵게</Toggle.Root>);
    expectPressed(button, true);
  });

  it("controlled 값은 defaultPressed보다 우선하며 부모의 갱신을 반영한다", async () => {
    const onPressedChange = vi.fn();
    const { container, rerender } = render(
      <Toggle.Root pressed={false} defaultPressed onPressedChange={onPressedChange}>
        굵게
      </Toggle.Root>,
    );
    const button = container.querySelector("button")!;

    expectPressed(button, false);
    expect(onPressedChange).not.toHaveBeenCalled();
    await page.getByRole("button", { name: "굵게" }).click();
    expect(onPressedChange).toHaveBeenCalledWith(true, expect.anything());
    expectPressed(button, false);

    rerender(
      <Toggle.Root pressed onPressedChange={onPressedChange}>
        굵게
      </Toggle.Root>,
    );
    expectPressed(button, true);
    expect(onPressedChange).toHaveBeenCalledTimes(1);
    await page.getByRole("button", { name: "굵게" }).click();
    expect(onPressedChange.mock.calls[1]?.[0]).toBe(false);
    expectPressed(button, true);
  });

  it("변경 콜백으로 controlled 상태를 갱신할 수 있다", async () => {
    const { container } = render(<ControlledFixture />);
    const button = container.querySelector("button")!;

    await page.getByRole("button", { name: "굵게" }).click();
    expectPressed(button, true);
    await page.getByRole("button", { name: "굵게" }).click();
    expectPressed(button, false);
  });

  it("사용자 onClick을 먼저 실행하고 상태 변경 처리를 함께 실행한다", async () => {
    const calls: string[] = [];
    const { container } = render(
      <Toggle.Root onClick={() => calls.push("click")} onPressedChange={() => calls.push("change")}>
        굵게
      </Toggle.Root>,
    );

    await page.getByRole("button", { name: "굵게" }).click();
    expect(calls).toEqual(["click", "change"]);
    expectPressed(container.querySelector("button")!, true);
  });

  it.each([false, true])(
    "onClick의 preventDefault는 상태 %s에서 변경 요청을 막는다",
    async (defaultPressed) => {
      const onPressedChange = vi.fn();
      const onClick = vi.fn((event) => event.preventDefault());
      const { container } = render(
        <Toggle.Root
          defaultPressed={defaultPressed}
          onClick={onClick}
          onPressedChange={onPressedChange}
        >
          굵게
        </Toggle.Root>,
      );

      await page.getByRole("button", { name: "굵게" }).click();
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onPressedChange).not.toHaveBeenCalled();
      expectPressed(container.querySelector("button")!, defaultPressed);
    },
  );

  it.each([false, true])("변경을 취소하면 상태 %s를 유지한다", async (defaultPressed) => {
    const onPressedChange = vi.fn((_pressed: boolean, details: ToggleChangeEventDetails) =>
      details.cancel(),
    );
    const { container } = render(
      <Toggle.Root defaultPressed={defaultPressed} onPressedChange={onPressedChange}>
        굵게
      </Toggle.Root>,
    );

    await page.getByRole("button", { name: "굵게" }).click();
    expect(onPressedChange).toHaveBeenCalledTimes(1);
    expect(onPressedChange.mock.calls[0]?.[0]).toBe(!defaultPressed);
    expect(onPressedChange.mock.calls[0]?.[1].isCanceled).toBe(true);
    expectPressed(container.querySelector("button")!, defaultPressed);
  });

  it("Enter와 Space 활성화는 각각 한 번만 상태를 바꾸고 포커스를 유지한다", async () => {
    const onPressedChange = vi.fn();
    const { container } = render(
      <>
        <button>이전</button>
        <Toggle.Root onPressedChange={onPressedChange}>굵게</Toggle.Root>
      </>,
    );
    const button = container.querySelector("[aria-pressed]") as HTMLButtonElement;
    const toggle = page.getByRole("button", { name: "굵게" });

    await page.getByRole("button", { name: "이전" }).click();
    await userEvent.tab();
    await expect.element(toggle).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    expectPressed(button, true);
    expect(onPressedChange).toHaveBeenCalledTimes(1);
    await userEvent.keyboard("{Space}");
    expectPressed(button, false);
    expect(onPressedChange).toHaveBeenCalledTimes(2);
    await expect.element(toggle).toHaveFocus();
  });

  it("disabled는 상태 변경과 Tab 방문을 막고 해제하면 다시 활성화된다", async () => {
    const onPressedChange = vi.fn();
    function fixture(disabled: boolean) {
      return (
        <>
          <button>이전</button>
          <Toggle.Root disabled={disabled} defaultPressed onPressedChange={onPressedChange}>
            굵게
          </Toggle.Root>
          <button>다음</button>
        </>
      );
    }
    const { container, rerender } = render(fixture(true));
    const button = container.querySelector("[aria-pressed]") as HTMLButtonElement;

    expect(button.disabled).toBe(true);
    expect(button.getAttribute("data-disabled")).toBe("");
    button.click();
    expect(onPressedChange).not.toHaveBeenCalled();
    expectPressed(button, true);
    await page.getByRole("button", { name: "이전" }).click();
    await userEvent.tab();
    await expect.element(page.getByRole("button", { name: "다음" })).toHaveFocus();

    rerender(fixture(false));
    expect(button.disabled).toBe(false);
    expect(button.hasAttribute("data-disabled")).toBe(false);
    await page.getByRole("button", { name: "굵게" }).click();
    expect(onPressedChange).toHaveBeenCalledTimes(1);
    expectPressed(button, false);
  });

  it("Fieldset의 네이티브 disabled 전파와 첫 Legend의 예외를 유지한다", async () => {
    const onPressedChange = vi.fn();
    const { container } = render(
      <Fieldset.Root disabled>
        <Fieldset.Legend>
          <Toggle.Root>범례</Toggle.Root>
        </Fieldset.Legend>
        <Toggle.Root onPressedChange={onPressedChange}>굵게</Toggle.Root>
      </Fieldset.Root>,
    );
    const buttons = container.querySelectorAll("button");

    expect(buttons[0]!.matches(":disabled")).toBe(false);
    expect(buttons[1]!.matches(":disabled")).toBe(true);
    buttons[1]!.click();
    expect(onPressedChange).not.toHaveBeenCalled();
    expectPressed(buttons[1]!, false);
    await page.getByRole("button", { name: "범례" }).click();
    expectPressed(buttons[0]!, true);
  });

  it("기본 Toggle은 폼을 제출하거나 눌림 상태를 폼 값으로 추가하지 않는다", async () => {
    const onSubmit = vi.fn((event) => event.preventDefault());
    const { container } = render(
      <form onSubmit={onSubmit}>
        <Toggle.Root name="bold" value="on">
          굵게
        </Toggle.Root>
      </form>,
    );
    const form = container.querySelector("form")!;

    await page.getByRole("button", { name: "굵게" }).click();
    expectPressed(container.querySelector("button")!, true);
    expect(onSubmit).not.toHaveBeenCalled();
    expect(Array.from(new FormData(form))).toEqual([]);
    expect(form.querySelector("input")).toBeNull();
  });

  it("외부 form과 제출 속성을 전달하고 cancel은 네이티브 제출을 취소하지 않는다", async () => {
    const onSubmit = vi.fn((event) => event.preventDefault());
    const { container } = render(
      <>
        <form id="formatting" onSubmit={onSubmit} />
        <Toggle.Root
          form="formatting"
          type="submit"
          name="format"
          value="bold"
          onPressedChange={(_pressed, details) => details.cancel()}
        >
          굵게
        </Toggle.Root>
      </>,
    );
    const form = container.querySelector("form")!;
    const button = container.querySelector("button")!;

    expect(button.form).toBe(form);
    await page.getByRole("button", { name: "굵게" }).click();
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expectPressed(button, false);
    expect(Array.from(new FormData(form, button))).toEqual([["format", "bold"]]);
  });

  it("onClick의 preventDefault는 명시적인 폼 제출도 막는다", async () => {
    const onSubmit = vi.fn((event) => event.preventDefault());
    const onPressedChange = vi.fn();
    render(
      <form onSubmit={onSubmit}>
        <Toggle.Root
          type="submit"
          onClick={(event) => event.preventDefault()}
          onPressedChange={onPressedChange}
        >
          굵게
        </Toggle.Root>
      </form>,
    );

    await page.getByRole("button", { name: "굵게" }).click();
    expect(onSubmit).not.toHaveBeenCalled();
    expect(onPressedChange).not.toHaveBeenCalled();
  });

  it("폼 reset은 현재 눌림 상태를 복원하거나 변경 콜백을 호출하지 않는다", async () => {
    const onPressedChange = vi.fn();
    const { container } = render(
      <form>
        <Toggle.Root onPressedChange={onPressedChange}>굵게</Toggle.Root>
        <button type="reset">초기화</button>
      </form>,
    );
    const button = container.querySelector("[aria-pressed]") as HTMLButtonElement;

    await page.getByRole("button", { name: "굵게" }).click();
    await page.getByRole("button", { name: "초기화" }).click();
    expectPressed(button, true);
    expect(onPressedChange).toHaveBeenCalledTimes(1);
  });

  it("명시적인 reset 버튼은 폼을 초기화하면서 Toggle의 상태를 바꾼다", async () => {
    const onReset = vi.fn();
    const { container } = render(
      <form onReset={onReset}>
        <input aria-label="내용" defaultValue="초기값" />
        <Toggle.Root type="reset">초기화</Toggle.Root>
      </form>,
    );
    const input = container.querySelector("input")!;
    input.value = "변경값";

    await page.getByRole("button", { name: "초기화" }).click();
    expect(input.value).toBe("초기값");
    expect(onReset).toHaveBeenCalledTimes(1);
    expectPressed(container.querySelector("button")!, true);
  });

  it.each(["aria-label", "aria-labelledby"] as const)(
    "%s로 아이콘 버튼의 이름을 연결하고 상태가 바뀌어도 유지한다",
    async (attribute) => {
      const { container } = render(
        <>
          <span id="bold-name">굵게</span>
          <Toggle.Root {...{ [attribute]: attribute === "aria-label" ? "굵게" : "bold-name" }}>
            <span aria-hidden="true">B</span>
          </Toggle.Root>
        </>,
      );
      const toggle = page.getByRole("button", { name: "굵게", exact: true });

      await expect.element(toggle).toBeVisible();
      expect((await axe.run(container)).violations).toEqual([]);
      await toggle.click();
      expectPressed(container.querySelector("button")!, true);
      await expect.element(toggle).toBeVisible();
      expect((await axe.run(container)).violations).toEqual([]);
    },
  );
});

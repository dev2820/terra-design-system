import axe from "axe-core";
import { createRef, type ReactNode, useState } from "react";
import { flushSync } from "react-dom";
import { createRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import { NumberInput, type NumberInputChangeEventDetails } from ".";
import { NumberInput as RootExportNumberInput } from "..";
import { Field } from "../field";
import { Fieldset } from "../fieldset";

const fixtures: Array<{ container: HTMLDivElement; root: Root }> = [];

afterEach(() => {
  for (const mounted of fixtures) {
    flushSync(() => mounted.root.unmount());
    mounted.container.remove();
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

function fixture(rootProps: React.ComponentProps<typeof NumberInput.Root> = {}) {
  return (
    <NumberInput.Root data-testid="root" {...rootProps}>
      <label htmlFor="amount">Amount</label>
      <NumberInput.DecrementTrigger aria-label="Decrease amount">−</NumberInput.DecrementTrigger>
      <NumberInput.Input id="amount" />
      <NumberInput.IncrementTrigger aria-label="Increase amount">+</NumberInput.IncrementTrigger>
    </NumberInput.Root>
  );
}

function getParts(container: HTMLElement) {
  return {
    root: container.querySelector<HTMLElement>("[data-testid='root']")!,
    input: container.querySelector<HTMLInputElement>("input")!,
    decrement: container.querySelectorAll<HTMLButtonElement>("button")[0]!,
    increment: container.querySelectorAll<HTMLButtonElement>("button")[1]!,
  };
}

function ControlledFixture() {
  const [value, setValue] = useState<number | null>(2);

  return (
    <NumberInput.Root value={value} onValueChange={setValue}>
      <NumberInput.Input aria-label="Amount" />
      <NumberInput.IncrementTrigger aria-label="Increase">+</NumberInput.IncrementTrigger>
    </NumberInput.Root>
  );
}

// Native number input owns Arrow Up/Down stepping, numeric validation and Form submission.
// These tests cover NumberInput's Parts, state coordination and custom interactions.
describe("NumberInput", () => {
  it("루트와 하위 경로에서 같은 컴포넌트를 제공하고 네이티브 의미를 유지한다", async () => {
    expect(RootExportNumberInput).toBe(NumberInput);
    const { container } = render(fixture({ defaultValue: 2, min: 0, max: 4, required: true }));
    const { root, input, increment, decrement } = getParts(container);

    expect(root.tagName).toBe("DIV");
    expect(input.type).toBe("number");
    expect(input.value).toBe("2");
    expect(input.min).toBe("0");
    expect(input.max).toBe("4");
    expect(input.required).toBe(true);
    expect(input.hasAttribute("role")).toBe(false);
    expect(input.labels?.[0]?.textContent).toBe("Amount");
    expect(increment.type).toBe("button");
    expect(decrement.type).toBe("button");
    expect(increment.tabIndex).toBe(-1);
    expect(decrement.tabIndex).toBe(-1);
    expect(root.hasAttribute("data-required")).toBe(true);
    expect(input.hasAttribute("data-required")).toBe(true);
    await expect.element(page.getByRole("spinbutton", { name: "Amount" })).toBeVisible();
    expect((await axe.run(container)).violations).toEqual([]);
  });

  it("서버 HTML에 초기 값과 상태 속성을 제공한다", () => {
    const container = document.createElement("div");
    container.innerHTML = renderToString(fixture({ defaultValue: 2, disabled: true }));

    expect(getParts(container).input.value).toBe("2");
    expect(getParts(container).input.disabled).toBe(true);
    expect(getParts(container).root.hasAttribute("data-disabled")).toBe(true);
    expect(getParts(container).increment.disabled).toBe(true);
    expect(getParts(container).decrement.disabled).toBe(true);
  });

  it("두 Trigger가 단계와 경계, Form 값, 변경 정보와 Focus를 동기화한다", async () => {
    const onValueChange = vi.fn();
    const { container } = render(
      <form>
        {fixture({ name: "amount", defaultValue: 2, min: 0, max: 4, step: 2, onValueChange })}
      </form>,
    );
    const { input, increment, decrement } = getParts(container);
    const form = container.querySelector("form")!;

    await userEvent.click(increment);
    expect(input.value).toBe("4");
    expect(new FormData(form).get("amount")).toBe("4");
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange.mock.calls[0]?.[0]).toBe(4);
    expect(onValueChange.mock.calls[0]?.[1].reason).toBe("increment");
    expect(onValueChange.mock.calls[0]?.[1].event).toBeInstanceOf(MouseEvent);
    expect(onValueChange.mock.calls[0]?.[1].input).toBe(input);
    expect(onValueChange.mock.calls[0]?.[1].isCanceled).toBe(false);
    await expect.element(page.getByRole("spinbutton", { name: "Amount" })).toHaveFocus();
    await expect.element(page.getByRole("button", { name: "Increase amount" })).toBeDisabled();

    await userEvent.click(decrement);
    expect(input.value).toBe("2");
    expect(onValueChange.mock.calls[1]?.[1].reason).toBe("decrement");
    await userEvent.click(decrement);
    expect(input.value).toBe("0");
    await expect.element(page.getByRole("button", { name: "Decrease amount" })).toBeDisabled();
  });

  it("직접 입력과 Home·End가 변경 이유를 전달한다", async () => {
    const onValueChange = vi.fn();
    const { container } = render(fixture({ defaultValue: 2, min: 0, max: 5, onValueChange }));
    const { input } = getParts(container);

    input.focus();
    await userEvent.keyboard("{End}");
    expect(input.value).toBe("5");
    expect(onValueChange.mock.lastCall?.[1].reason).toBe("end");
    await userEvent.keyboard("{Home}");
    expect(input.value).toBe("0");
    expect(onValueChange.mock.lastCall?.[1].reason).toBe("home");

    await userEvent.clear(input);
    expect(onValueChange.mock.lastCall?.[0]).toBeNull();
    await userEvent.type(input, "3");
    expect(input.value).toBe("3");
    expect(onValueChange.mock.lastCall?.[1].reason).toBe("input-change");
  });

  it("제어 값은 부모가 준 값을 유지하고 다음 값이 전달되면 갱신한다", async () => {
    const onValueChange = vi.fn();
    const { container, rerender } = render(fixture({ value: 2, onValueChange }));
    const { input, increment } = getParts(container);

    await userEvent.click(increment);
    expect(onValueChange.mock.calls[0]?.[0]).toBe(3);
    expect(input.value).toBe("2");

    rerender(fixture({ value: 3, onValueChange }));
    expect(input.value).toBe("3");
  });

  it("제어 부모가 변경 알림을 받으면 클릭과 직접 입력을 반영한다", async () => {
    const { container } = render(<ControlledFixture />);
    const input = container.querySelector("input")!;

    await page.getByRole("button", { name: "Increase" }).click();
    expect(input.value).toBe("3");
    await userEvent.clear(input);
    await userEvent.type(input, "7");
    expect(input.value).toBe("7");
  });

  it("변경 취소와 Trigger의 preventDefault가 이전 값을 유지한다", async () => {
    const onValueChange = vi.fn((_value: number | null, details: NumberInputChangeEventDetails) =>
      details.cancel(),
    );
    const { container } = render(
      <NumberInput.Root defaultValue={2} onValueChange={onValueChange}>
        <NumberInput.Input aria-label="Amount" />
        <NumberInput.IncrementTrigger aria-label="Increase">+</NumberInput.IncrementTrigger>
        <NumberInput.DecrementTrigger
          aria-label="Decrease"
          onClick={(event) => event.preventDefault()}
        >
          −
        </NumberInput.DecrementTrigger>
      </NumberInput.Root>,
    );
    const input = container.querySelector("input")!;

    await page.getByRole("button", { name: "Increase" }).click();
    expect(input.value).toBe("2");
    expect(onValueChange.mock.calls[0]?.[1].isCanceled).toBe(true);
    await userEvent.clear(input);
    expect(input.value).toBe("2");
    expect(onValueChange.mock.lastCall?.[0]).toBeNull();

    const callCount = onValueChange.mock.calls.length;
    await page.getByRole("button", { name: "Decrease" }).click();
    expect(input.value).toBe("2");
    expect(onValueChange).toHaveBeenCalledTimes(callCount);
  });

  it("두 Trigger의 render에 Props, Ref와 이벤트를 합성한다", async () => {
    const calls: string[] = [];
    const incrementRef = createRef<HTMLButtonElement>();
    const decrementRef = createRef<HTMLButtonElement>();
    const { container } = render(
      <NumberInput.Root
        defaultValue={2}
        onValueChange={(_value, details) => calls.push(details.reason)}
      >
        <NumberInput.Input aria-label="Amount" />
        <NumberInput.IncrementTrigger
          render={
            <button
              type="submit"
              className="render-increment"
              onClick={() => calls.push("render-increment")}
            />
          }
          ref={incrementRef}
          className="part-increment"
          onClick={() => calls.push("part-increment")}
          aria-label="Increase"
        >
          +
        </NumberInput.IncrementTrigger>
        <NumberInput.DecrementTrigger
          render={
            <button
              type="submit"
              className="render-decrement"
              onClick={() => calls.push("render-decrement")}
            />
          }
          ref={decrementRef}
          className="part-decrement"
          onClick={() => calls.push("part-decrement")}
          aria-label="Decrease"
        >
          −
        </NumberInput.DecrementTrigger>
      </NumberInput.Root>,
    );
    const increment = container.querySelector<HTMLButtonElement>(".render-increment")!;
    const decrement = container.querySelector<HTMLButtonElement>(".render-decrement")!;

    expect(incrementRef.current).toBe(increment);
    expect(decrementRef.current).toBe(decrement);
    expect(increment.className).toBe("render-increment part-increment");
    expect(decrement.className).toBe("render-decrement part-decrement");
    expect(increment.type).toBe("button");
    expect(decrement.type).toBe("button");
    await userEvent.click(increment);
    await userEvent.click(decrement);
    expect(calls).toEqual([
      "render-increment",
      "part-increment",
      "increment",
      "render-decrement",
      "part-decrement",
      "decrement",
    ]);
  });

  it("disabled, readOnly, required와 Fieldset disabled를 각 Part에 반영한다", async () => {
    const { container, rerender } = render(fixture({ defaultValue: 2, disabled: true }));
    const { root, input, increment, decrement } = getParts(container);

    expect(root.hasAttribute("data-disabled")).toBe(true);
    expect(input.disabled).toBe(true);
    expect(increment.disabled).toBe(true);
    expect(decrement.disabled).toBe(true);

    rerender(fixture({ defaultValue: 2, readOnly: true, required: true }));
    expect(input.disabled).toBe(false);
    expect(input.readOnly).toBe(true);
    expect(input.required).toBe(true);
    expect(increment.disabled).toBe(true);
    expect(decrement.disabled).toBe(true);
    expect(root.hasAttribute("data-readonly")).toBe(true);
    expect(root.hasAttribute("data-required")).toBe(true);

    rerender(
      <Fieldset.Root disabled>
        <Fieldset.Legend>Amount</Fieldset.Legend>
        {fixture({ defaultValue: 2 })}
      </Fieldset.Root>,
    );
    expect(getParts(container).input.disabled).toBe(true);
    await expect.element(page.getByRole("button", { name: "Increase amount" })).toBeDisabled();
  });

  it("Form reset은 비제어 초기값을 복원한다", async () => {
    const { container } = render(
      <form>
        {fixture({ name: "amount", defaultValue: 2 })}
        <button type="reset">Reset</button>
      </form>,
    );
    const input = container.querySelector("input")!;

    await page.getByRole("button", { name: "Increase amount" }).click();
    expect(input.value).toBe("3");
    await page.getByRole("button", { name: "Reset" }).click();
    await expect.poll(() => input.value).toBe("2");
    await page.getByRole("button", { name: "Increase amount" }).click();
    expect(input.value).toBe("3");
  });

  it("Form reset은 현재 제어 값을 유지한다", async () => {
    const { container, rerender } = render(
      <form>
        {fixture({ name: "amount", value: 2 })}
        <button type="reset">Reset</button>
      </form>,
    );
    const input = container.querySelector("input")!;

    rerender(
      <form>
        {fixture({ name: "amount", value: 4 })}
        <button type="reset">Reset</button>
      </form>,
    );
    await page.getByRole("button", { name: "Reset" }).click();
    await expect.poll(() => input.value).toBe("4");
  });

  it("Field 레이블과 외부 Form을 연결한다", async () => {
    const { container } = render(
      <>
        <form id="order" />
        <Field.Root name="amount">
          <Field.Label>Amount</Field.Label>
          <NumberInput.Root form="order" defaultValue={2}>
            <NumberInput.Input />
            <NumberInput.IncrementTrigger aria-label="Increase amount">
              +
            </NumberInput.IncrementTrigger>
          </NumberInput.Root>
        </Field.Root>
      </>,
    );
    const input = container.querySelector("input")!;
    const form = container.querySelector("form")!;

    await expect.element(page.getByRole("spinbutton", { name: "Amount" })).toBeVisible();
    expect(input.form).toBe(form);
    expect(new FormData(form).get("amount")).toBe("2");
    await page.getByRole("button", { name: "Increase amount" }).click();
    expect(new FormData(form).get("amount")).toBe("3");
    expect((await axe.run(container)).violations).toEqual([]);
  });
});

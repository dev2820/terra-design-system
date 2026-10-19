import axe from "axe-core";
import { createRef, type ReactNode, StrictMode, useState } from "react";
import { flushSync } from "react-dom";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import { OtpField, type OtpFieldChangeEventDetails, type OtpFieldRootProps } from ".";
import { OtpField as RootExportOtpField } from "..";
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

function Parts({ length = 4, labelled = true }: { length?: number; labelled?: boolean }) {
  const indices = Array.from({ length }, (_, index) => index);
  const midpoint = Math.ceil(length / 2);

  return (
    <>
      {labelled && <OtpField.Label>인증번호</OtpField.Label>}
      <OtpField.Control>
        <div>
          {indices.slice(0, midpoint).map((index) => (
            <OtpField.Input
              key={index}
              index={index}
              aria-label={`인증번호 ${index + 1}번째 자리`}
            />
          ))}
        </div>
        <OtpField.Separator data-testid="separator">−</OtpField.Separator>
        <div>
          {indices.slice(midpoint).map((index) => (
            <OtpField.Input
              key={index}
              index={index}
              aria-label={`인증번호 ${index + 1}번째 자리`}
            />
          ))}
        </div>
      </OtpField.Control>
      <OtpField.HiddenInput />
    </>
  );
}

function fixture(props: OtpFieldRootProps = {}) {
  const length = props.length ?? 4;

  return (
    <OtpField.Root data-testid="root" name="code" {...props} length={length}>
      <Parts length={length} />
    </OtpField.Root>
  );
}

function getParts(container: HTMLElement) {
  return {
    root: container.querySelector<HTMLElement>("[data-testid='root']")!,
    control: container.querySelector<HTMLElement>("[role='group']")!,
    inputs: [...container.querySelectorAll<HTMLInputElement>("input:not([aria-hidden='true'])")],
    hiddenInput: container.querySelector<HTMLInputElement>("input[aria-hidden='true']")!,
  };
}

function ControlledFixture(props: Pick<OtpFieldRootProps, "onValueComplete" | "validationType">) {
  const [value, setValue] = useState<string[]>([]);

  return fixture({ value, onValueChange: setValue, ...props });
}

function SynchronousControlledFixture(props: Pick<OtpFieldRootProps, "onValueComplete">) {
  const [value, setValue] = useState(["1", "2", "3", ""]);

  return fixture({
    value,
    onValueChange: (next) => flushSync(() => setValue(next)),
    ...props,
  });
}

function FieldFixture({ invalid = false }: { invalid?: boolean }) {
  return (
    <Field.Root name="verification" invalid={invalid}>
      <Field.Label>인증번호</Field.Label>
      <OtpField.Root length={4} name="ignored-name">
        <Parts labelled={false} />
      </OtpField.Root>
      <Field.Description id="code-description">4자리 숫자를 입력해 주세요.</Field.Description>
      <Field.Error id="code-error">잘못된 인증번호입니다.</Field.Error>
    </Field.Root>
  );
}

// ClipboardEvent로 OS 클립보드와 무관하게 붙여넣기 분배를 검증한다.
function paste(input: HTMLInputElement, text: string) {
  const clipboardData = new DataTransfer();
  clipboardData.setData("text", text);

  flushSync(() => {
    input.dispatchEvent(
      new ClipboardEvent("paste", { clipboardData, bubbles: true, cancelable: true }),
    );
  });
}

// 브라우저의 자동완성이 전달하는 여러 문자 입력을 재현한다. 실제 SMS 자동완성 UI는 검증하지 않는다.
function autofill(input: HTMLInputElement, value: string) {
  const setValue = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!;

  flushSync(() => {
    setValue.call(input, value);
    input.dispatchEvent(
      new InputEvent("input", {
        bubbles: true,
        data: value,
        inputType: "insertReplacementText",
      }),
    );
  });
}

describe("OtpField", () => {
  describe("구조와 합성", () => {
    it("루트와 하위 경로에서 같은 Parts를 제공하고 입력 묶음을 조합한다", async () => {
      expect(RootExportOtpField).toBe(OtpField);
      const { container } = render(fixture({ defaultValue: ["0", "1", "2", "3"] }));
      const { root, control, inputs, hiddenInput } = getParts(container);
      const label = container.querySelector("label")!;
      const separator = container.querySelector("[data-testid='separator']")!;

      expect(root.tagName).toBe("DIV");
      expect(control.tagName).toBe("DIV");
      expect(control.getAttribute("aria-labelledby")).toBe(label.id);
      expect(label.htmlFor).toBe(inputs[0]!.id);
      expect(inputs.map((input) => input.value)).toEqual(["0", "1", "2", "3"]);
      expect(inputs.every((input) => input.type === "text" && input.inputMode === "numeric")).toBe(
        true,
      );
      expect(inputs.map((input) => input.autocomplete)).toEqual([
        "one-time-code",
        "off",
        "off",
        "off",
      ]);
      expect(hiddenInput.type).toBe("text");
      expect(hiddenInput.tabIndex).toBe(-1);
      expect(hiddenInput.value).toBe("0123");
      expect(separator.tagName).toBe("SPAN");
      expect(separator.getAttribute("aria-hidden")).toBe("true");
      await expect
        .element(page.getByRole("group", { name: "인증번호", exact: true }))
        .toBeVisible();
      expect(page.getByRole("textbox").all()).toHaveLength(4);
    });

    it("기본 길이 6과 짧은 초기 배열을 빈 자리에 반영한다", () => {
      const { container } = render(
        <OtpField.Root>
          <Parts length={6} />
        </OtpField.Root>,
      );
      expect(getParts(container).inputs).toHaveLength(6);

      const normalized = render(fixture({ defaultValue: ["0", "x", "2", "3", "4"] }));
      const { root, inputs } = getParts(normalized.container);
      expect(inputs.map((input) => input.value)).toEqual(["0", "", "2", "3"]);
      expect(root.hasAttribute("data-complete")).toBe(false);
    });

    it("각 Part의 Ref를 실제 DOM에 연결한다", () => {
      const rootRef = createRef<HTMLDivElement>();
      const labelRef = createRef<HTMLLabelElement>();
      const controlRef = createRef<HTMLDivElement>();
      const inputRef = createRef<HTMLInputElement>();
      const hiddenRef = createRef<HTMLInputElement>();
      const separatorRef = createRef<HTMLSpanElement>();
      const { container } = render(
        <OtpField.Root ref={rootRef} length={1} data-testid="root">
          <OtpField.Label ref={labelRef}>인증번호</OtpField.Label>
          <OtpField.Control ref={controlRef}>
            <OtpField.Input ref={inputRef} index={0} />
            <OtpField.Separator ref={separatorRef}>−</OtpField.Separator>
          </OtpField.Control>
          <OtpField.HiddenInput ref={hiddenRef} />
        </OtpField.Root>,
      );
      const { root, control, inputs, hiddenInput } = getParts(container);

      expect(rootRef.current).toBe(root);
      expect(labelRef.current).toBe(container.querySelector("label"));
      expect(controlRef.current).toBe(control);
      expect(inputRef.current).toBe(inputs[0]);
      expect(hiddenRef.current).toBe(hiddenInput);
      expect(separatorRef.current).toBe(container.querySelector("span"));
    });

    it("Separator의 render에 Props, Ref와 이벤트를 합성하고 장식용 의미를 유지한다", async () => {
      const calls: string[] = [];
      const renderRef = createRef<HTMLDivElement>();
      const partRef = createRef<HTMLSpanElement>();
      const { container } = render(
        <OtpField.Root length={1} required defaultValue={["0"]}>
          <OtpField.Separator
            render={
              <div
                ref={renderRef}
                className="render"
                title="render"
                aria-hidden={false}
                onClick={() => calls.push("render")}
              />
            }
            ref={partRef}
            className="part"
            title="part"
            onClick={() => calls.push("part")}
          >
            −
          </OtpField.Separator>
        </OtpField.Root>,
      );
      const separator = container.querySelector(".render")!;

      expect(separator.tagName).toBe("DIV");
      expect(separator.className).toBe("render part");
      expect(separator.getAttribute("title")).toBe("part");
      expect(separator.textContent).toBe("−");
      expect(separator.getAttribute("aria-hidden")).toBe("true");
      expect(separator.hasAttribute("data-complete")).toBe(true);
      expect(separator.hasAttribute("data-required")).toBe(true);
      expect(renderRef.current).toBe(separator);
      expect(partRef.current).toBe(separator);
      await userEvent.click(separator);
      expect(calls).toEqual(["render", "part"]);
    });
  });

  describe("입력과 포커스", () => {
    it("숫자 입력은 다음 자리로 이동하고 앞자리 0과 마지막 자리의 재입력을 반영한다", async () => {
      const onValueChange = vi.fn();
      const onValueComplete = vi.fn();
      const { container } = render(fixture({ onValueChange, onValueComplete }));
      const { root, inputs, hiddenInput } = getParts(container);

      await userEvent.click(inputs[0]!);
      await userEvent.keyboard("0123");

      expect(inputs.map((input) => input.value)).toEqual(["0", "1", "2", "3"]);
      expect(hiddenInput.value).toBe("0123");
      expect(document.activeElement).toBe(inputs[3]);
      expect(root.hasAttribute("data-complete")).toBe(true);
      expect(onValueChange).toHaveBeenCalledTimes(4);
      expect(onValueChange.mock.lastCall?.[0]).toEqual(["0", "1", "2", "3"]);
      expect(onValueChange.mock.lastCall?.[1].reason).toBe("input-change");
      expect(onValueChange.mock.lastCall?.[1].event).toBeInstanceOf(InputEvent);
      expect(onValueComplete).toHaveBeenCalledTimes(1);

      await userEvent.keyboard("5");
      expect(hiddenInput.value).toBe("0125");
      expect(onValueComplete).toHaveBeenCalledTimes(2);
    });

    it("기존 숫자를 선택해 교체하고 방향키와 Home·End로 이동한다", async () => {
      const { container } = render(fixture({ defaultValue: ["1", "2", "3", "4"] }));
      const { inputs, hiddenInput } = getParts(container);

      await userEvent.click(inputs[1]!);
      expect(inputs[1]!.selectionStart).toBe(0);
      expect(inputs[1]!.selectionEnd).toBe(1);
      await userEvent.keyboard("9");
      expect(hiddenInput.value).toBe("1934");
      expect(document.activeElement).toBe(inputs[2]);
      await userEvent.keyboard("{ArrowLeft}");
      expect(document.activeElement).toBe(inputs[1]);
      await userEvent.keyboard("{ArrowRight}{End}{ArrowRight}");
      expect(document.activeElement).toBe(inputs[3]);
      await userEvent.keyboard("{Home}{ArrowLeft}");
      expect(document.activeElement).toBe(inputs[0]);
    });

    it("Backspace는 현재 숫자를 지우고 빈 자리에서는 이전 숫자를 지우며 이동한다", async () => {
      const onValueChange = vi.fn();
      const { container } = render(fixture({ defaultValue: ["1", "2", "3", "4"], onValueChange }));
      const { inputs } = getParts(container);

      await userEvent.click(inputs[2]!);
      await userEvent.keyboard("{Backspace}");
      expect(inputs.map((input) => input.value)).toEqual(["1", "2", "", "4"]);
      expect(document.activeElement).toBe(inputs[2]);
      expect(onValueChange.mock.lastCall?.[1].reason).toBe("keyboard");
      expect(onValueChange.mock.lastCall?.[1].event).toBeInstanceOf(KeyboardEvent);
      await userEvent.keyboard("{Backspace}");
      expect(inputs.map((input) => input.value)).toEqual(["1", "", "", "4"]);
      expect(document.activeElement).toBe(inputs[1]);
    });

    it("Delete는 뒤의 숫자를 이동하지 않고 현재 자리만 지우며 포커스를 유지한다", async () => {
      const { container } = render(fixture({ defaultValue: ["1", "2", "3", "4"] }));
      const { inputs } = getParts(container);

      await userEvent.click(inputs[1]!);
      await userEvent.keyboard("{Delete}");
      expect(inputs.map((input) => input.value)).toEqual(["1", "", "3", "4"]);
      expect(document.activeElement).toBe(inputs[1]);
    });

    it("Tab과 Shift+Tab은 HiddenInput과 Separator를 건너뛴다", async () => {
      const { container } = render(
        <>
          <button>이전</button>
          {fixture()}
          <button>다음</button>
        </>,
      );
      const { inputs } = getParts(container);
      const [before, after] = container.querySelectorAll("button");

      await userEvent.click(before!);
      await userEvent.keyboard("{Tab}");
      expect(document.activeElement).toBe(inputs[0]);
      await userEvent.keyboard("{Tab}{Tab}{Tab}{Tab}");
      expect(document.activeElement).toBe(after);
      await userEvent.keyboard("{Shift>}{Tab}{/Shift}");
      expect(document.activeElement).toBe(inputs[3]);
    });

    it("숫자가 아닌 문자를 거부하고 값과 포커스를 유지한다", async () => {
      const onValueChange = vi.fn();
      const { container } = render(fixture({ onValueChange }));
      const { inputs, hiddenInput } = getParts(container);

      await userEvent.type(inputs[0]!, "a");
      expect(inputs[0]!.value).toBe("");
      expect(hiddenInput.value).toBe("");
      expect(document.activeElement).toBe(inputs[0]);
      expect(onValueChange).not.toHaveBeenCalled();
    });

    it("변경 취소는 입력값과 포커스 이동 및 완료 알림을 취소한다", async () => {
      const onValueComplete = vi.fn();
      const onValueChange = vi.fn((_value: string[], details: OtpFieldChangeEventDetails) =>
        details.cancel(),
      );
      const { container } = render(
        fixture({ defaultValue: ["1", "2", "3", "4"], onValueChange, onValueComplete }),
      );
      const { inputs, hiddenInput } = getParts(container);

      await userEvent.click(inputs[0]!);
      await userEvent.keyboard("9{Backspace}");
      paste(inputs[0]!, "9876");

      expect(inputs.map((input) => input.value)).toEqual(["1", "2", "3", "4"]);
      expect(hiddenInput.value).toBe("1234");
      expect(document.activeElement).toBe(inputs[0]);
      expect(onValueChange).toHaveBeenCalledTimes(3);
      expect(onValueChange.mock.calls.every(([, details]) => details.isCanceled)).toBe(true);
      expect(onValueComplete).not.toHaveBeenCalled();
    });

    it("Input의 preventDefault는 입력, 방향키 이동과 붙여넣기를 취소한다", async () => {
      const onValueChange = vi.fn();
      const { container } = render(
        <OtpField.Root length={2} onValueChange={onValueChange}>
          <OtpField.Input
            index={0}
            aria-label="첫째"
            onChange={(event) => event.preventDefault()}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") event.preventDefault();
            }}
            onPaste={(event) => event.preventDefault()}
          />
          <OtpField.Input index={1} aria-label="둘째" />
          <OtpField.HiddenInput />
        </OtpField.Root>,
      );
      const { inputs, hiddenInput } = getParts(container);

      await userEvent.click(inputs[0]!);
      await userEvent.keyboard("9{ArrowRight}");
      paste(inputs[0]!, "12");
      expect(inputs[0]!.value).toBe("");
      expect(hiddenInput.value).toBe("");
      expect(document.activeElement).toBe(inputs[0]);
      expect(onValueChange).not.toHaveBeenCalled();
    });
  });

  describe("붙여넣기와 자동완성", () => {
    it("전체 코드를 첫 자리부터 분배하고 공백을 제거하며 넘치는 값을 자른다", () => {
      const onValueChange = vi.fn();
      const onValueComplete = vi.fn();
      const { container } = render(fixture({ onValueChange, onValueComplete }));
      const { inputs, hiddenInput } = getParts(container);

      paste(inputs[2]!, "0 1 2 3 4");
      expect(inputs.map((input) => input.value)).toEqual(["0", "1", "2", "3"]);
      expect(hiddenInput.value).toBe("0123");
      expect(document.activeElement).toBe(inputs[3]);
      expect(onValueChange.mock.lastCall?.[1].reason).toBe("input-paste");
      expect(onValueChange.mock.lastCall?.[1].event).toBeInstanceOf(ClipboardEvent);
      expect(onValueComplete).toHaveBeenCalledTimes(1);
    });

    it("일부 코드는 현재 자리부터 교체하고 잘못된 붙여넣기는 무시한다", () => {
      const { container } = render(fixture({ defaultValue: ["0", "1", "2", "3"] }));
      const { inputs, hiddenInput } = getParts(container);

      paste(inputs[1]!, "98");
      expect(inputs.map((input) => input.value)).toEqual(["0", "9", "8", "3"]);
      paste(inputs[0]!, "x7");
      paste(inputs[0]!, " ");
      expect(hiddenInput.value).toBe("0983");
    });

    it("자동완성이 전달한 여러 문자를 각 입력에 분배한다", () => {
      const { container } = render(fixture());
      const { inputs, hiddenInput } = getParts(container);

      autofill(inputs[0]!, "0123");
      expect(inputs.map((input) => input.value)).toEqual(["0", "1", "2", "3"]);
      expect(hiddenInput.value).toBe("0123");
    });
  });

  describe("영문 입력", () => {
    it("영문 대소문자를 보존하고 숫자 입력을 거부한다", async () => {
      const onValueComplete = vi.fn();
      const { container } = render(fixture({ validationType: "alphabet", onValueComplete }));
      const { inputs, hiddenInput } = getParts(container);

      expect(inputs.every((input) => input.inputMode === "text")).toBe(true);
      await userEvent.click(inputs[0]!);
      await userEvent.keyboard("aBzQ");
      expect(inputs.map((input) => input.value)).toEqual(["a", "B", "z", "Q"]);
      expect(hiddenInput.value).toBe("aBzQ");
      expect(document.activeElement).toBe(inputs[3]);
      expect(onValueComplete).toHaveBeenCalledTimes(1);

      await userEvent.keyboard("7");
      expect(hiddenInput.value).toBe("aBzQ");
      expect(onValueComplete).toHaveBeenCalledTimes(1);
    });

    it("붙여넣기와 자동완성은 영문만 분배하고 숫자와 기호가 섞인 값을 거부한다", () => {
      const { container } = render(fixture({ validationType: "alphabet" }));
      const { inputs, hiddenInput } = getParts(container);

      paste(inputs[2]!, "a B z Q");
      expect(hiddenInput.value).toBe("aBzQ");
      paste(inputs[1]!, "Wx");
      expect(hiddenInput.value).toBe("aWxQ");
      autofill(inputs[0]!, "AbCd");
      expect(inputs.map((input) => input.value)).toEqual(["A", "b", "C", "d"]);

      paste(inputs[0]!, "Ab3d");
      paste(inputs[0]!, "Ab-d");
      autofill(inputs[0]!, "Ab가d");
      expect(hiddenInput.value).toBe("AbCd");
    });

    it("초기 값과 제어 값의 숫자와 기호를 빈 자리로 정규화한다", () => {
      const { container, rerender } = render(
        fixture({ validationType: "alphabet", defaultValue: ["A", "b", "7", "@"] }),
      );
      expect(getParts(container).inputs.map((input) => input.value)).toEqual(["A", "b", "", ""]);
      rerender(fixture({ validationType: "alphabet", value: ["x", "Y", "0", "z"] }));
      const { root, inputs, hiddenInput } = getParts(container);
      expect(inputs.map((input) => input.value)).toEqual(["x", "Y", "", "z"]);
      expect(hiddenInput.value).toBe("xYz");
      expect(root.hasAttribute("data-complete")).toBe(false);
    });

    it("HiddenInput은 영문 전체 길이를 검증하고 폼 값을 제출한다", async () => {
      const onSubmit = vi.fn((event: React.FormEvent<HTMLFormElement>) => event.preventDefault());
      const { container } = render(
        <form onSubmit={onSubmit}>
          {fixture({
            validationType: "alphabet",
            defaultValue: ["A", "b", "3", "z"],
            required: true,
          })}
          <button type="submit">제출</button>
        </form>,
      );
      const { inputs, hiddenInput } = getParts(container);
      const submit = container.querySelector("button")!;

      expect(hiddenInput.pattern).toBe("[A-Za-z]{4}");
      await userEvent.click(submit);
      expect(onSubmit).not.toHaveBeenCalled();
      expect(document.activeElement).toBe(inputs[2]);
      await userEvent.keyboard("C");
      await userEvent.click(submit);
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(new FormData(container.querySelector("form")!).get("code")).toBe("AbCz");
    });
  });

  describe("영숫자 입력", () => {
    it("대소문자와 숫자를 그대로 입력하고 포커스와 완료 상태를 갱신한다", async () => {
      const onValueChange = vi.fn();
      const onValueComplete = vi.fn();
      const { container } = render(
        fixture({ validationType: "alphanumeric", onValueChange, onValueComplete }),
      );
      const { root, inputs, hiddenInput } = getParts(container);

      expect(inputs.every((input) => input.inputMode === "text")).toBe(true);
      expect(inputs.every((input) => input.autocapitalize === "none")).toBe(true);
      await userEvent.click(inputs[0]!);
      await userEvent.keyboard("aB0z");

      expect(inputs.map((input) => input.value)).toEqual(["a", "B", "0", "z"]);
      expect(hiddenInput.value).toBe("aB0z");
      expect(document.activeElement).toBe(inputs[3]);
      expect(root.hasAttribute("data-complete")).toBe(true);
      expect(onValueChange.mock.lastCall?.[0]).toEqual(["a", "B", "0", "z"]);
      expect(onValueComplete).toHaveBeenCalledTimes(1);
      await userEvent.keyboard("Y");
      expect(hiddenInput.value).toBe("aB0Y");
    });

    it("전체·부분 붙여넣기와 자동완성에 같은 영숫자 규칙을 적용한다", () => {
      const { container } = render(fixture({ validationType: "alphanumeric" }));
      const { inputs, hiddenInput } = getParts(container);

      paste(inputs[2]!, "a B 0 z");
      expect(hiddenInput.value).toBe("aB0z");
      paste(inputs[1]!, "Q7");
      expect(inputs.map((input) => input.value)).toEqual(["a", "Q", "7", "z"]);
      autofill(inputs[0]!, "x9Y2");
      expect(hiddenInput.value).toBe("x9Y2");
      expect(inputs.map((input) => input.value)).toEqual(["x", "9", "Y", "2"]);
    });

    it("기호와 ASCII 범위를 벗어난 문자를 거부한다", async () => {
      const onValueChange = vi.fn();
      const { container } = render(
        fixture({
          validationType: "alphanumeric",
          defaultValue: ["a", "B", "0", "z"],
          onValueChange,
        }),
      );
      const { inputs, hiddenInput } = getParts(container);

      await userEvent.click(inputs[0]!);
      await userEvent.keyboard("-");
      paste(inputs[0]!, "a!2b");
      autofill(inputs[0]!, "é1가2");
      expect(inputs.map((input) => input.value)).toEqual(["a", "B", "0", "z"]);
      expect(hiddenInput.value).toBe("aB0z");
      expect(onValueChange).not.toHaveBeenCalled();
    });

    it("초기 값과 제어 값도 모드에 따라 정규화한다", () => {
      const { container, rerender } = render(
        fixture({ validationType: "alphanumeric", defaultValue: ["A", "b", "7", "@"] }),
      );
      expect(getParts(container).inputs.map((input) => input.value)).toEqual(["A", "b", "7", ""]);

      rerender(fixture({ validationType: "alphanumeric", value: ["x", "Y", "0", "1"] }));
      expect(getParts(container).hiddenInput.value).toBe("xY01");
      rerender(fixture({ validationType: "numeric", value: ["x", "Y", "0", "1"] }));
      const { root, inputs, hiddenInput } = getParts(container);
      expect(inputs.map((input) => input.value)).toEqual(["", "", "0", "1"]);
      expect(inputs.every((input) => input.inputMode === "numeric")).toBe(true);
      expect(hiddenInput.pattern).toBe("[0-9]{4}");
      expect(root.hasAttribute("data-complete")).toBe(false);
    });

    it("제어 부모가 반영한 영숫자 값에 완료 알림을 보낸다", async () => {
      const onValueComplete = vi.fn();
      const { container } = render(
        <ControlledFixture validationType="alphanumeric" onValueComplete={onValueComplete} />,
      );
      const { inputs, hiddenInput } = getParts(container);

      await userEvent.click(inputs[0]!);
      await userEvent.keyboard("aB0z");
      expect(hiddenInput.value).toBe("aB0z");
      expect(onValueComplete).toHaveBeenCalledTimes(1);
      expect(onValueComplete.mock.lastCall?.[0]).toEqual(["a", "B", "0", "z"]);
    });

    it("HiddenInput은 완성된 영숫자 값만 폼에 제출한다", async () => {
      const onSubmit = vi.fn((event: React.FormEvent<HTMLFormElement>) => event.preventDefault());
      const { container } = render(
        <form onSubmit={onSubmit}>
          {fixture({
            validationType: "alphanumeric",
            defaultValue: ["a", "B", "0", "z"],
            required: true,
          })}
          <button type="submit">제출</button>
        </form>,
      );
      const { inputs, hiddenInput } = getParts(container);
      const form = container.querySelector("form")!;
      const submit = container.querySelector("button")!;

      expect(hiddenInput.pattern).toBe("[A-Za-z0-9]{4}");
      await userEvent.click(submit);
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(new FormData(form).get("code")).toBe("aB0z");

      await userEvent.click(inputs[1]!);
      await userEvent.keyboard("{Delete}");
      await userEvent.click(submit);
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(document.activeElement).toBe(inputs[1]);
    });

    it.each(["alphabet", "alphanumeric"] as const)(
      "%s 모드의 폼 초기화는 영문 defaultValue를 복원한다",
      async (validationType) => {
        const { container } = render(
          <form>
            {fixture({ validationType, defaultValue: ["a", "B"] })}
            <button type="reset">초기화</button>
          </form>,
        );
        const { inputs, hiddenInput } = getParts(container);
        paste(inputs[0]!, validationType === "alphabet" ? "QwXz" : "Q7x9");
        await userEvent.click(container.querySelector("button")!);
        await expect.poll(() => hiddenInput.value).toBe("aB");
        expect(inputs.map((input) => input.value)).toEqual(["a", "B", "", ""]);
      },
    );
  });

  describe("제어 값과 상태", () => {
    it("StrictMode에서도 DOM 반영 후 완료 알림을 한 번만 보내고 요청을 정리한다", async () => {
      const committedValues: string[] = [];
      const onValueComplete = vi.fn();
      const { container, rerender } = render(
        <StrictMode>{fixture({ onValueComplete })}</StrictMode>,
      );
      onValueComplete.mockImplementation(() => {
        committedValues.push(getParts(container).hiddenInput.value);
      });
      const { inputs } = getParts(container);

      await userEvent.click(inputs[0]!);
      await userEvent.keyboard("0123");
      expect(onValueComplete).toHaveBeenCalledTimes(1);
      expect(committedValues).toEqual(["0123"]);

      rerender(<StrictMode>{fixture({ onValueComplete, className: "updated" })}</StrictMode>);
      expect(onValueComplete).toHaveBeenCalledTimes(1);
      await userEvent.keyboard("4");
      expect(onValueComplete).toHaveBeenCalledTimes(2);
      expect(committedValues).toEqual(["0123", "0124"]);
    });

    it("부모가 flushSync로 먼저 값을 반영해도 완료 알림을 한 번 보낸다", async () => {
      const onValueComplete = vi.fn();
      const { container, rerender } = render(
        <SynchronousControlledFixture onValueComplete={onValueComplete} />,
      );
      const { inputs, hiddenInput } = getParts(container);

      await userEvent.type(inputs[3]!, "9");
      expect(hiddenInput.value).toBe("1239");
      expect(onValueComplete).toHaveBeenCalledTimes(1);
      expect(onValueComplete.mock.lastCall?.[0]).toEqual(["1", "2", "3", "9"]);

      rerender(<SynchronousControlledFixture onValueComplete={onValueComplete} />);
      expect(onValueComplete).toHaveBeenCalledTimes(1);
    });

    it("제어 부모가 다음 값을 반영하면 입력과 완료 알림을 갱신한다", async () => {
      const onValueComplete = vi.fn();
      const { container } = render(<ControlledFixture onValueComplete={onValueComplete} />);
      const { inputs, hiddenInput } = getParts(container);

      await userEvent.click(inputs[0]!);
      await userEvent.keyboard("0123");
      expect(hiddenInput.value).toBe("0123");
      expect(onValueComplete).toHaveBeenCalledTimes(1);
    });

    it("제어 부모가 변경을 반영하지 않으면 이전 값을 유지하고 완료 알림을 보내지 않는다", async () => {
      const onValueChange = vi.fn();
      const onValueComplete = vi.fn();
      const { container, rerender } = render(
        fixture({ value: ["1", "2", "3", ""], onValueChange, onValueComplete }),
      );
      const { inputs, hiddenInput } = getParts(container);

      await userEvent.type(inputs[3]!, "9");
      expect(inputs[3]!.value).toBe("");
      expect(hiddenInput.value).toBe("123");
      expect(onValueChange.mock.lastCall?.[0]).toEqual(["1", "2", "3", "9"]);
      expect(onValueComplete).not.toHaveBeenCalled();
      rerender(fixture({ value: ["1", "2", "3", "9"], onValueChange, onValueComplete }));
      expect(hiddenInput.value).toBe("1239");
      expect(onValueComplete).not.toHaveBeenCalled();
    });

    it("초기 값과 외부 값 변경은 완료 알림을 보내지 않는다", () => {
      const onValueComplete = vi.fn();
      const { container, rerender } = render(
        fixture({ value: ["1", "2", "3", "4"], onValueComplete }),
      );
      expect(getParts(container).root.hasAttribute("data-complete")).toBe(true);
      rerender(fixture({ value: ["4", "3", "2", "1"], onValueComplete }));
      expect(onValueComplete).not.toHaveBeenCalled();
    });

    it.each(["root", "field", "fieldset"] as const)(
      "%s의 disabled를 상속하고 폼 값에서 제외한다",
      (source) => {
        const content = fixture({
          defaultValue: ["1", "2", "3", "4"],
          disabled: source === "root",
        });
        const { container } = render(
          <form>
            {source === "field" ? (
              <Field.Root disabled>{content}</Field.Root>
            ) : source === "fieldset" ? (
              <Fieldset.Root disabled>{content}</Fieldset.Root>
            ) : (
              content
            )}
          </form>,
        );
        const { root, inputs, hiddenInput } = getParts(container);

        expect(root.hasAttribute("data-disabled")).toBe(true);
        expect(inputs.every((input) => input.disabled)).toBe(true);
        expect(hiddenInput.disabled).toBe(true);
        expect(new FormData(container.querySelector("form")!).has("code")).toBe(false);
      },
    );

    it("readOnly는 직접 입력, 삭제와 붙여넣기로 값을 변경하지 않는다", async () => {
      const onValueChange = vi.fn();
      const { container } = render(
        fixture({ defaultValue: ["1", "2", "3", "4"], readOnly: true, onValueChange }),
      );
      const { inputs, hiddenInput } = getParts(container);

      await userEvent.click(inputs[0]!);
      await userEvent.keyboard("9{Backspace}{Delete}");
      paste(inputs[0]!, "9876");
      expect(inputs.every((input) => input.readOnly)).toBe(true);
      expect(hiddenInput.value).toBe("1234");
      expect(onValueChange).not.toHaveBeenCalled();
    });
  });

  describe("HiddenInput과 폼", () => {
    it("전체 문자열 하나만 제출하고 외부 form에도 연결한다", async () => {
      const onSubmit = vi.fn((event: React.FormEvent<HTMLFormElement>) => event.preventDefault());
      const { container } = render(
        <>
          <form id="otp-form" onSubmit={onSubmit}>
            <button type="submit">제출</button>
          </form>
          {fixture({ form: "otp-form", defaultValue: ["0", "1", "2", "3"] })}
        </>,
      );
      const { inputs, hiddenInput } = getParts(container);
      const form = container.querySelector("form")!;

      expect(inputs.every((input) => input.form === form && input.name === "")).toBe(true);
      expect(hiddenInput.form).toBe(form);
      expect([...new FormData(form)]).toEqual([["code", "0123"]]);
      await userEvent.click(container.querySelector("button")!);
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it("일부 값의 제출을 막고 첫 빈 입력에 포커스를 보낸다", async () => {
      const onSubmit = vi.fn((event: React.FormEvent<HTMLFormElement>) => event.preventDefault());
      const { container } = render(
        <form onSubmit={onSubmit}>
          {fixture({ required: true, defaultValue: ["1", "", "3"] })}
          <button type="submit">제출</button>
        </form>,
      );
      const { inputs } = getParts(container);

      await userEvent.click(container.querySelector("button")!);
      expect(onSubmit).not.toHaveBeenCalled();
      expect(document.activeElement).toBe(inputs[1]);
    });

    it("required가 없는 빈 값은 허용하고 required 빈 값은 첫 입력으로 연결한다", async () => {
      const onSubmit = vi.fn((event: React.FormEvent<HTMLFormElement>) => event.preventDefault());
      const { container, rerender } = render(
        <form onSubmit={onSubmit}>
          {fixture()}
          <button type="submit">제출</button>
        </form>,
      );
      await userEvent.click(container.querySelector("button")!);
      expect(onSubmit).toHaveBeenCalledTimes(1);

      rerender(
        <form onSubmit={onSubmit}>
          {fixture({ required: true })}
          <button type="submit">제출</button>
        </form>,
      );
      await userEvent.click(container.querySelector("button")!);
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(document.activeElement).toBe(getParts(container).inputs[0]);
    });

    it("폼 초기화는 비제어 값을 defaultValue로 복원하고 변경·완료 알림을 보내지 않는다", async () => {
      const onValueChange = vi.fn();
      const onValueComplete = vi.fn();
      const { container } = render(
        <form>
          {fixture({ defaultValue: ["1", "2"], onValueChange, onValueComplete })}
          <button type="reset">초기화</button>
        </form>,
      );
      const { root, inputs, hiddenInput } = getParts(container);
      paste(inputs[0]!, "9876");
      onValueChange.mockClear();
      onValueComplete.mockClear();

      await userEvent.click(container.querySelector("button")!);
      await expect.poll(() => hiddenInput.value).toBe("12");
      expect(inputs.map((input) => input.value)).toEqual(["1", "2", "", ""]);
      expect(root.hasAttribute("data-complete")).toBe(false);
      expect(onValueChange).not.toHaveBeenCalled();
      expect(onValueComplete).not.toHaveBeenCalled();
    });

    it("취소한 폼 초기화와 제어 값은 현재 상태를 유지한다", async () => {
      const { container, rerender } = render(
        <form onReset={(event) => event.preventDefault()}>
          {fixture()}
          <button type="reset">초기화</button>
        </form>,
      );
      const { inputs, hiddenInput } = getParts(container);
      paste(inputs[0]!, "9876");
      await userEvent.click(container.querySelector("button")!);
      // 다음 사용자 입력까지 대기해 reset의 지연 작업 이후 상태를 확인한다.
      await userEvent.click(inputs[0]!);
      expect(hiddenInput.value).toBe("9876");

      rerender(
        <form>
          {fixture({ value: ["0", "1", "2", "3"] })}
          <button type="reset">초기화</button>
        </form>,
      );
      await userEvent.click(container.querySelector("button")!);
      await userEvent.click(getParts(container).inputs[0]!);
      expect(getParts(container).hiddenInput.value).toBe("0123");
    });
  });

  describe("Field와 접근성", () => {
    it("Field 라벨의 클릭을 표시된 입력으로 보내고 설명과 오류를 조건부로 연결한다", async () => {
      const { container, rerender } = render(<FieldFixture invalid />);
      const { control, inputs, hiddenInput } = getParts(container);

      expect(hiddenInput.name).toBe("verification");
      expect(control.getAttribute("aria-describedby")).toBe("code-description code-error");
      for (const input of inputs) {
        expect(input.getAttribute("aria-describedby")).toBe("code-description code-error");
        expect(input.getAttribute("aria-invalid")).toBe("true");
      }
      await userEvent.click(container.querySelector("label")!);
      expect(document.activeElement).toBe(inputs[0]);
      rerender(<FieldFixture />);
      expect(control.getAttribute("aria-describedby")).toBe("code-description");
      for (const input of inputs) {
        expect(input.getAttribute("aria-describedby")).toBe("code-description");
        expect(input.hasAttribute("aria-invalid")).toBe(false);
      }
    });

    it("자리 사이 이동은 blur 검증을 하지 않고 벗어날 때 전체 값을 검증한다", async () => {
      const validate = vi.fn(() => null);
      const { container } = render(
        <>
          <Field.Root validate={validate} validationMode="onBlur">
            {fixture()}
          </Field.Root>
          <button>다음</button>
        </>,
      );
      const { inputs } = getParts(container);

      await userEvent.click(inputs[0]!);
      await userEvent.keyboard("0123");
      expect(validate).not.toHaveBeenCalled();
      await userEvent.click(container.querySelector("button")!);
      expect(validate).toHaveBeenCalledWith("0123", expect.anything());
    });

    it("Label의 사용자 ID와 Root의 외부 이름을 입력 묶음에 연결한다", async () => {
      const { container, rerender } = render(
        <OtpField.Root length={1}>
          <OtpField.Label id="custom-label">인증번호</OtpField.Label>
          <OtpField.Control>
            <OtpField.Input index={0} />
          </OtpField.Control>
          <OtpField.HiddenInput />
        </OtpField.Root>,
      );
      expect(getParts(container).inputs[0]!.getAttribute("aria-labelledby")).toBe("custom-label");
      await expect
        .element(page.getByRole("textbox", { name: "인증번호", exact: true }))
        .toBeVisible();
      rerender(
        <OtpField.Root length={1} aria-label="복구 코드">
          <OtpField.Control>
            <OtpField.Input index={0} />
          </OtpField.Control>
          <OtpField.HiddenInput />
        </OtpField.Root>,
      );
      await expect.element(page.getByRole("group", { name: "복구 코드" })).toBeVisible();
      await expect.element(page.getByRole("textbox", { name: "복구 코드" })).toBeVisible();
    });

    it("문서화한 기본 조합과 Field 조합에 자동 감지 가능한 접근성 위반이 없다", async () => {
      const { container, rerender } = render(fixture({ required: true }));
      expect((await axe.run(container)).violations).toEqual([]);
      rerender(<FieldFixture invalid />);
      expect((await axe.run(container)).violations).toEqual([]);
    });
  });
});

// 네이티브 텍스트 입력의 일반 Selection·Form 알고리즘과 제품 CSS는 중복 테스트하지 않는다.
// 이 파일은 Coral이 소유한 입력 분배, 포커스 조정, 파츠 합성과 폼 연결을 검증한다.

import axe from "axe-core";
import { createRef, StrictMode, useState, type ComponentProps, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { createRoot, hydrateRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import {
  Combobox,
  type ComboboxClearProps,
  type ComboboxInputProps,
  type ComboboxItem,
  type ComboboxItemProps,
  type ComboboxRootProps,
  type ComboboxTriggerProps,
} from ".";
import { Combobox as RootExportCombobox } from "..";
import { Field } from "../field";
import { Fieldset } from "../fieldset";

const fixtures: Array<{ container: HTMLDivElement; root: Root }> = [];

afterEach(() => {
  for (const { container, root } of fixtures.splice(0).toReversed()) {
    flushSync(() => root.unmount());
    container.remove();
  }
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

const items: readonly ComboboxItem[] = [
  { value: "apple-id", label: "Apple" },
  { value: "apricot-id", label: "Apricot", disabled: true },
  { value: "banana-id", label: "Banana" },
  { value: "cherry-id", label: "Cherry" },
];

interface FixtureProps {
  rootProps?: ComboboxRootProps;
  inputProps?: ComboboxInputProps;
  triggerProps?: ComboboxTriggerProps;
  clearProps?: ComboboxClearProps;
  itemProps?: Omit<ComboboxItemProps, "value">;
  hiddenValues?: readonly string[];
  portal?: boolean;
}

function Fixture({
  rootProps,
  inputProps,
  triggerProps,
  clearProps,
  itemProps,
  hiddenValues = [],
  portal = true,
}: FixtureProps) {
  const options = rootProps?.items ?? items;
  // Geometry only supports pointer hit testing; appearance is not a test contract.
  const popup = (
    <Combobox.Positioner data-positioner="" sideOffset={4}>
      <Combobox.List aria-label="선택 가능한 과일" style={{ width: 200, background: "white" }}>
        {options.map((item) => (
          <Combobox.Item
            key={item.value}
            value={item.value}
            hidden={hiddenValues.includes(item.value)}
            style={{ padding: 8 }}
            {...itemProps}
          >
            <Combobox.ItemIndicator data-indicator="">✓</Combobox.ItemIndicator>
            {item.label}
          </Combobox.Item>
        ))}
      </Combobox.List>
    </Combobox.Positioner>
  );
  return (
    <>
      <button type="button">이전</button>
      <Combobox.Root items={items} {...rootProps} data-root="">
        <Combobox.Value data-value-display="" />
        <Combobox.Input aria-label="과일" {...inputProps} />
        <Combobox.Trigger aria-label="목록 열기" {...triggerProps}>
          열기
        </Combobox.Trigger>
        <Combobox.Clear aria-label="선택 모두 지우기" {...clearProps}>
          지우기
        </Combobox.Clear>
        {portal ? <Combobox.Portal data-portal="">{popup}</Combobox.Portal> : popup}
        <Combobox.HiddenSelect data-native-select="" />
      </Combobox.Root>
      <button type="button" style={{ display: "block", marginTop: 240 }}>
        다음
      </button>
      <div data-outside="" style={{ width: 100, height: 32 }}>
        바깥 영역
      </div>
    </>
  );
}

const getInput = () => document.querySelector<HTMLInputElement>('[role="combobox"]')!;
const getSelect = () => document.querySelector<HTMLSelectElement>("[data-native-select]")!;
const getList = () => document.querySelector<HTMLElement>('[role="listbox"]');
const getOptions = () => [...document.querySelectorAll<HTMLElement>('[role="option"]')];
const getActive = () =>
  document.getElementById(getInput().getAttribute("aria-activedescendant") ?? "");
const getSelected = () =>
  getOptions()
    .filter((option) => option.getAttribute("aria-selected") === "true")
    .map((option) => option.dataset.value);
const getValueDisplay = () => document.querySelector<HTMLElement>("[data-value-display]")!;
const getFormValues = () => new FormData(getSelect().form!).getAll("fruit");

async function openCombobox() {
  await page.getByRole("combobox").click();
  // Portal mounts on the client, so wait for the actual popup rather than a delay.
  await vi.waitFor(() =>
    expect(getList()?.closest('[popover="manual"]')?.matches(":popover-open")).toBe(true),
  );
}

function CustomInput(props: ComponentProps<"input">) {
  return <input {...props} data-custom="" />;
}
function CustomSelect(props: ComponentProps<"select">) {
  return <select {...props} data-custom="" />;
}
function CustomDiv(props: ComponentProps<"div">) {
  return <div {...props} data-custom="" />;
}

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

// Native editing and select/form algorithms belong to the browser. Tests verify
// Coral's coordination of committed values, search, ARIA, focus and Field integration.
describe("Combobox", () => {
  describe("구조와 접근성", () => {
    it("루트 export와 닫힌 상태의 이름·역할·조건부 ARIA를 제공한다", async () => {
      expect(RootExportCombobox).toBe(Combobox);
      render(<Fixture />);
      const input = getInput();
      expect(input.type).toBe("text");
      expect(input.getAttribute("aria-autocomplete")).toBe("list");
      expect(input.getAttribute("aria-haspopup")).toBe("listbox");
      expect(input.getAttribute("aria-expanded")).toBe("false");
      expect(input.hasAttribute("aria-controls")).toBe(false);
      expect(input.hasAttribute("aria-activedescendant")).toBe(false);
      expect(input.hasAttribute("aria-required")).toBe(false);
      expect(getList()).toBeNull();
      expect(document.querySelector("[data-portal]")).toBeNull();
      expect(getSelect().getAttribute("aria-hidden")).toBe("true");
      expect(getSelect().tabIndex).toBe(-1);
      await expect.element(input).toHaveAccessibleName("과일");
    });

    it.each([false, true])("multiple=%s에서 목록 참조와 선택 의미를 연결한다", async (multiple) => {
      const { container } = render(
        <Fixture
          rootProps={
            multiple
              ? { items, multiple: true, defaultValue: ["banana-id"] }
              : { items, defaultValue: "banana-id" }
          }
        />,
      );
      await openCombobox();
      expect(container.contains(getList())).toBe(false);
      expect(getInput().getAttribute("aria-controls")).toBe(getList()!.id);
      expect(getList()!.getAttribute("aria-multiselectable")).toBe(multiple ? "true" : null);
      expect(getSelected()).toEqual(["banana-id"]);
      expect(getOptions().every((option) => option.tabIndex === -1)).toBe(true);
      expect(getOptions()[0]!.hasAttribute("aria-disabled")).toBe(false);
      expect(getOptions()[1]!.getAttribute("aria-disabled")).toBe("true");
      const indicator = document.querySelector("[data-indicator]")!;
      expect(indicator.getAttribute("aria-hidden")).toBe("true");
      expect(indicator.parentElement?.getAttribute("data-selected")).toBe("");
      await expect.element(getList()!).toHaveAccessibleName("선택 가능한 과일");
      expect(
        (await axe.run(document.body, { rules: { region: { enabled: false } } })).violations,
      ).toEqual([]);
      await userEvent.keyboard("{Escape}");
      expect(getList()).toBeNull();
      expect(getInput().hasAttribute("aria-controls")).toBe(false);
      expect(getInput().hasAttribute("aria-activedescendant")).toBe(false);
    });

    it("팝업을 열기 전부터 초기 선택을 label로 표시한다", () => {
      const view = render(<Fixture rootProps={{ items, defaultValue: "banana-id" }} />);
      expect(getInput().value).toBe("Banana");
      view.rerender(
        <Fixture rootProps={{ items, multiple: true, value: ["apple-id", "cherry-id"] }} />,
      );
      expect(getInput().value).toBe("");
      expect(getValueDisplay().textContent).toBe("Apple, Cherry");
      expect(getValueDisplay().hasAttribute("data-empty")).toBe(false);
    });

    it("Value의 사용자 콘텐츠를 유지한다", () => {
      const { container } = render(
        <Combobox.Root items={items} multiple defaultValue={["apple-id"]}>
          <Combobox.Value>선택한 과일 1개</Combobox.Value>
        </Combobox.Root>,
      );
      expect(container.textContent).toBe("선택한 과일 1개");
    });
  });

  describe("검색과 선택", () => {
    it("검색은 label로 필터링하며 확정한 ID와 폼 값을 변경하지 않는다", async () => {
      const onValueChange = vi.fn();
      render(
        <form>
          <Fixture rootProps={{ items, defaultValue: "banana-id", name: "fruit", onValueChange }} />
        </form>,
      );
      await userEvent.fill(page.getByRole("combobox"), "AP");
      expect(getOptions().map((option) => option.dataset.value)).toEqual([
        "apple-id",
        "apricot-id",
      ]);
      expect(getFormValues()).toEqual(["banana-id"]);
      expect(onValueChange).not.toHaveBeenCalled();
      await userEvent.keyboard("{Escape}");
      expect(getInput().value).toBe("Banana");
      await openCombobox();
      expect(getOptions()).toHaveLength(items.length);
      await userEvent.fill(page.getByRole("combobox"), "");
      expect(getFormValues()).toEqual(["banana-id"]);
    });

    it("일치하는 문자열을 입력해도 탐색·확정하지 않으면 선택하지 않는다", async () => {
      const onValueChange = vi.fn();
      const submit = vi.fn();
      render(
        <form
          onSubmit={(event) => {
            event.preventDefault();
            submit();
          }}
        >
          <Fixture rootProps={{ items, name: "fruit", onValueChange }} />
          <button type="submit">제출</button>
        </form>,
      );
      await userEvent.fill(page.getByRole("combobox"), "Apple");
      expect(getActive()).toBeNull();
      expect(getSelected()).toEqual([]);
      await userEvent.keyboard("{Enter}");
      expect(submit).toHaveBeenCalledOnce();
      expect(getFormValues()).toEqual([""]);
      expect(onValueChange).not.toHaveBeenCalled();
    });

    it("Enter는 활성 항목의 ID를 확정하고 닫으며 포커스와 커서를 유지한다", async () => {
      const onValueChange = vi.fn();
      const onChange = vi.fn();
      render(<Fixture rootProps={{ items, onValueChange }} inputProps={{ onChange }} />);
      await openCombobox();
      const nativeInput = vi.fn();
      getInput().addEventListener("input", nativeInput);
      await userEvent.keyboard("{ArrowDown}{ArrowDown}{Enter}");
      expect(getInput().value).toBe("Banana");
      expect(getInput().selectionStart).toBe(6);
      expect(getInput().selectionEnd).toBe(6);
      expect(document.activeElement).toBe(getInput());
      expect(getList()).toBeNull();
      expect(onValueChange).toHaveBeenCalledExactlyOnceWith(
        "banana-id",
        expect.objectContaining({
          reason: "item-press",
          event: expect.any(KeyboardEvent),
          isCanceled: false,
        }),
      );
      expect(onChange).not.toHaveBeenCalled();
      expect(nativeInput).not.toHaveBeenCalled();
    });

    it("다중 선택은 탐색과 구분되며 같은 항목을 다시 확정하면 해제한다", async () => {
      const onValueChange = vi.fn();
      render(<Fixture rootProps={{ items, multiple: true, onValueChange }} />);
      await openCombobox();
      await userEvent.keyboard("{ArrowDown}");
      expect(getActive()?.dataset.value).toBe("apple-id");
      expect(getActive()?.hasAttribute("data-highlighted")).toBe(true);
      expect(getSelected()).toEqual([]);
      await userEvent.keyboard("{Enter}{ArrowDown}{Enter}");
      expect(getSelected()).toEqual(["apple-id", "banana-id"]);
      expect(getValueDisplay().textContent).toBe("Apple, Banana");
      expect(getList()).not.toBeNull();
      await userEvent.keyboard("{Enter}");
      expect(getSelected()).toEqual(["apple-id"]);
      expect(onValueChange).toHaveBeenLastCalledWith(["apple-id"], expect.anything());
      expect(document.activeElement).toBe(getInput());
    });

    it("다중 선택을 확정하면 검색을 비우고 전체 목록을 복구한다", async () => {
      render(<Fixture rootProps={{ items, multiple: true }} />);
      await userEvent.fill(page.getByRole("combobox"), "BAN");
      await userEvent.keyboard("{ArrowDown}{Enter}");
      expect(getInput().value).toBe("");
      expect(getOptions()).toHaveLength(items.length);
      expect(getSelected()).toEqual(["banana-id"]);
      await userEvent.fill(page.getByRole("combobox"), "없는 과일");
      expect(getOptions()).toHaveLength(0);
      await userEvent.keyboard("{ArrowDown}{ArrowUp}");
      expect(getActive()).toBeNull();
      await userEvent.keyboard("{Escape}");
      expect(getValueDisplay().textContent).toBe("Banana");
      expect(getInput().value).toBe("");
    });

    it("선택 요청을 취소하면 검색과 열린 상태를 유지한다", async () => {
      render(<Fixture rootProps={{ items, onValueChange: (_, details) => details.cancel() }} />);
      await userEvent.fill(page.getByRole("combobox"), "ban");
      await userEvent.keyboard("{ArrowDown}{Enter}");
      expect(getInput().value).toBe("ban");
      expect(getList()).not.toBeNull();
      expect(getSelected()).toEqual([]);
    });
  });

  describe("Clear와 Trigger", () => {
    it.each([false, true])(
      "multiple=%s의 Clear는 선택과 검색을 모두 지우고 입력에 포커스를 둔다",
      async (multiple) => {
        const onValueChange = vi.fn();
        const onChange = vi.fn();
        const submit = vi.fn();
        render(
          <form
            onSubmit={(event) => {
              event.preventDefault();
              submit();
            }}
          >
            <Fixture
              rootProps={
                multiple
                  ? {
                      items,
                      multiple: true,
                      defaultValue: ["apple-id", "cherry-id"],
                      name: "fruit",
                      onValueChange,
                    }
                  : { items, defaultValue: "apple-id", name: "fruit", onValueChange }
              }
              inputProps={{ onChange }}
            />
          </form>,
        );
        await userEvent.fill(page.getByRole("combobox"), "ban");
        onChange.mockClear();
        const nativeInput = vi.fn();
        getInput().addEventListener("input", nativeInput);
        await page.getByRole("button", { name: "선택 모두 지우기" }).click();
        expect(onValueChange).toHaveBeenCalledExactlyOnceWith(
          multiple ? [] : null,
          expect.objectContaining({ reason: "clear-press", event: expect.any(MouseEvent) }),
        );
        expect(getFormValues()).toEqual(multiple ? [] : [""]);
        expect(getInput().value).toBe("");
        expect(getValueDisplay().textContent).toBe("");
        expect(getValueDisplay().hasAttribute("data-empty")).toBe(true);
        expect(
          page
            .getByRole("button", { name: "선택 모두 지우기" })
            .element()
            .hasAttribute("data-empty"),
        ).toBe(true);
        expect(getOptions()).toHaveLength(items.length);
        expect(document.activeElement).toBe(getInput());
        expect(submit).not.toHaveBeenCalled();
        expect(onChange).not.toHaveBeenCalled();
        expect(nativeInput).not.toHaveBeenCalled();
      },
    );

    it("Clear의 변경 취소는 선택과 검색을 유지한다", async () => {
      render(
        <Fixture
          rootProps={{
            items,
            defaultValue: "apple-id",
            onValueChange: (_, details) => details.cancel(),
          }}
        />,
      );
      await userEvent.fill(page.getByRole("combobox"), "ban");
      await page.getByRole("button", { name: "선택 모두 지우기" }).click();
      expect(getInput().value).toBe("ban");
      expect(getValueDisplay().textContent).toBe("Apple");
      expect(getList()).not.toBeNull();
    });

    it("빈 선택에서 Clear는 검색만 지우고 값 변경을 알리지 않는다", async () => {
      const onValueChange = vi.fn();
      render(<Fixture rootProps={{ items, onValueChange }} />);
      await userEvent.fill(page.getByRole("combobox"), "ban");
      await page.getByRole("button", { name: "선택 모두 지우기" }).click();
      expect(getInput().value).toBe("");
      expect(getOptions()).toHaveLength(items.length);
      expect(onValueChange).not.toHaveBeenCalled();
    });

    it("Trigger는 선택을 변경하거나 제출하지 않고 목록을 토글한다", async () => {
      const onOpenChange = vi.fn();
      const submit = vi.fn();
      render(
        <form
          onSubmit={(event) => {
            event.preventDefault();
            submit();
          }}
        >
          <Fixture rootProps={{ items, onOpenChange }} />
        </form>,
      );
      const trigger = page.getByRole("button", { name: "목록 열기" });
      expect(trigger.element().hasAttribute("aria-controls")).toBe(false);
      await trigger.click();
      await vi.waitFor(() => expect(getList()).not.toBeNull());
      expect(trigger.element().getAttribute("aria-controls")).toBe(getList()!.id);
      expect(trigger.element().getAttribute("aria-expanded")).toBe("true");
      expect(document.activeElement).toBe(getInput());
      await trigger.click();
      expect(getList()).toBeNull();
      expect(trigger.element().getAttribute("aria-expanded")).toBe("false");
      expect(onOpenChange.mock.calls.map(([next]) => next)).toEqual([true, false]);
      expect(onOpenChange).toHaveBeenLastCalledWith(
        false,
        expect.objectContaining({ reason: "trigger-press" }),
      );
      expect(submit).not.toHaveBeenCalled();
    });

    it("버튼과 항목 핸들러의 preventDefault가 내부 동작을 막는다", async () => {
      render(
        <Fixture
          rootProps={{ items, defaultValue: "banana-id" }}
          triggerProps={{ onClick: preventDefault }}
          clearProps={{ onClick: preventDefault }}
          itemProps={{ onClick: preventDefault }}
        />,
      );
      await page.getByRole("button", { name: "목록 열기" }).click();
      expect(getList()).toBeNull();
      await openCombobox();
      await page.getByRole("option", { name: "Apple", exact: true }).click();
      expect(getSelected()).toEqual(["banana-id"]);
      await page.getByRole("button", { name: "선택 모두 지우기" }).click();
      expect(getValueDisplay().textContent).toBe("Banana");
    });
  });

  describe("키보드·포인터·포커스", () => {
    it("닫힌 방향키로 처음·마지막을 활성화하고 비활성·숨김 항목을 건너뛴다", async () => {
      render(<Fixture hiddenValues={["cherry-id"]} />);
      await page.getByRole("button", { name: "이전", exact: true }).click();
      await userEvent.keyboard("{Tab}");
      expect(document.activeElement).toBe(getInput());
      expect(getList()).toBeNull();
      await userEvent.keyboard("{ArrowUp}");
      await vi.waitFor(() => expect(getActive()?.dataset.value).toBe("banana-id"));
      await userEvent.keyboard("{ArrowDown}");
      expect(getActive()?.dataset.value).toBe("banana-id");
      await userEvent.keyboard("{ArrowUp}{ArrowUp}");
      expect(getActive()?.dataset.value).toBe("apple-id");
      await userEvent.keyboard("{Escape}{ArrowDown}");
      await vi.waitFor(() => expect(getActive()?.dataset.value).toBe("apple-id"));
      expect(document.activeElement).toBe(getInput());
    });

    it("Tab과 Shift+Tab은 버튼·목록을 건너뛰고 선택을 확정하지 않는다", async () => {
      render(<Fixture rootProps={{ items, defaultValue: "banana-id" }} />);
      await openCombobox();
      await userEvent.keyboard("{ArrowDown}{Tab}");
      await expect.element(page.getByRole("button", { name: "다음", exact: true })).toHaveFocus();
      expect(getList()).toBeNull();
      expect(getInput().value).toBe("Banana");
      await userEvent.keyboard("{Shift>}{Tab}{/Shift}");
      expect(document.activeElement).toBe(getInput());
      expect(getList()).toBeNull();
      await userEvent.keyboard("{Shift>}{Tab}{/Shift}");
      await expect.element(page.getByRole("button", { name: "이전", exact: true })).toHaveFocus();
    });

    it.each(["ArrowLeft", "ArrowRight", "Home", "End"])(
      "%s는 활성 항목을 해제하고 텍스트 편집을 유지한다",
      async (key) => {
        render(<Fixture />);
        await userEvent.fill(page.getByRole("combobox"), "App");
        await userEvent.keyboard("{ArrowDown}");
        expect(getActive()).not.toBeNull();
        await userEvent.keyboard(`{${key}}`);
        expect(getActive()).toBeNull();
        expect(getInput().value).toBe("App");
        expect(getList()).not.toBeNull();
      },
    );

    it.each(["ArrowDown", "ArrowUp", "Enter", "Escape"])(
      "IME 조합 중 %s를 가로채지 않는다",
      async (key) => {
        render(<Fixture />);
        await openCombobox();
        await userEvent.keyboard("{ArrowDown}");
        const previous = getActive();
        // Playwright cannot create an OS IME session; use its native event flag.
        const event = new KeyboardEvent("keydown", {
          key,
          isComposing: true,
          bubbles: true,
          cancelable: true,
        });
        flushSync(() => getInput().dispatchEvent(event));
        expect(event.defaultPrevented).toBe(false);
        expect(getActive()).toBe(previous);
        expect(getSelected()).toEqual([]);
        expect(getList()).not.toBeNull();
      },
    );

    it("IME keyCode 229도 확정으로 처리하지 않는다", async () => {
      render(<Fixture />);
      await openCombobox();
      await userEvent.keyboard("{ArrowDown}");
      const event = new KeyboardEvent("keydown", {
        key: "Enter",
        keyCode: 229,
        bubbles: true,
        cancelable: true,
      });
      flushSync(() => getInput().dispatchEvent(event));
      expect(event.defaultPrevented).toBe(false);
      expect(getSelected()).toEqual([]);
      expect(getList()).not.toBeNull();
    });

    it("포인터 활성화와 클릭 선택을 제공하고 disabled 항목은 무시한다", async () => {
      render(<Fixture />);
      await openCombobox();
      await userEvent.hover(page.getByRole("option", { name: "Banana", exact: true }));
      expect(getActive()?.dataset.value).toBe("banana-id");
      expect(getSelected()).toEqual([]);
      // Force bypasses Playwright's aria-disabled guard to exercise Coral's guard.
      await page.getByRole("option", { name: "Apricot", exact: true }).click({ force: true });
      expect(getInput().value).toBe("");
      await page.getByRole("option", { name: "Banana", exact: true }).click();
      expect(getInput().value).toBe("Banana");
      expect(document.activeElement).toBe(getInput());
      expect(getList()).toBeNull();
    });

    it("외부 버튼 클릭은 닫고 목적지 포커스를 유지한다", async () => {
      render(<Fixture />);
      await openCombobox();
      await page.getByRole("button", { name: "다음", exact: true }).click();
      expect(getList()).toBeNull();
      await expect.element(page.getByRole("button", { name: "다음", exact: true })).toHaveFocus();
    });

    it("Input 포커스 없이 열린 목록도 외부 클릭으로 닫는다", async () => {
      const onOpenChange = vi.fn();
      render(<Fixture rootProps={{ items, defaultOpen: true, onOpenChange }} />);
      // Keep Input unfocused to exercise outside-press independently of blur.
      await vi.waitFor(() => expect(getList()).not.toBeNull());
      expect(document.activeElement).not.toBe(getInput());
      await page.getByText("바깥 영역", { exact: true }).click();
      expect(getList()).toBeNull();
      expect(onOpenChange).toHaveBeenLastCalledWith(
        false,
        expect.objectContaining({ reason: "outside-press", event: expect.any(MouseEvent) }),
      );
    });

    it("입력 핸들러의 preventDefault로 입력·열림·탐색을 취소한다", async () => {
      render(
        <Fixture
          inputProps={{
            onClick: (event) => event.preventDefault(),
            onKeyDown: (event) => event.preventDefault(),
            onChange: (event) => event.preventDefault(),
          }}
        />,
      );
      await page.getByRole("combobox").click();
      await userEvent.keyboard("{ArrowDown}");
      await userEvent.fill(page.getByRole("combobox"), "App");
      expect(getInput().value).toBe("");
      expect(getList()).toBeNull();
    });
  });

  describe("제어 상태와 동적 변경", () => {
    it.each([false, true])("multiple=%s의 제어 선택과 열림 변경을 반영한다", async (multiple) => {
      function ControlledFixture() {
        const [singleValue, setSingleValue] = useState<string | null>(null);
        const [multipleValue, setMultipleValue] = useState<string[]>([]);
        const [isOpen, setOpen] = useState(false);
        return (
          <form>
            <Fixture
              rootProps={
                multiple
                  ? {
                      items,
                      multiple: true,
                      value: multipleValue,
                      onValueChange: setMultipleValue,
                      open: isOpen,
                      onOpenChange: setOpen,
                      name: "fruit",
                    }
                  : {
                      items,
                      value: singleValue,
                      onValueChange: setSingleValue,
                      open: isOpen,
                      onOpenChange: setOpen,
                      name: "fruit",
                    }
              }
            />
          </form>
        );
      }
      render(<ControlledFixture />);
      await openCombobox();
      await userEvent.keyboard("{ArrowDown}{Enter}");
      expect(getFormValues()).toEqual(["apple-id"]);
      expect(getValueDisplay().textContent).toBe("Apple");
      expect(getInput().value).toBe(multiple ? "" : "Apple");
      expect(getList() !== null).toBe(multiple);
    });

    it("제어 부모가 선택 변경을 반영하지 않으면 기존 값을 유지한다", async () => {
      const onValueChange = vi.fn();
      render(
        <form>
          <Fixture rootProps={{ items, value: "banana-id", onValueChange, name: "fruit" }} />
        </form>,
      );
      await openCombobox();
      await userEvent.keyboard("{ArrowDown}{Enter}");
      expect(onValueChange).toHaveBeenCalledWith("apple-id", expect.anything());
      expect(getInput().value).toBe("Banana");
      expect(getFormValues()).toEqual(["banana-id"]);
    });

    it("열기와 닫기 요청을 취소하고 선택 변경은 독립적으로 반영한다", async () => {
      let cancel = true;
      render(
        <Fixture
          rootProps={{
            items,
            onOpenChange: (_, details) => {
              if (cancel) details.cancel();
            },
          }}
        />,
      );
      await page.getByRole("combobox").click();
      expect(getList()).toBeNull();
      cancel = false;
      await openCombobox();
      cancel = true;
      await userEvent.keyboard("{ArrowDown}{Enter}");
      expect(getInput().value).toBe("Apple");
      expect(getSelected()).toEqual(["apple-id"]);
      expect(getList()).not.toBeNull();
    });

    it.each(["remove", "disable", "hide"])(
      "활성 항목의 %s 후 잘못된 ID 참조를 제거한다",
      async (change) => {
        const view = render(<Fixture />);
        await openCombobox();
        await userEvent.keyboard("{ArrowDown}");
        expect(getActive()?.dataset.value).toBe("apple-id");
        const nextItems =
          change === "remove"
            ? items.slice(1)
            : items.map((item) =>
                item.value === "apple-id" ? { ...item, disabled: change === "disable" } : item,
              );
        view.rerender(
          <Fixture
            rootProps={{ items: nextItems }}
            hiddenValues={change === "hide" ? ["apple-id"] : []}
          />,
        );
        await vi.waitFor(() =>
          expect(getInput().hasAttribute("aria-activedescendant")).toBe(false),
        );
        await userEvent.keyboard("{ArrowDown}");
        expect(getActive()?.dataset.value).toBe("banana-id");
        expect(document.activeElement).toBe(getInput());
      },
    );

    it("중복·알 수 없는 선택 값을 제외하고 items에서 제거한 선택을 반영한다", () => {
      const onValueChange = vi.fn();
      const view = render(
        <form>
          <Fixture
            rootProps={{
              items,
              multiple: true,
              value: ["banana-id", "banana-id", "missing"],
              name: "fruit",
              onValueChange,
            }}
          />
        </form>,
      );
      expect(getFormValues()).toEqual(["banana-id"]);
      view.rerender(
        <form>
          <Fixture
            rootProps={{
              items: items.filter((item) => item.value !== "banana-id"),
              multiple: true,
              value: ["banana-id"],
              name: "fruit",
              onValueChange,
            }}
          />
        </form>,
      );
      expect(getFormValues()).toEqual([]);
      expect(getValueDisplay().textContent).toBe("");
      expect(onValueChange).not.toHaveBeenCalled();
    });

    it("빈 목록과 모두 disabled인 목록에서도 안전하게 탐색한다", async () => {
      const view = render(<Fixture rootProps={{ items: [] }} />);
      await openCombobox();
      await userEvent.keyboard("{ArrowDown}{ArrowUp}");
      expect(getActive()).toBeNull();
      view.rerender(
        <Fixture rootProps={{ items: items.map((item) => ({ ...item, disabled: true })) }} />,
      );
      await userEvent.keyboard("{ArrowDown}{ArrowUp}");
      expect(getActive()).toBeNull();
      expect(getList()).not.toBeNull();
    });
  });

  describe("Field와 Form", () => {
    it.each([false, true])(
      "multiple=%s의 Field 이름·설명과 필수 선택 검증을 연결한다",
      async (multiple) => {
        render(
          <form>
            <Field.Root name="fruit">
              <Field.Label>원하는 과일</Field.Label>
              <Field.Description>목록에서 선택합니다.</Field.Description>
              <Fixture
                rootProps={
                  multiple ? { items, multiple: true, required: true } : { items, required: true }
                }
                inputProps={{ "aria-label": undefined }}
              />
              <Field.Error>과일 선택이 필요합니다.</Field.Error>
            </Field.Root>
            <button type="submit">제출</button>
          </form>,
        );
        await expect.element(getInput()).toHaveAccessibleName("원하는 과일");
        await expect.element(getInput()).toHaveAccessibleDescription("목록에서 선택합니다.");
        expect(getInput().getAttribute("aria-required")).toBe("true");
        expect(getInput().name).toBe("");
        await userEvent.fill(page.getByRole("combobox"), "Apple");
        expect(getSelect().validity.valueMissing).toBe(true);
        await page.getByRole("button", { name: "제출", exact: true }).click();
        expect(document.activeElement).toBe(getInput());
        expect(getInput().getAttribute("aria-invalid")).toBe("true");
        await expect
          .element(getInput())
          .toHaveAccessibleDescription("목록에서 선택합니다. 과일 선택이 필요합니다.");
        await userEvent.keyboard("{ArrowDown}");
        await vi.waitFor(() => expect(getActive()?.dataset.value).toBe("apple-id"));
        await userEvent.keyboard("{Enter}");
        expect(getSelect().validity.valid).toBe(true);
        expect(getFormValues()).toEqual(["apple-id"]);
      },
    );

    it.each([false, true])(
      "multiple=%s의 사용자 검증에는 검색어 대신 확정한 선택을 전달한다",
      async (multiple) => {
        const validate = vi.fn(() => null);
        render(
          <Field.Root name="fruit" validate={validate} validationMode="onChange">
            <Fixture rootProps={multiple ? { items, multiple: true } : { items }} />
          </Field.Root>,
        );
        await userEvent.fill(page.getByRole("combobox"), "BAN");
        expect(validate).not.toHaveBeenCalled();
        await userEvent.keyboard("{ArrowDown}{Enter}");
        expect(validate).toHaveBeenLastCalledWith(
          multiple ? ["banana-id"] : "banana-id",
          expect.anything(),
        );
        await page.getByRole("button", { name: "선택 모두 지우기" }).click();
        expect(validate).toHaveBeenLastCalledWith(multiple ? [] : "", expect.anything());
      },
    );

    it("Field Label과 숨긴 select의 포커스를 표시된 Input으로 연결한다", async () => {
      render(
        <Field.Root>
          <Field.Label>과일 선택</Field.Label>
          <Fixture inputProps={{ "aria-label": undefined, id: "fruit-input" }} />
        </Field.Root>,
      );
      await page.getByText("과일 선택", { exact: true }).click();
      expect(document.activeElement).toBe(getInput());
      expect(document.querySelector("label")!.htmlFor).toBe("fruit-input");
      getSelect().focus();
      expect(document.activeElement).toBe(getInput());
    });

    it.each([false, true])(
      "multiple=%s의 외부 폼 reset은 비제어 기본 선택과 검색을 복구한다",
      async (multiple) => {
        const onValueChange = vi.fn();
        const onOpenChange = vi.fn();
        render(
          <>
            <form id="fruit-form">
              <button type="reset">초기화</button>
            </form>
            <Fixture
              rootProps={
                multiple
                  ? {
                      items,
                      multiple: true,
                      defaultValue: ["banana-id"],
                      name: "fruit",
                      form: "fruit-form",
                      onValueChange,
                      onOpenChange,
                    }
                  : {
                      items,
                      defaultValue: "banana-id",
                      name: "fruit",
                      form: "fruit-form",
                      onValueChange,
                      onOpenChange,
                    }
              }
            />
          </>,
        );
        await openCombobox();
        await userEvent.keyboard("{ArrowDown}{Enter}");
        await userEvent.fill(page.getByRole("combobox"), "ch");
        // reset is deferred until the browser has completed its native reset algorithm.
        const onReset = vi.fn(() => {
          onValueChange.mockClear();
          onOpenChange.mockClear();
        });
        document.querySelector("form")!.addEventListener("reset", onReset);
        await page.getByRole("button", { name: "초기화", exact: true }).click();
        await vi.waitFor(() => {
          expect(getFormValues()).toEqual(["banana-id"]);
          expect(getInput().value).toBe(multiple ? "" : "Banana");
          expect(getList()).toBeNull();
        });
        expect(onReset).toHaveBeenCalledOnce();
        expect(onValueChange).not.toHaveBeenCalled();
        expect(onOpenChange).not.toHaveBeenCalled();
      },
    );

    it.each([false, true])(
      "multiple=%s의 reset은 제어 선택과 defaultOpen을 유지한다",
      async (multiple) => {
        render(
          <form>
            <Fixture
              rootProps={
                multiple
                  ? {
                      items,
                      multiple: true,
                      value: ["cherry-id"],
                      defaultValue: ["apple-id"],
                      defaultOpen: true,
                      name: "fruit",
                    }
                  : {
                      items,
                      value: "cherry-id",
                      defaultValue: "apple-id",
                      defaultOpen: true,
                      name: "fruit",
                    }
              }
            />
            <button type="reset">초기화</button>
          </form>,
        );
        await userEvent.fill(page.getByRole("combobox"), "ban");
        await page.getByRole("button", { name: "초기화", exact: true }).click();
        await vi.waitFor(() => {
          expect(getFormValues()).toEqual(["cherry-id"]);
          expect(getInput().value).toBe(multiple ? "" : "Cherry");
          expect(getList()).not.toBeNull();
        });
        expect(getActive()).toBeNull();
      },
    );

    it("취소한 reset은 변경한 선택을 유지한다", async () => {
      render(
        <form onReset={(event) => event.preventDefault()}>
          <Fixture rootProps={{ items, defaultValue: "banana-id", name: "fruit" }} />
          <button type="reset">초기화</button>
        </form>,
      );
      await openCombobox();
      await userEvent.keyboard("{ArrowDown}{Enter}");
      await page.getByRole("button", { name: "초기화", exact: true }).click();
      expect(getFormValues()).toEqual(["apple-id"]);
      expect(getInput().value).toBe("Apple");
    });
  });

  describe("Disabled와 ReadOnly", () => {
    it.each(["disabled", "readOnly"] as const)(
      "%s를 전파하고 선택·팝업·버튼 동작을 막는다",
      async (prop) => {
        const onValueChange = vi.fn();
        const onOpenChange = vi.fn();
        render(
          <form>
            <Fixture
              rootProps={{
                items,
                [prop]: true,
                defaultOpen: true,
                defaultValue: "banana-id",
                required: true,
                name: "fruit",
                onValueChange,
                onOpenChange,
              }}
            />
          </form>,
        );
        expect(getInput()[prop]).toBe(true);
        expect(getList()).toBeNull();
        expect(getInput().getAttribute("aria-expanded")).toBe("false");
        expect(getFormValues()).toEqual(prop === "disabled" ? [] : ["banana-id"]);
        await expect.element(page.getByRole("button", { name: "목록 열기" })).toBeDisabled();
        await expect.element(page.getByRole("button", { name: "선택 모두 지우기" })).toBeDisabled();
        if (prop === "readOnly") {
          expect(getSelect().required).toBe(false);
          await page.getByRole("combobox").click();
          await userEvent.keyboard("{ArrowDown}{ArrowUp}");
        }
        expect(onValueChange).not.toHaveBeenCalled();
        expect(onOpenChange).not.toHaveBeenCalled();
      },
    );

    it("Field와 Coral Fieldset의 disabled를 Input과 HiddenSelect에 상속한다", () => {
      const view = render(
        <Field.Root disabled>
          <Fixture rootProps={{ items, defaultOpen: true }} />
        </Field.Root>,
      );
      expect(getInput().disabled).toBe(true);
      expect(getSelect().disabled).toBe(true);
      view.rerender(
        <Fieldset.Root disabled>
          <Fieldset.Legend>과일</Fieldset.Legend>
          <Fixture rootProps={{ items, defaultOpen: true }} />
        </Fieldset.Root>,
      );
      expect(getInput().disabled).toBe(true);
      expect(getSelect().disabled).toBe(true);
      expect(getList()).toBeNull();
    });

    it("네이티브 fieldset의 disabled 상태에서도 열기 요청을 무시한다", async () => {
      const onOpenChange = vi.fn();
      render(
        <fieldset disabled>
          <legend>과일</legend>
          <Fixture rootProps={{ items, onOpenChange }} />
        </fieldset>,
      );
      expect(getInput().matches(":disabled")).toBe(true);
      await page.getByRole("combobox").click({ force: true });
      expect(onOpenChange).not.toHaveBeenCalled();
      expect(getList()).toBeNull();
    });
  });

  describe("합성과 마운트", () => {
    it("모든 Part의 render·Ref와 사용자 이벤트를 실제 요소에 합성한다", async () => {
      const rootRef = createRef<HTMLDivElement>();
      const inputRef = createRef<HTMLInputElement>();
      const selectRef = createRef<HTMLSelectElement>();
      const valueRef = createRef<HTMLSpanElement>();
      const triggerRef = createRef<HTMLButtonElement>();
      const clearRef = createRef<HTMLButtonElement>();
      const portalRef = createRef<HTMLDivElement>();
      const positionerRef = createRef<HTMLDivElement>();
      const listRef = createRef<HTMLDivElement>();
      const itemRef = createRef<HTMLDivElement>();
      const indicatorRef = createRef<HTMLSpanElement>();
      const calls: string[] = [];
      render(
        <Combobox.Root
          items={items}
          multiple
          defaultValue={["apple-id"]}
          render={<CustomDiv ref={rootRef} />}
        >
          <Combobox.Input
            aria-label="과일"
            render={<CustomInput ref={inputRef} onClick={() => calls.push("render")} />}
            onClick={() => calls.push("part")}
          />
          <Combobox.Value render={<span ref={valueRef} />} />
          <Combobox.Trigger aria-label="목록 열기" render={<button ref={triggerRef} />} />
          <Combobox.Clear aria-label="선택 모두 지우기" render={<button ref={clearRef} />} />
          <Combobox.Portal render={<CustomDiv ref={portalRef} />}>
            <Combobox.Positioner render={<CustomDiv ref={positionerRef} />}>
              <Combobox.List aria-label="과일 목록" render={<CustomDiv ref={listRef} />}>
                <Combobox.Item value="apple-id" render={<CustomDiv ref={itemRef} />}>
                  Apple
                  <Combobox.ItemIndicator render={<span ref={indicatorRef} />}>
                    ✓
                  </Combobox.ItemIndicator>
                </Combobox.Item>
              </Combobox.List>
            </Combobox.Positioner>
          </Combobox.Portal>
          <Combobox.HiddenSelect render={<CustomSelect ref={selectRef} />} />
        </Combobox.Root>,
      );
      await openCombobox();
      expect(calls).toEqual(["render", "part"]);
      for (const ref of [
        rootRef,
        inputRef,
        selectRef,
        valueRef,
        triggerRef,
        clearRef,
        portalRef,
        positionerRef,
        listRef,
        itemRef,
        indicatorRef,
      ])
        expect(ref.current?.isConnected).toBe(true);
      expect(inputRef.current?.hasAttribute("data-custom")).toBe(true);
      expect(selectRef.current?.tagName).toBe("SELECT");
      expect(indicatorRef.current?.getAttribute("aria-hidden")).toBe("true");
      await userEvent.keyboard("{ArrowDown}{Enter}");
      expect(indicatorRef.current).toBeNull();
      expect(valueRef.current?.hasAttribute("data-empty")).toBe(true);
      expect(listRef.current?.getAttribute("aria-multiselectable")).toBe("true");
    });

    it("Portal 없이도 Input을 기준으로 팝업을 배치한다", async () => {
      const { container } = render(<Fixture portal={false} />);
      await openCombobox();
      const positioner = document.querySelector<HTMLElement>("[data-positioner]")!;
      expect(container.contains(positioner)).toBe(true);
      expect(positioner.getAttribute("popover")).toBe("manual");
      await vi.waitFor(() =>
        expect(positioner.style.getPropertyValue("--anchor-width")).toBe(
          `${getInput().getBoundingClientRect().width}px`,
        ),
      );
      expect(positioner.dataset.align).toBe("start");
    });

    it("StrictMode hydration 후 초기 선택과 ID 관계를 유지한다", async () => {
      const element = (
        <StrictMode>
          <Fixture rootProps={{ items, multiple: true, defaultValue: ["banana-id"] }} />
        </StrictMode>
      );
      const container = document.createElement("div");
      container.innerHTML = renderToString(element);
      document.body.append(container);
      const onRecoverableError = vi.fn();
      const root = hydrateRoot(container, element, { onRecoverableError });
      fixtures.push({ container, root });
      await openCombobox();
      expect(getSelected()).toEqual(["banana-id"]);
      expect(getInput().getAttribute("aria-controls")).toBe(getList()!.id);
      expect(onRecoverableError).not.toHaveBeenCalled();
    });
  });
});

import axe from "axe-core";
import {
  createRef,
  StrictMode,
  useEffect,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";
import { createRoot, hydrateRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import { Autocomplete, type AutocompleteInputProps, type AutocompleteRootProps } from ".";
import { Autocomplete as RootExportAutocomplete } from "..";
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

interface TestItem {
  value: string;
  disabled?: boolean;
  hidden?: boolean;
}

const defaultItems: readonly TestItem[] = [
  { value: "Apple" },
  { value: "Apricot", disabled: true },
  { value: "Banana" },
  { value: "Cherry" },
];

interface FixtureProps {
  rootProps?: AutocompleteRootProps;
  inputProps?: AutocompleteInputProps;
  items?: readonly TestItem[];
  portal?: boolean;
}

function Fixture({
  rootProps = {},
  inputProps = {},
  items = defaultItems,
  portal = true,
}: FixtureProps) {
  // Geometry supports pointer hit testing and placement checks, not product appearance.
  const popup = (
    <Autocomplete.Positioner data-positioner="" sideOffset={4}>
      <Autocomplete.List aria-label="추천 과일" style={{ width: 200, background: "white" }}>
        {items.map((item) => (
          <Autocomplete.Item key={item.value} {...item} style={{ padding: 8 }}>
            {item.value}
          </Autocomplete.Item>
        ))}
      </Autocomplete.List>
    </Autocomplete.Positioner>
  );
  return (
    <>
      <button data-before="">이전</button>
      <Autocomplete.Root data-root="" {...rootProps}>
        <Autocomplete.Input aria-label="과일" {...inputProps} />
        {portal ? <Autocomplete.Portal data-portal="">{popup}</Autocomplete.Portal> : popup}
      </Autocomplete.Root>
      <button data-after="" style={{ display: "block", marginTop: 240 }}>
        다음
      </button>
    </>
  );
}

const getInput = () => document.querySelector<HTMLInputElement>('[role="combobox"]')!;
const getList = () => document.querySelector<HTMLElement>('[role="listbox"]');
const getItems = () => [...document.querySelectorAll<HTMLElement>('[role="option"]')];
const getPositioner = () => document.querySelector<HTMLElement>("[data-positioner]")!;
const getActiveItem = () =>
  document.getElementById(getInput().getAttribute("aria-activedescendant") ?? "");

async function openAutocomplete() {
  await page.getByRole("combobox").click();
  await vi.waitFor(() => expect(getPositioner().matches(":popover-open")).toBe(true));
}

function CustomContainer(props: ComponentProps<"div">) {
  return <div {...props} data-custom="" />;
}

function CustomInput(props: ComponentProps<"input">) {
  return <input {...props} data-custom="" />;
}

// Native text editing, constraint validation and form algorithms belong to the browser.
// Tests cover Coral's composition and state coordination with those native behaviors.
// Matching policies and network requests are separate from keyboard/ARIA contracts.
describe("Autocomplete", () => {
  describe("구조와 접근성", () => {
    it("루트 export와 닫힌 상태의 역할, 이름과 조건부 ARIA 속성을 제공한다", async () => {
      expect(RootExportAutocomplete).toBe(Autocomplete);
      render(<Fixture />);
      const input = getInput();
      expect(input.tagName).toBe("INPUT");
      expect(input.type).toBe("text");
      expect(input.getAttribute("aria-autocomplete")).toBe("list");
      expect(input.getAttribute("aria-haspopup")).toBe("listbox");
      expect(input.getAttribute("aria-expanded")).toBe("false");
      expect(input.hasAttribute("aria-controls")).toBe(false);
      expect(input.hasAttribute("aria-activedescendant")).toBe(false);
      expect(getList()).toBeNull();
      await expect.element(input).toHaveAccessibleName("과일");
    });

    it("열린 목록과 항목을 연결하고 기본 구성을 접근 가능하게 렌더링한다", async () => {
      const { container } = render(<Fixture />);
      await openAutocomplete();
      const input = getInput();
      const list = getList()!;
      expect(input.getAttribute("aria-expanded")).toBe("true");
      expect(input.getAttribute("aria-controls")).toBe(list.id);
      expect(input.hasAttribute("aria-activedescendant")).toBe(false);
      expect(container.contains(list)).toBe(false);
      expect(getPositioner().getAttribute("popover")).toBe("manual");
      expect(document.activeElement).toBe(input);
      await expect.element(list).toHaveAccessibleName("추천 과일");
      for (const item of getItems()) {
        expect(item.tabIndex).toBe(-1);
        expect(item.getAttribute("aria-selected")).toBe("false");
      }
      expect(getItems()[0]!.hasAttribute("aria-disabled")).toBe(false);
      expect(getItems()[1]!.getAttribute("aria-disabled")).toBe("true");
      for (const element of [container.querySelector("[data-root]")!, getPositioner(), list]) {
        expect(element.hasAttribute("data-open")).toBe(true);
      }
      expect(
        (await axe.run(document.body, { rules: { region: { enabled: false } } })).violations,
      ).toEqual([]);
    });

    it("탐색 중 하나의 항목만 선택 상태로 연결하고 닫으면 참조를 제거한다", async () => {
      render(<Fixture />);
      await openAutocomplete();
      await userEvent.keyboard("{ArrowDown}");
      const active = getActiveItem()!;
      expect(active.textContent).toBe("Apple");
      expect(active.getAttribute("aria-selected")).toBe("true");
      expect(active.hasAttribute("data-highlighted")).toBe(true);
      expect(getItems().filter((item) => item.getAttribute("aria-selected") === "true")).toEqual([
        active,
      ]);
      expect(getList()!.contains(active)).toBe(true);
      await userEvent.keyboard("{Escape}");
      expect(getInput().hasAttribute("aria-controls")).toBe(false);
      expect(getInput().hasAttribute("aria-activedescendant")).toBe(false);
      expect(getList()).toBeNull();
      expect(document.querySelector("[data-portal]")).toBeNull();
    });
  });

  describe("키보드와 포커스", () => {
    it("Tab으로 진입해 추천을 탐색하고 Enter로 선택해도 입력에 포커스를 유지한다", async () => {
      const onValueChange = vi.fn();
      render(<Fixture rootProps={{ onValueChange }} />);
      await userEvent.keyboard("{Tab}{Tab}");
      expect(document.activeElement).toBe(getInput());
      expect(getList()).toBeNull();
      await userEvent.keyboard("{ArrowDown}");
      await vi.waitFor(() => expect(getActiveItem()?.textContent).toBe("Apple"));
      await userEvent.keyboard("{ArrowDown}");
      expect(getActiveItem()?.textContent).toBe("Banana");
      expect(getInput().value).toBe("");
      expect(onValueChange).not.toHaveBeenCalled();
      expect(document.activeElement).toBe(getInput());
      await userEvent.keyboard("{Enter}");
      expect(getInput().value).toBe("Banana");
      expect(getInput().selectionStart).toBe(6);
      expect(getInput().selectionEnd).toBe(6);
      expect(getList()).toBeNull();
      expect(document.activeElement).toBe(getInput());
      expect(onValueChange).toHaveBeenCalledExactlyOnceWith(
        "Banana",
        expect.objectContaining({ reason: "item-press", event: expect.any(KeyboardEvent) }),
      );
    });

    it("ArrowUp으로 마지막 항목에서 시작하고 양 끝에서 순환하지 않는다", async () => {
      render(<Fixture />);
      await userEvent.keyboard("{Tab}{Tab}{ArrowUp}");
      await vi.waitFor(() => expect(getActiveItem()?.textContent).toBe("Cherry"));
      await userEvent.keyboard("{ArrowDown}");
      expect(getActiveItem()?.textContent).toBe("Cherry");
      await userEvent.keyboard("{ArrowUp}{ArrowUp}{ArrowUp}");
      expect(getActiveItem()?.textContent).toBe("Apple");
    });

    it("숨겨진 항목과 비활성 항목은 탐색에서 제외한다", async () => {
      render(
        <Fixture
          items={[
            { value: "Apple", disabled: true },
            { value: "Apricot", hidden: true },
            { value: "Banana" },
          ]}
        />,
      );
      await openAutocomplete();
      await userEvent.keyboard("{ArrowDown}{ArrowDown}");
      expect(getActiveItem()?.textContent).toBe("Banana");
      await userEvent.keyboard("{ArrowUp}");
      expect(getActiveItem()?.textContent).toBe("Banana");
    });

    it("키보드로 활성화한 항목이 목록 스크롤 영역 안에 보이게 한다", async () => {
      render(
        <Autocomplete.Root>
          <Autocomplete.Input aria-label="과일" />
          <Autocomplete.Positioner data-positioner="">
            <Autocomplete.List aria-label="추천 과일" style={{ height: 64, overflow: "auto" }}>
              {defaultItems.map(({ value }) => (
                <Autocomplete.Item key={value} value={value} style={{ height: 32 }}>
                  {value}
                </Autocomplete.Item>
              ))}
            </Autocomplete.List>
          </Autocomplete.Positioner>
        </Autocomplete.Root>,
      );
      await openAutocomplete();
      await userEvent.keyboard("{ArrowUp}");
      const item = getActiveItem()!;
      const list = getList()!;
      expect(item.textContent).toBe("Cherry");
      expect(list.scrollTop).toBeGreaterThan(0);
      expect(item.getBoundingClientRect().top).toBeGreaterThanOrEqual(
        list.getBoundingClientRect().top,
      );
      expect(item.getBoundingClientRect().bottom).toBeLessThanOrEqual(
        list.getBoundingClientRect().bottom,
      );
      expect(document.activeElement).toBe(getInput());
    });

    it("Escape는 추천을 확정하지 않고 자유 입력값을 유지한다", async () => {
      render(<Fixture />);
      await userEvent.fill(page.getByRole("combobox"), "Ap");
      await userEvent.keyboard("{ArrowDown}{Escape}");
      expect(getInput().value).toBe("Ap");
      expect(getList()).toBeNull();
      expect(document.activeElement).toBe(getInput());
      await userEvent.keyboard("{Escape}");
      expect(getInput().value).toBe("Ap");
    });

    it.each([
      { key: "{Tab}", target: "[data-after]" },
      { key: "{Shift>}{Tab}{/Shift}", target: "[data-before]" },
    ])("$key은 추천을 확정하지 않고 탭 순서로 이동한다", async ({ key, target }) => {
      render(<Fixture />);
      await openAutocomplete();
      await userEvent.keyboard(`{ArrowDown}${key}`);
      expect(document.activeElement).toBe(document.querySelector(target));
      expect(getInput().value).toBe("");
      expect(getList()).toBeNull();
    });

    it.each(["ArrowLeft", "ArrowRight", "Home", "End"])(
      "%s 키는 활성 항목을 해제하고 기본 텍스트 편집을 유지한다",
      async (key) => {
        render(<Fixture rootProps={{ defaultValue: "Ap" }} />);
        await openAutocomplete();
        await userEvent.keyboard("{ArrowDown}");
        expect(getActiveItem()).not.toBeNull();
        let prevented: boolean | undefined;
        function onKeyDown(event: KeyboardEvent) {
          prevented = event.defaultPrevented;
        }
        document.addEventListener("keydown", onKeyDown, { once: true });
        await userEvent.keyboard(`{${key}}`);
        expect(prevented).toBe(false);
        expect(getActiveItem()).toBeNull();
        expect(getInput().value).toBe("Ap");
        expect(document.activeElement).toBe(getInput());
        expect(getList()).not.toBeNull();
      },
    );

    it.each(["ArrowDown", "ArrowUp", "Enter", "Escape"])(
      "IME 조합 중 %s 키를 가로채지 않는다",
      async (key) => {
        render(<Fixture />);
        await openAutocomplete();
        await userEvent.keyboard("{ArrowDown}");
        const active = getActiveItem();
        // Playwright cannot generate an OS IME session; dispatch its composition flag.
        const event = new KeyboardEvent("keydown", {
          key,
          isComposing: true,
          bubbles: true,
          cancelable: true,
        });
        flushSync(() => getInput().dispatchEvent(event));
        expect(event.defaultPrevented).toBe(false);
        expect(getInput().value).toBe("");
        expect(getActiveItem()).toBe(active);
        expect(getList()).not.toBeNull();
      },
    );

    it("IME keyCode 229도 추천 선택으로 처리하지 않는다", async () => {
      render(<Fixture />);
      await openAutocomplete();
      await userEvent.keyboard("{ArrowDown}");
      const event = new KeyboardEvent("keydown", {
        key: "Enter",
        keyCode: 229,
        bubbles: true,
        cancelable: true,
      });
      flushSync(() => getInput().dispatchEvent(event));
      expect(event.defaultPrevented).toBe(false);
      expect(getInput().value).toBe("");
      expect(getList()).not.toBeNull();
    });

    it("텍스트를 변경하면 기존 활성 항목을 해제한다", async () => {
      render(<Fixture />);
      await openAutocomplete();
      await userEvent.keyboard("{ArrowDown}");
      await userEvent.keyboard("a");
      expect(getInput().value).toBe("a");
      expect(getInput().hasAttribute("aria-activedescendant")).toBe(false);
      expect(getList()).not.toBeNull();
    });

    it("빈 목록에서는 방향키로 활성 항목을 만들지 않는다", async () => {
      render(<Fixture items={[]} />);
      await userEvent.keyboard("{Tab}{Tab}{ArrowDown}{ArrowUp}");
      expect(getInput().hasAttribute("aria-activedescendant")).toBe(false);
      expect(getList()).not.toBeNull();
      await userEvent.keyboard("{Escape}");
      expect(getList()).toBeNull();
    });
  });

  describe("포인터와 외부 상호작용", () => {
    it("포인터로 가리킨 항목을 활성화하고 입력값과 포커스를 유지한다", async () => {
      render(<Fixture />);
      await openAutocomplete();
      await userEvent.hover(page.getByRole("option", { name: "Banana" }));
      expect(getActiveItem()?.textContent).toBe("Banana");
      expect(getInput().value).toBe("");
      expect(document.activeElement).toBe(getInput());
      await userEvent.hover(page.getByRole("option", { name: "Apricot" }));
      expect(getActiveItem()?.textContent).toBe("Banana");
    });

    it("항목을 클릭해 값을 채우고 입력의 포커스와 커서를 유지한다", async () => {
      render(<Fixture />);
      await openAutocomplete();
      await userEvent.click(getItems()[2]!);
      expect(getInput().value).toBe("Banana");
      expect(getList()).toBeNull();
      expect(document.activeElement).toBe(getInput());
      expect(getInput().selectionStart).toBe(6);
    });

    it("비활성 항목을 눌러도 선택하지 않는다", async () => {
      const onValueChange = vi.fn();
      render(<Fixture rootProps={{ onValueChange }} />);
      await openAutocomplete();
      // aria-disabled makes Playwright refuse a regular click; force tests Coral's guard.
      await page.getByRole("option", { name: "Apricot" }).click({ force: true });
      expect(onValueChange).not.toHaveBeenCalled();
      expect(getInput().value).toBe("");
      expect(getList()).not.toBeNull();
      expect(document.activeElement).toBe(getInput());
    });

    it("외부 버튼을 클릭하면 닫고 목적지 포커스를 유지한다", async () => {
      render(<Fixture />);
      await openAutocomplete();
      const after = document.querySelector<HTMLButtonElement>("[data-after]")!;
      await userEvent.click(after);
      expect(getList()).toBeNull();
      expect(document.activeElement).toBe(after);
    });

    it("포커스를 받지 않는 외부 영역의 클릭도 닫기 요청을 전달한다", async () => {
      const onOpenChange = vi.fn();
      const { container } = render(<Fixture rootProps={{ defaultOpen: true, onOpenChange }} />);
      const outside = document.createElement("div");
      outside.textContent = "외부 영역";
      outside.style.marginTop = "240px";
      container.append(outside);
      await userEvent.click(outside);
      expect(getList()).toBeNull();
      expect(onOpenChange).toHaveBeenLastCalledWith(
        false,
        expect.objectContaining({ reason: "outside-press", event: expect.any(MouseEvent) }),
      );
    });
  });

  describe("상태와 변경 취소", () => {
    it("제어 부모가 입력값과 열림 변경을 반영한다", async () => {
      const onValueChange = vi.fn();
      const onOpenChange = vi.fn();
      function ControlledFixture() {
        const [value, setValue] = useState("");
        const [open, setOpen] = useState(false);
        return (
          <Fixture
            rootProps={{
              value,
              open,
              onValueChange(next, details) {
                onValueChange(next, details.reason);
                setValue(next);
              },
              onOpenChange(next, details) {
                onOpenChange(next, details.reason);
                setOpen(next);
              },
            }}
          />
        );
      }
      render(<ControlledFixture />);
      await userEvent.fill(page.getByRole("combobox"), "Ban");
      expect(getInput().value).toBe("Ban");
      expect(getList()).not.toBeNull();
      await userEvent.keyboard("{ArrowDown}{Enter}");
      expect(getInput().value).toBe("Banana");
      expect(getList()).toBeNull();
      expect(onValueChange).toHaveBeenLastCalledWith("Banana", "item-press");
      expect(onOpenChange).toHaveBeenLastCalledWith(false, "item-press");
    });

    it("부모가 변경 요청을 반영하지 않으면 제어 값을 유지한다", async () => {
      const onValueChange = vi.fn();
      const onOpenChange = vi.fn();
      const view = render(
        <Fixture rootProps={{ value: "A", open: false, onValueChange, onOpenChange }} />,
      );
      await userEvent.fill(page.getByRole("combobox"), "B");
      expect(onValueChange).toHaveBeenLastCalledWith(
        "B",
        expect.objectContaining({ reason: "input-change" }),
      );
      expect(onOpenChange).toHaveBeenLastCalledWith(
        true,
        expect.objectContaining({ reason: "input-change" }),
      );
      expect(getInput().value).toBe("A");
      expect(getList()).toBeNull();
      view.rerender(<Fixture rootProps={{ value: "B", open: true }} />);
      expect(getInput().value).toBe("B");
      expect(getList()).not.toBeNull();
    });

    it("입력과 추천 선택의 값 변경을 취소할 수 있다", async () => {
      const onValueChange = vi.fn((_value, details) => details.cancel());
      render(<Fixture rootProps={{ onValueChange }} />);
      await userEvent.fill(page.getByRole("combobox"), "A");
      expect(getInput().value).toBe("");
      expect(getList()).toBeNull();
      expect(onValueChange.mock.lastCall?.[1].isCanceled).toBe(true);
      await openAutocomplete();
      await userEvent.keyboard("{ArrowDown}{Enter}");
      expect(getInput().value).toBe("");
      expect(getList()).not.toBeNull();
      expect(onValueChange.mock.lastCall?.[1].reason).toBe("item-press");
    });

    it("열기 취소는 예약된 방향키 탐색도 취소한다", async () => {
      const view = render(
        <Fixture rootProps={{ onOpenChange: (_open, details) => details.cancel() }} />,
      );
      await userEvent.keyboard("{Tab}{Tab}{ArrowDown}");
      expect(getList()).toBeNull();
      view.rerender(<Fixture />);
      await openAutocomplete();
      expect(getInput().hasAttribute("aria-activedescendant")).toBe(false);
    });

    it("닫기를 취소하면 열린 상태와 입력 포커스를 유지한다", async () => {
      const onOpenChange = vi.fn((_open, details) => details.cancel());
      render(<Fixture rootProps={{ defaultOpen: true, onOpenChange }} />);
      await page.getByRole("combobox").click();
      await userEvent.keyboard("{Escape}");
      expect(getList()).not.toBeNull();
      expect(document.activeElement).toBe(getInput());
      expect(onOpenChange).toHaveBeenLastCalledWith(
        false,
        expect.objectContaining({ reason: "escape-key", isCanceled: true }),
      );
    });

    it("사용자의 preventDefault가 입력과 키보드의 내부 처리를 막는다", async () => {
      const onValueChange = vi.fn();
      render(
        <Fixture
          rootProps={{ onValueChange }}
          inputProps={{
            onClick: (event) => event.preventDefault(),
            onKeyDown: (event) => event.preventDefault(),
            onChange: (event) => event.preventDefault(),
          }}
        />,
      );
      await page.getByRole("combobox").click();
      await userEvent.keyboard("{ArrowDown}");
      expect(getList()).toBeNull();
      await userEvent.fill(page.getByRole("combobox"), "A");
      expect(getInput().value).toBe("");
      expect(onValueChange).not.toHaveBeenCalled();
    });

    it.each(["disabled", "readOnly"] as const)(
      "%s를 입력에 전달하고 기본 열린 상태를 숨긴다",
      (prop) => {
        const { container } = render(
          <Fixture rootProps={{ [prop]: true, defaultOpen: true, defaultValue: "Apple" }} />,
        );
        expect(getInput()[prop]).toBe(true);
        expect(getInput().value).toBe("Apple");
        expect(getInput().getAttribute("aria-expanded")).toBe("false");
        expect(getList()).toBeNull();
        expect(
          container
            .querySelector("[data-root]")!
            .hasAttribute(prop === "readOnly" ? "data-readonly" : "data-disabled"),
        ).toBe(true);
      },
    );

    it("읽기 전용 입력에서 방향키와 클릭으로 열지 않는다", async () => {
      const onOpenChange = vi.fn();
      render(<Fixture rootProps={{ readOnly: true, onOpenChange }} />);
      await page.getByRole("combobox").click();
      await userEvent.keyboard("{ArrowDown}{ArrowUp}");
      expect(getList()).toBeNull();
      expect(onOpenChange).not.toHaveBeenCalled();
    });
  });

  describe("동적 목록", () => {
    it("비동기로 도착한 항목을 입력 포커스와 열린 상태를 유지하며 탐색한다", async () => {
      let resolveItems!: (items: readonly TestItem[]) => void;
      const response = new Promise<readonly TestItem[]>((resolve) => {
        resolveItems = resolve;
      });
      function AsyncFixture() {
        const [items, setItems] = useState<readonly TestItem[]>([]);
        useEffect(() => {
          void response.then(setItems);
        }, []);
        return <Fixture items={items} />;
      }
      render(<AsyncFixture />);
      await openAutocomplete();
      await userEvent.keyboard("{ArrowDown}");
      expect(getItems()).toHaveLength(0);
      expect(getActiveItem()).toBeNull();
      resolveItems(defaultItems);
      await vi.waitFor(() => expect(getItems()).toHaveLength(4));
      expect(document.activeElement).toBe(getInput());
      expect(getInput().getAttribute("aria-expanded")).toBe("true");
      await userEvent.keyboard("{ArrowDown}{Enter}");
      expect(getInput().value).toBe("Apple");
      expect(getList()).toBeNull();
    });

    it.each(["remove", "disable", "hide"] as const)(
      "활성 항목의 %s 변경 후 잘못된 ARIA 참조를 제거한다",
      async (change) => {
        const view = render(<Fixture />);
        await openAutocomplete();
        await userEvent.keyboard("{ArrowDown}");
        expect(getActiveItem()?.textContent).toBe("Apple");
        const items =
          change === "remove"
            ? defaultItems.slice(1)
            : defaultItems.map((item) =>
                item.value === "Apple"
                  ? { ...item, disabled: change === "disable", hidden: change === "hide" }
                  : item,
              );
        view.rerender(<Fixture items={items} />);
        await vi.waitFor(() =>
          expect(getInput().hasAttribute("aria-activedescendant")).toBe(false),
        );
        expect(document.activeElement).toBe(getInput());
        await userEvent.keyboard("{ArrowDown}");
        expect(getActiveItem()?.textContent).toBe("Banana");
      },
    );

    it("부모가 입력값을 갱신하면 기존 활성 항목을 해제한다", async () => {
      const view = render(<Fixture rootProps={{ value: "", open: true }} />);
      await page.getByRole("combobox").click();
      await userEvent.keyboard("{ArrowDown}");
      expect(getActiveItem()).not.toBeNull();
      view.rerender(<Fixture rootProps={{ value: "Ban", open: true }} />);
      expect(getInput().hasAttribute("aria-activedescendant")).toBe(false);
    });
  });

  describe("Field와 Form", () => {
    it("Field의 이름과 설명, 폼 값과 추천 선택 검증을 연결한다", async () => {
      const validate = vi.fn(() => null);
      const { container } = render(
        <form>
          <Field.Root name="fruit" validate={validate} validationMode="onChange">
            <Field.Label>과일 이름</Field.Label>
            <Field.Description>원하는 과일을 입력합니다.</Field.Description>
            <Fixture inputProps={{ "aria-label": undefined, required: true }} />
          </Field.Root>
        </form>,
      );
      await expect.element(getInput()).toHaveAccessibleName("과일 이름");
      await expect.element(getInput()).toHaveAccessibleDescription("원하는 과일을 입력합니다.");
      await openAutocomplete();
      await userEvent.keyboard("{ArrowDown}{Enter}");
      expect(new FormData(getInput().form!).get("fruit")).toBe("Apple");
      expect(getInput().required).toBe(true);
      expect(getInput().validity.valid).toBe(true);
      expect(container.querySelector("[data-dirty]")).not.toBeNull();
      expect(validate).toHaveBeenLastCalledWith("Apple", expect.anything());
    });

    it("제어 부모가 반영한 최종 추천 값으로 Field 검증을 실행한다", async () => {
      const validate = vi.fn(() => null);
      function ControlledField() {
        const [value, setValue] = useState("");
        return (
          <Field.Root validate={validate} validationMode="onChange">
            <Fixture rootProps={{ value, onValueChange: setValue }} />
          </Field.Root>
        );
      }
      render(<ControlledField />);
      await openAutocomplete();
      await userEvent.keyboard("{ArrowDown}{ArrowDown}{Enter}");
      expect(getInput().value).toBe("Banana");
      expect(validate).toHaveBeenLastCalledWith("Banana", expect.anything());
      expect(getInput().selectionStart).toBe(6);
    });

    it("Field와 Fieldset의 disabled를 상속한다", () => {
      const view = render(
        <Field.Root disabled>
          <Fixture rootProps={{ defaultOpen: true }} />
        </Field.Root>,
      );
      expect(getInput().disabled).toBe(true);
      expect(getList()).toBeNull();
      view.rerender(
        <Fieldset.Root disabled>
          <Fieldset.Legend>과일</Fieldset.Legend>
          <Fixture rootProps={{ defaultOpen: true }} />
        </Fieldset.Root>,
      );
      expect(getInput().disabled).toBe(true);
      expect(getList()).toBeNull();
    });

    it("외부 폼의 reset은 비제어 값을 기본값으로 복원한다", async () => {
      const onValueChange = vi.fn();
      render(
        <>
          <form id="fruit-form">
            <button type="reset">초기화</button>
          </form>
          <Fixture
            rootProps={{ defaultValue: "A", onValueChange }}
            inputProps={{ name: "fruit", form: "fruit-form" }}
          />
        </>,
      );
      await userEvent.fill(page.getByRole("combobox"), "B");
      onValueChange.mockClear();
      await userEvent.click(page.getByRole("button", { name: "초기화" }));
      await vi.waitFor(() => expect(getInput().value).toBe("A"));
      expect(new FormData(getInput().form!).get("fruit")).toBe("A");
      expect(getList()).toBeNull();
      expect(onValueChange).not.toHaveBeenCalled();
    });

    it("폼 reset은 제어 값을 유지한다", async () => {
      render(
        <form>
          <button type="reset">초기화</button>
          <Fixture rootProps={{ value: "Cherry", defaultValue: "A" }} />
        </form>,
      );
      await userEvent.click(page.getByRole("button", { name: "초기화" }));
      await vi.waitFor(() => expect(getInput().value).toBe("Cherry"));
    });

    it("폼 reset 취소는 입력값을 유지한다", async () => {
      render(
        <form onReset={(event) => event.preventDefault()}>
          <button type="reset">초기화</button>
          <Fixture rootProps={{ defaultValue: "A" }} />
        </form>,
      );
      await userEvent.fill(page.getByRole("combobox"), "B");
      await userEvent.click(page.getByRole("button", { name: "초기화" }));
      // Coral processes reset after the browser's native reset default action.
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(getInput().value).toBe("B");
    });

    it("Enter로 추천을 선택할 때는 제출하지 않고 활성 항목이 없으면 제출을 유지한다", async () => {
      const submit = vi.fn();
      render(
        <form
          onSubmit={(event) => {
            event.preventDefault();
            submit();
          }}
        >
          <Fixture />
          <button type="submit">제출</button>
        </form>,
      );
      await openAutocomplete();
      await userEvent.keyboard("{ArrowDown}{Enter}");
      expect(getInput().value).toBe("Apple");
      expect(submit).not.toHaveBeenCalled();
      await userEvent.fill(page.getByRole("combobox"), "직접 입력");
      await userEvent.keyboard("{Enter}");
      expect(submit).toHaveBeenCalledOnce();
    });
  });

  describe("배치와 합성", () => {
    it("Portal 없이도 입력 기준으로 배치하고 크기 변수를 제공한다", async () => {
      const { container } = render(<Fixture portal={false} />);
      await openAutocomplete();
      expect(container.contains(getList())).toBe(true);
      await vi.waitFor(() => {
        const anchor = getInput().getBoundingClientRect();
        expect(getPositioner().getBoundingClientRect().top).toBeCloseTo(anchor.bottom + 4, 0);
        expect(getPositioner().style.getPropertyValue("--anchor-width")).toBe(`${anchor.width}px`);
        expect(getPositioner().style.getPropertyValue("--anchor-height")).toBe(
          `${anchor.height}px`,
        );
        expect(
          parseFloat(getPositioner().style.getPropertyValue("--available-height")),
        ).toBeGreaterThan(0);
      });
    });

    it("아래 공간이 부족하면 위로 배치를 보정한다", async () => {
      render(<Fixture rootProps={{ style: { position: "fixed", bottom: 8, left: 8 } }} />);
      await openAutocomplete();
      await vi.waitFor(() => {
        expect(getPositioner().dataset.side).toBe("top");
        expect(getPositioner().getBoundingClientRect().bottom).toBeCloseTo(
          getInput().getBoundingClientRect().top - 4,
          0,
        );
      });
    });

    it("입력 크기가 바뀌면 배치 기준 크기도 갱신한다", async () => {
      const view = render(<Fixture inputProps={{ style: { width: 160 } }} />);
      await openAutocomplete();
      await vi.waitFor(() =>
        expect(parseFloat(getPositioner().style.getPropertyValue("--anchor-width"))).toBeCloseTo(
          getInput().getBoundingClientRect().width,
        ),
      );
      view.rerender(<Fixture inputProps={{ style: { width: 240 } }} />);
      await vi.waitFor(() =>
        expect(parseFloat(getPositioner().style.getPropertyValue("--anchor-width"))).toBeCloseTo(
          getInput().getBoundingClientRect().width,
        ),
      );
    });

    it("모든 Part의 사용자 컴포넌트와 Ref를 합성한다", async () => {
      const rootRef = createRef<HTMLDivElement>();
      const inputRef = createRef<HTMLInputElement>();
      const renderInputRef = createRef<HTMLInputElement>();
      const portalRef = createRef<HTMLDivElement>();
      const positionerRef = createRef<HTMLDivElement>();
      const listRef = createRef<HTMLDivElement>();
      const itemRef = createRef<HTMLDivElement>();
      render(
        <Autocomplete.Root ref={rootRef} render={<CustomContainer />}>
          <Autocomplete.Input
            aria-label="과일"
            ref={inputRef}
            render={<CustomInput ref={renderInputRef} />}
          />
          <Autocomplete.Portal ref={portalRef} render={<CustomContainer />}>
            <Autocomplete.Positioner
              data-positioner=""
              ref={positionerRef}
              render={<CustomContainer />}
            >
              <Autocomplete.List aria-label="추천 과일" ref={listRef} render={<CustomContainer />}>
                <Autocomplete.Item ref={itemRef} value="Apple" render={<CustomContainer />}>
                  Apple
                </Autocomplete.Item>
              </Autocomplete.List>
            </Autocomplete.Positioner>
          </Autocomplete.Portal>
        </Autocomplete.Root>,
      );
      await openAutocomplete();
      for (const ref of [
        rootRef,
        inputRef,
        renderInputRef,
        portalRef,
        positionerRef,
        listRef,
        itemRef,
      ]) {
        expect(ref.current).toBeInstanceOf(HTMLElement);
        expect(ref.current!.hasAttribute("data-custom")).toBe(true);
      }
      expect(inputRef.current).toBe(getInput());
      expect(renderInputRef.current).toBe(getInput());
      expect(positionerRef.current).toBe(getPositioner());
      expect(listRef.current).toBe(getList());
      await userEvent.keyboard("{ArrowDown}{Enter}");
      expect(inputRef.current!.value).toBe("Apple");
      expect(portalRef.current).toBeNull();
      expect(positionerRef.current).toBeNull();
      expect(itemRef.current).toBeNull();
    });

    it("대체 목록 요소와 사용자 이벤트 취소를 유지한다", async () => {
      const view = render(
        <Fixture
          inputProps={{ render: <CustomInput onKeyDown={(event) => event.preventDefault()} /> }}
        />,
      );
      await openAutocomplete();
      await userEvent.keyboard("{ArrowDown}");
      expect(getActiveItem()).toBeNull();
      view.rerender(
        <Autocomplete.Root>
          <Autocomplete.Input aria-label="과일" />
          <Autocomplete.Positioner data-positioner="">
            <Autocomplete.List aria-label="추천 과일" render={<ul />}>
              <Autocomplete.Item value="Apple" render={<li id="apple-option" />}>
                Apple
              </Autocomplete.Item>
            </Autocomplete.List>
          </Autocomplete.Positioner>
        </Autocomplete.Root>,
      );
      await openAutocomplete();
      await userEvent.keyboard("{ArrowDown}");
      expect(getList()!.tagName).toBe("UL");
      expect(getActiveItem()!.tagName).toBe("LI");
      expect(getInput().getAttribute("aria-activedescendant")).toBe("apple-option");
      await userEvent.keyboard("{Enter}");
      expect(getInput().value).toBe("Apple");
    });

    it("StrictMode로 서버 HTML을 hydrate해도 ID와 키보드 동작을 유지한다", async () => {
      const children = (
        <StrictMode>
          <Fixture portal={false} rootProps={{ defaultOpen: true }} />
        </StrictMode>
      );
      const container = document.createElement("div");
      container.innerHTML = renderToString(children);
      document.body.append(container);
      const listId = container.querySelector('[role="listbox"]')!.id;
      const onRecoverableError = vi.fn();
      const root = hydrateRoot(container, children, { onRecoverableError });
      fixtures.push({ container, root });
      await vi.waitFor(() => expect(getPositioner().matches(":popover-open")).toBe(true));
      expect(getList()!.id).toBe(listId);
      expect(getInput().getAttribute("aria-controls")).toBe(listId);
      expect(onRecoverableError).not.toHaveBeenCalled();
      await page.getByRole("combobox").click();
      await userEvent.keyboard("{ArrowDown}{Enter}");
      expect(getInput().value).toBe("Apple");
    });
  });
});

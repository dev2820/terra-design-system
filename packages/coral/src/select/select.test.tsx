import axe from "axe-core";
import { createRef, StrictMode, useState, type ComponentProps, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { createRoot, hydrateRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import {
  Select,
  type SelectItem,
  type SelectItemProps,
  type SelectRootProps,
  type SelectTriggerProps,
} from ".";
import { Select as RootExportSelect } from "..";
import { Field } from "../field";
import { Fieldset } from "../fieldset";

const fixtures: Array<{ root: Root; container: HTMLDivElement }> = [];
afterEach(() => {
  for (const { root, container } of fixtures.splice(0).toReversed()) {
    flushSync(() => root.unmount());
    container.remove();
  }
});
function render(children: ReactNode) {
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  fixtures.push({ root, container });
  flushSync(() => root.render(children));
  return { container, rerender: (next: ReactNode) => flushSync(() => root.render(next)) };
}

const items: readonly SelectItem[] = [
  { value: "apple", label: "Apple" },
  { value: "apricot", label: "Apricot", disabled: true },
  { value: "banana", label: "Banana" },
  { value: "blackberry", label: "Blackberry" },
  { value: "cherry", label: "Cherry" },
];
interface FixtureProps {
  rootProps?: SelectRootProps;
  triggerProps?: SelectTriggerProps;
  itemProps?: Omit<SelectItemProps, "value">;
  hidden?: string[];
  portal?: boolean;
}
function Fixture({ rootProps, triggerProps, itemProps, hidden = [], portal = true }: FixtureProps) {
  const options = rootProps?.items ?? items;
  // Geometry only supports pointer hit testing. Fixture buttons opt into macOS WebKit keyboard navigation.
  const popup = (
    <Select.Positioner data-positioner="" sideOffset={4}>
      <Select.List aria-label="선택 가능한 과일" style={{ width: 200, background: "white" }}>
        {options.map((item) => (
          <Select.Item
            key={item.value}
            value={item.value}
            hidden={hidden.includes(item.value)}
            style={{ padding: 8 }}
            {...itemProps}
          >
            <Select.ItemIndicator data-indicator="">✓</Select.ItemIndicator>
            {item.label}
          </Select.Item>
        ))}
      </Select.List>
    </Select.Positioner>
  );
  return (
    <>
      <button tabIndex={0} data-before="">
        이전
      </button>
      <Select.Root items={items} {...rootProps} data-root="">
        <Select.Trigger aria-label="과일" data-trigger="" {...triggerProps}>
          <Select.Value placeholder="과일 선택" data-value="" />
        </Select.Trigger>
        {portal ? <Select.Portal data-portal="">{popup}</Select.Portal> : popup}
        <Select.HiddenSelect data-native-select="" />
      </Select.Root>
      <button tabIndex={0} data-after="" style={{ display: "block", marginTop: 280 }}>
        다음
      </button>
      <div data-outside="" style={{ width: 100, height: 32 }}>
        바깥
      </div>
    </>
  );
}
const getTrigger = () => document.querySelector<HTMLButtonElement>("[data-trigger]")!;
const getList = () => document.querySelector<HTMLElement>('[role="listbox"]');
const getSelect = () => document.querySelector<HTMLSelectElement>("[data-native-select]")!;
const getOptions = () => [...document.querySelectorAll<HTMLElement>('[role="option"]')];
const getActive = () =>
  document.getElementById(
    getTrigger().getAttribute("aria-activedescendant") ??
      getList()?.getAttribute("aria-activedescendant") ??
      "",
  );
const getSelected = () =>
  getOptions()
    .filter((option) => option.getAttribute("aria-selected") === "true")
    .map((option) => option.dataset.value);
const getValue = () => document.querySelector("[data-value]")!.textContent;
function Button(props: ComponentProps<"button">) {
  return <button {...props} data-custom="" />;
}
function GroupedFixture({ multiple = false }: { multiple?: boolean }) {
  return (
    <Select.Root items={items} multiple={multiple} name="fruit">
      <Select.Trigger aria-label="과일" data-trigger="">
        <Select.Value placeholder="과일 선택" data-value="" />
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner>
          <Select.List aria-label="선택 가능한 과일" style={{ width: 200 }}>
            {[items.slice(0, 3), items.slice(3)].map((group, index) => (
              <Select.Group key={index}>
                <Select.GroupLabel>{index === 0 ? "앞쪽 과일" : "뒤쪽 과일"}</Select.GroupLabel>
                {group.map((item) => (
                  <Select.Item key={item.value} value={item.value} style={{ padding: 8 }} />
                ))}
              </Select.Group>
            ))}
          </Select.List>
        </Select.Positioner>
      </Select.Portal>
      <Select.HiddenSelect data-native-select="" />
    </Select.Root>
  );
}
async function openSelect(target: HTMLElement = getTrigger()) {
  await userEvent.click(target);
  await vi.waitFor(() =>
    expect(getList()?.closest("[popover]")?.matches(":popover-open")).toBe(true),
  );
  await vi.waitFor(() => expect(getActive()).not.toBeNull());
}

// Native form algorithms belong to the browser. These tests verify Coral's value,
// popup, keyboard, focus, ARIA and Field coordination with the actual native select.
describe("Select", () => {
  describe("그룹", () => {
    it("그룹마다 고유한 라벨 ID와 접근 가능한 이름을 연결한다", async () => {
      render(<GroupedFixture />);
      await openSelect();
      const groups = [...getList()!.querySelectorAll<HTMLElement>('[role="group"]')];
      expect(groups).toHaveLength(2);
      expect(groups[0]!.getAttribute("aria-labelledby")).not.toBe(
        groups[1]!.getAttribute("aria-labelledby"),
      );
      for (const group of groups) {
        const label = document.getElementById(group.getAttribute("aria-labelledby")!);
        expect(group.contains(label)).toBe(true);
        expect(label?.tabIndex).toBe(-1);
      }
      await expect.element(groups[0]!).toHaveAccessibleName("앞쪽 과일");
      await expect.element(groups[1]!).toHaveAccessibleName("뒤쪽 과일");
      expect(
        (await axe.run(document.body, { rules: { region: { enabled: false } } })).violations,
      ).toEqual([]);
    });

    it.each([false, true])(
      "multiple=%s에서 그룹 제목을 건너뛰고 그룹 사이를 탐색·선택한다",
      async (multiple) => {
        render(
          <form>
            <GroupedFixture multiple={multiple} />
          </form>,
        );
        await openSelect();
        await userEvent.keyboard("{ArrowDown}");
        expect(getActive()?.dataset.value).toBe("banana");
        await userEvent.keyboard("{ArrowDown}");
        expect(getActive()?.dataset.value).toBe("blackberry");
        await userEvent.keyboard("{ArrowUp}");
        expect(getActive()?.dataset.value).toBe("banana");
        await userEvent.keyboard("{End}");
        expect(getActive()?.dataset.value).toBe("cherry");
        await userEvent.keyboard("{Home}");
        expect(getActive()?.dataset.value).toBe("apple");
        expect(getValue()).toBe("과일 선택");
        expect(document.activeElement).toBe(multiple ? getList() : getTrigger());
        await userEvent.keyboard("{ArrowDown}{ArrowDown} ");
        expect(getSelect().value).toBe("blackberry");
        if (multiple) {
          await userEvent.keyboard("{Home} ");
          expect(getSelected()).toEqual(["apple", "blackberry"]);
        } else expect(getList()).toBeNull();
        expect(new FormData(getSelect().form!).getAll("fruit")).toEqual(
          multiple ? ["apple", "blackberry"] : ["blackberry"],
        );
      },
    );

    it("라벨 ID 변경과 제거·재마운트를 그룹 이름에 반영한다", async () => {
      function LabelFixture({ id, label = true }: { id: string; label?: boolean }) {
        return (
          <Select.Root items={items} defaultOpen>
            <Select.Trigger aria-label="과일" data-trigger="">
              과일
            </Select.Trigger>
            <Select.Positioner>
              <Select.List aria-label="과일 목록">
                <Select.Group aria-label={label ? undefined : "대체 그룹 이름"} data-group="">
                  {label && <Select.GroupLabel id={id}>과일 그룹</Select.GroupLabel>}
                  <Select.Item value="apple" />
                </Select.Group>
              </Select.List>
            </Select.Positioner>
          </Select.Root>
        );
      }
      const view = render(<LabelFixture id="first-group-label" />);
      const group = document.querySelector<HTMLElement>("[data-group]")!;
      expect(group.getAttribute("aria-labelledby")).toBe("first-group-label");
      view.rerender(<LabelFixture id="next-group-label" />);
      expect(group.getAttribute("aria-labelledby")).toBe("next-group-label");
      expect(document.getElementById("first-group-label")).toBeNull();
      view.rerender(<LabelFixture id="next-group-label" label={false} />);
      expect(group.hasAttribute("aria-labelledby")).toBe(false);
      await expect.element(group).toHaveAccessibleName("대체 그룹 이름");
      view.rerender(<LabelFixture id="restored-group-label" />);
      expect(group.getAttribute("aria-labelledby")).toBe("restored-group-label");
      await expect.element(group).toHaveAccessibleName("과일 그룹");
    });

    it("명시한 그룹 이름을 우선하고 render·Ref·이벤트와 라벨의 사용자 ID를 합성한다", async () => {
      const groupRef = createRef<HTMLElement>();
      const labelRef = createRef<HTMLHeadingElement>();
      const calls: string[] = [];
      render(
        <Select.Root items={items} defaultOpen>
          <Select.Trigger aria-label="과일">과일</Select.Trigger>
          <Select.Positioner>
            <Select.List aria-label="과일 목록">
              <div id="external-group-label">외부 이름</div>
              <Select.Group
                aria-labelledby="external-group-label"
                render={<section ref={groupRef} onClick={() => calls.push("render")} />}
                onClick={() => calls.push("part")}
              >
                <Select.GroupLabel
                  ref={labelRef}
                  id="part-group-label"
                  render={<h3 id="render-group-label" />}
                >
                  화면 제목
                </Select.GroupLabel>
                <Select.Item value="apple" />
              </Select.Group>
              <Select.Group render={<section aria-label="직접 지정한 이름" />}>
                <Select.GroupLabel>기본 이름</Select.GroupLabel>
                <Select.Item value="banana" />
              </Select.Group>
              <Select.Group data-render-id-group="">
                <Select.GroupLabel render={<div id="only-render-group-label" />}>
                  render 제목
                </Select.GroupLabel>
                <Select.Item value="cherry" />
              </Select.Group>
            </Select.List>
          </Select.Positioner>
        </Select.Root>,
      );
      expect(groupRef.current?.tagName).toBe("SECTION");
      expect(labelRef.current?.tagName).toBe("H3");
      expect(labelRef.current?.id).toBe("part-group-label");
      await expect.element(groupRef.current!).toHaveAccessibleName("외부 이름");
      const direct = page.getByRole("group", { name: "직접 지정한 이름", exact: true });
      await expect.element(direct).toBeVisible();
      expect(direct.element().hasAttribute("aria-labelledby")).toBe(false);
      expect(
        document.querySelector("[data-render-id-group]")?.getAttribute("aria-labelledby"),
      ).toBe("only-render-group-label");
      await userEvent.click(labelRef.current!);
      expect(calls).toEqual(["render", "part"]);
    });

    it("StrictMode hydration 후 그룹 이름과 항목의 소속을 연결한다", async () => {
      const element = (
        <StrictMode>
          <GroupedFixture multiple />
        </StrictMode>
      );
      const container = document.createElement("div");
      container.innerHTML = renderToString(element);
      document.body.append(container);
      const onRecoverableError = vi.fn();
      let root!: Root;
      flushSync(() => {
        root = hydrateRoot(container, element, { onRecoverableError });
      });
      fixtures.push({ root, container });
      await openSelect();
      await expect
        .element(page.getByRole("group", { name: "앞쪽 과일", exact: true }))
        .toBeVisible();
      await expect
        .element(page.getByRole("group", { name: "뒤쪽 과일", exact: true }))
        .toBeVisible();
      expect(onRecoverableError).not.toHaveBeenCalled();
    });
  });

  it("루트 export와 닫힌 상태의 ARIA·placeholder를 제공한다", async () => {
    expect(RootExportSelect).toBe(Select);
    render(<Fixture />);
    const trigger = getTrigger();
    expect(trigger.type).toBe("button");
    expect(trigger.getAttribute("role")).toBe("combobox");
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(trigger.getAttribute("aria-haspopup")).toBe("listbox");
    for (const name of [
      "aria-controls",
      "aria-activedescendant",
      "aria-autocomplete",
      "aria-required",
    ])
      expect(trigger.hasAttribute(name)).toBe(false);
    expect(getValue()).toBe("과일 선택");
    expect(getList()).toBeNull();
    expect(document.querySelector("[data-portal]")).toBeNull();
    expect(getSelect().tabIndex).toBe(-1);
    expect(getSelect().getAttribute("aria-hidden")).toBe("true");
    await expect.element(trigger).toHaveAccessibleName("과일");
  });

  it.each([false, true])(
    "multiple=%s의 이름·선택 상태와 포커스 소유자를 연결한다",
    async (multiple) => {
      render(
        <Fixture
          rootProps={
            multiple
              ? { items, multiple: true, defaultValue: ["banana"] }
              : { items, defaultValue: "banana" }
          }
        />,
      );
      expect(getValue()).toBe("Banana");
      await openSelect();
      expect(getTrigger().getAttribute("aria-controls")).toBe(getList()!.id);
      expect(getList()!.getAttribute("aria-multiselectable")).toBe(multiple ? "true" : null);
      expect(getSelected()).toEqual(["banana"]);
      expect(getActive()?.dataset.value).toBe("banana");
      expect(document.activeElement).toBe(multiple ? getList() : getTrigger());
      expect(getTrigger().getAttribute("role")).toBe(multiple ? null : "combobox");
      if (multiple) await expect.element(getTrigger()).toHaveAccessibleDescription("Banana");
      expect(getOptions()[1]!.getAttribute("aria-disabled")).toBe("true");
      expect(getOptions().every((item) => item.tabIndex === -1)).toBe(true);
      await expect.element(getList()!).toHaveAccessibleName("선택 가능한 과일");
      expect(
        (await axe.run(document.body, { rules: { region: { enabled: false } } })).violations,
      ).toEqual([]);
      expect(document.querySelector("[data-indicator]")?.getAttribute("aria-hidden")).toBe("true");
      await userEvent.keyboard("{Escape}");
      expect(getList()).toBeNull();
      expect(getTrigger().hasAttribute("aria-controls")).toBe(false);
      expect(getTrigger().hasAttribute("aria-activedescendant")).toBe(false);
      expect(document.activeElement).toBe(getTrigger());
    },
  );

  it.each([false, true])("Portal=%s에서도 Trigger 옆에 배치한다", async (portal) => {
    const { container } = render(<Fixture portal={portal} />);
    await openSelect();
    expect(container.contains(getList())).toBe(!portal);
    const popup = document.querySelector("[data-positioner]")!;
    expect(popup.getBoundingClientRect().top).toBeCloseTo(
      getTrigger().getBoundingClientRect().bottom + 4,
      0,
    );
    expect(getComputedStyle(popup).getPropertyValue("--anchor-width")).not.toBe("");
  });

  it.each(["{Enter}", " ", "{ArrowDown}", "{ArrowUp}", "{Alt>}{ArrowDown}{/Alt}"])(
    "%s로 열 때 선택 값을 유지한다",
    async (key) => {
      render(<Fixture rootProps={{ items, defaultValue: "banana" }} />);
      getTrigger().focus();
      await userEvent.keyboard(key);
      await vi.waitFor(() => expect(getActive()?.dataset.value).toBe("banana"));
      expect(getValue()).toBe("Banana");
      expect(document.activeElement).toBe(getTrigger());
    },
  );

  it("탐색은 값을 유지하고 Home·End·방향키는 숨김·비활성 항목을 건너뛴다", async () => {
    render(<Fixture rootProps={{ items, defaultValue: "banana" }} hidden={["blackberry"]} />);
    await openSelect();
    await userEvent.keyboard("{Home}{ArrowDown}");
    expect(getActive()?.dataset.value).toBe("banana");
    await userEvent.keyboard("{End}{ArrowDown}");
    expect(getActive()?.dataset.value).toBe("cherry");
    await userEvent.keyboard("{Home}{ArrowUp}");
    expect(getActive()?.dataset.value).toBe("apple");
    expect(getValue()).toBe("Banana");
    expect(getSelected()).toEqual(["banana"]);
    await userEvent.keyboard("{Escape}");
    expect(getValue()).toBe("Banana");
  });

  it.each(["{Enter}", " ", "{Alt>}{ArrowUp}{/Alt}"])(
    "%s로 탐색한 단일 값을 확정하고 닫는다",
    async (key) => {
      const onValueChange = vi.fn();
      render(<Fixture rootProps={{ items, onValueChange }} />);
      await openSelect();
      await userEvent.keyboard("{ArrowDown}");
      await userEvent.keyboard(key);
      expect(getValue()).toBe("Banana");
      expect(getSelect().value).toBe("banana");
      expect(onValueChange).toHaveBeenCalledWith(
        "banana",
        expect.objectContaining({ event: expect.any(KeyboardEvent) }),
      );
      expect(getList()).toBeNull();
      expect(document.activeElement).toBe(getTrigger());
    },
  );

  it("문자 입력은 접두어와 반복 문자를 탐색하며 필터링하지 않는다", async () => {
    render(<Fixture />);
    getTrigger().focus();
    await userEvent.keyboard("b");
    await vi.waitFor(() => expect(getActive()?.dataset.value).toBe("banana"));
    await userEvent.keyboard("b");
    expect(getActive()?.dataset.value).toBe("blackberry");
    await new Promise((resolve) => setTimeout(resolve, 550));
    await userEvent.keyboard("ch");
    expect(getActive()?.dataset.value).toBe("cherry");
    expect(getOptions()).toHaveLength(5);
    expect(getValue()).toBe("과일 선택");
  });

  it.each([false, true])(
    "multiple=%s에서 포인터로 선택하고 단일 선택만 닫는다",
    async (multiple) => {
      const onValueChange = vi.fn();
      render(
        <Fixture
          rootProps={multiple ? { items, multiple: true, onValueChange } : { items, onValueChange }}
        />,
      );
      await openSelect();
      await userEvent.hover(page.getByRole("option", { name: "Cherry", exact: true }));
      expect(getActive()?.dataset.value).toBe("cherry");
      expect(getValue()).toBe("과일 선택");
      await userEvent.click(page.getByRole("option", { name: "Cherry", exact: true }));
      expect(getValue()).toBe("Cherry");
      expect(onValueChange).toHaveBeenCalledWith(
        multiple ? ["cherry"] : "cherry",
        expect.objectContaining({ reason: "item-press" }),
      );
      if (multiple) {
        expect(getList()).not.toBeNull();
        expect(document.activeElement).toBe(getList());
        await userEvent.click(page.getByRole("option", { name: "Cherry", exact: true }));
        expect(getSelected()).toEqual([]);
        expect(getValue()).toBe("과일 선택");
      } else expect(getList()).toBeNull();
    },
  );

  it("다중 선택은 Space·Enter로 토글하며 탐색과 Escape는 기존 선택을 유지한다", async () => {
    render(<Fixture rootProps={{ items, multiple: true, defaultValue: ["banana"] }} />);
    await openSelect();
    await userEvent.keyboard("{Home} ");
    expect(getSelected()).toEqual(["apple", "banana"]);
    await userEvent.keyboard("{ArrowDown}{Enter}");
    expect(getSelected()).toEqual(["apple"]);
    expect(getList()).not.toBeNull();
    await userEvent.keyboard("{End}{Escape}");
    expect(getValue()).toBe("Apple");
  });

  it.each([false, true])("multiple=%s에서 Tab은 닫고 다음 요소로 이동한다", async (multiple) => {
    render(<Fixture rootProps={multiple ? { items, multiple: true } : { items }} />);
    await openSelect();
    await userEvent.keyboard("{ArrowDown}{Tab}");
    await vi.waitFor(() => expect(getList()).toBeNull());
    expect(document.activeElement).toBe(document.querySelector("[data-after]"));
    expect(getValue()).toBe(multiple ? "과일 선택" : "Banana");
  });

  it.each([false, true])(
    "multiple=%s에서 Value를 클릭해 연 뒤 Shift+Tab으로 이전 요소로 이동한다",
    async (multiple) => {
      render(<Fixture rootProps={multiple ? { items, multiple: true } : { items }} />);
      await openSelect(document.querySelector<HTMLElement>("[data-value]")!);
      await userEvent.keyboard("{Shift>}{Tab}{/Shift}");
      await vi.waitFor(() => expect(getList()).toBeNull());
      expect(document.activeElement).toBe(document.querySelector("[data-before]"));
    },
  );

  it("외부 포커스 이동은 단일 값을 확정하고 목적지 포커스를 유지한다", async () => {
    render(<Fixture />);
    await openSelect();
    await userEvent.keyboard("{End}");
    const outside = document.querySelector<HTMLButtonElement>("[data-after]")!;
    outside.focus();
    await vi.waitFor(() => expect(getList()).toBeNull());
    expect(getValue()).toBe("Cherry");
    expect(document.activeElement).toBe(outside);
  });

  it("외부의 포커스 없는 영역을 클릭해도 닫는다", async () => {
    render(<Fixture />);
    await openSelect();
    await userEvent.click(document.querySelector<HTMLElement>("[data-outside]")!);
    expect(getList()).toBeNull();
  });

  it("선택·열기·닫기 취소와 사용자 preventDefault를 반영한다", async () => {
    const view = render(<Fixture triggerProps={{ onClick: (event) => event.preventDefault() }} />);
    await userEvent.click(getTrigger());
    expect(getList()).toBeNull();
    view.rerender(
      <Fixture rootProps={{ items, onOpenChange: (_, details) => details.cancel() }} />,
    );
    await userEvent.click(getTrigger());
    expect(getList()).toBeNull();
    view.rerender(
      <Fixture rootProps={{ items, onValueChange: (_, details) => details.cancel() }} />,
    );
    await openSelect();
    await userEvent.keyboard("{End}{Enter}");
    expect(getValue()).toBe("과일 선택");
    expect(getList()).not.toBeNull();
    view.rerender(
      <Fixture
        rootProps={{
          items,
          onOpenChange: (open, details) => {
            if (!open) details.cancel();
          },
        }}
      />,
    );
    await userEvent.keyboard("{Escape}{Tab}");
    expect(getList()).not.toBeNull();
    expect(document.activeElement).toBe(getTrigger());
  });

  it.each([false, true])(
    "multiple=%s에서 제어 값을 유지하고 부모의 반영을 따른다",
    async (multiple) => {
      const onValueChange = vi.fn();
      const view = render(
        <Fixture
          rootProps={
            multiple
              ? { items, multiple: true, value: ["apple"], onValueChange }
              : { items, value: "apple", onValueChange }
          }
        />,
      );
      await openSelect();
      await userEvent.click(page.getByRole("option", { name: "Banana", exact: true }));
      expect(getValue()).toBe("Apple");
      view.rerender(
        <Fixture
          rootProps={
            multiple ? { items, multiple: true, value: ["banana"] } : { items, value: "banana" }
          }
        />,
      );
      expect(getValue()).toBe("Banana");
      expect(getSelect().value).toBe("banana");
    },
  );

  it("제어 open 변경을 부모가 반영하면 열고 닫는다", async () => {
    function Controlled() {
      const [open, setOpen] = useState(false);
      return <Fixture rootProps={{ items, open, onOpenChange: setOpen }} />;
    }
    render(<Controlled />);
    await openSelect();
    await userEvent.keyboard("{Escape}");
    expect(getList()).toBeNull();
  });

  it.each(["disabled", "readOnly"] as const)("%s는 호출과 값 변경을 막는다", async (flag) => {
    render(<Fixture rootProps={{ items, [flag]: true, open: true, defaultValue: "banana" }} />);
    expect(getList()).toBeNull();
    if (flag === "disabled") expect(getTrigger().disabled).toBe(true);
    else {
      getTrigger().focus();
      await userEvent.keyboard("{ArrowDown}{Enter}b");
    }
    expect(getValue()).toBe("Banana");
  });

  it("비활성·숨김 항목은 실행하지 않고 활성 항목 제거 시 탐색을 복구한다", async () => {
    const view = render(<Fixture />);
    await openSelect();
    await userEvent.click(page.getByRole("option", { name: "Apricot", exact: true }), {
      force: true,
    });
    expect(getValue()).toBe("과일 선택");
    await userEvent.keyboard("{End}");
    view.rerender(<Fixture hidden={["cherry"]} />);
    await vi.waitFor(() => expect(getActive()?.dataset.value).toBe("apple"));
    expect(getList()).not.toBeNull();
  });

  it("IME 조합의 키 입력을 가로채지 않는다", async () => {
    render(<Fixture />);
    getTrigger().focus();
    const event = new KeyboardEvent("keydown", {
      key: "ArrowDown",
      isComposing: true,
      bubbles: true,
      cancelable: true,
    });
    getTrigger().dispatchEvent(event);
    expect(event.defaultPrevented).toBe(false);
    expect(getList()).toBeNull();
  });

  it("PageUp·PageDown은 유효 항목을 열 개씩 탐색하고 경계에서 멈춘다", async () => {
    const options = Array.from({ length: 15 }, (_, index) => ({
      value: `fruit-${index}`,
      label: `Fruit ${index}`,
      disabled: index === 1,
    }));
    render(<Fixture rootProps={{ items: options }} />);
    await openSelect();
    await userEvent.keyboard("{PageDown}");
    expect(getActive()?.dataset.value).toBe("fruit-11");
    await userEvent.keyboard("{PageDown}");
    expect(getActive()?.dataset.value).toBe("fruit-14");
    await userEvent.keyboard("{PageUp}{PageUp}");
    expect(getActive()?.dataset.value).toBe("fruit-0");
    expect(getValue()).toBe("과일 선택");
  });

  it.each([false, true])("multiple=%s에서 빈 목록도 열고 선택 없이 닫는다", async (multiple) => {
    render(
      <Fixture
        rootProps={
          multiple ? { items: [], multiple: true, required: true } : { items: [], required: true }
        }
      />,
    );
    await userEvent.click(getTrigger());
    await vi.waitFor(() =>
      expect(getList()?.closest("[popover]")?.matches(":popover-open")).toBe(true),
    );
    expect(getOptions()).toHaveLength(0);
    expect(getActive()).toBeNull();
    expect(getSelect().validity.valueMissing).toBe(true);
    await userEvent.keyboard("{End}{ArrowUp}x{Escape}");
    expect(getList()).toBeNull();
    expect(getValue()).toBe("과일 선택");
  });

  it.each([false, true])(
    "multiple=%s에서 네이티브 FormData와 required를 동기화한다",
    async (multiple) => {
      render(
        <form>
          <Fixture
            rootProps={
              multiple
                ? { items, multiple: true, name: "fruit", required: true }
                : { items, name: "fruit", required: true }
            }
          />
        </form>,
      );
      expect(getSelect().validity.valueMissing).toBe(true);
      expect((multiple ? getList() : getTrigger())?.getAttribute("aria-required")).toBe(
        multiple ? undefined : "true",
      );
      await openSelect();
      if (multiple) expect(getList()!.getAttribute("aria-required")).toBe("true");
      await userEvent.click(page.getByRole("option", { name: "Banana", exact: true }));
      if (multiple)
        await userEvent.click(page.getByRole("option", { name: "Cherry", exact: true }));
      expect(getSelect().validity.valid).toBe(true);
      expect(new FormData(getSelect().form!).getAll("fruit")).toEqual(
        multiple ? ["banana", "cherry"] : ["banana"],
      );
    },
  );

  it.each([false, true])(
    "multiple=%s의 외부 form reset은 초기 값으로 복원하고 변경 콜백을 호출하지 않는다",
    async (multiple) => {
      const onValueChange = vi.fn();
      render(
        <>
          <form id="fruit-form">
            <button tabIndex={0} type="reset">
              초기화
            </button>
          </form>
          <Fixture
            rootProps={
              multiple
                ? {
                    items,
                    multiple: true,
                    defaultValue: ["apple"],
                    form: "fruit-form",
                    onValueChange,
                  }
                : { items, defaultValue: "apple", form: "fruit-form", onValueChange }
            }
          />
        </>,
      );
      await openSelect();
      await userEvent.click(page.getByRole("option", { name: "Banana", exact: true }));
      onValueChange.mockClear();
      await userEvent.click(page.getByRole("button", { name: "초기화", exact: true }));
      await vi.waitFor(() => expect(getValue()).toBe("Apple"));
      expect(getSelect().value).toBe("apple");
      expect(onValueChange).not.toHaveBeenCalled();
    },
  );

  it("제어 값 reset과 취소된 reset은 현재 값을 유지한다", async () => {
    const view = render(
      <form>
        <button tabIndex={0} type="reset">
          초기화
        </button>
        <Fixture rootProps={{ items, value: "cherry", defaultValue: "apple" }} />
      </form>,
    );
    await userEvent.click(page.getByRole("button", { name: "초기화", exact: true }));
    await vi.waitFor(() => expect(getSelect().value).toBe("cherry"));
    view.rerender(
      <form onReset={(event) => event.preventDefault()}>
        <button tabIndex={0} type="reset">
          초기화
        </button>
        <Fixture rootProps={{ items, defaultValue: "apple" }} />
      </form>,
    );
    await openSelect();
    await userEvent.click(page.getByRole("option", { name: "Banana", exact: true }));
    await userEvent.click(page.getByRole("button", { name: "초기화", exact: true }));
    expect(getValue()).toBe("Banana");
  });

  it("네이티브 select의 변경을 값에 반영하고 취소 시 복원한다", async () => {
    const onValueChange = vi.fn();
    const view = render(<Fixture rootProps={{ items, onValueChange }} />);
    flushSync(() => {
      getSelect().value = "cherry";
      getSelect().dispatchEvent(new Event("change", { bubbles: true }));
    });
    expect(getValue()).toBe("Cherry");
    expect(onValueChange).toHaveBeenCalledWith(
      "cherry",
      expect.objectContaining({ reason: "native-change" }),
    );
    view.rerender(
      <Fixture rootProps={{ items, onValueChange: (_, details) => details.cancel() }} />,
    );
    flushSync(() => {
      getSelect().value = "banana";
      getSelect().dispatchEvent(new Event("change", { bubbles: true }));
    });
    expect(getSelect().value).toBe("cherry");
  });

  it("Field 이름·설명·검증과 네이티브 invalid 포커스를 연결한다", async () => {
    render(
      <form>
        <Field.Root name="fruit">
          <Field.Label>원하는 과일</Field.Label>
          <Field.Description>하나를 선택하세요.</Field.Description>
          <Select.Root items={items} required>
            <Select.Trigger data-trigger="">
              <Select.Value placeholder="선택" data-value="" />
            </Select.Trigger>
            <Select.HiddenSelect data-native-select="" />
          </Select.Root>
          <Field.Error>필수 선택입니다.</Field.Error>
        </Field.Root>
        <button tabIndex={0} type="submit">
          제출
        </button>
      </form>,
    );
    await expect.element(getTrigger()).toHaveAccessibleName("원하는 과일");
    await expect.element(getTrigger()).toHaveAccessibleDescription("하나를 선택하세요.");
    expect(getSelect().name).toBe("fruit");
    await userEvent.click(page.getByRole("button", { name: "제출", exact: true }));
    await vi.waitFor(() => expect(getTrigger().getAttribute("aria-invalid")).toBe("true"));
    expect(document.activeElement).toBe(getTrigger());
    await expect
      .element(getTrigger())
      .toHaveAccessibleDescription("하나를 선택하세요. 필수 선택입니다.");
  });

  it.each(["Field", "Fieldset", "native"])(
    "%s의 disabled가 상호작용과 제출을 막는다",
    async (kind) => {
      const child = <Fixture rootProps={{ items, defaultValue: "banana", name: "fruit" }} />;
      render(
        <form>
          {kind === "Field" ? (
            <Field.Root disabled>{child}</Field.Root>
          ) : kind === "Fieldset" ? (
            <Fieldset.Root disabled>{child}</Fieldset.Root>
          ) : (
            <fieldset disabled>{child}</fieldset>
          )}
        </form>,
      );
      expect(getTrigger().matches(":disabled")).toBe(true);
      expect(new FormData(getSelect().form!).getAll("fruit")).toEqual([]);
    },
  );

  it("render·사용자 ID·Ref·이벤트를 실제 요소와 이름 참조에 합성한다", async () => {
    const trigger = createRef<HTMLButtonElement>();
    const list = createRef<HTMLDivElement>();
    const native = createRef<HTMLSelectElement>();
    const calls: string[] = [];
    render(
      <Select.Root items={items}>
        <Select.Trigger
          id="custom-select-trigger"
          data-trigger=""
          ref={trigger}
          render={<Button onClick={() => calls.push("render")} />}
          onClick={() => calls.push("part")}
        >
          <Select.Value placeholder="과일" />
        </Select.Trigger>
        <Select.Positioner>
          <Select.List ref={list}>
            {items.map((item) => (
              <Select.Item key={item.value} value={item.value} />
            ))}
          </Select.List>
        </Select.Positioner>
        <Select.HiddenSelect data-native-select="" render={<select ref={native} />} />
      </Select.Root>,
    );
    await openSelect();
    expect(calls).toEqual(["render", "part"]);
    expect(list.current?.getAttribute("aria-labelledby")).toBe("custom-select-trigger");
    expect(trigger.current?.hasAttribute("data-custom")).toBe(true);
    expect(native.current?.isConnected).toBe(true);
  });

  it("StrictMode hydration에서 초기 값과 상위 표시 계층을 복원하고 닫을 때 정리한다", async () => {
    const element = (
      <StrictMode>
        <Fixture rootProps={{ items, defaultValue: "banana", defaultOpen: true }} />
      </StrictMode>
    );
    const container = document.createElement("div");
    container.innerHTML = renderToString(element);
    document.body.append(container);
    const onRecoverableError = vi.fn();
    let root!: Root;
    flushSync(() => {
      root = hydrateRoot(container, element, { onRecoverableError });
    });
    fixtures.push({ root, container });
    await vi.waitFor(() => expect(getActive()?.dataset.value).toBe("banana"));
    expect(getValue()).toBe("Banana");
    expect(onRecoverableError).not.toHaveBeenCalled();
    getTrigger().focus();
    await userEvent.keyboard("{Escape}");
    expect(document.querySelector(":popover-open")).toBeNull();
    expect(getTrigger().style.getPropertyValue("anchor-name")).toBe("");
  });
});

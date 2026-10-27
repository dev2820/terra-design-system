import axe from "axe-core";
import { createRef, StrictMode, useLayoutEffect, type ComponentProps, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { createRoot, hydrateRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import {
  Tabs,
  type TabsChangeEventDetails,
  type TabsListProps,
  type TabsPanelProps,
  type TabsRootProps,
  type TabsTabProps,
} from ".";
import { Tabs as RootExportTabs } from "..";

const fixtures: Array<{ container: HTMLDivElement; root: Root }> = [];

afterEach(() => {
  for (const { container, root } of fixtures) {
    flushSync(() => root.unmount());
    container.remove();
  }

  fixtures.length = 0;
  vi.restoreAllMocks();
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

interface Item {
  value: string;
  label: string;
  content?: ReactNode;
  tabProps?: Omit<TabsTabProps, "value" | "children">;
  panelProps?: Omit<TabsPanelProps, "value" | "children">;
}

const defaultItems: Item[] = [
  { value: "overview", label: "개요" },
  { value: "activity", label: "활동" },
  { value: "settings", label: "설정" },
];

function fixture(
  rootProps: TabsRootProps = {},
  items = defaultItems,
  listProps: TabsListProps = {},
) {
  return (
    <>
      <button type="button" data-testid="before">
        이전
      </button>
      <Tabs.Root defaultValue="overview" data-testid="root" {...rootProps}>
        <Tabs.List aria-label="프로젝트" {...listProps}>
          {items.map((item) => (
            <Tabs.Tab key={item.value} value={item.value} {...item.tabProps}>
              {item.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        {items.map((item) => (
          <Tabs.Panel key={item.value} value={item.value} {...item.panelProps}>
            {item.content ?? `${item.label} 내용`}
          </Tabs.Panel>
        ))}
      </Tabs.Root>
      <button type="button" data-testid="after">
        다음
      </button>
    </>
  );
}

function getParts(container: HTMLElement) {
  return {
    root: container.querySelector<HTMLElement>("[data-testid='root']")!,
    list: container.querySelector<HTMLElement>("[role='tablist']")!,
    tabs: Array.from(container.querySelectorAll<HTMLButtonElement>("[role='tab']")),
    panels: Array.from(container.querySelectorAll<HTMLElement>("[role='tabpanel']")),
  };
}

function expectConnections(container: HTMLElement) {
  const { tabs, panels } = getParts(container);

  for (const tab of tabs) {
    const panel = panels.find((item) => item.id === tab.getAttribute("aria-controls"));
    expect(panel).toBeDefined();
    expect(panel!.getAttribute("aria-labelledby")).toBe(tab.id);
  }
}

function expectSelection(container: HTMLElement, value: string | null) {
  const { tabs, panels } = getParts(container);

  for (const tab of tabs) {
    const active = tab.value === value;
    const panel = panels.find((item) => item.id === tab.getAttribute("aria-controls"))!;
    expect(tab.getAttribute("aria-selected")).toBe(String(active));
    expect(tab.hasAttribute("data-active")).toBe(active);
    expect(tab.hasAttribute("data-inactive")).toBe(!active);
    expect(panel.hidden).toBe(!active);
    expect(panel.hasAttribute("data-active")).toBe(active);
    expect(panel.hasAttribute("data-inactive")).toBe(!active);
  }
}

function CustomButton(props: ComponentProps<"button">) {
  return <button {...props} data-custom-button="" />;
}

function preventArrowRight(event: React.KeyboardEvent) {
  if (event.key === "ArrowRight") event.preventDefault();
}

// Native buttons own activation, focus, disabled and form behavior. Verify their
// connection to Tabs selection and navigation, rather than repeating HTML's full matrix.
// Native Props, Ref and Event types are covered by typecheck; no separate type tests
// repeat those declarations. Screen-reader speech and product styling require manual QA.
describe("Tabs", () => {
  describe("구조와 ID", () => {
    it("루트와 하위 경로에서 같은 컴포넌트를 제공한다", () => {
      expect(RootExportTabs).toBe(Tabs);
    });

    it("기본 HTML, 접근 가능한 이름과 선택 상태를 완성한다", async () => {
      const { container } = render(fixture());
      const { root, list, tabs, panels } = getParts(container);

      expect(root.tagName).toBe("DIV");
      expect(list.tagName).toBe("DIV");
      expect(list.getAttribute("aria-orientation")).toBe("horizontal");
      expect(tabs.map((tab) => [tab.tagName, tab.type])).toEqual([
        ["BUTTON", "button"],
        ["BUTTON", "button"],
        ["BUTTON", "button"],
      ]);
      expect(panels.map((panel) => panel.tagName)).toEqual(["DIV", "DIV", "DIV"]);
      expectConnections(container);
      expectSelection(container, "overview");
      await expect.element(page.getByRole("tablist", { name: "프로젝트" })).toBeVisible();
      await expect.element(page.getByRole("tab", { name: "개요" })).toBeVisible();
      await expect.element(page.getByRole("tabpanel", { name: "개요" })).toBeVisible();
    });

    it("초기 선택을 생략하면 패널을 숨기고 첫 활성 탭으로 진입한다", async () => {
      const { container } = render(
        <>
          <button type="button">이전</button>
          <Tabs.Root activationMode="manual">
            <Tabs.List aria-label="프로젝트">
              <Tabs.Tab value="overview">개요</Tabs.Tab>
              <Tabs.Tab value="activity">활동</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="overview">개요 내용</Tabs.Panel>
            <Tabs.Panel value="activity">활동 내용</Tabs.Panel>
          </Tabs.Root>
        </>,
      );

      expectSelection(container, null);
      expect(getParts(container).tabs.map((tab) => tab.tabIndex)).toEqual([0, -1]);
      container.querySelector("button")!.focus();
      await userEvent.tab();
      expect(document.activeElement).toBe(getParts(container).tabs[0]);
      expectSelection(container, null);
    });

    it.each(["overview", "activity", null])(
      "서버 HTML에 초기 선택 %s와 ID 참조를 포함한다",
      (defaultValue) => {
        const container = document.createElement("div");
        container.innerHTML = renderToString(fixture({ defaultValue }));

        expectConnections(container);
        expectSelection(container, defaultValue);
        expect(getParts(container).tabs.map((tab) => tab.tabIndex)).toEqual(
          defaultItems.map((item) => (item.value === defaultValue ? 0 : -1)),
        );
      },
    );

    it("기준 ID와 인코딩한 value로 고유한 ID를 만들고 재배치에도 유지한다", () => {
      const items = ["a b", "a%20b", "활동/#"].map((value) => ({ value, label: value }));
      const { container, rerender } = render(
        fixture({ id: "project", defaultValue: "a b" }, items),
      );

      expect(getParts(container).tabs.map((tab) => tab.id)).toEqual([
        "project-tab-a%20b",
        "project-tab-a%2520b",
        "project-tab-%ED%99%9C%EB%8F%99%2F%23",
      ]);
      expectConnections(container);
      const originalIds = new Map(getParts(container).tabs.map((tab) => [tab.value, tab.id]));
      rerender(fixture({ id: "project", defaultValue: "a b" }, items.toReversed()));
      for (const tab of getParts(container).tabs) {
        expect(tab.id).toBe(originalIds.get(tab.value));
      }
      expectConnections(container);
    });

    it("같은 value를 사용하는 여러 Root의 자동 ID를 구분한다", () => {
      const container = document.createElement("div");
      container.innerHTML = renderToString(
        <>
          {fixture()}
          {fixture()}
        </>,
      );
      const { tabs, panels } = getParts(container);
      const ids = [...tabs, ...panels].map((part) => part.id);

      expect(new Set(ids).size).toBe(ids.length);
      expectConnections(container);
    });

    it("Root의 render ID와 Part ID를 기준 ID로 사용한다", () => {
      const { container, rerender } = render(fixture({ render: <section id="render-root" /> }));
      expect(getParts(container).tabs[0]!.id).toBe("render-root-tab-overview");
      expectConnections(container);

      rerender(fixture({ id: "part-root", render: <section id="render-root" /> }));
      expect(getParts(container).root.id).toBe("part-root");
      expect(getParts(container).tabs[0]!.id).toBe("part-root-tab-overview");
      expectConnections(container);
    });

    it("render 요소와 네이티브 Props로 ID와 참조를 덮어쓴다", () => {
      const items: Item[] = [
        {
          value: "overview",
          label: "개요",
          tabProps: { render: <button id="render-tab" aria-controls="render-panel" /> },
          panelProps: { render: <section id="render-panel" aria-labelledby="render-tab" /> },
        },
        {
          value: "activity",
          label: "활동",
          tabProps: {
            id: "part-tab",
            "aria-controls": "part-panel",
            render: <button id="ignored-tab" aria-controls="ignored-panel" />,
          },
          panelProps: {
            id: "part-panel",
            "aria-labelledby": "part-tab",
            render: <section id="ignored-panel" aria-labelledby="ignored-tab" />,
          },
        },
      ];
      const server = document.createElement("div");
      server.innerHTML = renderToString(fixture({}, items));
      expectConnections(server);
      const { container } = render(fixture({}, items));
      expect(getParts(container).tabs.map((tab) => tab.id)).toEqual(["render-tab", "part-tab"]);
      expect(getParts(container).panels.map((panel) => panel.id)).toEqual([
        "render-panel",
        "part-panel",
      ]);
      expectConnections(container);
    });

    it("ID만 덮어쓰면 상대 Part의 기본 참조는 바꾸지 않는다", () => {
      const { container } = render(
        fixture({ id: "project" }, [
          {
            value: "overview",
            label: "개요",
            tabProps: { id: "own-tab" },
            panelProps: { id: "own-panel" },
          },
        ]),
      );
      const {
        tabs: [tab],
        panels: [panel],
      } = getParts(container);

      // This intentionally incomplete override documents the caller's responsibility
      // to update both ends. It is not an accessible usage fixture for axe.
      expect(tab!.id).toBe("own-tab");
      expect(panel!.id).toBe("own-panel");
      expect(tab!.getAttribute("aria-controls")).toBe("project-panel-overview");
      expect(panel!.getAttribute("aria-labelledby")).toBe("project-tab-overview");
    });

    it("생략한 ID에는 기본값을 적용하고 명시한 ARIA 생략은 유지한다", () => {
      const { container } = render(
        fixture({ id: "project" }, [
          {
            value: "overview",
            label: "개요",
            tabProps: { id: undefined, "aria-controls": undefined },
            panelProps: { id: undefined, "aria-labelledby": undefined, "aria-label": "독립 이름" },
          },
        ]),
      );
      const {
        tabs: [tab],
        panels: [panel],
      } = getParts(container);

      expect(tab!.id).toBe("project-tab-overview");
      expect(panel!.id).toBe("project-panel-overview");
      expect(tab!.hasAttribute("aria-controls")).toBe(false);
      expect(panel!.hasAttribute("aria-labelledby")).toBe(false);
      expect(panel!.getAttribute("aria-label")).toBe("독립 이름");
    });

    it("첫 ref와 사용처의 Layout Effect에서 최종 ID와 참조를 제공한다", () => {
      const panelRef = createRef<HTMLDivElement>();
      const snapshots: string[][] = [];

      function App() {
        useLayoutEffect(() => {
          const panel = panelRef.current!;
          snapshots.push([panel.id, panel.getAttribute("aria-labelledby")!]);
          expect(document.getElementById(panel.getAttribute("aria-labelledby")!)).not.toBeNull();
        }, []);
        return fixture({ id: "project" }, [
          {
            value: "overview",
            label: "개요",
            tabProps: {
              ref(element) {
                if (element) {
                  expect(element.id).toBe("project-tab-overview");
                  expect(element.getAttribute("aria-controls")).toBe("project-panel-overview");
                }
              },
            },
            panelProps: { ref: panelRef },
          },
        ]);
      }

      render(<App />);
      expect(snapshots).toEqual([["project-panel-overview", "project-tab-overview"]]);
    });

    it.each([false, true])(
      "사용자 ID 여부 %s에서 hydration 전후 관계를 유지한다",
      async (custom) => {
        const items = custom
          ? [
              {
                value: "overview",
                label: "개요",
                tabProps: { id: "custom-tab", "aria-controls": "custom-panel" },
                panelProps: { id: "custom-panel", "aria-labelledby": "custom-tab" },
              },
              defaultItems[1]!,
            ]
          : defaultItems;
        const children = fixture({}, items);
        const container = document.createElement("div");
        container.innerHTML = renderToString(children);
        const serverIds = [...getParts(container).tabs, ...getParts(container).panels].map(
          (part) => part.id,
        );
        expectConnections(container);
        document.body.append(container);
        const errors = vi.spyOn(console, "error").mockImplementation(() => {});
        const onRecoverableError = vi.fn();
        const root = hydrateRoot(container, children, { onRecoverableError });
        fixtures.push({ container, root });

        await userEvent.click(getParts(container).tabs[1]!);
        expectSelection(container, "activity");
        expectConnections(container);
        expect(
          [...getParts(container).tabs, ...getParts(container).panels].map((part) => part.id),
        ).toEqual(serverIds);
        expect(onRecoverableError).not.toHaveBeenCalled();
        expect(errors).not.toHaveBeenCalled();
      },
    );
  });

  describe("선택과 변경", () => {
    it("클릭으로 한 번만 선택을 변경하며 선택된 탭을 해제하지 않는다", async () => {
      const onValueChange = vi.fn();
      const { container, rerender } = render(fixture({ onValueChange }));
      const tab = getParts(container).tabs[1]!;

      await userEvent.click(tab);
      expectSelection(container, "activity");
      expect(onValueChange).toHaveBeenCalledTimes(1);
      const [value, details] = onValueChange.mock.calls[0]!;
      expect(value).toBe("activity");
      expect(details.reason).toBe("tab-press");
      expect(details.event).toBeInstanceOf(MouseEvent);
      expect(details.tab).toBe(tab);
      expect(details.isCanceled).toBe(false);

      await userEvent.click(tab);
      expect(onValueChange).toHaveBeenCalledTimes(1);
      rerender(fixture({ defaultValue: "settings", onValueChange }));
      expectSelection(container, "activity");
    });

    it("제어 상태에서는 변경을 요청하고 부모의 value만 반영한다", async () => {
      const onValueChange = vi.fn();
      const { container, rerender } = render(
        fixture({ value: "overview", defaultValue: "settings", onValueChange }),
      );

      await userEvent.click(getParts(container).tabs[1]!);
      expect(onValueChange).toHaveBeenCalledTimes(1);
      expect(onValueChange.mock.calls[0]![0]).toBe("activity");
      expectSelection(container, "overview");
      rerender(fixture({ value: "activity", onValueChange }));
      expectSelection(container, "activity");
      rerender(fixture({ value: null, onValueChange }));
      expectSelection(container, null);
    });

    it("사용자 onClick의 preventDefault는 포인터 포커스의 자동 선택도 막는다", async () => {
      const onValueChange = vi.fn();
      const { container } = render(
        fixture({ onValueChange }, [
          defaultItems[0]!,
          { ...defaultItems[1]!, tabProps: { onClick: (event) => event.preventDefault() } },
        ]),
      );

      await userEvent.click(getParts(container).tabs[1]!);
      expectSelection(container, "overview");
      expect(onValueChange).not.toHaveBeenCalled();
    });

    it.each(["tab-press", "focus"] as const)(
      "%s 변경 취소는 선택을 유지하고 포커스는 허용한다",
      async (reason) => {
        const onValueChange = vi.fn((_value: string, details: TabsChangeEventDetails) =>
          details.cancel(),
        );
        const { container } = render(fixture({ onValueChange }));
        const [first, second] = getParts(container).tabs;

        if (reason === "tab-press") {
          await userEvent.click(second!);
        } else {
          first!.focus();
          await userEvent.keyboard("{ArrowRight}");
        }
        expect(onValueChange).toHaveBeenCalledTimes(1);
        expect(onValueChange.mock.calls[0]![1].reason).toBe(reason);
        expect(onValueChange.mock.calls[0]![1].isCanceled).toBe(true);
        expect(onValueChange.mock.calls[0]![1].event.defaultPrevented).toBe(false);
        expect(document.activeElement).toBe(second);
        expectSelection(container, "overview");
      },
    );

    it("Root disabled는 선택과 패널을 유지하고 모든 버튼을 비활성화한다", () => {
      const onValueChange = vi.fn();
      const { container } = render(fixture({ disabled: true, onValueChange }));
      const { root, list, tabs, panels } = getParts(container);

      expectSelection(container, "overview");
      expect(
        [root, list, ...tabs, ...panels].every((part) => part.hasAttribute("data-disabled")),
      ).toBe(true);
      expect(tabs.every((tab) => tab.disabled && tab.tabIndex === -1)).toBe(true);
      tabs[1]!.click();
      expect(onValueChange).not.toHaveBeenCalled();
    });

    it("개별 disabled는 선택값을 바꾸지 않고 다른 탭의 진입을 유지한다", () => {
      const { container } = render(
        fixture({ defaultValue: "activity" }, [
          defaultItems[0]!,
          { ...defaultItems[1]!, tabProps: { disabled: true } },
        ]),
      );
      expectSelection(container, "activity");
      expect(getParts(container).tabs.map((tab) => tab.tabIndex)).toEqual([0, -1]);
      expect(getParts(container).tabs[0]!.disabled).toBe(false);
      expect(getParts(container).tabs[1]!.hasAttribute("data-disabled")).toBe(true);
    });
  });

  describe("키보드와 포커스", () => {
    it("자동 모드는 코드와 방향키로 받은 포커스를 선택으로 반영한다", async () => {
      const onValueChange = vi.fn();
      const { container } = render(fixture({ onValueChange }));
      const { tabs } = getParts(container);

      flushSync(() => tabs[1]!.focus());
      expectSelection(container, "activity");
      expect(onValueChange).toHaveBeenCalledTimes(1);
      expect(onValueChange.mock.calls[0]![1].reason).toBe("focus");
      expect(onValueChange.mock.calls[0]![1].tab).toBe(tabs[1]);
      expect(onValueChange.mock.calls[0]![1].event).toBeInstanceOf(FocusEvent);

      await userEvent.keyboard("{ArrowRight}");
      expect(document.activeElement).toBe(tabs[2]);
      expectSelection(container, "settings");
      expect(onValueChange).toHaveBeenCalledTimes(2);
      expect(onValueChange.mock.calls[1]![1].reason).toBe("focus");
    });

    it("수동 모드는 방향키로 포커스만 이동하고 Enter와 Space로 선택한다", async () => {
      const onValueChange = vi.fn();
      const { container } = render(fixture({ activationMode: "manual", onValueChange }));
      const { tabs } = getParts(container);
      tabs[0]!.focus();

      await userEvent.keyboard("{ArrowRight}");
      expect(document.activeElement).toBe(tabs[1]);
      expectSelection(container, "overview");
      expect(onValueChange).not.toHaveBeenCalled();

      await userEvent.keyboard("{Enter}");
      expectSelection(container, "activity");
      await userEvent.keyboard("{ArrowRight} ");
      expectSelection(container, "settings");
      expect(onValueChange.mock.calls.map(([value, details]) => [value, details.reason])).toEqual([
        ["activity", "tab-press"],
        ["settings", "tab-press"],
      ]);
    });

    it.each([
      {
        orientation: "horizontal" as const,
        next: "ArrowRight",
        previous: "ArrowLeft",
        ignored: "ArrowDown",
      },
      {
        orientation: "vertical" as const,
        next: "ArrowDown",
        previous: "ArrowUp",
        ignored: "ArrowRight",
      },
    ])(
      "$orientation 방향에 맞는 키만 처리한다",
      async ({ orientation, next, previous, ignored }) => {
        const { container } = render(fixture({ orientation, activationMode: "manual" }));
        const { root, list, tabs, panels } = getParts(container);
        expect(list.getAttribute("aria-orientation")).toBe(orientation);
        expect(
          [root, list, ...tabs, ...panels].every(
            (part) => part.dataset.orientation === orientation,
          ),
        ).toBe(true);
        tabs[0]!.focus();

        await userEvent.keyboard(`{${ignored}}`);
        expect(document.activeElement).toBe(tabs[0]);
        await userEvent.keyboard(`{${next}}`);
        expect(document.activeElement).toBe(tabs[1]);
        await userEvent.keyboard(`{${previous}}`);
        expect(document.activeElement).toBe(tabs[0]);
        expectSelection(container, "overview");
      },
    );

    it.each([true, false])("loopFocus=%s에서 경계와 Home·End를 처리한다", async (loopFocus) => {
      const { container } = render(fixture({ activationMode: "manual", loopFocus }));
      const { tabs } = getParts(container);
      tabs[0]!.focus();

      await userEvent.keyboard("{ArrowLeft}");
      expect(document.activeElement).toBe(tabs[loopFocus ? 2 : 0]);
      await userEvent.keyboard("{End}");
      expect(document.activeElement).toBe(tabs[2]);
      await userEvent.keyboard("{ArrowRight}");
      expect(document.activeElement).toBe(tabs[loopFocus ? 0 : 2]);
      await userEvent.keyboard("{Home}");
      expect(document.activeElement).toBe(tabs[0]);
      expectSelection(container, "overview");
    });

    it("상위 요소의 RTL에 따라 좌우 이동 방향을 바꾼다", async () => {
      const { container } = render(<div dir="rtl">{fixture({ activationMode: "manual" })}</div>);
      const { tabs } = getParts(container);
      tabs[0]!.focus();

      await userEvent.keyboard("{ArrowLeft}");
      expect(document.activeElement).toBe(tabs[1]);
      await userEvent.keyboard("{ArrowRight}");
      expect(document.activeElement).toBe(tabs[0]);
    });

    it("Tab으로 패널에 진입하고 목록에 돌아오면 선택된 탭으로 진입한다", async () => {
      const { container } = render(fixture({ activationMode: "manual" }));
      const { tabs, panels } = getParts(container);
      container.querySelector<HTMLButtonElement>("[data-testid='before']")!.focus();

      await userEvent.tab();
      expect(document.activeElement).toBe(tabs[0]);
      await userEvent.keyboard("{ArrowRight}");
      expect(document.activeElement).toBe(tabs[1]);
      expect(tabs.map((tab) => tab.tabIndex)).toEqual([-1, 0, -1]);
      await userEvent.tab();
      expect(document.activeElement).toBe(panels[0]);
      expect(tabs.map((tab) => tab.tabIndex)).toEqual([0, -1, -1]);
      await userEvent.tab({ shift: true });
      expect(document.activeElement).toBe(tabs[0]);
      await userEvent.tab({ shift: true });
      expect(document.activeElement).toBe(container.querySelector("[data-testid='before']"));
      expectSelection(container, "overview");
    });

    it.each(["tab", "list"])("%s의 onKeyDown에서 기본 이동을 취소할 수 있다", async (part) => {
      const items = defaultItems.map((item, index) => ({
        ...item,
        tabProps: part === "tab" && index === 0 ? { onKeyDown: preventArrowRight } : {},
      }));
      const { container } = render(
        fixture(
          { activationMode: "manual" },
          items,
          part === "list" ? { onKeyDown: preventArrowRight } : {},
        ),
      );
      const { tabs } = getParts(container);
      tabs[0]!.focus();

      await userEvent.keyboard("{ArrowRight}");
      expect(document.activeElement).toBe(tabs[0]);
      await userEvent.keyboard("{End}");
      expect(document.activeElement).toBe(tabs[2]);
    });

    it("onFocus의 preventDefault는 자동 선택을 막고 포커스 이동은 유지한다", async () => {
      const onValueChange = vi.fn();
      const { container } = render(
        fixture({ onValueChange }, [
          defaultItems[0]!,
          { ...defaultItems[1]!, tabProps: { onFocus: (event) => event.preventDefault() } },
        ]),
      );
      const { tabs } = getParts(container);
      tabs[0]!.focus();

      await userEvent.keyboard("{ArrowRight}");
      expect(document.activeElement).toBe(tabs[1]);
      expectSelection(container, "overview");
      expect(onValueChange).not.toHaveBeenCalled();
    });

    it.each(["Alt", "Control", "Meta", "Shift"])(
      "%s 보조 키가 있으면 방향키를 처리하지 않는다",
      async (modifier) => {
        const { container } = render(fixture());
        const { tabs } = getParts(container);
        tabs[0]!.focus();

        await userEvent.keyboard(`{${modifier}>}{ArrowRight}{/${modifier}}`);
        expect(document.activeElement).toBe(tabs[0]);
        expectSelection(container, "overview");
      },
    );

    it("disabled, hidden과 inert 탭을 이동 대상에서 제외한다", async () => {
      const { container } = render(
        fixture({ activationMode: "manual" }, [
          defaultItems[0]!,
          { ...defaultItems[1]!, tabProps: { disabled: true } },
          { ...defaultItems[2]!, tabProps: { hidden: true } },
          { value: "inert", label: "비활성 영역", tabProps: { inert: true } },
          { value: "last", label: "마지막" },
        ]),
      );
      const { tabs } = getParts(container);
      tabs[0]!.focus();

      await userEvent.keyboard("{ArrowRight}");
      expect(document.activeElement).toBe(tabs[4]);
      await userEvent.keyboard("{Home}");
      expect(document.activeElement).toBe(tabs[0]);
      expect(tabs.map((tab) => tab.tabIndex)).toEqual([0, -1, -1, -1, -1]);
    });

    it("fieldset의 disabled 전파와 첫 legend 예외를 이동에 반영한다", async () => {
      const onValueChange = vi.fn();
      const { container } = render(
        <Tabs.Root defaultValue="overview" activationMode="manual" onValueChange={onValueChange}>
          <Tabs.List aria-label="프로젝트">
            <fieldset disabled>
              <legend>
                <Tabs.Tab value="overview">개요</Tabs.Tab>
              </legend>
              <Tabs.Tab value="activity">활동</Tabs.Tab>
            </fieldset>
            <Tabs.Tab value="settings">설정</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="overview">개요 내용</Tabs.Panel>
          <Tabs.Panel value="activity">활동 내용</Tabs.Panel>
          <Tabs.Panel value="settings">설정 내용</Tabs.Panel>
        </Tabs.Root>,
      );
      const { tabs } = getParts(container);
      expect(tabs[0]!.matches(":disabled")).toBe(false);
      expect(tabs[1]!.matches(":disabled")).toBe(true);
      tabs[1]!.click();
      expect(onValueChange).not.toHaveBeenCalled();
      tabs[0]!.focus();

      await userEvent.keyboard("{ArrowRight}");
      expect(document.activeElement).toBe(tabs[2]);
      expectSelection(container, "overview");
    });

    it("StrictMode에서 제거·재배치·비활성화 이후 실제 순서로 포커스를 복구한다", async () => {
      const { container, rerender } = render(
        <StrictMode>{fixture({ activationMode: "manual" })}</StrictMode>,
      );
      getParts(container).tabs[1]!.focus();

      rerender(
        <StrictMode>
          {fixture({ activationMode: "manual" }, [defaultItems[2]!, defaultItems[0]!])}
        </StrictMode>,
      );
      await vi.waitFor(() => expect(document.activeElement).toBe(getParts(container).tabs[1]));
      await userEvent.keyboard("{Home}");
      expect(document.activeElement).toBe(getParts(container).tabs[0]);

      rerender(
        <StrictMode>
          {fixture({ activationMode: "manual" }, [
            { ...defaultItems[2]!, tabProps: { disabled: true } },
            defaultItems[0]!,
          ])}
        </StrictMode>,
      );
      await vi.waitFor(() => expect(document.activeElement).toBe(getParts(container).tabs[1]));
      expect(getParts(container).tabs.map((tab) => tab.tabIndex)).toEqual([-1, 0]);
      expectSelection(container, "overview");
    });

    it("자동 모드에서는 제거된 탭의 포커스를 복구하면서 선택을 요청한다", async () => {
      const onValueChange = vi.fn();
      const { container, rerender } = render(fixture({ onValueChange }));
      await userEvent.click(getParts(container).tabs[1]!);
      onValueChange.mockClear();

      rerender(fixture({ onValueChange }, [defaultItems[0]!, defaultItems[2]!]));
      await vi.waitFor(() => {
        expect(document.activeElement).toBe(getParts(container).tabs[0]);
        expectSelection(container, "overview");
      });
      expect(onValueChange).toHaveBeenCalledTimes(1);
      expect(onValueChange.mock.calls[0]![1].reason).toBe("focus");
    });
  });

  describe("합성과 패널", () => {
    it("render 요소와 사용자 버튼에서 Props·이벤트·Ref를 병합한다", async () => {
      const calls: string[] = [];
      const rootRef = createRef<HTMLDivElement>();
      const listRef = createRef<HTMLDivElement>();
      const tabRef = createRef<HTMLButtonElement>();
      const renderRef = createRef<HTMLButtonElement>();
      const panelRef = createRef<HTMLDivElement>();
      const { container } = render(
        <Tabs.Root
          ref={rootRef}
          render={<section className="render-root" />}
          className="part-root"
          onValueChange={() => calls.push("change")}
        >
          <Tabs.List ref={listRef} render={<nav />} aria-label="프로젝트">
            <Tabs.Tab
              value="overview"
              ref={tabRef}
              className="part-tab"
              render={
                <CustomButton
                  ref={renderRef}
                  className="render-tab"
                  onClick={() => calls.push("render")}
                />
              }
              onClick={() => calls.push("part")}
            >
              개요
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="overview" ref={panelRef} render={<article />}>
            개요 내용
          </Tabs.Panel>
        </Tabs.Root>,
      );
      const { list, tabs, panels } = getParts(container);
      expect(rootRef.current!.tagName).toBe("SECTION");
      expect(rootRef.current!.classList.contains("render-root")).toBe(true);
      expect(rootRef.current!.classList.contains("part-root")).toBe(true);
      expect(listRef.current).toBe(list);
      expect(list.tagName).toBe("NAV");
      expect(tabRef.current).toBe(tabs[0]);
      expect(renderRef.current).toBe(tabs[0]);
      expect(tabs[0]!.hasAttribute("data-custom-button")).toBe(true);
      expect(tabs[0]!.classList.contains("render-tab")).toBe(true);
      expect(tabs[0]!.classList.contains("part-tab")).toBe(true);
      expect(panelRef.current).toBe(panels[0]);
      expect(panels[0]!.tagName).toBe("ARTICLE");
      expectConnections(container);

      await userEvent.click(tabs[0]!);
      expect(calls).toEqual(["render", "part", "change"]);
      expectSelection(container, "overview");
    });

    it("숨겨진 패널의 DOM과 입력 상태를 보존한다", async () => {
      const { container } = render(
        fixture({}, [
          {
            ...defaultItems[0]!,
            content: <input aria-label="프로젝트 이름" defaultValue="Coral" />,
          },
          defaultItems[1]!,
        ]),
      );
      const input = container.querySelector("input")!;
      const { tabs, panels } = getParts(container);
      await userEvent.fill(input, "Coral Tabs");

      await userEvent.click(tabs[1]!);
      expect(panels[0]!.hidden).toBe(true);
      expect(input.checkVisibility()).toBe(false);
      expect(container.querySelector("input")).toBe(input);
      await userEvent.click(tabs[0]!);
      expect(panels[0]!.hidden).toBe(false);
      expect(input.value).toBe("Coral Tabs");
      expect(input.checkVisibility()).toBe(true);
    });

    it("Panel의 tabIndex를 덮어쓰면 첫 입력으로 직접 진입한다", async () => {
      const { container } = render(
        fixture({}, [
          {
            ...defaultItems[0]!,
            panelProps: { tabIndex: -1 },
            content: <input aria-label="프로젝트 이름" />,
          },
          defaultItems[1]!,
        ]),
      );
      getParts(container).tabs[0]!.focus();

      await userEvent.tab();
      expect(document.activeElement).toBe(container.querySelector("input"));
    });

    it("중첩된 Root의 ID와 선택 및 키보드 이동을 독립적으로 유지한다", async () => {
      const { container } = render(
        <Tabs.Root defaultValue="overview">
          <Tabs.List aria-label="외부">
            <Tabs.Tab value="overview">외부 개요</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="overview">{fixture()}</Tabs.Panel>
        </Tabs.Root>,
      );
      const outerTab = container.querySelector<HTMLButtonElement>("[role='tab']")!;
      const inner = container.querySelector<HTMLElement>("[data-testid='root']")!;
      const innerTabs = getParts(inner).tabs;
      innerTabs[0]!.focus();
      await userEvent.keyboard("{ArrowRight}");

      expect(document.activeElement).toBe(innerTabs[1]);
      expectSelection(inner, "activity");
      expect(outerTab.getAttribute("aria-selected")).toBe("true");
      expect(outerTab.tabIndex).toBe(0);
      expect(outerTab.id).not.toBe(innerTabs[0]!.id);
      expectConnections(container);
    });

    it("기본 버튼은 클릭과 Enter 선택으로 폼을 제출하지 않는다", async () => {
      const onSubmit = vi.fn((event: React.SyntheticEvent) => event.preventDefault());
      const { container } = render(<form onSubmit={onSubmit}>{fixture()}</form>);
      const { tabs } = getParts(container);

      await userEvent.click(tabs[1]!);
      expectSelection(container, "activity");
      tabs[2]!.focus();
      await userEvent.keyboard("{Enter}");
      expectSelection(container, "settings");
      expect(onSubmit).not.toHaveBeenCalled();
    });

    it.each(["overview", "activity", "settings"])(
      "선택값 %s에서 axe 위반이 없다",
      async (defaultValue) => {
        const { container } = render(fixture({ defaultValue }));
        const result = await axe.run(container);
        expect(result.violations).toEqual([]);
      },
    );
  });
});

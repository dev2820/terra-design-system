import axe from "axe-core";
import { createRef, StrictMode, useState, type ComponentProps, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { createRoot, hydrateRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import {
  Menu,
  type MenuContentProps,
  type MenuContextTriggerProps,
  type MenuItemProps,
  type MenuRootProps,
  type MenuTriggerItemProps,
  type MenuTriggerProps,
} from ".";
import { Menu as RootExportMenu } from "..";

// Fixture buttons explicitly participate in keyboard navigation on macOS WebKit.
const fixtures: Array<{ container: HTMLDivElement; root: Root }> = [];
afterEach(async () => {
  for (const { container, root } of fixtures.splice(0).toReversed()) {
    flushSync(() => root.unmount());
    container.remove();
  }
  // Restoration runs after the commit that removes the menu Portal.
  await Promise.resolve();
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

function Popup({ children, portal = true, ...props }: MenuContentProps & { portal?: boolean }) {
  const content = (
    <Menu.Positioner data-positioner="">
      <Menu.Content
        style={{ display: "grid", width: 140, padding: 4, background: "white" }}
        {...props}
      >
        {children}
      </Menu.Content>
    </Menu.Positioner>
  );
  return portal ? <Menu.Portal>{content}</Menu.Portal> : content;
}

interface FixtureProps {
  context?: boolean;
  nested?: boolean;
  portal?: boolean;
  rootProps?: MenuRootProps;
  childProps?: MenuRootProps;
  triggerProps?: MenuTriggerProps;
  contextProps?: MenuContextTriggerProps;
  triggerItemProps?: MenuTriggerItemProps;
  itemProps?: MenuItemProps;
  contentProps?: MenuContentProps;
  body?: ReactNode;
  rtl?: boolean;
}
function Fixture({
  context = false,
  nested = false,
  portal = true,
  rootProps,
  childProps,
  triggerProps,
  contextProps,
  triggerItemProps,
  itemProps,
  contentProps,
  body,
  rtl = false,
}: FixtureProps) {
  return (
    <div dir={rtl ? "rtl" : "ltr"}>
      <button tabIndex={0} type="button" data-before="">
        Before
      </button>
      <Menu.Root {...rootProps}>
        {context ? (
          <Menu.ContextTrigger
            data-trigger=""
            style={{ width: 220, height: 80, margin: 16 }}
            {...contextProps}
          >
            Document surface
          </Menu.ContextTrigger>
        ) : (
          <Menu.Trigger tabIndex={0} data-trigger="" {...triggerProps}>
            Document actions
          </Menu.Trigger>
        )}
        <Popup
          portal={portal}
          aria-label="Document actions"
          dir={rtl ? "rtl" : "ltr"}
          {...contentProps}
        >
          {body === undefined ? (
            <>
              <Menu.Item {...itemProps}>Copy</Menu.Item>
              <Menu.Item disabled {...itemProps}>
                Cut
              </Menu.Item>
              {nested && (
                <>
                  <Menu.Root {...childProps}>
                    <Menu.TriggerItem {...triggerItemProps}>Export</Menu.TriggerItem>
                    <Popup portal={portal} dir={rtl ? "rtl" : "ltr"}>
                      <Menu.Item {...itemProps}>PDF</Menu.Item>
                      <Menu.Root>
                        <Menu.TriggerItem>Image</Menu.TriggerItem>
                        <Popup portal={portal} dir={rtl ? "rtl" : "ltr"}>
                          <Menu.Item {...itemProps}>PNG</Menu.Item>
                          <Menu.Item {...itemProps}>JPEG</Menu.Item>
                        </Popup>
                      </Menu.Root>
                    </Popup>
                  </Menu.Root>
                  <Menu.Root>
                    <Menu.TriggerItem>Share</Menu.TriggerItem>
                    <Popup portal={portal} dir={rtl ? "rtl" : "ltr"}>
                      <Menu.Item {...itemProps}>Link</Menu.Item>
                    </Popup>
                  </Menu.Root>
                </>
              )}
              <Menu.Separator />
              <Menu.Item {...itemProps}>Paste</Menu.Item>
              <Menu.Item {...itemProps}>Print</Menu.Item>
            </>
          ) : (
            body
          )}
        </Popup>
      </Menu.Root>
      <button tabIndex={0} type="button" data-after="" style={{ display: "block", marginTop: 300 }}>
        After
      </button>
      <div data-outside="" style={{ width: 100, height: 24 }}>
        Outside
      </div>
    </div>
  );
}

const getTrigger = () => document.querySelector<HTMLElement>("[data-trigger]")!;
const getMenu = (name = "Document actions") => page.getByRole("menu", { name, exact: true });
const getItem = (name: string) => page.getByRole("menuitem", { name, exact: true });
async function expectFocusedItem(name: string) {
  await expect.element(getItem(name)).toHaveFocus();
}
async function openMenu(context = false) {
  await userEvent.click(
    getTrigger(),
    context ? { button: "right", position: { x: 20, y: 16 } } : {},
  );
  await expectFocusedItem("Copy");
}
async function openSubmenu(name = "Export", key = "ArrowRight") {
  // Keyboard navigation avoids implicitly opening a submenu with pointer hover.
  const keys = name === "Export" ? "{Home}{ArrowDown}{ArrowDown}" : "{Home}{ArrowDown}";
  await userEvent.keyboard(keys);
  await expectFocusedItem(name);
  await userEvent.keyboard(`{${key}}`);
  await expectFocusedItem(name === "Export" ? "PDF" : "PNG");
}
function CustomDiv(props: ComponentProps<"div">) {
  return <div {...props} data-custom="" />;
}
function CustomButton(props: ComponentProps<"button">) {
  return <button tabIndex={0} type="button" {...props} data-custom="" />;
}
function preventDefault(event: React.SyntheticEvent) {
  event.preventDefault();
}

function ControlledFixture() {
  const [isOpen, setOpen] = useState(false);
  const [childOpen, setChildOpen] = useState(false);
  return (
    <Fixture
      nested
      rootProps={{ open: isOpen, onOpenChange: setOpen }}
      childProps={{ open: childOpen, onOpenChange: setChildOpen }}
    />
  );
}

// HTML owns native button activation, form algorithms and the popover top layer.
// Tests verify Menu's roles, hierarchy, input coordination and actual focus results.
describe("Menu", () => {
  describe("구조와 호출", () => {
    it("루트 export와 닫힌 Trigger의 ARIA를 제공한다", async () => {
      expect(RootExportMenu).toBe(Menu);
      render(<Fixture />);
      expect(getTrigger().tagName).toBe("BUTTON");
      expect((getTrigger() as HTMLButtonElement).type).toBe("button");
      expect(getTrigger().getAttribute("aria-haspopup")).toBe("menu");
      expect(getTrigger().getAttribute("aria-expanded")).toBe("false");
      expect(getTrigger().hasAttribute("aria-controls")).toBe(false);
      expect(document.querySelector('[role="menu"]')).toBeNull();
      await expect.element(getTrigger()).toHaveAccessibleName("Document actions");
    });

    it.each([false, true])(
      "ContextTrigger=%s에서 이름·역할·ID와 기본 접근성을 제공한다",
      async (context) => {
        const { container } = render(<Fixture context={context} />);
        await openMenu(context);
        const content = getMenu().element();
        expect(getTrigger().getAttribute("aria-controls")).toBe(content.id);
        expect(container.contains(content)).toBe(false);
        expect(content.closest("[popover]")?.matches(":popover-open")).toBe(true);
        expect(content.hasAttribute("aria-modal")).toBe(false);
        expect(content.querySelectorAll('[role="menuitem"]')).toHaveLength(4);
        for (const item of content.querySelectorAll<HTMLElement>('[role="menuitem"]'))
          expect(item.tabIndex).toBe(-1);
        expect(getItem("Cut").element().getAttribute("aria-disabled")).toBe("true");
        expect(getItem("Copy").element().hasAttribute("aria-disabled")).toBe(false);
        expect(
          (await axe.run(document.body, { rules: { region: { enabled: false } } })).violations,
        ).toEqual([]);
      },
    );

    it("우클릭 좌표에 배치하고 같은 영역의 새 좌표로 이동한다", async () => {
      const onContextMenu = vi.fn();
      render(<Fixture context contextProps={{ onContextMenu }} />);
      await openMenu(true);
      const popup = getMenu().element().closest<HTMLElement>("[popover]")!;
      // Use actual event coordinates, which browsers may round to whole CSS pixels.
      expect(popup.getBoundingClientRect().left).toBeCloseTo(
        onContextMenu.mock.lastCall![0].clientX,
        0,
      );
      expect(popup.getBoundingClientRect().top).toBeCloseTo(
        onContextMenu.mock.lastCall![0].clientY,
        0,
      );
      await userEvent.click(getTrigger(), { button: "right", position: { x: 200, y: 50 } });
      await vi.waitFor(() =>
        expect(popup.getBoundingClientRect().top).toBeCloseTo(
          onContextMenu.mock.lastCall![0].clientY,
          0,
        ),
      );
      await expectFocusedItem("Copy");
    });

    it.each(["Enter", " ", "ArrowDown", "ArrowUp"])(
      "버튼의 %s 호출과 첫·마지막 진입을 제공한다",
      async (key) => {
        render(<Fixture />);
        await page.getByRole("button", { name: "Before", exact: true }).click();
        await userEvent.keyboard("{Tab}");
        expect(document.activeElement).toBe(getTrigger());
        await userEvent.keyboard(key === " " ? " " : `{${key}}`);
        await expectFocusedItem(key === "ArrowUp" ? "Print" : "Copy");
      },
    );

    it.each(["{ContextMenu}", "{Shift>}{F10}{/Shift}"])(
      "컨텍스트 영역의 %s 호출을 처리한다",
      async (keys) => {
        render(<Fixture context />);
        await userEvent.click(getTrigger());
        expect(document.querySelector('[role="menu"]')).toBeNull();
        const rect = getTrigger().getBoundingClientRect();
        await userEvent.keyboard(keys);
        await expectFocusedItem("Copy");
        expect(getMenu().element().closest("[popover]")!.getBoundingClientRect().top).toBeCloseTo(
          rect.bottom,
          0,
        );
      },
    );

    it("내부 포커스 요소에서 컨텍스트 호출하면 Escape로 그 요소에 복귀한다", async () => {
      render(
        <Menu.Root>
          <Menu.ContextTrigger>
            <input aria-label="Editor" />
          </Menu.ContextTrigger>
          <Popup aria-label="Editor actions">
            <Menu.Item>Copy</Menu.Item>
          </Popup>
        </Menu.Root>,
      );
      await page.getByRole("textbox", { name: "Editor" }).click();
      await userEvent.keyboard("{Shift>}{F10}{/Shift}");
      await expectFocusedItem("Copy");
      await userEvent.keyboard("{Escape}");
      await expect.element(page.getByRole("textbox", { name: "Editor" })).toHaveFocus();
    });

    it("화면 경계에서 좌표와 방향을 보정한다", async () => {
      render(
        <Fixture
          context
          contextProps={{
            style: { position: "fixed", bottom: 0, right: 0, width: 80, height: 60 },
          }}
        />,
      );
      await userEvent.click(getTrigger(), { button: "right", position: { x: 70, y: 50 } });
      await expectFocusedItem("Copy");
      const popup = getMenu().element().closest<HTMLElement>("[popover]")!;
      const rect = popup.getBoundingClientRect();
      expect(popup.dataset.side).toBe("top");
      expect(rect.left).toBeGreaterThanOrEqual(7);
      expect(rect.top).toBeGreaterThanOrEqual(7);
      expect(rect.right).toBeLessThanOrEqual(innerWidth - 7);
      expect(rect.bottom).toBeLessThanOrEqual(innerHeight - 7);
    });
  });

  describe("탐색과 실행", () => {
    it("방향키·Home·End로 순환하며 비활성 항목도 탐색한다", async () => {
      const onSelect = vi.fn();
      render(<Fixture itemProps={{ onSelect }} />);
      await openMenu();
      await userEvent.keyboard("{ArrowDown}");
      await expectFocusedItem("Cut");
      expect((getItem("Cut").element() as HTMLButtonElement).disabled).toBe(false);
      await userEvent.keyboard("{Enter}");
      expect(onSelect).not.toHaveBeenCalled();
      await getItem("Cut").click({ force: true });
      expect(onSelect).not.toHaveBeenCalled();
      await userEvent.keyboard("{ArrowUp}{ArrowUp}");
      await expectFocusedItem("Print");
      await userEvent.keyboard("{ArrowDown}{End}");
      await expectFocusedItem("Print");
      await userEvent.keyboard("{Home}");
      await expectFocusedItem("Copy");
    });

    it("이름 접두어와 같은 문자 반복으로 항목을 찾는다", async () => {
      render(<Fixture />);
      await openMenu();
      await userEvent.keyboard("p");
      await expectFocusedItem("Paste");
      await userEvent.keyboard("p");
      await expectFocusedItem("Print");
    });

    it("textValue로 복합 콘텐츠를 탐색한다", async () => {
      render(
        <Fixture
          body={
            <>
              <Menu.Item>Copy</Menu.Item>
              <Menu.Item textValue="Export">
                <span aria-hidden="true">⇧</span>다른 형식으로 저장
              </Menu.Item>
            </>
          }
        />,
      );
      await openMenu();
      await userEvent.keyboard("ex");
      await expectFocusedItem("다른 형식으로 저장");
    });

    it.each(["{Enter}", " "])("%s로 실행하면 닫고 호출 버튼으로 돌아간다", async (keys) => {
      const onSelect = vi.fn();
      render(<Fixture itemProps={{ onSelect }} />);
      await openMenu();
      await userEvent.keyboard(keys);
      expect(onSelect).toHaveBeenCalledExactlyOnceWith(
        expect.objectContaining({
          reason: "item-press",
          event: expect.any(MouseEvent),
          trigger: getTrigger(),
        }),
      );
      await vi.waitFor(() => expect(document.querySelector('[role="menu"]')).toBeNull());
      await expect.element(getTrigger()).toHaveFocus();
    });

    it("포인터 hover로 포커스를 옮기고 클릭으로 실행한다", async () => {
      const onSelect = vi.fn();
      render(<Fixture itemProps={{ onSelect }} />);
      await openMenu();
      await userEvent.hover(getItem("Paste"));
      await expectFocusedItem("Paste");
      expect(getItem("Paste").element().hasAttribute("data-highlighted")).toBe(true);
      await getItem("Paste").click();
      expect(onSelect).toHaveBeenCalledOnce();
      await expect.element(getTrigger()).toHaveFocus();
    });

    it("메뉴 버튼과 항목은 폼을 제출하지 않는다", async () => {
      const onSubmit = vi.fn();
      render(
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
        >
          <Fixture />
        </form>,
      );
      await openMenu();
      await getItem("Copy").click();
      expect(onSubmit).not.toHaveBeenCalled();
    });

    it.each(["ArrowDown", "Enter", "Escape"])("IME 조합의 %s를 가로채지 않는다", async (key) => {
      render(<Fixture />);
      await openMenu();
      const event = new KeyboardEvent("keydown", {
        key,
        isComposing: true,
        bubbles: true,
        cancelable: true,
      });
      flushSync(() => getItem("Copy").element().dispatchEvent(event));
      expect(event.defaultPrevented).toBe(false);
      await expectFocusedItem("Copy");
    });

    it("숨겨지거나 제거한 포커스 항목을 유효한 항목으로 복구한다", async () => {
      const view = render(<Fixture />);
      await openMenu();
      view.rerender(
        <Fixture
          body={
            <>
              <Menu.Item hidden>Copy</Menu.Item>
              <Menu.Item>Paste</Menu.Item>
            </>
          }
        />,
      );
      await expectFocusedItem("Paste");
      view.rerender(<Fixture body={<Menu.Item>Print</Menu.Item>} />);
      await expectFocusedItem("Print");
    });

    it("빈 메뉴도 포커스를 받고 Escape로 닫힌다", async () => {
      render(<Fixture body={null} />);
      await userEvent.click(getTrigger());
      await expect.element(getMenu()).toHaveFocus();
      await userEvent.keyboard("{ArrowDown}{ArrowUp}{Home}{End}{Escape}");
      await expect.element(getTrigger()).toHaveFocus();
    });
  });

  describe("하위 메뉴", () => {
    it.each([false, true])(
      "하위 defaultOpen=%s의 초기 포커스와 계층을 유지한다",
      async (childOpen) => {
        const onOpenChange = vi.fn();
        const onChildOpenChange = vi.fn();
        render(
          <Fixture
            nested
            rootProps={{ defaultOpen: true, onOpenChange }}
            childProps={{ defaultOpen: childOpen, onOpenChange: onChildOpenChange }}
          />,
        );
        await expectFocusedItem(childOpen ? "PDF" : "Copy");
        expect(document.querySelectorAll('[role="menu"]')).toHaveLength(childOpen ? 2 : 1);
        expect(onOpenChange).not.toHaveBeenCalled();
        expect(onChildOpenChange).not.toHaveBeenCalled();
      },
    );
    it.each([false, true])(
      "Portal=%s에서 부모 항목·이름·접근성 소유 관계를 연결한다",
      async (portal) => {
        render(<Fixture nested portal={portal} />);
        await openMenu();
        expect(getItem("Export").element().getAttribute("aria-expanded")).toBe("false");
        expect(getItem("Export").element().hasAttribute("aria-controls")).toBe(false);
        await openSubmenu();
        const child = getMenu("Export").element();
        const parent = getMenu().element();
        expect(getItem("Export").element().getAttribute("aria-haspopup")).toBe("menu");
        expect(getItem("Export").element().getAttribute("aria-controls")).toBe(child.id);
        expect(child.getAttribute("aria-labelledby")).toBe(getItem("Export").element().id);
        expect(parent.contains(child)).toBe(!portal);
        expect(parent.getAttribute("aria-owns")).toBe(portal ? child.id : null);
        expect(
          (await axe.run(document.body, { rules: { region: { enabled: false } } })).violations,
        ).toEqual([]);
        await userEvent.keyboard("{Escape}");
        await expectFocusedItem("Export");
        expect(getItem("Export").element().getAttribute("aria-expanded")).toBe("false");
        expect(parent.hasAttribute("aria-owns")).toBe(false);
        expect(document.querySelectorAll('[role="menu"]')).toHaveLength(1);
      },
    );

    it("3단계 메뉴에서 Escape가 현재 계층만 닫고 부모로 돌아간다", async () => {
      render(<Fixture nested />);
      await openMenu();
      await openSubmenu();
      await openSubmenu("Image");
      expect(document.querySelectorAll('[role="menu"]')).toHaveLength(3);
      await userEvent.keyboard("{Escape}");
      await expectFocusedItem("Image");
      expect(document.querySelectorAll('[role="menu"]')).toHaveLength(2);
      await userEvent.keyboard("{Escape}");
      await expectFocusedItem("Export");
      await userEvent.keyboard("{Escape}");
      await expect.element(getTrigger()).toHaveFocus();
    });

    it.each([false, true])(
      "RTL=%s에서 여는 방향과 부모로 돌아가는 방향을 적용한다",
      async (rtl) => {
        render(<Fixture nested rtl={rtl} />);
        await openMenu();
        await openSubmenu("Export", rtl ? "ArrowLeft" : "ArrowRight");
        await userEvent.keyboard(rtl ? "{ArrowRight}" : "{ArrowLeft}");
        await expectFocusedItem("Export");
        expect(document.querySelectorAll('[role="menu"]')).toHaveLength(1);
      },
    );

    it("하위 항목 실행이 전체 계층을 닫고 최초 호출 위치로 돌아간다", async () => {
      const onSelect = vi.fn();
      render(<Fixture nested itemProps={{ onSelect }} />);
      await openMenu();
      await openSubmenu();
      await openSubmenu("Image");
      await userEvent.keyboard("{Enter}");
      expect(onSelect).toHaveBeenCalledOnce();
      expect(document.querySelectorAll('[role="menu"]')).toHaveLength(0);
      await expect.element(getTrigger()).toHaveFocus();
      await openMenu();
      expect(document.querySelectorAll('[role="menu"]')).toHaveLength(1);
    });

    it("hover로 열면 부모 항목을 유지하고 클릭하면 하위 메뉴로 진입한다", async () => {
      render(<Fixture nested />);
      await openMenu();
      await userEvent.hover(getItem("Export"));
      await expect.element(getMenu("Export")).toBeVisible();
      await expectFocusedItem("Export");
      await getItem("Export").click();
      await expectFocusedItem("PDF");
    });

    it("형제 메뉴로 전환하면 이전 자손과 소유 관계를 정리한다", async () => {
      render(<Fixture nested />);
      await openMenu();
      await openSubmenu();
      await openSubmenu("Image");
      await userEvent.keyboard("{Escape}{Escape}{ArrowDown}{ArrowRight}");
      await expectFocusedItem("Link");
      expect(document.querySelectorAll('[role="menu"]')).toHaveLength(2);
      expect(getMenu().element().getAttribute("aria-owns")).toBe(getMenu("Share").element().id);
    });

    it("부모 메뉴의 다른 항목을 가리키면 하위 메뉴를 닫는다", async () => {
      render(<Fixture nested />);
      await openMenu();
      await openSubmenu();
      await userEvent.hover(getItem("Copy"));
      await expectFocusedItem("Copy");
      expect(document.querySelectorAll('[role="menu"]')).toHaveLength(1);
    });

    it("비활성 TriggerItem은 포커스를 받아도 하위 메뉴를 열지 않는다", async () => {
      render(<Fixture nested triggerItemProps={{ disabled: true }} />);
      await openMenu();
      await userEvent.keyboard("{ArrowDown}{ArrowDown}{ArrowRight}{Enter}");
      await expectFocusedItem("Export");
      expect(document.querySelectorAll('[role="menu"]')).toHaveLength(1);
    });

    it.each(["{Tab}", "{Shift>}{Tab}{/Shift}"])(
      "하위 메뉴의 %s는 전체 계층을 닫고 문서 순서로 이동한다",
      async (keys) => {
        render(<Fixture nested />);
        await openMenu();
        await openSubmenu();
        await openSubmenu("Image");
        await userEvent.keyboard(keys);
        expect(document.querySelectorAll('[role="menu"]')).toHaveLength(0);
        await expect
          .element(
            page.getByRole("button", { name: keys === "{Tab}" ? "After" : "Before", exact: true }),
          )
          .toHaveFocus();
      },
    );
  });

  describe("닫기·제어 상태·변경 취소", () => {
    it("외부 클릭과 포커스 이동이 계층을 닫고 목적지 포커스를 유지한다", async () => {
      render(<Fixture nested />);
      await openMenu();
      await openSubmenu();
      await page.getByRole("button", { name: "After", exact: true }).click();
      expect(document.querySelectorAll('[role="menu"]')).toHaveLength(0);
      await expect.element(page.getByRole("button", { name: "After", exact: true })).toHaveFocus();
      await openMenu();
      await openSubmenu();
      page.getByRole("button", { name: "Before", exact: true }).element().focus();
      await vi.waitFor(() => expect(document.querySelectorAll('[role="menu"]')).toHaveLength(0));
      await expect.element(page.getByRole("button", { name: "Before", exact: true })).toHaveFocus();
    });

    it("다른 영역의 우클릭은 기존 메뉴를 닫는다", async () => {
      render(<Fixture context nested />);
      await openMenu(true);
      await openSubmenu();
      await page.getByText("Outside", { exact: true }).click({ button: "right" });
      await vi.waitFor(() => expect(document.querySelectorAll('[role="menu"]')).toHaveLength(0));
    });

    it("작업이 별도 요소로 옮긴 포커스를 유지한다", async () => {
      render(
        <Fixture
          itemProps={{
            onSelect: () =>
              page.getByRole("button", { name: "After", exact: true }).element().focus(),
          }}
        />,
      );
      await openMenu();
      await userEvent.keyboard("{Enter}");
      await expect.element(page.getByRole("button", { name: "After", exact: true })).toHaveFocus();
    });

    it("제어 부모가 최상위와 하위 메뉴 요청을 반영한다", async () => {
      render(<ControlledFixture />);
      await openMenu();
      await openSubmenu();
      await userEvent.keyboard("{Escape}");
      await expectFocusedItem("Export");
      await userEvent.keyboard("{Escape}");
      await expect.element(getTrigger()).toHaveFocus();
    });

    it("열기·닫기 요청을 취소할 수 있다", async () => {
      let cancel = true;
      render(
        <Fixture
          rootProps={{
            onOpenChange: (_, details) => {
              if (cancel) details.cancel();
            },
          }}
        />,
      );
      await userEvent.click(getTrigger());
      expect(document.querySelector('[role="menu"]')).toBeNull();
      cancel = false;
      await openMenu();
      cancel = true;
      await userEvent.keyboard("{Escape}");
      await expectFocusedItem("Copy");
      expect(document.querySelectorAll('[role="menu"]')).toHaveLength(1);
    });

    it("항목 실행 취소는 부모·자식 메뉴를 유지한다", async () => {
      render(<Fixture nested itemProps={{ onSelect: (details) => details.cancel() }} />);
      await openMenu();
      await openSubmenu();
      await userEvent.keyboard("{Enter}");
      await expectFocusedItem("PDF");
      expect(document.querySelectorAll('[role="menu"]')).toHaveLength(2);
    });

    it("하위 메뉴의 Escape 닫기 취소는 현재 포커스와 계층을 유지한다", async () => {
      render(
        <Fixture
          nested
          childProps={{
            onOpenChange: (next, details) => {
              if (!next) details.cancel();
            },
          }}
        />,
      );
      await openMenu();
      await openSubmenu();
      await userEvent.keyboard("{Escape}");
      await expectFocusedItem("PDF");
      expect(document.querySelectorAll('[role="menu"]')).toHaveLength(2);
    });

    it("전체 계층의 Tab 닫기 취소는 네이티브 Tab 이동도 막는다", async () => {
      render(
        <Fixture
          nested
          rootProps={{
            onOpenChange: (next, details) => {
              if (!next) details.cancel();
            },
          }}
        />,
      );
      await openMenu();
      await openSubmenu();
      await userEvent.keyboard("{Tab}");
      await expectFocusedItem("PDF");
      expect(document.querySelectorAll('[role="menu"]')).toHaveLength(2);
    });

    it("형제 전환 닫기를 취소하면 기존 하위 메뉴를 유지한다", async () => {
      render(
        <Fixture
          nested
          contentProps={{ onFocusCapture: preventDefault }}
          childProps={{
            onOpenChange: (next, details) => {
              if (!next && details.reason === "sibling-open") details.cancel();
            },
          }}
        />,
      );
      await openMenu();
      await userEvent.hover(getItem("Export"));
      await expect.element(getMenu("Export")).toBeVisible();
      // Keep the previous submenu open while focusing its sibling, to isolate sibling-open.
      await userEvent.hover(getItem("Share"));
      await vi.waitFor(() => expect(document.querySelectorAll('[role="menu"]')).toHaveLength(2));
      await expect.element(getMenu("Export")).toBeVisible();
      expect(page.getByRole("menu", { name: "Share", exact: true }).query()).toBeNull();
    });

    it("사용자 preventDefault로 호출·항목 실행·탐색을 막는다", async () => {
      const view = render(<Fixture triggerProps={{ onClick: preventDefault }} />);
      await userEvent.click(getTrigger());
      expect(document.querySelector('[role="menu"]')).toBeNull();
      view.rerender(<Fixture context contextProps={{ onContextMenu: preventDefault }} />);
      await userEvent.click(getTrigger(), { button: "right" });
      expect(document.querySelector('[role="menu"]')).toBeNull();
      view.rerender(
        <Fixture
          itemProps={{ onClick: preventDefault }}
          contentProps={{ onKeyDown: preventDefault }}
        />,
      );
      await openMenu();
      await userEvent.keyboard("{ArrowDown}");
      await expectFocusedItem("Copy");
      await getItem("Copy").click();
      expect(document.querySelectorAll('[role="menu"]')).toHaveLength(1);
    });

    it.each([false, true])("ContextTrigger=%s의 disabled는 호출을 막는다", async (context) => {
      const onOpenChange = vi.fn();
      render(
        <Fixture
          context={context}
          rootProps={{ onOpenChange }}
          triggerProps={{ disabled: true }}
          contextProps={{ disabled: true }}
        />,
      );
      await userEvent.click(getTrigger(), context ? { button: "right" } : { force: true });
      expect(onOpenChange).not.toHaveBeenCalled();
      expect(document.querySelector('[role="menu"]')).toBeNull();
    });
  });

  describe("합성과 생명주기", () => {
    it("render 요소가 제공한 메뉴 이름을 유지한다", async () => {
      render(
        <Menu.Root>
          <Menu.Trigger tabIndex={0}>Actions</Menu.Trigger>
          <Popup render={<CustomDiv aria-label="Custom actions" />}>
            <Menu.Item>Copy</Menu.Item>
          </Popup>
        </Menu.Root>,
      );
      await page.getByRole("button", { name: "Actions", exact: true }).click();
      await expectFocusedItem("Copy");
      await expect.element(getMenu("Custom actions")).toBeVisible();
      expect(getMenu("Custom actions").element().hasAttribute("aria-labelledby")).toBe(false);
    });
    it("render·Ref·사용자 ID와 이벤트를 실제 요소에 합성한다", async () => {
      const triggerRef = createRef<HTMLButtonElement>();
      const contentRef = createRef<HTMLDivElement>();
      const portalRef = createRef<HTMLDivElement>();
      const positionerRef = createRef<HTMLDivElement>();
      const itemRef = createRef<HTMLButtonElement>();
      const separatorRef = createRef<HTMLHRElement>();
      const calls: string[] = [];
      render(
        <Menu.Root>
          <Menu.Trigger
            tabIndex={0}
            id="custom-menu-trigger"
            render={<CustomButton ref={triggerRef} onClick={() => calls.push("render")} />}
            onClick={() => calls.push("part")}
          >
            Actions
          </Menu.Trigger>
          <Menu.Portal render={<CustomDiv ref={portalRef} />}>
            <Menu.Positioner render={<CustomDiv ref={positionerRef} />}>
              <Menu.Content render={<CustomDiv ref={contentRef} />}>
                <Menu.Item render={<CustomButton ref={itemRef} />}>Copy</Menu.Item>
                <Menu.Separator render={<hr ref={separatorRef} />} />
              </Menu.Content>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>,
      );
      await page.getByRole("button", { name: "Actions", exact: true }).click();
      await expectFocusedItem("Copy");
      expect(calls).toEqual(["render", "part"]);
      for (const ref of [triggerRef, contentRef, portalRef, positionerRef, itemRef, separatorRef])
        expect(ref.current?.isConnected).toBe(true);
      expect(contentRef.current?.getAttribute("aria-labelledby")).toBe("custom-menu-trigger");
      expect(contentRef.current?.hasAttribute("data-custom")).toBe(true);
    });

    it("링크 합성의 Space 활성화와 실행 취소를 연결한다", async () => {
      const onSelect = vi.fn((details) => details.cancel());
      render(
        <Fixture
          body={
            <Menu.Item render={<a href="#menu-test-destination" />} onSelect={onSelect}>
              Copy
            </Menu.Item>
          }
        />,
      );
      await openMenu();
      await userEvent.keyboard(" ");
      expect(onSelect).toHaveBeenCalledOnce();
      expect(location.hash).not.toBe("#menu-test-destination");
      await expectFocusedItem("Copy");
    });

    it("StrictMode hydration 후 메뉴와 하위 메뉴를 열고 정리한다", async () => {
      const children = (
        <StrictMode>
          <Fixture nested />
        </StrictMode>
      );
      const container = document.createElement("div");
      container.innerHTML = renderToString(children);
      document.body.append(container);
      const onRecoverableError = vi.fn();
      const root = hydrateRoot(container, children, { onRecoverableError });
      fixtures.push({ container, root });
      await openMenu();
      await openSubmenu();
      expect(onRecoverableError).not.toHaveBeenCalled();
      await userEvent.keyboard("{Escape}{Escape}");
      await expect.element(getTrigger()).toHaveFocus();
    });
  });
});

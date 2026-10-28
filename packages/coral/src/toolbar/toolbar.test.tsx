import axe from "axe-core";
import { createRef, StrictMode, useState, type ComponentProps, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { createRoot, hydrateRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import { Toolbar, type ToolbarRootProps, type ToolbarSeparatorProps } from ".";
import { Toolbar as RootExportToolbar } from "..";
import { Toggle, type ToggleChangeEventDetails } from "../toggle";

const fixtures: Array<{ container: HTMLDivElement; root: Root }> = [];

afterEach(() => {
  for (const entry of fixtures) {
    flushSync(() => entry.root.unmount());
    entry.container.remove();
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

function fixture(rootProps: ToolbarRootProps = {}, separatorProps: ToolbarSeparatorProps = {}) {
  return (
    <>
      <button data-before="">이전</button>
      <Toolbar.Root aria-label="문서 편집" {...rootProps}>
        <Toolbar.Group aria-label="편집 명령">
          <Toolbar.Button>실행 취소</Toolbar.Button>
          <Toolbar.Button render={<Toggle.Root defaultPressed />}>굵게</Toolbar.Button>
        </Toolbar.Group>
        <Toolbar.Separator {...separatorProps} />
        <Toolbar.Link href="#help">도움말</Toolbar.Link>
      </Toolbar.Root>
      <button data-after="">다음</button>
    </>
  );
}

function getItems(container: HTMLElement) {
  return [...container.querySelectorAll<HTMLElement>("[data-toolbar-item]")];
}

function getTabStops(container: HTMLElement) {
  return getItems(container).map((item) => item.tabIndex);
}

function CustomButton(props: ComponentProps<"button">) {
  return <button {...props} data-custom="" />;
}

function SubmitButton({ type = "submit", ...props }: ComponentProps<"button">) {
  return <button {...props} type={type} />;
}

function CustomLink(props: ComponentProps<"a">) {
  return <a {...props} data-custom="" />;
}

function CustomContainer(props: ComponentProps<"div">) {
  return <div {...props} data-custom="" />;
}

function preventArrowRight(event: React.KeyboardEvent) {
  if (event.key === "ArrowRight") {
    event.preventDefault();
  }
}

// Native buttons and links own activation, navigation and form actions.
// Verify Toolbar's focus management and composition, not the browser's full matrix
// or user CSS. Type-only assertions are unnecessary for these native Props contracts.
describe("Toolbar", () => {
  describe("구조와 접근성", () => {
    it("루트와 하위 경로에서 같은 Parts를 제공한다", () => {
      expect(RootExportToolbar).toBe(Toolbar);
    });

    it.each(["horizontal", "vertical"] as const)(
      "%s 방향의 Role과 이름을 제공하고 axe 위반이 없다",
      async (orientation) => {
        const { container } = render(fixture({ orientation }));
        const root = container.querySelector<HTMLElement>("[role='toolbar']")!;
        const group = container.querySelector<HTMLElement>("[role='group']")!;
        const controls = getItems(container);

        expect(root.tagName).toBe("DIV");
        expect(root.getAttribute("aria-orientation")).toBe(orientation);
        expect(root.hasAttribute("tabindex")).toBe(false);
        expect(group.tagName).toBe("DIV");
        expect(group.hasAttribute("tabindex")).toBe(false);
        expect(group.hasAttribute("aria-orientation")).toBe(false);
        expect(
          [root, group, ...controls].every((part) => part.dataset.orientation === orientation),
        ).toBe(true);
        expect(controls.map((control) => control.tagName)).toEqual(["BUTTON", "BUTTON", "A"]);
        expect(controls[1]!.getAttribute("aria-pressed")).toBe("true");
        // A pressed Toggle does not become the Toolbar's initial tab stop.
        expect(getTabStops(container)).toEqual([0, -1, -1]);
        await expect.element(page.getByRole("toolbar", { name: "문서 편집" })).toBeVisible();
        await expect.element(page.getByRole("group", { name: "편집 명령" })).toBeVisible();
        await expect
          .element(page.getByRole("button", { name: "굵게", pressed: true }))
          .toBeVisible();
        await expect.element(page.getByRole("link", { name: "도움말" })).toBeVisible();
        expect((await axe.run(container)).violations).toEqual([]);
      },
    );

    it("Root와 Group에 aria-labelledby로 이름을 제공할 수 있다", async () => {
      render(
        <>
          <span id="toolbar-label">문서 도구</span>
          <Toolbar.Root aria-labelledby="toolbar-label">
            <Toolbar.Group aria-labelledby="group-label">
              <span id="group-label">클립보드</span>
              <Toolbar.Button>복사</Toolbar.Button>
              <Toolbar.Button>붙여넣기</Toolbar.Button>
            </Toolbar.Group>
            <Toolbar.Button>실행 취소</Toolbar.Button>
          </Toolbar.Root>
        </>,
      );

      await expect.element(page.getByRole("toolbar", { name: "문서 도구" })).toBeVisible();
      await expect.element(page.getByRole("group", { name: "클립보드" })).toBeVisible();
    });

    it.each(["horizontal", "vertical"] as const)(
      "서버 HTML에 %s 방향과 Group·Toggle의 의미를 포함한다",
      (orientation) => {
        const container = document.createElement("div");
        container.innerHTML = renderToString(fixture({ orientation }));

        expect(container.querySelector("[role='toolbar']")!.getAttribute("aria-orientation")).toBe(
          orientation,
        );
        expect(container.querySelector("[role='group']")!.getAttribute("aria-label")).toBe(
          "편집 명령",
        );
        expect(container.querySelector("[aria-pressed]")!.getAttribute("aria-pressed")).toBe(
          "true",
        );
        expect(container.querySelector("a")!.getAttribute("href")).toBe("#help");
        expect(getTabStops(container)).toEqual([0, 0, 0]);
      },
    );

    it("hydration 이후 하나의 Tab 진입점으로 정리한다", async () => {
      const children = fixture();
      const container = document.createElement("div");
      container.innerHTML = renderToString(children);
      document.body.append(container);
      expect(getTabStops(container)).toEqual([0, 0, 0]);
      const root = hydrateRoot(container, children);
      fixtures.push({ container, root });

      await vi.waitFor(() => expect(getTabStops(container)).toEqual([0, -1, -1]));
      container.querySelector<HTMLButtonElement>("[data-before]")!.focus();
      await userEvent.tab();
      expect(document.activeElement).toBe(getItems(container)[0]);
      await userEvent.tab();
      expect(document.activeElement).toBe(container.querySelector("[data-after]"));
    });

    it.each([
      {
        orientation: "horizontal" as const,
        decorative: false,
        separatorOrientation: "vertical",
        ariaOrientation: "vertical",
      },
      {
        orientation: "horizontal" as const,
        decorative: true,
        separatorOrientation: "vertical",
        ariaOrientation: null,
      },
      {
        orientation: "vertical" as const,
        decorative: false,
        separatorOrientation: "horizontal",
        ariaOrientation: null,
      },
      {
        orientation: "vertical" as const,
        decorative: true,
        separatorOrientation: "horizontal",
        ariaOrientation: null,
      },
    ])(
      "$orientation, decorative=$decorative에서 구분선에 필요한 ARIA만 제공한다",
      async ({ orientation, decorative, separatorOrientation, ariaOrientation }) => {
        const { container, rerender } = render(fixture({ orientation }, { decorative }));
        const separator = container.querySelector("hr")!;

        expect(separator.dataset.orientation).toBe(separatorOrientation);
        expect(separator.getAttribute("aria-orientation")).toBe(ariaOrientation);
        expect(separator.getAttribute("aria-hidden")).toBe(decorative ? "true" : null);
        expect(separator.hasAttribute("tabindex")).toBe(false);
        if (decorative) {
          await expect.element(page.getByRole("separator")).not.toBeInTheDocument();
        } else {
          await expect.element(page.getByRole("separator")).toBeInTheDocument();
        }

        rerender(fixture({ orientation }, { decorative: !decorative }));
        expect(separator.getAttribute("aria-hidden")).toBe(decorative ? null : "true");
        expect(separator.getAttribute("aria-orientation")).toBe(
          decorative && orientation === "horizontal" ? "vertical" : null,
        );
      },
    );
  });

  describe("키보드와 포커스", () => {
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
      "$orientation 방향키로 Group 경계를 넘어 버튼과 링크 사이를 이동한다",
      async ({ orientation, next, previous, ignored }) => {
        const { container } = render(fixture({ orientation }));
        const controls = getItems(container);
        controls[0]!.focus();

        await userEvent.keyboard(`{${ignored}}`);
        expect(document.activeElement).toBe(controls[0]);
        await userEvent.keyboard(`{${next}}`);
        expect(document.activeElement).toBe(controls[1]);
        await userEvent.keyboard(`{${next}}`);
        expect(document.activeElement).toBe(controls[2]);
        await userEvent.keyboard(`{${previous}}`);
        expect(document.activeElement).toBe(controls[1]);
        expect(controls[1]!.getAttribute("aria-pressed")).toBe("true");
      },
    );

    it.each([true, false])("loopFocus=%s에서 경계와 Home·End를 처리한다", async (loopFocus) => {
      const { container } = render(fixture({ loopFocus }));
      const controls = getItems(container);
      controls[0]!.focus();

      await userEvent.keyboard("{ArrowLeft}");
      expect(document.activeElement).toBe(controls[loopFocus ? 2 : 0]);
      await userEvent.keyboard("{End}");
      expect(document.activeElement).toBe(controls[2]);
      await userEvent.keyboard("{ArrowRight}");
      expect(document.activeElement).toBe(controls[loopFocus ? 0 : 2]);
      await userEvent.keyboard("{Home}");
      expect(document.activeElement).toBe(controls[0]);
    });

    it("Tab·Shift+Tab으로 Toolbar를 한 번 방문하고 마지막 키보드·포인터 포커스를 기억한다", async () => {
      const { container } = render(fixture());
      const controls = getItems(container);
      const before = container.querySelector<HTMLButtonElement>("[data-before]")!;
      const after = container.querySelector<HTMLButtonElement>("[data-after]")!;
      before.focus();

      await userEvent.tab();
      expect(document.activeElement).toBe(controls[0]);
      await userEvent.keyboard("{End}");
      await userEvent.tab();
      expect(document.activeElement).toBe(after);
      await userEvent.tab({ shift: true });
      expect(document.activeElement).toBe(controls[2]);
      await userEvent.tab({ shift: true });
      expect(document.activeElement).toBe(before);

      await userEvent.click(controls[1]!);
      await userEvent.tab();
      expect(document.activeElement).toBe(after);
      await userEvent.tab({ shift: true });
      expect(document.activeElement).toBe(controls[1]);
      expect(getTabStops(container)).toEqual([-1, 0, -1]);
    });

    it("상위 RTL에 따라 수평 이동을 바꾸고 수직 이동은 유지한다", async () => {
      const { container, rerender } = render(<div dir="rtl">{fixture()}</div>);
      const controls = getItems(container);
      controls[0]!.focus();

      await userEvent.keyboard("{ArrowLeft}");
      expect(document.activeElement).toBe(controls[1]);
      await userEvent.keyboard("{ArrowRight}");
      expect(document.activeElement).toBe(controls[0]);

      rerender(<div dir="rtl">{fixture({ orientation: "vertical" })}</div>);
      await userEvent.keyboard("{ArrowDown}");
      expect(document.activeElement).toBe(controls[1]);
      await userEvent.keyboard("{ArrowUp}");
      expect(document.activeElement).toBe(controls[0]);
    });

    it.each(["Alt", "Control", "Meta", "Shift"])(
      "%s 보조 키가 있으면 내부 이동을 처리하지 않는다",
      async (modifier) => {
        const { container } = render(fixture());
        getItems(container)[0]!.focus();

        await userEvent.keyboard(`{${modifier}>}{ArrowRight}{/${modifier}}`);
        expect(document.activeElement).toBe(getItems(container)[0]);
      },
    );

    it.each(["root", "group", "button", "link"])(
      "%s의 preventDefault로 내부 이동을 취소한다",
      async (part) => {
        const { container } = render(
          <Toolbar.Root
            aria-label="편집"
            onKeyDown={part === "root" ? preventArrowRight : undefined}
          >
            <Toolbar.Group onKeyDown={part === "group" ? preventArrowRight : undefined}>
              <Toolbar.Button onKeyDown={part === "button" ? preventArrowRight : undefined}>
                처음
              </Toolbar.Button>
            </Toolbar.Group>
            <Toolbar.Link href="#help" onKeyDown={part === "link" ? preventArrowRight : undefined}>
              도움말
            </Toolbar.Link>
          </Toolbar.Root>,
        );
        const controls = getItems(container);
        const active = controls[part === "link" ? 1 : 0]!;
        active.focus();

        await userEvent.keyboard("{ArrowRight}");
        expect(document.activeElement).toBe(active);
        await userEvent.keyboard("{End}");
        expect(document.activeElement).toBe(controls[1]);
      },
    );

    it("disabled·hidden·inert·CSS 비가시 요소를 이동 대상에서 제외한다", async () => {
      const { container } = render(
        <Toolbar.Root aria-label="편집">
          <Toolbar.Button>처음</Toolbar.Button>
          <Toolbar.Button disabled>disabled</Toolbar.Button>
          <Toolbar.Button hidden>hidden</Toolbar.Button>
          <div inert>
            <Toolbar.Button>inert</Toolbar.Button>
          </div>
          <div style={{ visibility: "hidden" }}>
            <Toolbar.Button>CSS</Toolbar.Button>
          </div>
          <Toolbar.Separator />
          <Toolbar.Link href="#last">마지막</Toolbar.Link>
        </Toolbar.Root>,
      );
      const controls = getItems(container);
      expect(getTabStops(container)).toEqual([0, -1, -1, -1, -1, -1]);
      controls[0]!.focus();

      await userEvent.keyboard("{ArrowRight}");
      expect(document.activeElement).toBe(controls[5]);
      await userEvent.keyboard("{ArrowLeft}");
      expect(document.activeElement).toBe(controls[0]);
    });

    it("fieldset의 disabled 전파와 첫 legend 예외를 반영한다", async () => {
      const { container } = render(
        <Toolbar.Root aria-label="편집">
          <fieldset disabled>
            <legend>
              <Toolbar.Button>처음</Toolbar.Button>
            </legend>
            <Toolbar.Button>disabled</Toolbar.Button>
          </fieldset>
          <Toolbar.Button>마지막</Toolbar.Button>
        </Toolbar.Root>,
      );
      const controls = getItems(container);
      expect(getTabStops(container)).toEqual([0, -1, -1]);
      controls[0]!.focus();

      await userEvent.keyboard("{ArrowRight}");
      expect(document.activeElement).toBe(controls[2]);
    });

    it("모든 버튼이 disabled이면 Toolbar의 Tab 진입점을 만들지 않는다", async () => {
      const { container } = render(
        <>
          <button data-before="">이전</button>
          <Toolbar.Root aria-label="편집">
            <Toolbar.Button disabled>복사</Toolbar.Button>
            <Toolbar.Button disabled>붙여넣기</Toolbar.Button>
            <Toolbar.Button disabled>잘라내기</Toolbar.Button>
          </Toolbar.Root>
          <button data-after="">다음</button>
        </>,
      );
      expect(getTabStops(container)).toEqual([-1, -1, -1]);
      container.querySelector<HTMLButtonElement>("[data-before]")!.focus();

      await userEvent.tab();
      expect(document.activeElement).toBe(container.querySelector("[data-after]"));
    });

    it("중첩 Toolbar의 방향키 이동과 Tab 진입점을 독립적으로 관리한다", async () => {
      const { container } = render(
        <Toolbar.Root aria-label="바깥">
          <Toolbar.Button>바깥 처음</Toolbar.Button>
          <Toolbar.Group>
            <Toolbar.Root aria-label="안쪽">
              <Toolbar.Button>안쪽 처음</Toolbar.Button>
              <Toolbar.Button>안쪽 마지막</Toolbar.Button>
            </Toolbar.Root>
          </Toolbar.Group>
          <Toolbar.Button>바깥 마지막</Toolbar.Button>
        </Toolbar.Root>,
      );
      const controls = getItems(container);
      controls[0]!.focus();

      await userEvent.keyboard("{ArrowRight}");
      expect(document.activeElement).toBe(controls[3]);
      controls[1]!.focus();
      await userEvent.keyboard("{ArrowRight}");
      expect(document.activeElement).toBe(controls[2]);
      expect(getTabStops(container)).toEqual([-1, -1, 0, 0]);
    });
  });

  describe("동적 변경", () => {
    it("StrictMode에서 자식만 재렌더링되어도 추가·재배치·삭제된 실제 순서를 반영한다", async () => {
      let update: (values: string[]) => void;
      function Children() {
        const [values, setValues] = useState(["a", "b", "c"]);
        update = setValues;
        return values.map((value) => <Toolbar.Button key={value}>{value}</Toolbar.Button>);
      }
      const { container } = render(
        <StrictMode>
          <Toolbar.Root aria-label="편집">
            <Children />
          </Toolbar.Root>
        </StrictMode>,
      );
      const focused = getItems(container)[1]!;
      focused.focus();

      flushSync(() => update(["c", "b", "a"]));
      await vi.waitFor(() => expect(document.activeElement).toBe(focused));
      await userEvent.keyboard("{Home}");
      expect(document.activeElement!.textContent).toBe("c");

      flushSync(() => update(["a", "b"]));
      await vi.waitFor(() => expect(document.activeElement).toBe(getItems(container)[0]));
      expect(document.activeElement!.textContent).toBe("a");

      flushSync(() => update(["d", "a", "b"]));
      await vi.waitFor(() => expect(getTabStops(container)).toEqual([-1, 0, -1]));
      await userEvent.keyboard("{Home}");
      expect(document.activeElement!.textContent).toBe("d");
      await userEvent.keyboard("{End}");
      expect(document.activeElement!.textContent).toBe("b");
    });

    it.each(["disabled", "hidden", "inert"] as const)(
      "포커스 요소의 %s 변경을 감지해 복구하고 사용 가능한 요소가 없으면 진입점을 제거한다",
      async (attribute) => {
        const { container } = render(fixture());
        const controls = getItems(container);
        const button = controls[1] as HTMLButtonElement;
        button.focus();
        button[attribute] = true;

        await vi.waitFor(() => {
          expect(document.activeElement).toBe(controls[0]);
          expect(getTabStops(container)).toEqual([0, -1, -1]);
        });
        (controls[0] as HTMLButtonElement).disabled = true;
        controls[2]!.hidden = true;
        await vi.waitFor(() => expect(getTabStops(container)).toEqual([-1, -1, -1]));

        button[attribute] = false;
        await vi.waitFor(() => expect(getTabStops(container)).toEqual([-1, 0, -1]));
      },
    );

    it("Toolbar 밖으로 이동한 포커스를 자식 변경으로 가져오지 않는다", async () => {
      const { container } = render(fixture());
      const controls = getItems(container);
      controls[1]!.focus();
      await userEvent.tab();
      const outside = document.activeElement;

      (controls[1] as HTMLButtonElement).disabled = true;
      await vi.waitFor(() => expect(getTabStops(container)).toEqual([0, -1, -1]));
      expect(document.activeElement).toBe(outside);
    });
  });

  describe("합성과 네이티브 동작", () => {
    it.each([false, true])(
      "Toggle의 변경 취소=%s를 유지하고 방향키로 눌림을 바꾸지 않는다",
      async (cancel) => {
        const calls: string[] = [];
        const onPressedChange = vi.fn((_pressed: boolean, details: ToggleChangeEventDetails) => {
          calls.push("change");
          if (cancel) {
            details.cancel();
          }
        });
        const { container } = render(
          <Toolbar.Root aria-label="편집">
            <Toolbar.Button>처음</Toolbar.Button>
            <Toolbar.Button
              render={
                <Toggle.Root
                  onPressedChange={onPressedChange}
                  onClick={() => calls.push("render")}
                />
              }
              onClick={() => calls.push("part")}
            >
              굵게
            </Toolbar.Button>
            <Toolbar.Button>마지막</Toolbar.Button>
          </Toolbar.Root>,
        );
        const controls = getItems(container);
        controls[0]!.focus();

        await userEvent.keyboard("{ArrowRight}");
        expect(document.activeElement).toBe(controls[1]);
        expect(onPressedChange).not.toHaveBeenCalled();
        expect(controls[1]!.getAttribute("aria-pressed")).toBe("false");
        await userEvent.keyboard(" ");
        expect(calls).toEqual(["render", "part", "change"]);
        expect(controls[1]!.getAttribute("aria-pressed")).toBe(String(!cancel));
        await userEvent.keyboard("{ArrowRight}");
        expect(document.activeElement).toBe(controls[2]);
        expect(onPressedChange).toHaveBeenCalledTimes(1);
      },
    );

    it("직접 배치한 Toggle은 Toolbar의 포커스 이동에 자동 참여하지 않는다", async () => {
      const { container } = render(
        <Toolbar.Root aria-label="편집">
          <Toolbar.Button>처음</Toolbar.Button>
          <Toggle.Root>직접 배치</Toggle.Root>
          <Toolbar.Button>마지막</Toolbar.Button>
        </Toolbar.Root>,
      );
      const buttons = [...container.querySelectorAll("button")];
      expect(buttons[1]!.hasAttribute("data-toolbar-item")).toBe(false);
      expect(buttons[1]!.tabIndex).toBe(0);
      buttons[0]!.focus();

      await userEvent.keyboard("{ArrowRight}");
      expect(document.activeElement).toBe(buttons[2]);
      buttons[1]!.focus();
      await userEvent.keyboard("{ArrowRight}");
      expect(document.activeElement).toBe(buttons[1]);
    });

    it("각 Part의 render에서 Props·이벤트·Ref와 역할을 합성한다", async () => {
      const calls: string[] = [];
      const rootRef = createRef<HTMLDivElement>();
      const groupRef = createRef<HTMLDivElement>();
      const groupRenderRef = createRef<HTMLDivElement>();
      const buttonRef = createRef<HTMLButtonElement>();
      const buttonRenderRef = createRef<HTMLButtonElement>();
      const linkRef = createRef<HTMLAnchorElement>();
      const separatorRef = createRef<HTMLHRElement>();
      const { container } = render(
        <Toolbar.Root ref={rootRef} render={<CustomContainer />} aria-label="편집">
          <Toolbar.Group
            ref={groupRef}
            render={<CustomContainer ref={groupRenderRef} role="presentation" />}
            aria-label="명령"
          >
            <Toolbar.Button
              ref={buttonRef}
              className="part"
              render={
                <CustomButton
                  ref={buttonRenderRef}
                  className="render"
                  onClick={() => calls.push("render")}
                />
              }
              onClick={() => calls.push("part")}
            >
              실행
            </Toolbar.Button>
          </Toolbar.Group>
          <Toolbar.Separator ref={separatorRef} render={<div />} />
          <Toolbar.Link
            ref={linkRef}
            href="#help"
            target="_blank"
            rel="noreferrer"
            render={<CustomLink />}
          >
            도움말
          </Toolbar.Link>
        </Toolbar.Root>,
      );
      const controls = getItems(container);
      expect(rootRef.current!.tagName).toBe("DIV");
      expect(rootRef.current!.hasAttribute("data-custom")).toBe(true);
      expect(groupRef.current).toBe(container.querySelector("[role='group']"));
      expect(groupRenderRef.current).toBe(groupRef.current);
      expect(groupRef.current!.hasAttribute("data-custom")).toBe(true);
      expect(buttonRef.current).toBe(controls[0]);
      expect(buttonRenderRef.current).toBe(buttonRef.current);
      expect(buttonRef.current!.className).toBe("render part");
      expect(linkRef.current).toBe(controls[1]);
      expect(linkRef.current!.hasAttribute("data-custom")).toBe(true);
      expect(linkRef.current!.getAttribute("href")).toBe("#help");
      expect(linkRef.current!.target).toBe("_blank");
      expect(linkRef.current!.rel).toBe("noreferrer");
      expect(separatorRef.current!.tagName).toBe("DIV");
      expect(separatorRef.current!.getAttribute("role")).toBe("separator");

      await userEvent.click(controls[0]!);
      expect(calls).toEqual(["render", "part"]);
      await userEvent.keyboard("{ArrowRight}");
      expect(document.activeElement).toBe(controls[1]);
      expect((await axe.run(container)).violations).toEqual([]);
    });

    it("render 요소의 onKeyDown에서 내부 이동을 취소할 수 있다", async () => {
      const { container } = render(
        <Toolbar.Root aria-label="편집">
          <Toolbar.Button render={<CustomButton onKeyDown={preventArrowRight} />}>
            처음
          </Toolbar.Button>
          <Toolbar.Button>마지막</Toolbar.Button>
        </Toolbar.Root>,
      );
      const controls = getItems(container);
      controls[0]!.focus();

      await userEvent.keyboard("{ArrowRight}");
      expect(document.activeElement).toBe(controls[0]);
      await userEvent.keyboard("{End}");
      expect(document.activeElement).toBe(controls[1]);
    });

    it("기본 button에 type을 보충하고 render 대상의 기본값과 명시적인 type을 보존한다", async () => {
      const onSubmit = vi.fn((event: React.SyntheticEvent) => event.preventDefault());
      const { container } = render(
        <form onSubmit={onSubmit}>
          <Toolbar.Root aria-label="편집">
            <Toolbar.Button>기본</Toolbar.Button>
            <Toolbar.Button type={undefined}>undefined</Toolbar.Button>
            <Toolbar.Button render={<SubmitButton />}>사용자 기본값</Toolbar.Button>
            <Toolbar.Button render={<button type="submit" />}>요소 속성</Toolbar.Button>
            <Toolbar.Button render={<SubmitButton />} type="button">
              명시적 재정의
            </Toolbar.Button>
            <Toolbar.Button type="submit">명시적 제출</Toolbar.Button>
          </Toolbar.Root>
        </form>,
      );
      const buttons = [...container.querySelectorAll("button")];
      expect(buttons.map((button) => button.type)).toEqual([
        "button",
        "button",
        "submit",
        "submit",
        "button",
        "submit",
      ]);

      await userEvent.click(buttons[0]!);
      await userEvent.keyboard("{Enter}");
      await userEvent.click(buttons[1]!);
      await userEvent.click(buttons[4]!);
      expect(onSubmit).not.toHaveBeenCalled();
      await userEvent.click(buttons[2]!);
      await userEvent.click(buttons[3]!);
      await userEvent.click(buttons[5]!);
      expect(onSubmit).toHaveBeenCalledTimes(3);
    });
  });
});

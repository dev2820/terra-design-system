import axe from "axe-core";
import { createRef, StrictMode, useState, type ComponentProps, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { createRoot, hydrateRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { userEvent } from "vitest/browser";

import {
  Popover,
  type PopoverChangeEventDetails,
  type PopoverCloseProps,
  type PopoverContentProps,
  type PopoverPositionerProps,
  type PopoverRootProps,
  type PopoverTriggerProps,
} from ".";
import { Popover as RootExportPopover } from "..";

const fixtures: Array<{ container: HTMLDivElement; root: Root }> = [];
const cleanups: Array<() => void> = [];

afterEach(async () => {
  for (const { root, container } of fixtures.splice(0).toReversed()) {
    flushSync(() => root.unmount());
    container.remove();
  }
  // Focus restoration runs after the commit that removes the Portal.
  await Promise.resolve();
  for (const cleanup of cleanups.splice(0).toReversed()) cleanup();
});

function render(children: ReactNode) {
  const container = document.createElement("div");
  const root = createRoot(container);
  const entry = { container, root };
  document.body.append(container);
  fixtures.push(entry);
  flushSync(() => root.render(children));
  return {
    container,
    rerender(next: ReactNode) {
      flushSync(() => root.render(next));
    },
    unmount() {
      flushSync(() => root.unmount());
      container.remove();
      fixtures.splice(fixtures.indexOf(entry), 1);
    },
  };
}

interface FixtureProps {
  rootProps?: PopoverRootProps;
  contentProps?: PopoverContentProps;
  positionerProps?: PopoverPositionerProps;
  triggerProps?: PopoverTriggerProps;
  closeProps?: PopoverCloseProps;
  body?: ReactNode;
  title?: boolean;
  description?: boolean;
  arrow?: boolean;
  close?: boolean;
  portal?: boolean;
}

function Fixture({
  rootProps = {},
  contentProps = {},
  positionerProps = {},
  triggerProps = {},
  closeProps = {},
  body,
  title = true,
  description = true,
  arrow = true,
  close = true,
  portal = true,
}: FixtureProps) {
  // Geometry supports hit testing and placement assertions, not product appearance.
  const contents = (
    <Popover.Positioner data-positioner="" {...positionerProps}>
      <Popover.Content data-content="" style={{ width: 180, padding: 8 }} {...contentProps}>
        {arrow && <Popover.Arrow data-arrow="" style={{ width: 10, height: 10 }} />}
        {title && <Popover.Title>설정</Popover.Title>}
        {description && <Popover.Description>설정을 변경합니다.</Popover.Description>}
        {body === undefined ? (
          <>
            <button data-first="">첫 번째</button>
            <button data-second="">두 번째</button>
          </>
        ) : (
          body
        )}
        {close && (
          <Popover.Close data-close="" {...closeProps}>
            닫기
          </Popover.Close>
        )}
      </Popover.Content>
    </Popover.Positioner>
  );
  return (
    <>
      <button data-before="">이전</button>
      <Popover.Root {...rootProps}>
        <Popover.Trigger data-trigger="" {...triggerProps}>
          열기
        </Popover.Trigger>
        {portal ? <Popover.Portal data-portal="">{contents}</Popover.Portal> : contents}
      </Popover.Root>
      <button data-after="">다음</button>
    </>
  );
}

const getTrigger = () => document.querySelector<HTMLButtonElement>("[data-trigger]")!;
const getContent = () => document.querySelector<HTMLDivElement>("[data-content]")!;
const getPositioner = () => document.querySelector<HTMLDivElement>("[data-positioner]")!;
const getFirst = () => document.querySelector<HTMLButtonElement>("[data-first]")!;
const getSecond = () => document.querySelector<HTMLButtonElement>("[data-second]")!;
const getClose = () => document.querySelector<HTMLButtonElement>("[data-close]")!;
const getAfter = () => document.querySelector<HTMLButtonElement>("[data-after]")!;

async function openPopover() {
  await userEvent.click(getTrigger());
  await vi.waitFor(() => expect(document.activeElement).toBe(getFirst()));
}
async function expectClosed() {
  await vi.waitFor(() => expect(getContent()).toBeNull());
}
function appendElement<T extends HTMLElement>(element: T) {
  document.body.append(element);
  cleanups.push(() => element.remove());
  return element;
}
function CustomContainer(props: ComponentProps<"div">) {
  return <div {...props} data-custom="" />;
}
function CustomButton(props: ComponentProps<"button">) {
  return <button {...props} data-custom="" />;
}
function SubmitButton({ type = "submit", ...props }: ComponentProps<"button">) {
  return <button {...props} type={type} />;
}
function CustomTitle(props: ComponentProps<"h2">) {
  return <h2 {...props} data-custom="" />;
}
function CustomDescription(props: ComponentProps<"p">) {
  return <p {...props} data-custom="" />;
}

function NamedPartsFixture({ id }: { id: string }) {
  return (
    <Fixture
      title={false}
      description={false}
      rootProps={{ defaultOpen: true }}
      body={
        <>
          <Popover.Title id={`${id}-title`}>제목</Popover.Title>
          <Popover.Description id={`${id}-description`}>설명</Popover.Description>
          <button data-first="">작업</button>
        </>
      }
    />
  );
}

function NestedFixture({
  portal,
  defaultOpen = false,
}: {
  portal: boolean;
  defaultOpen?: boolean;
}) {
  const child = (
    <Popover.Positioner side="right">
      <Popover.Content aria-label="자식">
        <button data-child-first="">자식 작업</button>
        <Popover.Close data-child-close="">자식 닫기</Popover.Close>
      </Popover.Content>
    </Popover.Positioner>
  );
  return (
    <Fixture
      rootProps={{ defaultOpen }}
      portal={portal}
      body={
        <>
          <button data-first="">부모 작업</button>
          <Popover.Root defaultOpen={defaultOpen}>
            <Popover.Trigger data-child-trigger="">자식 열기</Popover.Trigger>
            {portal ? <Popover.Portal>{child}</Popover.Portal> : child}
          </Popover.Root>
        </>
      }
    />
  );
}

describe("Popover", () => {
  // Native button activation, form algorithms and the Popover API itself belong
  // to the browser. These tests cover Coral's composition and interaction results.
  // Cross-component nesting with Dialog/AlertDialog is outside the public scope.
  describe("구조와 접근성", () => {
    it("루트 export와 기본 구조, ID 관계와 접근 가능한 이름·설명을 제공한다", async () => {
      expect(RootExportPopover).toBe(Popover);
      render(<Fixture />);
      expect(getTrigger().getAttribute("aria-haspopup")).toBe("dialog");
      expect(getTrigger().getAttribute("aria-expanded")).toBe("false");
      expect(getTrigger().hasAttribute("aria-controls")).toBe(false);
      expect(getContent()).toBeNull();
      await openPopover();
      expect(getTrigger().getAttribute("aria-expanded")).toBe("true");
      expect(getTrigger().getAttribute("aria-controls")).toBe(getContent().id);
      expect(getContent().getAttribute("role")).toBe("dialog");
      expect(getContent().hasAttribute("aria-modal")).toBe(false);
      expect(getPositioner().matches(":popover-open")).toBe(true);
      expect(getPositioner().getAttribute("popover")).toBe("manual");
      const title = document.getElementById(getContent().getAttribute("aria-labelledby")!)!;
      const description = document.getElementById(getContent().getAttribute("aria-describedby")!)!;
      expect(title.tagName).toBe("H2");
      expect(description.tagName).toBe("P");
      await expect.element(getContent()).toHaveAccessibleName("설정");
      await expect.element(getContent()).toHaveAccessibleDescription("설정을 변경합니다.");
      expect(document.querySelector("[data-arrow]")!.getAttribute("aria-hidden")).toBe("true");
      for (const element of [getTrigger(), getPositioner(), getContent()])
        expect(element.hasAttribute("data-open")).toBe(true);
      expect(
        (await axe.run(document.querySelector<HTMLElement>("[data-portal]")!)).violations,
      ).toEqual([]);
      await userEvent.keyboard("{Escape}");
      await expectClosed();
      expect(document.querySelector("[data-portal]")).toBeNull();
      expect(getPositioner()).toBeNull();
      expect(getTrigger().hasAttribute("data-open")).toBe(false);
      expect(getTrigger().hasAttribute("aria-controls")).toBe(false);
    });

    it("선택적 제목·설명을 제거하면 자동 참조를 제거하고 다시 마운트하면 연결한다", async () => {
      const { rerender } = render(<Fixture rootProps={{ defaultOpen: true }} />);
      await vi.waitFor(() => expect(document.activeElement).toBe(getFirst()));
      rerender(
        <Fixture
          rootProps={{ defaultOpen: true }}
          title={false}
          description={false}
          contentProps={{ "aria-label": "표시 설정" }}
        />,
      );
      expect(getContent().hasAttribute("aria-labelledby")).toBe(false);
      expect(getContent().hasAttribute("aria-describedby")).toBe(false);
      await expect.element(getContent()).toHaveAccessibleName("표시 설정");
      rerender(<Fixture rootProps={{ defaultOpen: true }} />);
      await expect.element(getContent()).toHaveAccessibleName("설정");
      await expect.element(getContent()).toHaveAccessibleDescription("설정을 변경합니다.");
      expect(document.activeElement).toBe(getFirst());
    });

    it("명시한 제목·설명 ID와 ID 변경을 자동 연결에 반영한다", async () => {
      const { rerender } = render(<NamedPartsFixture id="first" />);
      await vi.waitFor(() => expect(document.activeElement).toBe(getFirst()));
      expect(getContent().getAttribute("aria-labelledby")).toBe("first-title");
      expect(getContent().getAttribute("aria-describedby")).toBe("first-description");
      rerender(<NamedPartsFixture id="second" />);
      expect(getContent().getAttribute("aria-labelledby")).toBe("second-title");
      expect(getContent().getAttribute("aria-describedby")).toBe("second-description");
    });

    it("Content의 명시적 이름·설명은 자동 연결보다 우선한다", async () => {
      const externalTitle = appendElement(document.createElement("h2"));
      externalTitle.id = "external-title";
      externalTitle.textContent = "외부 제목";
      const externalDescription = appendElement(document.createElement("p"));
      externalDescription.id = "external-description";
      externalDescription.textContent = "외부 설명";
      const { rerender } = render(
        <Fixture
          rootProps={{ defaultOpen: true }}
          contentProps={{
            "aria-labelledby": externalTitle.id,
            "aria-describedby": externalDescription.id,
          }}
        />,
      );
      await vi.waitFor(() => expect(document.activeElement).toBe(getFirst()));
      await expect.element(getContent()).toHaveAccessibleName("외부 제목");
      await expect.element(getContent()).toHaveAccessibleDescription("외부 설명");
      rerender(
        <Fixture
          rootProps={{ defaultOpen: true }}
          contentProps={{ "aria-label": "직접 지정", "aria-describedby": undefined }}
        />,
      );
      expect(getContent().hasAttribute("aria-labelledby")).toBe(false);
      expect(getContent().hasAttribute("aria-describedby")).toBe(false);
      await expect.element(getContent()).toHaveAccessibleName("직접 지정");
    });

    it.each([true, false])("처음부터 열린 패널을 Portal=%s로 표시한다", async (portal) => {
      const { container } = render(<Fixture rootProps={{ defaultOpen: true }} portal={portal} />);
      await vi.waitFor(() => expect(document.activeElement).toBe(getFirst()));
      expect(container.contains(getContent())).toBe(!portal);
      expect(getPositioner().matches(":popover-open")).toBe(true);
    });

    it("지정한 Portal 컨테이너에 표시하고 닫을 때 정리한다", async () => {
      const target = appendElement(document.createElement("div"));
      render(
        <Popover.Root defaultOpen>
          <Popover.Trigger>기준</Popover.Trigger>
          <Popover.Portal container={target}>
            <Popover.Positioner>
              <Popover.Content aria-label="설정">
                <button data-first="">작업</button>
              </Popover.Content>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>,
      );
      await vi.waitFor(() => expect(document.activeElement).toBe(getFirst()));
      expect(target.querySelector('[role="dialog"]')).not.toBeNull();
      await userEvent.keyboard("{Escape}");
      await vi.waitFor(() => expect(target.children.length).toBe(0));
    });

    it("Portal은 서버에서 생략하고 inline defaultOpen은 hydration 뒤 표시한다", async () => {
      expect(renderToString(<Fixture rootProps={{ defaultOpen: true }} />)).not.toContain(
        'role="dialog"',
      );
      const container = document.createElement("div");
      document.body.append(container);
      container.innerHTML = renderToString(
        <Fixture rootProps={{ defaultOpen: true }} portal={false} />,
      );
      expect(container.querySelector('[role="dialog"]')).not.toBeNull();
      expect(container.querySelector(":popover-open")).toBeNull();
      const recover = vi.fn();
      const root = hydrateRoot(
        container,
        <Fixture rootProps={{ defaultOpen: true }} portal={false} />,
        { onRecoverableError: recover },
      );
      fixtures.push({ root, container });
      await vi.waitFor(() => expect(document.activeElement).toBe(getFirst()));
      expect(getPositioner().matches(":popover-open")).toBe(true);
      expect(recover).not.toHaveBeenCalled();
    });
  });

  describe("상태와 닫기 요청", () => {
    it.each(["escape", "close", "trigger"] as const)(
      "%s로 닫고 다시 열 수 있다",
      async (method) => {
        const changed = vi.fn();
        render(<Fixture rootProps={{ onOpenChange: changed }} />);
        await openPopover();
        expect(changed.mock.calls[0]![0]).toBe(true);
        expect(changed.mock.calls[0]![1].reason).toBe("trigger-press");
        expect(changed.mock.calls[0]![1].trigger).toBe(getTrigger());
        expect(changed.mock.calls[0]![1].event).toBeInstanceOf(MouseEvent);
        if (method === "escape") await userEvent.keyboard("{Escape}");
        else await userEvent.click(method === "close" ? getClose() : getTrigger());
        await expectClosed();
        const details = changed.mock.calls.at(-1)![1];
        expect(changed.mock.calls.at(-1)![0]).toBe(false);
        expect(details.reason).toBe(
          method === "escape" ? "escape-key" : method === "close" ? "close-press" : "trigger-press",
        );
        expect(details.isCanceled).toBe(false);
        await vi.waitFor(() => expect(document.activeElement).toBe(getTrigger()));
        await openPopover();
        expect(changed).toHaveBeenCalledTimes(3);
      },
    );

    it.each([true, false])("제어 상태에서 사용처의 닫기 갱신=%s를 따른다", async (accept) => {
      const changed = vi.fn();
      function Controlled() {
        const [isOpen, setOpen] = useState(true);
        return (
          <Fixture
            rootProps={{
              open: isOpen,
              onOpenChange: (next, details) => {
                changed(next, details);
                if (accept) setOpen(next);
              },
            }}
          />
        );
      }
      render(<Controlled />);
      await vi.waitFor(() => expect(document.activeElement).toBe(getFirst()));
      await userEvent.keyboard("{Escape}");
      expect(changed).toHaveBeenCalledOnce();
      if (accept) await expectClosed();
      else expect(getPositioner().matches(":popover-open")).toBe(true);
    });

    it("열기 취소와 모든 닫기 원인의 취소를 지원한다", async () => {
      const canceled: PopoverChangeEventDetails[] = [];
      const { rerender } = render(
        <Fixture
          rootProps={{
            onOpenChange: (_next, details) => {
              details.cancel();
              canceled.push(details);
            },
          }}
        />,
      );
      await userEvent.click(getTrigger());
      expect(getContent()).toBeNull();
      expect(canceled[0]!.isCanceled).toBe(true);
      const reasons: string[] = [];
      rerender(
        <Fixture
          rootProps={{
            onOpenChange: (next, details) => {
              if (!next) {
                reasons.push(details.reason);
                details.cancel();
              }
            },
          }}
        />,
      );
      await openPopover();
      await userEvent.keyboard("{Escape}");
      await userEvent.click(getClose());
      await userEvent.click(getTrigger());
      await userEvent.click(getAfter());
      getFirst().focus();
      getAfter().focus();
      expect(reasons).toEqual([
        "escape-key",
        "close-press",
        "trigger-press",
        "outside-press",
        "focus-outside",
      ]);
      expect(getContent()).not.toBeNull();
    });

    it("사용자 Trigger·Close 핸들러의 preventDefault를 존중한다", async () => {
      const changed = vi.fn();
      const { rerender } = render(
        <Fixture
          rootProps={{ onOpenChange: changed }}
          triggerProps={{ onClick: (event) => event.preventDefault() }}
        />,
      );
      await userEvent.click(getTrigger());
      expect(changed).not.toHaveBeenCalled();
      rerender(
        <Fixture
          rootProps={{ onOpenChange: changed }}
          closeProps={{ onClick: (event) => event.preventDefault() }}
        />,
      );
      await openPopover();
      await userEvent.click(getClose());
      expect(getContent()).not.toBeNull();
      expect(changed).toHaveBeenCalledOnce();
    });

    it("외부 클릭의 실행과 포커스를 보존하고 페이지 조작을 허용한다", async () => {
      const changed = vi.fn();
      const clicked = vi.fn();
      render(<Fixture rootProps={{ onOpenChange: changed }} />);
      await openPopover();
      expect(getAfter().closest("[inert]")).toBeNull();
      expect(document.body.style.overflow).not.toBe("hidden");
      getAfter().addEventListener("click", clicked);
      await userEvent.click(getAfter());
      await expectClosed();
      expect(clicked).toHaveBeenCalledOnce();
      expect(document.activeElement).toBe(getAfter());
      expect(changed.mock.calls.at(-1)![1].reason).toBe("outside-press");
    });

    it.each(["inside-drag", "outside-drag", "secondary", "cancel", "prevented"] as const)(
      "%s 포인터 동작을 외부 클릭으로 처리하지 않는다",
      async (gesture) => {
        render(<Fixture />);
        await openPopover();
        const target = gesture === "inside-drag" ? getFirst() : getAfter();
        const options = gesture === "secondary" ? { button: 2 } : {};
        dispatchPointer(target, "pointerdown", options, gesture === "prevented");
        if (gesture === "cancel") dispatchPointer(getAfter(), "pointercancel");
        dispatchPointer(getAfter(), "pointerup", {
          ...options,
          clientX: gesture === "outside-drag" ? 50 : 5,
        });
        getAfter().dispatchEvent(
          new MouseEvent("click", { bubbles: true, cancelable: true, detail: 1, ...options }),
        );
        expect(getContent()).not.toBeNull();
      },
    );
  });

  describe("포커스", () => {
    it.each([false, true])(
      "Tab으로 밖으로 이동하면 닫고 목적지 포커스를 유지한다: backward=%s",
      async (backward) => {
        render(<Fixture />);
        await openPopover();
        if (!backward) getClose().focus();
        await userEvent.tab({ shift: backward });
        await expectClosed();
        expect(document.activeElement).toBe(backward ? getTrigger() : getAfter());
      },
    );

    it("키보드로 열면 입력 유형을 전달하고 내부 Tab 이동을 허용한다", async () => {
      const initial = vi.fn(() => true);
      render(<Fixture contentProps={{ initialFocus: initial }} />);
      getTrigger().focus();
      await userEvent.keyboard("{Enter}");
      await vi.waitFor(() => expect(document.activeElement).toBe(getFirst()));
      expect(initial).toHaveBeenCalledWith("keyboard");
      await userEvent.tab();
      expect(document.activeElement).toBe(getSecond());
      expect(getContent()).not.toBeNull();
    });

    it("initialFocus Ref를 적용하고 배치가 바뀌어도 초기 포커스를 반복하지 않는다", async () => {
      const target = createRef<HTMLDivElement>();
      const initial = vi.fn(() => target.current);
      const props = { ref: target, initialFocus: initial };
      const { rerender } = render(<Fixture contentProps={props} />);
      await userEvent.click(getTrigger());
      await vi.waitFor(() => expect(document.activeElement).toBe(target.current));
      getSecond().focus();
      rerender(<Fixture contentProps={props} positionerProps={{ side: "right" }} />);
      await vi.waitFor(() => expect(getContent().getAttribute("data-side")).toBe("right"));
      expect(initial).toHaveBeenCalledOnce();
      expect(document.activeElement).toBe(getSecond());
    });

    it.each([false, () => undefined] as const)(
      "initialFocus=%s이면 초기 이동을 생략한다",
      async (initialFocus) => {
        render(<Fixture contentProps={{ initialFocus }} />);
        await userEvent.click(getTrigger());
        await vi.waitFor(() =>
          expect(getPositioner().style.getPropertyValue("--anchor-width")).not.toBe(""),
        );
        expect(document.activeElement).toBe(getTrigger());
        expect(getContent()).not.toBeNull();
      },
    );

    it("사용 가능한 조작 요소가 없으면 Content에 포커스를 둔다", async () => {
      render(
        <Fixture
          body={
            <>
              <button disabled>비활성</button>
              <button hidden>숨김</button>
              <div inert>
                <button>inert</button>
              </div>
            </>
          }
          close={false}
        />,
      );
      await userEvent.click(getTrigger());
      await vi.waitFor(() => expect(document.activeElement).toBe(getContent()));
    });

    it("초기 포커스에서 라디오 그룹의 선택된 항목을 사용한다", async () => {
      render(
        <Fixture
          body={
            <>
              <input type="radio" name="option" value="a" aria-label="A" />
              <input type="radio" name="option" value="b" aria-label="B" defaultChecked />
            </>
          }
        />,
      );
      await userEvent.click(getTrigger());
      await vi.waitFor(() =>
        expect(document.activeElement).toBe(document.querySelector('input[value="b"]')),
      );
    });

    it("명시한 initialFocus 대상이 사용할 수 없으면 기본 대상을 사용한다", async () => {
      const unavailable = createRef<HTMLButtonElement>();
      render(
        <Fixture
          contentProps={{ initialFocus: unavailable }}
          body={
            <>
              <button ref={unavailable} disabled>
                비활성
              </button>
              <button data-first="">첫 번째</button>
            </>
          }
        />,
      );
      await openPopover();
    });

    it.each([true, false])(
      "명시한 finalFocus의 사용 가능 여부=%s에 따라 복원한다",
      async (available) => {
        const target = createRef<HTMLButtonElement>();
        render(
          <>
            <button ref={target} disabled={!available}>
              최종 대상
            </button>
            <Fixture contentProps={{ finalFocus: target }} />
          </>,
        );
        await openPopover();
        await userEvent.keyboard("{Escape}");
        await expectClosed();
        await vi.waitFor(() =>
          expect(document.activeElement).toBe(available ? target.current : getTrigger()),
        );
      },
    );

    it("finalFocus=false이면 복원을 생략한다", async () => {
      const focused = vi.fn();
      render(<Fixture contentProps={{ finalFocus: false }} />);
      await openPopover();
      getTrigger().addEventListener("focus", focused);
      await userEvent.keyboard("{Escape}");
      await expectClosed();
      expect(focused).not.toHaveBeenCalled();
    });

    it("배치가 완료되기 전에 닫으면 늦은 초기 포커스 이동을 실행하지 않는다", async () => {
      const initial = vi.fn(() => true);
      const { rerender } = render(
        <Fixture
          rootProps={{ open: true }}
          contentProps={{ initialFocus: initial }}
          portal={false}
        />,
      );
      rerender(
        <Fixture
          rootProps={{ open: false }}
          contentProps={{ initialFocus: initial }}
          portal={false}
        />,
      );
      await new Promise(requestAnimationFrame);
      expect(initial).not.toHaveBeenCalled();
      expect(getContent()).toBeNull();
      expect(document.querySelector(":popover-open")).toBeNull();
    });
  });

  describe("중첩과 정리", () => {
    it.each([true, false])(
      "중첩 Portal=%s의 최상위 Popover만 닫고 부모를 유지한다",
      async (portal) => {
        render(<NestedFixture portal={portal} />);
        await openPopover();
        const childTrigger = document.querySelector<HTMLButtonElement>("[data-child-trigger]")!;
        await userEvent.click(childTrigger);
        await vi.waitFor(() =>
          expect(document.activeElement).toBe(document.querySelector("[data-child-first]")),
        );
        expect(document.querySelectorAll(":popover-open").length).toBe(2);
        await userEvent.keyboard("{Escape}");
        await vi.waitFor(() => expect(document.querySelectorAll('[role="dialog"]').length).toBe(1));
        expect(document.activeElement).toBe(childTrigger);
        await userEvent.keyboard("{Escape}");
        await expectClosed();
        await vi.waitFor(() => expect(document.activeElement).toBe(getTrigger()));
      },
    );

    it.each([true, false])(
      "Strict Mode에서 처음부터 열린 중첩 Portal=%s의 순서를 유지한다",
      async (portal) => {
        render(
          <StrictMode>
            <NestedFixture portal={portal} defaultOpen />
          </StrictMode>,
        );
        await vi.waitFor(() =>
          expect(document.activeElement).toBe(document.querySelector("[data-child-first]")),
        );
        await userEvent.keyboard("{Escape}");
        await vi.waitFor(() => expect(document.querySelectorAll('[role="dialog"]').length).toBe(1));
        expect(document.activeElement).toBe(document.querySelector("[data-child-trigger]"));
      },
    );

    it("자식 바깥의 부모 컨트롤을 클릭하면 자식만 닫고 클릭을 실행한다", async () => {
      render(<NestedFixture portal />);
      await openPopover();
      await userEvent.click(document.querySelector<HTMLButtonElement>("[data-child-trigger]")!);
      await vi.waitFor(() =>
        expect(document.activeElement).toBe(document.querySelector("[data-child-first]")),
      );
      const clicked = vi.fn();
      getFirst().addEventListener("click", clicked);
      await userEvent.click(getFirst());
      await vi.waitFor(() => expect(document.querySelectorAll('[role="dialog"]').length).toBe(1));
      expect(clicked).toHaveBeenCalledOnce();
      expect(document.activeElement).toBe(getFirst());
    });

    it("열린 상태로 unmount한 뒤 새 Popover를 열어도 이벤트와 포커스가 남지 않는다", async () => {
      const firstChange = vi.fn();
      const firstFixture = render(<Fixture rootProps={{ onOpenChange: firstChange }} />);
      await openPopover();
      firstFixture.unmount();
      const secondChange = vi.fn();
      render(<Fixture rootProps={{ onOpenChange: secondChange }} />);
      await openPopover();
      await userEvent.keyboard("{Escape}");
      await expectClosed();
      expect(firstChange).toHaveBeenCalledOnce();
      expect(secondChange).toHaveBeenCalledTimes(2);
      expect(document.querySelector(":popover-open")).toBeNull();
    });
  });

  describe("배치와 합성", () => {
    it.each(["top", "right", "bottom", "left"] as const)(
      "%s 방향과 간격을 적용하고 배치 뒤 포커스를 이동한다",
      async (side) => {
        const reference = createRef<HTMLButtonElement>();
        const floating = createRef<HTMLDivElement>();
        let rectAtFocus: DOMRect | undefined;
        const focusRect = vi.fn(() => {
          rectAtFocus = floating.current!.getBoundingClientRect();
          return true;
        });
        render(
          <Popover.Root defaultOpen>
            <Popover.Trigger ref={reference} style={{ position: "fixed", left: 160, top: 200 }}>
              기준
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Positioner ref={floating} side={side} sideOffset={12}>
                <Popover.Content
                  aria-label="패널"
                  initialFocus={focusRect}
                  style={{ width: 70, height: 60 }}
                >
                  <button data-first="">작업</button>
                </Popover.Content>
              </Popover.Positioner>
            </Popover.Portal>
          </Popover.Root>,
        );
        await vi.waitFor(() => expect(document.activeElement).toBe(getFirst()));
        const a = reference.current!.getBoundingClientRect();
        const b = rectAtFocus!;
        expect(
          side === "top"
            ? a.top - b.bottom
            : side === "bottom"
              ? b.top - a.bottom
              : side === "left"
                ? a.left - b.right
                : b.left - a.right,
        ).toBeCloseTo(12, 0);
        expect(floating.current!.getAttribute("data-side")).toBe(side);
        expect(focusRect).toHaveBeenCalledOnce();
        expect(parseFloat(floating.current!.style.getPropertyValue("--anchor-width"))).toBeCloseTo(
          a.width,
        );
        expect(parseFloat(floating.current!.style.getPropertyValue("--anchor-height"))).toBeCloseTo(
          a.height,
        );
        expect(
          parseFloat(floating.current!.style.getPropertyValue("--available-width")),
        ).toBeGreaterThan(0);
        expect(
          parseFloat(floating.current!.style.getPropertyValue("--available-height")),
        ).toBeGreaterThan(0);
      },
    );

    it.each([
      ["ltr", "start"],
      ["ltr", "center"],
      ["ltr", "end"],
      ["rtl", "start"],
      ["rtl", "end"],
    ] as const)("%s의 %s 정렬을 적용한다", async (dir, align) => {
      const reference = createRef<HTMLButtonElement>();
      const floating = createRef<HTMLDivElement>();
      render(
        <Popover.Root defaultOpen>
          <Popover.Trigger ref={reference} style={{ position: "fixed", left: 150, top: 150 }}>
            기준
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Positioner ref={floating} align={align} dir={dir}>
              <Popover.Content aria-label="패널" style={{ width: 100, height: 50 }}>
                <button data-first="">작업</button>
              </Popover.Content>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>,
      );
      await vi.waitFor(() => expect(document.activeElement).toBe(getFirst()));
      const a = reference.current!.getBoundingClientRect();
      const b = floating.current!.getBoundingClientRect();
      if (align === "center") expect((b.left + b.right) / 2).toBeCloseTo((a.left + a.right) / 2, 0);
      else if ((align === "start") === (dir === "ltr")) expect(b.left).toBeCloseTo(a.left, 0);
      else expect(b.right).toBeCloseTo(a.right, 0);
      expect(floating.current!.getAttribute("data-align")).toBe(align);
    });

    it("화면 경계에서 방향을 바꾸고 패널을 경계 안으로 보정한다", async () => {
      render(
        <Fixture
          rootProps={{ defaultOpen: true }}
          triggerProps={{ style: { position: "fixed", right: 0, bottom: 0 } }}
          positionerProps={{ side: "bottom", align: "start", collisionPadding: 12 }}
        />,
      );
      await vi.waitFor(() => expect(document.activeElement).toBe(getFirst()));
      expect(getContent().getAttribute("data-side")).toBe("top");
      const rect = getPositioner().getBoundingClientRect();
      expect(rect.right).toBeLessThanOrEqual(document.documentElement.clientWidth - 11);
      expect(rect.left).toBeGreaterThanOrEqual(11);
    });

    it("스크롤과 본문 크기 변경에 맞춰 위치를 갱신한다", async () => {
      const scroller = createRef<HTMLDivElement>();
      const content = createRef<HTMLDivElement>();
      render(
        <div
          ref={scroller}
          style={{
            position: "fixed",
            left: 100,
            top: 50,
            width: 200,
            height: 400,
            overflow: "auto",
          }}
        >
          <div style={{ height: 100 }} />
          <Fixture
            rootProps={{ defaultOpen: true }}
            title={false}
            description={false}
            contentProps={{ ref: content, "aria-label": "패널", style: { width: 60, height: 60 } }}
          />
          <div style={{ height: 1000 }} />
        </div>,
      );
      await vi.waitFor(() => expect(document.activeElement).toBe(getFirst()));
      const top = getPositioner().getBoundingClientRect().top;
      scroller.current!.scrollTop = 40;
      await vi.waitFor(() =>
        expect(getPositioner().getBoundingClientRect().top).toBeCloseTo(top - 40, 0),
      );
      const left = getPositioner().getBoundingClientRect().left;
      content.current!.style.width = "100px";
      await vi.waitFor(() =>
        expect(getPositioner().getBoundingClientRect().left).toBeCloseTo(left - 20, 0),
      );
    });

    it("화살표를 추가하고 크기를 바꾸면 기준 요소를 향하는 좌표를 갱신한다", async () => {
      const arrowRef = createRef<HTMLDivElement>();
      const rootProps = { defaultOpen: true };
      const triggerProps = { style: { position: "fixed", left: 150, top: 150 } as const };
      const { rerender } = render(
        <Fixture rootProps={rootProps} triggerProps={triggerProps} arrow={false} />,
      );
      await vi.waitFor(() => expect(document.activeElement).toBe(getFirst()));
      rerender(
        <Fixture
          rootProps={rootProps}
          triggerProps={triggerProps}
          arrow={false}
          body={
            <>
              <Popover.Arrow ref={arrowRef} style={{ width: 20, height: 20 }} />
              <button data-first="">작업</button>
            </>
          }
        />,
      );
      await vi.waitFor(() => expect(arrowRef.current!.style.top).toBe("-10px"));
      const a = getTrigger().getBoundingClientRect();
      const b = arrowRef.current!.getBoundingClientRect();
      expect((b.left + b.right) / 2).toBeCloseTo((a.left + a.right) / 2, 0);
      arrowRef.current!.style.height = "30px";
      await vi.waitFor(() => expect(arrowRef.current!.style.top).toBe("-15px"));
    });

    it("모든 DOM Part의 render에서 Props·Ref·이벤트와 자동 이름 연결을 합성한다", async () => {
      const refs = {
        trigger: createRef<HTMLButtonElement>(),
        portal: createRef<HTMLDivElement>(),
        positioner: createRef<HTMLDivElement>(),
        content: createRef<HTMLDivElement>(),
        arrow: createRef<HTMLDivElement>(),
        title: createRef<HTMLHeadingElement>(),
        description: createRef<HTMLParagraphElement>(),
        close: createRef<HTMLButtonElement>(),
      };
      const renderRef = createRef<HTMLDivElement>();
      const calls: string[] = [];
      render(
        <Popover.Root>
          <Popover.Trigger
            ref={refs.trigger}
            render={<CustomButton onClick={() => calls.push("render")} />}
            onClick={() => calls.push("part")}
          >
            열기
          </Popover.Trigger>
          <Popover.Portal ref={refs.portal} render={<CustomContainer />}>
            <Popover.Positioner ref={refs.positioner} render={<CustomContainer />}>
              <Popover.Content ref={refs.content} render={<CustomContainer ref={renderRef} />}>
                <Popover.Arrow ref={refs.arrow} render={<CustomContainer />} />
                <Popover.Title ref={refs.title} render={<CustomTitle />}>
                  설정
                </Popover.Title>
                <Popover.Description ref={refs.description} render={<CustomDescription />}>
                  설명
                </Popover.Description>
                <button data-first="">작업</button>
                <Popover.Close ref={refs.close} render={<CustomButton />}>
                  닫기
                </Popover.Close>
              </Popover.Content>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>,
      );
      await userEvent.click(refs.trigger.current!);
      await vi.waitFor(() => expect(document.activeElement).toBe(getFirst()));
      expect(calls).toEqual(["render", "part"]);
      expect(renderRef.current).toBe(refs.content.current);
      for (const ref of Object.values(refs))
        expect(ref.current!.hasAttribute("data-custom")).toBe(true);
      await expect.element(refs.content.current!).toHaveAccessibleName("설정");
      await expect.element(refs.content.current!).toHaveAccessibleDescription("설명");
      await userEvent.click(refs.close.current!);
      await vi.waitFor(() => expect(refs.content.current).toBeNull());
      expect(renderRef.current).toBeNull();
      for (const [name, ref] of Object.entries(refs))
        if (name !== "trigger") expect(ref.current).toBeNull();
    });

    it("기본 button type을 보충하고 render 대상의 기본값과 명시적 type을 보존한다", async () => {
      const { rerender } = render(<Fixture />);
      expect(getTrigger().type).toBe("button");
      await openPopover();
      expect(getClose().type).toBe("button");
      await userEvent.keyboard("{Escape}");
      await expectClosed();
      rerender(
        <Fixture
          triggerProps={{ render: <SubmitButton /> }}
          closeProps={{ render: <SubmitButton /> }}
        />,
      );
      expect(getTrigger().type).toBe("submit");
      await openPopover();
      expect(getClose().type).toBe("submit");
      await userEvent.keyboard("{Escape}");
      await expectClosed();
      rerender(
        <Fixture
          triggerProps={{ type: "reset", render: <SubmitButton /> }}
          closeProps={{ type: "reset", render: <SubmitButton /> }}
        />,
      );
      expect(getTrigger().type).toBe("reset");
      await openPopover();
      expect(getClose().type).toBe("reset");
    });
  });
});

function dispatchPointer(
  target: Element,
  type: string,
  options: PointerEventInit = {},
  prevented = false,
) {
  const event = new PointerEvent(type, {
    bubbles: true,
    cancelable: true,
    button: 0,
    isPrimary: true,
    pointerId: 1,
    pointerType: "mouse",
    clientX: 5,
    clientY: 5,
    ...options,
  });
  if (prevented) event.preventDefault();
  target.dispatchEvent(event);
}

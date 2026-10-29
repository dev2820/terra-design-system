import axe from "axe-core";
import {
  createRef,
  StrictMode,
  useId,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";
import { createRoot, hydrateRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import {
  Dialog,
  type DialogContentProps,
  type DialogRootProps,
  type DialogTriggerProps,
  type DialogCloseProps,
} from ".";
import { Dialog as RootExportDialog } from "..";

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
  rootProps?: DialogRootProps;
  contentProps?: DialogContentProps;
  triggerProps?: DialogTriggerProps;
  closeProps?: DialogCloseProps;
  body?: ReactNode;
  portal?: boolean;
}

function Fixture({
  rootProps = {},
  contentProps = {},
  triggerProps = {},
  closeProps = {},
  body,
  portal = true,
}: FixtureProps) {
  const titleId = useId();
  const descriptionId = useId();
  // Geometry only supports hit testing. Product layout and appearance are not assertions.
  const contents = (
    <>
      <Dialog.Backdrop data-backdrop="" style={{ position: "fixed", inset: 0 }} />
      <Dialog.Positioner data-positioner="" style={{ position: "fixed", inset: 0, padding: 40 }}>
        <Dialog.Content
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          style={{ width: 280 }}
          {...contentProps}
        >
          <Dialog.Header data-header="">
            <Dialog.Title id={titleId}>설정</Dialog.Title>
            <Dialog.Description id={descriptionId}>설정을 변경합니다.</Dialog.Description>
          </Dialog.Header>
          <Dialog.Body data-body="">
            {body === undefined ? (
              <>
                <button data-first="">첫 번째</button>
                <button data-second="">두 번째</button>
              </>
            ) : (
              body
            )}
          </Dialog.Body>
          <Dialog.Footer data-footer="">
            <Dialog.Close data-close="" {...closeProps}>
              닫기
            </Dialog.Close>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </>
  );
  return (
    <>
      <button data-before="">이전</button>
      <Dialog.Root {...rootProps}>
        <Dialog.Trigger {...triggerProps}>열기</Dialog.Trigger>
        {portal ? <Dialog.Portal data-portal="">{contents}</Dialog.Portal> : contents}
      </Dialog.Root>
      <button data-after="">다음</button>
    </>
  );
}

function getContent() {
  return document.querySelector<HTMLDivElement>('[role="dialog"]')!;
}
function getFirst() {
  return document.querySelector<HTMLButtonElement>("[data-first]")!;
}
function getSecond() {
  return document.querySelector<HTMLButtonElement>("[data-second]")!;
}
function getClose() {
  return document.querySelector<HTMLButtonElement>("[data-close]")!;
}
function getAfter() {
  return document.querySelector<HTMLButtonElement>("[data-after]")!;
}
async function openDialog() {
  await userEvent.click(page.getByRole("button", { name: "열기", exact: true }));
  await vi.waitFor(() => expect(getContent()).not.toBeNull());
}
async function closeDialog() {
  await userEvent.keyboard("{Escape}");
  await vi.waitFor(() => expect(getContent()).toBeNull());
}
async function clickOutside() {
  await userEvent.click(document.querySelector("[data-positioner]")!, { position: { x: 5, y: 5 } });
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

function TriggerlessExample() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>외부에서 열기</button>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Content aria-label="설정">
            <button>첫 번째</button>
            <input autoFocus aria-label="이름" />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

function RemovableControls() {
  const [visible, setVisible] = useState(true);
  return (
    <>
      {visible && <button onClick={() => setVisible(false)}>제거</button>}
      <button data-second="">남은 버튼</button>
    </>
  );
}

function NestedFixture({ parentModal, childModal }: { parentModal: boolean; childModal: boolean }) {
  return (
    <>
      <button data-outside="">외부</button>
      <Dialog.Root modal={parentModal}>
        <Dialog.Trigger>열기</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Content aria-label="부모">
            <button data-parent-first="">부모 첫 번째</button>
            <Dialog.Root modal={childModal}>
              <Dialog.Trigger>자식 열기</Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Content aria-label="자식">
                  <button data-child-first="">자식 첫 번째</button>
                  <Dialog.Close data-child-last="">자식 닫기</Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
            <button data-parent-last="">부모 마지막</button>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

function SequentialDialogs({ onSave }: { onSave: (name: string) => void }) {
  const [view, setView] = useState<"edit" | "confirm" | null>(null);
  const [name, setName] = useState("");
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Dialog.Root open={view === "edit"} onOpenChange={(open) => setView(open ? "edit" : null)}>
        <Dialog.Trigger ref={triggerRef}>프로필 편집</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Content aria-label="프로필 편집" finalFocus={() => view !== "confirm"}>
            <label>
              이름
              <input value={name} onChange={(event) => setName(event.target.value)} />
            </label>
            <button onClick={() => setView("confirm")}>변경 확인</button>
            <Dialog.Close>닫기</Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Dialog.Root
        open={view === "confirm"}
        onOpenChange={(open) => {
          if (!open) setView("edit");
        }}
      >
        <Dialog.Portal>
          <Dialog.Content
            aria-label="변경 확인"
            finalFocus={() => (view === "edit" ? false : triggerRef.current)}
          >
            <p>이름을 {name}(으)로 변경할까요?</p>
            <Dialog.Close>편집으로 돌아가기</Dialog.Close>
            <button
              onClick={() => {
                onSave(name);
                setView(null);
              }}
            >
              저장
            </button>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

// Use actual browser input for keyboard, focus, click and scrolling behavior.
// Synthetic pointer sequences cover pointer-type/cancellation boundaries that userEvent
// cannot generate. They do not verify mobile virtual keyboards or native touch scrolling.
// Native activation and form behavior, Core's full merge matrix and type-only re-exports
// are not duplicated here. All ordinary Props/Refs retain their native TypeScript contracts.
describe("Dialog", () => {
  describe("구조와 접근성", () => {
    it("루트와 하위 경로에서 같은 Parts를 제공한다", () => {
      expect(RootExportDialog).toBe(Dialog);
    });

    it.each([true, false])(
      "modal=%s의 이름·설명·구조와 조건부 ARIA를 제공하고 axe 위반이 없다",
      async (modal) => {
        const { container } = render(<Fixture rootProps={{ modal }} />);
        const trigger = container.querySelector<HTMLButtonElement>('[aria-haspopup="dialog"]')!;
        expect(trigger.getAttribute("aria-expanded")).toBe("false");
        expect(trigger.hasAttribute("aria-controls")).toBe(false);
        expect(getContent()).toBeNull();
        await openDialog();
        const content = getContent();
        expect(content.tagName).toBe("DIV");
        expect(content.getAttribute("aria-modal")).toBe(modal ? "true" : null);
        expect(content.tabIndex).toBe(-1);
        expect(trigger.getAttribute("aria-controls")).toBe(content.id);
        expect(trigger.getAttribute("aria-expanded")).toBe("true");
        expect(document.querySelector("[data-portal]")?.parentElement).toBe(document.body);
        expect(document.querySelector("[data-backdrop]") !== null).toBe(modal);
        if (modal)
          expect(document.querySelector("[data-backdrop]")?.getAttribute("aria-hidden")).toBe(
            "true",
          );
        expect(content.querySelector("h2")?.id).toBe(content.getAttribute("aria-labelledby"));
        expect(content.querySelector("p")?.id).toBe(content.getAttribute("aria-describedby"));
        for (const selector of ["[data-header]", "[data-body]", "[data-footer]"]) {
          const part = content.querySelector<HTMLElement>(selector)!;
          expect(part.tagName).toBe("DIV");
          expect(part.hasAttribute("role")).toBe(false);
        }
        for (const part of [trigger, content, document.querySelector("[data-positioner]")!])
          expect(part.hasAttribute("data-open")).toBe(true);
        await expect
          .element(page.getByRole("dialog", { name: "설정" }))
          .toHaveAccessibleDescription("설정을 변경합니다.");
        expect(
          (await axe.run(document.querySelector<HTMLElement>("[data-portal]")!)).violations,
        ).toEqual([]);
        await closeDialog();
        expect(trigger.getAttribute("aria-expanded")).toBe("false");
        expect(trigger.hasAttribute("aria-controls")).toBe(false);
        expect(trigger.hasAttribute("data-open")).toBe(false);
        expect(document.querySelector("[data-portal]")).toBeNull();
      },
    );

    it("aria-label만 사용하면 선택적인 설명과 ID 참조를 만들지 않는다", async () => {
      render(
        <Dialog.Root defaultOpen>
          <Dialog.Portal>
            <Dialog.Content aria-label="도움말">
              <button>닫을 수 있는 작업</button>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>,
      );
      await expect.element(page.getByRole("dialog", { name: "도움말" })).toBeVisible();
      expect(getContent().hasAttribute("aria-labelledby")).toBe(false);
      expect(getContent().hasAttribute("aria-describedby")).toBe(false);
      expect((await axe.run(getContent())).violations).toEqual([]);
    });

    it("여러 Root의 Content ID를 독립적으로 연결한다", async () => {
      render(
        <>
          <Dialog.Root defaultOpen modal={false}>
            <Dialog.Trigger>하나</Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Content aria-label="하나">
                <button>작업 하나</button>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
          <Dialog.Root defaultOpen modal={false}>
            <Dialog.Trigger>둘</Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Content aria-label="둘">
                <button>작업 둘</button>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </>,
      );
      await vi.waitFor(() => expect(document.querySelectorAll('[role="dialog"]').length).toBe(2));
      const ids = [...document.querySelectorAll('[role="dialog"]')].map((item) => item.id);
      expect(new Set(ids).size).toBe(2);
      expect(
        [...document.querySelectorAll('[aria-haspopup="dialog"]')].map((item) =>
          item.getAttribute("aria-controls"),
        ),
      ).toEqual(ids);
    });

    it("Portal의 사용자 지정 container에 렌더링하고 닫힐 때 제거한다", async () => {
      const target = appendElement(document.createElement("div"));
      const ref = createRef<HTMLDivElement>();
      render(
        <Dialog.Root>
          <Dialog.Trigger>열기</Dialog.Trigger>
          <Dialog.Portal container={target} ref={ref}>
            <Dialog.Content aria-label="설정">
              <Dialog.Close>닫기</Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>,
      );
      await openDialog();
      expect(ref.current?.parentElement).toBe(target);
      expect(target.contains(getContent())).toBe(true);
      await closeDialog();
      expect(ref.current).toBeNull();
      expect(target.childElementCount).toBe(0);
    });

    it.each([true, false])("서버 HTML에 inline Dialog의 modal=%s 의미를 포함한다", (modal) => {
      const html = renderToString(
        <Fixture portal={false} rootProps={{ defaultOpen: true, modal }} />,
      );
      expect(html).toContain('role="dialog"');
      expect(html.includes('aria-modal="true"')).toBe(modal);
      expect(html).toContain("aria-labelledby=");
      expect(html).toContain("aria-describedby=");
      expect(renderToString(<Fixture rootProps={{ defaultOpen: true, modal }} />)).not.toContain(
        'role="dialog"',
      );
    });

    it("inline Dialog를 ID 불일치 없이 hydrate하고 모달 포커스를 적용한다", async () => {
      const children = <Fixture portal={false} rootProps={{ defaultOpen: true }} />;
      const container = document.createElement("div");
      container.innerHTML = renderToString(children);
      const contentId = container.querySelector('[role="dialog"]')!.id;
      const recoverableError = vi.fn();
      document.body.append(container);
      const root = hydrateRoot(container, children, { onRecoverableError: recoverableError });
      fixtures.push({ container, root });
      await vi.waitFor(() => expect(document.activeElement).toBe(getFirst()));
      expect(getContent().id).toBe(contentId);
      expect(recoverableError).not.toHaveBeenCalled();
      getClose().focus();
      await userEvent.tab();
      expect(document.activeElement).toBe(getFirst());
    });
  });

  describe("상태와 변경 요청", () => {
    it("defaultOpen을 초기값으로만 사용하고 Close로 닫는다", async () => {
      const { rerender } = render(<Fixture rootProps={{ defaultOpen: true }} />);
      await vi.waitFor(() => expect(getContent()).not.toBeNull());
      rerender(<Fixture rootProps={{ defaultOpen: false }} />);
      expect(getContent()).not.toBeNull();
      await userEvent.click(getClose());
      await vi.waitFor(() => expect(getContent()).toBeNull());
      expect(document.activeElement?.textContent).not.toBe("닫기");
    });

    it("제어 상태에서는 변경 요청만 알리고 open 갱신을 기다린다", async () => {
      const change = vi.fn<NonNullable<DialogRootProps["onOpenChange"]>>();
      const { container, rerender } = render(
        <Fixture rootProps={{ open: false, onOpenChange: change }} />,
      );
      const trigger = container.querySelector<HTMLButtonElement>('[aria-haspopup="dialog"]')!;
      await userEvent.click(trigger);
      expect(getContent()).toBeNull();
      const details = change.mock.calls[0]![1];
      expect(change.mock.calls[0]![0]).toBe(true);
      expect(details.reason).toBe("trigger-press");
      expect(details.trigger).toBe(trigger);
      expect(details.event).toBeInstanceOf(MouseEvent);
      expect(details.isCanceled).toBe(false);
      rerender(<Fixture rootProps={{ open: true, onOpenChange: change }} />);
      await vi.waitFor(() => expect(getContent()).not.toBeNull());
      await userEvent.keyboard("{Escape}");
      expect(getContent()).not.toBeNull();
      expect(change.mock.calls.at(-1)![0]).toBe(false);
      expect(change.mock.calls.at(-1)![1].reason).toBe("escape-key");
      rerender(<Fixture rootProps={{ open: false, onOpenChange: change }} />);
      expect(getContent()).toBeNull();
    });

    it.each(["trigger-press", "close-press", "escape-key", "outside-press"] as const)(
      "details.cancel로 %s 요청을 취소한다",
      async (reason) => {
        const change = vi.fn<NonNullable<DialogRootProps["onOpenChange"]>>((_open, details) => {
          if (details.reason === reason) details.cancel();
        });
        render(<Fixture rootProps={{ onOpenChange: change }} />);
        if (reason === "trigger-press") {
          await userEvent.click(page.getByRole("button", { name: "열기", exact: true }));
          expect(getContent()).toBeNull();
        } else {
          await openDialog();
          if (reason === "close-press") await userEvent.click(getClose());
          if (reason === "escape-key") await userEvent.keyboard("{Escape}");
          if (reason === "outside-press") await clickOutside();
          expect(getContent()).not.toBeNull();
        }
        expect(change.mock.calls.at(-1)![1].reason).toBe(reason);
        expect(change.mock.calls.at(-1)![1].isCanceled).toBe(true);
      },
    );

    it.each(["trigger", "close", "escape", "outside"] as const)(
      "사용자 %s 이벤트의 preventDefault를 존중한다",
      async (part) => {
        render(
          <Dialog.Root>
            <Dialog.Trigger
              onClick={part === "trigger" ? (event) => event.preventDefault() : undefined}
            >
              열기
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Positioner
                data-positioner=""
                style={{ position: "fixed", inset: 0, padding: 40 }}
                onClick={part === "outside" ? (event) => event.preventDefault() : undefined}
              >
                <Dialog.Content
                  aria-label="설정"
                  onKeyDown={part === "escape" ? (event) => event.preventDefault() : undefined}
                >
                  <Dialog.Close
                    onClick={part === "close" ? (event) => event.preventDefault() : undefined}
                  >
                    닫기
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Positioner>
            </Dialog.Portal>
          </Dialog.Root>,
        );
        if (part === "trigger") {
          await userEvent.click(page.getByRole("button", { name: "열기" }));
          expect(getContent()).toBeNull();
          return;
        }
        await openDialog();
        if (part === "close") await userEvent.click(page.getByRole("button", { name: "닫기" }));
        if (part === "escape") await userEvent.keyboard("{Escape}");
        if (part === "outside") await clickOutside();
        expect(getContent()).not.toBeNull();
      },
    );

    it("비활성화한 Trigger와 Close가 변경을 요청하지 않는다", async () => {
      const change = vi.fn();
      const { rerender } = render(
        <Fixture rootProps={{ onOpenChange: change }} triggerProps={{ disabled: true }} />,
      );
      await expect.element(page.getByRole("button", { name: "열기" })).toBeDisabled();
      await userEvent.tab();
      await userEvent.tab();
      expect(document.activeElement).toBe(getAfter());
      expect(change).not.toHaveBeenCalled();
      rerender(<Fixture rootProps={{ defaultOpen: true, onOpenChange: change }} />);
      // defaultOpen is already consumed; enable the Trigger and open by user input.
      await openDialog();
      rerender(<Fixture rootProps={{ onOpenChange: change }} closeProps={{ disabled: true }} />);
      await expect.element(page.getByRole("button", { name: "닫기" })).toBeDisabled();
      getSecond().focus();
      await userEvent.tab();
      expect(document.activeElement).toBe(getFirst());
      expect(change).toHaveBeenCalledTimes(1);
    });
  });

  describe("초기 포커스와 키보드", () => {
    it("키보드로 열고 Tab·Shift+Tab을 순환한 뒤 Escape로 Trigger에 복원한다", async () => {
      const initialFocus = vi.fn(() => true);
      const { container } = render(<Fixture contentProps={{ initialFocus }} />);
      const trigger = container.querySelector<HTMLButtonElement>('[aria-haspopup="dialog"]')!;
      trigger.focus();
      await userEvent.keyboard("{Enter}");
      await vi.waitFor(() => expect(document.activeElement).toBe(getFirst()));
      expect(initialFocus).toHaveBeenCalledWith("keyboard");
      await userEvent.tab();
      expect(document.activeElement).toBe(getSecond());
      await userEvent.tab();
      expect(document.activeElement).toBe(getClose());
      await userEvent.tab();
      expect(document.activeElement).toBe(getFirst());
      await userEvent.tab({ shift: true });
      expect(document.activeElement).toBe(getClose());
      await closeDialog();
      expect(document.activeElement).toBe(trigger);
    });

    it("initialFocus Ref로 두 번째 요소를 선택한다", async () => {
      const target = createRef<HTMLButtonElement>();
      render(
        <Fixture
          contentProps={{ initialFocus: target }}
          body={
            <>
              <button>첫 번째</button>
              <button ref={target}>두 번째</button>
            </>
          }
        />,
      );
      await openDialog();
      expect(document.activeElement).toBe(target.current);
    });

    it("React autoFocus로 이미 받은 포커스를 유지한다", async () => {
      render(
        <Fixture
          body={
            <>
              <button>첫 번째</button>
              <input aria-label="이름" autoFocus />
            </>
          }
        />,
      );
      await openDialog();
      expect(document.activeElement?.getAttribute("aria-label")).toBe("이름");
    });

    it("Tab 가능한 요소가 없으면 Content에 포커스를 두고 유지한다", async () => {
      render(
        <Dialog.Root>
          <Dialog.Trigger>열기</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Content aria-label="설정">본문</Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>,
      );
      await openDialog();
      expect(document.activeElement).toBe(getContent());
      await userEvent.tab();
      expect(document.activeElement).toBe(getContent());
      await userEvent.tab({ shift: true });
      expect(document.activeElement).toBe(getContent());
    });

    it("tabIndex=-1인 정적 초기 대상으로부터 네이티브 Tab 이동을 유지한다", async () => {
      const target = createRef<HTMLHeadingElement>();
      render(
        <Dialog.Root>
          <Dialog.Trigger>열기</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Content aria-labelledby="static-title" initialFocus={target}>
              <Dialog.Title id="static-title" tabIndex={-1} ref={target}>
                설정
              </Dialog.Title>
              <button data-first="">첫 번째</button>
              <button data-second="">두 번째</button>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>,
      );
      await openDialog();
      expect(document.activeElement).toBe(target.current);
      await userEvent.tab();
      expect(document.activeElement).toBe(getFirst());
      await userEvent.tab({ shift: true });
      expect(document.activeElement).toBe(getSecond());
    });

    it("숨김·inert·disabled 요소를 제외하고 checked radio와 editing host를 탐색한다", async () => {
      render(
        <Fixture
          body={
            <>
              <button hidden>숨김</button>
              <fieldset disabled>
                <button>비활성</button>
              </fieldset>
              <div inert>
                <button>inert</button>
              </div>
              <input type="radio" name="choice" aria-label="선택 하나" />
              <input type="radio" name="choice" aria-label="선택 둘" defaultChecked />
              <div contentEditable="plaintext-only" suppressContentEditableWarning data-editor="">
                편집
              </div>
            </>
          }
        />,
      );
      await openDialog();
      expect(document.activeElement?.getAttribute("aria-label")).toBe("선택 둘");
      await userEvent.tab();
      expect(document.activeElement).toBe(document.querySelector("[data-editor]"));
      await userEvent.tab();
      expect(document.activeElement).toBe(getClose());
      await userEvent.tab();
      expect(document.activeElement?.getAttribute("aria-label")).toBe("선택 둘");
    });

    it("날짜 입력의 부분 필드 Tab 이동을 가로채지 않는다", async () => {
      const target = createRef<HTMLInputElement>();
      render(
        <Fixture
          contentProps={{ initialFocus: target }}
          body={<input type="date" ref={target} aria-label="날짜" />}
        />,
      );
      await openDialog();
      await userEvent.tab();
      expect(document.activeElement).toBe(target.current);
      for (let index = 0; index < 5 && document.activeElement !== getClose(); index++)
        await userEvent.tab();
      expect(document.activeElement).toBe(getClose());
      await userEvent.tab();
      expect(document.activeElement).toBe(target.current);
    });

    it("양수 tabIndex가 있는 자식의 실제 순서에서도 경계를 순환한다", async () => {
      render(
        <Fixture
          body={
            <>
              <button data-first="">일반 첫 번째</button>
              <button tabIndex={2}>우선 둘</button>
              <button tabIndex={1}>우선 하나</button>
              <button data-second="">일반 두 번째</button>
            </>
          }
        />,
      );
      await openDialog();
      expect(document.activeElement?.textContent).toBe("우선 하나");
      await userEvent.tab();
      expect(document.activeElement?.textContent).toBe("우선 둘");
      await userEvent.tab();
      expect(document.activeElement).toBe(getFirst());
      await userEvent.tab();
      expect(document.activeElement).toBe(getSecond());
      await userEvent.tab();
      expect(document.activeElement).toBe(getClose());
      await userEvent.tab();
      expect(document.activeElement?.textContent).toBe("우선 하나");
      await userEvent.tab({ shift: true });
      expect(document.activeElement).toBe(getClose());
    });

    it.each([false, undefined, true, null] as const)(
      "initialFocus 콜백의 %s 반환을 존중한다",
      async (result) => {
        const initialFocus = vi.fn(() => result);
        render(<Fixture contentProps={{ initialFocus }} />);
        await openDialog();
        expect(initialFocus).toHaveBeenCalledExactlyOnceWith("mouse");
        expect(getContent().contains(document.activeElement)).toBe(
          result === true || result === null,
        );
        await userEvent.tab();
        expect(getContent().contains(document.activeElement)).toBe(true);
      },
    );

    it("initialFocus=false이면 초기 이동을 생략하고 Tab으로 진입한다", async () => {
      render(<Fixture contentProps={{ initialFocus: false }} />);
      await openDialog();
      expect(getContent().contains(document.activeElement)).toBe(false);
      await userEvent.tab();
      expect(document.activeElement).toBe(getFirst());
    });

    it("initialFocus 콜백이 반환한 요소와 사용할 수 없는 Ref의 대체 동작을 지원한다", async () => {
      const target = createRef<HTMLButtonElement>();
      const { rerender } = render(
        <Fixture
          body={<button ref={target}>지정한 대상</button>}
          contentProps={{ initialFocus: () => target.current }}
        />,
      );
      await openDialog();
      expect(document.activeElement).toBe(target.current);
      await closeDialog();
      rerender(
        <Fixture
          body={
            <button disabled ref={target}>
              비활성 대상
            </button>
          }
          contentProps={{ initialFocus: target }}
        />,
      );
      await openDialog();
      expect(document.activeElement).toBe(getClose());
    });

    it("터치로 연 경우 Content를 선택하고 상호작용 유형을 전달한다", async () => {
      const initialFocus = vi.fn(() => true);
      const { container } = render(<Fixture contentProps={{ initialFocus }} />);
      const trigger = container.querySelector('[aria-haspopup="dialog"]')!;
      dispatchPointer(trigger, "pointerdown", { pointerType: "touch" });
      dispatchClick(trigger);
      await vi.waitFor(() => expect(document.activeElement).toBe(getContent()));
      expect(initialFocus).toHaveBeenCalledWith("touch");
    });

    it("포커스가 있는 React 자식이 제거되면 남은 제어 요소로 복구한다", async () => {
      render(<Fixture body={<RemovableControls />} />);
      await openDialog();
      await userEvent.click(page.getByRole("button", { name: "제거" }));
      await vi.waitFor(() => expect(document.activeElement).toBe(getSecond()));
    });

    it.each(["disabled", "hidden", "inert"] as const)(
      "포커스 대상이 %s 상태가 되면 복구한다",
      async (attribute) => {
        render(<Fixture />);
        await openDialog();
        getFirst()[attribute] = true;
        await vi.waitFor(() => expect(document.activeElement).toBe(getSecond()));
      },
    );

    it("다시 렌더링할 때 포커스를 유지하고 최신 finalFocus 콜백을 사용한다", async () => {
      const initial = vi.fn(() => true);
      const nextInitial = vi.fn(() => true);
      const final = vi.fn(() => true);
      const { rerender } = render(<Fixture contentProps={{ initialFocus: initial }} />);
      await openDialog();
      getSecond().focus();
      rerender(<Fixture contentProps={{ initialFocus: nextInitial, finalFocus: final }} />);
      expect(document.activeElement).toBe(getSecond());
      expect(nextInitial).not.toHaveBeenCalled();
      await closeDialog();
      expect(final).toHaveBeenCalledExactlyOnceWith("keyboard");
    });
  });

  describe("최종 포커스", () => {
    it("명시한 finalFocus Ref로 복원한다", async () => {
      const target = createRef<HTMLButtonElement>();
      render(
        <>
          <button ref={target}>다음 작업</button>
          <Fixture contentProps={{ finalFocus: target }} />
        </>,
      );
      await openDialog();
      await closeDialog();
      expect(document.activeElement).toBe(target.current);
    });

    it("최종 대상이 사용할 수 없으면 Trigger로 복원한다", async () => {
      const target = createRef<HTMLButtonElement>();
      render(
        <>
          <button disabled ref={target}>
            비활성 대상
          </button>
          <Fixture contentProps={{ finalFocus: target }} />
        </>,
      );
      await openDialog();
      await closeDialog();
      expect(document.activeElement?.textContent).toBe("열기");
    });

    it.each([false, undefined, true, null] as const)(
      "finalFocus 콜백의 %s 반환을 존중한다",
      async (result) => {
        const finalFocus = vi.fn(() => result);
        render(<Fixture contentProps={{ finalFocus }} />);
        await openDialog();
        await closeDialog();
        expect(finalFocus).toHaveBeenCalledExactlyOnceWith("keyboard");
        expect(document.activeElement?.textContent === "열기").toBe(
          result === true || result === null,
        );
      },
    );

    it("finalFocus=false이면 복원을 생략한다", async () => {
      render(<Fixture contentProps={{ finalFocus: false }} />);
      await openDialog();
      await closeDialog();
      expect(document.activeElement?.textContent).not.toBe("열기");
    });

    it("콜백이 반환한 최종 요소로 복원한다", async () => {
      const target = createRef<HTMLButtonElement>();
      render(
        <>
          <button ref={target}>다음 작업</button>
          <Fixture contentProps={{ finalFocus: () => target.current }} />
        </>,
      );
      await openDialog();
      await closeDialog();
      expect(document.activeElement).toBe(target.current);
    });

    it("Trigger 없이 열고 autoFocus가 먼저 실행되어도 이전 요소를 기억한다", async () => {
      render(<TriggerlessExample />);
      await userEvent.click(page.getByRole("button", { name: "외부에서 열기" }));
      await vi.waitFor(() =>
        expect(document.activeElement?.getAttribute("aria-label")).toBe("이름"),
      );
      await closeDialog();
      expect(document.activeElement?.textContent).toBe("외부에서 열기");
    });

    it("여러 Trigger 중 실제로 연 Trigger로 돌아간다", async () => {
      const { container } = render(
        <Dialog.Root>
          <Dialog.Trigger>하나</Dialog.Trigger>
          <Dialog.Trigger>둘</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Content aria-label="설정">
              <Dialog.Close>닫기</Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>,
      );
      const trigger = container.querySelectorAll("button")[1]!;
      await userEvent.click(trigger);
      await vi.waitFor(() => expect(getContent()).not.toBeNull());
      await closeDialog();
      expect(document.activeElement).toBe(trigger);
    });

    it("프로그램 상태 변경은 이전 사용자 입력 유형을 재사용하지 않는다", async () => {
      const initial = vi.fn(() => true);
      const final = vi.fn(() => true);
      const { rerender } = render(
        <Fixture contentProps={{ initialFocus: initial, finalFocus: final }} />,
      );
      await openDialog();
      await closeDialog();
      rerender(
        <Fixture
          rootProps={{ open: true }}
          contentProps={{ initialFocus: initial, finalFocus: final }}
        />,
      );
      await vi.waitFor(() => expect(getContent()).not.toBeNull());
      expect(initial).toHaveBeenLastCalledWith("");
      rerender(
        <Fixture
          rootProps={{ open: false }}
          contentProps={{ initialFocus: initial, finalFocus: final }}
        />,
      );
      await vi.waitFor(() => expect(final).toHaveBeenLastCalledWith(""));
    });

    it.each([true, false])(
      "Strict Mode에서 modal=%s의 effect 재실행 중에는 복원하지 않는다",
      async (modal) => {
        const final = vi.fn(() => true);
        render(
          <StrictMode>
            <Fixture rootProps={{ modal }} contentProps={{ finalFocus: final }} />
          </StrictMode>,
        );
        await openDialog();
        expect(final).not.toHaveBeenCalled();
        expect(document.activeElement).toBe(getFirst());
        await closeDialog();
        expect(final).toHaveBeenCalledExactlyOnceWith("keyboard");
        expect(document.activeElement?.textContent).toBe("열기");
      },
    );

    it("열린 Root의 unmount에서도 외부 상태를 복원하고 명시한 최종 대상으로 이동한다", async () => {
      const target = appendElement(document.createElement("button"));
      target.textContent = "다음 작업";
      const ref = createRef<HTMLButtonElement>();
      ref.current = target;
      const { unmount } = render(<Fixture contentProps={{ finalFocus: ref }} />);
      await openDialog();
      unmount();
      await vi.waitFor(() => expect(document.activeElement).toBe(target));
      expect(target.closest("[inert]")).toBeNull();
      expect(document.body.style.overflow).not.toBe("hidden");
    });
  });

  describe("Dialog 전환", () => {
    it.each(["close", "escape"] as const)(
      "확인 Dialog를 %s로 닫으면 편집 상태를 복원하고 저장 후 Trigger로 돌아간다",
      async (closeMethod) => {
        const save = vi.fn();
        const { container } = render(<SequentialDialogs onSave={save} />);
        const trigger = container.querySelector<HTMLButtonElement>('[aria-haspopup="dialog"]')!;

        await userEvent.click(trigger);
        const input = page.getByRole("textbox", { name: "이름" });
        await expect.element(page.getByRole("dialog", { name: "프로필 편집" })).toBeVisible();
        await userEvent.fill(input, "민지");
        await userEvent.click(page.getByRole("button", { name: "변경 확인" }));

        await expect.element(page.getByRole("dialog", { name: "변경 확인" })).toBeVisible();
        expect(document.querySelectorAll('[role="dialog"]')).toHaveLength(1);
        expect(document.activeElement?.closest('[role="dialog"]')).toBe(getContent());
        expect(getContent().textContent).toContain("민지");
        expect(document.body.style.overflow).toBe("hidden");

        if (closeMethod === "escape") {
          await userEvent.keyboard("{Escape}");
        } else {
          await userEvent.click(page.getByRole("button", { name: "편집으로 돌아가기" }));
        }

        await expect.element(page.getByRole("dialog", { name: "프로필 편집" })).toBeVisible();
        expect(document.querySelectorAll('[role="dialog"]')).toHaveLength(1);
        expect((document.querySelector("input") as HTMLInputElement).value).toBe("민지");
        expect(document.activeElement).toBe(document.querySelector("input"));
        expect(document.body.style.overflow).toBe("hidden");

        await userEvent.click(page.getByRole("button", { name: "변경 확인" }));
        await expect.element(page.getByRole("dialog", { name: "변경 확인" })).toBeVisible();
        await userEvent.click(page.getByRole("button", { name: "저장" }));
        await vi.waitFor(() => expect(document.querySelector('[role="dialog"]')).toBeNull());
        await vi.waitFor(() => expect(document.activeElement).toBe(trigger));
        expect(document.body.style.overflow).not.toBe("hidden");
        expect(save).toHaveBeenCalledExactlyOnceWith("민지");
      },
    );
  });

  describe("외부 포인터 상호작용", () => {
    it("Content 안의 클릭을 유지하고 Positioner의 빈 영역 클릭으로 닫는다", async () => {
      const change = vi.fn<NonNullable<DialogRootProps["onOpenChange"]>>();
      render(<Fixture rootProps={{ onOpenChange: change }} />);
      await openDialog();
      await userEvent.click(getFirst());
      expect(getContent()).not.toBeNull();
      await clickOutside();
      await vi.waitFor(() => expect(getContent()).toBeNull());
      expect(change.mock.calls.at(-1)![1].reason).toBe("outside-press");
      expect(document.activeElement?.textContent).toBe("열기");
    });

    it("Positioner 없이 Backdrop 클릭으로 닫는다", async () => {
      render(
        <Dialog.Root>
          <Dialog.Trigger>열기</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop data-backdrop="" style={{ position: "fixed", inset: 0 }} />
            <Dialog.Content aria-label="설정" style={{ position: "fixed", top: 100, left: 100 }}>
              <button>작업</button>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>,
      );
      await openDialog();
      await userEvent.click(document.querySelector("[data-backdrop]")!, {
        position: { x: 5, y: 5 },
      });
      await vi.waitFor(() => expect(getContent()).toBeNull());
    });

    it.each([
      "inside-start",
      "inside-end",
      "scroll",
      "secondary",
      "non-primary",
      "different-pointer",
      "cancel",
    ] as const)("%s 포인터 시퀀스는 외부 클릭 닫기로 해석하지 않는다", async (sequence) => {
      render(<Fixture />);
      await openDialog();
      const outside = document.querySelector("[data-positioner]")!;
      const start = sequence === "inside-start" ? getFirst() : outside;
      const end = sequence === "inside-end" ? getFirst() : outside;
      dispatchPointer(start, "pointerdown", {
        button: sequence === "secondary" ? 2 : 0,
        isPrimary: sequence !== "non-primary",
        pointerType: sequence === "scroll" ? "touch" : "mouse",
      });
      if (sequence === "cancel") dispatchPointer(outside, "pointercancel");
      dispatchPointer(end, "pointerup", {
        pointerId: sequence === "different-pointer" ? 2 : 1,
        clientY: sequence === "scroll" ? 100 : 5,
      });
      dispatchClick(end);
      expect(getContent()).not.toBeNull();
    });
  });

  describe("모달과 비모달", () => {
    it("모달의 외부를 실제로 비활성화하고 동적으로 추가한 외부 요소도 복원한다", async () => {
      const preexisting = appendElement(document.createElement("button"));
      preexisting.inert = true;
      render(<Fixture />);
      await openDialog();
      expect(getAfter().closest("[inert]")).not.toBeNull();
      getAfter().focus();
      expect(document.activeElement).toBe(getFirst());
      const added = appendElement(document.createElement("button"));
      await vi.waitFor(() => expect(added.inert).toBe(true));
      added.focus();
      expect(document.activeElement).toBe(getFirst());
      await closeDialog();
      expect(getAfter().closest("[inert]")).toBeNull();
      expect(added.inert).toBe(false);
      expect(preexisting.inert).toBe(true);
    });

    it("Scroll Lock을 해제하면 기존 inline 값과 important 우선순위를 복원한다", async () => {
      for (const element of [document.body, document.documentElement]) {
        const style = element.getAttribute("style");
        cleanups.push(() => {
          if (style === null) element.removeAttribute("style");
          else element.setAttribute("style", style);
        });
      }
      document.body.style.setProperty("overflow", "auto", "important");
      document.body.style.paddingRight = "11px";
      document.documentElement.style.setProperty("overflow", "scroll", "important");
      render(<Fixture />);
      await openDialog();
      expect(document.body.style.overflow).toBe("hidden");
      expect(document.documentElement.style.overflow).toBe("hidden");
      await closeDialog();
      expect(document.body.style.overflow).toBe("auto");
      expect(document.body.style.getPropertyPriority("overflow")).toBe("important");
      expect(document.body.style.paddingRight).toBe("11px");
      expect(document.documentElement.style.overflow).toBe("scroll");
      expect(document.documentElement.style.getPropertyPriority("overflow")).toBe("important");
    });

    it("비모달은 Tab과 Shift+Tab으로 외부 이동을 허용하고 포커스 이동만으로 닫지 않는다", async () => {
      render(<Fixture portal={false} rootProps={{ modal: false }} />);
      await openDialog();
      expect(document.body.style.overflow).not.toBe("hidden");
      expect(getAfter().closest("[inert]")).toBeNull();
      getClose().focus();
      await userEvent.tab();
      expect(document.activeElement).toBe(getAfter());
      expect(getContent()).not.toBeNull();
      getFirst().focus();
      await userEvent.tab({ shift: true });
      expect(document.activeElement?.textContent).toBe("열기");
      getAfter().focus();
      await closeDialog();
      expect(document.activeElement).toBe(getAfter());
    });

    it("비모달의 전체 뷰포트 Positioner가 외부 버튼 클릭을 가로채지 않는다", async () => {
      const clicked = vi.fn();
      render(<Fixture rootProps={{ modal: false }} />);
      await openDialog();
      getAfter().addEventListener("click", clicked);
      await userEvent.click(getFirst());
      expect(getContent()).not.toBeNull();
      await userEvent.click(getAfter());
      await vi.waitFor(() => expect(getContent()).toBeNull());
      expect(clicked).toHaveBeenCalledTimes(1);
      expect(document.activeElement).toBe(getAfter());
    });

    it.each([true, false])(
      "비모달의 명시적 최종 대상 사용 가능 여부 %s에 따라 외부 포커스를 보존한다",
      async (available) => {
        const target = createRef<HTMLButtonElement>();
        render(
          <>
            <button ref={target} disabled={!available}>
              최종 대상
            </button>
            <Fixture rootProps={{ modal: false }} contentProps={{ finalFocus: target }} />
          </>,
        );
        await openDialog();
        await userEvent.click(getAfter());
        await vi.waitFor(() => expect(getContent()).toBeNull());
        expect(document.activeElement).toBe(available ? target.current : getAfter());
      },
    );

    it("비모달의 외부 닫기를 취소해도 외부 버튼의 실행과 포커스는 허용한다", async () => {
      const clicked = vi.fn();
      render(
        <Fixture
          rootProps={{
            modal: false,
            onOpenChange: (_open, details) => {
              if (details.reason === "outside-press") details.cancel();
            },
          }}
        />,
      );
      await openDialog();
      getAfter().addEventListener("click", clicked);
      await userEvent.click(getAfter());
      expect(getContent()).not.toBeNull();
      expect(clicked).toHaveBeenCalledTimes(1);
      expect(document.activeElement).toBe(getAfter());
    });

    it("열린 상태에서 modal을 바꿔도 초기·최종 콜백을 재실행하지 않고 모달 경계를 갱신한다", async () => {
      const initial = vi.fn(() => true);
      const final = vi.fn(() => true);
      const props = { initialFocus: initial, finalFocus: final };
      const { rerender } = render(
        <Fixture
          portal={false}
          rootProps={{ defaultOpen: true, modal: false }}
          contentProps={props}
        />,
      );
      await vi.waitFor(() => expect(getContent()).not.toBeNull());
      getAfter().focus();
      rerender(
        <Fixture
          portal={false}
          rootProps={{ defaultOpen: true, modal: true }}
          contentProps={props}
        />,
      );
      expect(getContent().getAttribute("aria-modal")).toBe("true");
      expect(document.body.style.overflow).toBe("hidden");
      expect(getAfter().closest("[inert]")).not.toBeNull();
      expect(document.activeElement).toBe(getFirst());
      getClose().focus();
      await userEvent.tab();
      expect(document.activeElement).toBe(getFirst());
      rerender(
        <Fixture
          portal={false}
          rootProps={{ defaultOpen: true, modal: false }}
          contentProps={props}
        />,
      );
      expect(getContent().hasAttribute("aria-modal")).toBe(false);
      expect(document.body.style.overflow).not.toBe("hidden");
      expect(document.querySelector("[data-backdrop]")).toBeNull();
      getClose().focus();
      await userEvent.tab();
      expect(document.activeElement).toBe(getAfter());
      expect(initial).toHaveBeenCalledTimes(1);
      expect(final).not.toHaveBeenCalled();
    });

    it.each([
      [true, true],
      [true, false],
      [false, true],
      [false, false],
    ] as const)(
      "부모 modal=%s와 자식 modal=%s의 경계와 복원을 유지한다",
      async (parentModal, childModal) => {
        render(<NestedFixture parentModal={parentModal} childModal={childModal} />);
        await openDialog();
        await userEvent.click(page.getByRole("button", { name: "자식 열기" }));
        await vi.waitFor(() => expect(document.querySelectorAll('[role="dialog"]').length).toBe(2));
        const parentFirst = document.querySelector<HTMLButtonElement>("[data-parent-first]")!;
        const parentLast = document.querySelector<HTMLButtonElement>("[data-parent-last]")!;
        const childFirst = document.querySelector<HTMLButtonElement>("[data-child-first]")!;
        const childLast = document.querySelector<HTMLButtonElement>("[data-child-last]")!;
        const outside = document.querySelector<HTMLButtonElement>("[data-outside]")!;
        expect(document.activeElement).toBe(childFirst);
        expect(parentFirst.closest("[inert]") !== null).toBe(childModal);
        expect(outside.closest("[inert]") !== null).toBe(parentModal || childModal);
        expect(document.body.style.overflow === "hidden").toBe(parentModal || childModal);
        if (parentModal && !childModal) {
          parentLast.focus();
          await userEvent.tab();
          expect(document.activeElement).toBe(childFirst);
          await userEvent.tab({ shift: true });
          expect(document.activeElement).toBe(parentLast);
          childLast.focus();
          await userEvent.tab();
          expect(document.activeElement).toBe(parentFirst);
        } else if (childModal) {
          childLast.focus();
          await userEvent.tab();
          expect(document.activeElement).toBe(childFirst);
        } else {
          outside.focus();
          expect(document.activeElement).toBe(outside);
        }
        childFirst.focus();
        await userEvent.keyboard("{Escape}");
        await vi.waitFor(() => expect(document.querySelectorAll('[role="dialog"]').length).toBe(1));
        expect(document.activeElement?.textContent).toBe("자식 열기");
        expect(document.body.style.overflow === "hidden").toBe(parentModal);
        await closeDialog();
        expect(document.activeElement?.textContent).toBe("열기");
      },
    );

    it("비모달이 남아 있어도 마지막 모달을 닫으면 외부 비활성화와 Scroll Lock을 해제한다", async () => {
      render(
        <>
          <button data-outside="">외부</button>
          <Dialog.Root defaultOpen>
            <Dialog.Portal>
              <Dialog.Content aria-label="모달">
                <button>모달 작업</button>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
          <Dialog.Root defaultOpen modal={false}>
            <Dialog.Portal>
              <Dialog.Content aria-label="비모달">
                <button>비모달 작업</button>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </>,
      );
      await vi.waitFor(() => expect(document.querySelectorAll('[role="dialog"]').length).toBe(2));
      const nonModal = document.querySelector<HTMLElement>('[aria-label="비모달"]')!;
      expect(nonModal.closest("[inert]")).not.toBeNull();
      await userEvent.keyboard("{Escape}");
      await vi.waitFor(() => expect(document.querySelector('[aria-label="모달"]')).toBeNull());
      expect(nonModal.closest("[inert]")).toBeNull();
      expect(document.body.style.overflow).not.toBe("hidden");
      const outside = document.querySelector<HTMLButtonElement>("[data-outside]")!;
      outside.focus();
      expect(document.activeElement).toBe(outside);
    });

    it("open과 modal이 동시에 바뀌어도 닫히는 최상위 모달의 finalFocus를 실행한다", async () => {
      const target = createRef<HTMLButtonElement>();
      const final = vi.fn(() => target.current);
      const example = (open: boolean) => (
        <>
          <Dialog.Root open={open} modal={open}>
            <Dialog.Trigger ref={target}>모달 Trigger</Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Content aria-label="모달" finalFocus={final}>
                <button>모달 작업</button>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
          <Dialog.Root defaultOpen modal={false}>
            <Dialog.Portal>
              <Dialog.Content aria-label="비모달">
                <button>비모달 작업</button>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </>
      );
      const { rerender } = render(example(true));
      await vi.waitFor(() => expect(document.querySelectorAll('[role="dialog"]').length).toBe(2));
      rerender(example(false));
      await vi.waitFor(() => expect(final).toHaveBeenCalledTimes(1));
      expect(document.activeElement).toBe(target.current);
    });

    it("처음부터 열린 inline 자식의 effect 순서와 무관하게 최상위 Dialog만 닫는다", async () => {
      render(
        <Dialog.Root defaultOpen>
          <Dialog.Content aria-label="부모">
            <button>부모 작업</button>
            <Dialog.Root defaultOpen>
              <Dialog.Content aria-label="자식">
                <button>자식 작업</button>
              </Dialog.Content>
            </Dialog.Root>
          </Dialog.Content>
        </Dialog.Root>,
      );
      expect(document.activeElement?.textContent).toBe("자식 작업");
      await userEvent.keyboard("{Escape}");
      await vi.waitFor(() => expect(document.querySelectorAll('[role="dialog"]').length).toBe(1));
      expect(getContent().getAttribute("aria-label")).toBe("부모");
    });
  });

  describe("스크롤과 합성", () => {
    it.each(["outside", "inside"] as const)(
      "페이지를 잠근 동안 %s 스크롤 영역의 PageDown을 허용한다",
      async (mode) => {
        const scroller = createRef<HTMLDivElement>();
        const content = createRef<HTMLDivElement>();
        render(
          <Dialog.Root>
            <Dialog.Trigger>열기</Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Positioner
                ref={mode === "outside" ? scroller : undefined}
                style={{
                  position: "fixed",
                  inset: 0,
                  height: 140,
                  overflow: mode === "outside" ? "auto" : "hidden",
                }}
              >
                <Dialog.Content
                  ref={content}
                  aria-label="설정"
                  initialFocus={mode === "outside" ? content : scroller}
                >
                  <Dialog.Body
                    ref={mode === "inside" ? scroller : undefined}
                    tabIndex={-1}
                    style={mode === "inside" ? { height: 100, overflow: "auto" } : {}}
                  >
                    <div style={{ height: 700 }}>긴 본문</div>
                  </Dialog.Body>
                  <Dialog.Close>닫기</Dialog.Close>
                </Dialog.Content>
              </Dialog.Positioner>
            </Dialog.Portal>
          </Dialog.Root>,
        );
        await openDialog();
        const pageScroll = document.documentElement.scrollTop;
        await userEvent.keyboard("{PageDown}");
        await vi.waitFor(() => expect(scroller.current!.scrollTop).toBeGreaterThan(0));
        expect(document.documentElement.scrollTop).toBe(pageScroll);
        expect(document.body.style.overflow).toBe("hidden");
        expect(getContent()).not.toBeNull();
      },
    );

    it("Tab으로 이동한 본문 하단 요소를 화면 안으로 스크롤한다", async () => {
      const body = createRef<HTMLDivElement>();
      render(
        <Dialog.Root>
          <Dialog.Trigger>열기</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Content aria-label="설정">
              <Dialog.Body ref={body} style={{ height: 80, overflow: "auto" }}>
                <button data-first="">위</button>
                <div style={{ height: 400 }} />
                <button data-second="">아래</button>
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>,
      );
      await openDialog();
      expect(body.current!.scrollTop).toBe(0);
      await userEvent.tab();
      expect(document.activeElement).toBe(getSecond());
      await vi.waitFor(() => expect(body.current!.scrollTop).toBeGreaterThan(0));
    });

    it("모든 DOM Part의 render에서 Props·Ref와 의미를 유지하고 이벤트를 합성한다", async () => {
      const refs = {
        trigger: createRef<HTMLButtonElement>(),
        portal: createRef<HTMLDivElement>(),
        backdrop: createRef<HTMLDivElement>(),
        positioner: createRef<HTMLDivElement>(),
        content: createRef<HTMLDivElement>(),
        header: createRef<HTMLDivElement>(),
        title: createRef<HTMLHeadingElement>(),
        description: createRef<HTMLParagraphElement>(),
        body: createRef<HTMLDivElement>(),
        footer: createRef<HTMLDivElement>(),
        close: createRef<HTMLButtonElement>(),
      };
      const renderRef = createRef<HTMLDivElement>();
      const calls: string[] = [];
      render(
        <Dialog.Root>
          <Dialog.Trigger
            ref={refs.trigger}
            render={<CustomButton onClick={() => calls.push("render")} />}
            onClick={() => calls.push("part")}
          >
            열기
          </Dialog.Trigger>
          <Dialog.Portal ref={refs.portal} render={<CustomContainer />}>
            <Dialog.Backdrop ref={refs.backdrop} render={<CustomContainer />} />
            <Dialog.Positioner ref={refs.positioner} render={<CustomContainer />}>
              <Dialog.Content
                ref={refs.content}
                aria-labelledby="custom-title"
                aria-describedby="custom-description"
                render={<CustomContainer ref={renderRef} />}
              >
                <Dialog.Header ref={refs.header} render={<CustomContainer />}>
                  <Dialog.Title id="custom-title" ref={refs.title} render={<CustomTitle />}>
                    설정
                  </Dialog.Title>
                  <Dialog.Description
                    id="custom-description"
                    ref={refs.description}
                    render={<CustomDescription />}
                  >
                    설명
                  </Dialog.Description>
                </Dialog.Header>
                <Dialog.Body ref={refs.body} render={<CustomContainer />}>
                  본문
                </Dialog.Body>
                <Dialog.Footer ref={refs.footer} render={<CustomContainer />}>
                  <Dialog.Close ref={refs.close} render={<CustomButton />}>
                    닫기
                  </Dialog.Close>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Positioner>
          </Dialog.Portal>
        </Dialog.Root>,
      );
      await openDialog();
      expect(calls).toEqual(["render", "part"]);
      expect(renderRef.current).toBe(refs.content.current);
      for (const ref of Object.values(refs))
        expect(ref.current?.hasAttribute("data-custom")).toBe(true);
      expect(refs.content.current?.getAttribute("role")).toBe("dialog");
      expect(refs.backdrop.current?.getAttribute("aria-hidden")).toBe("true");
      await expect
        .element(page.getByRole("dialog", { name: "설정" }))
        .toHaveAccessibleDescription("설명");
      expect((await axe.run(refs.portal.current!)).violations).toEqual([]);
      await userEvent.click(refs.close.current!);
      await vi.waitFor(() => expect(refs.content.current).toBeNull());
      expect(renderRef.current).toBeNull();
      for (const [name, ref] of Object.entries(refs))
        if (name !== "trigger") expect(ref.current).toBeNull();
    });

    it("기본 button의 type을 보충하고 render 대상의 기본값과 명시적인 type을 보존한다", async () => {
      const { container, rerender } = render(<Fixture />);
      expect(container.querySelector<HTMLButtonElement>('[aria-haspopup="dialog"]')!.type).toBe(
        "button",
      );
      await openDialog();
      expect(getClose().type).toBe("button");
      await closeDialog();
      rerender(
        <Fixture
          triggerProps={{ render: <SubmitButton /> }}
          closeProps={{ render: <SubmitButton /> }}
        />,
      );
      expect(container.querySelector<HTMLButtonElement>('[aria-haspopup="dialog"]')!.type).toBe(
        "submit",
      );
      await openDialog();
      expect(getClose().type).toBe("submit");
      await closeDialog();
      rerender(
        <Fixture
          triggerProps={{ render: <SubmitButton />, type: "reset" }}
          closeProps={{ render: <SubmitButton />, type: "reset" }}
        />,
      );
      expect(container.querySelector<HTMLButtonElement>('[aria-haspopup="dialog"]')!.type).toBe(
        "reset",
      );
      await openDialog();
      expect(getClose().type).toBe("reset");
    });
  });
});

function dispatchPointer(target: Element, type: string, options: PointerEventInit = {}) {
  target.dispatchEvent(
    new PointerEvent(type, {
      bubbles: true,
      cancelable: true,
      button: 0,
      isPrimary: true,
      pointerId: 1,
      pointerType: "mouse",
      clientX: 5,
      clientY: 5,
      ...options,
    }),
  );
}
function dispatchClick(target: Element) {
  target.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, detail: 1 }));
}

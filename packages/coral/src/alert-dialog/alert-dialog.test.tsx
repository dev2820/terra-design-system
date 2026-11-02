import axe from "axe-core";
import { createRef, useId, useState, type ComponentProps, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { createRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import { AlertDialog, type AlertDialogContentProps, type AlertDialogRootProps } from ".";
import { AlertDialog as RootExportAlertDialog } from "..";
import { Dialog } from "../dialog";

const fixtures: Array<{ container: HTMLDivElement; root: Root }> = [];

afterEach(async () => {
  for (const { root, container } of fixtures.splice(0).toReversed()) {
    flushSync(() => root.unmount());
    container.remove();
  }
  await Promise.resolve();
});

function render(children: ReactNode) {
  const container = document.createElement("div");
  const root = createRoot(container);
  document.body.append(container);
  fixtures.push({ container, root });
  flushSync(() => root.render(children));
  return { container };
}

function Fixture({
  rootProps = {},
  contentProps = {},
  body,
}: {
  rootProps?: AlertDialogRootProps;
  contentProps?: AlertDialogContentProps;
  body?: ReactNode;
}) {
  const titleId = useId();
  const descriptionId = useId();
  return (
    <>
      <button data-outside="">외부</button>
      <AlertDialog.Root {...rootProps}>
        <AlertDialog.Trigger>열기</AlertDialog.Trigger>
        <AlertDialog.Portal data-portal="">
          <AlertDialog.Backdrop data-backdrop="" style={{ position: "fixed", inset: 0 }} />
          <AlertDialog.Positioner
            data-positioner=""
            style={{ position: "fixed", inset: 0, padding: 40 }}
          >
            <AlertDialog.Content
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              style={{ width: 280 }}
              {...contentProps}
            >
              <AlertDialog.Header data-header="">
                <AlertDialog.Title id={titleId}>삭제 확인</AlertDialog.Title>
                <AlertDialog.Description id={descriptionId}>
                  항목을 삭제할까요?
                </AlertDialog.Description>
              </AlertDialog.Header>
              <AlertDialog.Body data-body="">
                {body === undefined ? (
                  <>
                    <button data-first="">취소</button>
                    <button data-second="">다른 작업</button>
                  </>
                ) : (
                  body
                )}
              </AlertDialog.Body>
              <AlertDialog.Footer data-footer="">
                <AlertDialog.Close data-close="">닫기</AlertDialog.Close>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog.Positioner>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
}

function getContent() {
  return document.querySelector<HTMLElement>('[role="alertdialog"]')!;
}

async function openAlert() {
  await userEvent.click(page.getByRole("button", { name: "열기", exact: true }));
  await vi.waitFor(() => expect(getContent()).not.toBeNull());
}

function CustomButton(props: ComponentProps<"button">) {
  return <button {...props} data-custom="" />;
}

function CustomContainer(props: ComponentProps<"div">) {
  return <div {...props} data-custom="" />;
}

function Controlled() {
  const [open, setOpen] = useState(false);
  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger>열기</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Content aria-label="확인" aria-describedby="controlled-message">
          <AlertDialog.Description id="controlled-message">계속할까요?</AlertDialog.Description>
          <AlertDialog.Close>닫기</AlertDialog.Close>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

// Browser input verifies focus, pointer dismissal and modal behavior. Native button
// activation and Core's prop-merge matrix are covered by their own tests.
describe("AlertDialog", () => {
  it("루트와 하위 경로에서 같은 Parts를 제공한다", () => {
    expect(RootExportAlertDialog).toBe(AlertDialog);
  });

  it("이름·메시지·모달 구조를 렌더링하고 닫힌 뒤 포커스와 스크롤을 복원한다", async () => {
    const { container } = render(<Fixture />);
    const trigger = container.querySelector<HTMLButtonElement>('[aria-haspopup="dialog"]')!;
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(trigger.hasAttribute("aria-controls")).toBe(false);
    await openAlert();

    const content = getContent();
    await expect
      .element(page.getByRole("alertdialog", { name: "삭제 확인" }))
      .toHaveAccessibleDescription("항목을 삭제할까요?");
    expect(content.getAttribute("aria-modal")).toBe("true");
    expect(content.tabIndex).toBe(-1);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(trigger.getAttribute("aria-controls")).toBe(content.id);
    expect(content.getAttribute("aria-labelledby")).toBe(content.querySelector("h2")?.id);
    expect(content.getAttribute("aria-describedby")).toBe(content.querySelector("p")?.id);
    expect(document.querySelector("[data-portal]")?.parentElement).toBe(document.body);
    expect(document.querySelector("[data-backdrop]")?.getAttribute("aria-hidden")).toBe("true");
    for (const selector of ["[data-header]", "[data-body]", "[data-footer]"]) {
      expect(content.querySelector(selector)?.tagName).toBe("DIV");
    }
    expect(document.activeElement).toBe(content.querySelector("[data-first]"));
    expect(container.inert).toBe(true);
    expect(document.body.style.overflow).toBe("hidden");
    expect(
      (await axe.run(document.querySelector<HTMLElement>("[data-portal]")!)).violations,
    ).toEqual([]);

    await userEvent.click(page.getByRole("button", { name: "닫기" }));
    await vi.waitFor(() => expect(document.querySelector('[role="alertdialog"]')).toBeNull());
    await vi.waitFor(() => expect(document.activeElement).toBe(trigger));
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(trigger.hasAttribute("aria-controls")).toBe(false);
    expect(container.inert).toBe(false);
    expect(document.body.style.overflow).not.toBe("hidden");
  });

  it("바깥 클릭을 무시하고 Escape로 닫는다", async () => {
    const change = vi.fn<NonNullable<AlertDialogRootProps["onOpenChange"]>>();
    render(<Fixture rootProps={{ onOpenChange: change }} />);
    await openAlert();
    await userEvent.click(document.querySelector("[data-positioner]")!, {
      position: { x: 5, y: 5 },
    });
    expect(getContent()).not.toBeNull();
    expect(change).toHaveBeenCalledTimes(1);

    await userEvent.keyboard("{Escape}");
    await vi.waitFor(() => expect(document.querySelector('[role="alertdialog"]')).toBeNull());
    expect(change.mock.calls.at(-1)?.[1].reason).toBe("escape-key");
  });

  it("Tab과 Shift+Tab을 내부에서 순환한다", async () => {
    render(<Fixture />);
    await openAlert();
    expect(document.activeElement).toBe(document.querySelector("[data-first]"));
    await userEvent.tab();
    expect(document.activeElement).toBe(document.querySelector("[data-second]"));
    await userEvent.tab();
    expect(document.activeElement).toBe(document.querySelector("[data-close]"));
    await userEvent.tab();
    expect(document.activeElement).toBe(document.querySelector("[data-first]"));
    await userEvent.tab({ shift: true });
    expect(document.activeElement).toBe(document.querySelector("[data-close]"));
  });

  it("initialFocus Ref가 기본 첫 버튼보다 우선한다", async () => {
    const target = createRef<HTMLButtonElement>();
    render(
      <Fixture
        contentProps={{ initialFocus: target }}
        body={
          <>
            <button>취소</button>
            <button ref={target}>계속</button>
          </>
        }
      />,
    );
    await openAlert();
    expect(document.activeElement).toBe(target.current);
  });

  it("변경 요청을 취소하면 열린 상태를 유지한다", async () => {
    const change = vi.fn<NonNullable<AlertDialogRootProps["onOpenChange"]>>((open, details) => {
      if (!open) details.cancel();
    });
    render(<Fixture rootProps={{ onOpenChange: change }} />);
    await openAlert();
    await userEvent.click(page.getByRole("button", { name: "닫기" }));
    expect(getContent()).not.toBeNull();
    expect(change.mock.calls.at(-1)?.[1].reason).toBe("close-press");
    expect(change.mock.calls.at(-1)?.[1].isCanceled).toBe(true);
  });

  it("제어 상태에서도 열고 닫을 수 있다", async () => {
    render(<Controlled />);
    await openAlert();
    await userEvent.click(page.getByRole("button", { name: "닫기" }));
    await vi.waitFor(() => expect(document.querySelector('[role="alertdialog"]')).toBeNull());
  });

  it("render가 Parts의 Props와 Ref를 실제 요소에 연결한다", async () => {
    const trigger = createRef<HTMLButtonElement>();
    const content = createRef<HTMLDivElement>();
    const close = createRef<HTMLButtonElement>();
    render(
      <AlertDialog.Root>
        <AlertDialog.Trigger ref={trigger} render={<CustomButton />}>
          열기
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Content ref={content} render={<CustomContainer />} aria-label="확인">
            <AlertDialog.Close ref={close} render={<CustomButton />}>
              닫기
            </AlertDialog.Close>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>,
    );
    await openAlert();
    expect(trigger.current?.hasAttribute("data-custom")).toBe(true);
    expect(content.current?.getAttribute("role")).toBe("alertdialog");
    expect(content.current?.hasAttribute("data-custom")).toBe(true);
    expect(close.current?.hasAttribute("data-custom")).toBe(true);
    await userEvent.click(close.current!);
    await vi.waitFor(() => expect(content.current).toBeNull());
    expect(close.current).toBeNull();
  });

  it("Dialog 위에 열려도 하나의 모달 스택으로 동작한다", async () => {
    render(
      <Dialog.Root defaultOpen>
        <Dialog.Portal>
          <Dialog.Content aria-label="편집">
            <AlertDialog.Root>
              <AlertDialog.Trigger>삭제 확인 열기</AlertDialog.Trigger>
              <AlertDialog.Portal>
                <AlertDialog.Content aria-label="삭제 확인" aria-describedby="nested-message">
                  <AlertDialog.Description id="nested-message">
                    항목을 삭제할까요?
                  </AlertDialog.Description>
                  <AlertDialog.Close>취소</AlertDialog.Close>
                </AlertDialog.Content>
              </AlertDialog.Portal>
            </AlertDialog.Root>
            <Dialog.Close>편집 닫기</Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>,
    );
    const trigger = page.getByRole("button", { name: "삭제 확인 열기" });
    await userEvent.click(trigger);
    await expect.element(page.getByRole("alertdialog", { name: "삭제 확인" })).toBeVisible();
    expect(document.body.style.overflow).toBe("hidden");
    await userEvent.click(page.getByRole("button", { name: "취소" }));
    await expect.element(page.getByRole("dialog", { name: "편집" })).toBeVisible();
    await expect.element(trigger).toHaveFocus();
    expect(document.body.style.overflow).toBe("hidden");
    await userEvent.click(page.getByRole("button", { name: "편집 닫기" }));
    expect(document.body.style.overflow).not.toBe("hidden");
  });

  it("Portal 없이 열린 Content를 서버 HTML에 포함한다", () => {
    const html = renderToString(
      <AlertDialog.Root defaultOpen>
        <AlertDialog.Content aria-label="안내" aria-describedby="server-message">
          <AlertDialog.Description id="server-message">계속할까요?</AlertDialog.Description>
          <AlertDialog.Close>확인</AlertDialog.Close>
        </AlertDialog.Content>
      </AlertDialog.Root>,
    );
    expect(html).toContain('role="alertdialog"');
    expect(html).toContain('aria-modal="true"');
    expect(html).toContain('aria-describedby="server-message"');
  });
});

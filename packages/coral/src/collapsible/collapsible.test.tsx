import axe from "axe-core";
import { createRef, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { createRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import { Collapsible, type CollapsibleChangeEventDetails } from ".";
import { Collapsible as RootExportCollapsible } from "..";

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

function fixture(rootProps: React.ComponentProps<typeof Collapsible.Root> = {}) {
  return (
    <Collapsible.Root data-testid="root" {...rootProps}>
      <Collapsible.Trigger data-testid="trigger">자세히 보기</Collapsible.Trigger>
      <Collapsible.Panel data-testid="panel">추가 내용</Collapsible.Panel>
    </Collapsible.Root>
  );
}

function getParts(container: HTMLElement) {
  return {
    root: container.querySelector<HTMLElement>("[data-testid='root']")!,
    trigger: container.querySelector<HTMLButtonElement>("[data-testid='trigger']")!,
    panel: container.querySelector<HTMLElement>("[data-testid='panel']")!,
  };
}

function expectOpenState(container: HTMLElement, open: boolean) {
  const { root, trigger, panel } = getParts(container);

  expect(trigger.getAttribute("aria-expanded")).toBe(String(open));
  expect(trigger.hasAttribute("data-expanded")).toBe(open);
  expect(root.hasAttribute("data-open")).toBe(open);
  expect(panel.hasAttribute("data-open")).toBe(open);
  expect(panel.hidden).toBe(!open);
}

// Native button owns keyboard activation and focus. Verify its connection to the panel state.
describe("Collapsible", () => {
  it("루트와 하위 경로에서 같은 컴포넌트를 제공한다", () => {
    expect(RootExportCollapsible).toBe(Collapsible);
  });

  it("버튼과 패널의 ID 관계, 기본 type, 닫힌 상태를 완성한다", async () => {
    const { container } = render(fixture());
    const { root, trigger, panel } = getParts(container);

    expect(root.tagName).toBe("DIV");
    expect(trigger.type).toBe("button");
    expect(trigger.getAttribute("aria-controls")).toBe(panel.id);
    expect(root.id).toMatch(/-collapsible$/);
    expect(trigger.id).toBe(`${root.id}-trigger`);
    expect(panel.id).toBe(`${root.id}-panel`);
    expectOpenState(container, false);
    await expect.element(page.getByRole("button", { name: "자세히 보기" })).toBeVisible();
  });

  it.each([false, true])("서버 HTML에 초기 펼침 상태 %s를 표시한다", (defaultOpen) => {
    const container = document.createElement("div");
    container.innerHTML = renderToString(fixture({ defaultOpen }));

    expectOpenState(container, defaultOpen);
    expect(getParts(container).trigger.getAttribute("aria-controls")).toBe(
      getParts(container).panel.id,
    );
  });

  it.each([false, true])(
    "비제어 초기 상태 %s에서 열고 닫으며 변경 정보를 전달한다",
    async (defaultOpen) => {
      const onOpenChange = vi.fn();
      const { container } = render(fixture({ defaultOpen, onOpenChange }));
      const { trigger } = getParts(container);

      await userEvent.click(trigger);
      expectOpenState(container, !defaultOpen);
      expect(onOpenChange).toHaveBeenCalledTimes(1);
      const [open, details] = onOpenChange.mock.calls[0]!;
      expect(open).toBe(!defaultOpen);
      expect(details.reason).toBe("trigger-press");
      expect(details.event).toBeInstanceOf(MouseEvent);
      expect(details.trigger).toBe(trigger);
      expect(details.isCanceled).toBe(false);

      await userEvent.click(trigger);
      expectOpenState(container, defaultOpen);
      expect(onOpenChange.mock.calls[1]?.[0]).toBe(defaultOpen);
    },
  );

  it("제어 상태에서는 변경을 요청하고 부모가 준 상태만 반영한다", async () => {
    const onOpenChange = vi.fn();
    const { container, rerender } = render(
      fixture({ open: false, defaultOpen: true, onOpenChange }),
    );
    const { trigger } = getParts(container);

    expectOpenState(container, false);
    await userEvent.click(trigger);
    expect(onOpenChange).toHaveBeenCalledWith(true, expect.anything());
    expectOpenState(container, false);

    rerender(fixture({ open: true, onOpenChange }));
    expectOpenState(container, true);
  });

  it("사용자 onClick의 preventDefault는 변경 요청을 막는다", async () => {
    const onOpenChange = vi.fn();
    const { container } = render(
      <Collapsible.Root onOpenChange={onOpenChange}>
        <Collapsible.Trigger onClick={(event) => event.preventDefault()}>
          자세히 보기
        </Collapsible.Trigger>
        <Collapsible.Panel data-testid="panel">추가 내용</Collapsible.Panel>
      </Collapsible.Root>,
    );

    await page.getByRole("button", { name: "자세히 보기" }).click();
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(container.querySelector("[data-testid='panel']")?.hasAttribute("hidden")).toBe(true);
  });

  it("변경을 취소하면 비제어 펼침 상태를 유지한다", async () => {
    const onOpenChange = vi.fn((_open: boolean, details: CollapsibleChangeEventDetails) =>
      details.cancel(),
    );
    const { container } = render(fixture({ onOpenChange }));

    await userEvent.click(getParts(container).trigger);
    expect(onOpenChange).toHaveBeenCalledTimes(1);
    expect(onOpenChange.mock.calls[0]?.[1].isCanceled).toBe(true);
    expectOpenState(container, false);
  });

  it("Root의 disabled는 열림 상태를 유지하고 Trigger의 클릭을 막는다", () => {
    const onOpenChange = vi.fn();
    const { container } = render(fixture({ defaultOpen: true, disabled: true, onOpenChange }));
    const { root, trigger, panel } = getParts(container);

    expect(root.hasAttribute("data-disabled")).toBe(true);
    expect(trigger.hasAttribute("data-disabled")).toBe(true);
    expect(panel.hasAttribute("data-disabled")).toBe(true);
    expect(trigger.disabled).toBe(true);
    trigger.click();
    expect(onOpenChange).not.toHaveBeenCalled();
    expectOpenState(container, true);
  });

  it("Trigger만 비활성화해도 패널의 상태는 유지한다", () => {
    const onOpenChange = vi.fn();
    const { container } = render(
      <Collapsible.Root onOpenChange={onOpenChange}>
        <Collapsible.Trigger disabled>자세히 보기</Collapsible.Trigger>
        <Collapsible.Panel data-testid="panel">추가 내용</Collapsible.Panel>
      </Collapsible.Root>,
    );
    const trigger = container.querySelector("button")!;
    const panel = container.querySelector<HTMLElement>("[data-testid='panel']")!;

    expect(trigger.disabled).toBe(true);
    expect(trigger.hasAttribute("data-disabled")).toBe(true);
    expect(panel.hasAttribute("data-disabled")).toBe(false);
    trigger.click();
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(panel.hidden).toBe(true);
  });

  it("Enter와 Space로 패널을 열고 닫으며 포커스를 유지한다", async () => {
    const { container } = render(fixture());
    const trigger = getParts(container).trigger;

    trigger.focus();
    await userEvent.keyboard("{Enter}");
    expectOpenState(container, true);
    await userEvent.keyboard("{Space}");
    expectOpenState(container, false);
    await expect.element(page.getByRole("button", { name: "자세히 보기" })).toHaveFocus();
  });

  it("render 요소에 속성, Ref와 클릭 핸들러를 합성한다", async () => {
    const calls: string[] = [];
    const rootRef = createRef<HTMLDivElement>();
    const triggerRef = createRef<HTMLButtonElement>();
    const { container } = render(
      <Collapsible.Root
        render={<div className="root-render" />}
        className="root-part"
        ref={rootRef}
        onOpenChange={() => calls.push("change")}
      >
        <Collapsible.Trigger
          render={<button type="submit" onClick={() => calls.push("render")} />}
          ref={triggerRef}
          onClick={() => calls.push("part")}
        >
          자세히 보기
        </Collapsible.Trigger>
        <Collapsible.Panel render={<section id="render-panel" />} data-testid="panel">
          추가 내용
        </Collapsible.Panel>
      </Collapsible.Root>,
    );
    const root = container.querySelector("div.root-render")!;
    const trigger = container.querySelector("button")!;
    const panel = container.querySelector("section")!;

    expect(rootRef.current).toBe(root);
    expect(triggerRef.current).toBe(trigger);
    expect(root.className).toBe("root-render root-part");
    expect(trigger.type).toBe("button");
    expect(trigger.getAttribute("aria-controls")).toBe(panel.id);
    expect(panel.id).not.toBe("render-panel");
    expect(panel.hidden).toBe(true);

    await userEvent.click(trigger);
    expect(calls).toEqual(["render", "part", "change"]);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(panel.hidden).toBe(false);
  });

  it("닫힌 상태와 열린 상태에 자동 감지 가능한 접근성 위반이 없다", async () => {
    const { container } = render(fixture());

    expect((await axe.run(container)).violations).toEqual([]);
    await userEvent.click(getParts(container).trigger);
    expect((await axe.run(container)).violations).toEqual([]);
  });
});

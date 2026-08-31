import axe from "axe-core";
import { createRef, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import { userEvent } from "vitest/browser";

import { Accordion } from "./index";

const fixtures: Array<{ container: HTMLDivElement; root: Root }> = [];

afterEach(() => {
  for (const fixture of fixtures) {
    flushSync(() => fixture.root.unmount());
    fixture.container.remove();
  }

  fixtures.length = 0;
});

function render(children: ReactNode) {
  const container = document.createElement("div");
  const root = createRoot(container);

  document.body.append(container);
  fixtures.push({ container, root });
  flushSync(() => root.render(children));

  return container;
}

function renderAccordion(rootProps: React.ComponentProps<typeof Accordion.Root> = {}) {
  return render(
    <form>
      <Accordion.Root {...rootProps}>
        <Accordion.Item value="first">
          <Accordion.Header level={2}>
            <Accordion.Trigger>첫 번째 트리거</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel>첫 번째 패널</Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="second">
          <Accordion.Header>
            <Accordion.Trigger>두 번째 트리거</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel>두 번째 패널</Accordion.Panel>
        </Accordion.Item>
      </Accordion.Root>
    </form>,
  );
}

function getTriggers(container: HTMLElement) {
  return Array.from(container.querySelectorAll("button"));
}

function getPanels(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLElement>("[id$='-panel']"));
}

describe("Accordion", () => {
  describe("구조", () => {
    it("지정한 제목 레벨을 렌더링한다", () => {
      const container = renderAccordion();

      expect(container.querySelector("h2")?.textContent).toContain("첫 번째 트리거");
      expect(container.querySelector("h3")?.textContent).toContain("두 번째 트리거");
    });

    it("각 트리거와 패널을 안정적인 ID로 연결한다", () => {
      const container = renderAccordion();
      const [trigger] = getTriggers(container);
      const [panel] = getPanels(container);
      const item = trigger?.closest<HTMLElement>("[id$='-accordion-item']");

      expect(item?.id).toMatch(/-accordion-item$/);
      expect(trigger?.id).toMatch(/-accordion-trigger$/);
      expect(panel?.id).toMatch(/-accordion-panel$/);
      expect(trigger?.getAttribute("aria-controls")).toBe(panel?.id);
      expect(trigger?.getAttribute("aria-expanded")).toBe("false");
      expect(panel?.hidden).toBe(true);
    });

    it("요청한 패널만 이름이 있는 region으로 노출한다", () => {
      const container = render(
        <Accordion.Root>
          <Accordion.Item value="first">
            <Accordion.Header>
              <Accordion.Trigger>첫 번째 트리거</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel region>첫 번째 패널</Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="second">
            <Accordion.Header>
              <Accordion.Trigger>두 번째 트리거</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel>두 번째 패널</Accordion.Panel>
          </Accordion.Item>
        </Accordion.Root>,
      );
      const [trigger] = getTriggers(container);
      const [firstPanel, secondPanel] = getPanels(container);

      expect(firstPanel?.getAttribute("role")).toBe("region");
      expect(firstPanel?.getAttribute("aria-labelledby")).toBe(trigger?.id);
      expect(secondPanel?.hasAttribute("role")).toBe(false);
      expect(secondPanel?.hasAttribute("aria-labelledby")).toBe(false);
    });

    it("Trigger의 기본 type을 오버라이드한다", () => {
      const container = render(
        <Accordion.Root>
          <Accordion.Item value="first">
            <Accordion.Header>
              <Accordion.Trigger type="submit">트리거</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel>패널</Accordion.Panel>
          </Accordion.Item>
        </Accordion.Root>,
      );
      const trigger = container.querySelector("button");

      expect(trigger?.type).toBe("submit");
    });

    it("각 Part의 ref를 실제 DOM 요소에 연결한다", () => {
      const rootRef = createRef<HTMLDivElement>();
      const itemRef = createRef<HTMLDivElement>();
      const headerRef = createRef<HTMLHeadingElement>();
      const triggerRef = createRef<HTMLButtonElement>();
      const panelRef = createRef<HTMLDivElement>();

      render(
        <Accordion.Root ref={rootRef}>
          <Accordion.Item ref={itemRef} value="first">
            <Accordion.Header ref={headerRef}>
              <Accordion.Trigger ref={triggerRef}>트리거</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel ref={panelRef}>패널</Accordion.Panel>
          </Accordion.Item>
        </Accordion.Root>,
      );

      expect(rootRef.current?.tagName).toBe("DIV");
      expect(itemRef.current?.tagName).toBe("DIV");
      expect(headerRef.current?.tagName).toBe("H3");
      expect(triggerRef.current?.tagName).toBe("BUTTON");
      expect(panelRef.current?.tagName).toBe("DIV");
    });

    it("모든 Part의 render 요소에 Props와 접근성 관계를 합성한다", async () => {
      const calls: string[] = [];
      const container = render(
        <Accordion.Root
          render={<div data-render="root" className="root-render" />}
          className="root-part"
          onValueChange={() => calls.push("toggle")}
        >
          <Accordion.Item value="first" render={<div data-render="item" id="render-item" />}>
            <Accordion.Header render={<h3 data-render="header" />}>
              <Accordion.Trigger
                render={
                  <button
                    data-render="trigger"
                    id="render-trigger"
                    type="submit"
                    aria-controls="render-panel"
                    aria-expanded={true}
                    className="trigger-render"
                    onClick={() => calls.push("render")}
                  />
                }
                className="trigger-part"
                onClick={() => calls.push("part")}
              >
                트리거
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel
              render={
                <div
                  data-render="panel"
                  id="render-panel"
                  role="alert"
                  aria-labelledby="render-trigger"
                />
              }
            >
              패널
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion.Root>,
      );
      const root = container.querySelector<HTMLElement>("[data-render='root']");
      const item = container.querySelector<HTMLElement>("[data-render='item']");
      const header = container.querySelector<HTMLElement>("[data-render='header']");
      const trigger = container.querySelector<HTMLButtonElement>("[data-render='trigger']");
      const panel = container.querySelector<HTMLElement>("[data-render='panel']");

      expect(root?.className).toBe("root-render root-part");
      expect(item?.id).toMatch(/-accordion-item$/);
      expect(header?.tagName).toBe("H3");
      expect(trigger?.className).toBe("trigger-render trigger-part");
      expect(trigger?.type).toBe("button");
      expect(trigger?.id).toMatch(/-accordion-trigger$/);
      expect(trigger?.getAttribute("aria-controls")).toBe(panel?.id);
      expect(trigger?.getAttribute("aria-expanded")).toBe("false");
      expect(panel?.hidden).toBe(true);
      expect(panel?.hasAttribute("role")).toBe(false);
      expect(panel?.hasAttribute("aria-labelledby")).toBe(false);

      if (!trigger) {
        throw new Error("Accordion 테스트 구성이 완전하지 않습니다.");
      }

      await userEvent.click(trigger);

      expect(calls).toEqual(["render", "part", "toggle"]);
      expect(trigger.getAttribute("aria-expanded")).toBe("true");
      expect(panel?.hidden).toBe(false);
    });
  });

  describe("상태", () => {
    it("네이티브 버튼으로 패널을 열고 닫는다", async () => {
      const container = renderAccordion();
      const [trigger] = getTriggers(container);
      const [panel] = getPanels(container);

      if (!trigger || !panel) {
        throw new Error("Accordion 테스트 구성이 완전하지 않습니다.");
      }

      await userEvent.click(trigger);
      expect(trigger.getAttribute("aria-expanded")).toBe("true");
      expect(panel.hidden).toBe(false);

      await userEvent.click(trigger);
      expect(trigger.getAttribute("aria-expanded")).toBe("false");
      expect(panel.hidden).toBe(true);
    });

    it("기본적으로 하나의 패널만 열린 상태로 유지한다", async () => {
      const container = renderAccordion({ defaultValue: ["first"] });
      const [firstTrigger, secondTrigger] = getTriggers(container);
      const [firstPanel, secondPanel] = getPanels(container);

      if (!secondTrigger) {
        throw new Error("Accordion 테스트 구성이 완전하지 않습니다.");
      }

      await userEvent.click(secondTrigger);

      expect(firstTrigger?.getAttribute("aria-expanded")).toBe("false");
      expect(secondTrigger.getAttribute("aria-expanded")).toBe("true");
      expect(firstPanel?.hidden).toBe(true);
      expect(secondPanel?.hidden).toBe(false);
    });

    it("multiple을 활성화하면 여러 패널을 열린 상태로 유지한다", async () => {
      const container = renderAccordion({ defaultValue: ["first"], multiple: true });
      const [, secondTrigger] = getTriggers(container);
      const [firstPanel, secondPanel] = getPanels(container);

      if (!secondTrigger) {
        throw new Error("Accordion 테스트 구성이 완전하지 않습니다.");
      }

      await userEvent.click(secondTrigger);

      expect(firstPanel?.hidden).toBe(false);
      expect(secondPanel?.hidden).toBe(false);
    });

    it("제어 상태를 직접 바꾸지 않고 변경 요청을 알린다", async () => {
      const onValueChange = vi.fn();
      const container = renderAccordion({ value: [], onValueChange });
      const [trigger] = getTriggers(container);
      const [panel] = getPanels(container);

      if (!trigger) {
        throw new Error("Accordion 테스트 구성이 완전하지 않습니다.");
      }

      await userEvent.click(trigger);

      expect(onValueChange).toHaveBeenCalledWith(
        ["first"],
        expect.objectContaining({
          reason: "trigger-press",
          event: expect.any(MouseEvent),
          trigger,
        }),
      );
      expect(panel?.hidden).toBe(true);
    });

    it("비제어 상태 변경을 취소할 수 있다", async () => {
      const container = renderAccordion({
        onValueChange: (_value, eventDetails) => eventDetails.cancel(),
      });
      const [trigger] = getTriggers(container);
      const [panel] = getPanels(container);

      if (!trigger) {
        throw new Error("Accordion 테스트 구성이 완전하지 않습니다.");
      }

      await userEvent.click(trigger);

      expect(trigger.getAttribute("aria-expanded")).toBe("false");
      expect(panel?.hidden).toBe(true);
    });

    it("비활성화 상태에서는 상호작용을 무시한다", () => {
      const onValueChange = vi.fn();
      const container = renderAccordion({ disabled: true, onValueChange });
      const [trigger] = getTriggers(container);
      const [panel] = getPanels(container);

      expect(trigger?.disabled).toBe(true);
      expect(panel?.hasAttribute("data-disabled")).toBe(true);

      trigger?.click();

      expect(onValueChange).not.toHaveBeenCalled();
    });

    it("Item의 비활성화 상태를 패널에 표시한다", () => {
      const container = render(
        <Accordion.Root>
          <Accordion.Item value="first" disabled>
            <Accordion.Panel>첫 번째 패널</Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="second">
            <Accordion.Panel>두 번째 패널</Accordion.Panel>
          </Accordion.Item>
        </Accordion.Root>,
      );
      const [firstPanel, secondPanel] = getPanels(container);

      expect(firstPanel?.hasAttribute("data-disabled")).toBe(true);
      expect(secondPanel?.hasAttribute("data-disabled")).toBe(false);
    });
  });

  describe("키보드", () => {
    it("Enter와 Space로 트리거를 활성화한다", async () => {
      const container = renderAccordion();
      const [trigger] = getTriggers(container);
      const [panel] = getPanels(container);

      if (!trigger || !panel) {
        throw new Error("Accordion 테스트 구성이 완전하지 않습니다.");
      }

      trigger.focus();
      await userEvent.keyboard("{Enter}");
      expect(panel.hidden).toBe(false);

      await userEvent.keyboard("{Space}");
      expect(panel.hidden).toBe(true);
    });

    it.skip("Tab과 Shift+Tab 순서를 네이티브 버튼과 문서 순서에 맡긴다", () => {
      // Coral은 Tab 키를 별도로 처리하지 않으므로 이 동작은 패키지가 아닌 브라우저가 소유한다.
    });
  });

  describe("접근성", () => {
    it("닫힌 상태와 열린 상태에 자동 감지 가능한 접근성 위반이 없다", async () => {
      const container = render(
        <Accordion.Root>
          <Accordion.Item value="first">
            <Accordion.Header>
              <Accordion.Trigger>트리거</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel region>패널</Accordion.Panel>
          </Accordion.Item>
        </Accordion.Root>,
      );
      const [trigger] = getTriggers(container);

      if (!trigger) {
        throw new Error("Accordion 테스트 구성이 완전하지 않습니다.");
      }

      const closedResults = await axe.run(container);
      expect(closedResults.violations).toEqual([]);

      await userEvent.click(trigger);

      const openResults = await axe.run(container);
      expect(openResults.violations).toEqual([]);
    });
  });

  it("트리거를 활성화해도 상위 form을 제출하지 않는다", async () => {
    const onSubmit = vi.fn();
    const container = render(
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <Accordion.Root>
          <Accordion.Item value="first">
            <Accordion.Header>
              <Accordion.Trigger>트리거</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel>패널</Accordion.Panel>
          </Accordion.Item>
        </Accordion.Root>
      </form>,
    );
    const trigger = container.querySelector("button");

    if (!trigger) {
      throw new Error("Accordion 테스트 구성이 완전하지 않습니다.");
    }

    await userEvent.click(trigger);

    expect(trigger.type).toBe("button");
    expect(onSubmit).not.toHaveBeenCalled();
  });
});

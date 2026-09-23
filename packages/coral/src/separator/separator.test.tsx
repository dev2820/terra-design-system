import axe from "axe-core";
import { createRef, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it } from "vitest";
import { page } from "vitest/browser";

import { Separator } from "./index";

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

  return {
    container,
    rerender: (nextChildren: ReactNode) => flushSync(() => root.render(nextChildren)),
  };
}

describe("Separator", () => {
  it("네이티브 hr의 의미를 유지하고 Ref와 일반 속성을 전달한다", async () => {
    const ref = createRef<HTMLHRElement>();
    const { container } = render(
      <Separator ref={ref} id="section-break" className="separator" title="주제 전환" />,
    );
    const separator = container.querySelector("hr");

    expect(separator).not.toBeNull();
    expect(ref.current).toBe(separator);
    expect(separator?.id).toBe("section-break");
    expect(separator?.className).toBe("separator");
    expect(separator?.title).toBe("주제 전환");
    expect(separator?.hasAttribute("role")).toBe(false);
    expect(separator?.hasAttribute("tabindex")).toBe(false);
    expect(separator?.hasAttribute("autofocus")).toBe(false);
    expect(separator?.hasAttribute("aria-hidden")).toBe(false);
    expect(separator?.hasAttribute("aria-orientation")).toBe(false);
    expect(separator?.getAttribute("data-orientation")).toBe("horizontal");
    await expect.element(page.getByRole("separator")).toBeInTheDocument();
  });

  it.each(["horizontal", "vertical"] as const)(
    "%s 방향을 의미와 스타일링 표식에 반영한다",
    (orientation) => {
      const { container } = render(
        <Separator orientation={orientation} data-orientation="사용자 값" />,
      );
      const separator = container.querySelector("hr");

      expect(separator?.getAttribute("data-orientation")).toBe(orientation);
      expect(separator?.getAttribute("aria-orientation")).toBe(
        orientation === "vertical" ? "vertical" : null,
      );
      expect(separator?.hasAttribute("aria-hidden")).toBe(false);
    },
  );

  it.each(["horizontal", "vertical"] as const)(
    "%s 장식용 구분선을 접근성 트리에서 제외한다",
    async (orientation) => {
      const { container } = render(<Separator orientation={orientation} decorative />);
      const separator = container.querySelector("hr");

      expect(separator?.getAttribute("aria-hidden")).toBe("true");
      expect(separator?.hasAttribute("aria-orientation")).toBe(false);
      expect(separator?.getAttribute("data-orientation")).toBe(orientation);
      await expect.element(page.getByRole("separator")).not.toBeInTheDocument();
    },
  );

  it("방향과 장식용 여부 변경 시 필요한 ARIA만 유지한다", () => {
    const { container, rerender } = render(<Separator orientation="vertical" />);
    const separator = container.querySelector("hr");

    rerender(<Separator orientation="vertical" decorative />);
    expect(separator?.getAttribute("aria-hidden")).toBe("true");
    expect(separator?.hasAttribute("aria-orientation")).toBe(false);

    rerender(<Separator orientation="vertical" decorative={false} />);
    expect(separator?.hasAttribute("aria-hidden")).toBe(false);
    expect(separator?.getAttribute("aria-orientation")).toBe("vertical");

    rerender(<Separator />);
    expect(separator?.hasAttribute("aria-orientation")).toBe(false);
    expect(separator?.getAttribute("data-orientation")).toBe("horizontal");
  });

  it("지원하는 조합에 자동 감지 가능한 접근성 위반이 없다", async () => {
    const { container } = render(
      <>
        <Separator />
        <Separator orientation="vertical" />
        <Separator decorative />
        <Separator orientation="vertical" decorative />
      </>,
    );
    const results = await axe.run(container);

    expect(results.violations).toEqual([]);
  });

  // 정적 hr은 키보드, 포인터, Focus 이동이나 Form 동작을 추가하지 않는다.
  // 네이티브 요소가 소유하는 동작과 사용자 CSS의 시각적 표현은 중복 테스트하지 않는다.
});

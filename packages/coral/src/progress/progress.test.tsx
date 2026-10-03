import axe from "axe-core";
import { Component, StrictMode, createRef, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { createRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { page } from "vitest/browser";

import { Progress as RootProgress } from "../index";
import { Progress } from "./index";

const fixtures: Array<{ container: HTMLDivElement; root: Root }> = [];
const percentFormatter = new Intl.NumberFormat(undefined, { style: "percent" });

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
    rerender(next: ReactNode) {
      flushSync(() => root.render(next));
    },
  };
}

class TestErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state: { error: Error | null } = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    return this.state.error ? this.state.error.message : this.props.children;
  }
}

function progressFixture(value: number | undefined, max = 100) {
  return (
    <Progress.Root {...(value === undefined ? {} : { value })} max={max} aria-label="파일 업로드">
      <Progress.Value />
      <Progress.Track>
        <Progress.Indicator
          data-testid="indicator"
          style={{ blockSize: "8px", inlineSize: "99%" }}
        />
      </Progress.Track>
    </Progress.Root>
  );
}

function labelFixture(label: ReactNode, id?: string) {
  return (
    <Progress.Root value={25} aria-label={id ? undefined : "파일 업로드"} aria-labelledby={id}>
      {label && <Progress.Label id={id}>{label}</Progress.Label>}
    </Progress.Root>
  );
}

function indicatorStyleFixture(value?: number) {
  return (
    <Progress.Root {...(value === undefined ? {} : { value })} aria-label="파일 처리">
      <Progress.Track>
        <Progress.Indicator
          data-testid="indicator"
          style={{ inlineSize: "30%", blockSize: "8px" }}
        />
      </Progress.Track>
    </Progress.Root>
  );
}

// Progress는 읽기 전용이며 키보드·Focus·Form 동작을 제공하지 않는다.
// 여기서는 네이티브 div/span의 동작을 중복 테스트하지 않고 기본 DOM 계약을 검증한다.
describe("Progress", () => {
  it("패키지 루트와 컴포넌트 하위 경로에서 같은 API를 제공한다", () => {
    expect(RootProgress).toBe(Progress);
  });

  describe("구조와 접근 가능한 이름", () => {
    it("명시적으로 연결한 Label과 Parts로 progressbar를 렌더링한다", async () => {
      const { container } = render(
        <StrictMode>
          <Progress.Root value={25} aria-labelledby="upload-label">
            <Progress.Label id="upload-label">파일 업로드</Progress.Label>
            <Progress.Value />
            <Progress.Track data-testid="track">
              <Progress.Indicator data-testid="indicator" />
            </Progress.Track>
          </Progress.Root>
        </StrictMode>,
      );
      const progress = container.querySelector('[role="progressbar"]');
      const label = progress?.querySelector("span");
      const track = container.querySelector('[data-testid="track"]');

      expect(progress?.tagName).toBe("DIV");
      expect(label?.tagName).toBe("SPAN");
      expect(progress?.children[1]?.tagName).toBe("SPAN");
      expect(track?.tagName).toBe("DIV");
      expect(track?.firstElementChild?.tagName).toBe("DIV");
      expect(progress?.getAttribute("aria-labelledby")).toBe(label?.id);
      expect(progress?.getAttribute("aria-valuemin")).toBe("0");
      expect(progress?.getAttribute("aria-valuemax")).toBe("100");
      expect(progress?.getAttribute("aria-valuenow")).toBe("25");
      expect(progress?.hasAttribute("tabindex")).toBe(false);
      expect(progress?.hasAttribute("aria-live")).toBe(false);
      await expect
        .element(page.getByRole("progressbar", { name: "파일 업로드" }))
        .toBeInTheDocument();
    });

    it("Label의 등장·제거만으로 참조를 만들지 않고 명시적인 ID 연결을 반영한다", () => {
      const { container, rerender } = render(labelFixture(null));
      const progress = container.querySelector('[role="progressbar"]');

      expect(progress?.hasAttribute("aria-labelledby")).toBe(false);
      rerender(labelFixture("업로드"));
      expect(progress?.querySelector("span")?.hasAttribute("id")).toBe(false);
      expect(progress?.hasAttribute("aria-labelledby")).toBe(false);
      rerender(labelFixture("업로드", "upload-label"));
      expect(progress?.getAttribute("aria-labelledby")).toBe("upload-label");
      expect(progress?.querySelector("span")?.id).toBe("upload-label");
      rerender(labelFixture(null));
      expect(progress?.hasAttribute("aria-labelledby")).toBe(false);
      expect(progress?.getAttribute("aria-label")).toBe("파일 업로드");
    });

    it("서버 HTML에서 Label의 ID나 참조를 자동 생성하지 않는다", () => {
      const serverMarkup = renderToString(
        <Progress.Root value={25} aria-label="파일 업로드">
          <Progress.Label>파일 업로드</Progress.Label>
        </Progress.Root>,
      );
      const container = document.createElement("div");
      container.innerHTML = serverMarkup;
      const progress = container.querySelector('[role="progressbar"]');
      const label = progress?.querySelector("span");

      expect(label?.hasAttribute("id")).toBe(false);
      expect(progress?.hasAttribute("aria-labelledby")).toBe(false);
    });

    it("서버 HTML에서 커스텀 Label ID는 명시적 참조로 연결한다", () => {
      const serverMarkup = renderToString(
        <Progress.Root value={25} aria-labelledby="upload-label">
          <Progress.Label id="upload-label">파일 업로드</Progress.Label>
        </Progress.Root>,
      );
      const container = document.createElement("div");
      container.innerHTML = serverMarkup;

      expect(container.querySelector('[role="progressbar"]')?.getAttribute("aria-labelledby")).toBe(
        "upload-label",
      );
      expect(container.querySelector("span")?.id).toBe("upload-label");
    });

    it("Label이 없는 서버 HTML에서는 명시적인 이름을 사용한다", () => {
      const serverMarkup = renderToString(<Progress.Root value={25} aria-label="파일 업로드" />);
      const container = document.createElement("div");
      container.innerHTML = serverMarkup;
      const progress = container.querySelector('[role="progressbar"]');

      expect(progress?.getAttribute("aria-label")).toBe("파일 업로드");
      expect(progress?.hasAttribute("aria-labelledby")).toBe(false);
    });

    it("이름을 전달하지 않아도 존재하지 않는 Label ID를 참조하지 않는다", () => {
      const serverMarkup = renderToString(<Progress.Root value={25} />);
      const container = document.createElement("div");
      container.innerHTML = serverMarkup;

      expect(container.querySelector('[role="progressbar"]')?.hasAttribute("aria-labelledby")).toBe(
        false,
      );
    });

    it("명시적인 이름과 설명을 유지한다", async () => {
      const { container, rerender } = render(
        <Progress.Root value={25} aria-label="파일 처리">
          <Progress.Label>업로드</Progress.Label>
        </Progress.Root>,
      );
      const progress = container.querySelector('[role="progressbar"]');
      expect(progress?.hasAttribute("aria-labelledby")).toBe(false);
      await expect
        .element(page.getByRole("progressbar", { name: "파일 처리" }))
        .toBeInTheDocument();

      rerender(
        <>
          <p id="task-name">데이터 처리</p>
          <p id="task-description">파일을 확인하는 중입니다.</p>
          <Progress.Root
            value={25}
            aria-label="파일 처리"
            aria-labelledby="task-name"
            aria-describedby="task-description"
          >
            <Progress.Label>업로드</Progress.Label>
          </Progress.Root>
        </>,
      );

      expect(container.querySelector('[role="progressbar"]')?.getAttribute("aria-labelledby")).toBe(
        "task-name",
      );
      await expect
        .element(page.getByRole("progressbar", { name: "데이터 처리" }))
        .toHaveAccessibleDescription("파일을 확인하는 중입니다.");
    });
  });

  describe("값과 상태", () => {
    it.each([
      { value: 0, max: 100, now: "0", size: "0%", state: "progressing" },
      { value: 25, max: 100, now: "25", size: "25%", state: "progressing" },
      { value: 250, max: 1000, now: "250", size: "25%", state: "progressing" },
      { value: -10, max: 100, now: "0", size: "0%", state: "progressing" },
      { value: 150, max: 100, now: "100", size: "100%", state: "complete" },
      { value: NaN, max: 100, now: "0", size: "0%", state: "progressing" },
      { value: Infinity, max: 100, now: "0", size: "0%", state: "progressing" },
      { value: -Infinity, max: 100, now: "0", size: "0%", state: "progressing" },
      { value: null as unknown as number, max: 100, now: "0", size: "0%", state: "progressing" },
    ])("$value를 ARIA·표시·Indicator에 일관되게 적용한다", ({ value, max, now, size, state }) => {
      const { container } = render(progressFixture(value, max));
      const progress = container.querySelector('[role="progressbar"]');
      const indicator = progress?.querySelector<HTMLDivElement>('[data-testid="indicator"]');

      expect(progress?.getAttribute("aria-valuemin")).toBe("0");
      expect(progress?.getAttribute("aria-valuemax")).toBe(String(max));
      expect(progress?.getAttribute("aria-valuenow")).toBe(now);
      expect(progress?.getAttribute("aria-valuetext")).toBe(
        percentFormatter.format(Number(now) / max),
      );
      expect(progress?.querySelector("span")?.textContent).toBe(
        percentFormatter.format(Number(now) / max),
      );
      expect(indicator?.style.inlineSize).toBe(size);
      expect(indicator?.style.blockSize).toBe("8px");
      expect(progress?.hasAttribute(`data-${state}`)).toBe(true);
    });

    it("값 생략과 undefined는 불확정 상태이며 0은 확정 상태다", () => {
      const { container, rerender } = render(
        <Progress.Root aria-label="파일 처리">
          <Progress.Value />
          <Progress.Track>
            <Progress.Indicator data-testid="indicator" />
          </Progress.Track>
        </Progress.Root>,
      );
      const progress = container.querySelector('[role="progressbar"]');
      const value = progress?.querySelector("span");
      const indicator = progress?.querySelector<HTMLDivElement>('[data-testid="indicator"]');

      expect(progress?.hasAttribute("aria-valuenow")).toBe(false);
      expect(progress?.hasAttribute("aria-valuetext")).toBe(false);
      expect(value?.textContent).toBe("");
      expect(indicator?.style.inlineSize).toBe("");
      expect(progress?.hasAttribute("data-indeterminate")).toBe(true);

      rerender(progressFixture(undefined));
      expect(progress?.hasAttribute("aria-valuenow")).toBe(false);
      rerender(progressFixture(0));
      expect(progress?.getAttribute("aria-valuenow")).toBe("0");
      expect(progress?.hasAttribute("data-indeterminate")).toBe(false);
      expect(progress?.hasAttribute("data-progressing")).toBe(true);
    });

    it("값과 max의 변경에 맞춰 표시·낭독·크기·상태를 갱신한다", () => {
      const { container, rerender } = render(progressFixture(25));
      const progress = container.querySelector('[role="progressbar"]');
      const indicator = progress?.querySelector<HTMLDivElement>('[data-testid="indicator"]');

      rerender(progressFixture(25, 50));
      expect(progress?.getAttribute("aria-valuemax")).toBe("50");
      expect(progress?.getAttribute("aria-valuenow")).toBe("25");
      expect(progress?.getAttribute("aria-valuetext")).toBe(percentFormatter.format(0.5));
      expect(indicator?.style.inlineSize).toBe("50%");

      rerender(progressFixture(50, 50));
      expect(progress?.hasAttribute("data-complete")).toBe(true);
      expect(progress?.hasAttribute("data-progressing")).toBe(false);
      expect(indicator?.style.inlineSize).toBe("100%");

      rerender(progressFixture(0, 50));
      expect(progress?.hasAttribute("data-complete")).toBe(false);
      expect(progress?.hasAttribute("data-progressing")).toBe(true);
      expect(indicator?.style.inlineSize).toBe("0%");
    });

    it("확정 상태에서 불확정 상태로 돌아오면 이전 계산 길이를 제거하고 사용자 스타일을 유지한다", () => {
      const { container, rerender } = render(indicatorStyleFixture(25));
      const progress = container.querySelector('[role="progressbar"]');
      const indicator = progress?.querySelector<HTMLDivElement>('[data-testid="indicator"]');

      expect(indicator?.style.inlineSize).toBe("25%");
      rerender(indicatorStyleFixture());
      expect(progress?.hasAttribute("data-indeterminate")).toBe(true);
      expect(progress?.hasAttribute("aria-valuenow")).toBe(false);
      expect(indicator?.style.inlineSize).toBe("30%");
      expect(indicator?.style.blockSize).toBe("8px");
    });

    it.each([0, -1, NaN, Infinity])("잘못된 max %s에 오류를 제공한다", (max) => {
      const error = vi.spyOn(console, "error").mockImplementation(() => {});

      try {
        const { container } = render(
          <TestErrorBoundary>
            <Progress.Root value={25} max={max} />
          </TestErrorBoundary>,
        );
        expect(container.textContent).toBe("Progress.Root max must be a finite positive number.");
      } finally {
        error.mockRestore();
      }
    });
  });

  describe("표시와 포맷", () => {
    it("포맷 함수에 제한한 값을 전달하고 화면·낭독에 반환 문자열을 사용한다", () => {
      const format = vi.fn((value: number) => `파일 ${value}개 완료`);
      const { container, rerender } = render(
        <Progress.Root value={12} max={10} format={format} aria-label="파일 업로드">
          <Progress.Value />
          <Progress.Indicator />
        </Progress.Root>,
      );
      const progress = container.querySelector('[role="progressbar"]');

      expect(format).toHaveBeenLastCalledWith(10);
      expect(progress?.querySelector("span")?.textContent).toBe("파일 10개 완료");
      expect(progress?.getAttribute("aria-valuetext")).toBe("파일 10개 완료");
      expect(progress?.querySelector<HTMLDivElement>("div")?.style.inlineSize).toBe("100%");

      rerender(
        <Progress.Root value={5} max={10} aria-label="파일 업로드">
          <Progress.Value />
        </Progress.Root>,
      );
      expect(progress?.querySelector("span")?.textContent).toBe(percentFormatter.format(0.5));
      expect(progress?.getAttribute("aria-valuetext")).toBe(percentFormatter.format(0.5));
    });

    it("불확정 상태에서는 포맷 함수를 호출하지 않고 Value 내용을 비운다", () => {
      const format = vi.fn((value: number) => `${value}개`);
      const { container } = render(
        <Progress.Root format={format} aria-label="파일 처리">
          <Progress.Value />
        </Progress.Root>,
      );
      const progress = container.querySelector('[role="progressbar"]');

      expect(format).not.toHaveBeenCalled();
      expect(progress?.querySelector("span")?.textContent).toBe("");
      expect(progress?.hasAttribute("aria-valuetext")).toBe(false);
    });

    it("명시적 aria-valuetext는 Value의 표시값과 별도로 적용한다", () => {
      const { container, rerender } = render(
        <Progress.Root
          value={25}
          format={(value) => `${value}개`}
          aria-valuetext="네 개 중 하나"
          aria-label="파일 업로드"
        >
          <Progress.Value />
        </Progress.Root>,
      );
      const progress = container.querySelector('[role="progressbar"]');

      expect(progress?.querySelector("span")?.textContent).toBe("25개");
      expect(progress?.getAttribute("aria-valuetext")).toBe("네 개 중 하나");

      rerender(
        <Progress.Root aria-valuetext="처리 중" aria-label="파일 업로드">
          <Progress.Value />
        </Progress.Root>,
      );
      expect(progress?.querySelector("span")?.textContent).toBe("");
      expect(progress?.getAttribute("aria-valuetext")).toBe("처리 중");
    });

    it("포맷 함수의 빈 문자열을 기본 백분율로 대체하지 않는다", () => {
      const { container } = render(
        <Progress.Root value={25} format={() => ""} aria-label="파일 업로드">
          <Progress.Value />
        </Progress.Root>,
      );
      const progress = container.querySelector('[role="progressbar"]');

      expect(progress?.querySelector("span")?.textContent).toBe("");
      expect(progress?.getAttribute("aria-valuetext")).toBe("");
    });
  });

  describe("Part 상태와 공개 경계", () => {
    it("render 요소에서도 Label 연결, 표시값, 상태와 Indicator 길이를 유지한다", () => {
      const { container } = render(
        <Progress.Root value={25} aria-labelledby="upload-label">
          <Progress.Label
            id="upload-label"
            className="part-label"
            render={<strong id="render-label" className="render-label" />}
          >
            파일 업로드
          </Progress.Label>
          <Progress.Value render={<b>교체 전 내용</b>} />
          <Progress.Track render={<section data-testid="track" />}>
            <Progress.Indicator
              render={<i data-testid="indicator" style={{ blockSize: "8px", inlineSize: "95%" }} />}
              style={{ color: "red" }}
            />
          </Progress.Track>
        </Progress.Root>,
      );
      const progress = container.querySelector('[role="progressbar"]');
      const label = progress?.querySelector("strong");
      const value = progress?.querySelector("b");
      const track = progress?.querySelector('[data-testid="track"]');
      const indicator = progress?.querySelector<HTMLElement>('[data-testid="indicator"]');

      expect(label?.id).toBe("upload-label");
      expect(label?.className).toBe("render-label part-label");
      expect(progress?.getAttribute("aria-labelledby")).toBe(label?.id);
      expect(value?.textContent).toBe(percentFormatter.format(0.25));
      expect(track?.tagName).toBe("SECTION");
      expect(track?.firstElementChild).toBe(indicator);
      expect(indicator?.style.inlineSize).toBe("25%");
      expect(indicator?.style.blockSize).toBe("8px");
      expect(indicator?.style.color).toBe("red");
      for (const part of [label, value, track, indicator]) {
        expect(part?.hasAttribute("data-progressing")).toBe(true);
      }
    });

    it.each([
      { value: undefined, attribute: "data-indeterminate" },
      { value: 25, attribute: "data-progressing" },
      { value: 100, attribute: "data-complete" },
    ])("$attribute를 모든 Part에 제공한다", ({ value, attribute }) => {
      const { container } = render(
        <Progress.Root {...(value === undefined ? {} : { value })} aria-label="파일 업로드">
          <Progress.Label>업로드</Progress.Label>
          <Progress.Value />
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>,
      );
      const progress = container.querySelector('[role="progressbar"]');

      expect(progress?.querySelectorAll(`[${attribute}]`)).toHaveLength(4);
      expect(progress?.hasAttribute(attribute)).toBe(true);
      for (const other of ["data-indeterminate", "data-progressing", "data-complete"]) {
        if (other !== attribute) {
          expect(progress?.hasAttribute(other)).toBe(false);
        }
      }
    });

    it("Root ref는 position 확장이 없는 실제 div를 가리킨다", () => {
      const ref = createRef<HTMLDivElement>();
      const { container } = render(<Progress.Root value={25} aria-label="파일 업로드" ref={ref} />);

      expect(ref.current).toBe(container.querySelector('[role="progressbar"]'));
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect("position" in (ref.current as HTMLDivElement)).toBe(false);
    });

    it("기본 구성에 자동 status·live region·Form 입력을 추가하지 않는다", () => {
      const { container } = render(
        <form>
          <Progress.Root value={25} aria-label="파일 업로드">
            <Progress.Value />
            <Progress.Track>
              <Progress.Indicator />
            </Progress.Track>
          </Progress.Root>
        </form>,
      );

      expect(container.querySelector('[role="progressbar"]')).not.toBeNull();
      expect(container.querySelector('[role="status"]')).toBeNull();
      expect(container.querySelector("[aria-live]")).toBeNull();
      expect(container.querySelector("input, progress")).toBeNull();
      expect(container.querySelector("form")?.elements).toHaveLength(0);
    });

    it.each(["Label", "Value", "Track", "Indicator"] as const)(
      "%s는 Root 안에서 사용해야 한다",
      (part) => {
        const Part = Progress[part];
        const error = vi.spyOn(console, "error").mockImplementation(() => {});

        try {
          const { container } = render(
            <TestErrorBoundary>
              <Part />
            </TestErrorBoundary>,
          );
          expect(container.textContent).toBe(`Progress.${part} must be used within Progress.Root.`);
        } finally {
          error.mockRestore();
        }
      },
    );

    it("확정·불확정 기본 조합에 접근성 자동 검사 위반이 없다", async () => {
      const { container } = render(
        <>
          <Progress.Root value={25} aria-labelledby="upload-label">
            <Progress.Label id="upload-label">파일 업로드</Progress.Label>
            <Progress.Value />
            <Progress.Track>
              <Progress.Indicator />
            </Progress.Track>
          </Progress.Root>
          <Progress.Root aria-label="파일 처리">
            <Progress.Track>
              <Progress.Indicator />
            </Progress.Track>
          </Progress.Root>
        </>,
      );

      expect(container.querySelectorAll('[role="progressbar"]')).toHaveLength(2);
      const results = await axe.run(container);
      expect(results.violations).toEqual([]);
    });
  });
});

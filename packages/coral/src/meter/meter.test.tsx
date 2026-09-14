import axe from "axe-core";
import { Component, StrictMode, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import { page } from "vitest/browser";

import { Meter as RootExportMeter } from "../index";
import { Meter } from "./index";

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

function labelFixture(showLabel: boolean, id?: string) {
  return (
    <Meter.Root value={25}>{showLabel && <Meter.Label id={id}>저장 공간</Meter.Label>}</Meter.Root>
  );
}

function sizingFixture(value: number, max: number) {
  return (
    <Meter.Root value={value} max={max} locale="en-US" aria-label="측정값">
      <Meter.Value />
      <Meter.Indicator style={{ blockSize: "8px", inlineSize: "99%" }} />
    </Meter.Root>
  );
}

function valueTextFixture(value: number, ariaValueText?: string) {
  return (
    <Meter.Root
      value={value}
      max={1000}
      locale="en-US"
      aria-label="저장 공간"
      aria-valuetext={ariaValueText}
    >
      <Meter.Value>
        {(formatted, current) => <strong>{`${current} MB 사용 (${formatted})`}</strong>}
      </Meter.Value>
    </Meter.Root>
  );
}

// Meter에는 키보드·Focus·Form 동작이 없다. 네이티브 div/span의 동작과
// 일반 Props·Ref 타입을 중복 검증하는 Type Test는 추가하지 않는다.
describe("Meter", () => {
  it("루트와 하위 경로에서 같은 Meter를 제공한다", () => {
    expect(RootExportMeter).toBe(Meter);
  });

  describe("구조와 이름", () => {
    it("Parts의 구조와 라벨로 연결된 접근 가능한 이름을 제공한다", async () => {
      const { container } = render(
        <StrictMode>
          <Meter.Root value={25} locale="en-US">
            <Meter.Label>저장 공간</Meter.Label>
            <Meter.Value />
            <Meter.Track data-testid="track">
              <Meter.Indicator data-testid="indicator" />
            </Meter.Track>
          </Meter.Root>
        </StrictMode>,
      );
      const meter = container.querySelector('[role="meter"]');
      const label = meter?.querySelector("span");
      const track = container.querySelector('[data-testid="track"]');

      expect(meter?.tagName).toBe("DIV");
      expect(label?.tagName).toBe("SPAN");
      expect(meter?.children[1]?.tagName).toBe("SPAN");
      expect(track?.tagName).toBe("DIV");
      expect(track?.firstElementChild?.tagName).toBe("DIV");
      expect(meter?.getAttribute("aria-labelledby")).toBe(label?.id);
      expect(meter?.hasAttribute("tabindex")).toBe(false);
      expect(meter?.hasAttribute("aria-live")).toBe(false);
      expect(meter?.getAttribute("aria-valuemin")).toBe("0");
      expect(meter?.getAttribute("aria-valuemax")).toBe("100");
      await expect.element(page.getByRole("meter", { name: "저장 공간" })).toBeInTheDocument();
    });

    it("Label의 등장·제거·ID 변경에 따라 자동 참조를 갱신한다", () => {
      const { container, rerender } = render(labelFixture(false));
      const meter = container.querySelector('[role="meter"]');

      expect(meter?.hasAttribute("aria-labelledby")).toBe(false);
      rerender(labelFixture(true));
      const generatedId = container.querySelector("span")?.id;
      expect(generatedId).toBeTruthy();
      expect(meter?.getAttribute("aria-labelledby")).toBe(generatedId);
      rerender(labelFixture(true, "storage-label"));
      expect(meter?.getAttribute("aria-labelledby")).toBe("storage-label");
      rerender(labelFixture(true, "updated-label"));
      expect(meter?.getAttribute("aria-labelledby")).toBe("updated-label");
      rerender(labelFixture(false));
      expect(meter?.hasAttribute("aria-labelledby")).toBe(false);
    });

    it("명시적 ARIA 이름을 자동 Label 연결보다 우선한다", async () => {
      const { container, rerender } = render(
        <Meter.Root value={25} aria-label="남은 배터리">
          <Meter.Label>배터리</Meter.Label>
        </Meter.Root>,
      );
      const meter = container.querySelector('[role="meter"]');

      expect(meter?.hasAttribute("aria-labelledby")).toBe(false);
      await expect.element(page.getByRole("meter", { name: "남은 배터리" })).toBeInTheDocument();

      rerender(
        <>
          <h2 id="external-label">외부 이름</h2>
          <Meter.Root value={25} aria-label="남은 배터리" aria-labelledby="external-label">
            <Meter.Label>배터리</Meter.Label>
          </Meter.Root>
        </>,
      );
      expect(container.querySelector('[role="meter"]')?.getAttribute("aria-labelledby")).toBe(
        "external-label",
      );
      await expect.element(page.getByRole("meter", { name: "외부 이름" })).toBeInTheDocument();

      rerender(
        <Meter.Root value={25}>
          <Meter.Label>자동 이름</Meter.Label>
        </Meter.Root>,
      );
      await expect.element(page.getByRole("meter", { name: "자동 이름" })).toBeInTheDocument();
    });

    it("Label 없이 명시적인 이름과 설명을 사용할 수 있다", async () => {
      render(
        <>
          <p id="description">전체 저장 공간 대비 사용량</p>
          <Meter.Root value={25} aria-label="사용량" aria-describedby="description" />
        </>,
      );

      await expect
        .element(page.getByRole("meter", { name: "사용량" }))
        .toHaveAccessibleDescription("전체 저장 공간 대비 사용량");
    });

    it("서로 다른 Root의 자동 Label ID가 충돌하지 않는다", () => {
      const { container } = render(
        <>
          <Meter.Root value={25}>
            <Meter.Label>저장 공간</Meter.Label>
          </Meter.Root>
          <Meter.Root value={50}>
            <Meter.Label>배터리</Meter.Label>
          </Meter.Root>
        </>,
      );
      const meters = container.querySelectorAll('[role="meter"]');
      const ids = Array.from(meters, (meter) => meter.getAttribute("aria-labelledby"));

      expect(ids[0]).not.toBe(ids[1]);
      for (const [index, meter] of meters.entries()) {
        expect(meter.querySelector("span")?.id).toBe(ids[index]);
      }
    });
  });

  describe("값과 범위", () => {
    it.each([
      { value: 25, min: undefined, max: undefined, now: 25, percent: "25%" },
      { value: 250, min: 0, max: 1000, now: 250, percent: "25%" },
      { value: 30, min: 20, max: 60, now: 30, percent: "25%" },
      { value: -25, min: -50, max: 50, now: -25, percent: "25%" },
      { value: 0, min: 0, max: 100, now: 0, percent: "0%" },
      { value: 100, min: 0, max: 100, now: 100, percent: "100%" },
      { value: -10, min: 20, max: 60, now: 20, percent: "0%" },
      { value: 100, min: 20, max: 60, now: 60, percent: "100%" },
      { value: 0, min: -Number.MAX_VALUE, max: Number.MAX_VALUE, now: 0, percent: "50%" },
    ])(
      "$min..$max의 $value를 ARIA·포맷·Indicator에 일관되게 적용한다",
      ({ value, min, max, now, percent }) => {
        const { container } = render(
          <Meter.Root
            value={value}
            min={min ?? 0}
            max={max ?? 100}
            locale="en-US"
            aria-label="측정값"
          >
            <Meter.Value />
            <Meter.Track>
              <Meter.Indicator data-testid="indicator" />
            </Meter.Track>
          </Meter.Root>,
        );
        const meter = container.querySelector('[role="meter"]');
        const indicator = meter?.querySelector<HTMLDivElement>('[data-testid="indicator"]');

        expect(meter?.getAttribute("aria-valuemin")).toBe(String(min ?? 0));
        expect(meter?.getAttribute("aria-valuemax")).toBe(String(max ?? 100));
        expect(meter?.getAttribute("aria-valuenow")).toBe(String(now));
        expect(meter?.getAttribute("aria-valuetext")).toBe(percent);
        expect(meter?.querySelector("span")?.textContent).toBe(percent);
        expect(indicator?.style.inlineSize).toBe(percent);
      },
    );

    it("값과 범위가 바뀌면 표시·낭독·크기를 함께 갱신하며 사용처의 스타일을 유지한다", () => {
      const { container, rerender } = render(sizingFixture(25, 100));
      rerender(sizingFixture(150, 200));
      const meter = container.querySelector('[role="meter"]');
      const indicator = meter?.querySelector<HTMLDivElement>("div");

      expect(meter?.getAttribute("aria-valuenow")).toBe("150");
      expect(meter?.getAttribute("aria-valuemax")).toBe("200");
      expect(meter?.getAttribute("aria-valuetext")).toBe("75%");
      expect(meter?.querySelector("span")?.textContent).toBe("75%");
      expect(indicator?.style.inlineSize).toBe("75%");
      expect(indicator?.style.blockSize).toBe("8px");
    });

    it("Parts가 가장 가까운 Root의 값을 사용한다", () => {
      const { container } = render(
        <Meter.Root value={25} locale="en-US">
          <Meter.Value data-testid="outer-value" />
          <Meter.Root value={75} locale="en-US">
            <Meter.Value data-testid="inner-value" />
          </Meter.Root>
        </Meter.Root>,
      );

      expect(container.querySelector('[data-testid="outer-value"]')?.textContent).toBe("25%");
      expect(container.querySelector('[data-testid="inner-value"]')?.textContent).toBe("75%");
    });
  });

  describe("포맷과 사용자 지정 표현", () => {
    it("실제 값에 단위 포맷을 적용하고 format·locale 변경을 반영한다", () => {
      const { container, rerender } = render(
        <Meter.Root
          value={250}
          max={1000}
          locale="en-US"
          format={{ style: "unit", unit: "megabyte" }}
          aria-label="저장 공간"
        >
          <Meter.Value />
          <Meter.Indicator />
        </Meter.Root>,
      );
      expect(container.querySelector("span")?.textContent).toBe("250 MB");
      expect(container.querySelector('[role="meter"]')?.getAttribute("aria-valuetext")).toBe(
        "250 MB",
      );
      expect(
        container.querySelector<HTMLDivElement>('[role="meter"] > div')?.style.inlineSize,
      ).toBe("25%");

      rerender(
        <Meter.Root
          value={1234.5}
          max={2000}
          locale="de-DE"
          format={{ maximumFractionDigits: 1 }}
          aria-label="측정값"
        >
          <Meter.Value />
        </Meter.Root>,
      );
      expect(container.querySelector("span")?.textContent).toBe("1.234,5");
      expect(container.querySelector('[role="meter"]')?.getAttribute("aria-valuetext")).toBe(
        "1.234,5",
      );
    });

    it("locale을 생략하면 런타임의 숫자 포맷을 사용한다", () => {
      const { container } = render(
        <Meter.Root value={25}>
          <Meter.Value />
        </Meter.Root>,
      );

      expect(container.querySelector("span")?.textContent).toBe(
        new Intl.NumberFormat(undefined, { style: "percent" }).format(0.25),
      );
    });

    it("children 함수에는 포맷된 문자열과 제한한 값을 전달하고 낭독과 분리한다", () => {
      const { container, rerender } = render(valueTextFixture(250));
      expect(container.querySelector("strong")?.textContent).toBe("250 MB 사용 (25%)");
      expect(container.querySelector('[role="meter"]')?.getAttribute("aria-valuetext")).toBe("25%");
      rerender(valueTextFixture(1500, "저장 공간 1,000 MB를 모두 사용 중"));
      expect(container.querySelector("strong")?.textContent).toBe("1000 MB 사용 (100%)");
      expect(container.querySelector('[role="meter"]')?.getAttribute("aria-valuetext")).toBe(
        "저장 공간 1,000 MB를 모두 사용 중",
      );
      rerender(valueTextFixture(500));
      expect(container.querySelector('[role="meter"]')?.getAttribute("aria-valuetext")).toBe("50%");
    });

    it("Value의 명시적인 children과 null을 그대로 표시한다", () => {
      const { container, rerender } = render(
        <Meter.Root value={25} locale="en-US">
          <Meter.Value>사용 중</Meter.Value>
        </Meter.Root>,
      );
      expect(container.querySelector("span")?.textContent).toBe("사용 중");
      rerender(
        <Meter.Root value={25} locale="en-US">
          <Meter.Value>{null}</Meter.Value>
        </Meter.Root>,
      );
      expect(container.querySelector("span")?.textContent).toBe("");
      expect(container.querySelector('[role="meter"]')?.getAttribute("aria-valuetext")).toBe("25%");
    });
  });

  describe("잘못된 사용", () => {
    it.each([
      { value: NaN },
      { value: Infinity },
      { value: -Infinity },
      { value: 25, min: NaN },
      { value: 25, min: -Infinity },
      { value: 25, max: Infinity },
      { value: 25, max: NaN },
    ])("유한하지 않은 숫자에 오류를 제공한다: %j", (props) => {
      const error = vi.spyOn(console, "error").mockImplementation(() => {});

      try {
        const { container } = render(
          <TestErrorBoundary>
            <Meter.Root {...props} />
          </TestErrorBoundary>,
        );
        expect(container.textContent).toBe(
          "Meter.Root value, min, and max must be finite numbers.",
        );
      } finally {
        error.mockRestore();
      }
    });

    it.each([
      { min: 100, max: 100 },
      { min: 100, max: 0 },
    ])("잘못된 범위에 오류를 제공한다: %j", (props) => {
      const error = vi.spyOn(console, "error").mockImplementation(() => {});

      try {
        const { container } = render(
          <TestErrorBoundary>
            <Meter.Root value={25} {...props} />
          </TestErrorBoundary>,
        );
        expect(container.textContent).toBe("Meter.Root min must be less than max.");
      } finally {
        error.mockRestore();
      }
    });

    it.each(["Label", "Value", "Track", "Indicator"] as const)(
      "%s는 Root 안에서 사용해야 한다",
      (part) => {
        const Part = Meter[part];
        const error = vi.spyOn(console, "error").mockImplementation(() => {});

        try {
          const { container } = render(
            <TestErrorBoundary>
              <Part />
            </TestErrorBoundary>,
          );
          expect(container.textContent).toBe(`Meter.${part} must be used within Meter.Root.`);
        } finally {
          error.mockRestore();
        }
      },
    );
  });

  it("기본 조합과 Label 없는 조합에 접근성 자동 검사 위반이 없다", async () => {
    const { container } = render(
      <>
        <Meter.Root value={250} max={1000} locale="en-US">
          <Meter.Label>저장 공간</Meter.Label>
          <Meter.Value />
          <Meter.Track>
            <Meter.Indicator />
          </Meter.Track>
        </Meter.Root>
        <Meter.Root value={50} aria-label="배터리" aria-valuetext="50%, 약 6시간 남음" />
      </>,
    );
    const results = await axe.run(container);

    expect(results.violations).toEqual([]);
  });
});

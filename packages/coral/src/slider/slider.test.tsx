import axe from "axe-core";
import {
  createRef,
  useState,
  type ComponentProps,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import { Slider, type SliderChangeEventDetails } from ".";
import { Slider as RootExportSlider } from "..";
import { Field } from "../field";
import { Fieldset } from "../fieldset";

const fixtures: Array<{ container: HTMLDivElement; root: Root }> = [];

afterEach(() => {
  for (const { container, root } of fixtures) {
    flushSync(() => root.unmount());
    container.remove();
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

interface FixtureOptions {
  root?: ComponentProps<typeof Slider.Root>;
  control?: ComponentProps<typeof Slider.Control>;
  input?: ComponentProps<typeof Slider.HiddenInput>;
  label?: boolean;
}

function fixture({ root, control, input, label = true }: FixtureOptions = {}) {
  const count = root?.value?.length ?? root?.defaultValue?.length ?? 1;
  const vertical = root?.orientation === "vertical";

  return (
    <Slider.Root {...root} data-testid="root" style={{ padding: 24, ...root?.style }}>
      {label && <Slider.Label>가격</Slider.Label>}
      <Slider.ValueText data-testid="value" />
      <Slider.Control
        {...control}
        data-testid="control"
        style={{ width: vertical ? 24 : 200, height: vertical ? 200 : 24, ...control?.style }}
      >
        <Slider.Track data-testid="track" style={{ width: "100%", height: "100%" }}>
          <Slider.Indicator data-testid="indicator" />
          {Array.from({ length: count }, (_, index) => (
            <Slider.Thumb
              key={index}
              index={index}
              data-testid={`thumb-${index}`}
              style={{ width: 24, height: 24 }}
            >
              <Slider.HiddenInput
                {...(count > 1 ? { "aria-label": `가격 ${index + 1}` } : {})}
                {...input}
              />
            </Slider.Thumb>
          ))}
        </Slider.Track>
      </Slider.Control>
    </Slider.Root>
  );
}

function part(container: HTMLElement, id: string) {
  return container.querySelector<HTMLElement>(`[data-testid="${id}"]`)!;
}

function inputs(container: HTMLElement) {
  return [...container.querySelectorAll<HTMLInputElement>('input[type="range"]')];
}

function values(container: HTMLElement) {
  return inputs(container).map((input) => input.valueAsNumber);
}

function Box(props: ComponentProps<"div">) {
  return <div {...props} data-box="" />;
}

function LabelBox(props: ComponentProps<"label">) {
  return <label {...props} data-box="" />;
}

function RangeInput(props: ComponentProps<"input">) {
  return <input {...props} data-box="" />;
}

// Native range owns individual keyboard commands and form serialization. These tests
// verify Coral's synchronization, bounds, focus, custom pointer handling and composition.
// Real touch gestures and assistive technology require validation on supported devices.
describe("Slider", () => {
  describe("구조와 접근성", () => {
    it("루트와 하위 경로에서 같은 Parts를 제공하고 네이티브 slider를 연결한다", async () => {
      expect(RootExportSlider).toBe(Slider);
      const { container } = render(fixture());
      const input = inputs(container)[0]!;
      const label = container.querySelector("label")!;

      expect(input.parentElement).toBe(part(container, "thumb-0"));
      expect(part(container, "thumb-0").parentElement).toBe(part(container, "track"));
      expect(part(container, "track").parentElement).toBe(part(container, "control"));
      expect(label.htmlFor).toBe(input.id);
      expect(input.getAttribute("aria-labelledby")).toBe(label.id);
      expect(input.tabIndex).toBe(0);
      expect(input.hasAttribute("aria-hidden")).toBe(false);
      expect(input.hasAttribute("role")).toBe(false);
      expect(input.hasAttribute("aria-orientation")).toBe(false);
      expect(input.hasAttribute("aria-invalid")).toBe(false);
      expect(input.hasAttribute("aria-readonly")).toBe(false);
      expect(input.hasAttribute("aria-valuetext")).toBe(false);
      await expect.element(page.getByRole("slider", { name: "가격" })).toBeInTheDocument();
      expect((await axe.run(container)).violations).toEqual([]);
    });

    it("Label 클릭으로 input에 포커스하고 Thumb의 포커스 상태를 갱신한다", async () => {
      const { container } = render(
        <>
          {fixture()}
          <button>다음</button>
        </>,
      );
      await userEvent.click(container.querySelector("label")!);
      expect(document.activeElement).toBe(inputs(container)[0]);
      expect(part(container, "thumb-0").hasAttribute("data-focused")).toBe(true);
      await userEvent.keyboard("{Tab}");
      expect(document.activeElement).toBe(container.querySelector("button"));
      expect(part(container, "thumb-0").hasAttribute("data-focused")).toBe(false);
    });

    it("Label을 생략하면 Root의 접근성 이름을 input에 전달한다", async () => {
      const { container, rerender } = render(
        fixture({
          root: { render: <section aria-label="볼륨" /> },
          label: false,
        }),
      );
      await expect.element(page.getByRole("slider", { name: "볼륨" })).toBeInTheDocument();
      rerender(
        <>
          <span id="slider-title">밝기</span>
          {fixture({
            root: { "aria-labelledby": "slider-title" },
            label: false,
          })}
        </>,
      );
      expect(inputs(container)[0]!.getAttribute("aria-labelledby")).toBe("slider-title");
      await expect.element(page.getByRole("slider", { name: "밝기" })).toBeInTheDocument();
    });

    it("여러 Thumb에 독립적인 이름과 네이티브 slider를 제공한다", async () => {
      const { container } = render(fixture({ root: { defaultValue: [20, 80] } }));
      for (const [index, input] of inputs(container).entries()) {
        expect(input.getAttribute("aria-labelledby")).toBeNull();
        expect(input.tabIndex).toBe(0);
        await expect
          .element(page.getByRole("slider", { name: `가격 ${index + 1}` }))
          .toBeInTheDocument();
      }
      expect((await axe.run(container)).violations).toEqual([]);
    });
  });

  describe("값과 키보드 연결", () => {
    it("초기 값을 생략하면 범위의 중간값을 step에 맞춘다", () => {
      const { container } = render(fixture({ root: { step: 20 } }));
      expect(values(container)).toEqual([60]);
      expect(part(container, "value").textContent).toBe("60");
      expect(part(container, "thumb-0").style.left).toBe("60%");
      expect(part(container, "indicator").style.width).toBe("60%");
    });

    it.each([
      { value: [-20, 43, 120], min: 0, max: 100, step: 20, expected: [0, 40, 100] },
      { value: [99], min: 0, max: 100, step: 30, expected: [90] },
      { value: [0.15], min: 0.1, max: 0.5, step: 0.1, expected: [0.2] },
      { value: [0.15], min: -0.3, max: 0.7, step: 0.1, expected: [0.2] },
      { value: [7], min: 7, max: 7, step: 1, expected: [7] },
      {
        value: [1_000_000_000_000_001],
        min: 0,
        max: 10_000_000_000_000_000,
        step: 1,
        expected: [1_000_000_000_000_001],
      },
    ])(
      "값 $value를 범위와 step에 맞춰 input과 ValueText에 반영한다",
      ({ value, min, max, step, expected }) => {
        const { container } = render(fixture({ root: { value, min, max, step } }));
        expect(values(container)).toEqual(expected);
        expect(part(container, "value").textContent).toBe(expected.join(" – "));
      },
    );

    it("키보드 변경을 상태, 포맷과 Thumb 위치에 반영한다", async () => {
      const change = vi.fn();
      const { container } = render(
        fixture({
          root: {
            defaultValue: [20],
            onValueChange: change,
            format: (value) => `${value}원`,
          },
        }),
      );
      await userEvent.click(container.querySelector("label")!);
      await userEvent.keyboard("{ArrowRight}{ArrowRight}");
      expect(values(container)).toEqual([22]);
      expect(part(container, "value").textContent).toBe("22원");
      expect(inputs(container)[0]!.getAttribute("aria-valuetext")).toBe("22원");
      expect(part(container, "thumb-0").style.left).toBe("22%");
      expect(change.mock.lastCall?.[1]).toMatchObject({
        index: 0,
        reason: "input-change",
        isCanceled: false,
      });
      expect(change.mock.lastCall?.[1].event).toBeInstanceOf(Event);
    });

    it("소수점 step을 반복 입력해도 표시값에 계산 오차를 누적하지 않는다", async () => {
      const { container } = render(
        fixture({ root: { min: -0.3, max: 0.7, step: 0.1, defaultValue: [0.1] } }),
      );
      await userEvent.click(container.querySelector("label")!);
      await userEvent.keyboard("{ArrowRight}{ArrowRight}{ArrowRight}");
      expect(values(container)).toEqual([0.4]);
      expect(part(container, "value").textContent).toBe("0.4");
    });

    it("값과 index로 각 Thumb의 포맷을 계산한다", () => {
      const { container } = render(
        fixture({
          root: {
            defaultValue: [20, 80],
            format: (value, index) => `${index === 0 ? "최소" : "최대"} ${value}원`,
          },
        }),
      );
      expect(part(container, "value").textContent).toBe("최소 20원 – 최대 80원");
      expect(inputs(container).map((input) => input.getAttribute("aria-valuetext"))).toEqual([
        "최소 20원",
        "최대 80원",
      ]);
    });

    it("오름차순 값과 이웃 경계를 사용하고 Thumb의 Tab 순서를 유지한다", async () => {
      const { container } = render(fixture({ root: { defaultValue: [80, 20] } }));
      const [first, second] = inputs(container);
      expect(values(container)).toEqual([20, 80]);
      expect(first!.max).toBe("80");
      expect(second!.min).toBe("20");
      await userEvent.click(container.querySelector("label")!);
      await userEvent.keyboard("{End}{ArrowRight}");
      expect(values(container)).toEqual([80, 80]);
      await userEvent.keyboard("{Tab}");
      expect(document.activeElement).toBe(second);
      await userEvent.keyboard("{Home}{ArrowLeft}");
      expect(values(container)).toEqual([80, 80]);
      await userEvent.keyboard("{ArrowRight}");
      expect(first!.max).toBe("81");
      expect(part(container, "indicator").style.left).toBe("80%");
      expect(part(container, "indicator").style.width).toBe("1%");
      expect(inputs(container)).toEqual([first, second]);
    });

    it("변하지 않은 값에는 변경 알림을 보내지 않는다", async () => {
      const change = vi.fn();
      const { container } = render(
        fixture({ root: { defaultValue: [100], onValueChange: change } }),
      );
      await userEvent.click(container.querySelector("label")!);
      await userEvent.keyboard("{ArrowRight}{End}");
      expect(values(container)).toEqual([100]);
      expect(change).not.toHaveBeenCalled();
    });

    it("제어 값을 유지하면 키보드와 트랙 입력을 복원한다", async () => {
      const change = vi.fn();
      const { container } = render(fixture({ root: { value: [20], onValueChange: change } }));
      await userEvent.click(container.querySelector("label")!);
      await userEvent.keyboard("{ArrowRight}");
      expect(change.mock.lastCall?.[0]).toEqual([21]);
      expect(values(container)).toEqual([20]);
      await userEvent.click(part(container, "track"), { position: { x: 100, y: 12 } });
      expect(change.mock.lastCall?.[0]).toEqual([50]);
      expect(values(container)).toEqual([20]);
      expect(part(container, "thumb-0").style.left).toBe("20%");
    });

    it("소유자가 제어 값 변경을 수락하면 input과 표시를 갱신한다", async () => {
      function Controlled() {
        const [value, setValue] = useState([20]);
        return fixture({ root: { value, onValueChange: setValue } });
      }
      const { container } = render(<Controlled />);
      await userEvent.click(container.querySelector("label")!);
      await userEvent.keyboard("{ArrowRight}");
      expect(values(container)).toEqual([21]);
      await userEvent.click(part(container, "track"), { position: { x: 100, y: 12 } });
      expect(values(container)).toEqual([50]);
      expect(part(container, "value").textContent).toBe("50");
    });

    it.each(["input-change", "track-press", "drag"] as const)(
      "cancel로 %s 변경을 취소한다",
      async (reason) => {
        const change = vi.fn((_value: number[], details: SliderChangeEventDetails) =>
          details.cancel(),
        );
        const { container } = render(
          fixture({ root: { defaultValue: [20], onValueChange: change } }),
        );
        if (reason === "input-change") {
          await userEvent.click(container.querySelector("label")!);
          await userEvent.keyboard("{ArrowRight}");
        } else if (reason === "track-press") {
          await userEvent.click(part(container, "track"), { position: { x: 160, y: 12 } });
        } else {
          await userEvent.dragAndDrop(part(container, "thumb-0"), part(container, "track"), {
            sourcePosition: { x: 12, y: 12 },
            targetPosition: { x: 160, y: 12 },
          });
        }
        expect(change).toHaveBeenCalled();
        expect(change.mock.lastCall?.[1]).toMatchObject({ reason, isCanceled: true });
        expect(values(container)).toEqual([20]);
        expect(part(container, "value").textContent).toBe("20");
        expect(part(container, "indicator").style.width).toBe("20%");
      },
    );
  });

  describe("포인터와 방향", () => {
    it("트랙에서 가장 가까운 Thumb을 이동하고 해당 input에 포커스한다", async () => {
      const change = vi.fn();
      const { container } = render(
        fixture({ root: { defaultValue: [20, 80], onValueChange: change } }),
      );
      await userEvent.click(part(container, "track"), { position: { x: 120, y: 12 } });
      expect(values(container)).toEqual([20, 60]);
      expect(document.activeElement).toBe(inputs(container)[1]);
      expect(change.mock.lastCall?.[1]).toMatchObject({ index: 1, reason: "track-press" });
    });

    it("드래그할 때 Thumb을 누른 위치를 유지하고 이웃 값을 넘지 않는다", async () => {
      const { container } = render(fixture({ root: { defaultValue: [20, 80] } }));
      await userEvent.dragAndDrop(part(container, "thumb-0"), part(container, "track"), {
        sourcePosition: { x: 20, y: 12 },
        targetPosition: { x: 108, y: 12 },
      });
      expect(values(container)).toEqual([50, 80]);
      await userEvent.dragAndDrop(part(container, "thumb-0"), part(container, "track"), {
        sourcePosition: { x: 12, y: 12 },
        targetPosition: { x: 190, y: 12 },
      });
      expect(values(container)).toEqual([80, 80]);
    });

    it("pointer capture로 트랙 밖까지 드래그하고 상태를 정리한다", async () => {
      let captured = false;
      let dragging = false;
      let pointerId = 0;
      const change = vi.fn();
      const { container } = render(
        fixture({
          root: { defaultValue: [20], onValueChange: change },
          control: {
            onPointerMove: (event) => {
              if (event.buttons === 1) {
                pointerId = event.pointerId;
                captured = event.currentTarget.hasPointerCapture(pointerId);
                dragging = event.currentTarget.hasAttribute("data-dragging");
              }
            },
          },
        }),
      );
      await userEvent.dragAndDrop(part(container, "thumb-0"), part(container, "track"), {
        sourcePosition: { x: 12, y: 12 },
        targetPosition: { x: 240, y: 12 },
      });
      expect(captured).toBe(true);
      expect(dragging).toBe(true);
      expect(values(container)).toEqual([100]);
      expect(change.mock.lastCall?.[1].reason).toBe("drag");
      expect(part(container, "control").hasPointerCapture(pointerId)).toBe(false);
      expect(part(container, "root").hasAttribute("data-dragging")).toBe(false);
    });

    it("겹친 Thumb을 요청한 방향으로 분리한다", async () => {
      const { container } = render(fixture({ root: { defaultValue: [50, 50, 50] } }));
      await userEvent.click(part(container, "track"), { position: { x: 160, y: 12 } });
      expect(values(container)).toEqual([50, 50, 80]);
      await userEvent.click(part(container, "track"), { position: { x: 40, y: 12 } });
      expect(values(container)).toEqual([20, 50, 80]);
    });

    it.each(["root", "inherit", "render"] as const)(
      "%s에서 전달한 RTL 방향을 위치와 입력에 반영한다",
      async (source) => {
        const element = fixture({
          root: {
            defaultValue: [20],
            ...(source === "root"
              ? { dir: "rtl" }
              : source === "render"
                ? { render: <section dir="rtl" /> }
                : {}),
          },
        });
        const { container } = render(
          source === "inherit" ? <div dir="rtl">{element}</div> : element,
        );
        expect(part(container, "thumb-0").style.left).toBe("80%");
        expect(part(container, "indicator").style.left).toBe("80%");
        await userEvent.click(part(container, "track"), { position: { x: 50, y: 12 } });
        expect(values(container)).toEqual([75]);
        await userEvent.keyboard("{ArrowLeft}");
        expect(values(container)).toEqual([76]);
      },
    );

    it("합성 요소의 dir 변경을 감지하고 Part의 dir을 우선한다", async () => {
      const { container, rerender } = render(
        fixture({ root: { defaultValue: [20], render: <section dir="ltr" /> } }),
      );
      rerender(fixture({ root: { defaultValue: [20], render: <section dir="rtl" /> } }));
      expect(part(container, "thumb-0").style.left).toBe("80%");
      rerender(
        fixture({ root: { defaultValue: [20], render: <section dir="rtl" />, dir: "ltr" } }),
      );
      expect(part(container, "thumb-0").style.left).toBe("20%");
      await userEvent.click(part(container, "track"), { position: { x: 120, y: 12 } });
      expect(values(container)).toEqual([60]);
    });

    it("세로 방향은 위쪽을 최댓값으로 사용하고 네이티브 키보드 방향을 연결한다", async () => {
      const { container } = render(
        fixture({ root: { orientation: "vertical", defaultValue: [20] } }),
      );
      expect(inputs(container)[0]!.getAttribute("aria-orientation")).toBe("vertical");
      expect(part(container, "thumb-0").style.top).toBe("80%");
      expect(part(container, "indicator").style.height).toBe("20%");
      expect(part(container, "control").style.touchAction).toBe("pan-x");
      await userEvent.click(part(container, "track"), { position: { x: 12, y: 50 } });
      expect(values(container)).toEqual([75]);
      await userEvent.keyboard("{ArrowUp}");
      expect(values(container)).toEqual([76]);
    });

    // A real pointer starts capture. Inject only the platform cancellation event
    // so cancellation can be tested without depending on an OS gesture.
    it.each(["pointercancel", "lostpointercapture"])(
      "%s로 드래그와 capture를 정리한다",
      async (type) => {
        let captured = false;
        let released = false;
        const change = vi.fn();
        const { container } = render(
          fixture({
            root: { defaultValue: [20], onValueChange: change },
            control: {
              onPointerDown: (event) => {
                const control = event.currentTarget;
                const pointerId = event.pointerId;
                queueMicrotask(() => {
                  captured = control.hasPointerCapture(pointerId);
                  flushSync(() =>
                    control.dispatchEvent(new PointerEvent(type, { bubbles: true, pointerId })),
                  );
                  released = !control.hasPointerCapture(pointerId);
                });
              },
            },
          }),
        );
        await userEvent.dragAndDrop(part(container, "thumb-0"), part(container, "track"), {
          sourcePosition: { x: 12, y: 12 },
          targetPosition: { x: 160, y: 12 },
        });
        expect(captured).toBe(true);
        expect(released).toBe(true);
        expect(change).not.toHaveBeenCalled();
        expect(part(container, "control").hasAttribute("data-dragging")).toBe(false);
      },
    );

    it.each(["disabled", "readOnly"] as const)(
      "드래그 중 %s가 되면 capture를 해제한다",
      async (state) => {
        let captured = false;
        let released = false;
        function Fixture() {
          const [inactive, setInactive] = useState(false);
          return fixture({
            root: { defaultValue: [20], [state]: inactive },
            control: {
              onPointerDown: (event) => {
                const control = event.currentTarget;
                const pointerId = event.pointerId;
                queueMicrotask(() => {
                  captured = control.hasPointerCapture(pointerId);
                  flushSync(() => setInactive(true));
                  released = !control.hasPointerCapture(pointerId);
                });
              },
            },
          });
        }
        const { container } = render(<Fixture />);
        await userEvent.dragAndDrop(part(container, "thumb-0"), part(container, "track"), {
          sourcePosition: { x: 12, y: 12 },
          targetPosition: { x: 160, y: 12 },
        });
        expect(captured).toBe(true);
        expect(released).toBe(true);
        expect(values(container)).toEqual([20]);
        expect(part(container, "root").hasAttribute("data-dragging")).toBe(false);
      },
    );

    it.each(["onPointerDown", "onPointerMove"] as const)(
      "%s의 preventDefault로 포인터 변경을 막는다",
      async (handler) => {
        const change = vi.fn();
        const { container } = render(
          fixture({
            root: { defaultValue: [20], onValueChange: change },
            control: {
              [handler]: (event: ReactPointerEvent<HTMLDivElement>) => event.preventDefault(),
            },
          }),
        );
        await userEvent.dragAndDrop(part(container, "thumb-0"), part(container, "track"), {
          sourcePosition: { x: 12, y: 12 },
          targetPosition: { x: 160, y: 12 },
        });
        expect(change).not.toHaveBeenCalled();
        expect(values(container)).toEqual([20]);
        expect(part(container, "root").hasAttribute("data-dragging")).toBe(false);
      },
    );

    it("capture 중 unmount해도 드래그를 끝내고 이벤트를 정리한다", async () => {
      let captured = false;
      let capturedControl: HTMLElement | undefined;
      let pointerId = 0;
      const change = vi.fn();
      const { container, rerender } = render(
        fixture({
          root: { defaultValue: [20], onValueChange: change },
          control: {
            onPointerDown: (event) => {
              capturedControl = event.currentTarget;
              pointerId = event.pointerId;
              queueMicrotask(() => {
                captured = capturedControl!.hasPointerCapture(pointerId);
                rerender(<div>제거됨</div>);
              });
            },
          },
        }),
      );
      container.dataset.testid = "slider-host";
      await userEvent.dragAndDrop(part(container, "thumb-0"), container, {
        sourcePosition: { x: 12, y: 12 },
        targetPosition: { x: 160, y: 12 },
      });
      expect(captured).toBe(true);
      expect(capturedControl!.hasPointerCapture(pointerId)).toBe(false);
      expect(container.textContent).toBe("제거됨");
      expect(change).not.toHaveBeenCalled();
    });
  });

  describe("비활성 상태와 폼", () => {
    it.each(["Root", "Field", "Fieldset"] as const)(
      "%s의 disabled를 input과 폼 제출에 반영한다",
      async (source) => {
        const change = vi.fn();
        const element = fixture({
          root: { disabled: source === "Root", onValueChange: change, name: "price" },
        });
        const { container } = render(
          <form>
            {source === "Field" ? (
              <Field.Root disabled>{element}</Field.Root>
            ) : source === "Fieldset" ? (
              <Fieldset.Root disabled>{element}</Fieldset.Root>
            ) : (
              element
            )}
          </form>,
        );
        expect(inputs(container)[0]!.disabled).toBe(true);
        expect(part(container, "thumb-0").hasAttribute("data-disabled")).toBe(true);
        await userEvent.click(part(container, "track"), { position: { x: 160, y: 12 } });
        expect(change).not.toHaveBeenCalled();
        expect(new FormData(container.querySelector("form")!).has("price")).toBe(false);
      },
    );

    it("readOnly는 변경을 막고 포커스와 폼 제출을 유지한다", async () => {
      const change = vi.fn();
      const { container, rerender } = render(
        <form>{fixture({ root: { readOnly: true, name: "price", onValueChange: change } })}</form>,
      );
      const input = inputs(container)[0]!;
      await userEvent.click(part(container, "track"), { position: { x: 160, y: 12 } });
      expect(document.activeElement).toBe(input);
      await userEvent.keyboard("{ArrowRight}{End}{PageUp}");
      expect(values(container)).toEqual([50]);
      expect(input.getAttribute("aria-readonly")).toBe("true");
      expect(part(container, "root").hasAttribute("data-readonly")).toBe(true);
      expect(change).not.toHaveBeenCalled();
      expect(new FormData(container.querySelector("form")!).get("price")).toBe("50");
      rerender(<form>{fixture({ root: { name: "price" } })}</form>);
      expect(input.hasAttribute("aria-readonly")).toBe(false);
      expect(part(container, "root").hasAttribute("data-readonly")).toBe(false);
    });

    it("input onChange의 preventDefault로 네이티브 변경을 복원한다", async () => {
      const change = vi.fn();
      const { container } = render(
        fixture({
          root: { onValueChange: change },
          input: { onChange: (event) => event.preventDefault() },
        }),
      );
      await userEvent.click(container.querySelector("label")!);
      await userEvent.keyboard("{ArrowRight}");
      expect(values(container)).toEqual([50]);
      expect(change).not.toHaveBeenCalled();
    });

    it("여러 값을 DOM 순서대로 제출하고 비제어 값을 defaultValue로 초기화한다", async () => {
      const change = vi.fn();
      const { container } = render(
        <form>
          {fixture({ root: { defaultValue: [20, 80], name: "price", onValueChange: change } })}
          <button type="reset">초기화</button>
        </form>,
      );
      await userEvent.click(container.querySelector("label")!);
      await userEvent.keyboard("{ArrowRight}");
      expect(new FormData(container.querySelector("form")!).getAll("price")).toEqual(["21", "80"]);
      change.mockClear();
      await userEvent.click(container.querySelector("button")!);
      await expect.poll(() => part(container, "value").textContent).toBe("20 – 80");
      expect(values(container)).toEqual([20, 80]);
      expect(change).not.toHaveBeenCalled();
    });

    it("외부 form을 연결하고 reset 이후에도 현재 제어 값을 유지한다", async () => {
      const { container } = render(
        <>
          <form id="slider-form">
            <button type="reset">초기화</button>
          </form>
          {fixture({
            root: { value: [70], defaultValue: [20], name: "price", form: "slider-form" },
          })}
        </>,
      );
      const form = container.querySelector("form")!;
      expect(inputs(container)[0]!.form).toBe(form);
      await userEvent.click(container.querySelector("button")!);
      await expect.poll(() => values(container)).toEqual([70]);
      expect(part(container, "value").textContent).toBe("70");
      expect(new FormData(form).get("price")).toBe("70");
    });

    it("취소된 form reset은 현재 비제어 값을 유지한다", async () => {
      const { container } = render(
        <form onReset={(event) => event.preventDefault()}>
          {fixture({ root: { defaultValue: [20] } })}
          <button type="reset">초기화</button>
        </form>,
      );
      await userEvent.click(container.querySelector("label")!);
      await userEvent.keyboard("{ArrowRight}");
      await userEvent.click(container.querySelector("button")!);
      expect(values(container)).toEqual([21]);
      expect(part(container, "value").textContent).toBe("21");
    });
  });

  describe("Field 연결", () => {
    it("Field의 이름, 설명과 조건부 오류 ID를 연결한다", async () => {
      const field = (invalid: boolean) => (
        <Field.Root name="price" invalid={invalid}>
          <Field.Label>금액</Field.Label>
          {fixture({
            label: false,
            root: { "aria-describedby": "root-description" },
            input: { "aria-describedby": "input-description" },
          })}
          <Field.Description id="field-description">금액 설명</Field.Description>
          <Field.Error id="field-error">오류</Field.Error>
        </Field.Root>
      );
      const { container, rerender } = render(field(true));
      const input = inputs(container)[0]!;
      expect(input.labels?.[0]?.textContent).toBe("금액");
      expect(input.name).toBe("price");
      expect(input.getAttribute("aria-describedby")).toBe(
        "input-description root-description field-description field-error",
      );
      expect(input.getAttribute("aria-invalid")).toBe("true");
      expect(part(container, "thumb-0").hasAttribute("data-invalid")).toBe(true);
      await expect.element(page.getByRole("slider", { name: "금액" })).toBeInTheDocument();
      rerender(field(false));
      expect(input.getAttribute("aria-describedby")).toBe(
        "input-description root-description field-description",
      );
      expect(input.hasAttribute("aria-invalid")).toBe(false);
      expect(part(container, "thumb-0").hasAttribute("data-invalid")).toBe(false);
    });

    it("키보드와 포인터로 수락한 값을 Field 검증에 전달한다", async () => {
      const validate = vi.fn((value) => (value === "51" ? "오류" : null));
      const { container } = render(
        <Field.Root validationMode="onChange" validate={validate}>
          <Field.Label>금액</Field.Label>
          {fixture({ label: false })}
          <Field.Error />
        </Field.Root>,
      );
      const input = inputs(container)[0]!;
      await userEvent.click(container.querySelector("label")!);
      await userEvent.keyboard("{ArrowRight}");
      await expect.poll(() => input.getAttribute("aria-invalid")).toBe("true");
      expect(validate.mock.lastCall?.[0]).toBe("51");
      await userEvent.click(part(container, "track"), { position: { x: 160, y: 12 } });
      await expect.poll(() => input.hasAttribute("aria-invalid")).toBe(false);
      expect(validate.mock.lastCall?.[0]).toBe("80");
    });

    it("Thumb 사이의 포커스 이동은 Field의 blur로 처리하지 않는다", async () => {
      const validate = vi.fn(() => null);
      const { container } = render(
        <>
          <Field.Root validationMode="onBlur" validate={validate}>
            {fixture({ root: { defaultValue: [20, 80] } })}
          </Field.Root>
          <button>다음</button>
        </>,
      );
      await userEvent.click(container.querySelector("label")!);
      await userEvent.keyboard("{Tab}");
      expect(document.activeElement).toBe(inputs(container)[1]);
      expect(validate).not.toHaveBeenCalled();
      await userEvent.keyboard("{Tab}");
      expect(document.activeElement).toBe(container.querySelector("button"));
      await expect.poll(() => validate.mock.calls.length).toBe(1);
    });
  });

  describe("render와 기본값 우선순위", () => {
    it.each([
      { input: { render: <input aria-label="합성 이름" /> }, expected: "합성 이름" },
      {
        input: { render: <input aria-label="합성 이름" />, "aria-label": "직접 이름" },
        expected: "직접 이름",
      },
      { input: { render: <input aria-labelledby="render-name" /> }, expected: "합성 이름" },
      {
        input: { render: <input aria-labelledby="render-name" />, "aria-labelledby": "part-name" },
        expected: "직접 이름",
      },
    ])(
      "공통 이름을 $expected로 대체하고 공통 aria-labelledby를 제거한다",
      async ({ input, expected }) => {
        const { container } = render(
          <>
            <span id="render-name">합성 이름</span>
            <span id="part-name">직접 이름</span>
            {fixture({ input })}
          </>,
        );
        await expect
          .element(page.getByRole("slider", { name: expected, exact: true }))
          .toBeInTheDocument();
        expect(inputs(container)[0]!.getAttribute("aria-labelledby")).not.toBe(
          container.querySelector("label")!.id,
        );
      },
    );

    it.each([
      { input: { render: <input aria-valuetext="합성 값" /> }, expected: "합성 값" },
      {
        input: { render: <input aria-valuetext="합성 값" />, "aria-valuetext": "직접 값" },
        expected: "직접 값",
      },
      {
        input: { render: <input aria-valuetext="합성 값" />, "aria-valuetext": undefined },
        expected: null,
      },
    ])("aria-valuetext의 포맷 기본값을 $expected로 대체한다", ({ input, expected }) => {
      const { container } = render(fixture({ input, root: { format: (value) => `${value}원` } }));
      expect(inputs(container)[0]!.getAttribute("aria-valuetext")).toBe(expected);
      expect(part(container, "value").textContent).toBe("50원");
    });

    it("모든 Part를 다른 태그로 합성하고 Ref와 포커스 이벤트를 전달한다", async () => {
      const rootRef = createRef<HTMLElement>();
      const labelRef = createRef<HTMLLabelElement>();
      const valueRef = createRef<HTMLOutputElement>();
      const controlRef = createRef<HTMLElement>();
      const trackRef = createRef<HTMLSpanElement>();
      const indicatorRef = createRef<HTMLSpanElement>();
      const thumbRef = createRef<HTMLSpanElement>();
      const renderInputRef = createRef<HTMLInputElement>();
      const inputRef = createRef<HTMLInputElement>();
      const calls: string[] = [];
      const { container } = render(
        <Slider.Root render={<section id="custom-slider" ref={rootRef} />}>
          <Slider.Label render={<label ref={labelRef} />}>가격</Slider.Label>
          <Slider.ValueText render={<output ref={valueRef} />} />
          <Slider.Control render={<article ref={controlRef} />} style={{ width: 200, height: 24 }}>
            <Slider.Track
              render={<span ref={trackRef} />}
              style={{ display: "block", width: "100%", height: "100%" }}
            >
              <Slider.Indicator render={<span ref={indicatorRef} />} />
              <Slider.Thumb render={<span ref={thumbRef} />} style={{ width: 24, height: 24 }}>
                <Slider.HiddenInput
                  render={<input ref={renderInputRef} onFocus={() => calls.push("render")} />}
                  ref={inputRef}
                  onFocus={() => calls.push("part")}
                />
              </Slider.Thumb>
            </Slider.Track>
          </Slider.Control>
        </Slider.Root>,
      );
      expect(
        [rootRef, labelRef, valueRef, controlRef, trackRef, indicatorRef, thumbRef, inputRef].map(
          (ref) => ref.current?.tagName,
        ),
      ).toEqual(["SECTION", "LABEL", "OUTPUT", "ARTICLE", "SPAN", "SPAN", "SPAN", "INPUT"]);
      expect(inputRef.current).toBe(renderInputRef.current);
      expect(inputRef.current!.id).toBe("custom-slider-input-0");
      expect(labelRef.current!.htmlFor).toBe(inputRef.current!.id);
      await userEvent.click(container.querySelector("label")!);
      expect(calls).toEqual(["render", "part"]);
      await userEvent.keyboard("{ArrowRight}");
      expect(values(container)).toEqual([51]);
      expect(valueRef.current!.textContent).toBe("51");
    });

    it("사용자 컴포넌트의 실제 DOM에서 위치를 계산하고 드래그를 처리한다", async () => {
      const { container } = render(
        <Slider.Root render={<Box />} defaultValue={[20]}>
          <Slider.Label render={<LabelBox />}>가격</Slider.Label>
          <Slider.ValueText render={<Box />} />
          <Slider.Control render={<Box />} style={{ width: 200, height: 24 }}>
            <Slider.Track
              render={<Box />}
              data-testid="track"
              style={{ width: "100%", height: "100%" }}
            >
              <Slider.Indicator render={<Box />} />
              <Slider.Thumb
                render={<Box />}
                data-testid="thumb-0"
                style={{ width: 24, height: 24 }}
              >
                <Slider.HiddenInput render={<RangeInput />} />
              </Slider.Thumb>
            </Slider.Track>
          </Slider.Control>
        </Slider.Root>,
      );
      expect(container.querySelectorAll("[data-box]")).toHaveLength(8);
      await userEvent.dragAndDrop(part(container, "thumb-0"), part(container, "track"), {
        sourcePosition: { x: 12, y: 12 },
        targetPosition: { x: 160, y: 12 },
      });
      expect(values(container)).toEqual([80]);
      expect(part(container, "thumb-0").style.left).toBe("80%");
      expect(document.activeElement).toBe(inputs(container)[0]);
    });

    it("합성 input의 네이티브 속성 재정의에도 range와 폼 계약을 유지한다", async () => {
      const { container } = render(
        <form>
          {fixture({
            root: { name: "price" },
            input: {
              render: (
                <input
                  type="text"
                  value={99}
                  min={-100}
                  max={200}
                  step={50}
                  name="override"
                  disabled
                />
              ),
            },
          })}
        </form>,
      );
      const input = inputs(container)[0]!;
      expect([input.type, input.value, input.min, input.max, input.step, input.name]).toEqual([
        "range",
        "50",
        "0",
        "100",
        "1",
        "price",
      ]);
      expect(input.disabled).toBe(false);
      await userEvent.click(container.querySelector("label")!);
      await userEvent.keyboard("{ArrowRight}");
      expect(new FormData(container.querySelector("form")!).get("price")).toBe("51");
    });
  });
});

import axe from "axe-core";
import {
  createRef,
  type ComponentProps,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it } from "vitest";
import { page, userEvent } from "vitest/browser";

import { ScrollArea, type ScrollAreaOrientation } from ".";
import { ScrollArea as RootExportScrollArea } from "..";

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

interface FixtureOptions {
  root?: ComponentProps<typeof ScrollArea.Root>;
  viewport?: ComponentProps<typeof ScrollArea.Viewport>;
  content?: ComponentProps<typeof ScrollArea.Content>;
  vertical?: ComponentProps<typeof ScrollArea.Scrollbar> | false;
  horizontal?: ComponentProps<typeof ScrollArea.Scrollbar> | false;
  verticalThumb?: ComponentProps<typeof ScrollArea.Thumb>;
  horizontalThumb?: ComponentProps<typeof ScrollArea.Thumb>;
  corner?: ComponentProps<typeof ScrollArea.Corner> | false;
  contentWidth?: number;
  contentHeight?: number;
}

function fixture({
  root,
  viewport = { "aria-label": "문서" },
  content,
  vertical,
  horizontal,
  verticalThumb,
  horizontalThumb,
  corner,
  contentWidth = 600,
  contentHeight = 900,
}: FixtureOptions = {}) {
  return (
    <ScrollArea.Root
      {...root}
      data-testid="root"
      style={{ width: 240, height: 180, ...root?.style }}
    >
      <ScrollArea.Viewport {...viewport} data-testid="viewport">
        <ScrollArea.Content {...content} data-testid="content">
          <div style={{ width: contentWidth, height: contentHeight }}>스크롤 내용</div>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      {vertical !== false && (
        <ScrollArea.Scrollbar
          {...vertical}
          data-testid="vertical"
          style={{ width: 12, ...vertical?.style }}
        >
          <ScrollArea.Thumb {...verticalThumb} data-testid="vertical-thumb" />
        </ScrollArea.Scrollbar>
      )}
      {horizontal !== false && (
        <ScrollArea.Scrollbar
          orientation="horizontal"
          {...horizontal}
          data-testid="horizontal"
          style={{ height: 12, ...horizontal?.style }}
        >
          <ScrollArea.Thumb {...horizontalThumb} data-testid="horizontal-thumb" />
        </ScrollArea.Scrollbar>
      )}
      {corner !== false && <ScrollArea.Corner {...corner} data-testid="corner" />}
    </ScrollArea.Root>
  );
}

function getParts(container: HTMLElement) {
  const get = (id: string) => container.querySelector<HTMLElement>(`[data-testid="${id}"]`)!;

  return {
    root: get("root"),
    viewport: get("viewport"),
    content: get("content"),
    vertical: get("vertical"),
    horizontal: get("horizontal"),
    verticalThumb: get("vertical-thumb"),
    horizontalThumb: get("horizontal-thumb"),
    corner: get("corner"),
  };
}

function getAxisParts(container: HTMLElement, orientation: ScrollAreaOrientation) {
  const parts = getParts(container);
  const vertical = orientation === "vertical";

  return {
    root: parts.root,
    viewport: parts.viewport,
    track: vertical ? parts.vertical : parts.horizontal,
    thumb: vertical ? parts.verticalThumb : parts.horizontalThumb,
    property: vertical ? ("scrollTop" as const) : ("scrollLeft" as const),
  };
}

async function waitForDefaultMeasurement(container: HTMLElement) {
  await expect.poll(() => getParts(container).verticalThumb.offsetHeight).toBe(34);
  await expect.poll(() => getParts(container).horizontalThumb.offsetWidth).toBe(91);
}

function Box(props: ComponentProps<"div">) {
  return <div {...props} data-box="" />;
}

// Native scrolling owns touch gestures and individual keyboard commands. These tests
// verify Coral's focusability and synchronization with native scroll events, plus its
// custom tracks, pointer handling, measurements and render composition.
describe("ScrollArea", () => {
  describe("구조와 접근성", () => {
    it("루트와 하위 경로에서 같은 Parts를 제공하고 이름 있는 스크롤 영역을 만든다", async () => {
      expect(RootExportScrollArea).toBe(ScrollArea);
      const { container } = render(fixture());
      await waitForDefaultMeasurement(container);
      const parts = getParts(container);

      for (const part of Object.values(parts)) expect(part.tagName).toBe("DIV");
      expect(parts.viewport.parentElement).toBe(parts.root);
      expect(parts.content.parentElement).toBe(parts.viewport);
      expect(parts.verticalThumb.parentElement).toBe(parts.vertical);
      expect(parts.horizontalThumb.parentElement).toBe(parts.horizontal);
      expect(parts.viewport.tabIndex).toBe(0);
      expect(parts.vertical.dataset.orientation).toBe("vertical");
      expect(parts.horizontalThumb.dataset.orientation).toBe("horizontal");
      for (const part of [parts.vertical, parts.horizontal, parts.corner]) {
        expect(part.getAttribute("aria-hidden")).toBe("true");
        expect(part.tabIndex).toBe(-1);
      }
      await expect.element(page.getByRole("region", { name: "문서" })).toBeVisible();
      await expect.element(page.getByRole("scrollbar")).not.toBeInTheDocument();
      expect((await axe.run(container)).violations).toEqual([]);
    });

    it("aria-labelledby를 연결하고 이름이 없으면 region 역할을 추가하지 않는다", async () => {
      const { container, rerender } = render(
        <>
          <p id="scroll-title">연결된 문서</p>
          {fixture({ viewport: { "aria-labelledby": "scroll-title" } })}
        </>,
      );
      await waitForDefaultMeasurement(container);
      await expect.element(page.getByRole("region", { name: "연결된 문서" })).toBeVisible();

      rerender(fixture({ viewport: {} }));
      expect(getParts(container).viewport.hasAttribute("role")).toBe(false);
      expect(getParts(container).viewport.tabIndex).toBe(0);
    });

    it("탭 이동으로 Viewport에 진입해 키보드로 스크롤하고 다음 요소로 이동한다", async () => {
      const { container } = render(
        <>
          <button>Before</button>
          {fixture()}
          <button>After</button>
        </>,
      );
      await waitForDefaultMeasurement(container);
      const { viewport, verticalThumb } = getParts(container);

      await userEvent.click(container.querySelector("button")!);
      await userEvent.keyboard("{Tab}");
      expect(document.activeElement).toBe(viewport);
      await userEvent.keyboard("{ArrowDown}{PageDown}");
      await expect.poll(() => viewport.scrollTop).toBeGreaterThan(100);
      await expect.poll(() => verticalThumb.style.transform).not.toBe("translateY(0px)");
      await userEvent.keyboard("{Tab}");
      expect(document.activeElement).toBe(container.querySelectorAll("button")[1]);
    });

    it("커스텀 스크롤바의 마운트와 해제에 따라 네이티브 스크롤바를 전환한다", async () => {
      const { container, rerender } = render(fixture({ vertical: false, horizontal: false }));
      const { viewport } = getParts(container);
      expect(viewport.style.scrollbarWidth).toBe("");
      expect(container.querySelector('[data-testid="vertical"]')).toBeNull();
      await userEvent.wheel(viewport, { delta: { y: 100 } });
      await expect.poll(() => viewport.scrollTop).toBeGreaterThan(0);

      rerender(fixture());
      await waitForDefaultMeasurement(container);
      expect(getParts(container).viewport).toBe(viewport);
      expect(viewport.style.scrollbarWidth).toBe("none");
      rerender(fixture({ vertical: false, horizontal: false }));
      expect(viewport.style.scrollbarWidth).toBe("");
    });
  });

  describe("측정과 상태", () => {
    it("콘텐츠 비율에 맞는 Thumb과 두 스크롤바 사이의 Corner를 배치한다", async () => {
      const { container } = render(fixture());
      await waitForDefaultMeasurement(container);
      const { vertical, horizontal, verticalThumb, horizontalThumb, corner } = getParts(container);

      expect(vertical.clientHeight).toBe(168);
      expect(horizontal.clientWidth).toBe(228);
      expect(verticalThumb.getBoundingClientRect().height).toBeCloseTo(33.6, 1);
      expect(horizontalThumb.getBoundingClientRect().width).toBeCloseTo(91.2, 1);
      expect(corner.hidden).toBe(false);
      expect(corner.offsetWidth).toBe(12);
      expect(corner.offsetHeight).toBe(12);
    });

    it.each([
      { name: "세로만", contentWidth: 100, contentHeight: 900, x: false, y: true },
      { name: "가로만", contentWidth: 600, contentHeight: 100, x: true, y: false },
      { name: "없음", contentWidth: 100, contentHeight: 100, x: false, y: false },
    ])("넘침이 $name인 경우 상태와 스크롤바, 탭 순서를 반영한다", async (options) => {
      const { container } = render(fixture(options));
      const { root, viewport, vertical, horizontal, corner } = getParts(container);
      await expect
        .poll(() => [vertical.hidden, horizontal.hidden])
        .toEqual([!options.y, !options.x]);

      for (const part of [root, viewport, vertical, horizontal]) {
        expect(part.hasAttribute("data-overflow-x")).toBe(options.x);
        expect(part.hasAttribute("data-overflow-y")).toBe(options.y);
      }
      expect(viewport.tabIndex).toBe(options.x || options.y ? 0 : -1);
      expect(corner.hidden).toBe(true);
      if (options.y) expect(vertical.clientHeight).toBe(180);
      if (options.x) expect(horizontal.clientWidth).toBe(240);
    });

    it.each([
      { height: 180, expected: 24 },
      { height: 20, expected: 8 },
    ])(
      "높이 $height의 영역에서 Thumb의 최소 크기를 트랙 안으로 제한한다",
      async ({ height, expected }) => {
        const { container } = render(
          fixture({ root: { style: { height } }, contentHeight: 100_000 }),
        );
        await expect.poll(() => getParts(container).verticalThumb.offsetHeight).toBe(expected);
        const { vertical, verticalThumb } = getParts(container);
        expect(verticalThumb.offsetHeight).toBeLessThanOrEqual(vertical.clientHeight);
      },
    );

    it("Content 크기가 커지거나 줄어들면 Thumb과 넘침 상태를 다시 측정한다", async () => {
      const { container, rerender } = render(fixture());
      await waitForDefaultMeasurement(container);
      const { root, viewport, verticalThumb, horizontalThumb, vertical, horizontal } =
        getParts(container);

      rerender(fixture({ contentWidth: 1200, contentHeight: 1800 }));
      await expect.poll(() => verticalThumb.offsetHeight).toBe(24);
      await expect.poll(() => horizontalThumb.offsetWidth).toBe(46);
      rerender(fixture({ contentWidth: 100, contentHeight: 100 }));
      await expect.poll(() => root.hasAttribute("data-overflow-x")).toBe(false);
      await expect.poll(() => root.hasAttribute("data-overflow-y")).toBe(false);
      expect(vertical.hidden).toBe(true);
      expect(horizontal.hidden).toBe(true);
      expect(viewport.tabIndex).toBe(-1);
    });

    it("Viewport 크기 변경을 감지해 Thumb의 비율을 갱신한다", async () => {
      const { container, rerender } = render(fixture());
      await waitForDefaultMeasurement(container);
      const { verticalThumb, horizontalThumb } = getParts(container);

      rerender(fixture({ root: { style: { width: 320, height: 240 } } }));
      await expect.poll(() => verticalThumb.getBoundingClientRect().height).toBeCloseTo(60.8, 1);
      await expect.poll(() => horizontalThumb.getBoundingClientRect().width).toBeCloseTo(164.27, 1);
    });

    it("스크롤바의 두께가 바뀌면 Corner와 두 트랙의 길이를 갱신한다", async () => {
      const { container, rerender } = render(fixture());
      await waitForDefaultMeasurement(container);
      const { vertical, horizontal, corner } = getParts(container);

      rerender(
        fixture({ vertical: { style: { width: 24 } }, horizontal: { style: { height: 18 } } }),
      );
      await expect.poll(() => [corner.offsetWidth, corner.offsetHeight]).toEqual([24, 18]);
      await expect.poll(() => [vertical.clientHeight, horizontal.clientWidth]).toEqual([162, 216]);
    });

    it.each(["vertical", "horizontal"] as const)(
      "%s 트랙의 padding 안에서 Thumb을 이동한다",
      async (orientation) => {
        const { container } = render(
          fixture({
            vertical: { style: { paddingBlock: 4 } },
            horizontal: { style: { paddingInline: 4 } },
          }),
        );
        const { track, thumb, viewport, property } = getAxisParts(container, orientation);
        const vertical = orientation === "vertical";
        await expect
          .poll(() => (vertical ? thumb.offsetHeight : thumb.offsetWidth))
          .toBe(vertical ? 32 : 88);
        const start = vertical ? "top" : "left";
        const end = vertical ? "bottom" : "right";
        expect(thumb.getBoundingClientRect()[start] - track.getBoundingClientRect()[start]).toBe(4);

        await userEvent.dragAndDrop(thumb, track, {
          sourcePosition: { x: 5, y: 5 },
          targetPosition: vertical ? { x: 5, y: 160 } : { x: 220, y: 5 },
        });
        await expect.poll(() => viewport[property]).toBe(vertical ? 720 : 360);
        expect(track.getBoundingClientRect()[end] - thumb.getBoundingClientRect()[end]).toBeCloseTo(
          4,
          0,
        );
      },
    );

    it("Corner를 생략해도 두 트랙이 겹치지 않도록 공간을 확보한다", async () => {
      const { container } = render(fixture({ corner: false }));
      await waitForDefaultMeasurement(container);
      const { vertical, horizontal } = getParts(container);
      expect(container.querySelector('[data-testid="corner"]')).toBeNull();
      expect(vertical.clientHeight).toBe(168);
      expect(horizontal.clientWidth).toBe(228);
    });
  });

  describe("스크롤과 포인터 입력", () => {
    it("Viewport에서 실제 휠 입력이 발생하면 두 Thumb의 위치를 갱신한다", async () => {
      const { container } = render(fixture());
      await waitForDefaultMeasurement(container);
      const { viewport, verticalThumb, horizontalThumb } = getParts(container);

      await userEvent.wheel(viewport, { delta: { x: 80, y: 100 } });
      await expect.poll(() => viewport.scrollTop).toBeGreaterThan(0);
      await expect.poll(() => viewport.scrollLeft).toBeGreaterThan(0);
      await expect.poll(() => verticalThumb.style.transform).not.toBe("translateY(0px)");
      await expect.poll(() => horizontalThumb.style.transform).not.toBe("translateX(0px)");
    });

    it("네이티브 scrollTo로 이동한 위치를 두 Thumb에 반영한다", async () => {
      const { container } = render(fixture());
      await waitForDefaultMeasurement(container);
      const { viewport, vertical, horizontal, verticalThumb, horizontalThumb } =
        getParts(container);

      viewport.scrollTo({ left: 180, top: 360 });
      await expect
        .poll(
          () => verticalThumb.getBoundingClientRect().top - vertical.getBoundingClientRect().top,
        )
        .toBeCloseTo(67.2, 1);
      await expect
        .poll(
          () =>
            horizontalThumb.getBoundingClientRect().left - horizontal.getBoundingClientRect().left,
        )
        .toBeCloseTo(68.4, 1);
    });

    it.each(["vertical", "horizontal"] as const)(
      "%s 트랙 클릭 위치에 Thumb의 중앙을 맞추고 기존 Focus를 유지한다",
      async (orientation) => {
        const { container } = render(
          <>
            <button>Focus</button>
            {fixture()}
          </>,
        );
        await waitForDefaultMeasurement(container);
        const { root, track, thumb, viewport, property } = getAxisParts(container, orientation);
        const button = container.querySelector("button")!;
        const vertical = orientation === "vertical";
        await userEvent.click(button);
        await userEvent.click(track, { position: vertical ? { x: 5, y: 130 } : { x: 180, y: 5 } });

        await expect.poll(() => viewport[property]).toBeGreaterThan(vertical ? 400 : 200);
        const rect = thumb.getBoundingClientRect();
        const center = vertical ? (rect.top + rect.bottom) / 2 : (rect.left + rect.right) / 2;
        const expected = vertical
          ? track.getBoundingClientRect().top + 130
          : track.getBoundingClientRect().left + 180;
        expect(center).toBeCloseTo(expected, 0);
        expect(document.activeElement).toBe(button);
        expect(root.hasAttribute("data-dragging")).toBe(false);
        expect(track.hasAttribute("data-dragging")).toBe(false);
      },
    );

    it.each(["vertical", "horizontal"] as const)(
      "%s Thumb의 자식에서 잡은 위치를 유지하며 실제로 드래그한다",
      async (orientation) => {
        const grab = (
          <span data-testid="grab" style={{ display: "block", width: "100%", height: "100%" }} />
        );
        const { container } = render(
          fixture({
            verticalThumb: { children: grab },
            horizontalThumb: { children: grab },
          }),
        );
        await waitForDefaultMeasurement(container);
        const { root, track, thumb, viewport, property } = getAxisParts(container, orientation);
        const vertical = orientation === "vertical";
        const initial = vertical ? 360 : 180;
        viewport[property] = initial;
        await expect
          .poll(() => thumb.style.transform)
          .not.toBe(vertical ? "translateY(0px)" : "translateX(0px)");
        await userEvent.click(thumb, { position: { x: 5, y: 5 } });
        expect(viewport[property]).toBe(initial);

        await userEvent.dragAndDrop(thumb.querySelector("span")!, track, {
          sourcePosition: { x: 5, y: 5 },
          targetPosition: vertical ? { x: 5, y: 130 } : { x: 130, y: 5 },
        });
        await expect.poll(() => viewport[property]).toBeGreaterThan(vertical ? 600 : 300);
        const start = vertical ? "top" : "left";
        expect(thumb.getBoundingClientRect()[start] + 5).toBeCloseTo(
          track.getBoundingClientRect()[start] + 130,
          0,
        );
        expect(root.hasAttribute("data-dragging")).toBe(false);
      },
    );

    it("포인터 캡처로 트랙 밖에서도 드래그하고 버튼을 놓으면 상태를 정리한다", async () => {
      let pointerId = 0;
      let captured = false;
      let dragging = false;
      const { container } = render(
        <>
          {fixture({
            vertical: {
              onPointerMove(event) {
                pointerId = event.pointerId;
                captured ||= event.currentTarget.hasPointerCapture(pointerId);
                dragging ||= event.currentTarget.hasAttribute("data-dragging");
              },
            },
          })}
          <div data-testid="outside" style={{ width: 240, height: 80 }}>
            바깥 영역
          </div>
        </>,
      );
      await waitForDefaultMeasurement(container);
      const { root, viewport, vertical, verticalThumb } = getParts(container);

      await userEvent.dragAndDrop(
        verticalThumb,
        container.querySelector<HTMLElement>('[data-testid="outside"]')!,
        {
          sourcePosition: { x: 5, y: 5 },
          targetPosition: { x: 5, y: 40 },
        },
      );
      await expect.poll(() => viewport.scrollTop).toBe(720);
      expect(captured).toBe(true);
      expect(dragging).toBe(true);
      expect(root.hasAttribute("data-dragging")).toBe(false);
      expect(vertical.hasPointerCapture(pointerId)).toBe(false);
    });

    it("드래그 중 pointercancel을 받으면 포인터 캡처와 상태를 해제한다", async () => {
      let captured = false;
      let canceled = false;
      const { container } = render(
        fixture({
          vertical: {
            onPointerDown(event) {
              const track = event.currentTarget;
              const pointerId = event.pointerId;
              // The mouse driver cannot generate a platform pointercancel. Start with a real
              // pointer so capture is active, then inject only the cancellation event.
              queueMicrotask(() => {
                captured = track.hasPointerCapture(pointerId);
                flushSync(() =>
                  track.dispatchEvent(
                    new PointerEvent("pointercancel", { bubbles: true, pointerId }),
                  ),
                );
                canceled =
                  !track.hasPointerCapture(pointerId) && !track.hasAttribute("data-dragging");
              });
            },
          },
        }),
      );
      await waitForDefaultMeasurement(container);
      const { root, viewport, vertical, verticalThumb } = getParts(container);

      await userEvent.dragAndDrop(verticalThumb, vertical, {
        sourcePosition: { x: 5, y: 5 },
        targetPosition: { x: 5, y: 130 },
      });
      expect(captured).toBe(true);
      expect(canceled).toBe(true);
      expect(viewport.scrollTop).toBe(0);
      expect(root.hasAttribute("data-dragging")).toBe(false);
    });

    it.each(["onPointerDown", "onPointerMove"] as const)(
      "%s의 preventDefault로 포인터 처리를 취소한다",
      async (handler) => {
        const { container } = render(
          fixture({
            vertical: {
              [handler]: (event: ReactPointerEvent<HTMLDivElement>) => event.preventDefault(),
            },
          }),
        );
        await waitForDefaultMeasurement(container);
        const { root, viewport, vertical, verticalThumb } = getParts(container);
        await userEvent.dragAndDrop(verticalThumb, vertical, {
          sourcePosition: { x: 5, y: 5 },
          targetPosition: { x: 5, y: 130 },
        });
        expect(viewport.scrollTop).toBe(0);
        expect(root.hasAttribute("data-dragging")).toBe(false);
      },
    );
  });

  describe("커스텀 트랙의 휠 입력", () => {
    it.each(["vertical", "horizontal"] as const)(
      "%s 트랙의 실제 세로 휠 입력을 해당 축으로 전달한다",
      async (orientation) => {
        const { container } = render(fixture());
        await waitForDefaultMeasurement(container);
        const { viewport, track, thumb, property } = getAxisParts(container, orientation);
        const previous = thumb.style.transform;
        await userEvent.wheel(track, { delta: { y: 60 } });
        await expect.poll(() => viewport[property]).toBeGreaterThan(0);
        await expect.poll(() => thumb.style.transform).not.toBe(previous);
      },
    );

    // Synthetic events specify deltaMode explicitly without relying on the wheel
    // settings of the machine running the tests.
    it.each([
      { orientation: "vertical", mode: 0, lineHeight: "20px", expected: 1 },
      { orientation: "vertical", mode: 1, lineHeight: "20px", expected: 20 },
      { orientation: "vertical", mode: 1, lineHeight: "normal", expected: 16 },
      { orientation: "vertical", mode: 2, lineHeight: "20px", expected: 180 },
      { orientation: "horizontal", mode: 0, lineHeight: "20px", expected: 1 },
      { orientation: "horizontal", mode: 1, lineHeight: "20px", expected: 20 },
      { orientation: "horizontal", mode: 2, lineHeight: "20px", expected: 240 },
    ] as const)(
      "$orientation 휠의 deltaMode $mode와 줄 높이 $lineHeight를 픽셀로 환산한다",
      async ({ orientation, mode, lineHeight, expected }) => {
        const { container } = render(fixture({ viewport: { style: { lineHeight } } }));
        await waitForDefaultMeasurement(container);
        const { viewport, track, property } = getAxisParts(container, orientation);
        const event = new WheelEvent("wheel", {
          bubbles: true,
          cancelable: true,
          deltaMode: mode,
          deltaX: orientation === "horizontal" ? 1 : 0,
          deltaY: orientation === "vertical" ? 1 : 0,
        });
        track.dispatchEvent(event);
        await expect.poll(() => viewport[property]).toBe(expected);
        expect(event.defaultPrevented).toBe(true);
      },
    );

    it("Ctrl+휠과 이미 취소된 휠 입력을 가로채지 않는다", async () => {
      const { container } = render(fixture());
      await waitForDefaultMeasurement(container);
      const { viewport, vertical } = getParts(container);
      // An untrusted Ctrl+wheel avoids changing the browser's zoom for later tests.
      const zoom = new WheelEvent("wheel", {
        bubbles: true,
        cancelable: true,
        ctrlKey: true,
        deltaY: 60,
      });
      vertical.dispatchEvent(zoom);
      expect(zoom.defaultPrevented).toBe(false);
      const canceled = new WheelEvent("wheel", { bubbles: true, cancelable: true, deltaY: 60 });
      canceled.preventDefault();
      vertical.dispatchEvent(canceled);
      expect(viewport.scrollTop).toBe(0);
    });

    it("스크롤 범위 끝에서는 바깥 영역으로 휠 스크롤을 이어간다", async () => {
      const { container } = render(
        <div data-testid="outer" style={{ width: 320, height: 260, overflow: "auto" }}>
          {fixture()}
          <div style={{ height: 1000 }}>바깥 콘텐츠</div>
        </div>,
      );
      await waitForDefaultMeasurement(container);
      const { viewport, vertical } = getParts(container);
      const outer = container.querySelector<HTMLElement>('[data-testid="outer"]')!;
      await userEvent.wheel(vertical, { delta: { y: 60 } });
      await expect.poll(() => viewport.scrollTop).toBeGreaterThan(0);
      expect(outer.scrollTop).toBe(0);
      viewport.scrollTop = 720;
      await expect.poll(() => viewport.scrollTop).toBe(720);
      await userEvent.wheel(vertical, { delta: { y: 100 } });
      await expect.poll(() => outer.scrollTop).toBeGreaterThan(0);
      expect(viewport.scrollTop).toBe(720);
    });
  });

  describe("RTL", () => {
    it("세로 스크롤바와 Corner를 왼쪽에 배치하고 가로 클릭과 휠을 처리한다", async () => {
      const { container } = render(fixture({ root: { dir: "rtl" } }));
      await waitForDefaultMeasurement(container);
      const { root, viewport, vertical, horizontal, horizontalThumb, corner } = getParts(container);
      expect(vertical.getBoundingClientRect().left).toBe(root.getBoundingClientRect().left);
      expect(corner.getBoundingClientRect().left).toBe(root.getBoundingClientRect().left);
      expect(horizontalThumb.getBoundingClientRect().right).toBeCloseTo(
        horizontal.getBoundingClientRect().right,
        0,
      );
      await userEvent.click(horizontal, { position: { x: 30, y: 5 } });
      await expect.poll(() => viewport.scrollLeft).toBeLessThan(0);
      const beforeWheel = viewport.scrollLeft;
      await userEvent.wheel(horizontal, { delta: { x: 60 } });
      await expect.poll(() => viewport.scrollLeft).toBeGreaterThan(beforeWheel);
    });

    it("RTL 가로 Thumb을 왼쪽으로 드래그해 음수 scrollLeft 범위를 이동한다", async () => {
      const { container } = render(fixture({ root: { dir: "rtl" } }));
      await waitForDefaultMeasurement(container);
      const { viewport, horizontal, horizontalThumb } = getParts(container);
      await userEvent.dragAndDrop(horizontalThumb, horizontal, {
        sourcePosition: { x: 5, y: 5 },
        targetPosition: { x: 5, y: 5 },
      });
      await expect.poll(() => viewport.scrollLeft).toBeLessThan(-200);
    });
  });

  describe("render 합성", () => {
    it("모든 Part의 태그와 Props, 두 Ref를 합성하고 DOM 구조를 유지한다", async () => {
      const refs = {
        root: createRef<HTMLDivElement>(),
        viewport: createRef<HTMLDivElement>(),
        content: createRef<HTMLDivElement>(),
        vertical: createRef<HTMLDivElement>(),
        horizontal: createRef<HTMLDivElement>(),
        verticalThumb: createRef<HTMLDivElement>(),
        horizontalThumb: createRef<HTMLDivElement>(),
        corner: createRef<HTMLDivElement>(),
      };
      const renderRefs = {
        root: createRef<HTMLElement>(),
        viewport: createRef<HTMLElement>(),
        content: createRef<HTMLElement>(),
        vertical: createRef<HTMLSpanElement>(),
        horizontal: createRef<HTMLSpanElement>(),
        verticalThumb: createRef<HTMLSpanElement>(),
        horizontalThumb: createRef<HTMLSpanElement>(),
        corner: createRef<HTMLSpanElement>(),
      };
      const calls: string[] = [];
      const { container } = render(
        fixture({
          root: {
            render: (
              <section
                ref={renderRefs.root}
                className="render"
                title="render"
                onClick={() => calls.push("render")}
              />
            ),
            ref: refs.root,
            className: "part",
            title: "part",
            onClick: () => calls.push("part"),
          },
          viewport: {
            render: <section ref={renderRefs.viewport} aria-label="합성 문서" />,
            ref: refs.viewport,
          },
          content: { render: <article ref={renderRefs.content} />, ref: refs.content },
          vertical: {
            render: <span ref={renderRefs.vertical} aria-hidden={false} hidden />,
            ref: refs.vertical,
          },
          horizontal: { render: <span ref={renderRefs.horizontal} />, ref: refs.horizontal },
          verticalThumb: {
            render: <span ref={renderRefs.verticalThumb} />,
            ref: refs.verticalThumb,
          },
          horizontalThumb: {
            render: <span ref={renderRefs.horizontalThumb} />,
            ref: refs.horizontalThumb,
          },
          corner: {
            render: <span ref={renderRefs.corner} aria-hidden={false} hidden />,
            ref: refs.corner,
          },
        }),
      );
      await waitForDefaultMeasurement(container);
      const parts = getParts(container);
      for (const name of Object.keys(refs) as Array<keyof typeof refs>) {
        expect(refs[name].current).toBe(parts[name]);
        expect(renderRefs[name].current).toBe(parts[name]);
      }
      expect(parts.root.tagName).toBe("SECTION");
      expect(parts.viewport.tagName).toBe("SECTION");
      expect(parts.content.tagName).toBe("ARTICLE");
      expect(parts.vertical.tagName).toBe("SPAN");
      expect(parts.verticalThumb.tagName).toBe("SPAN");
      expect(parts.corner.tagName).toBe("SPAN");
      expect(parts.root.className).toBe("render part");
      expect(parts.root.title).toBe("part");
      expect(parts.viewport.parentElement).toBe(parts.root);
      expect(parts.content.parentElement).toBe(parts.viewport);
      expect(parts.verticalThumb.parentElement).toBe(parts.vertical);
      expect(parts.vertical.hidden).toBe(false);
      expect(parts.vertical.getAttribute("aria-hidden")).toBe("true");
      expect(parts.corner.hidden).toBe(false);
      expect(parts.corner.getAttribute("aria-hidden")).toBe("true");
      expect(container.querySelector("[render]")).toBeNull();
      await expect.element(page.getByRole("region", { name: "합성 문서" })).toBeVisible();
      expect((await axe.run(container)).violations).toEqual([]);
      await userEvent.click(parts.root, { position: { x: 10, y: 10 } });
      expect(calls).toEqual(["render", "part"]);
    });

    it("사용자 컴포넌트의 DOM에서 크기를 측정하고 합성 이벤트와 드래그를 처리한다", async () => {
      const calls: string[] = [];
      const { container } = render(
        fixture({
          root: { render: <Box /> },
          viewport: { render: <Box aria-label="문서" /> },
          content: { render: <Box /> },
          vertical: {
            render: <Box onPointerDown={() => calls.push("render")} />,
            onPointerDown: () => calls.push("part"),
          },
          horizontal: { render: <Box /> },
          verticalThumb: { render: <Box /> },
          horizontalThumb: { render: <Box /> },
          corner: { render: <Box /> },
        }),
      );
      await waitForDefaultMeasurement(container);
      const parts = getParts(container);
      for (const part of Object.values(parts)) expect(part.hasAttribute("data-box")).toBe(true);
      await userEvent.dragAndDrop(parts.verticalThumb, parts.vertical, {
        sourcePosition: { x: 5, y: 5 },
        targetPosition: { x: 5, y: 130 },
      });
      await expect.poll(() => parts.viewport.scrollTop).toBeGreaterThan(400);
      expect(calls).toEqual(["render", "part"]);
    });

    it("합성 요소의 접근성 속성을 반영하고 Part에서 전달한 값을 우선한다", async () => {
      const renderElement = <section role="log" tabIndex={-1} aria-label="원본" />;
      const { container, rerender } = render(fixture({ viewport: { render: renderElement } }));
      await waitForDefaultMeasurement(container);
      expect(getParts(container).viewport.tabIndex).toBe(-1);
      await expect.element(page.getByRole("log", { name: "원본" })).toBeVisible();
      rerender(
        fixture({
          viewport: { render: renderElement, role: "region", tabIndex: 0, "aria-label": "변경" },
        }),
      );
      expect(getParts(container).viewport.tabIndex).toBe(0);
      await expect.element(page.getByRole("region", { name: "변경" })).toBeVisible();
      rerender(
        <>
          <p id="render-title">합성된 이름</p>
          {fixture({ viewport: { render: <section aria-labelledby="render-title" /> } })}
        </>,
      );
      await expect.element(page.getByRole("region", { name: "합성된 이름" })).toBeVisible();
      rerender(fixture({ viewport: { render: <section /> } }));
      expect(getParts(container).viewport.hasAttribute("role")).toBe(false);
    });

    it("합성한 Root의 dir 변경을 감지하고 Part의 dir을 우선한다", async () => {
      const { container, rerender } = render(fixture({ root: { render: <section dir="ltr" /> } }));
      await waitForDefaultMeasurement(container);
      const { root, viewport, horizontalThumb, horizontal } = getParts(container);
      expect(horizontalThumb.style.transform).toBe("translateX(0px)");
      rerender(fixture({ root: { render: <section dir="rtl" /> } }));
      await expect
        .poll(() => horizontalThumb.getBoundingClientRect().right)
        .toBeCloseTo(horizontal.getBoundingClientRect().right, 0);
      expect(getParts(container).root).toBe(root);
      expect(getParts(container).viewport).toBe(viewport);
      rerender(fixture({ root: { render: <section dir="rtl" />, dir: "ltr" } }));
      await expect.poll(() => horizontalThumb.style.transform).toBe("translateX(0px)");
      expect(root.dir).toBe("ltr");
    });

    it("트랙과 Corner가 다시 표시될 때 합성 요소의 display를 복원한다", async () => {
      const options: FixtureOptions = {
        vertical: { render: <span style={{ display: "grid" }} /> },
        horizontal: { render: <span style={{ display: "grid" }} /> },
        corner: { render: <span style={{ display: "grid" }} /> },
      };
      const { container, rerender } = render(fixture(options));
      await waitForDefaultMeasurement(container);
      const { horizontal, vertical, corner } = getParts(container);
      expect(horizontal.style.display).toBe("grid");
      rerender(fixture({ ...options, contentWidth: 100, contentHeight: 100 }));
      await expect.poll(() => horizontal.hidden && vertical.hidden && corner.hidden).toBe(true);
      expect(horizontal.style.display).toBe("none");
      expect(corner.style.display).toBe("none");
      rerender(fixture(options));
      await waitForDefaultMeasurement(container);
      for (const part of [horizontal, vertical, corner]) {
        expect(part.hidden).toBe(false);
        expect(part.style.display).toBe("grid");
      }
    });

    it("Viewport의 태그를 바꾸면 새 DOM에 Ref와 스크롤 측정을 연결한다", async () => {
      const ref = createRef<HTMLDivElement>();
      const { container, rerender } = render(
        fixture({ viewport: { render: <section aria-label="문서" />, ref } }),
      );
      await waitForDefaultMeasurement(container);
      const previous = ref.current;
      rerender(fixture({ viewport: { render: <div aria-label="새 문서" />, ref } }));
      await waitForDefaultMeasurement(container);
      const { viewport, verticalThumb } = getParts(container);
      expect(viewport).not.toBe(previous);
      expect(ref.current).toBe(viewport);
      await userEvent.wheel(viewport, { delta: { y: 100 } });
      await expect.poll(() => viewport.scrollTop).toBeGreaterThan(0);
      await expect.poll(() => verticalThumb.style.transform).not.toBe("translateY(0px)");
    });
  });
});

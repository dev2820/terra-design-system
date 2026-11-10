import {
  createRef,
  StrictMode,
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

import { Positioner, type PositionerPlacement, type PositionerProps } from ".";
import { Positioner as RootExportPositioner } from "..";
import { Portal } from "../portal";

const fixtures: Array<{ container: HTMLDivElement; root: Root }> = [];
afterEach(() => {
  for (const { container, root } of fixtures.splice(0)) {
    flushSync(() => root.unmount());
    container.remove();
  }
});
function render(children: ReactNode) {
  const container = document.createElement("div");
  const root = createRoot(container);
  document.body.append(container);
  fixtures.push({ container, root });
  flushSync(() => root.render(children));
  return { container, rerender: (next: ReactNode) => flushSync(() => root.render(next)) };
}
function CustomContainer(props: ComponentProps<"div">) {
  return <div {...props} data-custom="" />;
}

function Fixture({
  open = false,
  portal = false,
  positionerProps = {},
  anchorProps = { style: { marginLeft: 24 } },
}: {
  open?: boolean;
  portal?: boolean;
  positionerProps?: Omit<PositionerProps, "open" | "anchorRef">;
  anchorProps?: ComponentProps<"button">;
}) {
  const anchorRef = useRef<HTMLButtonElement>(null);
  const popup = (
    <Positioner open={open} anchorRef={anchorRef} data-positioner="" {...positionerProps}>
      <button>패널 작업</button>
    </Positioner>
  );
  return (
    <>
      <button ref={anchorRef} data-anchor="" {...anchorProps}>
        기준 요소
      </button>
      {portal ? <Portal>{popup}</Portal> : popup}
      <button data-outside="" style={{ display: "block", marginTop: 240 }}>
        외부 작업
      </button>
    </>
  );
}
const getPositioner = () => document.querySelector<HTMLDivElement>("[data-positioner]");
const getAnchor = () => document.querySelector<HTMLButtonElement>("[data-anchor]")!;

async function expectPositioned() {
  await vi.waitFor(() => {
    expect(getPositioner()?.matches(":popover-open")).toBe(true);
    expect(getPositioner()!.style.getPropertyValue("--anchor-width")).not.toBe("");
  });
}

function ArrowFixture() {
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const [placement, setPlacement] = useState<PositionerPlacement | null>(null);
  return (
    <>
      <button ref={anchorRef}>기준 요소</button>
      <Positioner
        open
        anchorRef={anchorRef}
        arrowElement={arrowElement}
        onPlacementChange={setPlacement}
        data-positioner=""
        style={{ width: 160, height: 80 }}
      >
        <div
          ref={setArrowElement}
          data-arrow=""
          style={{ position: "absolute", width: 10, height: 10, ...placement?.arrowStyle }}
        />
      </Positioner>
    </>
  );
}

// The browser owns the top layer and manual popover behavior. These tests cover
// Coral's controlled visibility, anchored placement, cleanup and DOM composition.
describe("Positioner", () => {
  it("루트 export와 닫힌 상태의 DOM 제거를 제공한다", () => {
    expect(RootExportPositioner).toBe(Positioner);
    render(<Fixture />);
    expect(getPositioner()).toBeNull();
  });

  it.each([false, true])(
    "Portal=%s에서도 기준 요소 옆에 배치하고 크기 변수를 제공한다",
    async (portal) => {
      render(<Fixture open portal={portal} positionerProps={{ sideOffset: 6, align: "start" }} />);
      await expectPositioned();
      const element = getPositioner()!;
      const anchor = getAnchor().getBoundingClientRect();
      expect(element.getAttribute("popover")).toBe("manual");
      expect(element.hasAttribute("role")).toBe(false);
      expect(element.hasAttribute("tabindex")).toBe(false);
      expect(element.dataset.side).toBe("bottom");
      expect(element.dataset.align).toBe("start");
      expect(element.getBoundingClientRect().top).toBeCloseTo(anchor.bottom + 6, 0);
      expect(element.getBoundingClientRect().left).toBeCloseTo(anchor.left, 0);
      expect(element.style.getPropertyValue("--anchor-width")).toBe(`${anchor.width}px`);
      expect(element.style.getPropertyValue("--anchor-height")).toBe(`${anchor.height}px`);
      expect(parseFloat(element.style.getPropertyValue("--available-width"))).toBeGreaterThan(0);
      expect(parseFloat(element.style.getPropertyValue("--available-height"))).toBeGreaterThan(0);
    },
  );

  it("배치가 완료된 뒤 알리고 닫으면 정리 결과를 전달한다", async () => {
    const onPlacementChange = vi.fn();
    const ref = createRef<HTMLDivElement>();
    const view = render(<Fixture open positionerProps={{ ref, onPlacementChange }} />);
    await vi.waitFor(() =>
      expect(onPlacementChange).toHaveBeenCalledWith({
        side: "bottom",
        align: "center",
        arrowStyle: {},
      }),
    );
    const element = ref.current!;
    expect(element.style.left).not.toBe("");
    expect(element.style.getPropertyValue("--anchor-width")).not.toBe("");
    view.rerender(<Fixture positionerProps={{ ref, onPlacementChange }} />);
    expect(getPositioner()).toBeNull();
    expect(ref.current).toBeNull();
    expect(element.matches(":popover-open")).toBe(false);
    expect(onPlacementChange).toHaveBeenLastCalledWith(null);
  });

  it("포커스를 이동하거나 Escape와 외부 클릭으로 자체 상태를 바꾸지 않는다", async () => {
    const view = render(<Fixture />);
    await page.getByRole("button", { name: "기준 요소" }).click();
    view.rerender(<Fixture open />);
    await expectPositioned();
    expect(document.activeElement).toBe(getAnchor());
    await userEvent.keyboard("{Escape}");
    expect(getPositioner()!.matches(":popover-open")).toBe(true);
    await page.getByRole("button", { name: "외부 작업" }).click();
    expect(getPositioner()!.matches(":popover-open")).toBe(true);
    expect(document.activeElement).toBe(document.querySelector("[data-outside]"));
    // Standalone contents work without a separate Content Part enabling pointer events.
    await page.getByRole("button", { name: "패널 작업" }).click();
    expect(document.activeElement?.textContent).toBe("패널 작업");
  });

  it("화면 아래 공간이 부족하면 위로 보정한다", async () => {
    render(
      <Fixture
        open
        anchorProps={{ style: { position: "fixed", bottom: 8, left: 8 } }}
        positionerProps={{ sideOffset: 4 }}
      />,
    );
    await vi.waitFor(() => expect(getPositioner()?.dataset.side).toBe("top"));
    expect(getPositioner()!.getBoundingClientRect().bottom).toBeCloseTo(
      getAnchor().getBoundingClientRect().top - 4,
      0,
    );
  });

  it("기준 요소 크기와 배치 옵션 변경을 반영한다", async () => {
    const view = render(<Fixture open anchorProps={{ style: { width: 120, marginLeft: 32 } }} />);
    await expectPositioned();
    view.rerender(
      <Fixture
        open
        anchorProps={{ style: { width: 180, marginLeft: 32 } }}
        positionerProps={{ side: "right", align: "start", sideOffset: 10 }}
      />,
    );
    await vi.waitFor(() => {
      expect(getPositioner()!.dataset.side).toBe("right");
      expect(getPositioner()!.style.getPropertyValue("--anchor-width")).toBe(
        `${getAnchor().getBoundingClientRect().width}px`,
      );
      expect(getPositioner()!.getBoundingClientRect().left).toBeCloseTo(
        getAnchor().getBoundingClientRect().right + 10,
        0,
      );
    });
  });

  it("사용자 컴포넌트와 Ref를 합성하고 다시 열어도 같은 계약을 유지한다", async () => {
    const ref = createRef<HTMLDivElement>();
    const renderRef = createRef<HTMLDivElement>();
    const props = { ref, render: <CustomContainer ref={renderRef} />, className: "panel" };
    const view = render(<Fixture open positionerProps={props} />);
    await expectPositioned();
    expect(ref.current).toBe(renderRef.current);
    expect(ref.current).toBe(getPositioner());
    expect(ref.current!.hasAttribute("data-custom")).toBe(true);
    view.rerender(<Fixture positionerProps={props} />);
    expect(ref.current).toBeNull();
    view.rerender(<Fixture open positionerProps={props} />);
    await expectPositioned();
    expect(ref.current!.className).toBe("panel");
    expect(ref.current).toBe(renderRef.current);
  });

  it("화살표 위치와 크기 변경을 배치 결과로 전달한다", async () => {
    render(<ArrowFixture />);
    const arrow = document.querySelector<HTMLDivElement>("[data-arrow]")!;
    await vi.waitFor(() => expect(arrow.style.top).toBe("-5px"));
    arrow.style.height = "20px";
    await vi.waitFor(() => expect(arrow.style.top).toBe("-10px"));
  });

  it("StrictMode hydration에서 서버 구조와 표시 생명주기를 유지한다", async () => {
    const children = (
      <StrictMode>
        <Fixture open />
      </StrictMode>
    );
    const container = document.createElement("div");
    container.innerHTML = renderToString(children);
    expect(container.querySelector("[data-positioner]")!.getAttribute("popover")).toBe("manual");
    document.body.append(container);
    const onRecoverableError = vi.fn();
    const root = hydrateRoot(container, children, { onRecoverableError });
    fixtures.push({ container, root });
    await expectPositioned();
    expect(onRecoverableError).not.toHaveBeenCalled();
    expect(document.querySelectorAll("[data-positioner]")).toHaveLength(1);
  });
});

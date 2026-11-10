import {
  createContext,
  createRef,
  StrictMode,
  use,
  type ComponentProps,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";
import { createRoot, hydrateRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { page } from "vitest/browser";

import { Portal } from ".";
import { Portal as RootExportPortal } from "..";

const fixtures: Array<{ container: HTMLDivElement; root: Root }> = [];
const targets: HTMLElement[] = [];
afterEach(() => {
  for (const { container, root } of fixtures.splice(0)) {
    flushSync(() => root.unmount());
    container.remove();
  }
  for (const target of targets.splice(0)) target.remove();
});

function render(children: ReactNode) {
  const container = document.createElement("div");
  const root = createRoot(container);
  document.body.append(container);
  fixtures.push({ container, root });
  flushSync(() => root.render(children));
  return { container, rerender: (next: ReactNode) => flushSync(() => root.render(next)) };
}

function createTarget() {
  const element = document.createElement("section");
  document.body.append(element);
  targets.push(element);
  return element;
}

function CustomContainer(props: ComponentProps<"div">) {
  return <div {...props} data-custom="" />;
}

const MessageContext = createContext("");
function ContextMessage() {
  return <button>{use(MessageContext)}</button>;
}

// React owns portal event bubbling and context propagation. These checks ensure
// Coral preserves them through its wrapper, client mounting and render composition.
describe("Portal", () => {
  it("루트 export와 body의 기본 컨테이너를 제공한다", async () => {
    expect(RootExportPortal).toBe(Portal);
    const ref = createRef<HTMLDivElement>();
    const { container } = render(<Portal ref={ref}>내용</Portal>);
    await vi.waitFor(() => expect(ref.current?.parentElement).toBe(document.body));
    expect(container.contains(ref.current)).toBe(false);
    expect(ref.current!.hasAttribute("role")).toBe(false);
    expect(ref.current!.hasAttribute("popover")).toBe(false);
  });

  it("대상 컨테이너 변경과 null의 body 대체를 반영한다", async () => {
    const first = createTarget();
    const second = createTarget();
    const ref = createRef<HTMLDivElement>();
    const view = render(
      <Portal ref={ref} container={first}>
        내용
      </Portal>,
    );
    await vi.waitFor(() => expect(ref.current?.parentElement).toBe(first));
    view.rerender(
      <Portal ref={ref} container={second}>
        내용
      </Portal>,
    );
    expect(ref.current!.parentElement).toBe(second);
    expect(first.childElementCount).toBe(0);
    view.rerender(
      <Portal ref={ref} container={null}>
        내용
      </Portal>,
    );
    expect(ref.current!.parentElement).toBe(document.body);
  });

  it("사용자 컴포넌트, 이벤트와 Ref를 합성하고 제거할 때 정리한다", async () => {
    const ref = createRef<HTMLDivElement>();
    const renderRef = createRef<HTMLDivElement>();
    const onClick = vi.fn();
    const renderClick = vi.fn();
    const view = render(
      <Portal
        ref={ref}
        onClick={onClick}
        className="part"
        render={<CustomContainer ref={renderRef} className="custom" onClick={renderClick} />}
      >
        <button>작업</button>
      </Portal>,
    );
    await page.getByRole("button", { name: "작업" }).click();
    expect(ref.current).toBe(renderRef.current);
    expect(ref.current!.hasAttribute("data-custom")).toBe(true);
    expect(ref.current!.className).toBe("custom part");
    expect(onClick).toHaveBeenCalledOnce();
    expect(renderClick).toHaveBeenCalledOnce();
    view.rerender(null);
    expect(ref.current).toBeNull();
    expect(renderRef.current).toBeNull();
  });

  it("React 컨텍스트와 부모 이벤트 연결을 유지한다", async () => {
    const onClick = vi.fn();
    render(
      <MessageContext value="컨텍스트 작업">
        <div onClick={onClick}>
          <Portal>
            <ContextMessage />
          </Portal>
        </div>
      </MessageContext>,
    );
    await page.getByRole("button", { name: "컨텍스트 작업" }).click();
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("서버에서는 생략하고 StrictMode hydration 후 한 번 렌더링한다", async () => {
    const ref = createRef<HTMLDivElement>();
    const children = (
      <StrictMode>
        <Portal ref={ref} data-portal="">
          내용
        </Portal>
      </StrictMode>
    );
    const markup = renderToString(children);
    expect(markup).toBe("");
    const container = document.createElement("div");
    container.innerHTML = markup;
    document.body.append(container);
    const onRecoverableError = vi.fn();
    const root = hydrateRoot(container, children, { onRecoverableError });
    fixtures.push({ container, root });
    await vi.waitFor(() => expect(ref.current?.parentElement).toBe(document.body));
    expect(document.querySelectorAll("[data-portal]")).toHaveLength(1);
    expect(onRecoverableError).not.toHaveBeenCalled();
  });
});

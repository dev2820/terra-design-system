import * as React from "react";
import { flushSync } from "react-dom";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import { userEvent } from "vitest/browser";

import { useRender, type RenderProp } from "./index";

const fixtures: Array<{ container: HTMLDivElement; root: Root }> = [];

afterEach(() => {
  for (const fixture of fixtures) {
    flushSync(() => fixture.root.unmount());
    fixture.container.remove();
  }

  fixtures.length = 0;
});

function render(children: React.ReactNode) {
  const container = document.createElement("div");
  const root = createRoot(container);

  document.body.append(container);
  fixtures.push({ container, root });
  flushSync(() => root.render(children));

  return container;
}

interface TestPartProps extends React.ComponentPropsWithRef<"button"> {
  internalProps?: object;
  render?: RenderProp;
}

function TestPart(props: TestPartProps) {
  const { internalProps = {}, render: renderElement, ...rest } = props;

  return useRender({
    defaultTagName: "button",
    render: renderElement,
    props: rest,
    internalProps,
  });
}

describe("useRender", () => {
  it("render를 생략하면 기본 요소를 렌더링한다", () => {
    const container = render(<TestPart>버튼</TestPart>);
    const button = container.querySelector("button");

    expect(button?.textContent).toBe("버튼");
  });

  it("render 요소로 기본 요소를 교체한다", () => {
    const container = render(<TestPart render={<a href="/render">링크</a>} aria-label="이동" />);
    const link = container.querySelector("a");

    expect(container.querySelector("button")).toBeNull();
    expect(link?.getAttribute("href")).toBe("/render");
    expect(link?.getAttribute("aria-label")).toBe("이동");
    expect(link?.textContent).toBe("링크");
  });

  it("일반 속성은 Part와 내부 속성 순서로 덮어쓴다", () => {
    const container = render(
      <TestPart
        render={<button title="render">버튼</button>}
        title="part"
        internalProps={{ title: "internal" }}
      />,
    );

    expect(container.querySelector("button")?.title).toBe("internal");
  });

  it("className은 render, Part와 내부 속성 순서로 연결한다", () => {
    const container = render(
      <TestPart
        render={<button className="render">버튼</button>}
        className="part"
        internalProps={{ className: "internal" }}
      />,
    );
    const button = container.querySelector("button");

    expect(button?.className).toBe("render part internal");
  });

  it("style은 얕게 병합하고 나중 속성을 우선한다", () => {
    const container = render(
      <TestPart
        render={<button style={{ color: "red", padding: "4px" }}>버튼</button>}
        style={{ color: "blue", margin: "2px" }}
        internalProps={{ style: { color: "green" } }}
      />,
    );
    const button = container.querySelector("button");

    expect(button?.style.color).toBe("green");
    expect(button?.style.padding).toBe("4px");
    expect(button?.style.margin).toBe("2px");
  });

  it("같은 이벤트 핸들러를 render, Part와 내부 속성 순서로 실행한다", async () => {
    const calls: string[] = [];
    const container = render(
      <TestPart
        render={<button onClick={() => calls.push("render")}>버튼</button>}
        onClick={(event) => {
          calls.push("part");
          event.preventDefault();
        }}
        internalProps={{
          onClick: (event: React.MouseEvent<HTMLButtonElement>) =>
            calls.push(`internal:${event.defaultPrevented}`),
        }}
      />,
    );
    const button = container.querySelector("button");

    if (!button) {
      throw new Error("useRender 테스트 구성이 완전하지 않습니다.");
    }

    await userEvent.click(button);

    expect(calls).toEqual(["render", "part", "internal:true"]);
  });

  it("render, Part와 내부 ref를 같은 요소에 연결한다", () => {
    const renderRef = React.createRef<HTMLButtonElement>();
    const partRef = React.createRef<HTMLButtonElement>();
    const internalRef = React.createRef<HTMLButtonElement>();
    const container = render(
      <TestPart
        render={<button ref={renderRef}>버튼</button>}
        ref={partRef}
        internalProps={{ ref: internalRef }}
      />,
    );
    const button = container.querySelector("button");

    expect(renderRef.current).toBe(button);
    expect(partRef.current).toBe(button);
    expect(internalRef.current).toBe(button);
  });

  it("React 19 callback ref의 정리 함수를 보존한다", () => {
    const cleanup = vi.fn();
    const callbackRef = vi.fn(() => cleanup);
    const container = document.createElement("div");
    const root = createRoot(container);

    document.body.append(container);
    flushSync(() =>
      root.render(<TestPart render={<button ref={callbackRef}>버튼</button>} ref={() => {}} />),
    );
    flushSync(() => root.unmount());
    container.remove();

    expect(cleanup).toHaveBeenCalledOnce();
  });
});

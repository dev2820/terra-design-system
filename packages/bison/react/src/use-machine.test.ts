import {
  dismissableMachine,
  type DismissableEvent,
  type DismissableProps,
  type DismissableState,
} from "@bison/core";
import { act, createElement, type ReactNode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, expectTypeOf, it } from "vitest";
import { userEvent } from "vitest/browser";

import { useMachine } from "./use-machine";

const roots: Root[] = [];
const containers: HTMLElement[] = [];

Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });

afterEach(async () => {
  await act(async () => {
    for (const root of roots) {
      root.unmount();
    }
  });

  for (const container of containers) {
    container.remove();
  }

  roots.length = 0;
  containers.length = 0;
});

function render(element: ReactNode) {
  const container = document.createElement("div");
  const root = createRoot(container);

  document.body.append(container);
  containers.push(container);
  roots.push(root);

  act(() => root.render(element));

  return container;
}

function Dismissable(props: DismissableProps) {
  const actor = useMachine(dismissableMachine, props);
  const { state } = actor.getSnapshot();

  return createElement(
    "button",
    {
      "aria-expanded": state.open,
      onClick: () => actor.send({ type: "toggle" }),
      type: "button",
    },
    state.open ? "열림" : "닫힘",
  );
}

function TypeFixture() {
  const actor = useMachine(dismissableMachine, {});

  expectTypeOf(actor.getSnapshot().state).toEqualTypeOf<DismissableState>();
  expectTypeOf(actor.getSnapshot().props).toEqualTypeOf<{}>();
  expectTypeOf<Parameters<typeof actor.send>[0]>().toEqualTypeOf<DismissableEvent>();

  return null;
}

describe("useMachine", () => {
  it("machine의 초기 상태를 React에 연결한다", () => {
    const trigger = render(createElement(Dismissable)).querySelector("button");

    expect(trigger?.getAttribute("aria-expanded")).toBe("false");
    expect(trigger?.textContent).toBe("닫힘");
  });

  it("machine에 이벤트를 보내면 React를 다시 렌더링한다", async () => {
    const trigger = render(createElement(Dismissable)).querySelector("button");

    if (!trigger) {
      throw new Error("Trigger를 찾을 수 없습니다.");
    }

    await act(async () => userEvent.click(trigger));

    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(trigger.textContent).toBe("열림");
  });

  it("machine의 props, state와 event 타입을 유지한다", () => {
    expect(TypeFixture).toBeTypeOf("function");
  });
});

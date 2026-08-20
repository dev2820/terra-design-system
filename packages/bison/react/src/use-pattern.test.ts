import type { Actor, NormalizeProps, Pattern, PatternTypes } from "@bison/core";
import { act, createElement, StrictMode, type ButtonHTMLAttributes, type ReactNode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, expectTypeOf, it, vi } from "vitest";
import { userEvent } from "vitest/browser";

import { usePattern } from "./use-pattern";

interface ToggleProps {
  onChange?: (active: boolean) => void;
}

interface ToggleState {
  active: boolean;
}

interface TogglePropTypes {
  button: unknown;
}

interface ToggleApi<Props extends TogglePropTypes> {
  active: boolean;
  getTriggerProps: () => Props["button"];
}

interface TogglePatternTypes extends PatternTypes {
  api: this["propTypes"] extends TogglePropTypes ? ToggleApi<this["propTypes"]> : never;
}

type ToggleEvent = { type: "activate" };

const machine = {
  initial(): ToggleState {
    return { active: false };
  },

  transition(state: ToggleState, _event: ToggleEvent, props: ToggleProps): ToggleState {
    const active = !state.active;

    props.onChange?.(active);

    return { active };
  },
};

function connect<MachineProps extends ToggleProps, Props extends TogglePropTypes>(
  actor: Actor<MachineProps, ToggleState, ToggleEvent>,
  normalize: NormalizeProps<Props>,
): ToggleApi<Props> {
  const { state } = actor.getSnapshot();

  return {
    active: state.active,
    getTriggerProps: () =>
      normalize.button({
        type: "button",
        "aria-pressed": state.active,
        onClick: () => actor.send({ type: "activate" }),
      }),
  };
}

const togglePattern = {
  machine,
  connect,
} as Pattern<ToggleProps, ToggleState, ToggleEvent, TogglePropTypes, TogglePatternTypes>;

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

function Toggle(props: ToggleProps) {
  const api = usePattern(togglePattern, props);

  return createElement("button", api.getTriggerProps(), api.active ? "켜짐" : "꺼짐");
}

function TypeFixture() {
  const api = usePattern(togglePattern, {});

  expectTypeOf(api.active).toEqualTypeOf<boolean>();
  expectTypeOf(api.getTriggerProps()).toEqualTypeOf<ButtonHTMLAttributes<HTMLButtonElement>>();

  return null;
}

describe("usePattern", () => {
  it("초기 상태를 React props로 연결한다", () => {
    const trigger = render(createElement(Toggle)).querySelector("button");

    expect(trigger?.getAttribute("aria-pressed")).toBe("false");
    expect(trigger?.textContent).toBe("꺼짐");
  });

  it("이벤트로 상태가 바뀌면 React를 다시 렌더링한다", async () => {
    const trigger = render(createElement(Toggle)).querySelector("button");

    if (!trigger) {
      throw new Error("Trigger를 찾을 수 없습니다.");
    }

    await act(async () => userEvent.click(trigger));

    expect(trigger.getAttribute("aria-pressed")).toBe("true");
    expect(trigger.textContent).toBe("켜짐");
  });

  it("최신 props를 이벤트 처리에 사용한다", async () => {
    const first = vi.fn();
    const second = vi.fn();
    const container = render(createElement(Toggle, { onChange: first }));
    const root = roots.at(-1);

    if (!root) {
      throw new Error("React Root를 찾을 수 없습니다.");
    }

    act(() => root.render(createElement(Toggle, { onChange: second })));

    const trigger = container.querySelector("button");

    if (!trigger) {
      throw new Error("Trigger를 찾을 수 없습니다.");
    }

    await act(async () => userEvent.click(trigger));

    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledWith(true);
  });

  it("StrictMode에서도 이벤트를 한 번 처리한다", async () => {
    const onChange = vi.fn();
    const trigger = render(
      createElement(StrictMode, null, createElement(Toggle, { onChange })),
    ).querySelector("button");

    if (!trigger) {
      throw new Error("Trigger를 찾을 수 없습니다.");
    }

    await act(async () => userEvent.click(trigger));

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("정규화한 React props 타입을 유지한다", () => {
    expect(TypeFixture).toBeTypeOf("function");
  });
});

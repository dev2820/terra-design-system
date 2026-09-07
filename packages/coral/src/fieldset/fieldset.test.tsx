import axe from "axe-core";
import { Component, createRef, type ReactNode, useState } from "react";
import { flushSync } from "react-dom";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import { userEvent } from "vitest/browser";

import { Field } from "../field/index";
import { Input } from "../input/index";
import { Fieldset } from "./index";

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

  return container;
}

class TestErrorBoundary extends Component<
  { children: ReactNode },
  { error: globalThis.Error | null }
> {
  state: { error: globalThis.Error | null } = { error: null };

  static getDerivedStateFromError(error: globalThis.Error) {
    return { error };
  }

  render() {
    return this.state.error ? this.state.error.message : this.props.children;
  }
}

function NestedFieldsetFixture() {
  const [outerDisabled, setOuterDisabled] = useState(false);
  const [innerDisabled, setInnerDisabled] = useState(true);

  return (
    <>
      <Fieldset.Root disabled={outerDisabled}>
        <Fieldset.Legend>바깥 그룹</Fieldset.Legend>
        <Fieldset.Root disabled={innerDisabled}>
          <Fieldset.Legend>안쪽 그룹</Fieldset.Legend>
          <Field.Root data-testid="field">
            <Field.Label>이름</Field.Label>
            <Input data-testid="input" />
          </Field.Root>
        </Fieldset.Root>
      </Fieldset.Root>
      <button type="button" onClick={() => setOuterDisabled(true)}>
        바깥 비활성화
      </button>
      <button type="button" onClick={() => setInnerDisabled(false)}>
        안쪽 활성화
      </button>
      <button type="button" onClick={() => setOuterDisabled(false)}>
        바깥 활성화
      </button>
    </>
  );
}

describe("Fieldset", () => {
  describe("구조", () => {
    it("네이티브 fieldset과 legend 및 전달한 Props를 렌더링한다", () => {
      const rootRef = createRef<HTMLFieldSetElement>();
      const legendRef = createRef<HTMLLegendElement>();
      const container = render(
        <>
          <form id="profile-form" />
          <Fieldset.Root ref={rootRef} name="profile" form="profile-form">
            <Fieldset.Legend ref={legendRef}>프로필</Fieldset.Legend>
          </Fieldset.Root>
        </>,
      );
      const fieldset = container.querySelector("fieldset");
      const legend = container.querySelector("legend");

      expect(rootRef.current).toBe(fieldset);
      expect(legendRef.current).toBe(legend);
      expect(fieldset?.name).toBe("profile");
      expect(fieldset?.form?.id).toBe("profile-form");
      expect(fieldset?.firstElementChild).toBe(legend);
      expect(legend?.textContent).toBe("프로필");
    });

    it("Legend 없이 네이티브 ARIA 이름을 전달할 수 있다", () => {
      const container = render(
        <>
          <h2 id="notification-heading">알림 설정</h2>
          <Fieldset.Root aria-label="연락 방법" data-testid="label-fieldset" />
          <Fieldset.Root aria-labelledby="notification-heading" data-testid="labelledby-fieldset" />
        </>,
      );
      const labelFieldset = container.querySelector<HTMLFieldSetElement>(
        '[data-testid="label-fieldset"]',
      );
      const labelledByFieldset = container.querySelector<HTMLFieldSetElement>(
        '[data-testid="labelledby-fieldset"]',
      );

      expect(labelFieldset?.getAttribute("aria-label")).toBe("연락 방법");
      expect(labelledByFieldset?.getAttribute("aria-labelledby")).toBe("notification-heading");
    });

    it("Legend를 Root 밖에서 사용하면 사용법을 설명하는 오류를 던진다", () => {
      const error = vi.spyOn(console, "error").mockImplementation(() => {});

      try {
        const container = render(
          <TestErrorBoundary>
            <Fieldset.Legend>그룹</Fieldset.Legend>
          </TestErrorBoundary>,
        );

        expect(container.textContent).toBe("Fieldset.Legend must be used within Fieldset.Root.");
      } finally {
        error.mockRestore();
      }
    });
  });

  describe("Disabled", () => {
    it("Root와 Legend에 유효한 Disabled 상태를 제공한다", () => {
      const container = render(
        <Fieldset.Root disabled data-disabled="사용자 값">
          <Fieldset.Legend data-disabled="사용자 값">계정</Fieldset.Legend>
        </Fieldset.Root>,
      );
      const fieldset = container.querySelector("fieldset");
      const legend = container.querySelector("legend");

      expect(fieldset?.disabled).toBe(true);
      expect(fieldset?.getAttribute("data-disabled")).toBe("");
      expect(legend?.getAttribute("data-disabled")).toBe("");
    });

    it("활성 상태에서는 사용자가 전달한 data-disabled를 제거한다", () => {
      const container = render(
        <Fieldset.Root data-disabled="사용자 값">
          <Fieldset.Legend data-disabled="사용자 값">계정</Fieldset.Legend>
        </Fieldset.Root>,
      );
      const fieldset = container.querySelector("fieldset");
      const legend = container.querySelector("legend");

      expect(fieldset?.hasAttribute("data-disabled")).toBe(false);
      expect(legend?.hasAttribute("data-disabled")).toBe(false);
    });

    it("Field와 기존 Input에 Disabled 상태를 전달한다", () => {
      const container = render(
        <Fieldset.Root disabled>
          <Fieldset.Legend>프로필</Fieldset.Legend>
          <Field.Root disabled={false}>
            <Field.Label>이름</Field.Label>
            <Input />
          </Field.Root>
        </Fieldset.Root>,
      );
      const field = container.querySelector("div");
      const label = container.querySelector("label");
      const input = container.querySelector("input");

      expect(field?.hasAttribute("data-disabled")).toBe(true);
      expect(label?.hasAttribute("data-disabled")).toBe(true);
      expect(input?.disabled).toBe(true);
      expect(input?.hasAttribute("data-disabled")).toBe(true);
    });

    it("활성 Fieldset 안에서는 Field 자체의 Disabled 상태를 유지한다", () => {
      const container = render(
        <Fieldset.Root>
          <Fieldset.Legend>프로필</Fieldset.Legend>
          <Field.Root disabled>
            <Input />
          </Field.Root>
        </Fieldset.Root>,
      );
      const input = container.querySelector("input");

      expect(input?.disabled).toBe(true);
    });

    it("중첩된 Fieldset의 Disabled 상태를 조상부터 누적한다", async () => {
      const container = render(<NestedFieldsetFixture />);
      const field = container.querySelector<HTMLElement>('[data-testid="field"]');
      const input = container.querySelector<HTMLInputElement>('[data-testid="input"]');
      const [disableOuter, enableInner, enableOuter] = container.querySelectorAll("button");

      if (!disableOuter || !enableInner || !enableOuter) {
        throw new Error("Fieldset 테스트 구성이 완전하지 않습니다.");
      }

      expect(field?.hasAttribute("data-disabled")).toBe(true);
      expect(input?.disabled).toBe(true);

      await userEvent.click(disableOuter);
      await userEvent.click(enableInner);

      expect(field?.hasAttribute("data-disabled")).toBe(true);
      expect(input?.disabled).toBe(true);

      await userEvent.click(enableOuter);

      expect(field?.hasAttribute("data-disabled")).toBe(false);
      expect(input?.disabled).toBe(false);
    });

    it("Fieldset 밖의 Field 동작을 변경하지 않는다", () => {
      const container = render(
        <Field.Root>
          <Input />
        </Field.Root>,
      );
      const input = container.querySelector("input");

      expect(input?.disabled).toBe(false);
      expect(input?.hasAttribute("data-disabled")).toBe(false);
    });
  });

  describe("접근성", () => {
    it("지원하는 이름 제공 방식에 자동 감지 가능한 접근성 위반이 없다", async () => {
      const container = render(
        <form>
          <Fieldset.Root>
            <Fieldset.Legend>연락 방법</Fieldset.Legend>
            <Input aria-label="이메일" />
          </Fieldset.Root>
          <Fieldset.Root aria-label="알림 설정">
            <Input aria-label="알림 이메일" />
          </Fieldset.Root>
          <h2 id="security-heading">보안 설정</h2>
          <Fieldset.Root aria-labelledby="security-heading">
            <Input aria-label="복구 이메일" />
          </Fieldset.Root>
        </form>,
      );
      const results = await axe.run(container);

      expect(results.violations).toEqual([]);
    });
  });

  describe("키보드와 Form", () => {
    it.skip("Control의 입력과 Form 동작을 네이티브 fieldset에 맡긴다", () => {
      // Coral은 Fieldset의 키보드나 Form 동작을 다시 구현하지 않으므로 브라우저가 이 동작을 소유한다.
    });
  });
});

import axe from "axe-core";
import { createRef, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it } from "vitest";
import { userEvent } from "vitest/browser";

import { Field } from "../field/index";
import { Input } from "./index";

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

describe("Input", () => {
  describe("구조", () => {
    it("네이티브 input과 폼 속성을 렌더링한다", () => {
      const container = render(
        <Input
          type="email"
          name="email"
          autoComplete="email"
          required
          defaultValue="user@example.com"
        />,
      );
      const input = container.querySelector("input");

      expect(input?.type).toBe("email");
      expect(input?.name).toBe("email");
      expect(input?.autocomplete).toBe("email");
      expect(input?.required).toBe(true);
      expect(input?.value).toBe("user@example.com");
    });

    it("ref를 실제 input 요소에 연결한다", () => {
      const ref = createRef<HTMLInputElement>();
      const container = render(<Input ref={ref} />);

      expect(ref.current).toBe(container.querySelector("input"));
    });

    it("render input에 Props를 합성한다", async () => {
      const calls: string[] = [];
      const container = render(
        <Input
          render={<input name="render" className="render" onChange={() => calls.push("render")} />}
          name="part"
          className="part"
          onChange={() => calls.push("part")}
        />,
      );
      const input = container.querySelector("input");

      if (!input) {
        throw new Error("Input 테스트 구성이 완전하지 않습니다.");
      }

      await userEvent.type(input, "값");

      expect(input.name).toBe("part");
      expect(input.className).toBe("render part");
      expect(input.value).toBe("값");
      expect(calls).toEqual(["render", "part"]);
    });

    it("Field 안에서 label과 description에 자동으로 연결된다", () => {
      const container = render(
        <Field.Root name="email">
          <Field.Label>이메일</Field.Label>
          <Input />
          <Field.Description>업무용 주소를 입력해 주세요.</Field.Description>
        </Field.Root>,
      );
      const label = container.querySelector("label");
      const input = container.querySelector("input");
      const description = container.querySelector("p");

      expect(label?.htmlFor).toBe(input?.id);
      expect(input?.name).toBe("email");
      expect(input?.getAttribute("aria-describedby")).toBe(description?.id);
    });
  });

  describe("상태", () => {
    it("disabled를 네이티브 상태와 data 속성에 함께 반영한다", () => {
      const container = render(
        <>
          <Input disabled aria-label="비활성 입력" />
          <Input aria-label="활성 입력" />
        </>,
      );
      const [disabledInput, enabledInput] = container.querySelectorAll("input");

      expect(disabledInput?.disabled).toBe(true);
      expect(disabledInput?.hasAttribute("data-disabled")).toBe(true);
      expect(enabledInput?.disabled).toBe(false);
      expect(enabledInput?.hasAttribute("data-disabled")).toBe(false);
    });
  });

  describe("키보드와 폼", () => {
    it.skip("입력, 선택과 제출 동작을 네이티브 input과 form에 맡긴다", () => {
      // Coral은 키 입력, Selection이나 Form 제출을 별도로 처리하지 않으므로 이 동작은 브라우저가 소유한다.
    });
  });

  describe("접근성", () => {
    it("label과 연결한 입력에 자동 감지 가능한 접근성 위반이 없다", async () => {
      const container = render(
        <form>
          <label htmlFor="email">이메일</label>
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </form>,
      );
      const results = await axe.run(container);

      expect(results.violations).toEqual([]);
    });
  });
});

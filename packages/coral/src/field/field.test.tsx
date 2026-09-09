import axe from "axe-core";
import { createRef, type ReactNode, useState } from "react";
import { flushSync } from "react-dom";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import { userEvent } from "vitest/browser";

import { Field } from "./index";

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

function DescriptionFixture() {
  const [visible, setVisible] = useState(true);

  return (
    <Field.Root>
      <Field.Control />
      {visible ? <Field.Description id="temporary-description">임시 설명</Field.Description> : null}
      <button type="button" onClick={() => setVisible(false)}>
        설명 제거
      </button>
    </Field.Root>
  );
}

function ControlFixture() {
  const [controlId, setControlId] = useState("before-control");

  return (
    <Field.Root>
      <Field.Label>사용자 이름</Field.Label>
      <Field.Control id={controlId} />
      <button type="button" onClick={() => setControlId("after-control")}>
        ID 변경
      </button>
    </Field.Root>
  );
}

describe("Field", () => {
  describe("구조", () => {
    it("label, control과 description을 안정적인 ID로 연결한다", () => {
      const container = render(
        <Field.Root id="username-field" name="username">
          <Field.Label>사용자 이름</Field.Label>
          <Field.Control />
          <Field.Description>3자 이상 입력해 주세요.</Field.Description>
        </Field.Root>,
      );
      const root = container.querySelector<HTMLElement>("#username-field");
      const label = container.querySelector("label");
      const control = container.querySelector("input");
      const description = container.querySelector("p");

      expect(root).not.toBeNull();
      expect(label?.id).toBe("username-field-label");
      expect(control?.id).toBe("username-field-control");
      expect(control?.name).toBe("username");
      expect(label?.htmlFor).toBe(control?.id);
      expect(control?.getAttribute("aria-describedby")).toBe(description?.id);
      expect(description?.id).toMatch(/-field-description$/);
    });

    it("각 Part에 전달한 ID를 접근성 관계에 사용한다", () => {
      const container = render(
        <Field.Root id="profile-field" invalid>
          <Field.Label id="profile-label">프로필 이름</Field.Label>
          <Field.Control id="profile-control" />
          <Field.Description id="profile-description">공개 프로필에 표시됩니다.</Field.Description>
          <Field.Error id="profile-error">사용할 수 없는 이름입니다.</Field.Error>
        </Field.Root>,
      );
      const root = container.querySelector<HTMLElement>("#profile-field");
      const label = container.querySelector<HTMLLabelElement>("#profile-label");
      const control = container.querySelector<HTMLInputElement>("#profile-control");
      const description = container.querySelector<HTMLElement>("#profile-description");
      const error = container.querySelector<HTMLElement>("#profile-error");

      expect(root).not.toBeNull();
      expect(label?.htmlFor).toBe(control?.id);
      expect(control?.getAttribute("aria-describedby")?.split(" ")).toEqual([
        description?.id,
        error?.id,
      ]);
    });

    it("Root의 name과 disabled가 Control의 값보다 우선한다", () => {
      const container = render(
        <Field.Root name="root-name" disabled>
          <Field.Control name="control-name" />
        </Field.Root>,
      );
      const root = container.firstElementChild;
      const control = container.querySelector("input");

      expect(control?.name).toBe("root-name");
      expect(control?.disabled).toBe(true);
      expect(root?.hasAttribute("data-disabled")).toBe(true);
      expect(control?.hasAttribute("data-disabled")).toBe(true);
    });

    it("각 Part의 ref와 render 요소에 Props를 합성한다", async () => {
      const calls: string[] = [];
      const rootRef = createRef<HTMLDivElement>();
      const labelRef = createRef<HTMLLabelElement>();
      const controlRef = createRef<HTMLInputElement>();
      const descriptionRef = createRef<HTMLParagraphElement>();
      const container = render(
        <Field.Root
          ref={rootRef}
          id="render-field"
          render={<div className="root-render" />}
          className="root-part"
        >
          <Field.Label ref={labelRef} render={<label className="label-render" />}>
            이름
          </Field.Label>
          <Field.Control
            ref={controlRef}
            render={<input id="render-control" onChange={() => calls.push("render")} />}
            onChange={() => calls.push("part")}
          />
          <Field.Description ref={descriptionRef}>설명</Field.Description>
        </Field.Root>,
      );
      const control = container.querySelector("input");

      if (!control) {
        throw new Error("Field 테스트 구성이 완전하지 않습니다.");
      }

      await userEvent.type(control, "값");

      expect(rootRef.current?.className).toBe("root-render root-part");
      expect(labelRef.current?.htmlFor).toBe("render-field-control");
      expect(controlRef.current?.id).toBe("render-field-control");
      expect(descriptionRef.current?.id).toMatch(/-field-description$/);
      expect(calls).toEqual(["render", "part"]);
    });
  });

  describe("상태", () => {
    it("입력과 Focus 상태를 모든 Part에 공유한다", async () => {
      const container = render(
        <Field.Root>
          <Field.Label>이름</Field.Label>
          <Field.Control />
          <Field.Description>설명</Field.Description>
        </Field.Root>,
      );
      const root = container.firstElementChild as HTMLElement;
      const control = container.querySelector("input");

      if (!control) {
        throw new Error("Field 테스트 구성이 완전하지 않습니다.");
      }

      await userEvent.click(control);
      expect(root.hasAttribute("data-focused")).toBe(true);
      expect(control.hasAttribute("data-focused")).toBe(true);

      await userEvent.type(control, "값");
      expect(root.hasAttribute("data-filled")).toBe(true);
      expect(root.hasAttribute("data-dirty")).toBe(true);

      await userEvent.tab();
      expect(root.hasAttribute("data-focused")).toBe(false);
      expect(root.hasAttribute("data-touched")).toBe(true);
    });

    it("외부 Form library가 전달한 상태를 표현한다", () => {
      const container = render(
        <Field.Root invalid touched dirty>
          <Field.Label>이름</Field.Label>
          <Field.Control />
          <Field.Error match>외부 오류</Field.Error>
        </Field.Root>,
      );
      const root = container.firstElementChild;
      const control = container.querySelector("input");
      const error = container.querySelector("[id$='-field-error']");

      expect(root?.hasAttribute("data-invalid")).toBe(true);
      expect(root?.hasAttribute("data-touched")).toBe(true);
      expect(root?.hasAttribute("data-dirty")).toBe(true);
      expect(control?.getAttribute("aria-invalid")).toBe("true");
      expect(control?.getAttribute("aria-describedby")?.split(" ")).toContain(error?.id);
      expect(error?.textContent).toBe("외부 오류");
    });
  });

  describe("검증", () => {
    it("validate가 없으면 외부 Form library의 제출에 개입하지 않는다", async () => {
      const onSubmit = vi.fn();
      const container = render(
        <form
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
        >
          <Field.Root name="email" invalid touched dirty>
            <Field.Label>이메일</Field.Label>
            <Field.Control type="email" required />
            <Field.Error match>외부 검증 오류</Field.Error>
          </Field.Root>
          <button type="submit">제출</button>
        </form>,
      );
      const control = container.querySelector("input");
      const button = container.querySelector("button");
      const error = container.querySelector("[id$='-field-error']");

      if (!control || !button || !error) {
        throw new Error("Field 테스트 구성이 완전하지 않습니다.");
      }

      await userEvent.click(button);

      expect(onSubmit).toHaveBeenCalledOnce();
      expect(control.getAttribute("aria-invalid")).toBe("true");
      expect(control.getAttribute("aria-describedby")?.split(" ")).toContain(error.id);
    });

    it("native constraint 오류를 표시하고 제출을 막는다", async () => {
      const onSubmit = vi.fn();
      const container = render(
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
        >
          <Field.Root name="email">
            <Field.Label>이메일</Field.Label>
            <Field.Control type="email" required />
            <Field.Error />
          </Field.Root>
          <button type="submit">제출</button>
        </form>,
      );
      const control = container.querySelector("input");
      const button = container.querySelector("button");

      if (!control || !button) {
        throw new Error("Field 테스트 구성이 완전하지 않습니다.");
      }

      await userEvent.click(button);

      expect(onSubmit).not.toHaveBeenCalled();
      expect(control.getAttribute("aria-invalid")).toBe("true");
      expect(container.querySelector("[id$='-field-error']")?.textContent).toBe(
        control.validationMessage,
      );
    });

    it("onBlur에서 native 검증 뒤 custom validator를 실행한다", async () => {
      const validate = vi.fn((value: unknown) =>
        value === "admin" ? "사용할 수 없는 이름입니다." : null,
      );
      const container = render(
        <form>
          <Field.Root name="username" validationMode="onBlur" validate={validate}>
            <Field.Label>사용자 이름</Field.Label>
            <Field.Control />
            <Field.Error />
          </Field.Root>
          <button type="button">다음</button>
        </form>,
      );
      const control = container.querySelector("input");
      const button = container.querySelector("button");

      if (!control || !button) {
        throw new Error("Field 테스트 구성이 완전하지 않습니다.");
      }

      await userEvent.type(control, "admin");
      await userEvent.click(button);

      expect(validate).toHaveBeenCalledWith("admin", { username: "admin" });
      expect(control.getAttribute("aria-invalid")).toBe("true");
      expect(container.querySelector("[id$='-field-error']")?.textContent).toBe(
        "사용할 수 없는 이름입니다.",
      );
    });

    it("onChange 검증을 지정한 시간만큼 debounce한다", async () => {
      const validate = vi.fn(() => null);
      const container = render(
        <Field.Root validationMode="onChange" validationDebounceTime={30} validate={validate}>
          <Field.Label>검색어</Field.Label>
          <Field.Control />
        </Field.Root>,
      );
      const control = container.querySelector("input");

      if (!control) {
        throw new Error("Field 테스트 구성이 완전하지 않습니다.");
      }

      await userEvent.type(control, "abc");
      expect(validate).not.toHaveBeenCalled();

      await vi.waitFor(() => expect(validate).toHaveBeenCalledTimes(1));
      expect(validate).toHaveBeenCalledWith("abc", {});
    });

    it("onSubmit custom 오류로 제출을 막고 첫 오류 Control에 Focus한다", async () => {
      const onSubmit = vi.fn();
      const container = render(
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
        >
          <Field.Root name="first" validate={() => "첫 번째 오류"}>
            <Field.Label>첫 번째</Field.Label>
            <Field.Control />
            <Field.Error />
          </Field.Root>
          <Field.Root name="second" validate={() => "두 번째 오류"}>
            <Field.Label>두 번째</Field.Label>
            <Field.Control />
            <Field.Error />
          </Field.Root>
          <button type="submit">제출</button>
        </form>,
      );
      const controls = container.querySelectorAll("input");
      const button = container.querySelector("button");

      if (!button) {
        throw new Error("Field 테스트 구성이 완전하지 않습니다.");
      }

      await userEvent.click(button);
      await vi.waitFor(() => expect(document.activeElement).toBe(controls[0]));

      expect(onSubmit).not.toHaveBeenCalled();
      expect(container.textContent).toContain("첫 번째 오류");
      expect(container.textContent).toContain("두 번째 오류");
    });

    it("비동기 custom 검증을 통과한 뒤 제출을 재개한다", async () => {
      const onSubmit = vi.fn();
      const validate = vi.fn(async () => null);
      const container = render(
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
        >
          <Field.Root name="username" validate={validate}>
            <Field.Label>사용자 이름</Field.Label>
            <Field.Control defaultValue="coral" />
            <Field.Error />
          </Field.Root>
          <button type="submit">제출</button>
        </form>,
      );
      const button = container.querySelector("button");

      if (!button) {
        throw new Error("Field 테스트 구성이 완전하지 않습니다.");
      }

      await userEvent.click(button);
      await vi.waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));

      expect(validate).toHaveBeenCalledTimes(1);
    });
  });

  describe("키보드와 폼", () => {
    it.skip("입력과 native constraint keyboard 동작을 브라우저에 맡긴다", () => {
      // Coral은 네이티브 Control의 키 입력과 Selection을 다시 구현하지 않는다.
    });
  });

  describe("접근성", () => {
    it("설명과 오류가 연결된 Field에 자동 감지 가능한 접근성 위반이 없다", async () => {
      const container = render(
        <Field.Root validationMode="onBlur" validate={() => "사용할 수 없는 이름입니다."}>
          <Field.Label>사용자 이름</Field.Label>
          <Field.Control defaultValue="admin" />
          <Field.Description>공개 프로필에 표시됩니다.</Field.Description>
          <Field.Error />
        </Field.Root>,
      );
      const control = container.querySelector("input");

      if (!control) {
        throw new Error("Field 테스트 구성이 완전하지 않습니다.");
      }

      control.focus();
      await userEvent.tab();
      const results = await axe.run(container);

      expect(results.violations).toEqual([]);
    });
  });

  describe("Field.Error", () => {
    it("match를 생략하면 Field의 invalid 상태를 따른다", () => {
      const container = render(
        <Field.Root invalid>
          <Field.Control />
          <Field.Error>입력값을 확인해 주세요.</Field.Error>
        </Field.Root>,
      );
      const control = container.querySelector("input");
      const error = container.querySelector("[id$='-field-error']");

      expect(error?.textContent).toBe("입력값을 확인해 주세요.");
      expect(control?.getAttribute("aria-describedby")?.split(" ")).toContain(error?.id);
    });

    it("boolean match로 표시 여부를 직접 제어한다", () => {
      const container = render(
        <Field.Root invalid>
          <Field.Control />
          <Field.Error match={true}>표시되는 오류</Field.Error>
          <Field.Error match={false}>숨겨지는 오류</Field.Error>
        </Field.Root>,
      );
      const control = container.querySelector("input");
      const error = container.querySelector("[id$='-field-error']");

      expect(container.textContent).toContain("표시되는 오류");
      expect(container.textContent).not.toContain("숨겨지는 오류");
      expect(control?.getAttribute("aria-describedby")?.split(" ")).toEqual([error?.id]);
    });

    it("native ValidityState와 일치하는 오류만 표시하고 Control에 연결한다", async () => {
      const container = render(
        <>
          <Field.Root validationMode="onBlur">
            <Field.Control type="email" required />
            <Field.Error match="valueMissing">이메일을 입력해 주세요.</Field.Error>
            <Field.Error match="typeMismatch">이메일 형식이 올바르지 않습니다.</Field.Error>
          </Field.Root>
          <button type="button">다음</button>
        </>,
      );
      const control = container.querySelector("input");
      const button = container.querySelector("button");

      if (!control || !button) {
        throw new Error("Field 테스트 구성이 완전하지 않습니다.");
      }

      await userEvent.click(control);
      await userEvent.click(button);

      const valueMissingError = container.querySelector<HTMLElement>("[id$='-field-error']");

      expect(valueMissingError?.textContent).toBe("이메일을 입력해 주세요.");
      expect(control.getAttribute("aria-describedby")?.split(" ")).toEqual([valueMissingError?.id]);

      await userEvent.type(control, "invalid-email");
      await userEvent.click(button);

      const typeMismatchError = container.querySelector<HTMLElement>("[id$='-field-error']");

      expect(typeMismatchError?.textContent).toBe("이메일 형식이 올바르지 않습니다.");
      expect(control.getAttribute("aria-describedby")?.split(" ")).toEqual([typeMismatchError?.id]);
    });

    it("customError는 validate 메시지를 사용하고 children이 있으면 대체한다", async () => {
      const container = render(
        <>
          <Field.Root
            validationMode="onBlur"
            validate={() => ["8자 이상 입력해 주세요.", "숫자를 포함해 주세요."]}
          >
            <Field.Control defaultValue="coral" />
            <Field.Error match="customError" data-error="generated" />
            <Field.Error match="customError" data-error="custom">
              안전한 비밀번호를 입력해 주세요.
            </Field.Error>
          </Field.Root>
          <button type="button">다음</button>
        </>,
      );
      const control = container.querySelector("input");
      const button = container.querySelector("button");

      if (!control || !button) {
        throw new Error("Field 테스트 구성이 완전하지 않습니다.");
      }

      await userEvent.click(control);
      await userEvent.click(button);

      expect(container.querySelector("[data-error='generated']")?.textContent).toBe(
        "8자 이상 입력해 주세요. 숫자를 포함해 주세요.",
      );
      expect(container.querySelector("[data-error='custom']")?.textContent).toBe(
        "안전한 비밀번호를 입력해 주세요.",
      );
    });

    it("render로 오류 요소를 교체하면서 접근성 연결을 유지한다", () => {
      const container = render(
        <Field.Root invalid>
          <Field.Control />
          <Field.Error render={<aside data-custom-error="" />}>오류 메시지</Field.Error>
        </Field.Root>,
      );
      const control = container.querySelector("input");
      const error = container.querySelector<HTMLElement>("aside[data-custom-error]");

      expect(error?.textContent).toBe("오류 메시지");
      expect(error?.hasAttribute("data-invalid")).toBe(true);
      expect(control?.getAttribute("aria-describedby")?.split(" ")).toContain(error?.id);
    });
  });

  describe("Field.Label", () => {
    it("실제 Control을 참조하고 클릭하면 Control에 Focus한다", async () => {
      const container = render(
        <Field.Root>
          <Field.Label id="username-label">사용자 이름</Field.Label>
          <Field.Control id="username-control" />
        </Field.Root>,
      );
      const label = container.querySelector("label");
      const control = container.querySelector("input");

      if (!label || !control) {
        throw new Error("Field.Label 테스트 구성이 완전하지 않습니다.");
      }

      expect(label.id).toBe("username-label");
      expect(label.htmlFor).toBe(control.id);

      await userEvent.click(label);

      expect(document.activeElement).toBe(control);
    });

    it("Field 상태를 data 속성으로 표현한다", () => {
      const container = render(
        <Field.Root disabled invalid touched dirty>
          <Field.Label>사용자 이름</Field.Label>
          <Field.Control />
        </Field.Root>,
      );
      const label = container.querySelector("label");

      expect(label?.hasAttribute("data-disabled")).toBe(true);
      expect(label?.hasAttribute("data-invalid")).toBe(true);
      expect(label?.hasAttribute("data-touched")).toBe(true);
      expect(label?.hasAttribute("data-dirty")).toBe(true);
    });
  });

  describe("Field.Description", () => {
    it("렌더링된 Description의 ID를 Control에 등록한다", () => {
      const container = render(
        <Field.Root>
          <Field.Control aria-describedby="external-description" />
          <Field.Description id="first-description">첫 번째 설명</Field.Description>
          <Field.Description id="second-description">두 번째 설명</Field.Description>
        </Field.Root>,
      );
      const control = container.querySelector("input");

      expect(control?.getAttribute("aria-describedby")?.split(" ")).toEqual([
        "external-description",
        "first-description",
        "second-description",
      ]);
    });

    it("Unmount되면 Control의 aria-describedby에서 ID를 제거한다", async () => {
      const container = render(<DescriptionFixture />);
      const control = container.querySelector("input");
      const button = container.querySelector("button");

      if (!control || !button) {
        throw new Error("Field.Description 테스트 구성이 완전하지 않습니다.");
      }

      expect(control.getAttribute("aria-describedby")).toBe("temporary-description");

      await userEvent.click(button);

      expect(control.hasAttribute("aria-describedby")).toBe(false);
    });
  });

  describe("Field.Control", () => {
    it("ID가 바뀌면 Label의 htmlFor를 동기화한다", async () => {
      const container = render(<ControlFixture />);
      const label = container.querySelector("label");
      const control = container.querySelector("input");
      const button = container.querySelector("button");

      if (!label || !control || !button) {
        throw new Error("Field.Control 테스트 구성이 완전하지 않습니다.");
      }

      expect(label.htmlFor).toBe("before-control");

      await userEvent.click(button);

      expect(control.id).toBe("after-control");
      expect(label.htmlFor).toBe(control.id);
    });

    it("외부와 Field가 제공한 설명 및 오류 ID를 함께 참조한다", () => {
      const container = render(
        <Field.Root invalid>
          <Field.Control aria-describedby="external-description" />
          <Field.Description id="field-description">도움말</Field.Description>
          <Field.Error id="field-error">오류 메시지</Field.Error>
        </Field.Root>,
      );
      const control = container.querySelector("input");

      expect(control?.getAttribute("aria-describedby")?.split(" ")).toEqual([
        "external-description",
        "field-description",
        "field-error",
      ]);
    });
  });
});

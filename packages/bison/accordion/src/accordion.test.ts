import type { NormalizeProps } from "@bison/core";
import { describe, expectTypeOf, it } from "vitest";

import type { AccordionApi, AccordionProps } from "./accordion.js";

describe("Accordion", () => {
  describe("상태 전이", () => {
    it("multiple에 따라 value의 형태를 제한한다", () => {
      type SingleProps = Extract<AccordionProps, { multiple?: false }>;
      type MultipleProps = Extract<AccordionProps, { multiple: true }>;
      type SingleChangeValue = Parameters<NonNullable<SingleProps["onValueChange"]>>[0]["value"];
      type MultipleChangeValue = Parameters<
        NonNullable<MultipleProps["onValueChange"]>
      >[0]["value"];

      expectTypeOf<SingleProps["value"]>().toEqualTypeOf<string | null | undefined>();
      expectTypeOf<MultipleProps["value"]>().toEqualTypeOf<string[] | undefined>();
      expectTypeOf<SingleChangeValue>().toEqualTypeOf<string | null>();
      expectTypeOf<MultipleChangeValue>().toEqualTypeOf<string[]>();
      expectTypeOf<AccordionApi<false>["value"]>().toEqualTypeOf<string | null>();
      expectTypeOf<AccordionApi<true>["value"]>().toEqualTypeOf<string[]>();
      expectTypeOf<Parameters<AccordionApi<false>["setValue"]>[0]>().toEqualTypeOf<string | null>();
      expectTypeOf<Parameters<AccordionApi<true>["setValue"]>[0]>().toEqualTypeOf<string[]>();
    });

    it("접힌 헤더를 활성화하면 연결된 패널을 펼친다");
    it("접을 수 있는 펼쳐진 헤더를 활성화하면 연결된 패널을 접는다");
    it("여러 패널을 펼칠 수 있으면 다른 패널을 펼친 상태로 유지한다");
    it("하나의 패널만 펼칠 수 있으면 기존 패널을 접는다");
    it("패널을 접을 수 없으면 펼친 상태를 유지한다");
  });

  describe("키보드 상호작용", () => {
    it("접힌 패널의 헤더에서 Enter를 누르면 패널을 펼친다");
    it("접힌 패널의 헤더에서 Space를 누르면 패널을 펼친다");
    it("접을 수 있는 펼친 패널의 헤더에서 Enter를 누르면 패널을 접는다");
    it("접을 수 있는 펼친 패널의 헤더에서 Space를 누르면 패널을 접는다");
    it("Tab을 누르면 다음 초점 가능한 요소로 초점을 옮긴다");
    it("Shift+Tab을 누르면 이전 초점 가능한 요소로 초점을 옮긴다");
    it("아코디언 안의 모든 초점 가능한 요소를 페이지 Tab 순서에 포함한다");
  });

  describe("접근성", () => {
    it("프레임워크별 요소 props 타입을 유지한다", () => {
      interface FrameworkProps {
        element: { element: true };
        button: { button: true };
      }

      type Normalizer = NormalizeProps<FrameworkProps>;

      expectTypeOf<ReturnType<Normalizer["element"]>>().toEqualTypeOf<FrameworkProps["element"]>();
      expectTypeOf<ReturnType<Normalizer["button"]>>().toEqualTypeOf<FrameworkProps["button"]>();
    });

    it("각 아코디언 헤더의 제목을 버튼으로 노출한다");
    it("각 헤더 버튼을 문서 구조에 알맞은 단계의 제목으로 감싼다");
    it("헤더 버튼만 제목 안에 둔다");
    it("제어하는 패널이 보이면 aria-expanded를 true로 설정한다");
    it("제어하는 패널이 숨겨지면 aria-expanded를 false로 설정한다");
    it("aria-controls가 제어하는 패널의 ID를 가리킨다");
    it("펼친 패널을 접을 수 없으면 aria-disabled를 true로 설정한다");
    it("영역 의미를 사용하면 패널을 region으로 노출한다");
    it("aria-labelledby가 패널을 제어하는 버튼을 가리킨다");
  });
});

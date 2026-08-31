import type * as React from "react";
import { describe, expectTypeOf, it } from "vitest";

import { Accordion } from "./index";
import type {
  AccordionChangeEventDetails,
  AccordionItemProps,
  AccordionPanelProps,
  AccordionTriggerProps,
} from "./index";

describe("Accordion 타입", () => {
  it("제어 값과 비제어 값에 문자열 배열을 사용한다", () => {
    type RootProps = React.ComponentProps<typeof Accordion.Root>;
    type ChangeValue = Parameters<NonNullable<RootProps["onValueChange"]>>[0];

    expectTypeOf<RootProps["value"]>().toEqualTypeOf<readonly string[] | undefined>();
    expectTypeOf<RootProps["defaultValue"]>().toEqualTypeOf<readonly string[] | undefined>();
    expectTypeOf<ChangeValue>().toEqualTypeOf<string[]>();
  });

  it("값 변경의 원인과 네이티브 이벤트를 제공한다", () => {
    expectTypeOf<AccordionChangeEventDetails["reason"]>().toEqualTypeOf<"trigger-press">();
    expectTypeOf<AccordionChangeEventDetails["event"]>().toEqualTypeOf<MouseEvent>();
    expectTypeOf<AccordionChangeEventDetails["trigger"]>().toEqualTypeOf<HTMLButtonElement>();
  });

  it("Item 값과 상태 연결 속성은 컴포넌트가 소유한다", () => {
    expectTypeOf<AccordionItemProps>().toExtend<{ value: string }>();
    expectTypeOf<"aria-controls">().not.toExtend<keyof AccordionTriggerProps>();
    expectTypeOf<"aria-expanded">().not.toExtend<keyof AccordionTriggerProps>();
    expectTypeOf<"aria-labelledby">().not.toExtend<keyof AccordionPanelProps>();
    expectTypeOf<"hidden">().not.toExtend<keyof AccordionPanelProps>();
    expectTypeOf<"role">().not.toExtend<keyof AccordionPanelProps>();
  });

  it("Trigger의 기본 type을 오버라이드할 수 있다", () => {
    expectTypeOf<"type">().toExtend<keyof AccordionTriggerProps>();
  });

  it("각 Part가 ref를 일반 prop으로 받는다", () => {
    expectTypeOf<React.ComponentProps<typeof Accordion.Root>["ref"]>().toEqualTypeOf<
      React.Ref<HTMLDivElement> | undefined
    >();
    expectTypeOf<React.ComponentProps<typeof Accordion.Item>["ref"]>().toEqualTypeOf<
      React.Ref<HTMLDivElement> | undefined
    >();
    expectTypeOf<React.ComponentProps<typeof Accordion.Header>["ref"]>().toEqualTypeOf<
      React.Ref<HTMLHeadingElement> | undefined
    >();
    expectTypeOf<React.ComponentProps<typeof Accordion.Trigger>["ref"]>().toEqualTypeOf<
      React.Ref<HTMLButtonElement> | undefined
    >();
    expectTypeOf<React.ComponentProps<typeof Accordion.Panel>["ref"]>().toEqualTypeOf<
      React.Ref<HTMLDivElement> | undefined
    >();
  });

  it("각 Part가 React 요소를 render로 받는다", () => {
    type Render = React.ReactElement | undefined;

    expectTypeOf<React.ComponentProps<typeof Accordion.Root>["render"]>().toEqualTypeOf<Render>();
    expectTypeOf<React.ComponentProps<typeof Accordion.Item>["render"]>().toEqualTypeOf<Render>();
    expectTypeOf<React.ComponentProps<typeof Accordion.Header>["render"]>().toEqualTypeOf<Render>();
    expectTypeOf<
      React.ComponentProps<typeof Accordion.Trigger>["render"]
    >().toEqualTypeOf<Render>();
    expectTypeOf<React.ComponentProps<typeof Accordion.Panel>["render"]>().toEqualTypeOf<Render>();
  });
});

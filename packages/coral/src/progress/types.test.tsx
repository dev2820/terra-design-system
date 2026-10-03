import type * as React from "react";
import { describe, expectTypeOf, it } from "vitest";

import { Progress } from "./index";
import type { ProgressRootProps, ProgressValueProps } from "./index";

describe("Progress 타입", () => {
  it("생략한 value는 허용하고 null은 허용하지 않는다", () => {
    <Progress.Root />;
    <Progress.Root value={0} />;

    // @ts-expect-error null은 불확정 상태를 뜻하지 않는다.
    <Progress.Root value={null} />;
  });

  it("format은 실제 숫자를 받아 문자열을 반환하는 함수다", () => {
    expectTypeOf<ProgressRootProps["format"]>().toEqualTypeOf<
      ((value: number) => string) | undefined
    >();

    <Progress.Root format={(value) => value.toFixed(1)} />;

    // @ts-expect-error Intl 옵션 객체는 format 계약에 포함되지 않는다.
    <Progress.Root format={{ style: "percent" }} />;
    // @ts-expect-error 포맷 함수는 문자열을 반환해야 한다.
    <Progress.Root format={(value) => value} />;
  });

  it("Value는 표시값을 소유하고 children을 받지 않는다", () => {
    expectTypeOf<"children">().not.toExtend<keyof ProgressValueProps>();

    // @ts-expect-error 표시값은 Root의 format 계약에서 결정한다.
    <Progress.Value>직접 지정한 값</Progress.Value>;
  });

  it("Parts의 render는 React 요소를 받는다", () => {
    <Progress.Label render={<strong />} />;
    <Progress.Value render={<b />} />;
    <Progress.Track render={<section />} />;
    <Progress.Indicator render={<i />} />;

    // @ts-expect-error render 함수는 지원하지 않는다.
    <Progress.Label render={() => <strong />} />;
  });

  it("Root는 네이티브 div ref를 사용하며 소유한 속성을 덮어쓸 수 없다", () => {
    expectTypeOf<ProgressRootProps["ref"]>().toEqualTypeOf<React.Ref<HTMLDivElement> | undefined>();
    expectTypeOf<"role">().not.toExtend<keyof ProgressRootProps>();
    expectTypeOf<"defaultValue">().not.toExtend<keyof ProgressRootProps>();
    expectTypeOf<"locale">().not.toExtend<keyof ProgressRootProps>();
  });
});

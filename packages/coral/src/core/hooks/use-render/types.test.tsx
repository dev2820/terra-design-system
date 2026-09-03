import type * as React from "react";
import { describe, expectTypeOf, it } from "vitest";

import { useRender } from "./index";
import type { RenderProp, UseRenderOptions } from "./index";

describe("useRender 타입", () => {
  it("render에 React 요소를 받는다", () => {
    expectTypeOf<RenderProp>().toEqualTypeOf<React.ReactElement>();
    expectTypeOf<UseRenderOptions["render"]>().toEqualTypeOf<React.ReactElement | undefined>();
  });

  it("네이티브 요소 이름과 두 단계의 props를 받는다", () => {
    expectTypeOf<UseRenderOptions["defaultTagName"]>().toEqualTypeOf<
      keyof React.JSX.IntrinsicElements
    >();
    expectTypeOf<UseRenderOptions["props"]>().toEqualTypeOf<object>();
    expectTypeOf<UseRenderOptions["internalProps"]>().toEqualTypeOf<object | undefined>();
    expectTypeOf(useRender).returns.toEqualTypeOf<React.ReactElement<Record<string, unknown>>>();
  });
});

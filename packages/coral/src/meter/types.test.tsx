import { describe, expectTypeOf, it } from "vitest";

import { Meter } from "./index";
import type { MeterValueProps } from "./index";

describe("Meter 타입", () => {
  it("Value는 표시값을 소유하고 children을 받지 않는다", () => {
    expectTypeOf<"children">().not.toExtend<keyof MeterValueProps>();

    // @ts-expect-error 표시값은 Root의 format 계약에서 결정한다.
    <Meter.Value>직접 지정한 값</Meter.Value>;
  });
});

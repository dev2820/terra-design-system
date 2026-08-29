import { describe, expectTypeOf, it } from "vitest";

import type { CarouselApi, CarouselProps, CarouselSlides } from "./index";

describe("Carousel", () => {
  describe("types", () => {
    it("slides를 하나 이상의 순서 있는 값으로 제한한다", () => {
      const single = ["only"] as const satisfies CarouselSlides;
      const multiple = ["first", "second"] as const satisfies CarouselSlides;

      // @ts-expect-error Carousel에는 하나 이상의 Slide가 필요하다.
      const empty = [] as const satisfies CarouselSlides;

      expectTypeOf(single).toEqualTypeOf<readonly ["only"]>();
      expectTypeOf(multiple).toEqualTypeOf<readonly ["first", "second"]>();
      expectTypeOf(empty).toEqualTypeOf<readonly []>();
    });

    it("수동 회전에서는 재생 상태를 허용하지 않는다", () => {
      type ManualProps = Extract<CarouselProps, { autoRotate?: false }>;

      expectTypeOf<ManualProps["loop"]>().toEqualTypeOf<boolean | undefined>();
      expectTypeOf<ManualProps["playing"]>().toEqualTypeOf<undefined>();
      expectTypeOf<ManualProps["defaultPlaying"]>().toEqualTypeOf<undefined>();
      expectTypeOf<CarouselApi<false>>().not.toHaveProperty("rotation");
      expectTypeOf<CarouselApi<false>>().not.toHaveProperty("getRotationControlProps");
    });

    it("자동 회전에서는 controlled와 uncontrolled 재생 상태를 제공한다", () => {
      type AutoRotateProps = Extract<CarouselProps, { autoRotate: true }>;
      type PlayingChangeValue = Parameters<NonNullable<AutoRotateProps["onPlayingChange"]>>[0];

      expectTypeOf<AutoRotateProps["playing"]>().toEqualTypeOf<boolean | undefined>();
      expectTypeOf<AutoRotateProps["defaultPlaying"]>().toEqualTypeOf<boolean | undefined>();
      expectTypeOf<PlayingChangeValue>().toEqualTypeOf<boolean>();
      expectTypeOf<CarouselApi<true>["rotation"]["playing"]>().toEqualTypeOf<boolean>();
      expectTypeOf<CarouselApi<true>["rotation"]["shouldRotate"]>().toEqualTypeOf<boolean>();
      expectTypeOf<CarouselApi<true>["rotation"]["tick"]>().toEqualTypeOf<() => void>();
    });

    it("현재 슬라이드를 읽고 외부에서 설정하는 API를 제공한다", () => {
      expectTypeOf<CarouselApi["value"]>().toEqualTypeOf<string>();
      expectTypeOf<Parameters<CarouselApi["setValue"]>[0]>().toEqualTypeOf<string>();
    });
  });
});

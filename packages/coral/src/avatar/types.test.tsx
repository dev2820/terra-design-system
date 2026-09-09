import { describe, expectTypeOf, it } from "vitest";

import { Avatar } from "./index";
import type { AvatarImageProps } from "./index";

describe("Avatar 타입", () => {
  it("Image에 문자열 alt를 요구한다", () => {
    expectTypeOf<AvatarImageProps>().toExtend<{ alt: string }>();

    <Avatar.Image alt="프로필 사진" />;
    <Avatar.Image alt="" />;

    // @ts-expect-error 접근 가능한 이미지 계약을 위해 alt는 생략할 수 없다.
    <Avatar.Image />;
  });
});

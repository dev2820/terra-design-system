# Avatar

이미지가 준비되기 전이나 불러오지 못했을 때 fallback을 보여 주는 headless Avatar다.
공개 설치와 import는 `@coral/react`를 사용한다.

```tsx
import { Avatar } from "@coral/react/avatar";

<Avatar.Root className="avatar">
  <Avatar.Fallback aria-hidden>AB</Avatar.Fallback>
  <Avatar.Image src="/profile.jpg" alt="프로필 사진" />
</Avatar.Root>;
```

`Root`, `Image`, `Fallback`은 각각 네이티브 `span`, `img`, `span`을 렌더링한다.
각 Part의 크기, 겹침과 모양은 사용처가 CSS로 정한다. 하나의 `Root`에는 하나의
`Image`만 사용한다.

## 대체 텍스트

`Image`의 `alt`는 필수다. Avatar가 사람이나 대상을 식별하는 유일한 정보라면
그 이름을 적는다. 같은 이름이 인접한 텍스트에 이미 있거나 이미지가 장식이라면
`alt=""`를 사용한다. fallback의 글자까지 중복해서 읽히지 않아야 한다면
`Fallback`에 `aria-hidden`을 전달한다.

## 이미지 로딩

기본값에서는 별도의 `Image` 객체로 이미지를 미리 불러오며, 완료되기 전에는 실제
`img`를 DOM에 렌더링하지 않는다. 이 방식은 깨진 이미지 표시를 피하고 fallback과
이미지를 한 번에 교체한다.

네이티브 `loading="lazy"`나 서버가 만든 실제 `img`를 처음부터 DOM에 유지해야 한다면
`keepMounted`를 사용한다.

```tsx
<Avatar.Root className="avatar">
  <Avatar.Fallback>AB</Avatar.Fallback>
  <Avatar.Image
    keepMounted
    loading="lazy"
    src="/profile.jpg"
    alt="프로필 사진"
    className="avatar-image"
  />
</Avatar.Root>
```

`keepMounted` 이미지에는 로딩 중 `aria-hidden`과 `data-loading`, 실패 시
`data-error`, 성공 시 `data-loaded`가 붙는다. 네이티브 lazy loading을 유지하려면
로딩 중 이미지를 `display: none`으로 제거하지 말고 다음처럼 보이지 않게만 만든다.

```css
.avatar-image[data-loading],
.avatar-image[data-error] {
  visibility: hidden;
}
```

`Fallback`의 `delay`는 빠른 연결에서 fallback이 잠깐 번쩍이는 현상을 줄인다.
`onLoadingStatusChange`는 `loading`, `loaded`, `error` 상태를 알린다. 상태별 스타일은
세 Part에 제공되는 같은 `data-*` 속성을 사용한다.

Next.js Image가 계산한 네이티브 속성이 필요하면 `getImageProps()`의 `props`를
`Avatar.Image`에 전달한다. Coral은 실제 요소가 `img`라는 계약을 유지하므로
`<Image>` 자체로 교체하는 `render` API는 제공하지 않는다.

```tsx
const { props } = getImageProps({ src, alt: "프로필 사진", width: 64, height: 64 });

<Avatar.Image {...props} />;
```

- [Base UI Avatar](https://base-ui.com/react/components/avatar)
- [WAI Images Tutorial](https://www.w3.org/WAI/tutorials/images/)

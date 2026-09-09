# 2026-09-09 — Avatar의 preload와 keepMounted를 함께 지원하기

## 문제

Avatar는 이미지가 준비되기 전이나 불러오지 못했을 때 Fallback을 보여주고,
성공하면 실제 이미지를 보여줘야 한다. 실제 `<img>`를 처음부터 DOM에 두면
브라우저의 네이티브 `loading="lazy"`, 반응형 이미지 선택과 서버가 렌더링한
마크업을 그대로 활용할 수 있다. 그러나 로딩 중이거나 실패했을 때 깨진 이미지가
Fallback과 함께 노출될 수 있고, 아직 준비되지 않은 이미지의 대체 텍스트가
Fallback 콘텐츠와 중복될 수도 있다.

반대로 화면에 표시하지 않는 별도 `Image` 객체로 먼저 불러온 뒤 성공한 경우에만
실제 `<img>`를 렌더링하면 Fallback에서 이미지로 한 번에 교체할 수 있다. 하지만
실제 `<img>`가 처음부터 DOM에 없으므로 네이티브 Lazy loading과 SSR Markup을
보존해야 하는 사용처에는 맞지 않는다. 어느 한 전략을 모든 Avatar에 강제하지
않으면서 두 전략의 상태와 접근성 결과를 일관되게 만들어야 했다.

## 접근 방식

첫 번째 방법은 실제 `<img>`를 항상 Mount하는 것이었다. HTML의 이미지 기능을
가장 직접적으로 유지하지만, Coral이 이미지가 준비될 때까지 DOM 노출과 보조
기술 노출을 구분해야 한다. 제품이 로딩 이미지를 `display: none`으로 숨기면
브라우저가 화면 밖 이미지로 판단해 Lazy loading 시작 자체가 늦어질 가능성도
고려해야 한다.

두 번째 방법은 항상 별도 객체로 Preload하고 성공 후에만 `<img>`를 Mount하는
것이었다. 깨진 이미지 표현을 막고 Fallback 전환을 단순하게 만들지만, SSR에서
실제 이미지가 사라지고 `loading="lazy"`를 전달해도 네이티브 이미지 요소가
로딩을 시작할 수 없다.

[Base UI Avatar](https://base-ui.com/react/components/avatar)가 기본 Preload와
실제 이미지를 유지하는 선택지를 함께 제공하는 방식을 참고했다. 두 전략을 공개
옵션으로 구분하면 일반적인 Fallback 전환에는 안전한 기본값을 제공하면서,
네이티브 이미지 생명주기가 필요한 사용처도 별도 구현 없이 지원할 수 있다고
판단했다.

## 해결

Avatar Image는 기본적으로 별도 `window.Image`로 `src`, `srcSet`, `sizes`,
`crossOrigin`과 `referrerPolicy`를 적용해 Preload한다. 로드가 성공하기 전에는 실제
`<img>`를 DOM에 렌더링하지 않고 Fallback을 유지하며, 성공한 뒤에만 이미지로
교체한다. 실패하면 실제 이미지를 Mount하지 않고 Error 상태와 Fallback을
유지한다.

SSR Markup이나 네이티브 `loading="lazy"`처럼 실제 `<img>`가 처음부터 필요하면
`keepMounted`를 명시한다. 이 모드에서는 DOM 이미지의 `complete`, `naturalWidth`,
`load`와 `error`를 기준으로 상태를 판단한다. 이미지가 준비되지 않았거나 실패한
동안에는 실제 요소를 유지하되 `aria-hidden`으로 보조 기술에서 숨기고, 제품은
Lazy loading을 방해하는 `display: none` 대신 `visibility: hidden` 같은 표현으로
시각적으로 감춘다.

두 모드는 같은 Loading, Loaded와 Error 상태를 Root와 Fallback에 전달한다. 따라서
로딩 방식은 달라도 Fallback의 표시 조건과 상태별 Styling 표식은 동일하게 사용할
수 있다. 기본값은 깨진 이미지가 노출되지 않는 Preload이며, `keepMounted`는 실제
이미지 요소가 로딩 생명주기를 소유해야 하는 경우에만 선택한다.

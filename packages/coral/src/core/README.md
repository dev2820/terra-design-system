# useRender

Coral 컴포넌트가 기본 요소를 사용자 지정 React 요소로 교체하면서 Props를 같은
규칙으로 합성할 수 있게 하는 내부 공통 모듈이다.

`useRender`는 `defaultProps`, render 요소의 Props, Part의 `props`, Coral의
`internalProps` 순서로 일반 속성을 덮어쓴다. `defaultProps`에는 사용자가
덮어쓸 수 있는 기본값을 두고, `internalProps`에는 컴포넌트의 동작과 접근성
계약을 유지해야 하는 값을 둔다. 명시적인 `undefined`도 앞 단계의 값을 덮어쓴다.

`className`은 같은 순서로 연결하고, `style`은 얕게 병합하며, 같은 이름의 이벤트
핸들러와 Ref는 네 단계 모두 보존한다. 이벤트와 Ref는 이 순서로 호출하며,
React 19 callback Ref의 정리 함수도 유지한다.

이 모듈은 컴포넌트의 의미나 접근성 계약을 정하지 않는다. 각 Coral 컴포넌트가
최종 렌더링 요소와 필수 HTML·ARIA 속성을 계속 소유한다.

`PropsWithRender<T>`는 `render?: RenderProp`을 지원하는 Part의 Props를
HTML 요소 Props와 조합한다.

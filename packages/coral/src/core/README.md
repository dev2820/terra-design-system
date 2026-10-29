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

## focusElement

`focusElement(element, preventScroll = true)`는 사용할 수 있는 DOM 요소에 포커스를
주고, 실제로 해당 요소가 포커스를 받았는지 boolean으로 반환한다. 대상이 없거나
DOM에서 분리되었거나 숨김·inert·disabled 상태이면 `false`를 반환한다.

`isElementAvailableForFocus`는 같은 가용성 검사를 제공한다. 이 검사는 요소가
포커스를 받을 수 있는지를 완전히 판정하지 않으며, Tab 순서나 초기 대상 선택은
각 컴포넌트가 관리한다.

## createFocusRestoration

`createFocusRestoration(scope, previousFocus)`는 scope 밖의 현재 포커스를 기억하고
복원 함수를 반환한다. 이미 scope 안에 포커스가 있으면 전달받은 `previousFocus`를
기억한다. 이 값은 마운트 중 `autoFocus`가 먼저 실행된 경우에 사용할 수 있다.

복원 함수에는 해석된 대상과 선택적인 대체 대상을 전달한다. 명시한 요소, 대체
대상, 기억한 요소 순서로 포커스를 시도하고 성공 여부를 반환한다. `true` 또는
`null`이면 대체 대상부터 시도하고, `false` 또는 `undefined`이면 복원을 생략한다.
복원 함수의 세 번째 인수 `restoreFallback`은 기본값이 `true`다. `false`이면
명시한 요소에만 포커스를 시도하고, 대체 대상과 기억한 요소로는 이동하지 않는다.
비모달 외부로 이동한 포커스를 유지할 때 사용한다.

설정의 해석과 복원 시점은 사용하는 컴포넌트가 관리한다. Dialog는 `finalFocus`를
해석한 값과 Trigger를 전달하고, 가장 위의 Dialog가 제거된 뒤 복원을 호출한다.

## removeScroll

`removeScroll(document)`는 문서의 `html`과 `body`에 `overflow: hidden`을 적용하고,
스크롤바가 사라지는 너비만큼 기존 body의 오른쪽 패딩을 보정한다. 루트 요소에
`scrollbar-gutter: stable`이 적용되어 있으면 패딩 보정을 생략한다.

반환한 복원 함수는 변경한 인라인 스타일의 값과 우선순위를 되돌린다. 같은 문서의
잠금 시점과 중첩 관리는 호출자가 담당한다. Dialog는 모달이 있는 동안 한 번만
잠그고, 마지막 모달이 제거되거나 비모달로 전환되면 복원한다.

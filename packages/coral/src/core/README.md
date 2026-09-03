# useRender

Coral 컴포넌트가 기본 요소를 사용자 지정 React 요소로 교체하면서 Props를 같은
규칙으로 합성할 수 있게 하는 내부 공통 모듈이다.

`useRender`는 render 요소, Part Props와 Coral 내부 Props 순서로 일반 속성을
덮어쓴다. `className`은 같은 순서로 연결하고, `style`은 얕게 병합하며, 같은
이름의 이벤트 핸들러와 Ref는 모두 보존한다.

이 모듈은 컴포넌트의 의미나 접근성 계약을 정하지 않는다. 각 Coral 컴포넌트가
최종 렌더링 요소와 필수 HTML·ARIA 속성을 계속 소유한다.

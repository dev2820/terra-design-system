# 2026-09-09 — Coral에서 Form 컴포넌트를 제공하지 않기

## 문제

Field가 Label과 Error의 접근성 관계 및 선택적인 Custom validation을 제공하게
되면서, 여러 Field를 묶는 `Form` 컴포넌트도 Coral이 제공해야 하는지 결정할
필요가 생겼다. `Form`이 제출, 초기화, 전체 Validity와 오류 Focus를 조정하면
Field의 독립적인 기능을 한곳에서 연결할 수 있다.

그러나 HTML의 `<form>`은 이미 제출, 초기화, FormData와 네이티브 Constraint
validation을 소유한다. 복잡한 제품에서는 React Hook Form이나 TanStack Form 같은
외부 Library가 값, 검증, 제출 상태와 비즈니스 흐름을 관리한다. Coral이 같은
책임을 가진 `Form`을 추가하면 네이티브 요소를 한 번 더 감싸는 데 그치거나, 외부
Library와 경쟁하는 별도의 Form Framework가 될 수 있었다.

## 접근 방식

첫 번째 방법은 네이티브 `<form>`을 그대로 렌더링하는 얇은 Coral Part를 제공하는
것이었다. import와 Props 합성 방식은 다른 Coral 컴포넌트와 맞출 수 있지만,
네이티브 요소에 없는 의미나 행동을 추가하지 않는다면 새로운 컴포넌트 계약을
만들 근거가 약했다.

두 번째 방법은 Form 전체의 Field 등록, 값, 검증 결과, 제출 상태와 오류 Focus를
Coral이 소유하는 것이었다. 별도 Form Library 없이 완결된 경험을 제공할 수 있지만,
Coral의 범위가 접근 가능한 Headless Component에서 Form 상태 관리 Library로
확장된다. 외부 Library와 조합할 때 어느 계층의 상태와 검증 결과가 우선하는지도
추가로 정해야 한다.

세 번째 방법은 Form 자체는 네이티브 요소와 외부 Library에 맡기고, Coral은 각
Field와 Control이 담당하는 구조와 접근성 계약에 집중하는 것이었다. Field의
Custom validation을 명시적인 opt-in으로 제한하면 이 방식에서도 간단한 검증과
외부 Form Library 조합을 모두 지원할 수 있다고 판단했다.

## 해결

Coral은 현재 별도의 `Form` 컴포넌트를 제공하지 않는다. 사용자는 네이티브
`<form>`을 직접 사용하며 제출, 초기화, FormData와 Constraint validation은
브라우저의 계약을 따른다. Form 전체의 값과 검증 및 비즈니스 흐름이 필요하면
React Hook Form이나 TanStack Form 같은 외부 Library가 그 책임을 소유한다.

Coral은 `Field`, `Fieldset`, `Input`을 통해 Control의 의미 구조, 상태 표식과
접근성 관계를 제공한다. Custom validator가 필요한 Field만 Coral 검증에
참여하므로 별도 Form 컴포넌트 없이도 독립 사용과 외부 Library 조합의 경계를
유지할 수 있다.

Base UI에 Form이 있거나 컴포넌트 목록의 일관성을 맞출 수 있다는 이유만으로
Coral Form을 추가하지 않는다. 이후 네이티브 `<form>`이나 외부 Library로 해결되지
않는 반복된 UI 계약이 확인된다면 그 필요를 기준으로 다시 검토할 수 있지만,
현재는 네이티브 요소로 충분하다는 결론을 컴포넌트 목록에도 명시한다.

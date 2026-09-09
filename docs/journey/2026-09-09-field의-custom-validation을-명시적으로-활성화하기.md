# 2026-09-09 — Field의 Custom validation을 명시적으로 활성화하기

## 문제

Coral의 Field는 Label, Description, Error와 Control을 연결하고, 입력값의 Focus,
Filled, Dirty, Touched와 Invalid 상태를 각 Part에 전달한다. 여기에 `validate`를
사용한 Custom validation도 제공하므로 Field만으로 검증 규칙과 오류 표시를 함께
구성할 수 있다.

한편 실제 제품은 React Hook Form이나 TanStack Form처럼 Form 전체의 값과 검증
시점을 소유하는 외부 Library와 Field를 조합할 수 있어야 한다. 이를 위해 Field는
외부에서 `invalid`, `touched`, `dirty`를 받아 접근성 속성과 상태 표식에 반영할 수
있게 설계되었다. 그러나 `validate`가 없는 Field까지 Coral의 Form 제출 처리에
등록하면, 외부 상태를 표현하기만 하려는 Field도 제출 시 Coral의 검증 절차에
참여한다. 외부 Library와 Coral 중 누가 검증과 제출 흐름을 소유하는지가 모호해지고,
사용자가 의도하지 않은 중복 검증이나 제출 개입이 생길 수 있었다.

## 접근 방식

첫 번째 방법은 모든 Field를 항상 Coral의 Form 검증 절차에 등록하는 것이었다.
Field가 네이티브 Constraint와 Custom validator를 한 경로에서 처리하므로 독립적인
사용법은 일관되지만, Custom validator를 전달하지 않은 사실이 외부 Form Library에
책임을 맡기겠다는 신호가 되지 못한다. 외부 상태 Props를 사용하더라도 Coral의
제출 Listener는 계속 남는다.

두 번째 방법은 Field에서 검증 기능을 제거하고 상태 표현과 접근성 연결만 제공하는
것이었다. 외부 Form Library와의 책임 충돌은 줄지만, 간단한 Form에서도 별도
Library 없이 Custom validation을 구성할 수 있었던 Field의 독립적인 사용법을
잃는다.

세 번째 방법은 `validate`의 존재를 Coral Custom validation에 참여하겠다는
명시적인 선택으로 해석하는 것이었다. `validate`가 있는 Field만 Form 제출 검증에
등록하면 독립적인 사용법을 유지하면서도, 없는 Field는 외부 상태를 표현하는
역할에 머물 수 있다. 네이티브 `<input>`의 Constraint validation은 브라우저의
계약이므로 이 선택과 별개로 유지할 수 있다.

## 해결

Field의 Custom validation은 `validate`를 전달했을 때만 활성화한다. `validate`가
있는 Field만 Coral의 Form 제출 검증 절차에 등록하고, 네이티브 Constraint를 먼저
확인한 뒤 Custom validator를 실행한다.

`validate`가 없으면 Field는 Coral의 제출 처리에 등록되지 않는다. 외부 Form
Library가 전달한 `invalid`, `touched`, `dirty`를 상태 표식과 `aria-invalid`,
`aria-describedby`에 반영하지만 제출을 가로채지 않는다. 외부 Library를 사용할 때
같은 검증 규칙을 Coral의 `validate`에 다시 정의하지 않는다.

이 경계는 Custom validation의 소유권에 관한 것이다. `required`, `type`, `pattern`
같은 네이티브 Constraint와 브라우저의 Form 제출 동작은 그대로 유효하다. 사용처가
`noValidate`로 네이티브 검증을 끄는 경우에도 `validate`가 없는 Coral Field가 이를
대신 실행하지 않는다.

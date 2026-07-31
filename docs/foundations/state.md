# State

State는 요소가 현재 놓인 조건을 나타낸다. Terra는 여러 요소에서 공통으로
사용하는 State를 `Availability`, `Interaction`, `Focus`, `Selection`의 네 축으로
구분한다.

Terra는 아래 State만 명시하며, State가 적용되지 않은 조건은 기본값으로
간주한다. 특정 컴포넌트나 제품에 종속된 상태는 포함하지 않는다.

## Availability

Availability는 요소의 행동 가능 여부를 나타낸다.

`Disabled`는 요소가 화면에 존재하지만 현재 행동이 제한된 상태다.

## Interaction

Interaction은 사용자가 요소를 가리키거나 누르는 동안의 상태를 나타낸다.

- `Hovered`는 사용자가 요소를 가리키고 있는 상태다.
- `Pressed`는 사용자가 요소를 누르고 있는 상태다.

두 조건이 겹치면 같은 Interaction 축에서 Pressed가 Hovered보다 우선한다.

## Focus

`Focused`는 현재 입력을 받을 위치를 나타낸다.

## Selection

`Selected`는 선택 가능한 대상 중 현재 선택된 대상을 나타낸다.

## 축의 관계와 전환

각 축의 의미는 독립적이고 축 사이에는 우선순위가 없으므로, 서로 다른 축의
State는 각 의미를 유지한 채 함께 존재할 수 있다.

단, Availability는 사용자 행동에 의한 State 전환을 제한한다. Disabled인 요소는
Hovered와 Pressed로 전환되지 않으며, Disabled로 바뀌기 전에 성립한 Hovered와
Pressed도 종료한다. 사용자는 Disabled인 요소의 Selection을 변경할 수 없다.

비활성화되기 전에 선택된 요소는 `Disabled + Selected` 상태를 유지할 수 있다.
Disabled인 요소가 Focused와 함께 존재할 수 있는지는 요소의 탐색 방식과 발견
가능성을 고려해 Recipe에서 정한다.

## 접근성

State의 의미와 실제 행동은 일치해야 한다.

상태의 차이는 인식할 수 있어야 하며 색상만을 유일한 단서로 사용하지 않는다.
플랫폼이 상태의 의미를 지원한다면 시각적 표현에만 의존하지 않고 보조 기술에도
같은 의미를 전달한다.

Focus 표시가 필요한 조건에서는 현재 Focused인 대상을 식별할 수 있어야 하며,
표시가 화면의 다른 요소에 완전히 가려져서는 안 된다. Focused와 Selected가 함께
존재할 때에는 현재 입력 위치와 선택 결과를 구분할 수 있어야 한다.

구체적인 상태 표현과 Focus 표시 조건은 Recipe에서 정한다.

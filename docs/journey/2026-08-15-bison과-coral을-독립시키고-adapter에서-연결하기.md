# 2026-08-15 — Bison과 Coral을 독립시키고 Adapter에서 연결하기

## 문제

Bison은 상태와 행동을, Coral은 UI Pattern의 HTML 구조와 조합 가능한 Parts를
담당한다. 두 Library를 함께 사용할 때 Bison의 상태, HTML·ARIA 속성과 Event를
Coral의 Parts에 연결해야 하지만, 이 연결을 어느 계층이 소유할지 결정해야 했다.

Coral이 `useBehavior` 같은 API를 제공하면 사용하기는 쉽지만 Coral이 Bison의
Instance와 변경 방식에 의존하게 된다. 반대로 Bison이 직접 DOM Event를 등록하고
요소를 조작하면 React나 Vue가 관리하는 렌더링과 생명주기에 충돌할 수 있다.
또한 `aria-expanded`처럼 현재 행동 상태에서 파생되는 속성을 Coral이 계산하면
시각 구조 계층이 행동의 의미까지 알아야 한다.

## 접근 방식

첫 번째 방식은 Coral이 Bison을 직접 구독하고 행동을 HTML Parts에 연결하는
것이었다. 두 Library를 조합하는 코드는 줄어들지만, Coral을 Bison 없이 사용할
수 없게 되고 다른 행동 구현과 조합할 가능성도 닫힌다. Headless Component
Library가 특정 상태 머신의 Adapter 역할까지 함께 맡는 구조였다.

두 번째 방식은 Bison이 DOM Event를 직접 등록하고 해제하는 것이었다. Core만으로
행동을 완성할 수 있지만 React와 Vue가 가진 생명주기와 Event 연결 방식을
Bison이 함께 관리해야 한다. Framework Agnostic이라는 범위도 유지하기
어려워진다.

세 번째 방식은 행동의 의미와 결과는 Bison이 계산하고, Framework Adapter가 그
계약을 현재 생명주기에 연결하며, Coral은 전달받은 속성과 Event를 실제 HTML에
반영하는 것이었다. 이 경우 `aria-expanded`와 외부 상호작용에 따른 닫힘 같은
행동 규칙은 Bison에 남으면서도 실제 Event 등록과 구독 방식은 Framework에 맞게
관리할 수 있다.

## 해결

Bison과 Coral은 서로 직접 의존하지 않는다. Bison은 Pattern Instance, 상태
전환과 Parts별 HTML·ARIA 속성 및 등록해야 할 Event를 행동 계약으로 제공하지만,
직접 DOM을 렌더링하거나 Framework의 생명주기를 관리하지 않는다. 상태에서
파생되는 `aria-expanded` 같은 속성도 행동을 알고 있는 Bison이 결정한다.

`@bison/react` 같은 Adapter는 Bison Instance를 구독하고 React의 생명주기에
맞춰 속성과 Event를 연결한다. Coral은 Bison을 알지 않은 채 외부에서 전달받은
속성과 Event를 자신의 Parts와 HTML 요소에 반영한다. 두 Library를 함께 쓰는
상위 계층이 Adapter의 결과를 Coral에 전달한다.

이 구조를 통해 Bison은 행동 계약에, Coral은 구조와 렌더링에 집중한다. Coral은
Bison 없이도 독립적으로 사용할 수 있고, Bison도 Coral의 Component 구조에
종속되지 않는다. Framework별 차이는 Adapter에 격리하면서 행동의 의미와
접근성 속성은 Core에서 일관되게 유지한다.

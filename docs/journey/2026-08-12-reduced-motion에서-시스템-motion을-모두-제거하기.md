# 2026-08-12 — Reduced Motion에서 시스템 Motion을 모두 제거하기

## 문제

Terra는 평상시에도 기능적인 Motion만 사용하고, 이해에 충분한 가장 짧은
Duration을 선택한다. 이미 Motion을 최소화하는 규칙이 있으므로 사용자가 Reduced
Motion을 요청했을 때 시간을 더 줄이는 것으로 충분한지, 일부 움직임을 다른
표현으로 바꿀지, Terra가 만든 시스템 Motion을 모두 제거할지 결정해야 했다.

모든 Motion을 제거하면 규칙과 검증이 단순해지지만, 상태 사이의 연속성이나 공간
관계를 설명하던 단서도 함께 사라질 수 있다. 반대로 Recipe마다 유지·축소·대체할
Motion을 판단하게 하면 표현은 유연하지만 같은 사용자 설정이 제품과 컴포넌트에
따라 다른 결과를 만들 수 있었다.

## 접근 방식

평상시의 최소화와 Reduced Motion은 목적이 다르다고 구분했다. 가장 짧은
Duration을 선택하는 규칙은 사용자를 기다리게 하지 않으면서 필요한 정보를
전달하기 위한 효율의 기준이다. Reduced Motion은 움직임에 민감하거나 움직임으로
집중에 방해를 받는 사용자가 별도의 표현을 요청한 접근성 조건이다. 큰 이동을 더
짧은 시간에 재생하는 것은 움직임 자체를 줄이지 않고 오히려 갑작스럽게 느껴질
수 있으므로, 단순히 더 빠른 Duration으로 바꾸는 것만으로는 이 요청에 답하지
못한다.

[W3C의 `prefers-reduced-motion`](https://www.w3.org/TR/mediaqueries-5/#prefers-reduced-motion)은
불편이나 주의 분산을 유발하는 Motion 기반 애니메이션을 제거하거나 대체하려는
사용자 선호를 나타낸다. [WCAG의 상호작용 애니메이션 해설](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions)은
기능이나 정보에 본질적이지 않은 상호작용 애니메이션을 끌 수 있어야 한다고
설명한다. 여기서 기능적이라는 이유만으로 Motion이 곧 본질적인 것은 아니다.
예를 들어 패널의 이동이 관계 이해에 도움을 주더라도 정적인 위치와 상태 표현으로
같은 정보를 전달할 수 있다면 Motion 자체는 제거할 수 있다.

선택적으로 움직임을 축소하거나 Fade로 교체하는 방식은 일부 연속성을 보존할 수
있지만, 허용할 움직임과 축소 수준을 Recipe마다 판단하고 다시 검증해야 한다.
반면 모든 시스템 Motion을 제거하면 사용자의 요청에 대한 결과가 예측 가능하고,
Motion에만 의존한 정보 설계를 발견하기 쉽다.
[Atlassian](https://atlassian.design/foundations/motion)은 Reduced Motion에서
Motion을 끄고 즉시 전환하는 방식을 사용하며, 이 강한 기본값이 실제 디자인
시스템에서도 적용 가능한 선택임을 보여주었다.

## 해결

사용자가 Reduced Motion을 요청하면 Terra의 Duration과 Easing을 사용하는 모든
시스템 Motion을 제거하고 결과 상태를 즉시 보여준다. 이는 `Duration 1`처럼 더
짧은 값을 적용하는 것이 아니라 개념적인 `None`으로 전환하는 것이다. `None`은
토큰이 아니므로 Recipe와 구현은 Motion 자체를 적용하지 않는다.

모든 기능과 정보는 Motion이 없는 상태에서도 이해할 수 있어야 한다. Motion이
사라져도 원인과 결과, 현재 상태와 진행 여부를 전달할 수 있도록 정적인 상태,
텍스트와 접근 가능한 의미를 함께 제공한다. 이 결과 계약을 통해 모든 Motion을
제거하는 단순한 규칙이 정보 손실로 이어지지 않게 한다.

이 결정의 범위는 Terra의 Duration과 Easing으로 구성한 시스템 Motion이다.
움직임 자체가 제품의 기능인 경우는 공통 Motion Foundation의 기본 동작으로
간주하지 않고 해당 제품의 접근성 요구와 대체 수단을 별도로 검토한다.

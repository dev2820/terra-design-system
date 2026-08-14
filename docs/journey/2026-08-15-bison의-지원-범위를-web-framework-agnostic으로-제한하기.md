# 2026-08-15 — Bison의 지원 범위를 Web Framework Agnostic로 제한하기

## 문제

Bison은 UI의 시각적 표현과 분리된 행동을 제공하므로 특정 Framework에 종속되지
않아야 했다. 그러나 여기서 독립의 범위를 React와 Vue 같은 Web Framework 사이로
한정할지, React Native와 Flutter처럼 서로 다른 Platform까지 포함할지 결정해야
했다.

Platform까지 독립적인 Core를 만들면 같은 행동을 더 많은 환경에서 공유할 수
있다. 반면 Web의 HTML 요소, DOM Event, Focus와 ARIA 관계를 전제로 한 행동 계약은
Native 환경의 렌더링 요소, Event와 접근성 API에 그대로 대응하지 않는다. 서로
다른 Platform을 하나의 추상화에 포함하면 Bison의 공통 계약이 지나치게
추상적이거나 각 Adapter가 행동을 다시 해석하는 큰 구현이 될 수 있었다.

## 접근 방식

첫 번째 대안은 Bison을 Platform Agnostic하게 만들어 Web, React Native와
Flutter에서 같은 상태 머신을 사용하는 것이었다. 상태 전환의 일부는 공유할 수
있지만 Pattern을 완성하는 입력 방식, Focus 관리, 외부 상호작용과 보조 기술
계약은 Platform마다 다르다. 따라서 하나의 구현을 공유하는 이점보다 공통
인터페이스를 유지하고 각 Platform의 접근성을 검증하는 부담이 커질 수 있었다.

두 번째 대안은 지원 기반을 Web으로 고정하되 React나 Vue의 생명주기에는
종속되지 않는 것이었다. 행동 Core가 HTML과 Vanilla JavaScript에서 성립하면
Web의 의미와 접근성 계약을 구체적으로 유지할 수 있다. React와 Vue는 같은
행동을 다시 정의하지 않고 각 Framework의 반응성과 생명주기에 연결하는
Adapter만 제공하면 된다.

Framework 독립성과 Platform 독립성을 같은 목표로 취급하지 않음으로써, 지원
범위를 넓히기 위해 Web 행동 계약을 약하게 만드는 일을 피할 수 있다고
판단했다.

## 해결

Bison은 Web Framework Agnostic한 행동 시스템으로 운영한다. Core의 행동은
HTML과 Vanilla JavaScript에서 동작해야 하며 특정 Web Framework의 Component,
Hook이나 생명주기를 전제로 하지 않는다.

React와 Vue 같은 Web Framework에는 Core의 행동을 해당 Framework의 반응성과
생명주기에 연결하는 별도 Adapter를 제공한다. React Native와 Flutter처럼 Web과
다른 Platform은 Bison의 공통 지원 범위에 포함하지 않는다. 이 경계를 통해
Bison은 Web에서 구체적이고 검증 가능한 행동 및 접근성 계약을 유지하면서도
Framework 선택에는 종속되지 않는다.

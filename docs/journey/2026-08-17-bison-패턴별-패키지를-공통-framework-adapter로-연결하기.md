# 2026-08-17 — Bison 패턴별 패키지를 공통 Framework Adapter로 연결하기

## 문제

Bison은 ARIA APG Pattern 하나를 완성된 행동 계약 하나로 제공하지만, 기존 패키지
구조는 모든 Pattern을 `@bison/core`에 모으고 Framework별 연결을
`@bison/react`와 같은 Adapter에 두었다. 이 구조에서는 Tabs 하나만 필요한
사용자도 모든 Pattern이 들어 있는 패키지를 설치해야 한다. 사용하지 않는 코드가
최종 Bundle에서 제거될 수 있더라도 설치와 의존성의 경계가 실제 사용 단위와
일치하지 않고, Pattern 하나를 찾고 이해할 때에도 전체 Core가 탐색 범위가 된다.

Pattern을 독립된 작은 패키지로 나누면 필요한 행동만 선택해 설치할 수 있고,
Pattern의 계약, 구현과 테스트를 한정된 범위에서 검색하고 읽을 수 있다. 이는
Bundle에 불필요한 Pattern이 포함될 가능성을 구조적으로 줄이는 동시에, 사람과
AI가 한 Pattern을 다룰 때 불필요한 Context를 덜 읽게 하려는 목적에도 맞는다.

그러나 Pattern별 배포와 Framework별 연결을 함께 나누면 지원하는 Pattern 수와
Framework 수를 곱한 만큼 패키지가 생길 수 있다. 필요한 Framework 코드만
설치하면서도 배포와 유지 관리 단위가 곱셈으로 늘어나지 않는 구조가 필요했다.

## 접근 방식

첫 번째 방식은 기존처럼 모든 Pattern을 하나의 Core 패키지에 두는 것이었다.
설치와 버전 관리는 간단하지만, Pattern이 독립된 행동 계약이라는 Bison의 설계
단위와 배포 단위가 일치하지 않는다. 필요한 Pattern만 설치하고 탐색 범위를
좁히려는 목적도 달성하기 어렵다.

두 번째 방식은 `@bison/tabs` 안에 `@bison/tabs/react`와
`@bison/tabs/vue` 같은 하위 경로를 제공하는 것이었다. 그러나 이 경로들은
독립된 패키지가 아니라 하나의 배포물에 속한다. React만 사용하는 프로젝트에도
Vue 연결 코드와 관련 패키지 정보가 같은 배포물로 전달되며, 하나의
`package.json`에서 서로 다른 Framework의 Peer Dependency를 함께 다뤄야 한다.
Pattern별 독립 설치는 가능하지만 Framework별 독립 설치라는 경계는 얻지 못한다.

세 번째 방식은 `@bison/react-tabs`, `@bison/vue-tabs`처럼 Pattern과 Framework의
모든 조합을 별도 패키지로 만드는 것이었다. 사용자는 필요한 조합만 설치할 수
있지만, Pattern이 추가되거나 지원 Framework가 늘어날 때마다 배포, 버전 관리와
검증 대상이 곱셈으로 증가한다. 같은 Tabs 행동을 Framework별 패키지에서 다시
소유하거나 연결 코드가 여러 곳에 반복될 위험도 있다.

마지막으로 Pattern은 Framework와 무관한 패키지로 배포하고, Framework Adapter는
특정 Pattern을 알지 않은 채 공통 연결 규약을 처리하는 방식을 검토했다. 이
방식에서는 `@bison/tabs`가 Tabs의 상태, 전환, Parts와 접근성 계약을 완결하고,
`@bison/react`는 Pattern Instance의 생성, 구독과 정리를 React 생명주기에
연결한다. 새로운 Pattern은 기존 Adapter를 그대로 사용할 수 있고, 새로운
Framework도 기존 Pattern을 다시 배포하지 않고 Adapter 하나만 추가하면 된다.

[Zag](https://zagjs.com/overview/installation)도 Pattern별 Machine 패키지와
Framework별 공통 Adapter를 함께 설치하고, Pattern의 `connect`를 Framework의
`useMachine`과 `normalizeProps`에 연결하는 구조를 사용한다. 이는 Pattern과
Framework의 패키지 수를 곱하지 않고 두 축을 독립적으로 배포할 수 있음을
보여주는 참고 사례가 되었다.

## 해결

Bison은 `@bison/tabs`, `@bison/accordion`처럼 ARIA APG Pattern 하나를 독립된
패키지 하나로 배포한다. 각 Pattern 패키지는 자신의 행동 계약을 완결해서
소유하며 React나 Vue 같은 Framework에 의존하지 않는다.

`@bison/react`와 같은 Framework 패키지는 특정 Pattern을 포함하거나 직접
의존하지 않는다. 대신 모든 Pattern이 따르는 연결 규약을 이용해 Pattern의
상태와 결과를 해당 Framework의 반응성과 생명주기에 연결한다. 따라서 React에서
Tabs를 사용하려면 `@bison/tabs`와 `@bison/react`만 설치하며, Vue 코드나 Vue
의존성은 함께 설치하지 않는다.

저장소의 폴더도 배포 단위와 같은 수평 구조로 둔다. `packages/bison/tabs`,
`packages/bison/accordion`, `packages/bison/react`는 각각 독립된 패키지다. 이
구조에서 Pattern 수가 늘어나면 Pattern 패키지만, 지원 Framework가 늘어나면
Framework Adapter만 추가되므로 전체 패키지 수는 두 수의 곱이 아니라 합에
가깝게 증가한다.

여러 Pattern을 사용하는 사용자는 필요한 패키지를 각각 설치해야 한다는 비용이
남는다. 모든 Pattern을 한 번에 설치하는 통합 방식이나 필요한 패키지를 선택해
설치하는 CLI는 이 불편을 보완할 수 있지만, 구체적인 제공 방식은 이 결정에서
확정하지 않는다. 우선 배포와 탐색의 기본 경계를 Pattern에 맞추고, 설치 편의는
그 경계를 허물지 않는 별도 진입점으로 다룬다.

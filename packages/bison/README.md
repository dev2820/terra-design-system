# Bison

Bison은 UI의 동작만 담당한다. 화면이 어떻게
보이는지가 아니라 사용자의 입력과 현재 상태에 따라 무엇이 어떻게 바뀌는지를
정의한다. 특정 Web Framework에 종속되지 않으며 HTML과 Vanilla JavaScript에서
동작해야 한다.

Bison은 ARIA APG에 정의된 패턴 단위로 완성된 행동을 제공한다. 각 패턴을
임의의 기능 조합이 아니라 하나의 접근성 계약으로 다룬다.

## 패키지

- `@bison/core`: 공통 타입과 패턴을 조합하는 저수준 상태 머신을 제공한다.
- `@bison/react`: Bison의 행동을 React 생명주기에 연결한다.
- `@bison/accordion`, `@bison/dialog`처럼 각 APG 패턴을 독립된 패키지로
  제공한다.

`@bison/core`의 저수준 상태 머신은 APG 패턴이 아니며, 컴포넌트 계층에서 APG에
없는 행동을 조합할 때 사용할 수 있다.

## 책임 범위

- 패턴을 구성하는 parts와 각 part의 의미 및 관계
- 동작에 필요한 상태와 상태 전환
- 키보드, 포인터, 터치와 외부 상호작용에 대한 반응
- 동작에 포함되는 Focus, 탐색과 Selection 규칙
- 상태에 따라 각 part가 가져야 하는 HTML과 ARIA 속성
- 입력으로 발생한 결과와 외부에 알려야 하는 사건
- Disabled처럼 동작 가능 여부가 전환에 미치는 제약

Focus Trap, Focus 복원, 외부 영역 비활성화와 Scroll Lock처럼 DOM 생명주기가
필요한 동작은 Bison이 실행 조건과 요구사항을 행동 계약으로 제공한다. 실제 DOM
구현은 패턴을 소비하는 상위 계층이 맡으며, 해당 계약을 구현하지 않으면 패턴이
완성된 것으로 보지 않는다.

Coral은 Bison에 의존하지 않는다. 둘을 조합하는 상위 계층이 Bison을 구독하고
행동 계약을 Coral의 parts에 연결한다.

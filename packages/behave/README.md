# @terra/behave

`@terra/behave`는 Terra에서 UI의 동작만 담당하는 패키지다. 화면이 어떻게
보이는지가 아니라 사용자의 입력과 현재 상태에 따라 무엇이 어떻게 바뀌는지를
정의한다. 특정 Web Framework에 종속되지 않으며 HTML과 Vanilla JavaScript에서
동작해야 한다.

Behave는 ARIA APG에 정의된 패턴 단위로 완성된 행동을 제공한다. 각 패턴을
임의의 기능 조합이 아니라 하나의 접근성 계약으로 다룬다.

## 책임 범위

- 패턴을 구성하는 parts와 각 part의 의미 및 관계
- 동작에 필요한 상태와 상태 전환
- 키보드, 포인터, 터치와 외부 상호작용에 대한 반응
- 동작에 포함되는 Focus, 탐색과 Selection 규칙
- 상태에 따라 각 part가 가져야 하는 HTML과 ARIA 속성
- 입력으로 발생한 결과와 외부에 알려야 하는 사건
- Disabled처럼 동작 가능 여부가 전환에 미치는 제약

Headless는 Behave의 계약을 구독하여 이벤트와 DOM 생명주기를 연결하고, parts를
실제 HTML로 렌더링한다.

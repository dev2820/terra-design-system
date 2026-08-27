# 2026-08-27 — Machine은 전이만 제공하고 상태 조회는 Connect가 담당하기

## 문제

Bison의 Pattern은 Machine이 상태와 Event에 따른 전이를 정의하고, `connect`가
현재 Snapshot을 공개 API와 HTML·ARIA 속성 및 Event Handler로 연결하는 구조를
사용한다. Checkbox를 구현하면서 Controlled Prop인 `checked`와 내부
`checkedState` 중 현재 유효한 값을 구하기 위해 Machine에 `getCheckedState`를
추가했다. 기존 Button, Accordion, Dialog와 Core의 Openable에도 `getPressed`,
`getValue`, `getOpen`처럼 같은 역할을 하는 함수가 있어 이를 일관된 선례로
보았다.

이 방식은 전이와 `connect`가 동일한 상태 계산을 재사용할 수 있지만, Machine의
공개 계약이 `initial`과 `transition`을 넘어 현재 값을 조회하는 API까지 포함하게
한다. 그러면 사용자는 Pattern의 공개 상태를 `connect`를 통해 간접적으로 얻는
대신 Machine을 직접 조회할 수 있고, 현재 유효 상태를 해석하는 책임도 Machine과
`connect` 사이에 나뉜다. 특히 Controlled Pattern에서는 외부 Prop과 내부 State가
다를 수 있으므로, 둘을 조합한 현재 값을 어느 계층이 공개할지 명확히 할 필요가
있었다.

## 접근 방식

첫 번째 방식은 Machine에 Pattern별 조회 함수를 계속 제공하는 것이었다. 전이에
사용한 계산을 `connect`에서도 그대로 호출할 수 있어 중복을 줄이고 Machine 단위
테스트에서 현재 값을 직접 확인하기 쉽다. 그러나 Machine마다 `getOpen`,
`getPressed`, `getValue`, `getCheckedState` 같은 별도 확장이 생기며, 상태 전이라는
공통 Machine 계약만으로 Pattern을 다룰 수 없게 된다. 조회 함수가 공개되면
`connect`가 완성해야 할 Pattern API와 렌더링 결과를 거치지 않는 또 하나의 상태
접근 경로도 생긴다.

두 번째 방식은 Machine이 현재 유효 값을 직접 반환하거나 조회 API로 노출하지
않고, `connect`가 Actor의 Snapshot에 있는 Props와 State를 함께 읽어 공개 상태를
계산하는 것이었다. Machine은 다음 State를 결정해야 하므로 전이 내부에서는
Controlled Prop과 내부 State를 계속 해석한다. `connect`도 같은 기준을 자신의
목적인 공개 API와 HTML·ARIA 결과를 만들기 위해 사용하므로 일부 계산식이 반복될
수 있다. 하지만 두 계산은 하나의 공개 조회 함수를 공유하는 것이 아니라 각각
전이 결정과 결과 투영이라는 서로 다른 책임에 속한다.

기존 Journey에서는 저수준 Machine이 공통 상태 전이를 소유하고 Pattern의
`connect`가 Role, Parts, HTML·ARIA와 키보드 계약을 완성한다고 정했다. 현재 유효
상태를 Pattern의 공개 결과로 만드는 책임을 `connect`에 두는 방식이 이 경계를
더 일관되게 유지한다고 판단했다.

## 해결

Bison의 Machine은 `initial`과 `transition`으로 상태 전이만 제공한다. 전이를
계산하는 데 필요한 현재 값은 Machine 내부에서 Props와 State로 판단하지만,
`getOpen`, `getPressed`, `getValue`, `getCheckedState`처럼 현재 상태를 직접 읽는
함수를 Machine의 반환값이나 별도 Export로 제공하지 않는다. 전이 가능 여부처럼
현재 값을 조회하는 편의 함수도 공개 Machine 계약에 추가하지 않는다.

Pattern의 `connect`는 `actor.getSnapshot()`으로 얻은 Props와 State에서
Controlled와 Uncontrolled 상태를 구분해 현재 유효 값을 계산한다. 그 값은
`checked`, `open`, `pressed` 같은 Pattern API와 HTML·ARIA 속성 및 Event Handler를
통해 간접적으로 드러난다. Controlled 값이 내부 State와 다르더라도 사용자가
관찰하는 결과는 `connect`가 외부 Prop을 우선해 일관되게 만든다.

이 결정은 상태 조회 책임에 대한 경계다. `getInputProps`, `getRootProps`처럼
`connect`가 Pattern의 Parts에 적용할 속성을 만드는 API는 제거 대상이 아니다.
Machine은 상태 전이에, `connect`는 현재 상태의 공개 표현에 집중하며, 테스트도
Machine에서는 Event에 따른 전이를, `connect`에서는 Controlled와 Uncontrolled
상태가 만드는 공개 API와 HTML·ARIA 결과를 검증한다.

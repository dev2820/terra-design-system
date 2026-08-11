# Motion

Motion은 화면의 변화를 시간으로 연결하는 표현 축이다.

## 범위

Terra는 기능적인 Motion만 공통 Foundation에 포함한다. Motion을 제거했을 때
변화의 원인, 결과나 연속성을 이해하기 어려워지는 경우에만 사용하며, 같은 정보를
전달할 수 있다면 Motion을 사용하지 않는다. 장식이나 브랜드 표현을 위한 Motion은
제품에서 확장한다.

## Duration

Terra는 Duration을 `None`과 `Duration 1`부터 `Duration 3`까지로 구분한다.

```text
None < Duration 1 < Duration 2 < Duration 3
```

`None`은 Duration을 적용하지 않은 개념적 기준이며 별도의 값이나 토큰으로
제공하지 않는다.

숫자는 실제 시간, 일정한 차이나 배율을 뜻하지 않고 시간 길이의 순서만 나타낸다.
각 단계의 실제 시간은 Token Set이 정의한다.

Motion을 사용할 때에는 변화를 지각하고 원인과 결과 또는 이동 관계를 이해할 수
있는 가장 짧은 Duration을 선택하고, 시간이 부족할 때에만 다음 단계로 높인다.

## Easing

Terra는 시간에 따른 속도 변화를 다음 네 가지로 구분한다.

- `Linear`: 처음부터 끝까지 일정한 속도를 유지한다.
- `Ease-in`: 천천히 시작해 점차 빨라진다.
- `Ease-out`: 빠르게 시작해 점차 느려진다.
- `Ease-in-out`: 천천히 시작하고 중간에 빨라진 뒤 다시 느려진다.

Easing은 속도 변화만 나타내며 특정 목적이나 전환 방향을 뜻하지 않는다. 실제
곡선값은 Token Set이 정의하고, 상황에 맞는 Easing의 선택은 Recipe에서 정한다.

## 반응과 전환

사용자 행동에 대한 상태 변화와 피드백은 지연 없이 시작한다. Motion은 새로운
사용자 입력을 막지 않는다.

Motion이 진행되는 동안 새로운 상태가 발생하면 기존 Motion을 중단하고, 현재
보이는 상태에서 새로운 목표 상태로 전환한다.

## Reduced Motion

사용자가 Reduced Motion을 요청하면 Terra의 Duration과 Easing을 사용하는 모든
Motion을 제거하고 결과 상태를 즉시 보여준다. 모든 기능과 정보는 Motion이 없는
상태에서도 이해할 수 있어야 한다.

## Recipe의 역할

Motion의 대상, 방향, 경로와 조합은 Recipe에서 정한다. Foundation은 공통 Delay나
반복 방식을 제공하지 않으며, 필요한 Delay와 반복의 구성도 Recipe에서 정의한다.

## 확장

더 긴 Duration이 필요하면 `Duration 4`, `Duration 5`처럼 숫자를 이어서 추가한다.
새로운 단계는 앞 단계보다 길어야 하며 기존 단계 사이에 삽입하지 않는다. 시간의
길이는 음수가 될 수 없으므로 음수 Duration은 허용하지 않는다.

기본 Easing으로 표현할 수 없는 속도 변화가 필요하면 새로운 Easing을 추가할 수
있다.

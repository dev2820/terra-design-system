# Spacing

Spacing은 빈 공간을 통해 정보와 요소 사이의 관계를 드러낸다. 가까운 요소는
같은 맥락에 속한 것으로, 더 떨어진 요소는 다른 단위나 그룹으로 인식되도록
돕는다.

Spacing 자체는 새로운 Surface나 Boundary를 만들지 않는다.

## 범위

Spacing은 요소 사이, 컨테이너와 콘텐츠 사이, 화면 가장자리와 콘텐츠 사이의
모든 빈 공간에 공통으로 적용할 수 있다. Margin, Padding, Gap은 구현 방식일
뿐, Foundation에서는 모두 Spacing으로 다룬다.

가로와 세로는 같은 Spacing 척도를 사용한다.

## 단계

Terra는 Spacing을 `None`과 `Space 1`부터 `Space 7`까지의 단계로 구분한다.

```text
None < Space 1 < Space 2 < Space 3 < Space 4 < Space 5 < Space 6 < Space 7
```

각 단계는 다음 이름을 사용한다.

```text
space.none
space.1
space.2
space.3
space.4
space.5
space.6
space.7
```

`None`은 간격을 두지 않는 실제 선택지다. 숫자는 실제 값, 일정한 차이나
배율, 특정 용도를 뜻하지 않고 간격의 순서만 나타낸다.

`Space 1`부터 `Space 7`까지는 적용 위치와 방향에 관계없이 각각 같은 절대적인
간격을 나타낸다. 각 단계는 순서에 맞게 시각적으로 구분되어야 하며, 구체적인
값은 Token Set에서 정한다.

Terra는 음수 Spacing을 공통 단계로 제공하지 않는다.

## 확장

기본 단계보다 더 큰 간격이 필요하면 `space.8`, `space.9`처럼 숫자를 이어서
추가한다. 새로운 단계는 기존 단계 사이에 삽입하지 않는다.

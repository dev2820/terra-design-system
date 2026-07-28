# Elevation

Elevation은 요소가 기준면으로부터 얼마나 높이 떨어져 있는지를 나타내는 절대적인
시각적 높이다.

Elevation은 정보의 중요도, Surface의 중첩 단계나 특정 컴포넌트의 용도를 뜻하지
않는다. Resting과 Floating처럼 Elevation을 사용하는 구체적인 의미는 Recipe에서
정의한다.

## 단계

Terra는 Elevation을 `Elevation 1`, `Elevation 2`, `Elevation 3`의 세 단계로
구분한다.

```text
None < Elevation 1 < Elevation 2 < Elevation 3
```

`None`은 Elevation이 적용되지 않은 개념적 기준이다. 별도의 단계값이나 토큰으로
제공하지 않는다.

단계의 숫자는 실제 거리나 값의 배수를 뜻하지 않는다. 각 단계는 다음 단계보다
낮다는 순서만 보장한다.

## 절대 높이

- 같은 Elevation은 사용 위치나 부모의 Elevation과 관계없이 같은 높이를
  나타낸다.
- 부모의 Elevation과 자식의 Elevation을 더해서 계산하지 않는다.
- 부모보다 떠 있어야 하는 자식은 부모보다 높은 Elevation을 사용한다.
- 반드시 바로 다음 단계를 사용할 필요는 없다. `None` 위에 `Elevation 3`을
  사용하거나 `Elevation 1` 위에 `Elevation 3`을 사용할 수 있다.

## 겹침

서로 다른 Elevation의 요소가 겹치면 높은 Elevation이 낮은 Elevation 위에
배치되어야 한다. 같은 Elevation끼리의 앞뒤 순서는 Elevation이 결정하지 않는다.

Elevation은 실제 겹침 순서를 구현하는 값을 제공하지 않는다. `z-index`, Portal,
플랫폼의 Layer와 같이 요소를 실제로 배치하는 방법은 Recipe와 플랫폼 구현에서
정한다.

## 표현

Foundation은 각 Elevation을 그림자, Surface 색상, 테두리 또는 플랫폼 고유 효과
중 무엇으로 표현할지 정하지 않으며 실제 토큰값도 제공하지 않는다.

제품의 테마와 플랫폼 구현은 각 단계의 표현을 정의할 수 있다. 표현 방법이
달라져도 단계의 높이 순서를 유지하고 서로 다른 단계를 시각적으로 구분할 수
있어야 한다.

## 확장

공통 단계보다 더 높은 Elevation이 필요하면 `Elevation 4`를 추가할 수 있다.
확장한 단계는 `Elevation 3`보다 높아야 하며 기존 단계의 순서와 의미를 바꾸지
않는다.

Terra는 음수 Elevation을 공통 단계로 제공하지 않는다. 기준면보다 들어간 표현이
필요한 제품은 별도의 확장으로 정의할 수 있다.

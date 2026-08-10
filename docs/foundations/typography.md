# Typography

Typography는 문자를 읽기 쉽게 표현하고, 정보의 관계와 읽기 순서를 드러낼 수
있는 선택지를 제공한다.

## 범위

Terra는 Typography를 `Family`, `Size`, `Weight`, `Line Height`의 네 축으로
구분한다. Token Set은 아래 계약에 따라 각 축을 구체화한다.

자간과 Font Style은 공통 Foundation에 포함하지 않는다. 필요한 Token Set은
별도의 확장으로 정의할 수 있다.

## Family

Family는 문자 표현에 사용할 글꼴 계열이다. Family 사이에는 순서와 기본값이
없다.

모든 Token Set은 하나 이상의 Family를 정의한다. 필요한 Family의 이름과 개수는
Token Set이 정하며, 실제로 사용할 Family는 Recipe에서 선택한다.

## Size

Terra는 `Size 1`부터 `Size 7`까지 일곱 개의 크기 단계를 제공한다.

```text
Size 1 < Size 2 < Size 3 < Size 4 < Size 5 < Size 6 < Size 7
```

모든 Token Set은 일곱 단계의 값을 정의한다. 숫자는 실제 값, 일정한 차이나
배율, 특정 용도를 뜻하지 않고 크기의 순서만 나타낸다.

같은 Size의 값은 플랫폼이나 화면 조건에 따라 달라질 수 있다. 각 맥락 안에서는
일곱 단계의 순서가 유지되어야 하며, 인접한 단계는 시각적으로 구분되어야 한다.

## Weight

Terra는 다음 네 개의 굵기를 기본으로 제공한다.

```text
Regular  = 400
Medium   = 500
Semibold = 600
Bold     = 700
```

## Line Height

Terra는 Line Height를 `Tight`, `Standard`, `Loose`의 세 단계로 구분한다.

```text
Tight < Standard < Loose
```

각 단계는 행간의 구체적인 값이 아니라 밀도의 관계를 나타낸다. 실제 값은 Family,
Size, 플랫폼과 화면 조건에 따라 달라질 수 있으며, 같은 맥락에서는 단계의
순서를 유지해야 한다.

## 조합과 위계

Family, Size, Weight와 Line Height를 조합하는 방법은 Recipe에서 정한다.
Foundation은 완성된 Typography 스타일이나 축 사이의 우선순위를 정의하지
않으므로, 더 크거나 굵은 문자가 반드시 더 중요한 정보를 뜻하지 않는다.

## 가독성

사용되는 Size와 Line Height의 조합은 해당 맥락에서 문자를 식별하고 읽을 수
있어야 하며, 사용자의 글자 확대 설정을 방해하지 않아야 한다.

## 확장

기본 단계보다 더 큰 Size가 필요하면 `Size 8`, `Size 9`처럼 숫자를 이어서
추가한다. 새로운 단계는 기존 단계 사이에 삽입하지 않는다.

Weight는 `Thin 100`, `Extra Light 200`, `Light 300`, `Extra Bold 800`,
`Black 900`처럼 기본 범위의 위아래로 확장할 수 있으며, 이 밖의 굵기도 필요에
따라 추가할 수 있다.

Line Height와 Family도 필요에 따라 확장할 수 있다. 확장한 Size, Weight와 Line
Height는 기존 단계의 관계와 가독성 계약을 바꾸지 않는다.

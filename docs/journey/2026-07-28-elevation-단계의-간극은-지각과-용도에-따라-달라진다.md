# 2026-07-28 — Elevation 단계의 간극은 지각과 용도에 따라 달라진다

## 질문

Elevation을 여러 단계로 나눌 때 각 단계의 차이를 같은 숫자 간격으로 만들어야
하는지, 다른 디자인 시스템은 어떤 기준으로 간극을 구성하는지 확인할 필요가
있었다. 이 지식은 Terra가 단계 번호를 실제 거리나 값의 배수로 해석해야 하는지,
아니면 순서만 가진 개념적 척도로 정의해야 하는지를 판단하는 근거가 된다.

## 해답

조사한 디자인 시스템은 공통된 등간격 공식을 사용하지 않았다. 단계의 수, 이름,
실제 그림자 값과 단계 간 차이는 각 시스템이 표현하려는 지각적 거리와 사용
범위에 따라 달랐다.

[Material 3의 Elevation 토큰](https://android.googlesource.com/platform/frameworks/support/+/HEAD/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ElevationTokens.kt)은
Level 0부터 Level 5까지 `0`, `1`, `3`, `6`, `8`, `12dp`를 사용한다. 단계 번호와
실제 값이 일치하지 않고 인접한 값의 차이도 일정하지 않다. Material 3는
[그림자와 Surface의 색조 변화](https://developer.android.com/develop/ui/compose/designsystems/material3)를
함께 사용하므로, Elevation 차이는 하나의 그림자 수치만으로 결정되지 않는다.

[Fluent 2](https://fluent2.microsoft.design/elevation)는 `2`, `4`, `8`, `16`,
`28`, `64`의 Shadow 단계를 제공한다. 숫자는 주로 Blur 크기를 가리키며 높은
단계로 갈수록 인접한 값의 차이가 커진다. 또한 방향과 경계를 나타내는 Key
Shadow와 넓게 퍼져 거리를 나타내는 Ambient Shadow를 결합한다. 같은 단계라도
색이 있는 Surface에서는 동일한 높이로 보이도록 불투명도를 보정한다.

[Atlassian](https://atlassian.design/foundations/elevation/)은 `Sunken`,
`Default`, `Raised`, `Overlay`처럼 숫자가 아닌 용도로 단계를 구분하고, 높은
두 단계인 Raised와 Overlay에 Surface와 Shadow를 짝지어 사용한다. 이 구조에서는
간극을 산술적인 차이보다 서로 다른 공간 관계를 혼동하지 않게 하는 차이로
다룬다.

[Primer](https://primer.style/product/primitives/color/)는 하나의 연속된
Elevation 척도 대신 Shadow를 `Resting`과 `Floating` 계열로 나눈다. Resting은
XSmall·Small·Medium, Floating은 Small·Medium·Large·XLarge 크기를 제공한다.
Resting과 Floating이라는 구분은 얼마나 강한지만이 아니라 요소가 화면에 놓여
있는지, 다른 콘텐츠에서 떨어져 떠 있는지를 먼저 구분하게 한다. Primer 문서는
이 분류의 설계 이유를 직접 설명하지 않으므로 관계를 먼저 판단하게 한다는
해석은 토큰의 이름과 구성에서 얻은 추론이다.

[Carbon의 Menu 가이드](https://carbondesignsystem.com/components/menu/style/)는
메뉴 Overlay에 하나의 공통 `box-shadow`를 사용한다. 확인한 범위에서는 여러
Elevation 단계를 선택하게 하지 않는 사례이며, 모든 인터페이스가 다단계
Elevation을 필요로 하는 것은 아니라는 점을 보여준다.

따라서 Elevation의 단계 번호만으로 실제 값의 배수나 동일한 물리적 간격을
가정할 수 없다. 높아질수록 더 멀리 분리되어 보이고 필요한 단계끼리 구분된다는
관계가 중요하며, Offset, Blur, Spread와 불투명도의 실제 변화는 테마, 플랫폼과
표현 방식에 따라 비선형적일 수 있다. 이 결론은 조사한 시스템의 공통 표준을
뜻하는 것이 아니라, 서로 다른 공식 구현을 비교해 확인한 범위에 해당한다.

# 2026-07-29 — Foreground의 의미와 배경 관계를 두 체계로 분리하기

## 문제

Foreground는 시각적으로 항상 어떤 배경 위에 놓이지만, 그 의미까지 배경에
종속시킬지는 별도의 선택이었다. Background마다 전용 Foreground를 짝지으면
테마에서 두 값을 함께 바꾸고 대비가 깨지는 조합을 차단하기 쉽다. 그러나
Foreground가 배경과의 관계만 나타내면 Surface 위에서 제목, 본문과 보조 정보의
위계를 구분하거나 브랜드와 위험의 의미를 콘텐츠 자체에 부여하기 어렵다.

반대로 Foreground를 배경과 독립된 Semantic color로만 제공하면 콘텐츠의 위계와
의미를 직접 표현하고 여러 Surface에서 재사용하기 쉽다. 하지만 어떤 Foreground를
어떤 Background 위에 사용할 수 있는지 별도의 호환 규칙이 필요하고, 사용자가
대비가 부족한 조합을 만들 가능성도 커진다. Terra가 표현의 유연성을 유지하면서도
사용 규칙을 간단하고 예측 가능하게 만들려면 두 책임을 구분할 필요가 있었다.

## 접근 방식

먼저 각 Semantic Background가 Foreground를 소유하는 구조를 검토했다.
`primary.background`와 `primary.foreground`처럼 표현 전체를 쌍으로 제공하면
테마를 변경할 때 안전하고 사용자가 추가 판단을 하지 않아도 된다. 반면 같은
Foreground 값이 여러 Background에 반복될 수 있고, `brand.foreground`가 브랜드
의미를 가진 콘텐츠인지 Brand Background 위의 콘텐츠인지 모호해진다. 하나의
Surface 위에서 여러 단계의 정보를 표현하기도 어렵다.

Foreground를 완전히 독립시키는 구조에서는 Neutral의 정보 위계와 Brand·Danger의
의미를 콘텐츠 자체에 부여할 수 있다. 하지만 독립된다는 말을 모든 Background와
자유롭게 조합할 수 있다는 뜻으로 받아들이기 쉽고, 허용하거나 금지해야 할
조합을 많이 설명해야 한다. Content Foreground를 Color Background에도 허용하는
혼합 방식 역시 On-color의 고유한 역할을 약하게 만들고 선택지를 다시 사용처에
넘기는 문제가 있었다.

이에 따라 두 종류를 함께 제공하되 사용 영역을 겹치지 않게 나누는 방식을
선택했다. 복잡한 정보 구조를 담는 Surface와 하나의 행동 색상 표현은 목적이
다르므로, 각각에 필요한 Foreground의 책임도 분리할 수 있다고 판단했다.

## 해결

Terra는 Foreground를 `Content Foreground`와 `On-color`의 두 체계로 나눈다.
Content Foreground는 Surface 위에서 정보의 위계와 의미를 나타낸다. Neutral은
Strong·Default·Muted의 정보 강도를 제공하고, Brand와 Danger는 각각 브랜드와
위험의 의미를 제공한다. 텍스트, 아이콘과 의미를 전달하는 기호가 같은 역할을
나타내면 같은 Content Foreground를 사용한다.

On-color는 독립적인 정보 위계나 의미를 나타내지 않고, 공식 Color 표현과
짝을 이루어 그 안의 콘텐츠를 알아볼 수 있게 한다. Surface에는 Content
Foreground만, Color 표현에는 대응하는 On-color만 사용한다.

두 체계가 같은 실제 색상값을 참조하는 것은 허용하지만 이를 이유로 서로 바꾸어
사용하지 않는다. 값의 우연한 일치보다 토큰이 나타내는 의미와 사용 조건을
유지함으로써, Surface에서는 콘텐츠의 위계를 표현하고 Color 표현에서는
Background와 Foreground의 안전한 관계를 예측할 수 있게 한다.

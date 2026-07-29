# Foreground

Foreground는 Surface나 Color 표현 위에서 텍스트, 아이콘과 기호를 통해 정보와
의미를 전달하는 색이다.

Terra는 Foreground를 `Content Foreground`와 `On-color`로 구분한다. 두 종류는
실제 색상값이 같을 수 있지만 의미와 사용할 수 있는 영역이 다르다.

## Content Foreground

Content Foreground는 Surface 위에서 콘텐츠의 위계와 의미를 표현한다.

### Neutral

Neutral Foreground는 정보의 강도를 나타낸다.

```text
Strong > Default > Muted
```

- `Strong`은 제목이나 핵심 정보처럼 강하게 드러내야 하는 콘텐츠에 사용한다.
- `Default`는 본문과 일반적인 콘텐츠에 사용한다.
- `Muted`는 보조 설명이나 메타데이터처럼 상대적으로 약하게 보여야 하는
  콘텐츠에 사용한다.

### Brand

Brand Foreground는 Surface 위에서 브랜드 의미를 전달하는 콘텐츠에 사용한다.
Brand는 정보의 강도를 뜻하지 않으며 Neutral Foreground의 위계를 대신하지
않는다.

### Danger

Danger Foreground는 Surface 위에서 위험하거나 되돌리기 어려운 결과를 나타내는
콘텐츠에 사용한다. Danger는 정보의 강도를 뜻하지 않으며 Neutral Foreground의
위계를 대신하지 않는다.

## Content Foreground의 범위

Content Foreground는 다음 요소에 공통으로 사용한다.

- 텍스트
- 아이콘
- 의미를 전달하는 기호

텍스트와 아이콘이 같은 의미와 위계를 나타낸다면 같은 Foreground를 사용한다.
Border, 장식용 그래픽과 일러스트레이션의 표현 색은 Content Foreground에
포함하지 않는다.

## Surface와 Content Foreground

Surface 위에는 Content Foreground만 사용한다. On-color는 Surface 위에서
사용하지 않는다.

Terra는 다음 Content Foreground 집합을 제공한다.

```text
fg.neutral.strong
fg.neutral.default
fg.neutral.muted
fg.brand
fg.danger
```

`Inverse Foreground`는 제공하지 않는다. Surface 사이의 색상 관계와 명암 방향에
관한 제약은 [Surface](surface.md#색상-관계)에서 정의한다.

## On-color

On-color는 공식 Color 표현 내부에서 사용하는 Foreground다. On-color는
독립적인 정보 위계나 의미를 나타내지 않고, 대응하는 Color 표현 위에서 콘텐츠를
알아볼 수 있게 한다.

모든 공식 Color 표현은 하나의 On-color를 가진다.

```text
Solid → 채워진 Background + On-color 하나
Soft  → 낮은 강조의 Background + On-color 하나
Ghost → 투명한 Background + On-color 하나
```

Ghost는 실제 Background 값이 투명하지만 의미적으로는 Color 표현에 속한다.
따라서 Ghost 내부에서도 Content Foreground가 아니라 대응하는 On-color를
사용한다.

```text
Brand Ghost  → on.brand.ghost
Neutral Ghost → on.neutral.ghost
Danger Ghost → on.danger.ghost
```

On-color는 대응하는 Color 표현 안에서만 사용하며, 다른 Color Background나
Surface에서 사용하지 않는다.

On-color와 Content Foreground가 같은 실제 색상값을 참조할 수는 있지만, 이를
이유로 서로 바꾸어 사용하지 않는다.

## Color 표현의 제약

여러 Foreground 강도를 사용해야 하는 복잡한 정보 컨테이너는 Color Background가
아니라 Surface로 구성한다. 행동 색상의 Background는 여러 단계의 제목, 본문과
보조 정보를 가진 Colored Card를 만들기 위한 용도로 사용하지 않는다.

새로운 Tone을 추가할 때에는 기존 `Solid`, `Soft`, `Ghost` Emphasis 구조를
따른다. 실제로 필요한 Emphasis만 제공하되, 제공하는 모든 Color 표현에는
On-color 하나가 함께 있어야 한다.

Content Foreground의 공통 집합은 추가로 확장하지 않는다.

## 접근성

Terra의 기본값과 테마에서 Surface나 Color 값을 변경한 결과는 다음 관계를
검증해야 한다.

- 모든 Surface와 모든 Content Foreground의 조합
- Color Background와 대응하는 On-color의 조합
- Ghost의 On-color와 Ghost가 사용되는 Surface의 조합

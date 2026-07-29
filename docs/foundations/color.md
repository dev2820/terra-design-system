# Color

Terra의 Color Foundation은 하나의 색상 표현을 모든 제품에 강제하지 않으면서,
색상이 전달하는 의미와 요소 사이의 관계를 일관되게 유지하기 위한
계약이다.

## 범위

이 문서는 행동 색상에 공통으로 필요한 구조와 관계를 정의한다.

아직 필요가 확인되지 않은 Tone과 Emphasis의 모든 조합을 미리 생성하지
않는다. 공식 recipe에서 사용하거나 반복되는 제품 요구가 확인된 조합부터
토큰으로 제공한다.

## 토큰 계층

Color는 [공통 토큰 계층](../FOUNDATIONS.md#토큰-계층)을 따른다. Primitive
color는 실제 색상값과 명도 척도를 관리하고, Semantic color는 색상이 수행하는
역할과 관계를 나타낸다. 제품 화면과 컴포넌트는 Primitive color를 직접 사용하지
않는다.

행동 색상의 의미는 `Tone`과 `Emphasis`로 나누어 정의한다.

## Tone

Tone은 행동의 위계가 아니라 색상이 전달하는 의도를 나타낸다.

### Brand

Brand는 브랜드를 드러내는 행동 표현에 사용한다. Brand가 항상 Primary이거나
가장 강한 위계를 뜻하지는 않는다.

### Neutral

Neutral은 브랜드나 위험의 의미를 강조하지 않는 일반적인 행동 표현에 사용한다.
Neutral은 Secondary 전용 Tone이 아니다.

### Danger

Danger는 삭제나 해지처럼 위험하거나 되돌리기 어려운 결과를 갖는 행동에
사용한다. Danger는 행동의 중요도를 뜻하지 않으므로 Primary, Secondary 등 서로
다른 행동 위계에 놓일 수 있다.

## Emphasis

Terra는 행동 색상의 표현 단계를 `Solid`, `Soft`, `Ghost`로 구분한다. 공개
이름은 시각적 처리 방식을 나타내고, 각 이름은 다음의 강조 단계에 대응한다.

| Emphasis | 강조 단계 | 의미 |
| --- | --- | --- |
| `Solid` | Strong | 컨테이너가 강하게 채워진 표현 |
| `Soft` | Moderate | 낮은 대비로 채워진 표현 |
| `Ghost` | Minimal | 기본 상태에서 컨테이너가 드러나지 않는 표현 |

같은 표면과 같은 행동 그룹 안에서는 Tone과 관계없이 다음 관계를 유지한다.

```text
Solid > Soft > Ghost
```

Brand Solid, Neutral Solid와 Danger Solid는 모두 Strong 단계에 속한다. 따라서
하나를 Primary에 사용하면서 다른 Solid를 더 낮은 행동 위계에 사용할 수 없다.

Emphasis 단계는 모두 사용할 필요가 없다. 중간 단계를 생략해 더 큰 차이를 만들
수 있다.

`Primary`, `Secondary`, `Tertiary`는 행동의 우선순위이고 `Solid`, `Soft`,
`Ghost`는 시각적 강조 단계이므로 둘을 고정된 일대일 관계로 보지 않는다.

같은 Emphasis에 속한다는 것은 서로 다른 Tone이 완전히 같은 정도로 눈에 띈다는
뜻이 아니라, 같은 위계 등급으로 취급한다는 뜻이다. 실제 색상의 색조, 채도,
명도와 주변 표면에 따라 주목도가 달라질 수 있으므로 모든 공식 테마에서 의도한
관계가 성립하는지 검증한다. 관계를 유지할 수 없는 조합은 값을 조정하거나 같은
행동 그룹에서 사용하지 않는다.

## 행동 위계와 recipe

색상 토큰은 Tone과 Emphasis를 제공하고, 컴포넌트와 패턴의 recipe는 이를
`Primary`, `Secondary`, `Tertiary` 행동에 연결한다. 위계를 보장하는 책임을
개별 화면의 디자이너에게 맡기지 않는다.

Brand를 사용하는 recipe는 다음과 같이 구성할 수 있다.

```text
Primary   → Brand Solid
Secondary → Neutral Soft
Tertiary  → Neutral Ghost
```

브랜드 색상을 사용하지 않는 맥락에서는 다음과 같이 표현할 수 있다.

```text
Primary   → Neutral Solid
Secondary → Neutral Soft
Tertiary  → Neutral Ghost
```

위험한 행동이 Primary인 경우에는 Danger Tone을 사용한다.

```text
Primary destructive → Danger Solid
Secondary            → Neutral Soft 또는 Neutral Ghost
```

중간 Emphasis를 생략한 recipe도 가능하다.

```text
Primary   → Brand Solid
Secondary → Neutral Ghost
```

제품은 문서화된 recipe 단위로 연결 관계를 변경하거나 확장할 수 있다. 같은 행동
그룹의 개별 인스턴스에서 Tone과 Emphasis를 임의로 조합해 위계를 바꾸지 않는다.

## 테마와 확장

Terra는 Semantic color의 공식 기본값을 제공한다. 제품은 Terra 패키지의 원본을
수정하는 대신 제품 테마에서 Primitive와 Semantic color의 연결을 재매핑한다.

재매핑할 때에는 다음 계약을 유지한다.

- 같은 Token의 의미와 사용 목적을 바꾸지 않는다.
- 같은 행동 그룹에서 `Solid > Soft > Ghost` 관계를 유지한다.
- 기존 의미로 설명되지 않는 제품 고유의 필요는 제품 범위의 Semantic token으로
  추가한다.

제품에서 추가한 Semantic token은 여러 제품에서 반복되는 공통 필요와 안정된
의미가 확인된 뒤 Terra의 공통 토큰으로 승격할 수 있다.

## 접근성

Semantic color의 이름이나 Emphasis 단계만으로 접근성이 보장되지는 않는다.
Terra의 기본값과 제품이 재매핑한 모든 공식 recipe는 실제 사용되는 표면에서
검증해야 한다.

- 행동 위계와 위험을 색상만으로 전달하지 않는다.

Background와 Foreground의 조합 및 검증 규칙은
[Foreground](foreground.md)에서 정의한다.

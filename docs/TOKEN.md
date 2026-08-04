# Token

## 역할과 범위

토큰은 Foundation의 개념을 이름이 있는 값 또는 값에 대한 참조로 구체화한다. 토큰은 값과 참조만 다루며, 토큰의 사용과 조합은 Recipe가 결정한다. 컴포넌트의 구조와 행동은 토큰의 범위에 포함하지 않는다.

## 토큰 계층

토큰은 Primitive Token과 Semantic Token의 두 단계로 구성한다.

### Primitive Token

Primitive Token은 가공되지 않은 값을 이름으로 관리하며, 값이 사용되는 맥락이나 의미를 나타내지 않는다.

```text
color.orange.600
spacing.4
radius.2
```

### Semantic Token

Semantic Token은 Foundation이 정의한 의미를 표현한다.

```text
bg.brand.solid
surface.base
elevation.1
```

토큰은 `Primitive Token → Semantic Token → Recipe에서 사용`하는 순서로 구체화한다. 특정 사용처를 나타내는 Recipe Token은 공통 토큰 계층에 포함하지 않는다.

## 참조 규칙

Primitive Token은 실제 값을 가진다. Semantic Token은 Primitive Token을 참조하거나 실제 값을 직접 가질 수 있으며, 모든 Semantic Token이 반드시 Primitive Token을 거칠 필요는 없다.

팔레트나 척도에 속하는 값 또는 여러 의미가 의도적으로 공유하는 값은 Primitive Token으로 정의한다. 특정 의미에만 속하고 재사용할 필요가 없는 값은 Semantic Token에 직접 정의할 수 있다. 현재 값이 같다는 사실만으로 여러 Semantic Token을 하나의 Primitive Token에 연결하지 않는다.

참조하는 토큰과 참조되는 토큰은 같은 값의 타입이어야 한다. 순환 참조와 존재하지 않는 토큰에 대한 참조는 허용하지 않는다.

## 네이밍 규칙

토큰 이름은 영문 소문자로 작성하고, 넓은 범위에서 구체적인 범위 순으로 배치한다. 각 범위는 마침표(`.`)로 구분한다. `primitive`와 `semantic`은 토큰 이름에 포함하지 않는다.

Primitive Token의 이름은 값의 속성과 척도를 나타내며 사용 목적을 포함하지 않는다.

```text
color.orange.600
spacing.4
radius.2
```

Semantic Token의 이름은 실제 값이 아니라 Foundation에서 정의한 이름을 사용한다. 실제 값, 단위, 컴포넌트와 플랫폼의 이름은 포함하지 않는다. 각 토큰의 의미와 사용 규칙은 해당 Foundation에서 정의한다.

### 기본 Semantic Token

```text
bg.brand.solid
bg.brand.soft
bg.brand.ghost
bg.neutral.solid
bg.neutral.soft
bg.neutral.ghost
bg.danger.solid
bg.danger.soft
bg.danger.ghost

on.brand.solid
on.brand.soft
on.brand.ghost
on.neutral.solid
on.neutral.soft
on.neutral.ghost
on.danger.solid
on.danger.soft
on.danger.ghost

fg.neutral.strong
fg.neutral.default
fg.neutral.muted
fg.brand
fg.danger

surface.base
surface.layer1
surface.layer2

boundary.subtle
boundary.default
boundary.width

elevation.1
elevation.2
elevation.3
```

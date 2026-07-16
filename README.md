# Terra Design System

## 프로젝트 소개

Terra Design System은 @dev2820 이 재사용 가능한 UI 컴포넌트와 디자인 토큰의 설계 과정을 학습하기 위해 만든 개인용 React 디자인 시스템입니다.

Ark UI의 headless 컴포넌트를 기반으로 동작과 접근성을 구성하고, Tailwind CSS와 Tailwind Variants를 활용해 일관된 스타일과 variant를 적용했습니다. 각 컴포넌트의 상태와 사용 방법은 Storybook에서 확인할 수 있습니다.

[Storybook](https://dev2820.github.io/terra-design-system/)

### 설치

현재 React 18을 공식 지원하며 19는 지원 예정입니다.

```bash
npm install terra-design-system
```

## 기술 스택

- React
- TypeScript
- Ark UI
- Tailwind CSS
- Tailwind Variants

## 설계

headless UI의 동작 위에 디자인 토큰과 스타일 규칙을 입혀 React 컴포넌트로 제공하는 구조

### 디자인 토큰

컴포넌트가 특정 색상이나 수치에 직접 의존하지 않도록 값을 primitive token과 semantic token으로 분리해 tailwind로 조합하여 사용할 수 있게 했습니다.

```text
Primitive Token
      ↓
Semantic Token
      ↓
Tailwind Theme
      ↓
Tailwind Utility
      ↓
React Component
```

### Ark UI를 선택한 이유

먼저 core로 동작할 라이브러리 선택이 있었습니다. 직접 구현하는 것도 방법이겠지만, 그건 너무 시간이 오래 걸리며 이 라이브러리의 취지와도 맞지 않았습니다.

라이브러리를 다양한 웹사이트에 적용하는 것을 목적으로 했기 때문에 충분히 유연성을 갖춰야했습니다. 다음의 조건으로 라이브러리 탐색을 했습니다.

- Headless할 것
- [W3C ARIA Patterns](https://www.w3.org/WAI/ARIA/apg/patterns/)를 따라 키보드 조작, aria 같은 웹 표준을 충족할 것
- 충분히 풍부한 컴포넌트를 지원할 것

[Ark UI](https://ark-ui.com/), [Radix](https://www.radix-ui.com/), [Headless UI](https://headlessui.com/), [React ARIA](https://react-aria.adobe.com/) 등의 후보군이 있었고, 그 중 다음을 근거로 **Ark UI**를 선택했습니다.

- DatePicker,File Upload를 포함해 폭넓은 UI primitive를 제공합니다.
- Framework Agnostic하기 때문에 이후 동일 패턴으로 다른 프레임워크를 지원할 수 있습니다.
- data-\* 속성을 기반으로 동작하므로 외부에서 상태에 기반해 스타일을 변경하기 유리합니다.

### 컴포넌트는 어떤 패턴으로 작성되어야할까?

우선 Compound 패턴을 우선적으로 따를 것을 고려했습니다. 이 패턴을 따른다는 것은 각 파트의 스타일 변경과 커스텀 요소로 파트 교체가 가능하므로 상황에 따라 유연한 사용이 가능함을 의미합니다.

```tsx
<Card.Root {...props}>
  <Card.Header>
    <Card.Title>Sign in</Card.Title>
    <Card.Description>Welcome! Begin your journey here</Card.Description>
  </Card.Header>
  <Card.Content className="trds-flex trds-flex-col">
    <Input type="text" placeholder="your email" className="trds-mb-2" />
    <Input type="password" placeholder="your password" />
  </Card.Content>
  <Card.Footer className="trds-flex trds-flex-row trds-gap-4">
    <Button className="trds-flex-1">Sign in</Button>
    <Button theme="primary" className="trds-flex-1">
      🚀 Sign up
    </Button>
  </Card.Footer>
</Card.Root>
```

하지만 이 방식은 반대로 간단한 내용도 코드가 길어진다는 단점이 있습니다. 따라서 일부 `NumberInput`과 같은 컴포넌트는 조합가능성을 없애고 완성형으로만 사용하도록 지원했습니다.

```tsx
<NumberInput {...props} />
```

어떤 패턴을 지원할지는 이 컴포넌트가 **얼마나 구조적으로 자유로운가**를 기준으로 결정했습니다. 예를 들어 Card는 상황에 따라 input이 포함되기도 하고, Footer에 버튼이 있기도, 없기도 합니다. 하지만 NumberInput은 increase 버튼만 있고, descrease 버튼은 없어야하는 상황이 거의 없는 컴포넌트입니다.

하지만, 이렇게 컴포넌트에 따라 다른 패턴을 지원한다는 점이 기준이 모호하고 일관성이 없게 여겨져 더 좋은 방향에 대한 고민이 남아있습니다.

### Tailwind를 쓰는 프로젝트와 쓰지 않는 프로젝트 모두 지원할 수 있을까?

이 라이브러리 구현에 tailwind를 쓴 이유는 ArkUI가 data-\* 형태의 attribute를 지원해 자바스크립트 없이 스타일을 붙이기 편했기 때문입니다.

### 고민과 학습

다음의 학습과 고민이 있었습니다.

- 실제 컴포넌트 라이브러리들은 어떻게 구현되었고, 어떻게 배포하게 될지 경험합니다.
- 어떻게 디자인 시스템이 테마에서 자유로울 것인가? (토큰 기반 설계)
- 컴포넌트는 어떤 패턴으로 작성되어야할까? (variant)
- tailwind를 쓰지 않는 라이브러리에선 어떻게 충돌을 방지할 것인가? (trds prefix)
- 개별 컴포넌트 설치 방식이 좋은가, 전체 설치 방식이 좋은가?

## 목표와 범위

## 기술 선택과 설계 의도

### Tailwind CSS

디자인 토큰을 utility class로 연결하고, 스타일을 각 컴포넌트 가까이에서 관리하기 위해 사용했습니다. 컴포넌트의 상태 스타일은 JavaScript 조건문 대신 Ark UI가 제공하는 `data-*` 속성과 Tailwind variant를 연결하여 표현합니다.

라이브러리를 사용하는 애플리케이션의 Tailwind 클래스와 충돌하지 않도록 모든 utility class에 `trds-` prefix를 적용했습니다.

### Tailwind Variants

컴포넌트의 공통 스타일과 `size`, `theme`, `variant`, 상태별 스타일을 선언적으로 관리하기 위해 사용했습니다. 여러 조건이 함께 적용되는 스타일은 compound variant로 정의하며, `VariantProps`를 이용해 스타일 정의로부터 컴포넌트 props 타입을 추론합니다.

### Primitive Token

Primitive token은 값 자체를 표현합니다. 색상 팔레트, 간격, 글자 크기, 굵기, radius, shadow, opacity, z-index, transition duration 및 animation 값을 정의합니다.

```ts
colors.violet[500];
colors.gray[200];
spacing[4];
radii.lg;
zIndex.modal;
duration[300];
```

Primitive token은 특정 컴포넌트나 사용 목적을 알지 못하며, 디자인 시스템에서 사용할 수 있는 기본 값의 집합 역할을 합니다.

### Semantic Token

Semantic token은 primitive token을 UI의 역할과 상태에 맞는 이름으로 다시 정의합니다.

```ts
colors.primary;
colors.danger;
colors.fg.placeholder;
colors.boundary.input;
colors.layer.popover;
```

컴포넌트는 가능한 한 `violet.500` 같은 실제 값보다 `primary`, `fg`, `boundary`, `layer`처럼 사용 목적을 나타내는 토큰에 의존합니다. 이를 통해 실제 색상값이 변경되더라도 컴포넌트의 스타일 정의를 수정하지 않고 전체 색상 체계를 변경할 수 있습니다.

### 테마 커스터마이징

Semantic token은 CSS Custom Property와 기본값을 함께 사용합니다.

```ts
primary: `var(--my-colors-primary, ${TOKEN.colors.violet[500]})`;
```

CSS 변수가 선언되지 않으면 primitive token을 기본값으로 사용하고, 사용자가 변수를 재정의하면 컴포넌트 코드를 변경하지 않고 테마를 변경할 수 있습니다.

```css
:root {
  --my-colors-primary: #2563eb;
  --my-colors-primary-strong: #1d4ed8;
  --my-colors-primary-stronger: #1e40af;
}
```

## 컴포넌트 설계

Terra Design System은 headless UI가 제공하는 동작 위에 디자인 토큰과 스타일 규칙을 입혀 React 컴포넌트로 제공하는 구조입니다.

```text
Ark UI Primitive
      ↓
Terra Component Wrapper
      ├── Design Token
      ├── Tailwind Utility
      ├── Variant API
      └── className / ref / native props
      ↓
Application
```

### Headless UI 기반 구조

컴포넌트의 책임은 다음과 같이 구분합니다.

| 계층                | 책임                                                   |
| ------------------- | ------------------------------------------------------ |
| Ark UI              | 상태 관리, 키보드 상호작용, focus 처리, ARIA 기반 제공 |
| Terra Design System | 디자인 토큰, 스타일, variant 및 컴포넌트 조합 API 제공 |
| 사용자 애플리케이션 | 콘텐츠, 비즈니스 로직 및 상태 연결                     |

Button처럼 하나의 HTML 요소를 중심으로 하는 컴포넌트는 단일 컴포넌트로 제공합니다. 네이티브 HTML 속성을 확장하고 `forwardRef`로 DOM ref를 전달하며, `loading`과 같은 디자인 시스템 고유의 상태를 추가합니다.

Dialog, Select, Field처럼 여러 요소가 함께 동작하는 컴포넌트는 compound component로 제공합니다.

```tsx
<Dialog.Root>
  <Dialog.Trigger>열기</Dialog.Trigger>
  <Portal>
    <Dialog.Backdrop />
    <Dialog.Positioner>
      <Dialog.Content>
        <Dialog.Title>제목</Dialog.Title>
        <Dialog.Description>설명</Dialog.Description>
        <Dialog.CloseTrigger>닫기</Dialog.CloseTrigger>
      </Dialog.Content>
    </Dialog.Positioner>
  </Portal>
</Dialog.Root>
```

복합 컴포넌트의 하위 요소를 하나의 namespace로 묶어 제공하므로 사용자는 필요한 요소를 조합해 구조를 만들 수 있습니다. 라이브러리는 구조 전체를 하나의 컴포넌트로 고정하지 않고 각 요소의 관계와 기본 스타일을 제공합니다.

### Variant 관리

컴포넌트의 스타일은 Tailwind Variants를 통해 `base`, `variants`, `compoundVariants`, `defaultVariants`로 구분합니다.

```ts
const buttonVariants = tv({
  base: ['공통 스타일'],
  variants: {
    variant: {
      filled: '',
      outline: '',
      ghost: '',
    },
    theme: {
      primary: '',
      neutral: '',
      danger: '',
    },
    size: {
      xs: '',
      sm: '',
      md: '',
      lg: '',
    },
  },
  compoundVariants: [],
  defaultVariants: {
    variant: 'filled',
    theme: 'neutral',
    size: 'md',
  },
});
```

- `base`: 모든 인스턴스에 적용되는 공통 스타일
- `variants`: 하나의 prop에 따라 달라지는 스타일
- `compoundVariants`: 둘 이상의 prop 조합에 따라 달라지는 스타일
- `defaultVariants`: prop이 생략됐을 때 사용할 기본값

Dialog와 Field 같은 복합 컴포넌트는 Tailwind Variants의 slot을 이용해 하위 요소별 스타일을 하나의 recipe로 관리합니다. Root에서 생성한 slot class를 React Context에 저장하고 각 하위 컴포넌트가 자신의 class를 가져와 사용합니다. 이 구조는 Root의 variant를 모든 하위 요소에 전달할 수 있는 확장 지점도 제공합니다.

Ark UI가 DOM에 추가하는 상태 속성은 Tailwind의 data variant와 연결합니다.

```text
Ark UI 상태 변경
      ↓
data-open, data-checked, data-disabled 등의 속성 변경
      ↓
Tailwind 상태 variant 적용
      ↓
스타일과 애니메이션 변경
```

```tsx
data-open:trds-animate-dialog-in
data-closed:trds-animate-dialog-out
data-checked:trds-bg-primary
data-invalid:trds-border-danger
data-disabled:trds-bg-layer-muted
```

### 스타일 충돌 방지

라이브러리와 사용자 애플리케이션이 모두 Tailwind CSS를 사용하는 경우를 고려해 디자인 시스템의 모든 utility class에 `trds-` prefix를 적용했습니다.

조건부 class 조합에는 `clsx`를 사용하고, 충돌하는 Tailwind class 정리에는 `tailwind-merge`를 사용합니다. `tailwind-merge`에도 `trds-` prefix를 설정하여 컴포넌트의 기본 class와 사용자가 전달한 `className`을 병합할 수 있도록 했습니다.

```tsx
<Button className="trds-h-12">저장</Button>
```

각 컴포넌트의 variant recipe에는 `__trds` scope도 포함합니다. 이 식별자는 디자인 시스템 컴포넌트의 범위를 표시하기 위한 것이며, 현재 중복 생성 문제는 Roadmap에서 개선 과제로 관리하고 있습니다.

### 컴포넌트 API

컴포넌트 API는 React와 Ark UI의 기존 사용 방식을 가능한 한 유지하도록 구성했습니다.

- 네이티브 HTML 또는 Ark UI 컴포넌트의 props 확장
- `forwardRef`를 통한 실제 DOM 요소의 ref 전달
- `VariantProps`를 통한 variant 타입 추론
- `className`을 통한 기본 스타일 확장
- Ark UI 원본 타입의 재노출
- 복합 컴포넌트의 namespace API 제공

단순 컴포넌트는 `Button`, `Badge`, `Input`처럼 직접 export하고, 복합 컴포넌트는 `Dialog.Root`, `Dialog.Content`처럼 하위 요소를 하나의 객체에 묶어 export합니다. 모든 컴포넌트는 React 패키지의 단일 진입점에서 다시 export됩니다.

## 프로젝트 구조

```text
terra-design-system
├── apps
│   └── react
│       ├── .storybook       # Storybook 설정
│       └── src
│           ├── Button       # 컴포넌트, story, 문서
│           ├── Dialog
│           ├── Select
│           ├── cx.ts        # class 조합 및 충돌 정리
│           ├── tv.ts        # Tailwind Variants 공통 함수
│           ├── index.css    # Tailwind CSS 진입점
│           └── index.ts     # React 패키지 공개 API
├── packages
│   ├── env                  # 공통 scope 식별자
│   ├── theme                # primitive/semantic design token
│   ├── tsconfig             # 공통 TypeScript 설정
│   └── utils                # 공통 유틸리티
└── .github
    └── workflows            # Storybook 배포 자동화
```

각 컴포넌트 폴더에는 구현 파일, 공개 API를 정의하는 `index.ts`, Storybook story 및 컴포넌트 문서를 함께 배치합니다. 컴포넌트에 필요한 파일을 가까이 두고, React 패키지의 루트 `index.ts`에서 외부 공개 API를 한 번에 관리합니다.

## 설치 및 사용 방법

### 설치

### 스타일 불러오기

### 기본 사용 예시

## 로컬 개발

### 요구 사항

### 의존성 설치

### Storybook 실행

### 테스트

### 빌드

## 배포 구조

### 라이브러리 빌드

React 컴포넌트와 CSS는 별도의 과정으로 빌드합니다.

```text
src/index.ts
      ↓ tsup
dist/index.mjs + dist/index.js + dist/index.d.ts

src/index.css
      ↓ Tailwind CSS CLI
dist/style.css
```

tsup은 하나의 React 진입점을 기준으로 다음 형식을 생성합니다.

- ESM
- CommonJS
- TypeScript declaration
- Source map

React와 React DOM은 번들에 포함하지 않고 외부 의존성으로 처리합니다. 현재 `splitting: false`로 설정되어 있어 컴포넌트별 파일이 아닌 하나의 진입점 중심으로 빌드합니다.

루트 패키지는 컴포넌트와 CSS 경로를 분리해 공개합니다.

```tsx
import { Button } from 'terra-design-system/react';
import 'terra-design-system/react/style';
```

현재는 모든 컴포넌트를 하나의 패키지에서 제공하며, 컴포넌트별 개별 설치와 core 패키지 분리는 Roadmap에서 검토하고 있습니다.

### Storybook 배포

각 컴포넌트의 story를 정적 Storybook으로 빌드하고 GitHub Pages에 배포합니다. main 브랜치의 `apps/react` 관련 파일이 변경되면 GitHub Actions가 의존성을 설치하고 utils 및 Storybook을 빌드한 뒤 생성된 `storybook-static` 디렉터리를 배포합니다. Pull Request에서는 Storybook 빌드 단계까지 실행하고 실제 Pages 배포는 수행하지 않습니다.

## 구현하면서 고민한 점

## 배운 점

## 현재 한계

## Roadmap

### v1

- [ ] Ark UI 4.0 버전으로 업그레이드
  - [ ] Text 사이즈 대응
- [ ] `__trds` 중복 생성 문제 해결

### v2

- [ ] 컴포넌트별 개별 설치 구조로 변경
  - [ ] Core 분리
  - [ ] 개별 컴포넌트 분리
- [ ] Ark UI와 Tailwind Variants를 peer dependency로 분리

## 라이선스

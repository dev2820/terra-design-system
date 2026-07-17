# Terra Design System

## 프로젝트 소개

Terra Design System은 @dev2820 이 재사용 가능한 UI 컴포넌트와 디자인 토큰의 설계 과정을 학습하기 위해 만든 개인용 React 디자인 시스템입니다.

Ark UI의 headless 컴포넌트를 기반으로 동작과 접근성을 구성하고, Tailwind CSS와 Tailwind Variants를 활용해 일관된 스타일과 variant를 적용했습니다. 각 컴포넌트의 상태와 사용 방법은 Storybook에서 확인할 수 있습니다.

[Storybook](https://dev2820.github.io/terra-design-system/)

## 주요 기능

- 30개 이상의 React UI 컴포넌트
- WAI-ARIA 패턴을 기반으로 하는 Ark UI 사용
- Primitive/Semantic Design Token 분리
- CSS Custom Property 기반 테마 변경
- Compound Component와 완성형 컴포넌트 API
- Storybook 기반 컴포넌트 문서화

## 설치 & 사용 방법

현재 React 18을 공식 지원하며 19는 지원 예정입니다.

### 설치

```bash
npm install terra-design-system
```

### 사용

```tsx
// App.tsx
// terra-design-system의 공용 스타일 import
import 'terra-design-system/react/style';
```

```tsx
// Component.tsx
// /react 경로에서 import하여 사용
import { Avatar, Link } from 'terra-design-system/react';
```

### 테마 변경

Semantic Token은 CSS Custom Property로 재정의할 수 있습니다.  
자세한 내용은 [Storybook - add project styles](https://dev2820.github.io/terra-design-system/?path=/docs/getting-started-how-to-use--docs#8-add-project-styles)를 참고하세요

### 사용 예시

```tsx
import { Button, Card, Input } from 'terra-design-system/react';
import 'terra-design-system/react/style';

export function SignIn() {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>Sign in</Card.Title>
      </Card.Header>

      <Card.Content>
        <Input placeholder="Email" />
      </Card.Content>

      <Card.Footer>
        <Button theme="primary">Sign in</Button>
      </Card.Footer>
    </Card.Root>
  );
}
```

## 기술 스택

- React
- TypeScript
- Ark UI
- Tailwind CSS

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

core로 동작할 라이브러리 선택이 있었습니다. 직접 구현하는 것도 방법이겠지만, 그건 너무 시간이 오래 걸리며 이 라이브러리의 취지와도 맞지 않았습니다.

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

어떤 패턴을 지원할지는 이 컴포넌트가 **얼마나 구조적으로 자유로운가**를 기준으로 결정했습니다. 예를 들어 Card는 상황에 따라 input이 포함되기도 하고, Footer에 버튼이 있기도, 없기도 합니다. 하지만 NumberInput은 increase 버튼만 있고, decrease 버튼은 없어야하는 상황이 거의 없는 컴포넌트입니다.

하지만, 이렇게 컴포넌트에 따라 다른 패턴을 지원한다는 점이 기준이 모호하고 일관성이 없게 여겨져 더 좋은 방향에 대한 고민이 남아있습니다.

### Tailwind를 쓰는 프로젝트와 쓰지 않는 프로젝트 모두 지원할 수 있을까?

Emotion과 같은 CSS-in-JS도 Ark UI와 함께 사용할 수 있지만,
소비자에게 ThemeProvider 구성을 요구하지 않고 빌드된 CSS만으로 컴포넌트를 사용할 수 있도록 Tailwind CSS를 선택했습니다.

먼저 이 라이브러리는 빌드할 필요가 없게 만들고 싶었기 때문에 라이브러리가 빌드된 css를 들고 있고, 사용하는 곳에서 import해서 스타일을 지원하도록 만들기를 원했습니다. 이 구조는 tailwind를 쓰는 라이브러리에서 충돌을 일으킬 수 있었습니다.

프로젝트의 테마와 terra-design-system의 토큰이 충돌할 수 있습니다. 가령 tailwind에서 `--primary-color:'red'` 같은 토큰이 있는데 terra-design-system의 `index.css`에 `--primary-color:'blue'` 토큰이 있다면 한쪽 토큰이 덮어씌워질 수 있습니다.

terra-design-system의 Tailwind utility에는 `trds-` prefix를 적용했습니다. 테마는 `--my-` prefix를 사용하는 CSS Custom Property로 재정의할 수 있어 프로젝트의 스타일과 terra-design-system이 공존할 수 있게 했습니다.

다음, 모든 컴포넌트 Root에는 `__trds`가 붙도록 하여 scss등을 쓰는 프로젝트에서 `__trds accordion`같이 컴포넌트의 스타일을 덮어쓸 수 있게 하였습니다.

## Roadmap

- [ ] React 19 호환
- [ ] 개별 컴포넌트 설치 방식 지원

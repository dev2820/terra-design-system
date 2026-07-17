import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{useMDXComponents as t}from"./index-CqcSDpoT.js";import{M as o}from"./index-kiTvMvma.js";import"./index-CDs2tPxN.js";import"./iframe-DP1qk051.js";import"../sb-preview/runtime.js";import"./index-B-yFm4aN.js";import"./index-DXimoRZY.js";import"./index-BH_9z_ur.js";import"./index-DrFu-skq.js";function s(r){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...t(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Getting Started/How to use"}),`
`,e.jsxs("div",{className:"trds-how-to-use",children:[e.jsx(n.h1,{id:"how-to-use",children:"How to use"}),e.jsx(n.p,{children:`Terra Design System을 React 프로젝트에 설치하고 사용하는 방법입니다. 현재 React 18을 공식
지원하며, 사용하는 프로젝트가 Tailwind CSS를 사용하지 않아도 컴포넌트를 사용할 수 있습니다.`}),e.jsx(n.h2,{id:"1-install",children:"1. Install"}),e.jsx(n.p,{children:"패키지를 프로젝트 의존성으로 설치합니다."}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install terra-design-system
`})}),e.jsxs("div",{className:"how-to-use-note",children:[e.jsx("strong",{children:"지원 범위"}),e.jsx("span",{children:e.jsx(n.p,{children:`현재 공식 지원 버전은 React 18입니다. React 19 지원은 Roadmap에 포함되어
있습니다.`})})]}),e.jsx(n.h2,{id:"2-import-styles",children:"2. Import styles"}),e.jsx(n.p,{children:`애플리케이션의 진입점에서 공용 스타일을 한 번 불러옵니다. 컴포넌트 스타일은 빌드된 CSS로
제공되므로 별도의 Tailwind 설정이나 빌드 과정이 필요하지 않습니다.`}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`// main.tsx 또는 App.tsx
import 'terra-design-system/react/style';
`})}),e.jsx(n.p,{children:"프로젝트의 전역 스타일로 Terra의 기본 스타일을 덮어쓰려면 Terra 스타일을 먼저 import합니다."}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import 'terra-design-system/react/style';

import './app.css';
`})}),e.jsx(n.h2,{id:"3-import-components",children:"3. Import components"}),e.jsxs(n.p,{children:["컴포넌트는 ",e.jsx(n.code,{children:"terra-design-system/react"})," 경로에서 필요한 항목만 가져옵니다."]}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { Button, Input } from 'terra-design-system/react';

export function SearchForm() {
  return (
    <form>
      <Input aria-label="검색어" placeholder="검색어를 입력하세요" />
      <Button type="submit" theme="primary">
        검색
      </Button>
    </form>
  );
}
`})}),e.jsx(n.h2,{id:"4-configure-variants",children:"4. Configure variants"}),e.jsxs(n.p,{children:["컴포넌트가 제공하는 ",e.jsx(n.code,{children:"theme"}),", ",e.jsx(n.code,{children:"variant"}),", ",e.jsx(n.code,{children:"size"}),` 등의 prop으로 정해진 디자인 범위 안에서 모양을
변경할 수 있습니다. 지원하는 prop과 상태는 각 컴포넌트의 Story에서 확인합니다.`]}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { Button } from 'terra-design-system/react';

export function Actions() {
  return (
    <>
      <Button theme="primary" variant="filled" size="md">
        저장
      </Button>
      <Button theme="neutral" variant="outline" size="md">
        취소
      </Button>
      <Button theme="danger" variant="ghost" loading>
        삭제
      </Button>
    </>
  );
}
`})}),e.jsx(n.h2,{id:"5-check-the-component-api",children:"5. Check the component API"}),e.jsx(n.p,{children:`Terra는 모든 컴포넌트에 두 가지 패턴을 동시에 제공하지 않습니다. 컴포넌트의 구조적 자유도에
따라 단일 컴포넌트 API 또는 Compound component API 중 하나로 설계되어 있습니다. 사용하기 전에
각 컴포넌트의 Story에서 제공하는 API 형태를 확인합니다.`}),e.jsx(n.h3,{id:"single-component-api",children:"Single component API"}),e.jsx(n.p,{children:`구조가 고정된 컴포넌트는 하나의 컴포넌트와 prop만으로 사용합니다. 내부 input과 증감 버튼을
직접 조합할 필요가 없습니다.`}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { NumberInput } from 'terra-design-system/react';

export function Quantity() {
  return <NumberInput defaultValue={1} min={1} max={10} />;
}
`})}),e.jsx(n.h3,{id:"compound-component-api",children:"Compound component API"}),e.jsx(n.p,{children:`내용과 배치가 달라질 수 있는 컴포넌트는 필요한 part를 조합합니다. part의 순서와 포함 여부를
사용하는 화면에 맞게 결정할 수 있습니다.`}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { Button, Card } from 'terra-design-system/react';

export function ProfileCard() {
  return (
    <Card.Root variant="elevated">
      <Card.Header>
        <Card.Title>프로필</Card.Title>
        <Card.Description>계정 정보를 확인하세요.</Card.Description>
      </Card.Header>
      <Card.Content>사용자 정보</Card.Content>
      <Card.Footer>
        <Button theme="primary">수정</Button>
      </Card.Footer>
    </Card.Root>
  );
}
`})}),e.jsxs("div",{className:"how-to-use-note",children:[e.jsx("strong",{children:"접근성"}),e.jsx("span",{children:e.jsx(n.p,{children:`Compound component를 사용할 때도 Label, Title, Description처럼 의미를
전달하는 part를 유지하세요. Input에는 연결된 label 또는 aria-label을
제공해야 합니다.`})})]}),e.jsx(n.h2,{id:"6-compose-form-fields",children:"6. Compose form fields"}),e.jsxs(n.p,{children:["입력 요소에 label, 도움말과 오류 메시지가 필요하면 ",e.jsx(n.code,{children:"Field"}),"와 함께 구성합니다."]}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { Field, Input } from 'terra-design-system/react';

export function EmailField() {
  return (
    <Field.Root required>
      <Field.Label htmlFor="email">이메일</Field.Label>
      <Input id="email" type="email" placeholder="email@example.com" />
      <Field.HelperText>로그인에 사용할 이메일을 입력하세요.</Field.HelperText>
      <Field.ErrorText>올바른 이메일을 입력하세요.</Field.ErrorText>
    </Field.Root>
  );
}
`})}),e.jsx(n.h2,{id:"7-customize-the-theme",children:"7. Customize the theme"}),e.jsx(n.p,{children:`Terra의 Semantic token은 CSS custom property로 재정의할 수 있습니다. 변경하지 않은 token은 Terra의
기본값을 사용하므로 필요한 역할부터 점진적으로 커스텀할 수 있습니다.`}),e.jsx(n.h3,{id:"create-a-theme-file",children:"Create a theme file"}),e.jsxs(n.p,{children:["프로젝트에 ",e.jsx(n.code,{children:"theme.css"}),"를 만들고 변경할 token을 ",e.jsx(n.code,{children:":root"}),`에 선언합니다. 하나의 Intent를 변경할 때는
기본색뿐 아니라 hover, pressed, 전경색과 경계색을 함께 지정합니다.`]}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`/* theme.css */
:root {
  --my-colors-primary: #2563eb;
  --my-colors-primary-strong: #1d4ed8;
  --my-colors-primary-stronger: #1e40af;
  --my-colors-primary-fg: #ffffff;
  --my-colors-primary-boundary: #2563eb;
  --my-colors-primary-alpha: rgba(37, 99, 235, 0.12);
  --my-colors-primary-alpha2: rgba(37, 99, 235, 0.24);

  --my-colors-base: #ffffff;
  --my-colors-fg: #1e293b;
  --my-colors-fg-title: #0f172a;
  --my-colors-boundary: #cbd5e1;
  --my-colors-layer-card: #ffffff;
  --my-colors-layer-popover: #ffffff;
}
`})}),e.jsx(n.h3,{id:"import-the-theme",children:"Import the theme"}),e.jsx(n.p,{children:"Terra의 기본 CSS를 먼저 불러오고 프로젝트의 테마와 애플리케이션 CSS를 뒤에 불러옵니다."}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`// main.tsx
import 'terra-design-system/react/style';

import './index.css';
import './theme.css';
`})}),e.jsx(n.h3,{id:"scope-a-theme",children:"Scope a theme"}),e.jsx(n.p,{children:`특정 화면이나 영역에만 다른 테마가 필요하면 class selector 안에서 token을 재정의합니다. 하위의 Terra
컴포넌트에만 해당 값이 상속됩니다.`}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`.admin-theme {
  --my-colors-primary: #0d9488;
  --my-colors-primary-strong: #0f766e;
  --my-colors-primary-stronger: #115e59;
  --my-colors-primary-boundary: #0d9488;
  --my-colors-primary-alpha: rgba(13, 148, 136, 0.12);
  --my-colors-primary-alpha2: rgba(13, 148, 136, 0.24);
}
`})}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<section className="admin-theme">
  <Button theme="primary">관리자 작업</Button>
</section>
`})}),e.jsxs("div",{className:"how-to-use-note",children:[e.jsx("strong",{children:"Theme checklist"}),e.jsx("span",{children:e.jsx(n.p,{children:`기본·hover·pressed·disabled 상태가 구분되는지, 배경과 전경색의 대비가
충분한지, focus 경계선이 보이는지 함께 확인하세요.`})})]}),e.jsxs(n.p,{children:["전체 token 이름, 기본값과 역할은 ",e.jsx(n.code,{children:"Foundations / Overview"}),"에서 확인할 수 있습니다."]}),e.jsx(n.h2,{id:"8-add-project-styles",children:"8. Add project styles"}),e.jsxs(n.p,{children:["모든 컴포넌트와 Compound component의 각 part는 ",e.jsx(n.code,{children:"className"}),`을 전달할 수 있습니다. 프로젝트에서
사용하는 스타일 방식에 맞춰 레이아웃이나 제한된 외형을 조정합니다.`]}),e.jsx(n.h3,{id:"tailwind-css",children:"Tailwind CSS"}),e.jsx(n.p,{children:`Terra CSS를 프로젝트의 Tailwind 진입 CSS보다 먼저 import합니다. 동일한 specificity를 가진 utility가
같은 속성을 선언하면 나중에 불러온 프로젝트 Tailwind 스타일이 적용됩니다.`}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`// main.tsx
import 'terra-design-system/react/style';

import './index.css';

// @tailwind 지시문이 포함된 프로젝트 CSS
`})}),e.jsxs("div",{className:"how-to-use-note",children:[e.jsx("strong",{children:"Import order"}),e.jsx("span",{children:e.jsx(n.p,{children:`프로젝트 Tailwind CSS를 먼저 불러오면 Terra의 동일 specificity 규칙이 나중에
선언되어 프로젝트 utility를 덮어쓸 수 있습니다.`})})]}),e.jsxs(n.p,{children:[`Tailwind를 사용하는 프로젝트에서는 프로젝트의 utility class를 그대로 전달합니다. Terra 내부
utility에는 `,e.jsx(n.code,{children:"trds-"})," prefix가 적용되어 있어 프로젝트의 Tailwind class와 구분됩니다."]}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { Accordion } from 'terra-design-system/react';

<Accordion.Root className="max-w-xl rounded-xl border border-slate-200 px-4">
  <Accordion.Item value="installation">
    <Accordion.ItemTrigger className="text-left font-semibold">
      설치 방법
    </Accordion.ItemTrigger>
    <Accordion.Content className="pb-4 text-slate-600">
      패키지를 설치하고 전역 스타일을 불러옵니다.
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>;
`})}),e.jsx(n.h3,{id:"css-modules",children:"CSS Modules"}),e.jsxs(n.p,{children:["CSS Module을 사용하는 프로젝트에서는 module class를 import해 ",e.jsx(n.code,{children:"className"}),"으로 전달합니다."]}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { Accordion } from 'terra-design-system/react';

import styles from './Faq.module.css';

export function Faq() {
  return (
    <Accordion.Root className={styles.root}>
      <Accordion.Item value="usage">
        <Accordion.ItemTrigger className={styles.trigger}>
          사용 방법
        </Accordion.ItemTrigger>
        <Accordion.Content className={styles.content}>
          각 component의 Story에서 API를 확인하세요.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}
`})}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`/* Faq.module.css */
.root {
  max-width: 40rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding-inline: 1rem;
}

.trigger {
  font-weight: 600;
  text-align: left;
}

.content {
  padding-bottom: 1rem;
}
`})}),e.jsx(n.h3,{id:"apply-styles-to-every-instance",children:"Apply styles to every instance"}),e.jsxs(n.p,{children:["특정 컴포넌트의 모든 인스턴스에 공통 스타일을 적용하려면 ",e.jsx(n.code,{children:".__trds.컴포넌트명"})," 선택자를 사용합니다."]}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`.__trds.accordion {
  max-width: 40rem;
}
`})}),e.jsxs(n.p,{children:["CSS Module에서는 ",e.jsx(n.code,{children:":global()"}),`로 Terra 선택자를 참조하고, wrapper를 사용해 현재 화면 안으로 적용
범위를 제한합니다.`]}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<section className={styles.wrapper}>
  <Accordion.Root>...</Accordion.Root>
</section>
`})}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`/* Faq.module.css */
.wrapper :global(.__trds.accordion) {
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding-inline: 1rem;
}
`})}),e.jsxs(n.p,{children:["한 곳에서만 스타일을 바꿀 때는 ",e.jsx(n.code,{children:"className"}),`을 사용하고, 여러 인스턴스에 같은 스타일을 적용할 때
이 선택자를 사용합니다.`]})]})]})}function u(r={}){const{wrapper:n}={...t(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(s,{...r})}):s(r)}export{u as default};

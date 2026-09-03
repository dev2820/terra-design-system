# Accordion

접을 수 있는 여러 콘텐츠 섹션의 HTML 구조, 펼침 상태와 접근성 관계를 제공하는
React 컴포넌트다.

## 사용법

```tsx
import { Accordion } from "@coral/react/accordion";

<Accordion.Root defaultValue={["first"]}>
  <Accordion.Item value="first">
    <Accordion.Header level={2}>
      <Accordion.Trigger>첫 번째 섹션</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>첫 번째 내용</Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>;
```

`Root`는 `value`와 `onValueChange`로 제어하거나 `defaultValue`로 내부 상태를
사용한다. `multiple`을 설정하지 않으면 한 패널만, 설정하면 여러 패널을 동시에
펼칠 수 있다. 값은 두 모드 모두 문자열 배열로 표현한다.

`Trigger`는 기본적으로 `type="button"`인 네이티브 버튼을 렌더링하고 연결된
`Panel`과 `aria-controls`, `aria-expanded`로 연결한다. 필요하면 `type`을 직접
지정할 수 있다. `Header`의 `level`은 페이지의 제목 구조에 맞게 지정하며,
생략하면 `<h3>`를 렌더링한다. `Panel`의 `region`은 많은 landmark를 만들지 않도록
기본값이 `false`이며, 패널 내용에 제목이나 중첩 Accordion이 있어 탐색 경계가
도움이 될 때만 사용한다. `region`을 활성화하면 `role="region"`과 Trigger를
참조하는 `aria-labelledby`를 함께 설정한다.

모든 Part는 `render`에 React 요소를 전달해 기본 요소를 같은 의미의 사용자 지정
컴포넌트로 교체할 수 있다. 사용자 지정 컴포넌트는 각 Part의 기본 요소와 같은
종류의 DOM 요소를 렌더링하고 전달받은 Props와 Ref를 그 요소에 연결해야 한다.
특히 `Header`와 `Trigger`는 각각 heading과 네이티브 `<button>`을 최종
렌더링해야 한다. `Header`에 `render`를 전달하면 `level` 대신 render 요소가
heading level을 결정한다. ID·ARIA·상태와 내부 동작은 Coral이 계속 소유한다.

```tsx
<Accordion.Trigger render={<DesignSystemButton variant="secondary" />}>
  첫 번째 섹션
</Accordion.Trigger>
```

현재 WAI-ARIA APG Accordion 패턴은 Trigger 사이의 방향키 이동을 요구하지
않는다. Enter와 Space 활성화, Tab 순서는 네이티브 버튼과 문서 순서에 맡긴다.

- [WAI-ARIA APG Accordion Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)
- [Base UI Accordion](https://base-ui.com/react/components/accordion)

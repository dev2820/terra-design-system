# Fieldset

관련된 Form Control을 하나의 그룹으로 묶고 그룹의 Disabled 상태를 하위 Field에
전달하는 React 컴포넌트다.

## 사용법

```tsx
import { Field, Input } from "@coral/react";
import { Fieldset } from "@coral/react/fieldset";

<Fieldset.Root disabled>
  <Fieldset.Legend>연락 방법</Fieldset.Legend>
  <Field.Root>
    <Field.Label>이메일</Field.Label>
    <Input type="email" />
  </Field.Root>
</Fieldset.Root>;
```

`Fieldset`은 `@coral/react`의 Named Export로도 가져올 수 있다.

`Root`와 `Legend`는 각각 네이티브 `<fieldset>`과 `<legend>`를 렌더링한다.
`Legend`는 선택 사항이지만 사용하는 경우 `<fieldset>`의 첫 번째 자식으로 둔다.
Legend가 없다면 `aria-label`이나 `aria-labelledby`로 Control 그룹의 이름을
제공한다. 네이티브 요소가 의미와 구조적 관계를 소유하므로 두 Part는 `render`를
지원하지 않는다.

`Root`의 `disabled`는 네이티브 속성으로 적용되고 하위 Field에도 전달된다. Field가
`disabled={false}`를 명시해도 Disabled Fieldset의 제약을 해제할 수 없다. 중첩된
Fieldset도 어느 한 조상이 Disabled면 Disabled 상태를 유지한다. Root와 Legend에는
스타일링을 위한 `data-disabled`가 함께 제공된다.

Fieldset은 하위 Field의 Validation 상태를 수집하지 않으며 `invalid`, `dirty`,
`touched`나 Error를 소유하지 않는다. 그룹 단위 Validation은 값을 소유한
CheckboxGroup, RadioGroup 또는 Form 계층에서 처리한다.

- [MDN: `<fieldset>`](https://developer.mozilla.org/docs/Web/HTML/Reference/Elements/fieldset)
- [WAI Forms Tutorial: Grouping Controls](https://www.w3.org/WAI/tutorials/forms/grouping/)

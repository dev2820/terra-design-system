# Input

네이티브 `<input>`의 의미, 키보드와 Form 동작을 유지하면서 Coral의 공통
`render` 합성과 상태 스타일링 표식을 제공하는 React 컴포넌트다. 공개 설치와
import는 `@coral/react`를 사용한다.

## 사용법

```tsx
import { Input } from "@coral/react/input";

<label>
  이메일
  <Input name="email" type="email" autoComplete="email" required />
</label>;
```

`value`, `defaultValue`와 `onChange`를 포함한 네이티브 input Props를 그대로
사용한다. 키 입력, Selection, 유효성 검사와 Form 제출은 브라우저가 소유하며
Coral이 별도 상태로 다시 구현하지 않는다. `Field.Root` 안에서는 label,
description, error와 validation 상태에 자동으로 연결된다.

`disabled`는 네이티브 속성과 `data-disabled`에 함께 반영된다. `render`에 React
요소를 전달하면 기본 요소를 교체할 수 있지만, 네이티브 의미와 동작을 유지하기
위해 최종적으로 `<input>`을 렌더링하고 전달받은 Props와 Ref를 연결해야 한다.

Input은 스스로 접근 가능한 이름을 만들지 않는다. 제품은 연결된 `<label>`이나
`aria-labelledby`로 이름을 제공해야 한다. 오류 상태와 설명은 `aria-invalid`와
`aria-describedby`로 연결한다.

- [Base UI Input](https://base-ui.com/react/components/input)
- [WAI Forms Tutorial: Labels](https://www.w3.org/WAI/tutorials/forms/labels/)

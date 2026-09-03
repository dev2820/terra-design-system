# Field

Form control의 label, description, error와 validation 상태를 연결하는 Headless
Field다. 공개 설치와 import는 `@coral/react`를 사용한다.

```tsx
import { Field, Input } from "@coral/react";

<Field.Root
  name="username"
  validate={(value) => (value === "admin" ? "사용할 수 없는 이름입니다." : null)}
>
  <Field.Label>사용자 이름</Field.Label>
  <Input required minLength={3} />
  <Field.Description>3자 이상 입력해 주세요.</Field.Description>
  <Field.Error />
</Field.Root>;
```

`validationMode`은 `onSubmit`, `onBlur`, `onChange`를 지원하며 기본값은
`onSubmit`이다. Custom validation은 native constraint validation을 통과한 뒤
실행된다. `onChange` 검증에는 `validationDebounceTime`을 사용할 수 있다.

외부 Form library가 상태를 소유한다면 `invalid`, `touched`, `dirty`를
`Field.Root`에 전달하고 `Field.Error match={Boolean(error)}`로 오류 표시 여부를
제어한다. 이 경우 동일한 규칙을 `validate`에도 중복해서 정의하지 않는다.

모든 Field Part는 `id`를 직접 받을 수 있다. 생략하면 Coral이 ID를 생성하며,
직접 지정한 경우에도 `Label`의 `htmlFor`와 `Control`의 `aria-describedby`는 실제
Part ID를 사용한다.

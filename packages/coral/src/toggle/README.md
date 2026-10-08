# Toggle

눌림 상태를 유지하는 headless Toggle이다. Root는 네이티브 `<button>`을
렌더링하고 `aria-pressed`로 현재 상태를 전달한다.

```tsx
import { Toggle } from "@coral/react/toggle";

<Toggle.Root defaultPressed>굵게</Toggle.Root>;
```

## 상태와 상호작용

`pressed`, `defaultPressed`, `onPressedChange`로 controlled와 uncontrolled
상태를 지원한다. 기본 상태는 `false`다. `pressed`가 `undefined`이면
uncontrolled 상태를 사용한다. 상태는 boolean이며 `mixed`는 지원하지 않는다.
`defaultPressed`는 최초 상태만 지정한다.

```tsx
const [bold, setBold] = React.useState(false);

<Toggle.Root pressed={bold} onPressedChange={setBold}>
  굵게
</Toggle.Root>;
```

클릭하면 다음 상태를 계산한다. Enter와 Space 활성화, 포커스와 disabled 동작은
네이티브 버튼에 맡긴다. 별도의 키보드 토글 처리는 추가하지 않는다.

사용자 `onClick`은 내부 상태 변경 처리 전에 실행된다. `preventDefault()`를
호출하면 상태 변경과 `onPressedChange` 호출을 생략한다.
`onPressedChange(pressed, eventDetails)`는 다음 상태와 변경 정보를 전달한다.
`eventDetails`에는 `reason: "click"`, 네이티브 `event`, 실제 `button`,
`isCanceled`, `cancel()`이 있다. `cancel()`을 호출하면 내부 상태 변경을
취소한다. 이 메서드는 네이티브 클릭의 기본 동작을 취소하지 않는다. controlled
상태에서는 사용처가 `pressed`를 갱신한다.

## 이름과 콘텐츠

Root의 텍스트가 접근 가능한 이름이 된다. 아이콘만 사용하면 `aria-label` 또는
`aria-labelledby`로 이름을 제공한다. 이름은 눌림 상태가 바뀌어도 유지해야 한다.
예를 들어 이름은 계속 "굵게"이고, 활성 여부는 `aria-pressed`로 전달한다.

```tsx
<Toggle.Root aria-label="굵게">
  <BoldIcon aria-hidden="true" />
</Toggle.Root>
```

별도의 Label이나 ID 등록은 필요하지 않다. 서버 HTML에도 초기 상태의
`aria-pressed`와 상태 속성이 바로 포함된다. `ref`는 실제
`HTMLButtonElement`를 가리킨다. 자식은 버튼의 콘텐츠 모델을 지켜야 하며,
버튼·링크·입력이나 `tabIndex`가 지정된 요소를 중첩하지 않는다.

## Form과 disabled

기본 `type`은 `"button"`이므로 폼 안에서 Toggle을 눌러도 제출하지 않는다.
사용자가 `type="submit"` 또는 `type="reset"`을 지정하면 해당 네이티브 동작을
유지한다. 버튼의 `name`, `value`, `form`도 네이티브 속성으로 전달한다.

`pressed`는 폼 제출 값으로 자동 변환되지 않는다. HiddenInput, required와
readOnly 계약을 제공하지 않으며, 폼 reset은 눌림 상태를 복원하지 않는다.
폼 제출 값이 필요하면 사용처가 별도의 입력과 연결한다.

`disabled`는 네이티브 버튼을 비활성화하고 상태 변경을 막는다. 네이티브
fieldset의 disabled 전파도 브라우저가 처리한다.

## 합성과 스타일

Root 내부에는 `useRender`를 적용해 Props, 이벤트와 ref의 공통 병합 규칙을
사용한다. 공개 `render`는 제공하지 않으며 실제 버튼을 유지한다. 제품의 텍스트와
아이콘 컴포넌트는 `children`으로 구성한다.

`data-pressed`, `data-unpressed`로 눌림 상태를 제공하고, Root의 `disabled`가
true이면 `data-disabled`를 제공한다. 부모 fieldset에서 전파된 비활성 상태는
`:disabled`로 스타일을 지정할 수 있다. Coral은 색상, 크기와 표시 형태를
제공하지 않는다. 포커스 표시는 `:focus-visible`로 지정한다.

## 설계 근거와 검증 범위

- [WHATWG button](https://html.spec.whatwg.org/multipage/form-elements.html#the-button-element):
  콘텐츠 모델, type, disabled와 네이티브 Form 동작의 기준이다.
- [WAI-ARIA aria-pressed](https://www.w3.org/TR/wai-aria-1.2/#aria-pressed):
  토글 버튼의 눌림 상태를 전달하는 기준이다.
- [WAI-ARIA APG Button](https://www.w3.org/WAI/ARIA/apg/patterns/button/):
  Enter와 Space 활성화, 접근 가능한 이름과 상태가 바뀌어도 이름을 유지하는 기준이다.

검증은 controlled와 uncontrolled 상태, 변경 취소, disabled, 네이티브 활성화와
Coral 상태의 연결, 서버 HTML의 초기 상태와 접근 가능한 이름을 다룬다. 브라우저가
소유하는 버튼 동작의 전체 조합이나 실제 스크린 리더의 발화 결과는 검증 범위에
포함하지 않는다.

# NumberInput

숫자 입력과 증감 버튼을 함께 제공한다. Input은 네이티브 `<input type="number">`이고,
IncrementTrigger와 DecrementTrigger는 `<button type="button">`이다.

```tsx
import { NumberInput } from "@coral/react/number-input";

<NumberInput.Root name="quantity" defaultValue={1} min={0} max={10} step={1}>
  <label htmlFor="quantity">수량</label>
  <NumberInput.DecrementTrigger aria-label="수량 줄이기">−</NumberInput.DecrementTrigger>
  <NumberInput.Input id="quantity" />
  <NumberInput.IncrementTrigger aria-label="수량 늘리기">+</NumberInput.IncrementTrigger>
</NumberInput.Root>;
```

Input에는 `<label>` 또는 `aria-label`로 접근 가능한 이름을 제공한다. 증감 버튼에도
보이는 텍스트나 `aria-label`로 이름을 제공한다. Input은 유일한 Tab 정지점이다.
버튼을 누르면 Input에 Focus가 유지된다. Input의 위·아래 방향키 동작은 브라우저가
제공한다. `min` 또는 `max`가 있으면 Home 또는 End로 해당 경계에 이동한다.

Root의 `value`, `defaultValue`, `onValueChange`는 제어·비제어 사용을 지원한다.
빈 값은 `null`이다. 변경 정보의 `reason`은 `input-change`, `increment`,
`decrement`, `home`, `end` 중 하나다. `eventDetails.cancel()`을 호출하면 이전
값을 유지한다. 입력 중 브라우저가 아직 숫자로 해석할 수 없는 문자열은 변경
알림을 보내지 않고 Input에 그대로 둔다.

Root의 `name`, `form`, `min`, `max`, `step`, `disabled`, `readOnly`, `required`는
Input에 전달된다. Form 제출과 기본 유효성 검사는 Input이 담당한다. Form reset은
비제어 값에 `defaultValue`를 복원하고 제어 값에는 현재 `value`를 유지한다.
`step`의 기본값은 1이다. 버튼은 네이티브 `stepUp()`과 `stepDown()`을 사용한다.
버튼은 경계 또는 `disabled`·`readOnly` 상태에서 비활성화된다. 숫자 표시 형식과
로케일별 파싱은 제공하지 않는다. 드래그 조절용 scrubber도 제공하지 않는다.
HTML의 number input과 APG Spinbutton은 드래그 조절을 별도 동작으로 정의하지
않는다.

Root, Input과 버튼에는 `data-disabled`, `data-readonly`, `data-required`가
상태에 따라 적용된다. Input은 네이티브 입력의 의미와 Form 동작을 유지하기 위해
`render`를 제공하지 않는다. 두 Trigger는 `render`를 지원한다. 전달하는 요소는
button 의미와 키보드 조작을 유지해야 한다.

- [WHATWG number input](<https://html.spec.whatwg.org/multipage/input.html#number-state-(type=number)>):
  값, 범위, 단계, Form 동작과 증감 메서드를 정의한다.
- [WAI-ARIA APG Spinbutton](https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/):
  방향키, 경계 이동과 보조 증감 버튼의 Focus 동작을 설명한다.

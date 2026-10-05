# RadioGroup

하나의 값만 선택하는 headless RadioGroup이다. 실제 `<input type="radio">`가 선택,
포커스, 방향키, 유효성 검사와 Form 제출을 담당한다.

```tsx
import { RadioGroup } from "@coral/react/radio-group";

<RadioGroup.Root name="plan" defaultValue="monthly" required>
  <RadioGroup.Legend>요금제</RadioGroup.Legend>
  <RadioGroup.Item value="monthly">
    <RadioGroup.ItemControl>
      <RadioGroup.ItemIndicator>✓</RadioGroup.ItemIndicator>
    </RadioGroup.ItemControl>
    <RadioGroup.ItemText>월간</RadioGroup.ItemText>
    <RadioGroup.ItemHiddenInput />
  </RadioGroup.Item>
  <RadioGroup.Item value="yearly">
    <RadioGroup.ItemControl>
      <RadioGroup.ItemIndicator>✓</RadioGroup.ItemIndicator>
    </RadioGroup.ItemControl>
    <RadioGroup.ItemText>연간</RadioGroup.ItemText>
    <RadioGroup.ItemHiddenInput />
  </RadioGroup.Item>
</RadioGroup.Root>;
```

Root는 `<fieldset>`, Legend는 `<legend>`, 각 Item은 `<label>`을 렌더링한다.
Legend를 Root의 첫 번째 자식으로 배치하여 그룹에 접근 가능한 이름을 제공한다.
각 Item의 `value`는 필수이며 서로 달라야 한다. Item 안에는 ItemHiddenInput을
하나씩 명시적으로 넣는다. ItemText의 텍스트는 같은 Item 안의 input에 접근
가능한 이름을 제공한다. ItemText를 생략하면 ItemHiddenInput에 `aria-label`이나
`aria-labelledby`를 지정한다. Item은 RadioGroup.Root 안에서만 사용한다.

ItemHiddenInput은 시각적으로만 숨긴 `<input type="radio">`다. `display: none`,
`type="hidden"`, `aria-hidden`을 사용하지 않는다. `role`과 `aria-checked`도
중복 지정하지 않는다. ItemControl과 ItemIndicator는 `aria-hidden="true"`인
시각 요소다. 실제 input의 `id`, `ref`, `autoFocus`, `tabIndex`와 ARIA 속성은
ItemHiddenInput에 전달한다. Root와 Item의 ref는 각각 fieldset과 label을 가리킨다.

Root의 `name`에는 비어 있지 않은 문자열을 지정한다. 같은 Form 소유자와
`name`을 가진 radio input은 fieldset이 달라도 하나의 네이티브 선택 그룹에
속한다. 독립적인 그룹에는 서로 다른 `name`을 사용한다.

Root의 `value`, `defaultValue`, `onValueChange`는 controlled와 uncontrolled
선택을 지원한다. 기본값은 선택 없음(`null`)이다. 변경 콜백은 선택한 문자열과
`eventDetails`를 받는다. `eventDetails.cancel()`을 호출하면 이전 선택을 유지한다.
uncontrolled 그룹은 Form reset 뒤 `defaultValue`를 복원한다.

Root의 `disabled`, `required`, `readOnly`, `form`은 각 ItemHiddenInput에
전달된다. Item의 `disabled`는 해당 선택지만 비활성화한다. `required`는 그룹에서
하나의 값을 선택하도록 요구한다. `form`에는 외부 Form의 ID를 지정할 수 있다.
`readOnly`는 네이티브 radio에 없는 동작이다. Coral은 포커스와 Form 참여를
유지하면서 클릭, Space와 방향키에 의한 변경을 막고 input에 `aria-readonly`를
적용한다.

Root와 Legend에는 `data-disabled`, `data-readonly`, `data-required`가 적용된다.
Item, ItemControl, ItemIndicator, ItemText에는 `data-checked`, `data-unchecked`,
`data-disabled`, `data-readonly`, `data-required`가 적용된다. ItemIndicator는
선택한 항목에서 렌더링되며 `keepMounted`를 지정하면 항상 DOM에 남는다.

ItemControl, ItemIndicator, ItemText는 `render`로 사용자 컴포넌트와 합성할 수
있다. 합성한 요소는 label 안에 놓일 수 있는 콘텐츠여야 하고 전달받은 Props와
ref를 실제 요소에 전달해야 한다. Root, Legend, Item, ItemHiddenInput은 네이티브
관계를 유지하기 위해 `render`를 제공하지 않는다. 제품은
`:has(input:focus-visible)`로 포커스 상태를 시각 ItemControl에 표시한다.

그룹의 유효성 검사는 네이티브 input에 맡긴다. 기존 `Field.Control`은 단일
입력을 추적하므로 각 ItemHiddenInput에 적용하지 않는다. 추가 설명은 Root의
ARIA 속성으로 연결할 수 있다.

- [WHATWG radio input](<https://html.spec.whatwg.org/multipage/input.html#radio-button-state-(type=radio)>):
  같은 Form 소유자와 name에 따른 그룹, checked 상태와 required 검증의 기준이다.
- [WHATWG fieldset](https://html.spec.whatwg.org/multipage/form-elements.html#the-fieldset-element),
  [legend](https://html.spec.whatwg.org/multipage/form-elements.html#the-legend-element),
  [label](https://html.spec.whatwg.org/multipage/forms.html#the-label-element):
  그룹과 선택지의 이름, disabled 전파와 콘텐츠 관계의 기준이다.
- [ARIA in HTML](https://www.w3.org/TR/html-aria/):
  네이티브 radio input에 `aria-checked`를 지정하지 않는 근거다.
- [WAI-ARIA APG Radio Group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/):
  단일 선택과 키보드 상호작용의 기준이다. 네이티브 radio의 초기 역방향 Tab
  동작은 브라우저에 따라 APG의 사용자 정의 구현과 다를 수 있다.

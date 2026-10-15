# CheckboxGroup

여러 체크박스의 선택 값을 하나의 배열로 관리하는 headless CheckboxGroup이다.
Root는 `<fieldset>`, Legend는 `<legend>`, 각 Checkbox.Root는 `<label>`을 렌더링한다.
실제 선택과 Form 제출은 Checkbox.HiddenInput의 네이티브 input이 담당한다.

```tsx
import { Checkbox } from "@coral/react/checkbox";
import { CheckboxGroup } from "@coral/react/checkbox-group";

<CheckboxGroup.Root name="features" defaultValue={["search"]}>
  <CheckboxGroup.Legend>사용할 기능</CheckboxGroup.Legend>
  <Checkbox.Root value="search">
    <Checkbox.Control>
      <Checkbox.Indicator>✓</Checkbox.Indicator>
    </Checkbox.Control>
    <Checkbox.Label>검색</Checkbox.Label>
    <Checkbox.HiddenInput />
  </Checkbox.Root>
  <Checkbox.Root value="alerts">
    <Checkbox.Control>
      <Checkbox.Indicator>✓</Checkbox.Indicator>
    </Checkbox.Control>
    <Checkbox.Label>알림</Checkbox.Label>
    <Checkbox.HiddenInput />
  </Checkbox.Root>
</CheckboxGroup.Root>;
```

Legend를 Root의 첫 번째 자식으로 배치하여 그룹에 접근 가능한 이름을 제공한다.
그룹 안의 Checkbox.Root에는 `value`가 필수이며 서로 달라야 한다. 각 Root 안에는
Checkbox.HiddenInput을 하나씩 넣는다. Checkbox.Label의 텍스트가 해당 input의
접근 가능한 이름이다. Label을 생략하면 HiddenInput에 `aria-label`이나
`aria-labelledby`를 지정한다.
Checkbox.Root는 그룹 밖에서도 독립적으로 사용할 수 있다.

Root의 `value`, `defaultValue`, `onValueChange`는 controlled와 uncontrolled
선택을 지원한다. 기본 선택은 빈 배열이다. 중복된 값은 한 번만 유지한다.
`onValueChange`는 다음 선택 값의 배열과 Checkbox의 변경 이벤트 정보를 받는다.
`eventDetails.cancel()`을 호출하면 이전 선택을 유지한다. uncontrolled 그룹은
Form reset 뒤 `defaultValue`를 복원하며, controlled 그룹은 전달받은 `value`를
유지한다.

그룹 안에서는 그룹의 `value`, `name`, `form`이 각 Checkbox.Root의 선택 상태와
input 속성을 결정한다. 개별 Root에 `checked`, `defaultChecked`, `name`, `form`을
지정하면 오류가 발생한다. 개별 Root의 `onCheckedChange`는 그룹의
`onValueChange`보다 먼저 호출된다. 여기서 `eventDetails.cancel()`을 호출하면
그룹의 변경 콜백도 호출되지 않는다.

Root의 `name`은 각 Checkbox의 input에 전달된다. 선택된 input만 같은 이름으로
FormData에 참여한다. `FormData.getAll("features")`로 선택 값을 읽을 수 있다.
`form`에는 외부 Form의 ID를 지정할 수 있다. `disabled`와 `readOnly`는 모든 Checkbox에
전파된다. 개별 Checkbox.Root의 `disabled`와 `readOnly`는 해당 항목에만 적용된다.
`readOnly`는 Checkbox의 비편집 동작을 재사용하며, 포커스와 Form 참여를 유지한다.

그룹 전체의 `required`는 제공하지 않는다. 네이티브 checkbox의 `required`는
그 속성을 가진 **각 input**이 체크되어야 한다는 뜻이다. 특정 항목을 반드시
선택해야 한다면 해당 Checkbox.Root에 `required`를 지정한다. 하나 이상 선택해야
하는 제품 규칙은 Form 검증에서 처리한다. Parent checkbox의 하위 항목 계산은
제공하지 않는다.

CheckboxGroup.Root와 Legend에는 `data-disabled`, `data-readonly`가 적용된다.
Checkbox.Root와 시각 Part에는 `data-checked`, `data-unchecked`, `data-disabled`,
`data-readonly` 등이 적용된다. CheckboxGroup.Root, Legend, Checkbox.Root는
네이티브 관계를 유지하기 위해 `render`를 제공하지 않는다. 제품은
`:has(input:focus-visible)`로 포커스 상태를 시각 Control에 표시한다.

- [WHATWG checkbox input](<https://html.spec.whatwg.org/multipage/input.html#checkbox-state-(type=checkbox)>):
  개별 선택, Form 값과 `required`의 의미를 정의한다.
- [WHATWG fieldset](https://html.spec.whatwg.org/multipage/form-elements.html#the-fieldset-element),
  [legend](https://html.spec.whatwg.org/multipage/form-elements.html#the-legend-element):
  관련 입력의 그룹화, 이름과 disabled 전파의 기준이다.
- [WAI-ARIA APG Checkbox](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/):
  이름이 있는 체크박스 그룹과 개별 체크박스의 Space 조작을 설명한다.

# Checkbox

실제 `<input type="checkbox">`의 의미, 키보드와 Form 동작을 유지하면서 Root,
Control, Indicator, Label과 HiddenInput을 조합하는 headless Checkbox다.
공개 설치와 import는 `@coral/react`를 사용한다.

```tsx
import { Checkbox } from "@coral/react/checkbox";

<Checkbox.Root className="checkbox" name="updates">
  <Checkbox.Control className="checkbox-control">
    <Checkbox.Indicator>
      {(state) => (state.indeterminate ? <MinusIcon /> : <CheckIcon />)}
    </Checkbox.Indicator>
  </Checkbox.Control>
  <Checkbox.Label>업데이트 받기</Checkbox.Label>
  <Checkbox.HiddenInput />
</Checkbox.Root>;
```

## Parts와 네이티브 동작

Ark UI의 Part 구성을 따른다. Root는 `label`, Control과 Label은 `span`을
렌더링한다. Control은 시각적인 체크 영역이고 Indicator는 그 안의 장식이다.
Label의 텍스트는 Root 안의 네이티브 input에 접근 가능한 이름을 제공한다.
Control과 Indicator는 보조 기술에서 숨겨지고 별도의 tab stop을 만들지 않는다.

HiddenInput은 `Field.Control`을 통해 실제 `<input type="checkbox">`를 렌더링한다.
input은 1px 크기로 시각적으로만 숨긴다. `type="hidden"`, `display: none`이나
`aria-hidden`을 사용하지 않으므로 Focus, Space 활성화, required validation과
Form 제출은 브라우저가 소유한다. Root의 label 활성화로 Control, Label과 그
사이의 영역을 클릭할 수 있다. Root에 `position`을 강제하거나 input을 Root
전체에 겹치지 않는다.

HiddenInput은 Root 안에 하나를 명시적으로 넣어야 한다. 생략하면 input을 자동
생성하지 않으며 네이티브 입력, 키보드와 Form 동작도 제공되지 않는다. Root와
HiddenInput은 네이티브 label/input의 관계를 유지하기 위해 `render`를 제공하지
않는다.

Root의 `ref`와 `id`는 label에 적용된다. 실제 input의 `ref`, `id`, `autoFocus`,
`tabIndex`와 ARIA 속성은 HiddenInput에 전달한다. Label을 생략한다면 HiddenInput에
`aria-label`이나 `aria-labelledby`를 주거나 별도의 연결된 label을 제공해야 한다.

```tsx
<Checkbox.Root name="terms" required>
  <Checkbox.Control>
    <Checkbox.Indicator>✓</Checkbox.Indicator>
  </Checkbox.Control>
  <Checkbox.HiddenInput id="terms" aria-label="약관 동의" ref={inputRef} />
</Checkbox.Root>
```

## 상태

상태와 Form 값은 Root의 `checked`, `defaultChecked`, `indeterminate`, `disabled`,
`readOnly`, `required`, `name`, `value`, `form`으로 정한다. HiddenInput은 이를
Context에서 받아 적용한다. `checked`, `defaultChecked`와 `onCheckedChange`로
controlled와 uncontrolled 상태를 지원한다. 변경 콜백의 event details에서
`cancel()`을 호출하면 이전 상태를 유지한다. unchecked checkbox는 네이티브
동작과 같이 FormData에 포함되지 않는다. uncontrolled 상태는 Form reset으로
초기값을 복원한다.

`indeterminate`는 `checked`와 독립된 표현 상태다. 두 값이 모두 `true`일 수 있고,
이때 화면과 보조 기술에는 mixed로 전달되지만 FormData 참여 여부는 `checked`가
결정한다. 브라우저는 활성화할 때 native `indeterminate` property를 지우므로
Coral은 prop이 `true`인 동안 이를 다시 적용한다. 전체 선택 UI에서는 하위 선택
결과에 따라 제품이 `indeterminate`를 `false`로 갱신한다.

Indicator는 checked 또는 indeterminate일 때 렌더링된다. 항상 DOM에 유지해야
하면 `keepMounted`를 사용한다. Root, Control, Label과 Indicator에는
`data-checked`, `data-unchecked`, `data-indeterminate`, `data-disabled`,
`data-readonly`, `data-required`가 제공된다.

`readOnly`는 native checkbox에 없는 비편집 상태를 보완한다. input을 Focus와
FormData에 유지하고 `aria-readonly`를 전달하면서 포인터와 Space에 의한 변경을
막는다. 조작과 Form 제출 모두에서 제외하려면 native `disabled`를 사용한다.

## Field와 스타일

`Field.Root` 안에서는 HiddenInput이 label, description, error와 validation에
자동으로 연결된다. Field와 Fieldset의 disabled 상태는 모든 시각 Part와 input에
반영된다. Checkbox.Root가 이미 label이므로 Field.Label로 감싸지 않고 형제로 둔다.

```tsx
<Field.Root name="terms">
  <Field.Label>약관에 동의합니다</Field.Label>
  <Checkbox.Root className="checkbox">
    <Checkbox.Control className="checkbox-control">
      <Checkbox.Indicator>✓</Checkbox.Indicator>
    </Checkbox.Control>
    <Checkbox.HiddenInput />
  </Checkbox.Root>
  <Field.Error />
</Field.Root>
```

제품은 Root 안의 input의 `:focus-visible`을 `:has()`로 시각 Control에 표현한다.
Root를 충분한 크기로 만들어 체크 영역과 텍스트 사이에도 label 클릭이 이어지게
한다.

```css
.checkbox {
  display: inline-flex;
  min-block-size: 2.75rem;
  align-items: center;
  gap: 0.5rem;
}

.checkbox-control {
  display: inline-grid;
  inline-size: 1.25rem;
  block-size: 1.25rem;
  place-items: center;
}

.checkbox:has(input:focus-visible) .checkbox-control {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}
```

Coral은 체크·mixed 아이콘, 크기, 색상, border와 motion을 제공하지 않는다.
강제 색상 모드를 포함한 최종 Indicator와 focus 표시의 가시성은 제품에서
검증한다. Checkbox Group과 parent checkbox의 하위 항목 계산도 별도 범위다.

- [Ark UI Checkbox](https://ark-ui.com/docs/components/checkbox)
- [HTML checkbox](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/checkbox)
- [WAI-ARIA APG Checkbox](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/)

# Switch

기능의 켜짐·꺼짐 상태를 표현하는 headless Switch다. 실제
`<input type="checkbox" role="switch">`의 키보드와 Form 동작을 유지하며,
Root, Control, Thumb, Label과 HiddenInput을 조합한다.

```tsx
import { Switch } from "@coral/react/switch";

<Switch.Root className="switch" name="notifications">
  <Switch.Control className="switch-control">
    <Switch.Thumb className="switch-thumb" />
  </Switch.Control>
  <Switch.Label>알림</Switch.Label>
  <Switch.HiddenInput />
</Switch.Root>;
```

## Parts와 이름 연결

Root는 네이티브 `label`이다. Control은 시각적인 스위치 영역, Thumb은 이동하는
손잡이, Label은 이름을 표현한다. 세 Part는 기본적으로 `span`을 렌더링한다.
Thumb은 켜짐·꺼짐 상태 모두에서 DOM에 유지된다. Control과 Thumb에는
`aria-hidden="true"`를 적용한다.

Root 안에 HiddenInput 하나를 명시적으로 넣어야 한다. HiddenInput은
`Field.Control`을 통해 실제 input을 렌더링하고 시각적으로만 숨긴다. 이를
생략하면 입력 요소를 자동으로 생성하지 않으며 키보드와 Form 동작도 제공되지
않는다. Root에 위치 스타일을 강제하거나 input을 Root 전체에 겹치지 않는다.

Root 안의 텍스트는 네이티브 label 관계로 input의 접근 가능한 이름이 된다.
별도의 ID 등록이나 Effect 없이 서버 HTML에서도 관계가 성립한다. Label의
`id`를 바꾸어도 이 관계는 유지된다. 이름은 상태가 바뀌어도 유지해야 한다.

Root의 `id`와 `ref`는 label을 가리킨다. 실제 input의 `id`, `ref`, `autoFocus`,
`tabIndex`와 ARIA 속성은 HiddenInput에 지정한다. Label을 생략할 때는
HiddenInput에 `aria-label` 또는 `aria-labelledby`를 지정하거나 별도의 네이티브
label을 연결한다.

```tsx
<Switch.Root name="autosave">
  <Switch.Control>
    <Switch.Thumb />
  </Switch.Control>
  <Switch.HiddenInput id="autosave" aria-label="자동 저장" ref={inputRef} />
</Switch.Root>
```

## 상태와 상호작용

Root는 `checked`, `defaultChecked`, `onCheckedChange`로 controlled와 uncontrolled
상태를 지원한다. 기본 상태는 꺼짐이다. Switch는 두 상태만 제공하며
`indeterminate`를 지원하지 않는다. 네이티브 input의 `checked`가 보조 기술에
상태를 전달하므로 `aria-checked`를 중복으로 지정하지 않는다.

Label과 Control을 클릭하면 input이 활성화된다. Tab으로 input에 포커스하고
Space로 상태를 바꿀 수 있다. Enter 토글은 APG의 선택 사항이며 제공하지 않는다.
브라우저의 네이티브 키보드 동작을 사용한다.

`onCheckedChange(checked, eventDetails)`는 다음 상태와 변경 정보를 전달한다.
`eventDetails`에는 `reason: "input-change"`, 네이티브 `event`, `input`,
`isCanceled`, `cancel()`이 있다. `cancel()`을 호출하면 input과 시각 상태를
이전 값으로 유지한다. controlled 상태에서는 사용처가 `checked`를 갱신한다.

Root의 `disabled`는 입력과 Form 제출을 비활성화한다. `readOnly`는 포커스와
Form 참여를 유지하면서 클릭과 Space 변경을 막고 input에 `aria-readonly`를
지정한다. HTML checkbox에는 `readonly`가 적용되지 않으므로 Coral이 이 동작을
보완한다.

Root, Control, Thumb, Label은 `data-checked`, `data-unchecked`, `data-disabled`,
`data-readonly`, `data-required`로 현재 상태를 제공한다.

## Form과 Field

Root의 `name`, `value`, `form`, `required`를 HiddenInput에 전달한다. `value`의
기본값은 네이티브 checkbox와 같은 `"on"`이다. 켜진 input만 FormData에
포함된다. `required`는 켜짐을 요구한다. uncontrolled 상태는 Form reset이
완료된 뒤 초기 상태로 복원되며 시각 Part도 함께 갱신된다. reset은
`onCheckedChange`를 호출하지 않는다.

Field 안에서는 HiddenInput이 Field의 이름, label, description, error와
validation에 연결된다. Field와 Fieldset의 disabled 상태는 input과 모든 시각
Part에 반영된다. Root가 label이므로 Field.Label은 형제로 배치한다.

```tsx
<Field.Root name="notifications">
  <Field.Label>알림</Field.Label>
  <Switch.Root>
    <Switch.Control>
      <Switch.Thumb />
    </Switch.Control>
    <Switch.HiddenInput />
  </Switch.Root>
  <Field.Description>새 소식을 이메일로 보냅니다.</Field.Description>
  <Field.Error />
</Field.Root>
```

## 합성과 스타일

Control, Thumb과 Label은 `render`로 사용자 컴포넌트와 합성할 수 있다.

```tsx
<Switch.Root name="notifications">
  <Switch.Control render={<Box as="span" />}>
    <Switch.Thumb render={<Box as="span" />} />
  </Switch.Control>
  <Switch.Label render={<Text as="span" />}>알림</Switch.Label>
  <Switch.HiddenInput />
</Switch.Root>
```

`render`는 React element를 받는다. 사용자 컴포넌트는 전달받은 Props와 ref를
실제 요소에 전달해야 한다. label의 콘텐츠 모델을 지키도록 `span` 같은 phrasing
content를 사용하고, 별도의 버튼·링크·입력이나 포커스 지점을 만들지 않는다.
Root와 HiddenInput은 네이티브 label/input 관계를 유지하기 위해 `render`를
제공하지 않는다.

Coral은 크기, 색상, Thumb의 위치와 이동 효과를 제공하지 않는다. 제품은 상태
속성으로 스타일을 지정하고, `:has(input:focus-visible)`로 Control에 포커스를
표현한다. 클릭 영역, 강제 색상 모드와 모션 감소 설정도 제품이 검증한다.

## 설계 근거와 검증 범위

- [WHATWG checkbox](<https://html.spec.whatwg.org/multipage/input.html#checkbox-state-(type=checkbox)>):
  체크 상태, required와 checkbox에 적용되는 속성의 기준이다.
- [WHATWG label](https://html.spec.whatwg.org/multipage/forms.html#the-label-element):
  자식 input과의 이름 연결, 콘텐츠 모델과 활성화 동작의 기준이다.
- [WAI-ARIA switch](https://www.w3.org/TR/wai-aria-1.2/#switch):
  켜짐·꺼짐의 의미와 mixed를 지원하지 않는 근거다.
- [WAI-ARIA APG Switch](https://www.w3.org/WAI/ARIA/apg/patterns/switch/):
  Space 입력, 고정된 이름과 네이티브 checkbox 사용 시 checked 속성을 쓰는 기준이다.

Browser Test는 상태, 폼 연동, SSR의 label 관계, render 합성, 실제 포인터·키보드
입력과 axe 검사를 다룬다. 네이티브 input 자체의 전체 동작이나 실제 스크린 리더의
발화 결과를 자동 검사로 보장하지 않는다.

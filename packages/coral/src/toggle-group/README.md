# ToggleGroup

관련된 토글 버튼의 선택 상태와 포커스 이동을 관리하는 headless ToggleGroup이다.
Root는 `<div role="group">`을 렌더링하고 Item은 기존 Toggle의 네이티브
`<button>`과 `aria-pressed` 계약을 사용한다.

```tsx
import { ToggleGroup } from "@coral/react/toggle-group";

<ToggleGroup.Root multiple defaultValue={["bold"]} aria-label="텍스트 서식">
  <ToggleGroup.Item value="bold">굵게</ToggleGroup.Item>
  <ToggleGroup.Item value="italic">기울임</ToggleGroup.Item>
  <ToggleGroup.Item value="underline">밑줄</ToggleGroup.Item>
</ToggleGroup.Root>;
```

## 선택 상태

Root는 `value`, `defaultValue`, `onValueChange`를 제공한다. 선택값은 단일 선택과
다중 선택 모두 문자열 배열이며 기본값은 `[]`다. `value`가 `undefined`이면
uncontrolled 상태를 사용한다. `defaultValue`는 최초 상태만 지정한다.

`multiple`의 기본값은 `false`다. 단일 선택에서는 다른 Item을 누르면 기존 선택을
교체하고, 선택된 Item을 다시 누르면 빈 배열로 변경한다. 다중 선택에서는 해당
값만 추가하거나 제거한다. 중복값은 하나로 정리하며 단일 선택에 여러 값이
주어지면 첫 번째 값만 사용한다.

```tsx
const [alignment, setAlignment] = React.useState<string[]>(["left"]);

<ToggleGroup.Root value={alignment} onValueChange={setAlignment} aria-label="텍스트 정렬">
  <ToggleGroup.Item value="left">왼쪽</ToggleGroup.Item>
  <ToggleGroup.Item value="center">가운데</ToggleGroup.Item>
  <ToggleGroup.Item value="right">오른쪽</ToggleGroup.Item>
</ToggleGroup.Root>;
```

Item은 Root의 실제 DOM 하위에 배치하며 `value`는 그룹 안에서 고유해야 한다.
Item은 Root의 선택값으로 눌림
상태를 결정하므로 `pressed`, `defaultPressed`, `onPressedChange`를 제공하지
않는다. Item의 추가·삭제나 disabled 변경은 선택값을 자동으로 바꾸지 않는다.

사용자 Item `onClick`은 내부 처리 전에 실행된다. `preventDefault()`를 호출하면
선택 변경과 콜백 호출을 생략한다. `onValueChange(value, eventDetails)`의 변경
정보는 Toggle과 같은 `reason: "click"`, 네이티브 `event`, 실제 `button`,
`isCanceled`, `cancel()` 계약을 사용한다. `cancel()`은 내부 선택 변경을 취소하며
네이티브 클릭의 기본 동작은 유지한다. controlled 상태에서는 사용처가 선택값을
갱신한다. 포커스 이동은 선택 변경이나 이 콜백을 발생시키지 않는다.

## 키보드와 포커스

클라이언트에서는 활성 Item 하나만 Tab 순서에 포함한다. 그룹 재진입 시 마지막으로
포커스를 받은 활성 Item을 사용한다. 이력이 없거나 해당 Item이 삭제·비활성화되면
선택된 첫 번째 활성 Item, 그다음에는 첫 번째 활성 Item을 사용한다.

| 입력            | 동작                                            |
| --------------- | ----------------------------------------------- |
| Tab / Shift+Tab | 그룹에 진입하거나 그룹 밖으로 이동한다.         |
| 좌우 방향키     | 수평 그룹에서 이전·다음 활성 Item으로 이동한다. |
| 상하 방향키     | 수직 그룹에서 이전·다음 활성 Item으로 이동한다. |
| Home / End      | 첫 번째·마지막 활성 Item으로 이동한다.          |
| Enter / Space   | 네이티브 버튼 활성화로 선택을 변경한다.         |

`orientation`의 기본값은 `"horizontal"`이다. `loopFocus`의 기본값은 `true`이며
방향키로 끝에 도달하면 반대편으로 이동한다. `false`이면 끝에서 멈춘다. 수평
그룹의 좌우 이동은 실제 DOM의 `direction`을 따르므로 상위 요소의 RTL도 반영한다.
사용자 Item 또는 Root `onKeyDown`에서 `preventDefault()`를 호출하면 내부 이동을
생략한다. 보조 키가 함께 눌린 키 입력은 처리하지 않는다.

disabled, 숨겨진 Item과 inert 영역은 포커스 이동에서 제외한다. 동적으로 Item이
추가·삭제·재배치되거나 비활성화되어도 실제 DOM 순서로 Tab 진입 대상을 정리한다.
포커스를 가진 Item이 사라지거나 비활성화되면 남은 활성 Item으로 복구한다.
모든 Item이 비활성화되면 그룹은 Tab 순서에서 빠진다.

선택 상태와 ARIA는 서버 HTML에도 바로 포함된다. 서버 HTML은 각 Item의
네이티브 Tab 진입을 유지하고 hydration 뒤에 하나의 Tab 진입 대상으로 정리한다.
이 과정은 React 선택 상태를 추가로 갱신하지 않는다.

## 이름과 disabled, Form

사용처는 Root에 `aria-label` 또는 `aria-labelledby`로 그룹 이름을 제공한다.
별도의 Label Part나 자동 ID 연결은 제공하지 않는다. Item의 텍스트가 버튼 이름이
되며, 아이콘만 사용하면 Item에도 이름을 제공한다. 이름은 선택 상태가 바뀌어도
유지한다. `orientation`은 동작과 스타일 속성에 반영하며 `group`에서 지원하지
않는 `aria-orientation`은 자동으로 부여하지 않는다.

Root의 `disabled`와 Item의 `disabled`를 합쳐 실제 버튼에 전달한다. 비활성화는
현재 선택값을 유지한다. 네이티브 fieldset의 disabled 전파와 첫 번째 legend 예외도
브라우저의 실제 `:disabled` 상태를 기준으로 포커스 이동에 반영한다.

Item의 기본 `type`은 `"button"`이다. 명시적인 `type="submit"`과 `type="reset"`,
`name`, `form` 등은 네이티브 동작을 유지한다. Item의 문자열 `value`는 버튼의
네이티브 `value`에도 전달한다. 선택값을 폼 제출 값으로 자동 변환하거나 폼 reset으로
선택 상태를 복원하지 않는다. 별도의 HiddenInput, required와 readOnly 계약은 없다.

## 합성과 스타일

Root는 `useRender`의 Props·이벤트·ref 병합 규칙을 사용하고 공개 `render`를
지원한다. 합성 컴포넌트는 전달받은 Props와 ref를 하나의 비대화형 DOM 컨테이너에
연결해야 한다. Item은 네이티브 버튼을 유지하며 공개 `render`는 제공하지 않는다.
Root의 ref는 실제 컨테이너, Item의 ref는 실제 `HTMLButtonElement`를 가리킨다.

Root는 `data-disabled`, `data-multiple`, `data-orientation`을 제공한다. Item은
Toggle의 `data-pressed`, `data-unpressed`, `data-disabled`와
`data-orientation`을 제공한다. 상위 fieldset에서 전파된 비활성화는 `:disabled`로
스타일을 지정할 수 있다. 포커스 표시는 `:focus-visible`로 지정한다.

## 설계 근거와 검증 범위

- [WHATWG button](https://html.spec.whatwg.org/multipage/form-elements.html#the-button-element):
  콘텐츠 모델, type, disabled와 네이티브 Form 동작의 기준이다.
- [WAI-ARIA group](https://www.w3.org/TR/wai-aria-1.2/#group):
  관련 토글 버튼의 그룹 의미와 이름을 전달하는 기준이다.
- [APG Button](https://www.w3.org/WAI/ARIA/apg/patterns/button/):
  토글 버튼의 활성화, 이름과 눌림 상태의 기준이다.
- [APG Roving tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex):
  Tab 진입 대상과 방향키 포커스 이동의 구현 기준이다. `group` role 자체가 이
  키보드 동작을 요구하는 것은 아니며 Coral이 ToggleGroup의 계약으로 제공한다.
- [CSSOM View checkVisibility](https://drafts.csswg.org/cssom-view/#dom-element-checkvisibility):
  CSS와 닫힌 네이티브 컨테이너로 숨겨진 Item을 포커스 이동에서 제외하는 기준이다.

검증은 단일·다중 선택, controlled·uncontrolled 상태, 변경 취소, 네이티브
활성화와 선택의 연결, 실제 키보드 포커스 이동, RTL, 동적 Item 변경과 SSR의
초기 상태를 다룬다. 네이티브 버튼 동작의 전체 조합이나 실제 스크린 리더의 발화는
검증 범위에 포함하지 않는다.

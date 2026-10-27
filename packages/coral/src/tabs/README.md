# Tabs

관련된 콘텐츠 중 하나의 패널을 표시하는 headless Tabs다. Root는 상태를 관리하고,
List, Tab과 Panel은 탭 목록, 선택 버튼과 콘텐츠의 관계를 완성한다.

```tsx
import { Tabs } from "@coral/react/tabs";

<Tabs.Root defaultValue="overview">
  <Tabs.List aria-label="프로젝트 정보">
    <Tabs.Tab value="overview">개요</Tabs.Tab>
    <Tabs.Tab value="activity">활동</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="overview">프로젝트 개요</Tabs.Panel>
  <Tabs.Panel value="activity">최근 활동</Tabs.Panel>
</Tabs.Root>;
```

## Parts와 선택 상태

Root와 List의 기본 요소는 `<div>`다. List는 `role="tablist"`, Tab은
`<button type="button" role="tab">`, Panel은 `<div role="tabpanel">`을 렌더링한다.
Root 안에 List 하나를 두고, Tab은 해당 List의 실제 DOM 하위에 배치한다.
각 Tab에는 같은 문자열 `value`를 가진 Panel 하나를 연결한다. 값은 Root 안에서
고유해야 한다. Panel은 List 밖에 배치한다.

Root는 `value`, `defaultValue`, `onValueChange`를 제공한다. `value`가
`undefined`이면 비제어 상태를 사용하며 `defaultValue`는 최초 상태만 지정한다.
초기 선택은 사용처가 `value` 또는 `defaultValue`로 지정한다. 둘 다 생략하거나
`null`을 주면 선택된 탭이 없고 모든 패널이 숨겨진다. 일반적인 APG Tabs 구성에서는
처음부터 탭 하나를 선택해야 한다. Tab을 다시 활성화해도 선택을 해제하지 않는다.

Tab의 `aria-selected`는 선택값에 따라 설정한다. 기본 ID는 Root의 ID와 각 `value`에서
계산하고, 같은 `value`의 Tab과 Panel을 `aria-controls`와 `aria-labelledby`로
자동 연결한다. ID와 참조는 첫 렌더링에서 함께 결정하므로 서버 HTML에도 포함된다.

## ID와 연결 시점

Root는 Part의 `id`, `render` 요소의 `id`, React의 `useId()`로 생성한 ID 순서로
기준 ID를 결정한다. Tab과 Panel의 기본 ID는 각각
`${rootId}-tab-${encodeURIComponent(value)}`와
`${rootId}-panel-${encodeURIComponent(value)}`다. `value`가 같으면 서로 같은
계산 규칙으로 연결하며, 탭 순서가 바뀌어도 ID는 유지된다.

네이티브 `id`, Tab의 `aria-controls`와 Panel의 `aria-labelledby`는 사용처가
덮어쓸 수 있다. Part의 Props, `render` 요소의 Props, 계산한 기본값 순서로
우선한다. 사용자 지정 ID를 쓰면 그 ID를 참조하는 상대 Part의 속성도 함께
지정한다. ID 하나를 바꾸어도 상대 Part의 기본 참조는 자동으로 재계산하지 않는다.

```tsx
<Tabs.Root defaultValue="overview">
  <Tabs.List aria-label="프로젝트 정보">
    <Tabs.Tab value="overview" id="project-overview-tab" aria-controls="project-overview-panel">
      개요
    </Tabs.Tab>
    <Tabs.Tab value="activity">활동</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="overview" id="project-overview-panel" aria-labelledby="project-overview-tab">
    프로젝트 개요
  </Tabs.Panel>
  <Tabs.Panel value="activity">최근 활동</Tabs.Panel>
</Tabs.Root>
```

각 ID는 문서 안에서 고유해야 하며 비어 있거나 공백을 포함하지 않아야 한다.
같은 `value`를 사용하는 여러 Root는 서로 다른 기준 ID를 사용해야 한다.
사용자 컴포넌트는 전달받은 ID와 ARIA 속성을 실제 DOM에 그대로 연결해야 한다.

ID와 ARIA 참조는 서버 HTML, 클라이언트 첫 렌더링, ref 콜백과 마운트 Effect에서
동일하게 적용한다. 등록용 상태와 Effect는 사용하지 않는다. 사용자 지정 ID나
참조를 동적으로 변경하거나 Part를 조건부로 제거할 때는 사용처가 관계의 일관성을
유지해야 한다. 계산한 기본 참조는 상대 Part의 마운트 여부와 무관하게 제공한다.

비활성 Panel은 DOM에 유지하고 `hidden`으로 숨긴다. 패널 안의 입력 상태는
보존하며, 숨겨진 콘텐츠는 키보드 순서와 접근성 트리에서 제외된다. 사용처의 CSS는
`hidden` 요소를 다시 표시하지 않아야 한다. 지연 마운트, 제거와 전환 애니메이션은
제공하지 않는다.

## 활성화와 변경 취소

Root의 `activationMode` 기본값은 `"automatic"`이다. 탭이 키보드 또는 코드로
포커스를 받으면 선택한다. 포인터로 누를 때는 클릭으로 선택한다. 패널을 지연 없이
표시할 수 있는 경우에 사용한다. `"manual"`에서는 방향키가 포커스만 이동하며,
클릭 또는 Enter와 Space의 네이티브 버튼 활성화로 선택한다.

`onValueChange(value, eventDetails)`는 다른 탭을 선택할 때 호출한다. 변경 정보는
`reason: "focus" | "tab-press"`, 네이티브 `event`, 실제 `tab` 요소,
`isCanceled`, `cancel()`을 제공한다. `cancel()`은 내부 선택 변경을 취소하며
포커스 이동과 네이티브 기본 동작은 유지한다. 제어 상태에서는 사용처가 값을 갱신한다.

사용자 Tab `onClick` 또는 `onFocus`에서 `preventDefault()`를 호출하면 해당
선택 요청을 생략한다. 클릭의 선택 변경을 취소하려면 `onClick`에서 처리한다.
이미 선택된 탭을 활성화하거나 비활성 탭을 누르면 콜백을 호출하지 않는다.

## 키보드와 포커스

| 입력            | 동작                                          |
| --------------- | --------------------------------------------- |
| Tab / Shift+Tab | 목록에 진입하거나 목록 밖으로 이동한다.       |
| 좌우 방향키     | 수평 목록에서 이전·다음 활성 탭으로 이동한다. |
| 상하 방향키     | 수직 목록에서 이전·다음 활성 탭으로 이동한다. |
| Home / End      | 첫 번째·마지막 활성 탭으로 이동한다.          |
| Enter / Space   | 포커스를 가진 탭을 선택한다.                  |

Root의 `orientation` 기본값은 `"horizontal"`이다. List의 `aria-orientation`과
이동 방향에 반영한다. 수평 목록의 좌우 이동은 상위 요소를 포함한 실제 DOM의 RTL을
따른다. 보조 키를 함께 누른 입력과 현재 방향에 해당하지 않는 방향키는 처리하지 않는다.
사용자 Tab 또는 List `onKeyDown`의 `preventDefault()`는 내부 이동을 막는다.

Root의 `loopFocus` 기본값은 `true`이며 끝에서 반대편 탭으로 이동한다. `false`이면
끝에서 멈춘다. Tab 키로 목록에 다시 진입하면 선택된 활성 탭을 사용한다. 선택된
활성 탭이 없으면 첫 번째 활성 탭을 사용한다. 수동 모드에서도 목록 안의 방향키
이동 중에는 포커스와 선택을 구분한다.

disabled, 숨겨진 탭과 inert 영역은 이동 대상에서 제외한다. 탭이 추가·제거·재배치되어도
실제 DOM 순서를 따른다. 포커스를 가진 탭이 제거되거나 비활성화되면 남은 활성 탭으로
포커스를 복구한다. 자동 모드에서는 복구된 포커스도 선택을 요청한다. 모든 탭이
비활성화되면 목록은 Tab 순서에서 빠진다. 값의 추가·제거·비활성화 자체로 선택값을
변경하지 않으므로 동적인 구성의 유효한 선택값은 사용처가 관리한다.

Panel의 기본 `tabIndex`는 `0`이므로 Tab 키로 패널의 시작에 진입할 수 있다.
첫 콘텐츠가 이미 포커스를 받을 수 있는 경우에는 `tabIndex={-1}`을 지정할 수 있다.
비활성 패널은 `hidden`이므로 기본 Tab 순서에 포함되지 않는다. 서버 HTML에서는
선택된 탭만 `tabIndex={0}`이며, 선택이 없을 때의 첫 활성 탭은 hydration 후 정한다.

## 이름, disabled와 Form

사용처는 List에 `aria-label` 또는 `aria-labelledby`로 접근 가능한 이름을 제공한다.
Tab의 콘텐츠가 탭 이름과 연결된 패널의 이름이 된다. 아이콘만 사용하는 탭에는
접근 가능한 이름을 별도로 제공해야 한다.

Root의 `disabled`와 Tab의 `disabled`를 합쳐 네이티브 버튼에 전달한다. 현재
선택과 패널은 유지한다. 상위 fieldset의 disabled 전파와 첫 legend 예외는 실제
브라우저의 `:disabled` 상태에 따라 포커스 이동에 반영한다.

Tab은 기본 `type="button"`으로 폼 제출을 방지한다. 명시적인 `type="submit"`,
`type="reset"`, `name`과 `form`은 네이티브 동작을 유지하며 Tab의 `value`도 버튼에
전달한다. 선택값을 제출하는 HiddenInput과 폼 reset 연동은 제공하지 않는다.

## 합성과 스타일

모든 Part는 `render`를 제공하며 Core의 Props, 이벤트와 Ref 병합 규칙을 따른다.
사용자 컴포넌트는 전달받은 Props와 Ref를 실제 DOM에 연결해야 한다. Tab의 최종
요소는 네이티브 `<button>`을 유지해야 키보드 활성화, disabled와 폼 동작을
보장할 수 있다. Root와 List는 비대화형 컨테이너를, Panel은 콘텐츠 컨테이너를
유지해야 한다.

모든 Part에 `data-orientation`을 제공한다. Root, List와 Panel에는 Root의
`data-disabled`를, Tab에는 합쳐진 `data-disabled`를 제공한다. Tab과 Panel에는
선택에 따라 `data-active` 또는 `data-inactive`를 제공한다. 상위 fieldset의
비활성화는 `:disabled`, 포커스 표시는 `:focus-visible`로 스타일을 지정한다.

## 설계 근거와 검증 범위

- [WHATWG button](https://html.spec.whatwg.org/multipage/form-elements.html#the-button-element):
  버튼의 콘텐츠 모델, type 기본값, 활성화, disabled와 폼 동작의 기준이다.
- [WHATWG hidden](https://html.spec.whatwg.org/multipage/interaction.html#the-hidden-attribute):
  비활성 패널을 숨기며 DOM을 유지하는 기준이다.
- [WHATWG id](https://html.spec.whatwg.org/multipage/dom.html#the-id-attribute):
  각 Part의 ID와 문서 안에서의 고유성, ID 참조의 기준이다.
- [WAI-ARIA tab, tablist와 tabpanel](https://www.w3.org/TR/wai-aria-1.2/#tab):
  탭과 패널의 의미, 선택 상태와 ID 참조 관계의 기준이다.
- [APG Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/):
  자동·수동 활성화, 방향키 이동과 Tab 진입의 기준이다. 선택이 없는 상태와
  `loopFocus={false}`는 Coral이 명시적으로 제공하는 확장이다. 탭 삭제 단축키와
  컨텍스트 메뉴는 제공하지 않는다.
- [Base UI Tabs](https://base-ui.com/react/components/tabs):
  Root, List, Tab과 Panel의 조합 구조를 검토할 때 참고했다. Indicator와 애니메이션
  상태는 현재 Coral의 지원 범위에 포함하지 않는다.

검증은 실제 브라우저에서 서버 HTML과 첫 마운트의 ID·ARIA 관계,
기본값과 네이티브 속성 덮어쓰기, 제어·비제어 선택, 변경 취소,
키보드 이동과 활성화, RTL, 동적 탭 변경, 중첩 구성, render 합성과 패널 상태
보존을 다룬다. 실제 스크린 리더의 발화와 네이티브 버튼의 모든 폼 동작 조합은
자동 검증 범위에 포함하지 않는다.

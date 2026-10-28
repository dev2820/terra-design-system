# Toolbar

관련 명령을 하나의 Tab 진입점으로 묶는 headless Toolbar다. Root가 방향키 포커스
이동을 관리하고, 버튼의 실행과 링크의 탐색은 네이티브 HTML에 맡긴다. 세 개
이상의 제어 요소를 묶을 때 사용한다. 스타일과 명령 실행 로직은 사용처가 제공한다.

```tsx
import { Toolbar } from "@coral/react/toolbar";
import { Toggle } from "@coral/react/toggle";

<Toolbar.Root aria-label="문서 편집">
  <Toolbar.Button onClick={undo}>실행 취소</Toolbar.Button>
  <Toolbar.Group aria-label="텍스트 서식">
    <Toolbar.Button render={<Toggle.Root />}>굵게</Toolbar.Button>
    <Toolbar.Button render={<Toggle.Root />}>기울임</Toolbar.Button>
  </Toolbar.Group>
  <Toolbar.Separator />
  <Toolbar.Link href="/help">도움말</Toolbar.Link>
</Toolbar.Root>;
```

## Parts와 이름

| Part      | 기본 요소              | 역할                                            |
| --------- | ---------------------- | ----------------------------------------------- |
| Root      | `<div role="toolbar">` | 이름과 방향, 하나의 Tab 진입점을 제공한다.      |
| Group     | `<div role="group">`   | 관련 제어 요소를 의미 있는 그룹으로 묶는다.     |
| Button    | `<button>`             | 실행 버튼을 Toolbar의 포커스 이동에 참여시킨다. |
| Link      | `<a href>`             | 탐색 링크를 Toolbar의 포커스 이동에 참여시킨다. |
| Separator | `<hr>`                 | Toolbar 방향에 수직인 정적 구분선을 제공한다.   |

사용처는 Root에 `aria-label` 또는 `aria-labelledby`로 이름을 제공한다. 아이콘만
있는 버튼과 링크에도 이름이 필요하다. Parts는 Root의 실제 DOM 하위에 배치한다.
일반 버튼과 링크는 각각 Button과 Link로 참여시키며, 임의의 자식 요소를 자동으로
포커스 이동에 포함하지 않는다. 관련 제어 요소는 Group으로 묶고, 사용처는
`aria-label` 또는 `aria-labelledby`로 그룹의 이름을 지정할 수 있다. Group은
비대화형 컨테이너이며 별도의 Tab 진입점이나 포커스 이동, 선택 상태를 만들지 않는다.
그룹 안과 밖의 Button·Link 사이에서도 Root의 포커스 이동이 이어진다.

## 키보드와 포커스

클라이언트에서는 사용 가능한 제어 요소 하나만 Tab 순서에 포함한다. 처음에는
DOM 순서의 첫 요소, 재진입할 때는 마지막으로 포커스를 받은 요소를 사용한다.

| 입력            | 동작                                          |
| --------------- | --------------------------------------------- |
| Tab / Shift+Tab | Toolbar에 진입하거나 Toolbar 밖으로 이동한다. |
| 좌우 방향키     | 수평 Toolbar에서 이전·다음 요소로 이동한다.   |
| 상하 방향키     | 수직 Toolbar에서 이전·다음 요소로 이동한다.   |
| Home / End      | 첫 번째·마지막 요소로 이동한다.               |
| Enter / Space   | 버튼의 네이티브 활성화 동작을 유지한다.       |
| Enter           | 링크의 네이티브 탐색 동작을 유지한다.         |

Root의 `orientation` 기본값은 `"horizontal"`, `loopFocus` 기본값은 `true`다.
`loopFocus={false}`이면 경계에서 멈춘다. 수평 이동은 상위 요소를 포함한 실제
CSS `direction`을 따르며, 수직 Toolbar는 상하 방향키를 사용한다. 보조 키가 있는
입력과 Toolbar 방향에 해당하지 않는 방향키는 처리하지 않는다. Button, Link 또는
Root의 `onKeyDown`에서 `preventDefault()`를 호출하면 내부 이동을 취소할 수 있다.

네이티브 `disabled`, 숨겨진 요소와 inert 영역은 이동에서 제외한다. fieldset의
disabled 전파와 첫 legend 예외도 실제 `:disabled` 상태로 반영한다. 동적으로
추가·삭제·재배치되거나 숨김·비활성화된 요소는 실제 DOM 순서로 반영한다.
포커스를 가진 요소가 사라지거나 사용할 수 없게 되면 남은 요소로 복구한다.
사용 가능한 요소가 없으면 Toolbar는 Tab 순서에서 빠진다. 중첩된 Toolbar는
각각 독립적인 포커스 범위를 갖는다.

서버 HTML에는 Role과 방향, 콘텐츠를 바로 포함한다. 서버에서는 각 제어 요소의
Tab 진입을 유지하며 hydration 이후에 하나의 진입점으로 정리한다.

## Toggle 합성

`<Toolbar.Button render={<Toggle.Root />}>`로 눌림 상태를 가진 버튼을 조합한다.
Toggle의 초기 상태와 변경 취소 계약은 유지한다. 방향키 이동은 상태를 변경하지 않는다.

Toolbar의 포커스 이동에는 Button과 Link로 명시한 요소가 참여한다. Toggle을
직접 배치해도 자동으로 참여하지 않는다. 합성된 Toggle은 자신의 눌림 상태를
관리하고, Toolbar는 해당 버튼의 포커스 이동을 관리한다.

텍스트 입력, Slider, RadioGroup, Tabs, ToggleGroup처럼 자체 방향키 계약을 가진 제어 요소와
메뉴·팝오버의 복합 동작은 지원 범위에 포함하지 않는다. 입력의 커서 이동과
Toolbar 이동 사이의 전환 규칙은 별도 설계가 필요하다. 편집기에서 Toolbar로
이동하는 단축키도 사용처가 제공한다.

## Disabled, Form과 합성

Button은 네이티브 `disabled`를 사용한다. Toolbar 전체의 disabled나 링크의
disabled를 나타내는 별도 Prop은 제공하지 않는다. 기본 요소를 사용할 때 Button의
`type` 기본값은 `"button"`이다. `render`를 사용하면 대상 요소나 컴포넌트가 자신의
기본값을 결정하고, Toolbar는 기본 `type`을 전달하지 않는다. 사용자가 명시한
`type`은 Core의 Props 병합 규칙에 따라 전달한다. `submit`, `reset`, `name`,
`value`, `form`은 네이티브 동작을 유지한다. Toolbar 자체는 선택값이나 폼 값을 만들지 않는다.

Link는 `href`가 필요하며 `target`, `rel`, `download`와 보조 키 클릭을 그대로
전달한다. 링크를 버튼으로 재해석하거나 탐색을 클릭 핸들러로 대체하지 않는다.

모든 Part는 `render`를 제공하고 Core의 Props·이벤트·Ref 병합 규칙을 따른다.
Button의 대체 컴포넌트는 네이티브 button으로, Link는 href가 있는 a로 렌더링해야
한다. 사용자 컴포넌트는 전달받은 Props와 Ref를 실제 DOM에 연결해야 한다.
Root와 Group은 비대화형 컨테이너로 유지하고, Separator를 대체하면 정적 구분선 의미를
유지해야 한다. 관리되는 제어 요소의 `tabIndex`는 Toolbar가 소유한다.

Root, Group, Button과 Link는 `data-orientation`을 제공한다. Group은 `group`에서
지원하지 않는 `aria-orientation`을 자동으로 부여하지 않는다. Separator의
`data-orientation`은 구분선 자체의 방향이다. 수평 Toolbar에서는 수직 구분선이
되며, 수직 Toolbar에서는 수평 구분선이 된다. `decorative`의 기본값은 `false`다.
`true`이면 구분선을 접근성 트리에서 제외하고 `aria-orientation`을 생략한다.
포커스 표시는 `:focus-visible`, 네이티브 비활성화 표시는 `:disabled`를 사용한다.

## 설계 근거와 검증 범위

- [WHATWG div](https://html.spec.whatwg.org/multipage/grouping-content.html#the-div-element):
  컨테이너의 콘텐츠 모델을 확인했다. 네이티브 요소에는 Toolbar 포커스 관리가 없다.
- [WHATWG button](https://html.spec.whatwg.org/multipage/form-elements.html#the-button-element):
  활성화, type 기본값과 Form 동작, disabled, 대화형 자식 제한의 근거다. type 생략이나
  잘못된 값은 제출 버튼이 될 수 있으므로 기본 button 렌더링에서는 type을 명시한다.
- [WHATWG a](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-a-element):
  href가 있을 때의 링크 의미와 네이티브 탐색 동작의 근거다.
- [WHATWG hr](https://html.spec.whatwg.org/multipage/grouping-content.html#the-hr-element),
  [WAI-ARIA separator](https://www.w3.org/TR/wai-aria-1.2/#separator):
  구분선 의미, 기본 수평 방향과 정적 구분선의 근거다.
- [WAI-ARIA toolbar](https://www.w3.org/TR/wai-aria-1.2/#toolbar),
  [APG Toolbar](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/):
  그룹 의미와 이름, 방향과 키보드 포커스 이동의 기준이다.
- [WAI-ARIA group](https://www.w3.org/TR/wai-aria-1.2/#group):
  Toolbar 안에서 관련 제어 요소를 묶는 Group의 의미와 이름을 제공하는 기준이다.
- [Base UI Toolbar](https://base-ui.com/react/components/toolbar):
  기존 컴포넌트와의 합성 구조를 참고했다. Coral은 위에서 명시한 Parts와 범위를 제공한다.

실제 Chromium Browser Test에서 키보드 포커스, DOM 순서와 가용성 변경, RTL,
Toggle 합성, Group의 의미와 그룹 경계를 넘는 이동, render·Ref,
구분선의 조건부 ARIA와 axe를 검증한다.
네이티브 버튼과 링크 동작의 전체 조합이나 실제 스크린 리더 발화는 검증하지 않는다.

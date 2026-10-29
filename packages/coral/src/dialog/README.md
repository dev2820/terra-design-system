# Dialog

페이지 위에서 하나의 작업을 수행하는 headless Dialog다. Root의 `modal`로 모달과
비모달을 선택한다. Coral이 포커스 이동·복원과 모달의 포커스 순환, 외부 영역의
비활성화와 페이지 Scroll Lock을 제공한다.
배치, 크기, 배경 효과와 내부 스크롤 스타일은 사용처가 제공한다.

```tsx
import * as React from "react";
import { Dialog } from "@coral/react/dialog";

function ProfileDialog() {
  const titleId = React.useId();
  const descriptionId = React.useId();
  const nameRef = React.useRef<HTMLInputElement>(null);

  return (
    <Dialog.Root>
      <Dialog.Trigger>프로필 편집</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="backdrop" />
        <Dialog.Positioner className="positioner">
          <Dialog.Content
            className="content"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            initialFocus={nameRef}
          >
            <Dialog.Header className="header">
              <Dialog.Title id={titleId}>프로필 편집</Dialog.Title>
              <Dialog.Description id={descriptionId}>
                다른 사람에게 표시할 이름을 입력하세요.
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Body className="body">
              <label>
                이름
                <input ref={nameRef} />
              </label>
            </Dialog.Body>
            <Dialog.Footer className="footer">
              <Dialog.Close>닫기</Dialog.Close>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

## Parts와 의미

| Part        | 기본 요소                                             | 책임                                                                           |
| ----------- | ----------------------------------------------------- | ------------------------------------------------------------------------------ |
| Root        | DOM 없음                                              | 제어·비제어 열림 상태와 Parts 사이의 관계를 제공한다.                          |
| Trigger     | `<button type="button">`                              | Dialog를 열고 `aria-haspopup`, `aria-expanded`와 열린 Content의 ID를 연결한다. |
| Portal      | `<div>`                                               | 열려 있는 동안 자식을 `document.body`로 옮긴다.                                |
| Backdrop    | `<div aria-hidden="true">`                            | 모달의 배경 효과를 적용할 요소를 제공한다.                                     |
| Positioner  | `<div>`                                               | Content의 배치와 바깥 스크롤을 위한 컨테이너를 제공한다.                       |
| Content     | `<div role="dialog" aria-modal="true" tabindex="-1">` | 실제 Dialog 영역과 포커스 경계를 제공한다.                                     |
| Header      | `<div>`                                               | 제목·설명·닫기 버튼 등을 묶는다.                                               |
| Title       | `<h2>`                                                | Dialog의 제목을 제공한다.                                                      |
| Description | `<p>`                                                 | 필요한 경우 짧은 설명을 제공한다.                                              |
| Body        | `<div>`                                               | 본문과 내부 스크롤 영역을 구성한다.                                            |
| Footer      | `<div>`                                               | 작업 버튼 등을 묶는다.                                                         |
| Close       | `<button type="button">`                              | Dialog를 닫는다.                                                               |

Content에 `aria-label` 또는 `aria-labelledby`로 이름을 지정한다. Title과
Description의 ID 연결은 사용처가 명시한다. 설명이 없으면 `aria-describedby`를
생략한다. 긴 본문, 목록과 표를 통째로 설명에 연결하지 않는다. Header, Body와
Footer는 선택적인 구조이며 별도의 landmark Role이나 스타일을 부여하지 않는다.
닫기 버튼을 포함한 Dialog의 제어 요소는 Content 안에 배치한다.

Root는 DOM을 생성하지 않으므로 `render`를 제공하지 않는다. 나머지 Part는 모두
`render`와 Core의 Props·이벤트·Ref 합성을 지원한다. 사용자 컴포넌트는 전달받은
Props와 Ref를 실제 DOM에 연결해야 한다. Trigger와 Close는 네이티브 button을
유지한다. Backdrop과 Positioner는 비대화형 컨테이너로 유지한다.
`render`를 사용하면 대상 컴포넌트가 기본 `type`을 결정한다. 명시한
`type`, Form 속성과 네이티브 `disabled`는 그대로 전달한다.

## 상태와 닫기 요청

Root는 `open`, `defaultOpen`과 `onOpenChange(open, details)`를 제공한다.
`defaultOpen`의 기본값은 `false`다. 제어 상태에서는 사용처가 `open`을 갱신한다.
Trigger는 열기 전용이며 열린 Dialog를 다시 닫는 토글로 동작하지 않는다.

`modal`의 기본값은 `true`다. `modal={false}`로 비모달 Dialog를 연다.

| 동작                              | 모달                       | 비모달                                |
| --------------------------------- | -------------------------- | ------------------------------------- |
| Content의 `aria-modal`            | `true`                     | 생략한다.                             |
| Tab·Shift+Tab                     | 모달 영역 안에서 순환한다. | 실제 DOM 순서로 외부 요소와 이동한다. |
| 외부 `inert`와 페이지 Scroll Lock | 적용한다.                  | 적용하지 않는다.                      |
| Backdrop                          | 렌더링한다.                | 렌더링하지 않는다.                    |
| 초기 포커스와 `initialFocus`      | 지원한다.                  | 지원한다.                             |
| Escape·외부 클릭 닫기 요청        | 지원한다.                  | 지원한다.                             |

열린 상태에서 `modal`을 바꾸면 외부 비활성화, Scroll Lock, 포커스 경계와 ARIA를
즉시 갱신한다. 모드 전환만으로 초기·최종 포커스 콜백을 다시 호출하지 않는다.
비모달에서도 외부 클릭 닫기를 취소하려면 `onOpenChange`에서 `outside-press`를
확인하고 `details.cancel()`을 호출한다. 외부로 포커스를 옮기는 동작은 Dialog를
닫지 않는다. 비모달 Positioner는 기본 `pointer-events: none`으로 외부 클릭을
통과시키고, Content는 기본 `pointer-events: auto`로 내부 조작을 받는다. 사용처가
이 값을 덮어쓸 때도 외부 조작을 유지해야 한다. Content 자체를 배치할 수도 있다.

`details.reason`은 `trigger-press`, `close-press`, `escape-key` 또는
`outside-press`다. `details.event`는 원본 DOM 이벤트이고, `details.trigger`는
Dialog를 연 Trigger다. Trigger 없이 열었으면 `null`일 수 있다.
`details.cancel()`로 비제어 상태의 변경을 취소할 수 있고, 취소 여부는
`details.isCanceled`로 확인한다. 제어 상태에서는 사용처도 이 값을 존중해야 한다.
사용자 이벤트 핸들러의 `preventDefault()`도 해당 요청을 막는다.

Portal, Backdrop, Positioner와 Content는 닫히면 제거한다. Portal의 `container`에
같은 Document의 body 아래에 연결된 HTMLElement를 지정할 수 있다. Portal은
서버에서 렌더링하지 않고 클라이언트가 마운트된 뒤 생성한다. Portal을 생략한
Content는 서버 HTML에 포함할 수 있다.

Trigger, Backdrop, Positioner와 Content는 열린 동안 `data-open`을 제공한다.
입장·퇴장 애니메이션을 위한 지연 제거와 detached Trigger는 현재
지원 범위에 포함하지 않는다.

## 키보드와 모달 동작

- 열릴 때 Content 안으로 포커스를 이동한다.
- 모달에서는 Tab과 Shift+Tab이 사용 가능한 요소 사이에서 순환한다. 요소가 없으면 Content에 머문다.
- Escape는 가장 위의 Dialog 하나에 닫기를 요청한다.
- Content 밖에서 시작하고 끝난 기본 포인터 클릭은 닫기를 요청한다.
- Content 안에서 시작한 드래그, 스크롤 제스처, 스크롤바 조작과 보조 버튼 클릭은 닫지 않는다.
- 닫힐 때 Dialog를 연 Trigger 또는 열기 전에 포커스가 있던 요소로 복원한다. 비모달에서 이미 외부로 포커스를 옮겼으면 해당 포커스를 유지한다.

모달의 외부 영역에는 실제 `inert`를 적용한다. 열린 동안 추가된 외부 요소도 비활성화하고
닫힐 때 기존 `inert` 상태를 복원한다. 문서와 body의 스크롤을 잠그고, 마지막
모달 Dialog가 닫히면 기존 overflow와 스크롤바 보정 값을 복원한다. 가장 위의 모달과
그 하위의 비모달 Dialog는 같은 모달 경계에 참여한다. 부모 모달 안의 비모달을 열면
부모와 자식 사이의 이동을 허용하고, 페이지의 나머지 영역은 계속 비활성화한다.
자식 모달을 열면 부모 영역도 비활성화한다. 자식이 닫히면 부모의 모달 동작을
복구한다. 비모달이 남아 있어도 마지막 모달을 닫으면 페이지 Scroll Lock을 해제한다.

숨김·inert·disabled 요소는 포커스 이동에서 제외한다. DOM의 추가·삭제와 가용성
변경을 반영하고, 모달에서 포커스를 가진 요소가 사라지거나 비활성화되면 복구한다.
Content 앞뒤에는 Tab 경계를 감지하는 숨겨진 span을 렌더링한다. 모달 경계에 포함되지
않는 비모달의 span은 Tab 순서에서 제외한다. Content 내부의
일반 Tab 이동과 날짜 입력의 부분 필드 이동은 브라우저에 맡긴다.
포커스 탐색 범위는 Content의 일반 DOM 하위다. Shadow DOM과 iframe 내부를
가로지르는 탐색은 제공하지 않는다.

## 초기 포커스와 복원 대상

Base UI의 인터페이스를 따라 `initialFocus`와 `finalFocus`를 Content에 둔다.

| 값                               | 동작                                                           |
| -------------------------------- | -------------------------------------------------------------- |
| 생략 또는 `true`                 | 기본 동작을 사용한다.                                          |
| `false`                          | Coral이 포커스를 이동하지 않는다.                              |
| `RefObject<HTMLElement \| null>` | 참조한 요소로 이동한다. 사용할 수 없으면 기본 동작을 사용한다. |
| 함수                             | 상호작용 유형을 받아 대상 요소 또는 동작을 반환한다.           |

기본 초기 대상은 첫 번째 Tab 가능 요소다. React의 `autoFocus`로 이미 Content
안에 포커스가 있으면 이를 유지한다. 터치로 열었으면 Content 자체에 포커스를
주어 가상 키보드가 불필요하게 열리는 것을 피한다. Tab 가능한 요소가 없어도
Content에 포커스를 준다. 명시한 초기 대상은 Content 또는 그 하위여야 한다.

비모달이 닫힐 때 이미 외부 요소에 포커스가 있으면 기본 복원을 생략한다.
`finalFocus`의 Ref나 함수가 사용할 수 있는 요소를 명시하면 해당 요소로 이동한다.
명시한 요소를 사용할 수 없을 때도 외부 포커스를 유지한다.

함수는 `"mouse"`, `"touch"`, `"pen"`, `"keyboard"` 또는 프로그램으로 상태를
변경한 경우의 `""`를 받는다. 요소를 반환하면 그 요소로 이동한다. `true` 또는
`null`은 기본 동작을 사용하고, `false` 또는 반환값이 없으면 이동을 생략한다.
생략한 Prop과 함수의 반환값 `undefined`는 서로 다르게 처리한다.

```tsx
<Dialog.Content
  initialFocus={secondInputRef}
  finalFocus={nextTaskButtonRef}
  aria-labelledby={titleId}
>
  {/* ... */}
</Dialog.Content>
```

정적 제목에 먼저 포커스를 주려면 제목에 `tabIndex={-1}`을 지정하고 해당 Ref를
전달한다. 초기 이동을 생략해도 모달의 외부 비활성화와 Tab 순환은 유지한다.
`initialFocus={false}`나 `finalFocus={false}`를 사용하면 사용처가 작업 흐름에
맞는 포커스 이동을 제공해야 한다.

## 두 가지 스크롤 구성

바깥 스크롤에서는 Positioner를 뷰포트 크기로 고정하고 `overflow: auto`를 준다.
Content의 높이는 본문 길이대로 유지한다.

```css
.backdrop {
  position: fixed;
  inset: 0;
  background: rgb(0 0 0 / 40%);
}
.positioner {
  position: fixed;
  inset: 0;
  overflow: auto;
  padding: 2rem;
}
.content {
  width: min(32rem, 100%);
  margin-inline: auto;
}
```

내부 스크롤에서는 Content를 제한된 높이의 flex 컨테이너로 만들고 Body만 스크롤한다.

```css
.positioner {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 2rem;
}
.content {
  display: flex;
  flex-direction: column;
  max-height: 100%;
  width: min(32rem, 100%);
}
.body {
  min-height: 0;
  overflow: auto;
}
.header,
.footer {
  flex-shrink: 0;
}
```

Positioner는 선택 사항이다. Content 자체를 fixed로 중앙 배치할 수도 있다.
외부 클릭의 경계는 Backdrop이나 Positioner의 크기가 아닌 Content다. 중첩 시
Portal의 순서와 z-index, 배경의 시각적 표현은 사용처가 관리한다.

## 설계 근거와 검증 범위

- [WHATWG dialog](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element):
  show()의 비모달과 showModal()의 모달 동작, Top Layer, 외부 비활성화와
  비모달 외부 포커스의 복원 조건을 확인했다. Coral의 modal은 상호작용 범위를
  선택하며, 두 모드 모두 Escape와 외부 클릭의 닫기 요청을 제공한다.
- [CSS Top Layer](https://drafts.csswg.org/css-position-4/#top-layer):
  네이티브 showModal의 Content는 일반 조상 레이아웃에서 분리된다. Positioner가
  Content를 배치하고 스크롤하는 공개 구조를 유지하기 위해 div와 dialog Role을 사용한다.
- [WAI-ARIA dialog](https://www.w3.org/TR/wai-aria-1.2/#dialog),
  [aria-modal](https://www.w3.org/TR/wai-aria-1.2/#aria-modal),
  [APG Modal Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/):
  이름, 선택적인 설명, 실제 모달 동작과 키보드·포커스 계약의 기준이다.
- [WHATWG inert](https://html.spec.whatwg.org/multipage/interaction.html#inert):
  실제 외부 상호작용과 접근성 트리의 비활성화 근거다.
- [WHATWG Focus](https://html.spec.whatwg.org/multipage/interaction.html#focus):
  Tab 순서, editing host와 네이티브 입력의 내부 포커스 동작을 유지하는 근거다.
- [Base UI Dialog](https://base-ui.com/react/components/dialog):
  Content의 initialFocus·finalFocus 인터페이스와 상호작용 유형별 기본값을 참고했다.

[dialog.test.tsx](./dialog.test.tsx)의 Chromium Browser Test에서 초기·최종 포커스,
Tab 순환, Escape, 실제 외부 클릭, 이벤트 취소,
외부 비활성화, 모달·비모달 전환, 두 모드가 섞인 중첩, 두 스크롤 구성, render·Ref와 axe를 검증한다.
실제 스크린 리더 발화와 모바일 기기별 스크롤 동작은 별도 검증이 필요하다.

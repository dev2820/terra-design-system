# Popover

버튼 옆에서 설명이나 간단한 작업을 제공하는 headless 비모달 Popover다. Coral은
열림 상태, 상대 위치 배치, 화면 경계 보정, 포커스 이동·복원과 닫기 동작을
제공한다. 크기, 색상, 테두리, 그림자와 화살표의 모양은 사용처가 정한다.

```tsx
import { Popover } from "@coral/react/popover";

function DisplaySettings() {
  return (
    <Popover.Root>
      <Popover.Trigger>표시 설정</Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner side="bottom" align="start" sideOffset={8}>
          <Popover.Content className="popover">
            <Popover.Arrow className="arrow" />
            <Popover.Title>표시 설정</Popover.Title>
            <Popover.Description>화면에 표시할 항목을 선택하세요.</Popover.Description>
            <label>
              <input type="checkbox" /> 자세한 정보 표시
            </label>
            <Popover.Close>닫기</Popover.Close>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
```

## Parts와 의미

| Part        | 기본 요소                           | 책임                                                                                                             |
| ----------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Root        | DOM 없음                            | 제어·비제어 열림 상태와 Parts 사이의 관계를 제공한다.                                                            |
| Trigger     | `<button type="button">`            | 열림 상태를 토글하고 배치 기준이 된다. `aria-haspopup="dialog"`, `aria-expanded`와 열린 Content의 ID를 연결한다. |
| Portal      | `<div>`                             | 열려 있는 동안 자식을 `document.body` 또는 지정한 컨테이너로 옮긴다.                                             |
| Positioner  | `<div popover="manual">`            | 네이티브 상위 표시 계층에 진입하고 Trigger 옆의 좌표와 화면 경계를 계산한다.                                     |
| Content     | `<div role="dialog" tabindex="-1">` | 실제 패널 영역과 접근성 이름·설명, 포커스 이동·복원과 닫기를 제공한다.                                           |
| Arrow       | `<div aria-hidden="true">`          | Trigger를 가리키는 장식 영역의 위치를 제공한다.                                                                  |
| Title       | `<h2>`                              | Content의 접근 가능한 이름을 자동으로 연결한다.                                                                  |
| Description | `<p>`                               | Content의 짧은 설명을 자동으로 연결한다.                                                                         |
| Close       | `<button type="button">`            | Popover를 명시적으로 닫는다.                                                                                     |

Root 하나에 Trigger, Positioner와 Content를 각각 하나씩 배치한다. Content는
Positioner의 자손이어야 하며, Arrow, Title, Description과 Close는 Content 안에
배치한다. Portal, Arrow, Title, Description과 Close는 선택 사항이다. Portal을
생략해도 Positioner는 네이티브 상위 표시 계층에 표시된다. Header, Body와 Footer는
제공하지 않으며 필요한 컨테이너는 사용처에서 구성한다.

Root는 DOM을 생성하지 않으므로 `render`를 제공하지 않는다. 나머지 Part는 모두
Core의 Props·이벤트·Ref 합성을 지원한다. 사용자 컴포넌트는 받은 Props와 Ref를
실제 DOM에 연결해야 한다. Trigger와 Close는 네이티브 button의 의미, 키보드,
Disabled와 Form 동작을 유지해야 한다. `render`를 사용하면 대상 컴포넌트가
기본 `type`을 정한다. 명시적인 `type`과 네이티브 Form 속성은 그대로 전달한다.

Positioner의 대체 요소도 `popover` 속성과 `showPopover()`를 지원하는 HTML 요소여야
한다. Positioner의 고정 배치, 좌표, 비대화형 컨테이너와 Content의 포인터 조작을
유지해야 한다. Positioner에는 네이티브 Popover의 margin, padding, border와
배경을 초기화하는 최소 스타일을 적용한다. 제품의 시각적 스타일은 Content에
적용한다.

## 이름과 설명

Title과 Description은 명시한 `id` 또는 자동 생성한 ID를 Content의
`aria-labelledby`와 `aria-describedby`에 연결한다. 해당 Part가 제거되면 자동
연결도 제거한다. 각 Part는 하나씩 사용한다. 이름과 설명의 자동 연결은 현재
사용처가 ID를 직접 연결하는 Coral Dialog와 다른 계약이다.

Title은 선택 사항이지만 `role="dialog"`의 접근 가능한 이름은 필수다. 제목이
없으면 Content에 `aria-label` 또는 외부 제목의 `aria-labelledby`를 지정한다.
Content에 지정한 `aria-labelledby`와 `aria-describedby`는 자동 연결보다
우선한다. `aria-label`을 지정하면 Title의 자동 연결은 생략한다. `render` 대상의
Props보다 Part에 지정한 Props가 우선하므로 명시적인 접근성 연결은 Content의
Props로 전달한다.

Description에는 짧은 설명을 넣는다. 긴 본문, 목록이나 표 전체를 설명에 연결하지
않는다. 설명을 생략하면 자동 `aria-describedby`를 생성하지 않는다.

## 상태와 닫기 요청

Root는 `open`, `defaultOpen`과 `onOpenChange(open, details)`를 제공한다.
`defaultOpen`의 기본값은 `false`다. 제어 상태에서는 사용처가 `open`을 갱신한다.
Trigger는 열림 상태를 토글한다. 닫힌 Portal, Positioner와 Content는 제거한다.
Portal은 클라이언트가 마운트된 뒤 생성한다. Portal을 생략하면 닫힌 네이티브
Popover 구조를 서버 HTML에 포함하고, 클라이언트에서 상위 표시 계층으로 연다.

`details.reason`은 다음 중 하나다.

| reason          | 요청 원인                                                    |
| --------------- | ------------------------------------------------------------ |
| `trigger-press` | Trigger를 활성화한다.                                        |
| `close-press`   | Close를 활성화한다.                                          |
| `escape-key`    | 가장 위의 레이어에서 Escape를 누른다.                        |
| `outside-press` | 패널 밖에서 시작하고 끝난 기본 포인터 클릭이다.              |
| `focus-outside` | 포인터 클릭 처리 중이 아닐 때 패널 밖으로 포커스가 이동한다. |

`details.event`는 원본 DOM 이벤트이며 `details.trigger`는 Trigger다.
`details.cancel()`로 요청을 취소하고 `details.isCanceled`로 취소 여부를 확인한다.
제어 상태에서도 사용처가 취소 여부를 존중해야 한다. 사용자 Trigger·Close 이벤트
핸들러의 `preventDefault()`도 해당 요청을 막는다.

네이티브 `popover="auto"`는 브라우저가 자체적으로 닫는다. 네이티브 닫힘의
`beforetoggle` 이벤트는 취소할 수 없으므로, Coral의 제어 상태와 닫기 취소 계약을
유지하기 위해 `manual`을 사용한다. 브라우저는 표시 계층과 Trigger 기준의 Tab
순서를 제공하고, Popover 내부의 레이어 관리자가 Escape와 외부 상호작용을 처리한다.
사용처는 Positioner의 네이티브 표시 상태를 직접 변경하지 않는다.

## 키보드와 포커스

- Enter와 Space는 네이티브 버튼 동작으로 Trigger를 활성화한다.
- 열릴 때 배치를 계산한 뒤 Content 안으로 포커스를 이동한다. 기존 내부 포커스와
  autofocus를 우선하고, 첫 번째 조작 가능한 요소 또는 Content로 이동한다.
  터치로 열면 기본적으로 Content에 포커스를 둔다.
- Tab과 Shift+Tab은 Trigger 기준의 네이티브 순서로 이동한다. 패널 밖으로
  포커스가 나가면 닫기를 요청하고 목적지의 포커스를 유지한다.
- Escape와 Close로 닫으면 Trigger로 포커스를 복원한다. 외부 요소를 클릭하거나
  포커스로 이동해서 닫으면 외부 포커스를 유지한다.
- 내부에서 시작한 드래그, 스크롤 제스처, 스크롤바 조작과 보조 버튼 클릭은
  외부 클릭 닫기로 처리하지 않는다.
- 페이지 외부에 inert나 Scroll Lock을 적용하지 않는다.

Content의 `initialFocus`와 `finalFocus`에는
HTMLElement Ref, boolean 또는 입력 유형을 받는 콜백을 지정할 수 있다.
`false`는 해당 포커스 이동을 생략한다. 기본값은 `true`이며, 사용할 수 없는
대상은 기본 대상을 사용한다. 콜백의 `undefined` 반환도 해당 이동을 생략한다.
입력 유형은 `mouse`, `touch`, `pen`, `keyboard`
또는 유형이 알려지지 않은 경우의 빈 문자열이다.

Popover는 자체 컨텍스트로 부모와 자식 Popover의 관계를 전달합니다. 자체 레이어
관리자가 중첩 Popover의 닫기와 포커스를 처리합니다. Escape는 가장 위의 Popover
하나를 닫습니다. Dialog와 AlertDialog의 타입, 컨텍스트와 레이어 구현에는
의존하지 않습니다. 공개 Portal과 Positioner를 재사용하며 Popover는 기준 Trigger,
열림 상태, 화살표와 배치 완료 후 포커스 이동을 연결합니다.

Dialog·AlertDialog와의 교차 중첩은 현재 지원 범위에 포함하지 않는다. 각
컴포넌트는 별도의 레이어 순서, 외부 상호작용과 포커스 경계를 관리한다.
Popover와 Dialog를 전환할 때는 현재 컴포넌트를 닫은 뒤 다른 컴포넌트를 연다.

## 배치와 화살표

Positioner는 Floating UI의 DOM 모듈로 배치를 계산한다.

| Prop               | 기본값     | 의미                                                                                   |
| ------------------ | ---------- | -------------------------------------------------------------------------------------- |
| `side`             | `"bottom"` | `top`, `right`, `bottom`, `left` 중 우선 배치 방향이다.                                |
| `align`            | `"center"` | `start`, `center`, `end` 중 정렬이다. 시작·끝 정렬은 Positioner의 RTL 방향을 반영한다. |
| `sideOffset`       | `0`        | Trigger와 패널 사이의 간격이다. 단위는 CSS px이다.                                     |
| `collisionPadding` | `8`        | 화면 경계에서 확보할 간격이다. 단위는 CSS px이다.                                      |

공간이 부족하면 방향·정렬을 보정하고 화면 경계 안으로 이동한다. 스크롤,
크기 변경과 레이아웃 이동에 맞춰 위치를 갱신한다. Positioner와 Content의
`data-side`, `data-align`은 보정한 실제 배치를 나타낸다. Trigger, Positioner와
Content는 열린 동안 `data-open`을 제공한다.

페이지 일부에만 RTL을 적용하고 Portal을 body로 옮기는 경우에는 Positioner에
`dir="rtl"`을 전달해서 해당 방향을 유지한다.

Positioner에는 다음 CSS 변수를 제공하며 Content에서도 상속해서 사용할 수 있다.
화면보다 큰 패널의 최대 크기와 내부 스크롤은 사용처가 구성한다.

| CSS 변수                                  | 의미                                 |
| ----------------------------------------- | ------------------------------------ |
| `--anchor-width`, `--anchor-height`       | Trigger의 크기다.                    |
| `--available-width`, `--available-height` | 현재 배치에서 사용할 수 있는 크기다. |

Arrow의 레이아웃 상자는 정사각형으로 만든다. Coral은 보정된 방향과 Trigger의
중심에 맞춰 좌표를 제공한다. 모양, 색상과 회전은 사용처의 자식 요소나
가상 요소에 적용한다. Arrow 자체의 위치·크기를 바꾸는 transform은 배치 계산과
일치하도록 사용해야 한다.

## 지원 경계와 검증

네이티브 Popover API와 `showPopover({ source })`를 지원하는 브라우저를 대상으로
한다. 대체 표시 계층을 위한 polyfill은 포함하지 않는다. 모달 Popover, Hover로
열기, 별도 Anchor, 다중·분리 Trigger와 퇴장 애니메이션의 지연 제거는 제공하지
않는다. Menu나 Combobox의 역할·선택·방향키 동작은 각 컴포넌트가 소유한다.

`popover.test.tsx`는 실제 Chromium 브라우저에서 제목·설명의 연결과 제거,
제어·비제어 상태, 토글과 닫기 취소, 키보드와 포커스 복원, 외부 클릭과 포인터
제스처, 화면 경계·RTL·스크롤·크기 변경에 따른 배치, render 합성, SSR과
Popover 자체의 중첩을 검증한다. 초기 포커스 시점의 실제 좌표도 검증한다.

```sh
pnpm --filter @coral/react exec vitest run src/popover/popover.test.tsx
```

네이티브 button의 자체 키보드·Form 동작과 브라우저 Popover 알고리즘
전체를 Coral의 동작으로 중복 테스트하지 않는다. 수동 스크린 리더 검증은 포함하지
않는다. 이 브라우저 테스트는 컴포넌트와 함께 유지한다.

## 근거

- [WHATWG HTML: popover 속성, manual 표시와 닫기](https://html.spec.whatwg.org/multipage/popover.html#the-popover-attribute)
- [WHATWG HTML: button 요소](https://html.spec.whatwg.org/multipage/form-elements.html#the-button-element)
- [WAI-ARIA: dialog의 의미와 접근 가능한 이름](https://www.w3.org/TR/wai-aria-1.2/#dialog)
- [WAI-ARIA APG 패턴 목록](https://www.w3.org/WAI/ARIA/apg/patterns/)
- [WAI-ARIA APG: Dialog의 이름·설명](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [Floating UI: 배치 계산](https://floating-ui.com/docs/computePosition)
- [Floating UI: 자동 위치 갱신](https://floating-ui.com/docs/autoUpdate)
- [Base UI Popover](https://base-ui.com/react/components/popover)
- [Ark UI Popover](https://ark-ui.com/docs/components/popover)

APG에는 독립적인 Popover 패턴이 없다. Coral Popover는 작업 가능한 비모달
Dialog로 의미를 정하고, 모달 Dialog 패턴의 포커스 트랩과 외부 비활성화를
기본 동작에 적용하지 않는다.

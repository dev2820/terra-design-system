# Positioner

기준 요소 옆에 콘텐츠를 배치하는 독립 컴포넌트입니다. 상위 표시 계층에서
표시하고 공간이 부족하면 방향과 좌표를 보정합니다.

```tsx
import * as React from "react";
import { Portal, Positioner } from "@coral/react";

function HelpPanel() {
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const panelId = React.useId();
  const [open, setOpen] = React.useState(false);

  return (
    <div
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      <button
        ref={anchorRef}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen((previous) => !previous)}
      >
        안내
      </button>
      <Portal>
        <Positioner open={open} anchorRef={anchorRef} align="start" sideOffset={8}>
          <div id={panelId}>검색할 도시 이름을 입력하세요.</div>
        </Positioner>
      </Portal>
    </div>
  );
}
```

하위 경로의 `import { Positioner } from "@coral/react/positioner"`도 지원합니다.
Portal은 선택 사항입니다. Portal을 생략해도 상위 표시 계층에 표시됩니다.

## Props와 표시

| Prop                | 기본값   | 계약                                                                              |
| ------------------- | -------- | --------------------------------------------------------------------------------- |
| `open`              | 필수     | 열림 상태입니다. `false`이면 요소를 제거합니다.                                   |
| `anchorRef`         | 필수     | 기준 HTMLElement의 Ref입니다.                                                     |
| `side`              | `bottom` | `top`, `right`, `bottom`, `left` 중 우선 배치 방향입니다.                         |
| `align`             | `center` | `start`, `center`, `end` 중 정렬입니다.                                           |
| `sideOffset`        | `0`      | 기준 요소와의 간격입니다. 단위는 CSS px입니다.                                    |
| `collisionPadding`  | `8`      | 화면 경계에서 확보할 간격입니다. 단위는 CSS px입니다.                             |
| `arrowElement`      | 없음     | 배치를 계산할 장식 화살표의 실제 요소입니다.                                      |
| `onPlacementChange` | 없음     | 배치 결과가 준비되거나 바뀌면 결과를 받습니다. 표시를 정리하면 `null`을 받습니다. |

기본 요소는 `div[popover="manual"]`입니다. `open`이 `true`이면 서버 HTML에도
요소를 포함합니다. 브라우저는 클라이언트에서 표시하기 전까지 해당 요소를 숨깁니다.
기준 요소는 표시 시점에 DOM에 연결되어 있어야 합니다.
표시 상태는 `open`으로 제어하며 네이티브 표시 메서드를 직접 호출하지 않습니다.

스크롤, 기준 요소와 콘텐츠의 크기 변경, 레이아웃 이동에 따라 좌표를 갱신합니다.
`data-open`, 실제 배치 방향의 `data-side`와 정렬의 `data-align`을 제공합니다.
`start`와 `end`는 Positioner의 RTL 방향을 반영합니다. 부분 RTL 영역의 내용을
body로 옮기는 경우 Positioner에도 `dir="rtl"`을 지정합니다.

`--anchor-width`, `--anchor-height`, `--available-width`, `--available-height`로
기준 요소와 사용 가능한 공간의 크기를 제공합니다. 콘텐츠의 최대 크기와 스크롤은
사용처가 구성합니다.

## 화살표와 배치 알림

`onPlacementChange`의 결과는 `side`, `align`, `arrowStyle`입니다. 좌표가 반영된
뒤 첫 배치를 알립니다. 이후 방향, 정렬이나 화살표 스타일이 바뀌면 다시 알립니다.
좌표만 바뀌는 경우에는 콜백을 호출하지 않습니다.

화살표는 자식으로 배치하고 그 요소를 `arrowElement`에 전달합니다.
결과의 `arrowStyle`을 화살표에 적용하고 절대 위치와 크기를 지정합니다.
Positioner는 화살표의 역할이나 모양을 정하지 않습니다.
장식용 화살표에는 사용처가 `aria-hidden="true"`를 제공합니다.

## 합성과 책임 범위

`render`는 사용자 요소와 Props, 이벤트, Ref를 합성합니다.
대체 요소는 Popover API를 지원하는 HTMLElement여야 합니다. 기본 고정 배치와
좌표를 유지해야 하며 `ref`는 실제 요소를 가리킵니다.

Positioner는 접근성 역할, 이름, 키보드 탐색, 외부 클릭 닫기, 포커스 이동과
Scroll Lock을 제공하지 않습니다. 사용처가 콘텐츠에 맞는 의미와 상호작용을
구성합니다. 일반 콘텐츠와 버튼은 별도 Content Part 없이 포인터로 조작할 수 있습니다.

Autocomplete.Positioner는 Input을, Popover.Positioner는 Trigger를 기준 요소로
연결합니다. 각 패턴은 자신의 역할, 포커스와 닫기 정책을 유지합니다.
Dialog.Positioner와 AlertDialog.Positioner는 화면 배치용 컨테이너입니다.
이들은 기준 요소 옆에 배치하는 독립 Positioner와 다른 계약입니다.

네이티브 Popover API와 `showPopover({ source })`를 지원하는 브라우저가 필요합니다.
교차 팝업의 레이어 순서와 포커스 정책은 Positioner가 조정하지 않습니다.

## 검증과 근거

브라우저 테스트는 제어 표시, 배치와 화면 경계 보정, 크기 변경, 화살표,
배치 알림과 정리, 독립 콘텐츠 조작, 합성과 SSR hydration을 검증합니다.

```sh
pnpm --filter @coral/react exec vitest run src/positioner/positioner.test.tsx
```

- [WHATWG HTML: popover 속성과 manual 상태](https://html.spec.whatwg.org/multipage/popover.html#the-popover-attribute)
- [WHATWG HTML: showPopover와 source](https://html.spec.whatwg.org/multipage/popover.html#dom-showpopover)

# Scroll Area

네이티브 스크롤 영역에 가로·세로 커스텀 스크롤바를 조합하는 Headless 컴포넌트다.
스크롤 위치는 실제 Viewport DOM이 소유한다. Coral은 크기 측정, Thumb 위치와
포인터 상호작용을 제공한다.

## 사용법

```tsx
import { ScrollArea } from "@coral/react/scroll-area";

<ScrollArea.Root style={{ width: 320, height: 240 }}>
  <ScrollArea.Viewport aria-label="대화 기록">
    <ScrollArea.Content>{/* 스크롤할 콘텐츠 */}</ScrollArea.Content>
  </ScrollArea.Viewport>
  <ScrollArea.Scrollbar style={{ width: 12 }}>
    <ScrollArea.Thumb className="scroll-thumb" />
  </ScrollArea.Scrollbar>
  <ScrollArea.Scrollbar orientation="horizontal" style={{ height: 12 }}>
    <ScrollArea.Thumb className="scroll-thumb" />
  </ScrollArea.Scrollbar>
  <ScrollArea.Corner className="scroll-corner" />
</ScrollArea.Root>;
```

루트 named export인 `import { ScrollArea } from "@coral/react"`도 지원한다.
사용처는 Root의 크기, 세로 Scrollbar의 너비와 가로 Scrollbar의 높이를 지정한다.
Thumb과 Corner의 색상, 테두리와 모서리도 사용처에서 지정한다. 콘텐츠를 가리지
않도록 콘텐츠 여백을 확보하고, 포인터 타깃 크기와 대비를 확인한다.

## Parts

| Part      | 기본 요소 | 책임                                                               |
| --------- | --------- | ------------------------------------------------------------------ |
| Root      | div       | 측정 상태를 공유하고 스크롤바의 위치 기준을 제공한다.              |
| Viewport  | div       | overflow: auto로 실제 스크롤, 키보드, 휠과 터치 스크롤을 담당한다. |
| Content   | div       | 콘텐츠를 감싸고 콘텐츠 크기 변경을 감지한다.                       |
| Scrollbar | div       | 지정 축의 트랙 클릭, 포인터 드래그와 휠 입력을 처리한다.           |
| Thumb     | div       | 뷰포트 비율과 스크롤 위치를 표시한다.                              |
| Corner    | div       | 두 스크롤바가 만나는 영역을 차지한다.                              |

Root 안에 Viewport 하나를 배치하고, Viewport 안에 Content 하나를 배치한다.
Scrollbar는 Root 안에 축마다 하나씩 배치하고 각 Scrollbar 안에 Thumb을 배치한다.
Corner는 Root 안에 배치한다. 모든 Part는 `useRender`를 사용하고 Ref를 실제
DOM에 연결한다.

모든 Part는 `render`로 다른 HTML 요소나 사용자 컴포넌트와 합성할 수 있다.
Props, Ref와 이벤트를 합성하며, 측정·스크롤·드래그에 필요한 내부 Ref와 계산한
크기·위치, 표시 조건과 접근성 속성을 유지한다. `render`를 생략하면 기본 div를 사용한다.

사용자 컴포넌트는 전달받은 Props와 Ref를 같은 실제 HTMLElement에 연결하고,
자식 구조를 유지해야 한다. Viewport는 실제 스크롤 컨테이너와 키보드 포커스
대상이어야 하며, Content는 콘텐츠 크기를 측정할 수 있는 레이아웃 박스를 제공해야 한다.
Scrollbar, Thumb과 Corner에는 비상호작용 요소를 사용하고 포커스를 받는 요소나
자식을 추가하지 않는다.

```tsx
<ScrollArea.Root render={<section />} style={{ width: 320, height: 240 }}>
  <ScrollArea.Viewport render={<div aria-label="대화 기록" />}>
    <ScrollArea.Content render={<article />}>{/* 콘텐츠 */}</ScrollArea.Content>
  </ScrollArea.Viewport>
  <ScrollArea.Scrollbar render={<span />} style={{ width: 12 }}>
    <ScrollArea.Thumb render={<span className="scroll-thumb" />} />
  </ScrollArea.Scrollbar>
  <ScrollArea.Scrollbar orientation="horizontal" render={<span />} style={{ height: 12 }}>
    <ScrollArea.Thumb render={<span className="scroll-thumb" />} />
  </ScrollArea.Scrollbar>
  <ScrollArea.Corner render={<span className="scroll-corner" />} />
</ScrollArea.Root>
```

Viewport의 이름, role과 tabIndex는 합성 요소의 Props도 반영한다. 같은 속성을
Part에 직접 전달하면 그 값을 우선한다. Root의 dir도 같은 우선순위를 따르며,
합성 요소의 dir이 변경되면 스크롤 방향을 다시 측정한다. Scrollbar와 Corner는
표시 상태에서 합성 요소의 display 스타일을 보존한다.

## 스크롤과 측정

- 스크롤 위치를 별도 React 값으로 제어하지 않는다. Viewport Ref를 통해 네이티브
  `scrollTop`, `scrollLeft`, `scrollTo`와 `scrollIntoView`를 사용한다.
- Viewport와 Content, Scrollbar의 크기 변경을 ResizeObserver로 감지한다.
  스크롤 이벤트와 크기 변경의 측정은 animation frame 단위로 모은다.
- Content는 일반 흐름의 콘텐츠 크기를 측정할 수 있도록 flow-root와 fit-content
  너비, 최소 너비 100%를 사용한다. 긴 문단은 가용 너비에서 줄바꿈하며, 넓은
  자식 요소는 가로 스크롤 범위를 만든다. 절대 위치나 transform만으로 자식의
  넘침 범위가 바뀌고 Content 크기는 그대로인 구성은 자동 재측정 범위에 포함하지 않는다.
- 실제 스크롤 범위가 없는 축의 Scrollbar는 숨긴다. Thumb은 트랙 내부에서
  뷰포트/콘텐츠 비율에 맞춰 크기를 계산한다. 최소 길이는 24px이며 트랙이 더
  짧으면 트랙 길이로 제한한다. 트랙의 진행 방향 padding도 계산에 포함한다.
  Thumb의 진행 방향 margin은 지원하지 않는다.
- 두 축 모두 넘치고 두 Scrollbar가 있을 때만 Corner를 표시하며, 실제 스크롤바
  두께만큼 각 트랙 길이를 줄인다.
- Scrollbar가 하나 이상 마운트되면 Viewport의 네이티브 스크롤바를 숨긴다.
  사용처는 스크롤할 축마다 Scrollbar를 제공한다. Scrollbar를 모두 생략하면
  네이티브 스크롤바를 유지한다.
- Root의 `dir="rtl"`을 지원한다. 가로 Thumb은 초기 오른쪽에 위치하며 음수
  scrollLeft 범위에 맞춰 이동한다. 세로 스크롤바와 Corner는 왼쪽에 배치한다.
- hover나 타이머로 스크롤바를 자동으로 숨기지 않는다. 색상, hover 표현과
  애니메이션은 제품에서 제공한다. observer, 이벤트 리스너와 예약된 frame은
  DOM 생명주기에 맞춰 정리한다.

## 상호작용과 접근성

Viewport는 스크롤이 필요하면 기본 tabIndex가 0이고, 필요하지 않으면 -1이다.
제품이 전달한 tabIndex를 우선한다. 제품은 Viewport에 aria-label 또는 연결된
aria-labelledby로 이름을 제공한다. 이름이 있으면 기본 role은 region이며,
명시적인 role도 전달할 수 있다. 기본 포커스 표시를 제거하지 않는다.

키보드 방향키, Page Up/Down, Home/End, Tab 이동과 콘텐츠 내부 포커스 이동은
브라우저가 처리한다. Viewport의 터치 스크롤도 네이티브 동작을 유지한다.

커스텀 Scrollbar와 Corner는 aria-hidden으로 접근성 트리에서 제외하고 별도 탭
정지점을 만들지 않는다. 키보드 사용자는 Viewport에서 같은 콘텐츠를 스크롤한다.
따라서 커스텀 트랙에 ARIA scrollbar 위젯 역할을 추가하지 않는다.

- Thumb 드래그는 누른 위치를 유지하며 스크롤한다. 트랙 클릭은 클릭한 위치에
  Thumb의 중앙이 오도록 이동한 뒤 드래그할 수 있게 한다.
- 기본 포인터 입력은 마우스 왼쪽 버튼, 펜과 터치를 지원한다. pointer capture를
  사용해 트랙 밖에서도 드래그를 이어가고 pointerup, pointercancel, capture
  해제와 unmount에서 정리한다. 포인터 드래그가 기존 포커스를 이동하지 않는다.
- 제품의 Scrollbar onPointerDown 또는 onPointerMove에서 preventDefault를
  호출하면 해당 포인터 처리를 건너뛴다.
- Viewport 위의 휠 입력은 네이티브 동작이다. 커스텀 트랙 위의 휠은 해당 축으로
  전달하며 pixel/line/page 단위를 처리한다. Ctrl+휠은 가로채지 않고, 범위 끝에서는
  preventDefault를 호출하지 않아 상위 영역의 스크롤을 허용한다.
- Root, Viewport, Scrollbar에 data-overflow-x/y를 제공한다. Scrollbar와 Thumb에는
  data-orientation을 제공한다. 드래그 중에는 Root와 해당 Scrollbar에 data-dragging을 제공한다.

실제 터치 기기, 보조 기술과 사용처의 최종 CSS에 대한 검증은 제품의 지원 환경에서
진행해야 한다. 이 구현은 ResizeObserver, pointer capture와 scrollbar-width를
지원하는 현대 브라우저를 대상으로 한다.

## 참고와 명세

- [Base UI Scroll Area](https://base-ui.com/react/components/scroll-area)
- [Ark UI Scroll Area](https://ark-ui.com/docs/components/scroll-area)
- [WHATWG: div](https://html.spec.whatwg.org/multipage/grouping-content.html#the-div-element)
- [WHATWG: span](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-span-element)
- [WHATWG: tabindex](https://html.spec.whatwg.org/multipage/interaction.html#the-tabindex-attribute)
- [CSSOM View: Element scrolling](https://www.w3.org/TR/cssom-view/#dom-element-scrollleft)
- [CSS Scrollbars: scrollbar-width](https://www.w3.org/TR/css-scrollbars-1/#scrollbar-width)
- [Pointer Events: pointer capture와 touch-action](https://www.w3.org/TR/pointerevents/)

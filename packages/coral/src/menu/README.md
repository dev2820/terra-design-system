# Menu

버튼과 컨텍스트 호출로 여는 작업 메뉴입니다. 중첩한 Root로 하위 메뉴를 구성합니다.
메뉴의 이름·역할, 항목 탐색·실행, 계층별 포커스 이동과 팝업 배치를 제공합니다.
스타일과 작업의 실행 내용은 사용처에서 정합니다.

```tsx
import { Menu } from "@coral/react/menu";

<Menu.Root>
  <Menu.ContextTrigger>문서 작업 영역</Menu.ContextTrigger>
  <Menu.Portal>
    <Menu.Positioner>
      <Menu.Content aria-label="문서 작업">
        <Menu.Item onSelect={() => duplicateDocument()}>복제</Menu.Item>
        <Menu.Root>
          <Menu.TriggerItem>내보내기</Menu.TriggerItem>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item onSelect={() => exportPdf()}>PDF</Menu.Item>
                <Menu.Item onSelect={() => exportImage()}>이미지</Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
        <Menu.Separator />
        <Menu.Item disabled>삭제</Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Portal>
</Menu.Root>;
```

버튼으로 열 때는 최상위 ContextTrigger 자리에 `<Menu.Trigger>문서 작업</Menu.Trigger>`를
사용합니다. Root마다 Trigger, ContextTrigger 또는 TriggerItem 중 하나를 배치합니다.

## 범위와 HTML

APG Menu Button과 Menu and Menubar 패턴의 팝업 메뉴를 구현합니다. 파츠 이름과
중첩 방식은 Ark UI Menu를 참고합니다. Menu의 행동은 실제 DOM과 React 생명주기에서
구현합니다. Menubar, 체크박스·라디오 항목, 가상화와 명령 단축키 등록은 포함하지 않습니다.

HTML의 menu 요소는 li 자식으로 명령 목록을 표현합니다. 이 컴포넌트는
role=menu와 role=menuitem으로 팝업 메뉴의 의미를 제공합니다. 기본 Item과
TriggerItem은 button type=button입니다. disabled 항목은 aria-disabled로 실행을
막고 APG에 따라 포커스를 받을 수 있도록 유지합니다.

## Parts와 관계

| Part           | 기본 요소                                      | 책임                                                           |
| -------------- | ---------------------------------------------- | -------------------------------------------------------------- |
| Root           | DOM 없음                                       | 메뉴 하나의 제어·비제어 상태와 부모·자식 관계를 관리합니다.    |
| Trigger        | button type=button                             | 클릭·Enter·Space·위아래 방향키로 최상위 메뉴를 엽니다.         |
| ContextTrigger | div, tabindex=0                                | 우클릭·ContextMenu 키·Shift+F10으로 최상위 메뉴를 엽니다.      |
| TriggerItem    | button type=button, role=menuitem              | 부모 메뉴에 속하며, 자신의 Root가 관리하는 하위 메뉴를 엽니다. |
| Portal         | div                                            | 열린 메뉴를 body 또는 container로 옮깁니다. 선택 사항입니다.   |
| Positioner     | div popover=manual                             | 호출 요소·좌표 옆에 배치하고 화면 경계를 보정합니다.           |
| Content        | div role=menu, tabindex=-1                     | 메뉴 이름, 탐색과 포커스를 제공합니다.                         |
| Item           | button type=button, role=menuitem, tabindex=-1 | 작업을 실행하고 메뉴 계층을 닫습니다.                          |
| Separator      | hr                                             | 항목을 구분하며 포커스를 받지 않습니다.                        |

Content는 해당 Root의 Positioner 안에 둡니다. Item과 Separator는 Content 안에
배치합니다. 하위 Root는 부모 Content 안에 두고 TriggerItem과 자신의 Positioner,
Content를 조합합니다. 하위 Root의 TriggerItem은 부모 메뉴의 탐색에 참여합니다.
하위 Content는 자신의 항목만 탐색합니다. Item 안에는 별도의 상호작용 요소를 넣지 않습니다.

각 Part는 가장 가까운 Root의 Context를 읽습니다. 중첩 Root는 자신의 Context를
제공하기 전에 부모 Context를 읽고 보관합니다. TriggerItem은 자신의 Root로 하위
메뉴를 열고, 내부 Item에는 부모 Context를 제공해 부모 메뉴의 탐색에 참여합니다.
Portal로 DOM 위치를 옮겨도 이 Context 관계는 유지됩니다.

TriggerItem은 aria-haspopup=menu와 aria-expanded를 제공합니다. 열린 동안
aria-controls로 하위 Content를 가리킵니다. Content는 기본적으로 여는 항목의 ID를
aria-labelledby로 참조합니다. aria-label 또는 aria-labelledby로 이름을 지정할 수도
있습니다. ContextTrigger를 사용할 때는 Content에 명시적인 이름을 제공합니다.
Portal로 이동한 하위 메뉴는 부모 Content의 aria-owns로 관계를 연결합니다.
Portal을 생략하면 하위 메뉴가 부모 Content 안에 머뭅니다.

## 열기와 배치

Trigger를 클릭·Enter·Space로 활성화하면 열림 상태를 토글합니다. ArrowDown은
첫 항목으로, ArrowUp은 마지막 항목으로 진입합니다.

ContextTrigger는 contextmenu 이벤트의 clientX/clientY에 메뉴를 엽니다.
ContextMenu 키와 Shift+F10은 현재 포커스 요소 아래에 엽니다. 일반 클릭과 포커스
진입은 메뉴를 열지 않습니다. disabled이면 Coral의 호출 처리를 생략하고 네이티브
contextmenu 동작을 유지합니다. 터치에서는 브라우저가 발생시킨 contextmenu를 처리합니다.
별도의 길게 누르기 타이머는 제공하지 않습니다.

TriggerItem은 포인터 hover, 클릭, Enter·Space와 하위 메뉴 방향키로 엽니다.
hover로 열면 부모 항목의 포커스를 유지합니다. 클릭·키보드 호출은 하위 메뉴의
첫 항목으로 이동합니다. 형제 하위 메뉴를 열면 이전 하위 메뉴에 닫기를 요청합니다.
그 닫기를 취소하면 새 하위 메뉴의 열기를 생략합니다.

최상위 Positioner의 기본 배치는 bottom/start이고, 하위 메뉴는 LTR에서 right/start,
RTL에서 left/start입니다. sideOffset은 0, collisionPadding은 8 CSS px입니다.
공통 Positioner의 side, align, 배치 결과 data-side·data-align과 크기 변수를
지원합니다. 크기·스크롤과 부분 RTL 영역의 Portal dir 전달은 사용처에서 구성합니다.
배치는 공통 Coral.Positioner에 위임합니다. 좌표 기준점은 투명한 실제 기준 요소로
연결되며, 버튼·서브메뉴와 같은 CSS Anchor Positioning 경로를 사용합니다.

## 키보드와 포커스

- 열면 첫 항목에 포커스를 둡니다. ArrowUp으로 최상위 메뉴를 열면 마지막 항목으로
  이동합니다. 처음부터 열린 하위 메뉴가 있으면 해당 항목을 거쳐 하위 메뉴로
  진입합니다. 빈 메뉴는 Content에 포커스를 둡니다.
- 위아래 방향키는 현재 메뉴 안에서 이동하며 양 끝에서 순환합니다.
- Home과 End는 첫 항목과 마지막 항목으로 이동합니다.
- 문자 입력은 이름이 해당 문자열로 시작하는 항목을 찾습니다. textValue로
  복합 콘텐츠의 탐색 문자열을 지정합니다. 검색 버퍼는 500ms 후 초기화합니다.
- disabled 항목도 탐색하며 실행은 막습니다. 숨김·inert 항목은 탐색에서 제외합니다.
- LTR에서 ArrowRight는 하위 메뉴를 열고, ArrowLeft는 현재 하위 메뉴를 닫고 부모
  항목으로 돌아갑니다. RTL에서는 좌우 방향키를 바꿉니다.
- Escape는 현재 메뉴와 그 자손을 닫고 여는 항목으로 돌아갑니다.
- Tab과 Shift+Tab은 전체 메뉴 계층을 닫고 최초 호출 위치에서 네이티브 순서로 이동합니다.
- Item의 Enter·Space·클릭은 작업을 실행하고 전체 메뉴 계층을 닫습니다.
- IME 조합 중에는 Coral의 키 처리를 생략합니다.

포인터 hover는 해당 항목으로 포커스를 옮깁니다. 하위 메뉴로 포커스를 이동해도
상위 메뉴를 유지합니다. 상위 메뉴의 다른 항목으로 이동하면 해당 하위 메뉴를 닫습니다.
외부 클릭·포커스 이동은 계층 전체를 닫고 목적지 포커스를 유지합니다.
작업이 별도 요소로 포커스를 이동하면 그 포커스를 유지합니다.
Focus Trap, 외부 inert와 Scroll Lock은 적용하지 않습니다.

## 상태·변경 취소·합성

각 Root는 open, defaultOpen과 onOpenChange(open, details)를 제공합니다.
기본값은 false입니다. 제어 상태에서는 사용처가 요청을 반영합니다. 부모 메뉴가
닫히면 자손을 숨기고 비제어 자손의 열림 상태를 초기화합니다. 이 초기화는 자손의
변경 콜백을 호출하지 않습니다. 제어 자손의 상태는 사용처에서 관리합니다.
닫힌 Portal, Positioner와 Content는 DOM에서 제거합니다.

details에는 reason, 원본 DOM event, trigger, isCanceled와 cancel()이 있습니다.
reason은 trigger-press, context-menu, keyboard, trigger-hover, item-press,
item-focus, sibling-open, escape-key, tab-key, outside-press, focus-outside입니다.
cancel()은 해당 요청을 취소합니다. 전체 계층 닫기는 최상위 Root에 요청합니다.
자식 Escape·부모 방향키와 형제 전환의 닫기는 해당 자식 Root에 요청합니다.

Item의 onSelect(details)에서 작업을 실행합니다. cancel()하면 기본 활성화와
닫기를 취소합니다. 작업 후의 닫기를 onOpenChange에서 취소하면 메뉴를 유지합니다.
사용자 핸들러가 먼저 실행되며 preventDefault()로 해당 내부 처리를 막을 수 있습니다.

렌더링하는 모든 Part는 render, Props, 이벤트와 Ref 합성을 제공합니다.
대체 컴포넌트는 전달한 Props와 Ref를 실제 DOM에 연결하고 역할·이름·포커스와
구조 관계를 유지합니다. 버튼 대체 요소는 type=button 계약을 유지합니다.
Item을 링크로 합성하면 href의 네이티브 탐색을 유지하고 Enter·Space로 활성화합니다.
Root는 상태와 관계를 제공하며 별도 DOM과 render Prop을 제공하지 않습니다.

Trigger와 TriggerItem은 data-open, 항목은 data-highlighted·data-disabled를
제공합니다. Content는 data-open을 제공합니다. disabled는 Trigger·ContextTrigger의
호출과 Item·TriggerItem의 실행을 제어하며 Root의 외부 open 설정은 사용처가 관리합니다.

## 검증과 브라우저 지원

```sh
pnpm --filter @coral/react test src/menu src/positioner
```

CSS Anchor Positioning과 Popover API의 showPopover({ source })를 지원하는 브라우저가 필요합니다.
브라우저 테스트는 역할·이름·ID 관계, 호출·배치, 다단계 탐색·실행·닫기,
포커스 복원, 제어 상태·변경 취소와 render 합성을 검증합니다.
Dialog·Popover와의 교차 중첩, 수동 스크린 리더와 실제 모바일 제스처 검증은
포함하지 않습니다.

## 근거

- [Ark UI Menu: Context Menu와 Nested](https://ark-ui.com/docs/components/menu)
- [WAI-ARIA APG: Menu and Menubar](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/)
- [WAI-ARIA APG: Menu Button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)
- [WHATWG HTML: menu](https://html.spec.whatwg.org/multipage/grouping-content.html#the-menu-element)
- [WHATWG HTML: button](https://html.spec.whatwg.org/multipage/form-elements.html#the-button-element)
- [WHATWG HTML: Popover API](https://html.spec.whatwg.org/multipage/popover.html#the-popover-attribute)

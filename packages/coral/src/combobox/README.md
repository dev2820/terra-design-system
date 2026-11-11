# Combobox

정해진 항목을 검색해 단일·다중 선택하는 Headless 컴포넌트입니다. 검색 문자열과
확정한 선택 값을 분리하며, 스타일과 제품 데이터의 획득은 사용처가 담당합니다.

```tsx
import { Combobox } from "@coral/react/combobox";
import { Field } from "@coral/react/field";

const cities = [
  { value: "seoul", label: "서울" },
  { value: "busan", label: "부산" },
  { value: "jeju", label: "제주", disabled: true },
];

<Field.Root name="cities">
  <Field.Label>방문할 도시</Field.Label>
  <Combobox.Root items={cities} multiple required>
    <Combobox.Value />
    <Combobox.Input />
    <Combobox.Trigger aria-label="도시 목록 열기">열기</Combobox.Trigger>
    <Combobox.Clear aria-label="도시 선택 모두 지우기">지우기</Combobox.Clear>
    <Combobox.Portal>
      <Combobox.Positioner sideOffset={4}>
        <Combobox.List aria-label="도시">
          {cities.map((city) => (
            <Combobox.Item key={city.value} value={city.value}>
              <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
              {city.label}
            </Combobox.Item>
          ))}
        </Combobox.List>
      </Combobox.Positioner>
    </Combobox.Portal>
    <Combobox.HiddenSelect />
  </Combobox.Root>
  <Field.Description>목록에서 하나 이상의 도시를 선택해 주세요.</Field.Description>
  <Field.Error>도시를 선택해 주세요.</Field.Error>
</Field.Root>;
```

## 지원 범위와 네이티브 HTML

검색이 필요 없는 선택에는 네이티브 `<select>`를 먼저 사용합니다. 자유 입력과
추천 문자열에는 `<input list>`와 `<datalist>` 또는 Coral Autocomplete를 사용합니다.
Combobox는 검색 가능한 선택 목록의 HTML, 배치와 포커스를 조합해야 할 때 사용합니다.

`items`는 `{ value: string, label: string, disabled?: boolean }` 배열입니다.
value는 고유한 비어 있지 않은 문자열이며 label은 입력 표시와 검색에 사용합니다.
팝업이 닫혀 항목 DOM이 없어도 초기 선택의 표시와 폼 값을 알 수 있도록 Root에
메타데이터를 전달합니다. Item의 value는 이 배열에 존재해야 합니다.
객체 값, 자유 입력 확정, 원격 검색, 가상화, 자동 선택과 인라인 완성은 제공하지 않습니다.

## Parts와 구조

| Part          | 기본 요소                      | 책임                                                               |
| ------------- | ------------------------------ | ------------------------------------------------------------------ |
| Root          | div                            | 선택 값, 검색과 열림 상태를 관리합니다.                            |
| Input         | input type=text, role=combobox | 검색, 이름과 키보드 탐색을 제공합니다.                             |
| Trigger       | button type=button             | 목록을 열거나 닫고 Input에 포커스를 둡니다. 선택 사항입니다.       |
| Clear         | button type=button             | 전체 선택과 검색을 지웁니다. 선택 사항입니다.                      |
| Value         | span                           | 선택한 label을 쉼표로 연결해 표시합니다. 다중 선택에서 배치합니다. |
| Portal        | div                            | 열린 팝업을 body 또는 container로 옮깁니다. 선택 사항입니다.       |
| Positioner    | div popover=manual             | Input을 기준으로 팝업을 배치합니다.                                |
| List          | div role=listbox               | 목록의 ID와 다중 선택 의미를 제공합니다.                           |
| Item          | div role=option                | 항목의 선택·해제와 활성 상태를 제공합니다.                         |
| ItemIndicator | span                           | 선택된 Item 안에서만 표시하며 보조 기술에서 숨깁니다.              |
| HiddenSelect  | 시각적으로 숨긴 select         | 선택 값 제출, 필수 검증, reset과 Field 연결을 담당합니다.          |

Root 하나에 Input, Positioner와 List를 각각 하나씩 둡니다. List는 Positioner
안에, Item은 List 안에, ItemIndicator는 Item 안에 배치합니다. Item에는 별도로
상호작용하거나 포커스 가능한 콘텐츠를 넣지 않습니다. 선택 값의 표시와 검색이
분리되는 다중 선택에서는 Value를 배치합니다. Value의 children으로 표시를 대체할
수 있습니다. 빈 결과나 로딩 안내는 List 바깥에서 제공합니다.

Input에는 label, aria-label 또는 aria-labelledby로 이름을 제공합니다. Field의
Label, Description과 Error는 자동 연결합니다. Trigger와 Clear에도 이름을
제공합니다. List에는 aria-label 또는 aria-labelledby로 이름을 제공합니다.

## 선택과 검색

`multiple`을 생략하면 단일 선택입니다. `value`와 `defaultValue`는 `string | null`이며
기본값은 null입니다. `multiple={true}`에서는 문자열 배열이며 기본값은 빈 배열입니다.
중복 값과 items에 없는 값은 사용하지 않습니다. items에서 선택 항목을 제거하면
유효한 선택에서도 제외합니다. 이 정규화는 변경 콜백을 호출하지 않습니다.

`value`가 있으면 제어 상태이며 사용처가 `onValueChange(value, details)`의 요청을
반영합니다. 제어 값과 초기값은 팝업을 열기 전부터 표시됩니다.

단일 선택은 Enter나 항목 클릭으로 확정하고 닫습니다. 다중 선택은 활성 항목을
선택·해제하고 열린 상태를 유지합니다. 선택 후 검색은 비웁니다. 선택한 항목은
`aria-selected`와 `data-selected`, 탐색 중인 항목은 `data-highlighted`로 구분합니다.
List는 다중 선택일 때만 `aria-multiselectable="true"`를 제공합니다.

검색은 label의 대소문자를 구분하지 않는 부분 문자열 검색입니다. 검색 중에는
기존 선택을 유지하며 검색어 자체를 제출하거나 자동 확정하지 않습니다. 닫으면
검색을 버리고 단일 선택에서는 선택한 label을, 다중 선택에서는 빈 입력을 표시합니다.
Input을 비우는 동작도 기존 선택을 변경하지 않습니다. 선택 해제에는 Clear 또는
다중 선택의 Item 토글을 사용합니다. disabled 항목은 표시하되 탐색·선택에서 제외합니다.

## 열림, 이벤트와 포커스

`open`, `defaultOpen`과 `onOpenChange(open, details)`를 제공합니다. 기본값은 false입니다.
Input 클릭·입력·방향키와 Trigger로 열며, Escape·외부 클릭·외부 포커스 이동으로
닫습니다. 포커스 진입만으로 열지는 않습니다. 닫힌 팝업은 DOM에서 제거됩니다.

변경 콜백의 details에는 원본 DOM event, reason, isCanceled와 cancel()이 있습니다.
reason은 input-change, input-press, trigger-press, clear-press, item-press,
arrow-key, escape-key, focus-outside, outside-press입니다. cancel()은 해당 요청을
취소합니다. 선택 요청을 취소하면 검색 초기화와 선택에 따른 닫기도 생략합니다.
열림 변경 취소와 선택 변경 취소는 독립적입니다. 제어 상태에서도 취소를 존중합니다.
선택과 Clear는 Input의 네이티브 input/change 이벤트를 발생시키지 않습니다.
사용자 핸들러를 먼저 실행하며 preventDefault()로 내부 동작을 막을 수 있습니다.

- ArrowDown/ArrowUp은 목록을 열고 첫/마지막 가능한 항목을 활성화합니다.
- 열린 목록에서는 이전/다음 가능한 항목으로 이동하며 양 끝에서 순환하지 않습니다.
- Enter는 활성 항목을 선택합니다. 활성 항목이 없으면 네이티브 동작을 유지합니다.
- Escape는 선택을 유지하며 닫습니다. Tab과 Shift+Tab은 선택을 확정하지 않습니다.
- Home, End와 좌우 방향키는 활성 항목을 해제하고 네이티브 텍스트 편집을 유지합니다.
- IME 조합 중에는 Coral의 방향키·Enter·Escape 처리를 생략합니다.
- 포인터로 가리키면 활성화하고 클릭·터치로 선택합니다. 선택 후 Input에 포커스를 둡니다.

DOM 포커스는 탐색 중 Input에 유지하고 aria-activedescendant로 활성 항목을
가리킵니다. 열린 동안만 aria-controls로 List를 참조합니다. Trigger, Clear와
Item은 Tab 순서에 참여하지 않습니다. 외부로 이동하면 목적지 포커스를 유지합니다.
Focus Trap, 외부 inert와 Scroll Lock은 적용하지 않습니다.

## Form, Disabled와 합성

Form과 Field를 사용할 때 HiddenSelect를 하나 명시적으로 배치합니다. name, form과
required는 Root에 전달하며 Field의 name도 상속합니다. Input에는 name을 전달하지
않습니다. 단일 선택이 없으면 빈 문자열을, 다중 선택은 선택 값마다 같은 name으로
제출합니다. 다중 선택의 제출 순서는 items 순서입니다. 네이티브 select와 같이
disabled option은 제출하지 않습니다. 필수 검증은 검색어가 아닌 선택을 검사합니다.
검증이나 라벨이 HiddenSelect에 포커스를 주면 Input으로 이동합니다.
Field의 사용자 검증에도 단일 문자열 또는 다중 배열인 선택 값을 전달합니다.

폼 reset은 비제어 값을 defaultValue로, 제어 값은 현재 value로 복구합니다.
비제어 열림 상태는 defaultOpen으로 복구하며 검색과 활성 항목을 해제합니다.
취소된 reset은 반영하지 않고, reset은 변경 콜백을 호출하지 않습니다.

Root의 disabled와 Field·Coral Fieldset의 disabled는 Input과 HiddenSelect에
전파하고 팝업을 숨깁니다. readOnly는 입력·선택을 막고 팝업을 숨기되 선택 값을
제출합니다. readOnly에서는 필수 검증을 생략합니다. 네이티브 fieldset의 disabled도
브라우저가 처리하며 Input이 실제 disabled 상태일 때 상호작용을 무시합니다.

모든 Part는 render, Props, 이벤트와 Ref 합성을 제공합니다. Input과 HiddenSelect의
대체 컴포넌트는 실제 text input과 select로 Props와 Ref를 전달해야 합니다.
HiddenSelect는 option 구조와 Form 계약을 유지해야 합니다. Positioner의 대체
요소는 Popover API를 지원해야 합니다. 각 Part의 의미, 역할과 ID 관계도 유지합니다.

Root는 data-open, data-multiple, data-disabled, data-readonly, data-required를
제공합니다. Item은 data-selected, data-highlighted, data-disabled를 제공합니다.
Value와 Clear는 선택이 없을 때 data-empty를 제공합니다.

## 배치와 검증 범위

Positioner는 top/bottom, start/center/end 배치를 지원하며 기본값은 bottom/start입니다.
sideOffset은 0, collisionPadding은 8 CSS px입니다. 배치 결과는 data-side와
data-align으로, 가용 공간은 --anchor-width, --anchor-height, --available-width와
--available-height로 제공합니다. 스크롤과 최대 크기는 사용처가 정합니다.
부분 RTL 영역을 Portal로 옮기면 Positioner에도 dir="rtl"을 전달합니다.

Popover API와 showPopover({ source })를 지원하는 브라우저가 필요합니다.
Dialog·Popover와의 교차 중첩, 팝업 간 레이어 조정, 수동 스크린 리더와 실제 모바일
기기 검증은 포함하지 않습니다. 다중 선택은 APG의 단일 값 Combobox에 더해
다중 선택 listbox와 명시적인 선택 토글을 사용하며 탐색만으로 값을 확정하지 않습니다.

## 브라우저 테스트

Vitest Browser Mode와 Playwright의 Chromium에서 검증합니다.

```sh
pnpm --filter @coral/react test src/combobox/combobox.test.tsx
```

역할·이름·ID 관계, 단일·다중 선택과 검색 분리, Clear·Trigger, 키보드·포인터와
포커스, 변경 취소, 제어 상태, 동적 항목, Field·Form과 reset, disabled·readOnly,
render·Ref 합성과 hydration을 다룹니다. IME는 실제 OS 조합 세션 대신 브라우저의
조합 이벤트 플래그를 사용합니다.

## 근거

- [WHATWG HTML: select](https://html.spec.whatwg.org/multipage/form-elements.html#the-select-element)
- [WHATWG HTML: datalist](https://html.spec.whatwg.org/multipage/form-elements.html#the-datalist-element)
- [WHATWG HTML: text input](<https://html.spec.whatwg.org/dev/input.html#text-(type=text)-state-and-search-state-(type=search)>)
- [WAI-ARIA APG: Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)
- [WAI-ARIA APG: Listbox](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/)
- [Base UI: Combobox](https://base-ui.com/react/components/combobox)

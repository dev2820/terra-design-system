# Select

검색 입력 없이 정해진 항목에서 값을 선택하는 컴포넌트입니다. 단일·다중 선택,
값 표시, 키보드 탐색, 팝업 배치와 네이티브 select를 통한 폼 연동을 제공합니다.
항목의 데이터 계약은 기존 Combobox와 같은 value·label·disabled입니다.

```tsx
import { Select } from "@coral/react/select";

const items = [
  { value: "apple", label: "사과" },
  { value: "banana", label: "바나나" },
  { value: "cherry", label: "체리", disabled: true },
];

<Select.Root items={items} name="fruit" required>
  <Select.Trigger aria-label="과일">
    <Select.Value placeholder="과일 선택" />
  </Select.Trigger>
  <Select.Portal>
    <Select.Positioner sideOffset={4}>
      <Select.List aria-label="선택 가능한 과일">
        {items.map((item) => (
          <Select.Item key={item.value} value={item.value}>
            <Select.ItemIndicator>✓</Select.ItemIndicator>
            {item.label}
          </Select.Item>
        ))}
      </Select.List>
    </Select.Positioner>
  </Select.Portal>
  <Select.HiddenSelect />
</Select.Root>;
```

## 범위와 HTML

네이티브 select의 선택 값·option·multiple·required·form·reset 계약을 사용합니다.
기본 HTML select만으로 충분한 화면에서는 해당 요소를 직접 사용할 수 있습니다.
Coral Select는 팝업을 Portal로 옮기거나 render로 합성하고, 선택 값과 항목의 표시를
직접 구성하는 사용처를 지원합니다.

WHATWG의 사용자 정의 select는 select 안의 button과 selectedcontent를 명세합니다.
검증에 사용한 Firefox에서는 appearance: base-select와 HTMLSelectedContentElement가
지원되지 않아, Coral은 공통 Positioner로 팝업을 표시하고 HiddenSelect에 폼 처리를
연결합니다. 네이티브 select의 multiple은 펼쳐진 목록이므로, 접을 수 있는 다중 선택
팝업에는 별도의 열림 상태와 포커스 동작을 제공합니다.

단일 선택은 APG Select-Only Combobox를 기준으로 Trigger를 combobox로 노출합니다.
다중 선택은 버튼과 다중 Listbox를 조합하며 목록에 DOM 포커스를 둡니다.
APG가 combobox를 단일 선택 위젯으로 정의하는 점을 반영합니다.

## Parts

| Part          | 기본 요소               | 책임                                                                |
| ------------- | ----------------------- | ------------------------------------------------------------------- |
| Root          | div                     | 항목 데이터, 선택·열림 상태, Field와의 관계를 관리합니다.           |
| Trigger       | button type=button      | 목록을 열고 닫으며 이름·펼침 상태와 목록 참조를 제공합니다.         |
| Value         | span                    | 선택한 label을 쉼표로 연결하거나 placeholder·children을 표시합니다. |
| Portal        | div                     | 열린 목록을 body 또는 지정한 container로 옮깁니다. 선택 사항입니다. |
| Positioner    | div popover=manual      | Trigger 옆에 배치하고 화면 경계를 보정합니다.                       |
| List          | div role=listbox        | 항목의 소속과 단일·다중 선택 의미를 제공합니다.                     |
| Group         | div role=group          | 관련 Item을 묶고 그룹 이름을 연결합니다.                            |
| GroupLabel    | div                     | 해당 Group의 이름을 제공합니다.                                     |
| Item          | div role=option         | value에 해당하는 label·선택 상태와 항목 동작을 제공합니다.          |
| ItemIndicator | span aria-hidden=true   | 선택한 Item 안에서 장식을 표시합니다.                               |
| HiddenSelect  | select aria-hidden=true | 폼 제출, required, reset과 네이티브 값 변경을 연결합니다.           |

Root의 items에는 고유하고 비어 있지 않은 문자열 value를 제공합니다. null은 단일
선택의 빈 값입니다. Item은 items에 있는 value를 사용하며, 생략한 children은 label을
표시합니다. 비활성 여부는 items의 disabled로 지정합니다. Value와 HiddenSelect는
목록이 열리기 전부터 items를 사용하므로, 초기 선택 값도 즉시 표시·제출할 수 있습니다.

Trigger·Value·List·HiddenSelect는 Root마다 하나씩 배치합니다. List는 Positioner 안에,
Item은 List 안에, ItemIndicator는 Item 안에 둡니다. 항목 안에 버튼·링크 등 별도의
상호작용 요소를 넣지 않습니다.

## 항목 그룹

List 안에 Group을 두고 GroupLabel과 Item을 배치합니다. 각 Group에는 하나 이상의
Item을 제공합니다. GroupLabel은 Group마다 하나를 사용합니다.

```tsx
<Select.List aria-label="식품">
  <Select.Group>
    <Select.GroupLabel>과일</Select.GroupLabel>
    <Select.Item value="apple">사과</Select.Item>
    <Select.Item value="banana">바나나</Select.Item>
  </Select.Group>
  <Select.Group>
    <Select.GroupLabel>채소</Select.GroupLabel>
    <Select.Item value="carrot">당근</Select.Item>
  </Select.Group>
</Select.List>
```

GroupLabel의 ID를 생성해 Group의 aria-labelledby에 연결합니다. props.id와 render
요소의 id도 반영하며, ID 변경·라벨 제거·재마운트에 맞춰 참조를 갱신합니다.
Group에 aria-label 또는 aria-labelledby를 지정하면 해당 이름을 우선합니다.
GroupLabel을 생략할 때는 Group에 명시적인 이름을 제공합니다.

Group과 GroupLabel은 기본적으로 포커스 탐색에 참여하지 않습니다. 방향키·Home·End·
문자 탐색은 그룹 경계를 넘어 Item을 탐색합니다. 단일·다중 선택 모두 같은 구조를
사용하며 선택 값과 폼 연동은 각 Item의 value를 기준으로 처리합니다.

렌더링하는 모든 Part는 render와 Props·이벤트·Ref 합성을 제공합니다. 사용자 컴포넌트는
Props와 Ref를 실제 DOM에 연결하고 역할·키보드·포커스·폼 계약을 유지합니다.
HiddenSelect의 대체 요소는 실제 select여야 합니다. Root는 layout 스타일을 제공하지 않습니다.

## 선택과 열림 상태

단일 선택은 value/defaultValue가 string 또는 null이며 기본값은 null입니다.
onValueChange(value, details)도 같은 형태를 받습니다. multiple=true이면 값은
문자열 배열이며 기본값은 빈 배열입니다. 중복과 items에 없는 값은 정규화합니다.
다중 선택 콜백의 배열은 선택한 순서를 유지하고, FormData는 네이티브 option 순서를 따릅니다.

```tsx
<Select.Root items={items} multiple value={selectedValues} onValueChange={setSelectedValues}>
  {/* 동일한 Parts를 구성합니다. */}
</Select.Root>
```

open/defaultOpen의 기본값은 false이며 onOpenChange(open, details)로 알립니다.
제어 상태에서는 사용처가 요청을 반영합니다. disabled·readOnly 상태에서는 팝업을 숨기고
사용자 변경을 막습니다. Field.Root·Fieldset.Root의 disabled도 반영합니다.

details는 reason, 원본 DOM event, isCanceled와 cancel()을 제공합니다. reason은
trigger-press, item-press, keyboard, typeahead, escape-key, tab-key, outside-press,
focus-outside, native-change입니다. cancel()은 해당 값 또는 열림 요청을 취소합니다.
값 확정 후 닫기 요청을 취소하면 확정한 값과 열린 목록을 유지합니다.
사용자 이벤트 핸들러의 preventDefault()는 연결된 내부 처리를 생략합니다.

단일 선택은 항목을 확정하면 닫고 Trigger로 포커스를 유지·복원합니다.
다중 선택은 항목을 선택·해제하고 목록을 유지합니다. 방향키 탐색과 hover는 값을
변경하지 않습니다. 같은 단일 항목을 다시 선택해도 빈 값으로 바꾸지 않습니다.

## 키보드와 포커스

- 클릭·Enter·Space·위아래 방향키·Alt+ArrowDown으로 목록을 엽니다. 초기 탐색 항목은
  선택된 첫 유효 항목이며, 없으면 첫 유효 항목입니다. Home·End는 열면서 첫·끝으로 이동합니다.
- 단일 선택의 DOM 포커스는 Trigger에 유지하고 aria-activedescendant로 항목을 참조합니다.
  다중 선택은 List에 DOM 포커스를 두고 List의 aria-activedescendant로 참조합니다.
- 방향키는 유효 항목 사이를 이동하고 양 끝에서 멈춥니다. Home·End는 첫·끝 항목으로,
  PageUp·PageDown은 최대 10개 항목씩 이동합니다. 비활성·hidden·inert 항목은 건너뜁니다.
- 문자 입력은 label 접두어로 탐색합니다. 500ms 이내의 문자는 이어서 검색하고,
  같은 문자를 반복하면 일치하는 항목 사이를 순환합니다. 목록의 항목 수는 유지합니다.
- 단일 선택의 Enter·Space·Alt+ArrowUp은 현재 항목을 확정하고 닫습니다.
  Tab·외부 클릭·외부 포커스 이동도 현재 항목을 확정하며 목적지 포커스를 유지합니다.
- 다중 선택의 Enter·Space는 현재 항목을 토글합니다. Alt+ArrowUp·Tab은 추가 선택 없이 닫습니다.
  Tab·Shift+Tab은 Trigger를 기준으로 네이티브 순서로 이동합니다.
- Escape와 Trigger 재클릭은 탐색 중인 단일 값을 확정하지 않고 닫습니다. 다중 선택에서
  이미 토글한 값은 유지합니다. 닫기 취소 시 Escape·Tab의 기본 이동도 막습니다.
- IME 조합과 Ctrl·Meta 조합의 키 처리는 생략합니다. 별도의 범위 선택·전체 선택 단축키는 제공하지 않습니다.

활성 항목은 화면 안으로 스크롤합니다. 현재 항목이 숨겨지거나 제거되면 첫 유효 항목으로
복구합니다. 빈 목록도 열 수 있습니다. Focus Trap, 외부 inert와 Scroll Lock은 적용하지 않습니다.

## 이름·Field·폼

Trigger에는 aria-label·aria-labelledby 또는 Field.Label로 이름을 제공합니다.
List의 기본 이름은 Field.Label 또는 Trigger를 참조하며 명시적인 이름으로 대체할 수 있습니다.
다중 선택의 Trigger는 Value를 aria-describedby로 참조해 닫힌 상태에서도 선택 요약을 전달합니다.
Field.Description·Field.Error는 Trigger에 연결합니다. Field의 검증 대상은 HiddenSelect이며,
label의 대상은 실제 Trigger입니다. Field 이름이 있으면 Root의 name보다 우선합니다.

폼을 사용할 때 HiddenSelect를 배치합니다. Root의 name, form, required와 disabled를
전달하며 단일 선택의 빈 값은 option value=""로 표현합니다. readOnly에서는 기존 값을
제출하고 required 검증을 생략합니다. 네이티브 select에 포커스가 오면 Trigger로 옮깁니다.
브라우저의 change 이벤트도 값 변경 요청으로 연결하며 취소된 변경은 복원합니다.

폼 reset은 비제어 값을 defaultValue로 복원하고 제어 값은 유지합니다. 초기화는
onValueChange·onOpenChange를 호출하지 않습니다. 취소된 reset은 값을 유지합니다.
값 변경이 반영되면 Field의 dirty·filled·검증 상태를 갱신합니다.

## 배치와 검증

Positioner는 공통 CSS Anchor Positioning을 사용하며 side는 top·bottom, align은
start·center·end를 지원합니다. 기본값은 bottom/start, sideOffset=0,
collisionPadding=8입니다. --anchor-width·--anchor-height·--available-width·--available-height로
크기를 제공합니다. 최대 크기·스크롤·스타일은 사용처에서 정합니다.
부분 RTL 영역을 Portal로 옮기면 Positioner에도 dir="rtl"을 제공합니다.

CSS Anchor Positioning과 Popover API의 showPopover({ source })를 지원하는 브라우저가
필요합니다. Dialog·다른 팝업과의 교차 중첩, 가상화, 모바일 실제 기기와 수동 스크린 리더
검증은 지원 범위에 포함하지 않습니다.

```sh
pnpm --filter @coral/react test src/select
pnpm --filter @coral/react test src/select --config vitest.cross-browser.config.ts
```

테스트는 실제 브라우저에서 역할·이름·ID 참조, 초기 값과 제어 상태, 단일·다중 선택,
키보드·포인터·포커스, 배치·합성·정리, Field·폼 연동과 SSR hydration을 검증합니다.
네이티브 선택·폼 알고리즘 자체는 Coral의 동작으로 중복 테스트하지 않습니다.

## 근거

- [WHATWG HTML: select](https://html.spec.whatwg.org/multipage/form-elements.html#the-select-element)
- [WHATWG HTML: optgroup](https://html.spec.whatwg.org/multipage/form-elements.html#the-optgroup-element)
- [WHATWG HTML: selectedcontent](https://html.spec.whatwg.org/multipage/form-elements.html#the-selectedcontent-element)
- [WAI-ARIA APG: Select-Only Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/)
- [WAI-ARIA APG: Combobox와 단일 선택 범위](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)
- [WAI-ARIA APG: Listbox와 다중 선택](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/)
- [WAI-ARIA APG: 그룹화한 Listbox 예제](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/examples/listbox-grouped/)
- [Ark UI: Select](https://ark-ui.com/docs/components/select)
- [Base UI: Select](https://base-ui.com/react/components/select)

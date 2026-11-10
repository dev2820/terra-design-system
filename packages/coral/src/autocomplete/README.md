# Autocomplete

자유롭게 입력하면서 추천 문자열을 탐색하고 선택하는 headless Autocomplete입니다.
입력값, 추천 목록, 팝업 배치와 접근성 관계를 제공합니다.
색상, 크기, 스크롤 영역과 항목의 표현은 사용처가 정합니다.

```tsx
import { Autocomplete } from "@coral/react/autocomplete";
import { Field } from "@coral/react/field";

const cities = ["서울", "부산", "대전", "제주"];

function CityInput() {
  return (
    <Field.Root name="city">
      <Field.Label>도시</Field.Label>
      <Autocomplete.Root>
        <Autocomplete.Input required />
        <Autocomplete.Portal>
          <Autocomplete.Positioner sideOffset={4}>
            <Autocomplete.List aria-label="추천 도시" className="suggestions">
              {cities.map((city) => (
                <Autocomplete.Item key={city} value={city}>
                  {city}
                </Autocomplete.Item>
              ))}
            </Autocomplete.List>
          </Autocomplete.Positioner>
        </Autocomplete.Portal>
      </Autocomplete.Root>
      <Field.Description>목록에 없는 도시도 입력할 수 있습니다.</Field.Description>
    </Field.Root>
  );
}
```

## 지원 범위

`<input list>`와 `<datalist>`만으로 충분한 추천 입력에는 네이티브 HTML을 사용합니다.
Autocomplete는 목록과 항목의 HTML을 구성하면서 입력 포커스, 탐색과 팝업의
관계를 유지해야 할 때 사용합니다.

APG의 **list autocomplete with manual selection** 패턴을 따릅니다.
입력 문자열이 최종 값이며 목록에 없는 값도 허용합니다. 항목을 탐색하는 동안
입력값은 유지됩니다. Enter나 클릭으로 선택할 때 해당 문자열을 채웁니다.
별도 선택 ID, 다중 선택, 자동 선택과 인라인 완성은 제공하지 않습니다.

## Parts와 이름

| Part       | 기본 요소                             | 책임                                                               |
| ---------- | ------------------------------------- | ------------------------------------------------------------------ |
| Root       | `<div>`                               | 입력값, 열림 상태와 Parts의 관계를 관리합니다.                     |
| Input      | `<input type="text" role="combobox">` | 입력, 폼 참여와 목록 탐색을 제공합니다.                            |
| Portal     | `<div>`                               | 열린 팝업을 body 또는 `container`로 옮깁니다. 선택 사항입니다.     |
| Positioner | `<div popover="manual">`              | 상위 표시 계층에서 Input 기준으로 배치하고 화면 경계를 보정합니다. |
| List       | `<div role="listbox">`                | 추천 목록의 ID와 활성 항목을 관리합니다.                           |
| Item       | `<div role="option" tabindex="-1">`   | 추천 문자열을 표시하고 선택합니다.                                 |

Root 하나에 Input, Positioner와 List를 각각 하나씩 둡니다. List는 Positioner
안에, Item은 List 안에 배치합니다. Item의 `value`는 검색과 입력에 사용하는
문자열입니다. 자식 콘텐츠도 같은 의미를 전달해야 합니다. Item 안에는 버튼,
링크나 별도로 포커스 가능한 요소를 넣지 않습니다.

Input에는 `<label>`, `aria-label` 또는 `aria-labelledby`로 이름을 제공합니다.
Field 안에서는 Field.Label과 Field.Description이 자동으로 연결됩니다.
List에는 `aria-label` 또는 `aria-labelledby`로 이름을 제공합니다.
빈 결과 안내나 로딩 상태는 사용처가 List 바깥에 구성합니다.

열린 Input은 `aria-controls`로 List를 참조합니다. 탐색 중에는
`aria-activedescendant`로 활성 Item을 참조합니다. 활성 Item에는
`aria-selected="true"`가 표시됩니다. 닫히면 Input의 두 참조를 제거합니다.

## 값과 필터링

Root는 `value`, `defaultValue`와 `onValueChange(value, details)`를 제공합니다.
기본값은 빈 문자열입니다. `value`를 생략하면 내부 상태를 사용합니다.
제어 상태에서는 사용처가 변경 요청을 반영합니다.

```tsx
const [city, setCity] = React.useState("");

<Autocomplete.Root value={city} onValueChange={setCity}>
  {/* Input과 추천 목록 */}
</Autocomplete.Root>;
```

현재 입력 문자열을 포함하는 Item을 표시합니다. 대소문자는 구분하지 않습니다.
빈 입력은 모든 항목을 표시합니다. 악센트 정규화, 검색 순위, 서버 검색과
가상화는 제공하지 않습니다. `disabled`인 Item은 표시하지만 탐색과 선택에서
제외합니다.

Root의 `disabled`와 `readOnly`는 Input에 적용하고 팝업을 숨깁니다.
Field와 Coral Fieldset의 disabled도 상속합니다. `required`, `name`, `form`,
`pattern`, `maxLength` 같은 네이티브 입력 속성은 Input에 전달합니다.
추천 값도 사용처가 정한 입력 제약을 만족해야 합니다.

## 열림과 변경 요청

Root는 `open`, `defaultOpen`과 `onOpenChange(open, details)`를 제공합니다.
기본 열림 상태는 `false`입니다. Input 클릭, 텍스트 변경과 방향키로 엽니다.
선택, Escape, 입력 밖으로의 포커스 이동과 외부 클릭으로 닫습니다.
포커스 진입만으로 열리지는 않습니다. 닫힌 Portal, Positioner와 List는
DOM에서 제거됩니다.

두 변경 콜백은 원본 DOM `event`, `reason`, `isCanceled`와 `cancel()`을 받습니다.
`cancel()`은 해당 요청을 취소합니다. 입력값 변경과 열림 변경은 별도 요청입니다.
값 변경을 취소하면 입력값을 복구하고 선택에 따른 닫기도 생략합니다.
제어 상태에서는 사용처도 취소 여부를 존중해야 합니다.

| reason          | 의미                                           |
| --------------- | ---------------------------------------------- |
| `input-change`  | 텍스트 변경에 따른 값 변경과 열기 요청입니다.  |
| `input-press`   | Input 클릭에 따른 열기 요청입니다.             |
| `item-press`    | 추천 선택에 따른 값 변경과 닫기 요청입니다.    |
| `arrow-key`     | 방향키에 따른 열기 요청입니다.                 |
| `escape-key`    | Escape에 따른 닫기 요청입니다.                 |
| `focus-outside` | 입력 밖 포커스 이동에 따른 닫기 요청입니다.    |
| `outside-press` | Input과 팝업 바깥 클릭에 따른 닫기 요청입니다. |

사용자 이벤트 핸들러가 먼저 실행됩니다. `preventDefault()`로 해당 내부 동작을
막을 수 있습니다. 추천 선택은 Root의 `onValueChange`에서 확인합니다.
추천 선택 시 Input의 `onChange`나 네이티브 `input`, `change` 이벤트는 발생하지
않습니다.

## 키보드와 포커스

- ArrowDown은 목록을 열고 첫 번째 가능한 항목을 활성화합니다.
- ArrowUp은 목록을 열고 마지막 가능한 항목을 활성화합니다.
- 열린 목록에서 위아래 방향키는 이전 항목이나 다음 항목으로 이동합니다.
  양 끝에서 순환하지 않습니다. 비활성 항목과 숨겨진 항목은 건너뜁니다.
- Enter는 활성 항목을 채우고 닫습니다. 활성 항목이 없으면 네이티브 동작을 유지합니다.
- Escape는 입력값을 유지하며 닫습니다.
- Tab과 Shift+Tab은 네이티브 순서로 이동하며 추천을 확정하지 않습니다.
- Home, End와 좌우 방향키는 활성 항목을 해제하고 네이티브 텍스트 편집을 유지합니다.
- IME 조합 중에는 Coral의 방향키, Enter와 Escape 처리를 생략합니다.
- 포인터로 항목을 가리키면 활성화합니다. 클릭이나 터치로 선택하면 Input에
  포커스를 두고 커서를 채운 문자열 끝에 둡니다.

목록 탐색 중 DOM 포커스는 Input에 남습니다. 목록은 Tab 순서에 참여하지 않습니다.
외부 요소로 이동해서 닫으면 목적지의 포커스를 유지합니다. Focus Trap,
외부 inert와 Scroll Lock은 적용하지 않습니다.

## Form과 합성

폼 제출 값은 현재 Input의 문자열입니다. HiddenInput은 필요하지 않습니다.
폼 reset 후 비제어 값은 `defaultValue`로, 제어 값은 현재 `value`로 복구합니다.
비제어 열림 상태는 `defaultOpen`으로 복원하고 활성 항목은 해제합니다.
취소된 reset은 반영하지 않습니다. reset은 변경 콜백을 호출하지 않습니다.

모든 Part는 `render`와 Props, 이벤트, Ref 합성을 지원합니다. 대체 Input은
실제 text input에 Props와 Ref를 전달해야 합니다. 포커스, 텍스트 선택, Disabled와
Form 계약도 유지해야 합니다. List와 Item은 역할, ID와 비대화형 목록 구조를
유지해야 합니다. Positioner의 대체 요소는 Popover API를 지원해야 합니다.

Root는 `data-open`, `data-disabled`, `data-readonly`를 제공합니다. Item은
`data-highlighted`와 `data-disabled`를 제공합니다. Positioner는 실제 배치 결과를
`data-side`와 `data-align`으로 제공합니다.

## 배치와 브라우저 지원

Positioner의 `side`는 `top`과 `bottom`을 지원하며 기본값은 `bottom`입니다.
`align`은 `start`, `center`, `end`를 지원하며 기본값은 `start`입니다.
`sideOffset`은 기본 `0`, `collisionPadding`은 기본 `8` CSS px입니다.
스크롤, 크기 변경과 레이아웃 이동에 따라 배치를 갱신합니다.

목록 크기를 구성할 수 있도록 `--anchor-width`, `--anchor-height`,
`--available-width`, `--available-height`를 제공합니다. 최대 크기와 스크롤은
사용처가 정합니다. 부분 RTL 영역의 팝업을 body로 옮길 때는 Positioner에도
`dir="rtl"`을 전달합니다.

네이티브 Popover API와 `showPopover({ source })`를 지원하는 브라우저가 필요합니다.
Dialog, Popover와의 교차 중첩과 여러 팝업 사이의 레이어 조정은 지원 범위에
포함하지 않습니다. 수동 스크린 리더와 실제 모바일 기기 검증은 포함하지 않습니다.

## 근거

- [WHATWG HTML: datalist와 추천 값](https://html.spec.whatwg.org/multipage/form-elements.html#the-datalist-element)
- [WHATWG HTML: text input](<https://html.spec.whatwg.org/multipage/input.html#text-(type=text)-state-and-search-state-(type=search)>)
- [WHATWG HTML: Popover API](https://html.spec.whatwg.org/multipage/popover.html#the-popover-attribute)
- [WAI-ARIA APG: Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)

# Slider

네이티브 range input과 조합 가능한 Parts로 숫자 하나 또는 범위를 선택하는
Headless 컴포넌트다. 키보드 입력, 접근성 의미와 폼 참여는 실제
`input[type="range"]`가 담당한다. Coral은 값 상태, 여러 Thumb 사이의 경계,
트랙 클릭, 드래그와 시각적 위치를 제공한다.

## 사용법

```tsx
import { Slider } from "@coral/react/slider";

<Slider.Root name="volume" defaultValue={[50]}>
  <Slider.Label>볼륨</Slider.Label>
  <Slider.ValueText />
  <Slider.Control className="slider-control">
    <Slider.Track className="slider-track">
      <Slider.Indicator className="slider-indicator" />
      <Slider.Thumb className="slider-thumb">
        <Slider.HiddenInput />
      </Slider.Thumb>
    </Slider.Track>
  </Slider.Control>
</Slider.Root>;
```

루트 import인 `import { Slider } from "@coral/react"`도 지원한다. 사용처는
Control과 Track의 크기, Thumb의 크기와 포인터 타깃, 색상과 포커스 표시를
제공한다. Track의 바깥쪽에 Thumb 반지름 이상의 공간을 확보한다.

```css
.slider-control {
  width: 240px;
  height: 24px;
}
.slider-track {
  width: 100%;
  height: 100%;
}
.slider-thumb {
  width: 24px;
  height: 24px;
}
.slider-thumb:has(:focus-visible) {
  outline: 2px solid currentColor;
}
```

HiddenInput은 Thumb 크기의 투명한 range input이다. 접근성 트리와 Tab 순서에
남으며, `aria-hidden`이나 `tabIndex=-1`을 적용하지 않는다. 투명한 input의
포커스를 사용자가 확인할 수 있도록 Thumb에 포커스 스타일을 제공해야 한다.

## Parts와 render

| Part        | 기본 요소 | 책임                                                           |
| ----------- | --------- | -------------------------------------------------------------- |
| Root        | div       | 값, 범위, 방향과 폼 정보를 공유한다.                           |
| Label       | label     | 첫 번째 range input에 이름과 클릭 포커스를 연결한다.           |
| ValueText   | span      | 현재 값들을 포맷하여 표시한다.                                 |
| Control     | div       | 트랙 클릭과 포인터 드래그를 처리한다.                          |
| Track       | div       | 값과 포인터 좌표를 대응시키는 영역이다.                        |
| Indicator   | div       | 최솟값부터 단일 값까지, 또는 첫 값부터 마지막 값까지 표시한다. |
| Thumb       | div       | 지정 index의 값에 위치하며 input의 포커스 상태를 표시한다.     |
| HiddenInput | input     | 네이티브 range의 키보드, 접근성과 폼 동작을 제공한다.          |

Root 안에 Control 하나, Control 안에 Track 하나를 배치한다. Indicator와
Thumb은 Track 안에 배치한다. 값마다 Thumb을 하나씩 제공하고 각 Thumb 안에
HiddenInput 하나를 배치한다. index는 0부터 시작하고 기본값은 0이다. Label과
ValueText는 선택적으로 사용한다.

모든 Part는 `render`를 제공한다. 사용자 컴포넌트는 전달받은 Props, Event와 Ref를
동일한 실제 DOM 요소에 연결하고 자식 구조를 유지해야 한다.

```tsx
<Slider.Root render={<section />} defaultValue={[30]}>
  <Slider.Label render={<label className="slider-label" />}>볼륨</Slider.Label>
  <Slider.Control>
    <Slider.Track>
      <Slider.Indicator render={<span />} />
      <Slider.Thumb render={<span className="slider-thumb" />}>
        <Slider.HiddenInput render={<MyRangeInput />} />
      </Slider.Thumb>
    </Slider.Track>
  </Slider.Control>
</Slider.Root>
```

HiddenInput의 합성 대상은 실제 `input[type="range"]`를 렌더링해야 한다.
Label은 input과 연결되는 label의 의미와 클릭 동작을 유지해야 한다.
Control, Track, Indicator와 Thumb은 HTMLElement의 레이아웃 박스를 제공한다.
Thumb에 별도의 role, tabIndex나 상호작용 자식을 추가하지 않는다.

## 값과 범위

- `value`와 `defaultValue`는 비어 있지 않은 유한한 숫자 배열이다. 단일 값도
  `[50]`으로 전달한다. 값 개수에 맞춰 Thumb과 HiddenInput을 제공한다.
- `min=0`, `max=100`, `step=1`이 기본값이다. min은 max 이하여야 하고 step은
  유한한 양수여야 한다. 범위와 step의 비율도 유한해야 한다.
- 초기 값을 생략하면 네이티브 range처럼 min과 max의 중간값을 사용한다.
- 값은 범위 안에서 min을 기준으로 step에 맞추고 오름차순으로 정렬한다.
  두 step 사이의 정중앙은 큰 값을 택한다. max가 step에 맞지 않으면 max 이하의
  마지막 step까지 선택한다.
- 사용자 입력으로 Thumb끼리 서로 넘어가지 않는다. 같은 값은 허용한다.
  각 input의 min/max를 이웃 값으로 갱신하며 DOM 순서와 Tab 순서는 유지한다.
- `value`를 전달하면 제어 상태다. `onValueChange`에서 값을 받아 다시 전달한다.
  값을 유지하면 input과 시각적 위치도 기존 값을 유지한다.
- `onValueChange(value, details)`는 실제 변경을 요청할 때 호출한다.
  details에는 `index`, 네이티브 `event`, `reason`, `isCanceled`, `cancel()`이 있다.
  reason은 `input-change`, `track-press`, `drag`다. `cancel()`은 변경을 취소한다.
- `format(value, index)`의 반환값을 ValueText와 각 input의 aria-valuetext에 사용한다.
  생략하면 숫자를 그대로 표시한다. 여러 값은 `–`로 연결한다.

```tsx
<Slider.Root name="price" defaultValue={[20, 80]} min={0} max={100} step={5}>
  <Slider.Label>가격 범위</Slider.Label>
  <Slider.ValueText />
  <Slider.Control className="slider-control">
    <Slider.Track className="slider-track">
      <Slider.Indicator className="slider-indicator" />
      <Slider.Thumb index={0} className="slider-thumb">
        <Slider.HiddenInput aria-label="최소 가격" />
      </Slider.Thumb>
      <Slider.Thumb index={1} className="slider-thumb">
        <Slider.HiddenInput aria-label="최대 가격" />
      </Slider.Thumb>
    </Slider.Track>
  </Slider.Control>
</Slider.Root>
```

## 입력과 접근성

각 input에 접근 가능한 이름을 제공한다. 단일 값은 Label이나 Root의 aria-label,
aria-labelledby를 사용한다. 여러 Thumb에는 HiddenInput별로 구별되는 이름을
제공한다. HiddenInput에 직접 전달한 이름이 공통 이름보다 우선한다.

HiddenInput의 이름과 aria-valuetext는 기본값, render 요소의 Props, Part Props
순서로 적용한다. 직접 지정한 이름이 있으면 공통 aria-labelledby를 추가하지
않는다. 설명과 오류 ID는 HiddenInput의 aria-describedby와 합쳐서 연결한다.

- 방향키, Home/End와 Page Up/Down은 네이티브 range가 처리한다. 키별 변화량은
  브라우저의 네이티브 동작을 따른다. 각 Thumb은 독립적인 Tab 정지점이다.
- `orientation="vertical"`은 위쪽을 최댓값으로 사용하고 input에 세로 방향을
  전달한다. 사용처는 세로 Control과 Track의 높이를 지정한다.
- 가로 방향은 Root의 dir 또는 상속된 CSS direction을 따른다. RTL에서는
  오른쪽이 최솟값이다. Root의 dir을 변경하면 위치와 입력 방향도 갱신한다.
- 트랙 클릭은 가장 가까운 Thumb을 이동하고 해당 input에 포커스를 준다.
  Thumb 드래그는 누른 위치를 유지한다. pointer capture로 영역 밖에서도
  드래그하며 pointerup, pointercancel, capture 해제와 unmount에서 정리한다.
- 마우스 왼쪽 버튼, 펜과 터치를 처리한다. 가로 Slider의 수직 페이지 스크롤과
  세로 Slider의 수평 페이지 스크롤은 touch-action으로 허용한다.
- Control의 onPointerDown/onPointerMove와 HiddenInput의 onChange에서
  preventDefault를 호출하면 해당 변경 처리를 건너뛴다.
- `disabled`는 포커스, 입력과 폼 제출을 막는다. Field와 Fieldset의 disabled도
  반영한다. `readOnly`는 값 변경을 막고 포커스와 폼 제출을 유지한다.
  네이티브 range에는 readonly 동작이 없으므로 Coral이 입력을 제한하고
  aria-readonly를 제공한다.
- 모든 Part에 data-orientation, data-disabled, data-readonly, data-invalid,
  data-dragging을 조건에 따라 제공한다. Thumb에는 data-index와
  data-focused도 제공한다.

실제 터치 기기와 화면 읽기 프로그램의 상호작용은 제품의 지원 환경에서
추가로 확인해야 한다. 특히 Thumb 크기와 최종 CSS가 접근성 입력에 영향을 준다.

## 폼과 Field

Root의 name과 form을 모든 HiddenInput에 적용한다. 여러 값은 같은 name으로
DOM 순서대로 제출하므로 `new FormData(form).getAll(name)`으로 읽는다.
값이 항상 존재하는 range에는 required를 제공하지 않는다.

취소되지 않은 네이티브 form reset 이후 비제어 값은 defaultValue로 돌아간다.
제어 값은 현재 value를 유지한다. reset은 onValueChange를 호출하지 않는다.

Field 안에서는 이름, 설명, 오류와 disabled/invalid 상태를 연결한다. Field의
Label과 검증 대상은 첫 번째 input이다. Field의 validate는 첫 번째 input의
문자열 값을 받는다. 범위 전체의 검증은 사용처에서 배열을 검증하고 Field의
invalid와 오류 내용을 제어한다. Thumb 사이의 포커스 이동은 Field의 blur로
처리하지 않는다.

## 참고와 명세

- [WHATWG: range input](<https://html.spec.whatwg.org/multipage/input.html#range-state-(type=range)>)
- [WHATWG: label](https://html.spec.whatwg.org/multipage/forms.html#the-label-element)
- [WAI-ARIA APG: Slider](https://www.w3.org/WAI/ARIA/apg/patterns/slider/)
- [WAI-ARIA APG: Multi-Thumb Slider](https://www.w3.org/WAI/ARIA/apg/patterns/slider-multithumb/)
- [Base UI Slider](https://base-ui.com/react/components/slider)
- [Ark UI Slider](https://ark-ui.com/docs/components/slider)

# 2026-10-01 — Checkbox의 네이티브 input을 명시적인 HiddenInput으로 제공하기

## 문제

[이전 결정](2026-09-29-checkbox를-root와-indicator의-합성-구조로-제공하기.md)에서는 Checkbox를 Root와 Indicator로 나누고, Root가 네이티브 `<input type="checkbox">`를 자동으로 렌더링하도록 했다. 투명한 input이 Root 전체를 덮어 포인터 입력을 직접 받고, Indicator가 체크 상태를 표현하는 구조였다. 사용하는 측은 작은 공개 API로 네이티브 입력 동작과 시각 표현을 조합할 수 있었다.

이 구조를 검토하면서 Root의 `position`을 계산하는 이유와 사용자가 `position: static`을 지정했을 때의 동작을 확인했다. 절대 위치의 input을 Root 영역에 맞추려면 위치 기준이 필요하므로, Root를 적절한 containing block으로 만들거나 사용하는 측에 그 조건을 요구해야 했다. Root에 relative를 강제하면 소비자가 정한 배치에 개입하고, static을 그대로 허용하면 input의 클릭 영역이 Root와 어긋날 수 있었다. 시각적인 Root의 배치가 실제 입력 영역의 정확성을 결정하는 제약이 드러났다.

사용자는 이 논의에서 Ark UI의 Checkbox 인터페이스를 선호하며 HiddenInput을 별도 Part로 제공하도록 요청했다. 네이티브 input의 폼 참여와 접근성은 유지하면서, 입력 요소와 시각적인 체크 영역을 명시적으로 합성하는 구조로 변경할 필요가 생겼다.

## 접근 방식

기존 overlay 방식은 Root가 input까지 자동으로 제공하므로 소비자가 입력 요소를 빠뜨릴 가능성이 적고, Root 전체의 포인터 입력이 네이티브 input에 도달한다는 장점이 있었다. 다만 이 방식을 유지하면 Root의 위치 스타일을 조정하거나 input이 덮을 영역을 올바르게 만드는 조건을 사용처에 계속 요구해야 했다.

Ark UI의 Root, Control, Indicator, Label, HiddenInput 구성을 참고해 실제 입력과 시각 표현의 책임을 나누는 방식을 검토했다. Coral에서는 Root를 네이티브 label로 두고 그 안에 실제 checkbox input을 배치하면, label의 기본 활성화 동작으로 체크 영역과 텍스트의 클릭을 input에 연결할 수 있다. input이 Root 전체를 덮을 필요가 없어지고, 시각적인 Control은 상태를 표현하는 요소로 사용할 수 있다. Root가 label 역할을 소유하므로 별도 Label Part는 span으로 텍스트를 표현할 수 있다.

HiddenInput을 공개하면 소비자가 Root 안에 입력 요소를 명시적으로 넣어야 한다는 부담이 생긴다. 이를 생략하면 시각 Part만 남고 네이티브 입력과 폼 동작이 제공되지 않는다. 이 합성 조건을 받아들이고, 실제 input에 적용할 ref, id와 ARIA 속성도 HiddenInput에서 지정할 수 있도록 입력 요소의 경계를 드러내기로 했다.

Headless 컴포넌트에서 숨김 스타일을 어디까지 제공할지도 확인했다. input을 시각적으로 숨기는 처리는 네이티브 입력을 유지하며 커스텀 표시를 제공하기 위한 동작의 일부다. Coral이 이 최소 스타일을 소유하면 소비자가 숨김 처리를 빠뜨리거나 `display: none`으로 포커스 가능한 입력을 제거하지 않도록 기본 구조를 제공할 수 있다. 체크 영역의 크기, 색상, 테두리, 아이콘과 포커스 표시는 제품이 정한다.

## 해결

Checkbox는 Root, Control, Indicator, Label, HiddenInput을 합성하는 구조로 변경한다. Root가 상태를 공유하고 네이티브 label로 클릭을 연결하며, HiddenInput이 실제 `<input type="checkbox">`를 렌더링한다. Control은 시각적인 체크 영역, Indicator는 상태에 따른 표시, Label은 텍스트를 담당한다. 네이티브 input이 포커스, 키보드 입력과 폼 참여를 계속 담당한다.

Root는 input을 자동으로 생성하지 않는다. 소비자는 Root 안에 HiddenInput 하나를 명시적으로 배치해야 한다. HiddenInput은 시각적으로만 숨기는 최소 스타일을 제공하며 Root 전체에 겹치는 클릭 영역으로 사용하지 않는다. 따라서 Root에 relative를 강제하거나, overlay를 맞추기 위해 소비자에게 위치 기준을 요구하는 구조를 제거한다. 제품은 시각 Part의 배치와 스타일, 실제 input의 포커스를 시각 Control에 표현하는 방식을 구현한다.

Field와의 기존 연동은 HiddenInput이 Field.Control을 통해 실제 input을 렌더링하는 경로에서 유지한다. Checkbox의 시각 Part에도 Field 및 Fieldset의 disabled 상태가 반영된다. Root가 label이므로 Field.Label을 함께 사용할 때는 Root를 감싸 중첩 label을 만들지 않고 형제로 배치한다.

이 결정은 이전 Root·Indicator 구조의 입력 요소 배치와 공개 합성 단위를 변경한다. 네이티브 checkbox를 사용하고 제품이 시각 표현을 소유한다는 원칙은 이어진다. 이전 기록은 당시 선택의 맥락으로 보존하고, 변경된 사용 구조와 세부 계약은 [Checkbox 문서](../../packages/coral/src/checkbox/README.md)에 둔다.

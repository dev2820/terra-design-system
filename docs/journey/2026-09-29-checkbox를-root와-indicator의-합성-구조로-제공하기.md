# 2026-09-29 — Checkbox를 Root와 Indicator의 합성 구조로 제공하기

## 문제

Coral에 Checkbox를 추가하면서 컴포넌트가 브라우저의 폼 동작과 접근성을 유지하는 동시에, 제품마다 다른 체크 표시와 시각적 구성을 자유롭게 조합할 수 있어야 했다. 단일 컴포넌트가 입력 요소, 아이콘, 스타일을 모두 소유하면 사용은 간단하지만 표시 요소를 교체하거나 상태에 따라 다른 콘텐츠를 렌더링하기 어렵다. 반대로 시각 요소만 제공하고 실제 입력을 소비자에게 맡기면 label 연결, 폼 제출, 초기화, 키보드 조작 같은 동작을 각 사용처가 다시 구현해야 한다.

## 접근 방식

브라우저가 제공하는 `<input type="checkbox">`를 실제 컨트롤로 유지하고, Coral이 입력과 시각 요소의 관계를 구성하는 방식을 검토했다. 공개 API는 Base UI와 유사한 `Checkbox.Root`와 `Checkbox.Indicator`의 작은 단위로 나누었다.

`Root`는 네이티브 input을 포함하고 상태, 폼 참여, 접근성 속성, Field 및 Fieldset 연동을 담당한다. input은 Root 영역을 투명하게 덮어 포인터와 키보드 상호작용이 실제 네이티브 컨트롤에 도달한다. `Indicator`는 Root가 제공하는 상태를 읽어 checked 또는 indeterminate일 때 표시되며, 함수형 children으로 두 상태의 표시를 구분할 수 있다.

기본 체크 아이콘과 시각 스타일을 컴포넌트에 포함하는 방안도 검토했다. 이 경우 제품별 표현을 덮어쓰는 API가 늘어나고 Coral이 구조와 표현을 함께 소유하게 된다. Checkbox Group이나 범용 `render` API 역시 현재 요구를 해결하는 데 필요하지 않아 범위에서 제외했다.

## 해결

Checkbox는 `Checkbox.Root`와 `Checkbox.Indicator`의 합성 구조로 제공한다. Root 내부의 네이티브 input이 포커스, label 활성화, 폼 제출과 초기화를 담당하고, Indicator는 상태 기반 표시만 담당한다. 소비자는 Indicator의 자식으로 체크나 중간 상태 아이콘을 제공하고 Root와 Indicator를 직접 스타일링한다.

`checked`와 `indeterminate`는 독립된 상태로 취급한다. 폼 데이터 포함 여부는 네이티브 checked 값만 따르며, indeterminate는 시각 및 접근성 상태를 나타낸다. `readOnly`는 네이티브 checkbox에 대응 속성이 없으므로 Coral이 변경을 차단하되 포커스와 폼 참여는 유지한다.

이 선택으로 Checkbox의 브라우저 동작은 네이티브 input에 남고, 시각 표현은 작은 합성 단위로 교체할 수 있다. 현재 공개 범위는 Root와 Indicator이며, 그룹 동작이나 기본 아이콘은 실제 요구가 생길 때 별도 결정한다.

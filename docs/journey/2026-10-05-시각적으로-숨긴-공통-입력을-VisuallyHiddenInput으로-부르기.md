# 2026-10-05 — 시각적으로 숨긴 공통 입력을 VisuallyHiddenInput으로 부르기

## 문제

Checkbox와 Switch는 각각 공개 Part인 `HiddenInput`을 제공한다. 두 Part 모두 실제 `<input type="checkbox">`를 시각적으로만 숨기고, `Field.Control`을 통해 렌더링하며, `useRender`로 사용자 Props와 내부 Props를 합성한다. 구현을 비교하자 숨김 스타일과 입력 렌더링이 중복되었고, 이를 공통 컴포넌트로 분리할 때 무엇을 공통 책임으로 삼을지 결정할 필요가 생겼다.

처음에는 두 컴포넌트가 모두 checkbox 입력을 사용하므로 공통 컴포넌트를 `HiddenCheckboxInput`으로 좁히는 방안을 제안했다. 사용자는 이후 다른 Form 컴포넌트도 `HiddenInput`을 제공할 수 있다는 점을 짚었다. 공통 이름을 현재 두 컴포넌트의 체크 상태에 맞추면 이후의 재사용 범위를 불필요하게 제한한다.

## 접근 방식

`HiddenCheckboxInput`이라는 이름과 범위는 지금 겹치는 `checked` 변경, 변경 취소, 폼 초기화 동작까지 한곳에 모으기 쉽다. 그러나 다른 입력은 값과 상태를 다르게 관리할 수 있다. 모든 입력이 checkbox의 상태 모델을 따르는 것처럼 공통 컴포넌트를 정의할 근거는 없었다.

`HiddenInput`이라는 넓은 이름도 검토했다. 이 이름은 이미 각 컴포넌트의 공개 Part를 가리킨다. 또한 현재 Part의 input은 포커스와 키보드 입력을 유지한 채 화면에서만 숨겨진다. HTML의 `type="hidden"`은 상호작용하는 입력이 아니며 label을 연결하는 입력도 아니다. 같은 이름으로 두 형태를 묶으면 공통 컴포넌트가 어떤 네이티브 동작을 보존하는지 흐려질 수 있다. [WHATWG HTML의 input 분류](https://html.spec.whatwg.org/multipage/input.html#the-input-element)도 Hidden 상태와 상호작용하는 입력의 차이를 보여준다.

`VisuallyHiddenInput`은 현재 확인된 공통점인 **시각적 숨김과 실제 input 렌더링**을 이름에 담는다. 사용자가 전달한 Props와 내부 Props의 병합, 시각적 숨김, `Field.Control`을 통한 렌더링은 공유할 수 있다. `checked`, `indeterminate`, 변경 취소와 reset 후 상태 동기화처럼 입력 종류에 따라 달라지는 행동은 별도로 다룰 수 있다.

## 해결

Checkbox와 Switch를 비롯한 Form 컴포넌트가 공통으로 사용할 내부 컴포넌트의 이름으로 `VisuallyHiddenInput`을 선택한다. 이 이름은 네이티브 입력을 시각적으로 숨기면서 필요한 포커스와 Form 동작을 유지한다는 계약을 드러낸다. 각 컴포넌트의 공개 Part 이름은 `HiddenInput`으로 유지한다.

공통 컴포넌트는 시각적 숨김과 입력 렌더링·Props 합성의 경계를 표현한다. Checkbox와 Switch의 체크 상태 같은 개별 행동까지 공통 이름만을 이유로 강제하지 않는다. 앞으로 다른 Form 컴포넌트가 `HiddenInput`을 제공하더라도 그 입력이 실제로 같은 시각적 숨김 계약을 갖는지 확인한 뒤 공통 컴포넌트를 적용한다. 구체적인 Props와 Hook 구성은 이 명명 결정에서 확정하지 않는다.

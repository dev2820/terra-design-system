# Coral Hooks 실험의 설계 질문

## 1. 훅과 JSX Parts는 무엇을 공유하는가?

- **질문과 배경:** 기존 Coral의 상태와 DOM 동작을 훅으로 제공하면서 두 구현이 갈라지는 것을 막아야 한다.
- **선택지:** 기존 컴포넌트를 감싸면 훅이 HTML을 직접 구성하지 못한다. 행동을 별도로 복제하면 두 API의 동작이 달라진다. Root 훅이 상태·Props getter·Ref·Effect를 소유하면 Parts는 같은 결과를 연결할 수 있다.
- **선택:** 패턴별 React 훅과 얇은 Context Parts를 만든다. 별도 Machine·Actor·Adapter는 두지 않는다. 기존 Coral을 import하거나 수정하지 않는다.
- **검증:** src의 네 패턴 훅을 Root가 직접 호출하고 Parts가 같은 getter를 사용한다. 두 API에 적용한 52개 시나리오와 공통 3개 검사가 Chromium에서 통과했다. 자세한 결과는 README에 기록했다.
- **한계와 재검토 조건:** 이 실험은 기존 공개 API를 그대로 유지하는 이전 작업이 아니다. Field·Fieldset Context 통합은 별도 검토가 필요하다.

## 2. Tabs의 SSR ID 관계를 누가 소유하는가?

- **질문과 배경:** Effect 등록은 서버 HTML에 관계를 만들지 못한다. Root가 자식의 존재와 사용자 지정 ID를 추측하면 잘못된 참조가 생길 수 있다. 매 쌍에 ID·ARIA 속성 네 개를 쓰는 방식은 사용 부담이 크다.
- **선택지:** Part의 Effect 등록, 사용처의 수동 연결, Root의 항목 선언을 비교했다. 항목 선언은 데이터와 JSX를 일치시킬 책임이 추가되지만 SSR과 조건부 패널의 존재를 함께 표현할 수 있다.
- **선택:** `items: { value, disabled?, panel?, tabId?, panelId? }[]`를 Root 훅에 전달한다. ID는 Root의 `id` 또는 `useId()`와 value로 생성한다. 기본 패널은 존재하고 `panel: false`이면 참조를 생략한다. 개별 ID 변경도 항목 선언에서 한다. getter의 id 덮어쓰기는 허용하지 않는다.
- **검증:** renderToString의 양방향 참조, hydrateRoot의 recoverable error 0건, 중첩/다중 인스턴스의 ID 중복 없음, 사용자 지정 ID, panel: false와 조건 변경을 확인했다. 기본 조합의 axe 검사에서도 ID 참조 위반이 없었다.
- **한계와 재검토 조건:** 선언한 항목과 실제 DOM을 사용처가 일치시켜야 한다. 임의의 자식 트리와 조건부 렌더링의 존재를 서버에서 자동 발견하는 API는 검증하지 않는다. Meter·Progress의 기존 결정은 변경하지 않는다.

## 3. 임의의 태그를 지원하는가?

- **질문과 배경:** `role`은 네이티브 키보드, disabled, Label과 Form 동작을 제공하지 않는다.
- **선택지:** 모든 대체 요소에서 네이티브 동작을 재구현하거나, 실제 입력은 유지하고 주변 구조와 시각 Part를 바꾸는 방법이 있다.
- **선택:** Tabs.Tab과 ToggleGroup.Item은 button, Checkbox.Input은 checkbox input, Slider.Input은 range input으로 제한한다. Checkbox의 시각 Control과 Slider의 시각 Thumb·Control은 비대화형 요소를 사용하며 네이티브 입력을 유지한다. JSX의 비대화형 Parts에는 render 합성을 제공한다. Button은 네이티브 요소로 충분하므로 useButton을 추가하지 않는다.
- **검증:** 네이티브 입력과 시각 Part의 조합 모두에서 키보드·Form 동작을 확인했다. button에는 Enter/Space로 클릭이 두 번 발생했고 div role=button에는 발생하지 않았다. role만 지정한 checkbox·slider의 키 입력은 상태를 바꾸지 않았다. FormData에도 값이 없었다. 터치 에뮬레이션 10개 검사도 통과했다.
- **한계와 재검토 조건:** input이 없는 커스텀 checkbox·slider나 div 버튼은 지원하지 않는다. 그 지원이 필요하면 키보드·클릭 생성·Form·Label·fieldset 전파를 별도로 구현하고 검증해야 한다.

## 4. 사용자 Props·이벤트·Ref와 상태 변경을 어떻게 합성하는가?

- **질문과 배경:** 단순 spread 순서는 Ref와 이벤트를 덮어쓸 수 있고 잘못된 ARIA 관계를 만들 수 있다.
- **선택지:** 사용처에서 직접 합성하거나 getter 인자로 사용자 Props를 받는다. 직접 합성은 누락 위험이 있으므로 getter가 합성을 소유한다.
- **선택:** `getXProps(userProps)`와 `getItemProps(value, userProps)`를 사용한다. 사용자 이벤트를 먼저 실행하고 preventDefault이면 내부 변경을 취소한다. 내부 필수 속성은 우선하고 style은 사용자 값을 우선한다. Ref는 객체·콜백과 React 19 cleanup을 합성한다. 상태 변경 콜백은 `details.cancel()`을 제공한다. controlled 값은 부모가 갱신하며 취소가 부모의 갱신을 되돌리지는 않는다.
- **검증:** 두 API의 변경 취소, controlled 값 갱신, 사용자 preventDefault, 객체 Ref 연결, 콜백 Ref cleanup과 Strict Mode, 동적 요소 교체를 확인했다. Tabs의 공유 포인터 표시를 이전 Tab의 blur가 지우는 실패는 해당 Tab의 표시만 지우도록 수정했다.
- **한계와 재검토 조건:** getter 결과 뒤의 spread로 필수 Props·Ref를 덮어쓰거나 사용자 컴포넌트가 이를 전달하지 않으면 보장할 수 없다. 비동기 cancel은 지원하지 않는다.

## 5. Form과 DOM 생명주기의 실험 범위는 무엇인가?

- **질문과 배경:** 네이티브 입력을 쓰더라도 Root의 렌더링 시점과 Part의 DOM 부착 시점은 다를 수 있다. Form과 포커스 처리가 실제 DOM을 따라야 한다.
- **선택:** Checkbox는 checked·mixed·readOnly·required·disabled, Label, FormData와 reset을 확인한다. Slider는 범위·step·교차하지 않는 다중 값, 네이티브 키보드, Control의 pointer capture와 FormData·reset을 확인한다. range에 required를 제공하지 않는다. Tabs와 ToggleGroup의 선택은 Form 값이나 reset에 연결하지 않는다. 포커스 목록은 실제 DOM 순서, 숨김·disabled·inert를 반영하고 Observer를 정리한다.
- **선택지와 근거:** 네이티브 입력이 제공하는 동작은 유지하고, 커스텀 Track 드래그와 상태 연결만 훅에서 보완한다. 터치 실기기와 스크린 리더는 자동 브라우저 검사와 별도로 구분한다.
- **검증:** Label·Space, 실제 required 제출 차단과 submit, FormData, reset 취소·외부 form·controlled reset, fieldset/legend, 다중 Slider 경계와 드래그를 확인했다. 초기 Root Effect 방식에서는 조건부 Input의 mixed와 reset, 교체한 List의 Observer가 연결되지 않았다. Ref 등록/해제에서 listener와 Observer를 관리하도록 수정한 뒤 세 실패가 모두 통과했다. 포인터·터치 취소 시 capture와 dragging 정리도 확인했다. 최종 검토에서는 수평/수직과 LTR/RTL의 Thumb 위치 16개, 포인터 값 8개를 실제 브라우저 좌표로 확인했다. Control의 실제 direction으로 시각 위치를 계산하고 수직 예제의 top 덮어쓰기를 제거했다.
- **한계와 재검토 조건:** 기존 Slider의 전체 Parts·Field 통합과 모든 브라우저·보조 기술의 동등성은 이번 실험의 완료 조건으로 삼지 않는다.

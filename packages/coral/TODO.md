# TODO

Coral은 WAI-ARIA APG 목록을 컴포넌트 목록으로 그대로 구현하지 않는다. 실제로
반복할 UI 문제와 네이티브 HTML의 지원 범위를 먼저 확인하고, Coral이 구조나
행동을 제공할 이유가 있을 때 컴포넌트를 만든다.

컴포넌트는 다음 조건을 만족하면 완료한 것으로 본다.

- 필요한 HTML 요소와 Parts의 의미 및 관계를 정의한다.
- 네이티브 HTML이 제공하지 않는 상태와 행동만 구현한다.
- 적용 가능한 APG의 키보드, Focus와 ARIA 요구를 충족한다.
- Coral이 소유하는 DOM 생명주기 동작을 실제로 구현한다.
- Browser Test와 typecheck로 공개 계약과 사용자 결과를 검증한다. Type Test는
  `AGENTS.md`의 기준에 해당하는 비자명한 타입 계약이 있을 때만 추가한다.
- APG와 다르게 동작하거나 자동화할 수 없는 범위는 이유와 한계를 문서로 남긴다.

## Base UI 컴포넌트 검토 목록

2026-08-31 현재 Base UI v1.7.0 공식 문서에 등재된 컴포넌트다. Coral이 구조와
행동을 설계할 때 우선 참고하되, 목록에 있다는 이유만으로 구현하지 않는다. 각
체크박스는 구현 완료가 아니라 Coral에서 제공할 필요와 지원 범위의 검토 완료를
뜻한다.

- [x] Accordion
- [ ] Alert Dialog
- [ ] Autocomplete
- [x] Avatar
- [ ] Button
- [x] Checkbox
- [ ] Checkbox Group
- [ ] Collapsible
- [ ] Combobox
- [ ] Context Menu
- [ ] Dialog
- [ ] Drawer
- [x] Field
- [x] Fieldset
- [x] Form — 네이티브 `<form>`으로 충분하므로 별도 컴포넌트를 제공하지 않는다.
- [x] Input
- [ ] Menu
- [ ] Menubar
- [x] Meter — 기본 측정값·포맷·Parts를 제공하고 원형과 임계값 구간 판정은 제외한다.
- [ ] Navigation Menu
- [ ] Number Field
- [ ] OTP Field
- [ ] Popover
- [ ] Preview Card
- [x] Progress — 확정·불확정 상태와 값 포맷·Parts를 제공한다.
- [x] Radio — 별도 컴포넌트 없이 Radio Group의 Item으로 제공한다.
- [x] Radio Group — 네이티브 fieldset, legend, label과 radio input으로 단일 선택 그룹을 제공한다.
- [ ] Scroll Area
- [ ] Select
- [x] Separator — 네이티브 `<hr>` 기반 정적 구분선으로 방향과 장식용 처리를 제공한다.
- [ ] Slider
- [x] Switch — 네이티브 checkbox 기반 켜짐·꺼짐 상태와 Root, Control, Thumb, Label, HiddenInput을 제공한다.
- [ ] Tabs
- [ ] Toast
- [ ] Toggle
- [ ] Toggle Group
- [ ] Toolbar
- [ ] Tooltip

## Progress 포맷 계약

- Meter와 동일하게 `format?: (value: number) => string`만 제공한다.
- `format`을 생략하면 런타임 기본 로케일로 백분율을 표시한다.
- 포맷 함수에는 범위로 제한한 실제 값을 전달하고, 반환 문자열을 `Value`의
  기본 내용과 자동 `aria-valuetext`에 사용한다.
- 불확정 상태에서는 포맷 함수를 호출하지 않는다.
- Intl 옵션 객체와 별도 `locale` Prop은 제공하지 않는다. 특정 로케일이 필요하면
  사용처가 포맷 함수에서 `Intl.NumberFormat`을 사용한다.

## Bison에서 이전한 패턴 검토

- [ ] Alert와 Breadcrumb가 네이티브 구조를 안전하게 재사용하게 하는 Coral
      컴포넌트가 필요한지 검토한다.
- [ ] Button은 네이티브 요소의 의미, 키보드와 Form 동작을 보존하는 범위에서
      Coral의 공개 계약을 정한다.
- [x] Checkbox는 Root, Control, Indicator, Label과 HiddenInput의 합성 구조로
      제공하고, 네이티브 input의 키보드와 Form 동작을 유지한다.
- [ ] Disclosure와 Accordion은 구조, 펼침 상태와 ID 관계를 컴포넌트에서 직접
      완성한다.
- [ ] Dialog와 Alert Dialog는 Focus 이동·순환·복원, 외부 영역 비활성화와
      Scroll Lock을 실제 DOM 동작으로 완성한다.
- [ ] Carousel은 수동·자동 회전, Focus·Hover 일시 정지와 비순환 경계를
      컴포넌트에서 완성하되 Timer 주입 계약을 별도로 검토한다.

각 항목은 기존 Bison 구현을 완료 상태로 이전한 것이 아니다. Bison에서 확인한
접근성 조건을 Coral의 렌더링 계층에서 다시 검토하고 구현하기 위한 목록이다.

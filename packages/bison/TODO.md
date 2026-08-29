# TODO

Bison의 목표는 [WAI-ARIA APG 패턴](https://www.w3.org/WAI/ARIA/apg/patterns/)을
프레임워크에 독립적인 상태 머신으로 구현하는 것이다.

각 패턴은 다음 조건을 모두 만족하면 완료한 것으로 본다.

- APG에 정의된 parts, 상태, 초기 상태와 관계를 행동 계약으로 정의한다.
- 사용자 입력과 외부 사건을 event로, 전환 조건을 guard로, 상태 변화와 외부에
  알릴 결과를 transition과 effect로 표현한다.
- 모든 상태 전환, guard와 effect를 단위 테스트로 검증한다.
- Bison이 직접 연결하는 키보드, HTML과 ARIA 동작을 Vitest Browser Mode로
  검증한다.
- Focus Trap, Focus 복원과 외부 영역 비활성화처럼 DOM 생명주기가 필요한 동작은
  Bison에서 행동 계약을 검증하고, 계약을 구현하는 컴포넌트 계층에서 실제 브라우저
  동작을 검증한다.
- Core와 지원하는 각 프레임워크 어댑터가 같은 상태 및 행동 계약을 유지하는지
  검증한다.
- APG와 다르게 동작하거나 자동화할 수 없는 검증 범위가 있다면 그 이유와 한계를
  문서로 남긴다.

## APG 패턴

- [x] Accordion
- [x] Alert
- [x] Alert Dialog
- [x] Breadcrumb
- [x] Button
- [ ] Carousel
- [x] Checkbox
- [ ] Combobox
- [x] Dialog (Modal)
- [x] Disclosure
- [ ] Feed
- [ ] Grid
- [ ] Landmarks
- [ ] Link
- [ ] Listbox
- [ ] Menu and Menubar
- [ ] Menu Button
- [ ] Meter
- [ ] Radio Group
- [ ] Slider
- [ ] Slider (Multi-Thumb)
- [ ] Spinbutton
- [ ] Switch
- [ ] Table
- [ ] Tabs
- [ ] Toolbar
- [ ] Tooltip
- [ ] Tree View
- [ ] Treegrid
- [ ] Window Splitter

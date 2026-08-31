# TODO

Coral은 WAI-ARIA APG 목록을 컴포넌트 목록으로 그대로 구현하지 않는다. 실제로
반복할 UI 문제와 네이티브 HTML의 지원 범위를 먼저 확인하고, Coral이 구조나
행동을 제공할 이유가 있을 때 컴포넌트를 만든다.

컴포넌트는 다음 조건을 만족하면 완료한 것으로 본다.

- 필요한 HTML 요소와 Parts의 의미 및 관계를 정의한다.
- 네이티브 HTML이 제공하지 않는 상태와 행동만 구현한다.
- 적용 가능한 APG의 키보드, Focus와 ARIA 요구를 충족한다.
- Coral이 소유하는 DOM 생명주기 동작을 실제로 구현한다.
- Type Test와 Browser Test로 공개 계약과 사용자 결과를 검증한다.
- APG와 다르게 동작하거나 자동화할 수 없는 범위는 이유와 한계를 문서로 남긴다.

## Bison에서 이전한 패턴 검토

- [ ] Alert와 Breadcrumb가 네이티브 구조를 안전하게 재사용하게 하는 Coral
      컴포넌트가 필요한지 검토한다.
- [ ] Button과 Checkbox는 네이티브 요소의 의미, 키보드와 Form 동작을 보존하는
      범위에서 Coral의 공개 계약을 정한다.
- [ ] Disclosure와 Accordion은 구조, 펼침 상태와 ID 관계를 컴포넌트에서 직접
      완성한다.
- [ ] Dialog와 Alert Dialog는 Focus 이동·순환·복원, 외부 영역 비활성화와
      Scroll Lock을 실제 DOM 동작으로 완성한다.
- [ ] Carousel은 수동·자동 회전, Focus·Hover 일시 정지와 비순환 경계를
      컴포넌트에서 완성하되 Timer 주입 계약을 별도로 검토한다.

각 항목은 기존 Bison 구현을 완료 상태로 이전한 것이 아니다. Bison에서 확인한
접근성 조건을 Coral의 렌더링 계층에서 다시 검토하고 구현하기 위한 목록이다.

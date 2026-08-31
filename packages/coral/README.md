# Coral

Coral은 UI 패턴의 HTML 구조, 행동과 접근성을 제공하는 Headless Component
Library다. 스타일과 제품의 비즈니스 로직은 소유하지 않으며, 실제 HTML을
렌더링하는 컴포넌트와 조합 가능한 Parts를 제공한다.

## 책임 범위

- 패턴을 이루는 HTML 요소와 Parts의 의미 및 관계
- 컴포넌트에 실제로 필요한 상태와 사용자 입력에 따른 변화
- 키보드, Focus, Selection과 보조 기술에 전달할 HTML·ARIA 상태
- Focus 이동과 복원, 외부 영역 비활성화처럼 DOM 생명주기가 필요한 동작
- Controlled·Uncontrolled 사용법과 상태 변화 알림

Coral은 가능한 경우 네이티브 HTML의 의미와 동작을 우선한다. 브라우저가 이미
제공하는 동작을 별도 상태 모델로 다시 구현하지 않으며, 필요한 구조나 행동이
없는 WAI-ARIA APG 항목을 일대일 컴포넌트로 만들지 않는다. APG는 적용 가능한
패턴을 구현하고 검증하는 기준이지 Coral의 패키지 목록이 아니다.

Coral이 직접 제공한 기본 구성과 문서화된 조합의 접근성은 Coral에서 검증한다.
제품이 전달한 콘텐츠, 생략하거나 다른 요소에 적용한 Parts와 최종 화면의
접근성은 사용하는 제품이 다시 검증해야 한다.

## 구현 경계

Coral의 공개 컴포넌트는 `@coral/accordion`처럼 패턴별 패키지로 나누어 필요한
컴포넌트만 설치할 수 있게 한다. 공개 Part의 렌더링 요소와 Props를 합성하는
공통 규칙은 `@coral/core`에 두되, 각 패턴의 의미와 접근성 계약은 해당 컴포넌트
패키지가 계속 소유한다.

Bison의 Machine·Actor·Connect·Normalizer 또는 Framework Adapter를 Coral의
이름으로 옮겨 구현하지 않는다. 먼저 실제 컴포넌트 사용처에서 필요한 구조와
행동을 확인한 뒤, 렌더링과 DOM 생명주기를 소유한 컴포넌트에서 직접 구현한다.

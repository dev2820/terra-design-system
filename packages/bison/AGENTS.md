# Bison Agent Guidelines

작업하기 전에 이 디렉터리의 `README.md`를 읽고 패키지의 목적과 책임 경계를
따른다. 저장소 루트의 `AGENTS.md`도 함께 적용된다.

## 핵심 원칙

### 1. 표준적인 사용법을 따른다

Bison의 동작은 적용 가능한 HTML과 WAI-ARIA 명세를 지키고, WAI-ARIA APG
패턴을 기준으로 설계한다. 가능하면 네이티브 HTML의 의미와 동작을 우선한다.
APG와 다르게 동작해야 한다면 그 이유와 적용 범위를 문서로 남긴다.

### 2. 구현 전에 동작을 정의한다

새로운 동작을 구현하기 전에 다음 내용을 행동 계약으로 정의한다.

- 동작이 해결하는 사용자 문제와 적용 범위
- 필요한 parts의 의미와 관계
- 가능한 상태와 초기 상태
- 사용자 입력, 상태 변화와 외부에 알릴 결과
- Disabled, Focus와 Selection이 동작에 미치는 영향
- 키보드와 보조 기술 사용자가 같은 결과에 도달하는 방법

### 3. 행동의 기준은 Core 하나로 유지한다

`@bison/core`만 행동을 결정한다. React 같은 어댑터는 Core를 프레임워크의
생명주기에 연결할 뿐, 별도의 행동 규칙을 만들지 않는다.

Bison에는 동작만 구현한다. Token, Theme, Recipe, 스타일과 애니메이션 표현을
추가하지 않으며, API는 시각적 형태가 아니라 행동의 의미를 표현한다. 패턴에
필요한 parts와 그 관계는 Bison이 정의하고, 실제 HTML 렌더링은 Coral이, 두
패키지의 연결은 상위 조합 계층이 맡는다.

제품에만 필요한 행동을 공통 규칙으로 미리 포함하지 않는다. `README.md`에서
아직 결정하지 않았다고 명시한 구조도 구현 과정에서 임의로 확정하지 않는다.

## 폴더와 파일 구조

Bison은 공통 Core와 프레임워크 어댑터, 각 행동 패턴을 수평적인 패키지로
나눈다. 패턴 패키지 안에 React, Vue 같은 프레임워크 폴더를 만들지 않는다.

```text
packages/bison/
├── core/
├── react/
└── accordion/
    ├── src/
    │   ├── index.ts
    │   ├── types.ts
    │   ├── types.test.ts
    │   ├── machine.ts
    │   ├── machine.test.ts
    │   ├── connect.ts
    │   └── connect.test.ts
    ├── package.json
    ├── tsconfig.json
    └── vitest.config.ts
```

- 패턴은 `@bison/accordion`처럼 하나의 배포 패키지로 만든다.
- `src/index.ts`는 패키지의 공개 API를 조립하고 내보낸다.
- `types.ts`, `machine.ts`, `connect.ts`는 각각 계약, 상태 전이, 외부 API
  연결을 담당한다.
- 각 구현 파일의 테스트는 같은 디렉터리에 둔다. 별도의 `tests` 폴더를
  만들지 않는다.
- 패키지별 Vitest 설정은 공통 `@terra/vitest-config`를 확장하며, 기본적으로
  Playwright를 사용하는 Browser Mode에서 실행한다.

### 4. 테스트되지 않은 행동은 지원하지 않는다

공개적으로 지원하는 모든 동작은 테스트한다. 테스트는 내부 구현이나 상태
머신의 형태가 아니라 행동 계약에 적힌 사용자 결과를 검증한다.

- 상태 변화는 단위 테스트로 검증한다.
- 키보드, Focus와 HTML 기본 동작은 실제 브라우저에서 검증한다.
- Core와 각 어댑터가 같은 행동 계약을 만족하는지 검증한다.
- 버그를 수정할 때는 재발을 막는 테스트를 추가한다.
- 패턴별 테스트는 구현 파일과 같은 디렉터리에 둔다. `types`, `machine`,
  `connect`를 별도 파일로 구현하면 테스트도 각각 별도 파일로 나눈다.
- 최상위 `describe`에는 패턴 이름을 쓴다.
- 중첩 `describe`에는 `types`, `machine`, `connect`처럼 검증 대상 구현 파일의
  이름을 쓴다.
- `types.test.ts`는 `expectTypeOf`로 공개 타입 계약을 검증한다.
- `machine.test.ts`는 입력 이벤트에 따른 상태 전이를 검증한다.
- `connect.test.ts`는 `event`와 `api`를 나누어 actor로 전달되는 이벤트와
  반환되는 value, 상태, HTML·ARIA props를 검증한다.
- 실제 HTML 구조, 키보드, Focus와 접근성 트리는 렌더러 또는 어댑터 패키지의
  Browser Mode 테스트에서 검증한다. `machine`과 `connect` 테스트에서 특정
  프레임워크의 개념을 사용하지 않는다.
- `it`에는 지원하는 행동을 이해할 수 있는 한글 문장을 쓴다. HTML, ARIA 속성,
  키 이름과 API 식별자는 원래 표기를 유지한다.

스타일이나 특정 디자인 시스템의 표현은 테스트 조건으로 사용하지 않는다.

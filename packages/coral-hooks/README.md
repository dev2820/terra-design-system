# Coral Hooks 구현 가능성 검증

2026-10-27에 현재 Coral과 [실험 TODO](./TODO.md)를 기준으로 조사하고 구현했다.
이 패키지는 비공개 실험인 `@coral/hooks-experiment`다. 기존 `@coral/react`의
구현이나 공개 API를 변경하지 않는다.

## 결론

**현재 Coral의 행동을 React 훅이 소유하고, 같은 훅을 JSX Parts와 직접 작성한
HTML에서 함께 사용하는 구조는 구현할 수 있다.** Tabs, ToggleGroup, Checkbox,
Slider를 실제로 구현하고 두 API에 같은 브라우저 시나리오를 적용했다.

훅은 상태와 Props 계산 외에 Ref 등록, Focus 복구, Observer, Form reset과
pointer capture의 생명주기도 소유해야 한다. JSX Parts는 같은 훅의 결과를 Context로
공유하고 기본 HTML에 연결한다. 별도 Machine·Actor·Adapter 계층은 필요하지 않았다.

| 판정           | 확인한 범위                                                                                                                  |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| 구현 가능      | Tabs의 선택·키보드·ID 관계, ToggleGroup의 단일·다중 선택과 포커스 분리, 두 API의 공동 구현                                   |
| 조건부 가능    | Checkbox와 Slider는 실제 네이티브 입력을 유지한다. 필수 Props·Ref를 연결하고, Tabs의 항목 선언과 실제 DOM을 일치시켜야 한다. |
| 추가 검증 필요 | 나머지 컴포넌트의 실제 훅 구현, 기존 Field·Fieldset Context 통합, 전체 공개 API의 호환성, 다른 브라우저와 실제 보조 기술     |

이는 기존 Coral 전체의 이전 완료나 이전 결정이 아니다. 대표 패턴에서 확인한 결과와
나머지 코드의 조사 결과를 구분한다. 선택의 배경은 [Question.md](./Question.md)에 있다.

## 구현 구조와 두 사용 방식

```text
useTabs / useToggleGroup / useCheckbox / useSlider
  ├─ 상태 · Props getter · Ref · DOM 생명주기
  ├─ 사용처의 HTML에 직접 연결
  └─ JSX Root의 Context → Parts → 기본 HTML에 연결
```

Tabs의 훅 직접 사용 예제다. 항목의 `value`만 연결하면 기본 ID와 참조를 생성한다.
`items`와 실제 Tab·Panel을 같은 데이터로 렌더링한다.

```tsx
import { useTabs } from "@coral/hooks-experiment";

const items = [{ value: "account" }, { value: "security" }];

function AccountTabs() {
  const tabs = useTabs({ items, defaultValue: "account" });
  return (
    <section {...tabs.getRootProps()}>
      <div {...tabs.getListProps({ "aria-label": "계정 설정" })}>
        {items.map(({ value }) => (
          <button key={value} {...tabs.getTabProps(value)}>
            {value}
          </button>
        ))}
      </div>
      {items.map(({ value }) => (
        <div key={value} {...tabs.getPanelProps(value)}>
          {value} 설정
        </div>
      ))}
    </section>
  );
}
```

같은 행동을 사용하는 JSX Parts 예제다.

```tsx
import { Tabs } from "@coral/hooks-experiment";

<Tabs.Root items={items} defaultValue="account" render={<section />}>
  <Tabs.List aria-label="계정 설정">
    {items.map(({ value }) => (
      <Tabs.Tab key={value} value={value}>
        {value}
      </Tabs.Tab>
    ))}
  </Tabs.List>
  {items.map(({ value }) => (
    <Tabs.Panel key={value} value={value}>
      {value} 설정
    </Tabs.Panel>
  ))}
</Tabs.Root>;
```

Checkbox도 같은 방식으로 네이티브 입력에 연결한다. `getHiddenInputProps()` 또는
`Checkbox.HiddenInput`을 쓰면 입력을 시각적으로만 숨기고, `Control`은 별도의
비대화형 시각 요소로 구성한다. Input과 HiddenInput 중 하나만 사용한다.

```tsx
function Notifications() {
  const checkbox = useCheckbox({ name: "notifications", defaultChecked: true });
  return (
    <>
      <input {...checkbox.getInputProps()} />
      <label {...checkbox.getLabelProps()}>알림</label>
    </>
  );
}

<Checkbox.Root name="notifications" defaultChecked>
  <Checkbox.Input />
  <Checkbox.Label>알림</Checkbox.Label>
</Checkbox.Root>;
```

네 패턴 모두의 훅·Parts 예제는 [examples/patterns.tsx](./examples/patterns.tsx)에 있다.
실행 화면은 [examples/main.tsx](./examples/main.tsx)이며 네이티브 입력과 시각 Part를
사용하는 입력을 함께 제공한다. 예제의 크기와 테두리는 입력 검증을 위한 표시다.

## API와 사용처의 책임

| 훅             | 반환하는 주요 getter                                                                                                                                    | 상태 계약                                                                                                                |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| useTabs        | getRootProps, getListProps, getTabProps(value, props), getPanelProps(value, props)                                                                      | value/defaultValue는 string 또는 null, 기본 선택은 null이다.                                                             |
| useToggleGroup | getRootProps, getItemProps(value, props)                                                                                                                | 문자열 배열, 기본값 [], multiple 기본값 false, 단일 선택에서 다시 누르면 해제한다.                                       |
| useCheckbox    | getRootProps, getLabelProps, getControlProps, getInputProps, getHiddenInputProps                                                                        | checked/defaultChecked, 별도의 indeterminate, readOnly·disabled·required를 지원한다.                                     |
| useSlider      | getRootProps, getLabelProps(index, props), getControlProps, getThumbProps(index, props), getInputProps(index, props), getHiddenInputProps(index, props) | 숫자 배열, min/max/step 기본값 0/100/1, 기본값은 중간값 하나다. 값은 정렬·범위 제한·step 보정하며 인접 값을 넘지 않는다. |

- `value` 또는 `checked`가 undefined이면 비제어 상태다. 초기값은 최초 렌더링에서
  정한다. 비제어 Form reset은 최초 초기값을 복원하고 제어 상태는 현재 값을 유지한다.
- 변경 알림은 다음 값과 `details`를 전달한다. `details`에는 native event, reason,
  isCanceled와 동기적인 cancel()이 있다. Slider에는 index도 있다. cancel()은 내부
  갱신을 막는다. 부모가 제어 값을 갱신하는 경우에는 부모가 최종 값을 소유한다.
- 사용자 Props는 getter의 인자로 전달한다. 사용자 이벤트가 먼저 실행되며
  preventDefault()는 내부 선택·포커스 이동·값 변경을 막는다. 이벤트를 감시하고
  정리하는 내부 처리는 계속 실행할 수 있다.
- getter는 필수 id, role, 상태, 입력 type과 내부 이벤트를 소유한다. 객체 Ref와
  콜백 Ref를 합성하고 React 19의 Ref cleanup을 호출한다. 사용자 style은 우선한다.
  기능에 필요한 위치·touch-action·시각 숨김 스타일을 바꾸면 사용처가 동작을 검증해야 한다.
- getter 결과 뒤에서 이벤트·Ref·필수 속성을 덮어쓰거나 사용자 컴포넌트가 이를 DOM에
  전달하지 않으면 동작을 보장할 수 없다. 필수 속성의 타입까지 제거한 완성된 공개 API는
  이번 실험의 범위가 아니다.
- 각 컴포넌트와 입력에는 보이는 Label이나 적절한 aria-label/aria-labelledby로 이름을
  제공한다. HiddenInput은 실제 접근 가능한 입력 하나다. 시각 Control은 별도 Tab 정지점이나
  동일한 role을 갖지 않는다. 제품은 시각 요소에 입력의 focus-visible 표시를 연결해야 한다.

### 지원 요소와 네이티브 동작의 경계

| Part                                  | 지원 요소와 이유                                                                                                                     |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Tabs.Tab, ToggleGroup.Item            | button을 유지한다. 네이티브 Enter/Space 클릭, Focus, disabled와 fieldset 전파를 사용한다.                                            |
| Checkbox.Input/HiddenInput            | input type=checkbox를 유지한다. checked·mixed, Label, required, FormData와 disabled 전파의 기준이다.                                 |
| Slider.Input/HiddenInput              | input type=range를 유지한다. 키보드, 값·범위, Label, FormData와 disabled 전파를 사용한다.                                            |
| Checkbox.Label, Slider.Label          | label과 htmlFor를 유지한다. getter가 생성한 입력 ID를 참조한다.                                                                      |
| Root, List, Panel, 시각 Control·Thumb | 비대화형 기본 요소에 Props를 연결한다. JSX의 render 합성과 직접 HTML 구성을 지원하되 해당 요소가 role과 콘텐츠 모델을 허용해야 한다. |

`div role=button`에 Enter/Space를 입력해도 네이티브 클릭이 생성되지 않는 것을
브라우저에서 비교했다. role만 부여한 checkbox·slider도 Form 값이 생기지 않는다.
입력이 없는 커스텀 checkbox·slider와 div 버튼은 지원하지 않는다. 일반 button에는
추가 상태나 행동이 필요하지 않아 `useButton`을 만들지 않았다.

Checkbox는 checked와 indeterminate를 독립적으로 유지한다. mixed 상태에서도 제출 여부는
checked가 정한다. readOnly는 Focus와 Form 참여를 유지하면서 편집을 막는다.
Slider의 required는 제공하지 않는다. range 입력에는 required가 적용되지 않는다.
Tabs·ToggleGroup의 선택값은 FormData나 reset에 자동 연결하지 않는다. ToggleGroup
Item의 명시적인 submit/reset type과 name은 네이티브 버튼 동작을 유지한다.

Slider.Control은 포인터 좌표, 가장 가까운 값 선택, 인접 값 제한, RTL·수직 방향,
thumb 중심의 오프셋과 pointer capture를 처리한다. 키보드와 접근성은 실제 range 입력이
담당한다. 시각 Thumb은 입력을 대체하지 않는다. 입력의 index와 시각·DOM 순서를 유지한다.

### ID와 SSR

- Tabs의 items는 Root가 Tab·Panel의 존재와 ID를 서버에서 알게 하는 계약이다.
  기본 id는 useId()와 value로 생성한다. Root id 또는 항목의 tabId/panelId로 재정의한다.
  value와 ID는 인스턴스 안에서 고유해야 하며 명시적 ID는 문서 전체에서 고유해야 한다.
- Panel을 렌더링하지 않으면 해당 항목에 panel: false를 지정한다. 조건부 Panel과 Tab의
  등장·제거를 items에도 반영한다. 서버에서 임의의 자식 트리의 실제 존재를 자동으로 찾지 않는다.
  선언과 DOM이 다르면 존재하지 않는 ID 참조가 생길 수 있다.
- 기본 Tab·Panel 참조와 Checkbox·Slider의 htmlFor는 서버 HTML부터 존재한다. Label을
  생략해도 입력은 Label의 ID를 추측해 참조하지 않는다. 이때 입력에 별도의 이름을 제공한다.
- 시각 Slider Thumb의 RTL 위치는 Control Ref 연결 후 실제 direction을 읽어 완성한다.
- Checkbox의 indeterminate는 HTML 속성이 아닌 DOM property이므로 Ref 연결 후 적용한다.
  서버 HTML에 mixed 표현이 완성되었다고 보장하지 않는다.
- Tabs는 items로 정한 진입 대상 하나를 서버 HTML부터 제공한다. CSS 숨김·inert·상위
  disabled fieldset의 실제 사용 가능성은 DOM에서 다시 판단한다. ToggleGroup의 단일
  Tab 정지점은 Ref 연결 후 정리된다. 서버에서는 각 네이티브 버튼이 Tab 순서에 들어간다.
- ID 안정성과 서버 HTML의 참조 완성은 별개의 검증 항목이다. Meter·Progress의 기존
  명시적 이름 연결 결정은 이번 실험에서 변경하지 않았다.

### DOM 생명주기에서 확인한 차이

초기 구현은 Root의 Effect로 Input과 List를 처리했다. Root의 렌더링 없이 자식이
입력을 조건부로 추가하면 mixed와 reset 연결이 누락되었고, List 요소를 교체하면
새 목록에 Observer가 연결되지 않았다. 이 세 실패를 임시 브라우저 검사로 재현했다.

최종 구현은 Input Ref의 등록·해제에서 Form listener를 연결하고, List Ref에서
MutationObserver·ResizeObserver를 연결·정리한다. Root Effect는 현재 상태를
동기화한다. Slider도 Control Ref 해제 시 진행 중인 pointer capture를 정리한다.
Parts를 언제 렌더링하는지와 훅을 언제 실행하는지는 다를 수 있으므로 이 경계가 필요하다.

## 기존 Coral 전체 조사

이 표의 나머지 컴포넌트 판정은 소스 조사다. 대표 네 패턴 이외의 훅 구현과 사용자
동작을 검증 완료로 표시하지 않는다. 근거는 각 컴포넌트의 src와 README다.

| 기존 컴포넌트 | 네이티브 HTML의 책임                                        | Coral의 책임                              | Ref·DOM 생명주기                                          | 훅 적용 판단                                                                 |
| ------------- | ----------------------------------------------------------- | ----------------------------------------- | --------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Tabs          | button 활성화·disabled, hidden 패널                         | 선택·ID·자동/수동 활성화·roving focus     | 실제 순서·가시성·포커스 복구·Observer                     | 대표 구현으로 확인했다. items 계약을 추가했다.                               |
| ToggleGroup   | button 활성화·disabled                                      | 단일/다중 선택·취소·포커스 이동           | DOM 순서·가시성·포커스 복구                               | 대표 구현으로 확인했다.                                                      |
| Checkbox      | checkbox·label·Form·fieldset                                | 제어 상태·mixed·readOnly·취소·시각 Parts  | indeterminate·reset·Field 연결                            | 입력을 유지하는 범위를 확인했다. Field 통합은 남았다.                        |
| Slider        | range 키보드·Form·label                                     | 다중 값·범위·custom drag·시각 Parts       | 입력/트랙 Ref·pointer capture·reset                       | 대표 범위를 확인했다. 기존 모든 Parts와 Field 통합은 남았다.                 |
| Toggle        | button 활성화·disabled                                      | pressed·취소·aria-pressed                 | 이벤트의 실제 button 확인                                 | ToggleGroup으로 핵심 방식을 확인했다. 독립 API 이전은 미검증이다.            |
| Switch        | checkbox·label·Form                                         | switch 의미·제어 상태·readOnly·시각 Parts | reset·Field 제어 연결                                     | Checkbox와 같은 형태로 추출 가능해 보인다. 미구현이다.                       |
| CheckboxGroup | fieldset·legend·각 checkbox                                 | 배열 선택·부모 Context                    | Form reset·checkbox 등록                                  | 그룹/항목 훅의 공유 Context와 reset 검증이 필요하다.                         |
| RadioGroup    | radio 이름 그룹·방향키·label·Form                           | 제어 값·취소·Parts                        | input.checked 동기화·reset                                | 네이티브 radio를 유지해야 한다. 그룹 이름 충돌과 생명주기는 미검증이다.      |
| Collapsible   | button·hidden, 단순 용도는 details/summary                  | 제어 open·취소·Trigger/Panel ID           | 기존 구현의 주요 처리는 React 상태다.                     | 추출 가능해 보인다. SSR 존재 계약은 별도 결정이 필요하다.                    |
| Accordion     | button·heading·hidden                                       | 단일/다중 open·Item 관계·region           | 기존 구현의 주요 처리는 상태와 Context다.                 | Item 훅/Context로 추출 가능해 보인다. 중첩·ID는 미검증이다.                  |
| Fieldset      | fieldset·legend·disabled와 첫 legend 예외                   | Field에 disabled Context 전달             | 직접 DOM 측정은 없다.                                     | 훅 단독의 실익은 작다. 네이티브 구조와 Context 유지가 필요하다.              |
| Input         | input 편집·선택·유효성·Form                                 | Field.Control 합성                        | Field의 control Ref에 의존한다.                           | 네이티브 Props만으로 대부분 충분하다. Field 훅 계약에 종속된다.              |
| Field         | input validity·label·Form                                   | ID 등록·dirty/touched·오류·비동기 검증    | control/label/description/error Ref·submit listener·timer | 조건부 추출은 가능해 보인다. 비동기 검증과 동적 Part의 통합 실험이 필요하다. |
| NumberInput   | number 편집·stepUp/stepDown·Form                            | 빈 값·취소·증감 버튼·Home/End             | input Ref·focus·reset·Field 연결                          | 입력과 버튼의 공동 Ref·편집 중 문자열 보존을 실험해야 한다.                  |
| OtpField      | text 입력·IME·selection·Form 보조 input                     | 정규화·paste 분배·자리 포커스·완성 값     | 여러 input Ref·composition·reset·ID                       | 추가 구현 검증이 필요하다. 단순 getter 가능성만으로 완료로 볼 수 없다.       |
| Avatar        | img 로딩·alt                                                | preload·fallback·delay                    | Image 이벤트·완료 상태·timer 정리                         | 로딩 훅으로 추출 가능해 보인다. 캐시·Strict Mode·SSR은 미검증이다.           |
| ScrollArea    | overflow 스크롤·휠·터치·키보드                              | 측정·커스텀 scrollbar·thumb·corner        | ResizeObserver·scroll/wheel listener·pointer capture·RAF  | DOM 훅이 적합해 보인다. 기존 복잡한 측정·RTL·정리는 별도 검증이 필요하다.    |
| Meter         | 네이티브 meter도 존재하나 현재는 div role=meter다.          | 범위·포맷·값과 시각 Parts                 | 주요 계산은 DOM에 의존하지 않는다.                        | 순수 계산/getter로 추출할 수 있어 보인다. 훅의 필요성과 API는 미결정이다.    |
| Progress      | 네이티브 progress도 존재하나 현재는 div role=progressbar다. | 확정/불확정·포맷·값과 시각 Parts          | 주요 계산은 DOM에 의존하지 않는다.                        | Meter와 같은 판단이다. 기존 이름 연결 정책을 유지해야 한다.                  |
| Separator     | hr의 의미                                                   | 방향·장식 여부                            | 없다.                                                     | 순수 Props 함수로도 충분하다. 별도 훅을 만들 실익은 작다.                    |

기존 Coral에 적용하려면 패턴별로 Root 상태와 Part의 실제 DOM 처리를 훅으로 추출하고,
현재 Parts가 이를 사용하도록 바꾸어야 한다. Field/Fieldset의 내부 Context 계약,
기존 render와 공개 타입의 호환성, ID 존재 선언 방식은 추가 결정이 필요하다.
기존의 복잡한 컴포넌트를 실험 패키지의 getter 형태에 일괄적으로 맞추는 결론은 내리지 않았다.
아직 Coral에 구현하지 않은 Dialog·Popover·메뉴 계열도 이번 검증에 포함하지 않았다.

## 검증 결과와 재현

실행 환경은 Node 24.16.0, React 19.2.8, Vitest 4.1.10, Playwright 1.62.1,
Chromium 151.0.7922.34다. 저장소에는 Node 22.22.1 이상이 필요하다.

| 검사                     | 결과와 범위                                                                                                                                                                                   |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 임시 Vitest Browser 검사 | 55/55 통과했다. 훅/Parts에 각각 26개와 공통 3개 시나리오를 적용했다.                                                                                                                          |
| Tabs                     | manual/automatic, Enter/Space, Home/End, 방향키, horizontal/vertical·RTL·loop, disabled 건너뛰기, Panel 표시, 재진입, 취소·제어 값, 동적 제거와 중첩을 확인했다.                              |
| ToggleGroup              | 단일/다중 선택, 선택과 포커스 분리, 취소·제어 값, disabled, 실제 DOM 순서 변경과 포커스 복구를 확인했다.                                                                                      |
| Checkbox                 | 네이티브/시각 Control 양쪽의 Label·Space·mixed, required에 의한 제출 차단, FormData·실제 submit·reset·reset 취소·외부 form·readOnly·fieldset/legend를 확인했다.                               |
| Slider                   | 네이티브/시각 Thumb 양쪽의 키보드, step·인접 값·다중 값·Form, custom pointer press/drag, 수직·RTL, 취소·제어 값·readOnly·fieldset을 확인했다.                                                 |
| SSR/hydration·생명주기   | 서버 ID 참조, 사용자 ID, Panel 생략/조건 변경, 다중 인스턴스, hydration recoverable error 0건, Strict Mode, Ref cleanup, 조건부 Input과 List 교체를 확인했다.                                 |
| axe-core                 | 두 API의 기본 조합 각각 위반 0건이었다. 이름·role·상태와 ID 연결의 자동 검사를 포함했다.                                                                                                      |
| 터치 에뮬레이션          | 10/10 통과했다. 두 API 각각 네이티브/시각 Checkbox Label 탭, 네이티브 range 탭, 다중 Slider press/drag/capture 정리, touchCancel을 확인했다. Chromium의 터치 컨텍스트와 CDP Input을 사용했다. |
| Slider 위치 검증         | 훅/Parts × 수평/수직 × LTR/RTL의 8개 조합에서 Thumb 위치 16개와 포인터 값 8개 검사를 통과했다.                                                                                                |
| 타입 검사·빌드·lint      | 실험 패키지의 typecheck·tsdown 빌드·oxlint를 통과했다. 빌드된 ESM의 use client 지시문과 선언 파일도 확인했다.                                                                                 |
| 기존 Coral 회귀 검사     | 28개 파일에서 468개 통과, 기존 4개 건너뛰기였다. 기존 Coral의 typecheck와 빌드도 통과했다.                                                                                                    |

초기 실패도 확인했다. 공유 포인터 표시를 이전 Tab의 blur가 지워 선택 콜백이
중복되는 문제를 수정했다. 예제의 article role=tabpanel은 axe가 거부하여 div로
수정했다. 위 DOM 생명주기 세 실패도 수정 후 통과했다.

일반 환경에서는 저장소 루트에서 다음 명령으로 실행한다.

```sh
pnpm install
pnpm --filter @coral/hooks-experiment typecheck
pnpm --filter @coral/hooks-experiment build
pnpm --filter @coral/hooks-experiment dev
```

이번 환경의 기본 Node는 20이어서 설치된 Node 24를 PATH로 선택했다. 기존
node_modules를 재설치하지 않도록 pnpm의 자동 설치 확인을 끄고 설치되어 있던 같은
버전의 의존성을 연결했다. lockfile은 `pnpm install --lockfile-only --offline
--ignore-scripts`로 새 패키지 importer만 추가했다. 새 외부 의존성은 없다.

실제로 사용한 명령 형태는 다음과 같다.

```sh
PATH=/Users/yang-gijo/.nvm/versions/node/v24.16.0/bin:$PATH \
  pnpm --config.verify-deps-before-run=false --filter @coral/hooks-experiment typecheck
PATH=/Users/yang-gijo/.nvm/versions/node/v24.16.0/bin:$PATH \
  pnpm --config.verify-deps-before-run=false --filter @coral/hooks-experiment build
```

검증에 만든 `src/experiment.test.tsx`, 터치 스크립트와 위치 검증용 예제·스크립트는 저장소의 테스트 보존
규칙에 따라 검증 후 삭제했다. 브라우저 검증 설정인 vitest.config.ts는 남겼다.
같은 검사를 자동화하려면 위 결과 표의 시나리오를 임시 `src/*.test.tsx`에 작성하고
`pnpm --filter @coral/hooks-experiment exec vitest run`으로 실행한다. 현재 상태에는
보존한 테스트가 없으므로 이 명령만 실행해서 55개 결과를 재생할 수는 없다.

수동 재현은 dev 화면에서 다음 순서로 진행한다.

1. hooks와 parts의 Tabs에 Tab으로 진입하고 방향키·Home/End·Enter/Space로 Focus와
   Panel을 비교한다. disabled b를 건너뛰는지 확인한다.
2. ToggleGroup에서 방향키로 이동할 때 선택이 바뀌지 않고 Space로만 선택되는지 확인한다.
3. Checkbox의 Label 클릭과 Space, Form 초기화 후 checked·mixed를 비교한다.
4. 각 Slider의 Label을 눌러 키보드로 값을 바꾸고, 시각 Slider의 트랙과 Thumb을
   마우스 또는 터치 에뮬레이션으로 조작한다. 두 값이 서로 넘지 않는지 확인한다.
5. examples/patterns.tsx의 옵션을 manual·vertical·RTL·controlled 및 조건부 items로
   바꾸고 같은 흐름을 반복한다. SSR은 renderToString과 hydrateRoot로 같은 트리를 연결한다.

실제 스크린 리더 발화, 실제 터치 기기와 터치 보조 기술, Firefox·Safari, streaming SSR,
React Server Components 및 기존 모든 Part와의 호환성은 검증하지 않았다. axe 통과와
브라우저 입력 검사는 이 범위의 검증을 대신하지 않는다.

## 명세 근거

- [WHATWG button](https://html.spec.whatwg.org/multipage/form-elements.html#the-button-element): 콘텐츠 모델·활성화·type·Form의 기준이다.
- [WHATWG checkbox](<https://html.spec.whatwg.org/multipage/input.html#checkbox-state-(type=checkbox)>): checked와 indeterminate, required의 기준이다.
- [WHATWG range](<https://html.spec.whatwg.org/multipage/input.html#range-state-(type=range)>): 값 보정, 범위·step과 적용 가능한 속성의 기준이다.
- [WHATWG label](https://html.spec.whatwg.org/multipage/forms.html#the-label-element): 입력의 이름과 활성화 연결의 기준이다.
- [WHATWG disabled](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#enabling-and-disabling-form-controls:-the-disabled-attribute): fieldset과 첫 legend 예외의 기준이다.
- [APG Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/), [Checkbox](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/), [Button](https://www.w3.org/WAI/ARIA/apg/patterns/button/): 각 패턴의 키보드·상태·ID 계약의 기준이다.
- [APG Slider](https://www.w3.org/WAI/ARIA/apg/patterns/slider/), [Multi-thumb Slider](https://www.w3.org/WAI/ARIA/apg/patterns/slider-multithumb/): 범위와 각 Thumb의 포커스·상태 계약의 기준이다.
- [APG roving tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex), [WAI-ARIA group](https://www.w3.org/TR/wai-aria-1.2/#group): 그룹의 의미와 Coral이 추가하는 포커스 이동을 구분하는 기준이다.
- [React useId](https://react.dev/reference/react/useId), [React input](https://react.dev/reference/react-dom/components/input): SSR ID와 제어 입력 연결의 기준이다.

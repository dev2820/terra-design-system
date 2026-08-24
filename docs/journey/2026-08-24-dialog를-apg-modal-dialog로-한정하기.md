# 2026-08-24 — Dialog를 APG Modal Dialog로 한정하기

## 문제

HTML의 `<dialog>` 요소는 Modal과 Non-modal 방식으로 모두 사용할 수 있다. 반면
Bison이 구현 기준으로 삼은 WAI-ARIA APG의 패턴 이름은
[Dialog (Modal)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)이며,
외부 콘텐츠를 조작할 수 없게 하고 Dialog 안에 Focus를 가두는 Modal 동작을
설명한다. Bison의 `dialog`가 HTML 요소처럼 두 방식을 모두 나타낼지, APG가
정의한 Modal 패턴만 나타낼지 경계를 정해야 했다.

Dialog에 `modal` 옵션을 추가하면 하나의 패키지로 두 방식을 지원할 수 있지만,
옵션에 따라 `aria-modal`, Focus와 외부 영역의 계약이 크게 달라진다. APG에
독립된 Non-modal Dialog 패턴이 없는 상태에서 Bison이 그 규칙을 별도로 정하면
APG 패턴 구현이라는 프로젝트 범위를 넘어설 수도 있었다.

Alert Dialog와 Modal을 별도 패턴으로 어떻게 배치할지도 함께 정리할 필요가
있었다. 상태의 열기와 닫기만 보면 서로 비슷하지만, Alert Dialog는 짧고 중요한
메시지에 사용되는 별도의 `alertdialog` Role과 사용 목적을 가진다. 단순히 모든
Modal을 Alert Dialog로 취급할 수는 없다.

## 접근 방식

첫 번째 방법은 `@bison/dialog`를 일반적인 기반 패턴으로 만들고 `modal`을 선택적
옵션으로 두는 것이었다. HTML의 `<dialog>`와 비슷하고 유연하지만 하나의 패턴이
서로 다른 접근성 계약 두 개를 소유하게 된다. `modal: false`의 전체 동작 기준도
Bison이 별도로 만들어야 한다.

두 번째 방법은 Dialog, Modal과 Alert Dialog를 각각 공개 패턴으로 두는 것이었다.
그러나 Modal은 그 자체로 ARIA Role이 아니라 외부 상호작용과 Focus를 제한하는
동작 방식이다. Role이 정해지지 않은 Modal을 APG 패턴과 같은 층에 두면 Bison의
공개 단위가 다시 혼합된다.

Dialog를 기반으로 Modal과 Alert Dialog가 파생되는 구조도 검토했다. Machine
계층의 상태 재사용에는 적합하지만, 공개 패턴 계층에서는 APG가 이미 Dialog
(Modal)과 Alert Dialog를 별개의 목적과 Role로 설명한다. 내부 상태의 유사성이
공개 패턴의 이름과 범위를 결정할 이유는 아니었다.

## 해결

`@bison/dialog`는 WAI-ARIA APG의 Dialog (Modal) 패턴만 의미한다. 별도의 `modal`
옵션을 두지 않으며, 활성화된 Dialog는 `role="dialog"`와 `aria-modal="true"`를
가지고 Focus를 내부에 유지하며 외부 콘텐츠를 비활성화해야 한다. Bison의 TODO와
공개 명칭도 일반 Dialog나 별도 Modal이 아니라 `Dialog (Modal)`로 유지한다.

Alert Dialog는 `alertdialog`라는 별도의 의미와 사용 목적을 가진 APG 패턴으로
따로 구현한다. 열기와 닫기 같은 Machine을 재사용할 수 있더라도 Dialog의 Role만
바꾸는 옵션으로 취급하지 않는다.

Non-modal Dialog는 현재 Bison의 공개 APG 패턴 범위에 넣지 않는다. 필요한
사용처는 `@bison/core`의 Dismissable 같은 저수준 머신에 적절한 Role과 구조를
컴포넌트 계층에서 조합할 수 있지만, 그 결과의 접근성을 정의하고 검증하는 책임은
해당 사용처에 있다. 이 선택은 HTML `<dialog>`의 모든 사용법을 복제하기보다
Bison이 근거로 삼은 APG 패턴의 경계를 분명히 한다.

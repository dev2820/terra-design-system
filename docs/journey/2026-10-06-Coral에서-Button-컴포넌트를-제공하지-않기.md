# 2026-10-06 — Coral에서 Button 컴포넌트를 제공하지 않기

## 문제

Coral에 Button을 구현하면서 먼저 네이티브 `<button>`의 Props와 Ref를 그대로
전달하는 얇은 컴포넌트를 만들었다. 스타일과 별도 상태를 추가하지 않았고,
`type`을 생략했을 때의 제출 동작도 HTML의 기본 계약을 유지했다. 그러나 이
구현을 확인하자 Button이 컴포넌트로서 추가로 제공하는 것이 무엇인지가 문제가
되었다. 버튼의 의미, 키보드 활성화, Focus, Disabled와 Form 동작은 이미
[네이티브 요소](https://html.spec.whatwg.org/multipage/form-elements.html#the-button-element)가
제공하고 있었다.

사용자는 Button에 `useRender`를 적용하는 방안을 제안했다. 사용자 컴포넌트와
합성할 수 있게 하면 Button에도 역할이 생길 수 있으므로, 렌더링 합성의 필요성과
독립적인 Button 컴포넌트의 필요성을 함께 검토해야 했다.

## 접근 방식

첫 번째 방법은 네이티브 Props와 Ref만 전달하는 Button을 그대로 제공하는
것이었다. Coral의 다른 컴포넌트와 같은 패키지에서 가져올 수 있지만, 실제
동작과 사용 결과는 `<button>`을 직접 쓰는 것과 같았다. Coral이 더 안전하게
완성하는 구조나 행동이 없으므로 별도의 공개 컴포넌트를 유지할 근거가 약했다.

두 번째 방법은 `useRender`를 사용하고 `render` 또는 `asChild`로 사용자 버튼과
합성할 수 있게 하는 것이었다. 사용자가 이미 운용하는 버튼의 스타일과 API를
유지하면서 Props, 이벤트와 Ref를 하나의 DOM 요소에 합성할 수 있다는 이점은
있었다. 다만 현재 Coral Button에는 합성할 고유 동작이 없었다. 사용자는 자신의
버튼에 Props와 Ref를 직접 전달해도 대부분 같은 결과를 얻을 수 있으므로, 합성
기능만으로 일반 Button의 필요성이 충분히 설명되지는 않았다.

반면 Dialog.Trigger나 Accordion.Trigger 같은 Part는 패턴의 상태 변화와 ARIA
연결을 소유한다. 이런 Part의 `render`는 사용자 버튼에 실제 패턴 동작을
결합한다. 따라서 [사용자 컴포넌트와의 합성에 관한 기존 결정](./2026-10-03-사용자-컴포넌트와의-합성을-위해-render를-제공하기.md)은
계속 의미가 있지만, 그 합성을 위해 독립적인 Coral Button도 있어야 하는 것은
아니었다.

세 번째 방법은 플레인한 Button을 공통 기반으로 두고 각 Trigger가 내부에서
이를 가져다 쓰는 것이었다. 그러나 Trigger는 Core의 `useRender`에서 기본
`<button>`을 렌더링하고 자신의 Props와 동작을 합성할 수 있었다. 일반 버튼은
네이티브의 제출 기본 동작을 유지할 수 있고, 다이얼로그를 여는 Trigger는 보통
`type="button"`을 기본으로 두는 등 각 Part의 계약도 따로 정해야 한다. 얇은
Button을 중간에 두는 구조는 이 책임을 줄여주지 않았다.

다른 라이브러리도 확인했다. Ark UI의
[공개 컴포넌트 목록](https://github.com/chakra-ui/ark/blob/main/packages/react/src/components/index.ts)에는
독립적인 Button이 없으며, 공통 요소 합성은
[`ark` factory](https://ark-ui.com/docs/guides/composition)에서 제공한다.
이 사례는 일반 Button 없이도 패턴의 Trigger와 공통 합성 기능을 제공할 수 있음을
보여주었다. 최종 판단은 현재 Coral Button이 네이티브 요소에 더해 소유할 계약이
없다는 점에 근거했다.

## 해결

Coral은 현재 별도의 Button 컴포넌트를 제공하지 않는다. 일반 버튼은 네이티브
`<button>`이나 제품이 운용하는 버튼 컴포넌트를 사용한다. Coral은 각 패턴의
Trigger에서 필요한 상태 변화와 ARIA 관계를 제공하고, 사용자 컴포넌트와의
합성은 해당 Part의 계약에 따라 지원한다.

이에 따라 이번에 추가한 Button 구현, 테스트, 공개 export와 빌드 진입점을
제거했다. 컴포넌트 목록에는 네이티브 `<button>`으로 충분하다는 검토 결과를
남겼다. 이 선택은 렌더링 합성의 유용성과 독립 컴포넌트의 필요성을 구분한
결과다. 합성 가능한 API나 다른 라이브러리의 Button 존재만으로 컴포넌트를
추가하지 않고, Coral이 실제로 더 제공할 구조나 행동을 근거로 판단한다.

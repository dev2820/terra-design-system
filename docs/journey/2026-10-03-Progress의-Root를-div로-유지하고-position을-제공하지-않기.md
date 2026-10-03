# 2026-10-03 — Progress의 Root를 div로 유지하고 position을 제공하지 않기

## 문제

Coral Progress의 Root는 실제 DOM에서 `div`를 렌더링하고 `role="progressbar"`를 부여한다. 이에 따라 Root의 ref가 네이티브 `HTMLProgressElement`처럼 `position`을 제공해야 하는지 논의했다. 네이티브 `<progress>`에 익숙한 사용자는 `ref.current.position`으로 현재 진행 비율을 읽을 수 있다고 기대할 수 있다.

그러나 접근성 역할을 나타내는 ARIA role과 실제 DOM 요소의 인터페이스는 서로 다르다. `div`에 `role="progressbar"`를 지정해도 해당 요소가 `HTMLProgressElement`가 되지는 않는다. ref의 타입과 런타임 동작을 어디까지 네이티브 요소와 맞출지 경계가 필요했다.

## 접근 방식

한 가지 방법은 `useImperativeHandle` 등으로 ref에 `position`을 추가해 네이티브 API 일부를 흉내 내는 것이었다. 현재 비율을 읽는 사용법은 제공할 수 있지만, ref가 실제 DOM 요소만을 가리킨다는 기대에서 벗어나거나 실제 `div`에는 없는 속성을 Coral이 별도로 유지해야 한다.

다른 방법은 Root의 실제 요소를 `<progress>`로 바꾸어 네이티브 인터페이스를 얻는 것이었다. 이는 공개된 Root와 Part의 DOM 구조까지 바꾸는 선택이다. 논의 중인 핵심은 현재의 `div` Root가 네이티브 요소의 IDL 속성까지 약속해야 하는지였으며, ARIA role만으로 그 약속이 생기지는 않는다는 점을 확인했다.

## 해결

Progress Root는 실제 `HTMLDivElement`를 렌더링하고 ref도 그 요소를 가리킨다. `role="progressbar"`는 접근성 의미를 제공하지만 네이티브 `<progress>`의 DOM API까지 제공한다는 뜻으로 해석하지 않는다. 따라서 `position`을 별도로 구현하거나 ref에 추가하지 않는다.

이 경계를 통해 사용자는 ref에서 실제 `div`의 속성과 메서드를 예측할 수 있다. 현재 진행 비율의 시각적 표현과 접근성 값은 Progress의 공개 Prop과 ARIA 계약에 맡긴다. 자세한 DOM 계약은 [Progress 문서](../../packages/coral/src/progress/README.md)에 둔다.

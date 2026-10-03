# 2026-10-03 — Progress의 불확정 상태를 value 부재로 표현하기

## 문제

Progress는 완료 정도를 알 수 있는 상태와 알 수 없는 상태를 모두 표현해야 한다. 처음에는 Checkbox의 `indeterminate`처럼 별도 Prop으로 불확정 상태를 지정하는 방안도 검토했다. 그러나 Progress에는 이미 현재 값을 나타내는 `value`가 있다. 두 Prop을 함께 제공하면 값이 존재하면서 불확정 상태라고 지정하는 조합의 의미와 우선순위를 추가로 정해야 한다.

값이 없는 경우와 잘못된 값이 들어온 경우도 구분할 필요가 있었다. TypeScript의 공개 타입과 달리 런타임에는 `null`, 숫자가 아닌 값 또는 유한하지 않은 숫자가 전달될 수 있다. 이를 모두 불확정 상태로 취급하면 값의 부재와 잘못된 입력이 같은 상태로 합쳐진다.

## 접근 방식

[HTML Progress 명세](https://html.spec.whatwg.org/multipage/form-elements.html#the-progress-element)에 따르면 네이티브 `<progress>`는 `value` 속성을 제거하면 불확정 상태가 된다. 이 관계를 따라 값의 부재 자체로 상태를 결정하면 별도 `indeterminate` Prop이 필요하지 않다. 다만 React Prop에서 값의 부재를 `null`과 `undefined` 모두로 해석할지, `undefined`로 한정할지 결정해야 했다.

논의에서는 공개 타입에서 허용하는 `undefined`를 값의 부재로 삼고, 그 밖의 잘못된 런타임 값은 확정 상태의 `0`으로 처리하기로 했다. 이렇게 하면 호출자가 의도적으로 값을 생략한 경우와 유효하지 않은 값을 전달한 경우를 구분할 수 있다. 별도 Boolean Prop을 두는 방식은 같은 상태를 두 입력 경로로 표현하게 되므로 제외했다.

## 해결

Coral Progress는 `value`가 생략되거나 `undefined`이면 불확정 상태로 다룬다. 별도 `indeterminate` Prop은 제공하지 않는다. 공개 타입에서 `null`은 허용하지 않으며, 런타임에 `undefined` 이외의 잘못된 값이 전달되면 확정 상태의 `0`으로 처리한다.

이 선택에 따라 불확정 상태에서는 현재 수치를 나타내는 ARIA 값과 기본 표시 문자열을 제공하지 않는다. 확정 상태의 값은 유효한 숫자를 범위 안으로 제한해 사용한다. 세부 사용 계약은 [Progress 문서](../../packages/coral/src/progress/README.md)에 둔다.

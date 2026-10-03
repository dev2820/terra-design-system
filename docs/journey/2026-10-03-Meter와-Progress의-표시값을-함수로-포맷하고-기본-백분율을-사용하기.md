# 2026-10-03 — Meter와 Progress의 표시값을 함수로 포맷하고 기본 백분율을 사용하기

## 문제

Meter와 Progress는 숫자 상태를 화면의 문자열과 보조 기술용 `aria-valuetext`로 표현한다. 처음에는 포맷을 `Intl.NumberFormatOptions`와 `locale`로 설정하는 방안을 검토했다. 그러나 사용자가 Intl로 만들 수 없는 문구나 도메인에 맞는 표현을 원할 수 있다. Intl 옵션만 공개하면 그런 표현을 위한 별도 확장 지점을 다시 만들어야 한다.

또한 포맷 설정을 생략했을 때 무엇을 표시할지도 정해야 했다. 각 제품이 기본 문자열을 직접 만들어야 한다면 같은 수치가 사용처마다 다른 방식으로 표시될 수 있다.

## 접근 방식

`Intl.NumberFormatOptions`와 `locale`을 별도 Prop으로 제공하면 흔한 숫자 형식을 선언적으로 설정할 수 있다. 하지만 사용자 지정 문구까지 포괄하지는 못하고, 나중에 별도 콜백을 추가하면 두 포맷 경로의 우선순위를 정해야 한다.

반대로 `format(value) => string` 하나를 제공하면 호출자가 값을 받아 임의의 문자열을 반환할 수 있다. Intl 형식과 특정 로케일이 필요하면 함수 안에서 `Intl.NumberFormat`을 사용할 수 있다. 따라서 별도 Intl 옵션이나 `locale` Prop 없이도 두 종류의 요구를 표현할 수 있다고 판단했다.

기본 표현은 범위 대비 백분율로 정했다. 별도 포맷을 전달하지 않는 흔한 사용법에도 읽을 수 있는 문자열을 제공하면서, 필요한 경우 함수로 단위와 문구를 바꿀 수 있기 때문이다.

## 해결

Meter와 Progress는 제한된 실제 숫자 값을 받는 `format?: (value: number) => string`을 제공한다. 반환 문자열은 보이는 `ValueText`와 기본 `aria-valuetext`에 사용한다. 사용처가 `aria-valuetext`를 명시하면 보조 기술용 표현은 따로 지정할 수 있다.

`format`을 생략하면 두 컴포넌트 모두 런타임 기본 로케일의 백분율을 표시한다. 특정 로케일, 단위 또는 사용자 지정 문구는 사용처의 포맷 함수가 소유한다. 이로써 Coral의 기본 사용법은 간단하게 유지하면서도 포맷 표현을 Intl의 옵션 범위로 제한하지 않는다. 세부 계산과 예시는 [Meter 문서](../../packages/coral/src/meter/README.md)와 [Progress 문서](../../packages/coral/src/progress/README.md)에 둔다.

# Meter

저장 공간 사용량이나 배터리 잔량처럼 정해진 범위 안의 측정값을 표시하는
headless Meter다. 작업 완료율과 로딩에는 Progress를 사용한다.

```tsx
import * as React from "react";
import { Meter } from "@coral/react/meter";

function StorageMeter() {
  const labelId = React.useId();

  return (
    <Meter.Root value={25} className="meter" aria-labelledby={labelId}>
      <Meter.Label id={labelId}>저장 공간</Meter.Label>
      <Meter.Value />
      <Meter.Track className="meter-track">
        <Meter.Indicator className="meter-indicator" />
      </Meter.Track>
    </Meter.Root>
  );
}
```

`@coral/react`의 루트 export에서도 같은 `Meter`와 각 Part의 Props 타입을 제공한다.
`Root`, `Track`, `Indicator`는 `div`, `Label`, `Value`는 `span`을 렌더링한다.
모든 Part는 `Root` 안에서 사용한다. `Label`, `Value`, `Track`, `Indicator`는
`render={<요소 />}`로 기본 요소를 교체할 수 있다. 사용자 지정 컴포넌트를 전달한다면
Coral이 합성한 `id`, `children`, `style` 속성을 실제 DOM까지 전달해야 한다.

## 값과 포맷

`value`는 필수이며 `min`, `max`의 기본값은 각각 `0`, `100`이다. 범위를 벗어난
값은 경계값으로 제한한다. ARIA 값, 표시 문자열, Indicator 크기는 모두 제한한
값을 사용한다. 세 숫자는 유한해야 하며 `min < max`여야 한다. 이 조건을
위반하면 오류를 던진다. 값은 사용처에서 관리하며 별도 초기값이나 변경 콜백은 없다.

`format`은 `(value: number) => string` 함수를 받는다. 함수에는 범위로 제한한
실제 값을 전달하며, 반환 문자열을 `Value`의 내용과 자동 `aria-valuetext`에
사용한다. 포맷은 Indicator의 채움 비율에 영향을 주지 않는다.

`format`을 생략하면 `Intl.NumberFormat`으로 범위 대비 백분율을 표시한다.
백분율의 계산은 `(value - min) / (max - min)`이며 런타임 기본 로케일을 사용한다.
Intl 옵션 객체와 별도 `locale` Prop은 제공하지 않는다. 특정 로케일이나 단위가
필요하면 포맷 함수 안에서 `Intl.NumberFormat`을 사용한다. SSR과 브라우저의
표시를 맞춰야 할 때도 같은 로케일을 지정한 포맷 함수를 사용한다.

```tsx
const megabytes = new Intl.NumberFormat("en-US", { style: "unit", unit: "megabyte" });

<Meter.Root value={250} max={1000} format={megabytes.format} aria-label="저장 공간">
  <Meter.Value /> {/* 250 MB */}
  <Meter.Track>
    <Meter.Indicator /> {/* 채움 비율 25% */}
  </Meter.Track>
</Meter.Root>;
```

Intl이 지원하지 않는 문구도 직접 반환할 수 있다.

```tsx
<Meter.Root
  value={250}
  max={1000}
  format={(value) => `1,000 MB 중 ${value} MB 사용`}
  aria-label="저장 공간"
>
  <Meter.Value />
</Meter.Root>
```

`Value`는 `children`을 받지 않는다. 표시 문자열은 `Root`의 `format`이 결정한다.
`render` 요소에 children이 있더라도 계산한 표시값으로 대체한다.
`Root`의 `aria-valuetext` 기본값도 같은 문자열이다. 보조 기술에 다른 설명을
전달해야 한다면 `aria-valuetext`를 별도로 지정한다.

## 접근 가능한 이름

`Root`는 `role="meter"`와 값·범위 ARIA를 소유한다. 한 Root에는 최대 하나의
`Label`을 사용한다. Label은 보이는 텍스트를 렌더링한다. 이 텍스트를 접근 가능한
이름으로 사용하려면 Label의 `id`와 Root의 `aria-labelledby`에 같은 값을 전달한다.
여러 Meter를 렌더링할 때는 `React.useId()`로 각 ID를 만들 수 있다. Label 없이
사용한다면 Root에 `aria-label`을 주거나 외부 텍스트의 ID를 `aria-labelledby`로
참조한다. Root와 Label은 ID나 이름 연결을 자동 생성하지 않는다. 이름을 지정하지
않은 Meter는 접근 가능한 이름이 없으므로 사용처가 반드시 제공해야 한다.

```tsx
<Meter.Root value={40} aria-label="배터리 잔량" />
```

Meter에는 키보드 조작과 Form 참여, 별도 Disabled·Focus 동작이 없다.
자동 live region도 제공하지 않는다. 측정값 변경을 별도로 알려야 하는 제품에서는
필요에 맞는 알림을 구성한다. Meter의 자손은 접근성 트리에서 표현용으로 취급되므로
Parts 안에 상호작용 요소나 독립적인 의미를 가진 콘텐츠를 넣지 않는다.

## 스타일과 지원 범위

Coral은 가로 막대 Indicator의 `inline-size`에 계산한 백분율을 적용한다.
전달한 다른 inline style은 유지하지만 `inlineSize`는 Coral이 소유한다.
Track의 크기와 Indicator의 높이·색상·모양·모션은 사용처가 정한다.
RTL에서는 inline 시작 방향에서 채워지도록 배치한다.

```css
.meter-track {
  display: flex;
  inline-size: 100%;
  block-size: 0.5rem;
  background: #eee;
}

.meter-indicator {
  block-size: 100%;
  background: #555;
}
```

불확정 상태, 세로 방향 API, 원형 Parts, `low / high / optimum` 구간 판정은
제공하지 않는다. 원형은 별도 컴포넌트에서 다룬다. 상태를 표현한다면 색상 외에도
텍스트 등으로 의미를 전달하고, 모션은 사용처에서 reduced motion을 고려한다.

Browser Test로 DOM, 접근 가능한 이름과 설명, ARIA, 값·범위 갱신, 포맷,
표시 문자열과 기본 조합의 axe 검사를 검증한다. 실제 스크린 리더의 낭독
방식과 제품에서 구성한 CSS·콘텐츠는 사용하는 제품이 별도로 검증해야 한다.

- [HTML Meter](https://html.spec.whatwg.org/multipage/form-elements.html#the-meter-element)
- [WAI-ARIA APG Meter](https://www.w3.org/WAI/ARIA/apg/patterns/meter/)
- [Base UI Meter](https://base-ui.com/react/components/meter)
- [React Aria Meter](https://react-aria.adobe.com/Meter)

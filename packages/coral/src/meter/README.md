# Meter

저장 공간 사용량이나 배터리 잔량처럼 정해진 범위 안의 측정값을 표시하는
headless Meter다. 작업 완료율과 로딩에는 Progress를 사용한다.

```tsx
import { Meter } from "@coral/react/meter";

<Meter.Root value={25} locale="ko-KR" className="meter">
  <Meter.Label>저장 공간</Meter.Label>
  <Meter.Value />
  <Meter.Track className="meter-track">
    <Meter.Indicator className="meter-indicator" />
  </Meter.Track>
</Meter.Root>;
```

`@coral/react`의 루트 export에서도 같은 `Meter`와 각 Part의 Props 타입을 제공한다.
`Root`, `Track`, `Indicator`는 `div`, `Label`, `Value`는 `span`을 렌더링한다.
모든 Part는 `Root` 안에서 사용한다. 요소를 교체하는 `render`는 제공하지 않는다.

## 값과 포맷

`value`는 필수이며 `min`, `max`의 기본값은 각각 `0`, `100`이다. 범위를 벗어난
값은 경계값으로 제한한다. ARIA 값, 표시 문자열, Indicator 크기는 모두 제한한
값을 사용한다. 세 숫자는 유한해야 하며 `min < max`여야 한다. 이 조건을
위반하면 오류를 던진다. 값은 사용처에서 관리하며 별도 초기값이나 변경 콜백은 없다.

`format`은 `Intl.NumberFormatOptions`, `locale`은 `Intl.LocalesArgument`를 받는다.
`format`을 생략하면 `{ style: "percent" }`로 범위 대비 비율을 표시한다.
백분율의 계산은 `(value - min) / (max - min)`이다. 그 외 포맷은 실제 값을 표시한다.
`format`을 전달하면 해당 옵션을 그대로 사용하므로 `style`을 생략한 포맷은 숫자
표현이 된다. `locale`을 생략하면 런타임 기본 로케일을 사용한다. SSR과 브라우저의
포맷을 일치시켜야 할 때는 양쪽에서 같은 `locale`을 명시한다.

```tsx
<Meter.Root value={250} max={1000} locale="en-US" format={{ style: "unit", unit: "megabyte" }}>
  <Meter.Label>저장 공간</Meter.Label>
  <Meter.Value /> {/* 250 MB */}
  <Meter.Track>
    <Meter.Indicator /> {/* 채움 비율 25% */}
  </Meter.Track>
</Meter.Root>
```

## 사용자 지정 값 표현

`Value`의 children 함수는 포맷된 문자열과 제한한 실제 값을 받는다.
일반 children을 전달하면 그대로 표시하고, `null`은 빈 내용을 표시한다.

```tsx
<Meter.Root value={250} max={1000} locale="en-US" aria-valuetext="1,000 MB 중 250 MB 사용">
  <Meter.Label>저장 공간</Meter.Label>
  <Meter.Value>{(formattedValue, value) => `${value} MB 사용 (${formattedValue})`}</Meter.Value>
  <Meter.Track>
    <Meter.Indicator />
  </Meter.Track>
</Meter.Root>
```

`Root`의 `aria-valuetext` 기본값은 포맷된 문자열이다. `Value`의 children을
바꾸어도 낭독 문자열은 자동으로 바뀌지 않는다. 화면에서 추가한 의미나 설명을
보조 기술에도 전달해야 한다면 `aria-valuetext`를 별도로 지정한다.

## 접근 가능한 이름

`Root`는 `role="meter"`와 값·범위 ARIA를 소유한다. 한 Root에는 최대 하나의
`Label`을 사용한다. Label은 마운트 시 자동으로 Root의 `aria-labelledby`에
연결되며, 등장·제거·ID 변경을 반영한다. 사용자 지정 `id`도 지원한다.

명시적 `aria-labelledby` 또는 `aria-label`이 있으면 자동 Label 연결보다
우선한다. Label 없이 사용할 때는 사용처에서 둘 중 하나로 이름을 제공한다.
서버 HTML 자체에서도 라벨 연결이 필요하면 Label에 명시적인 ID를 주고 Root에
같은 `aria-labelledby`를 전달한다.

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
사용자 지정 표현과 기본 조합의 axe 검사를 검증한다. 실제 스크린 리더의 낭독
방식과 제품에서 구성한 CSS·콘텐츠는 사용하는 제품이 별도로 검증해야 한다.

- [WAI-ARIA APG Meter](https://www.w3.org/WAI/ARIA/apg/patterns/meter/)
- [Base UI Meter](https://base-ui.com/react/components/meter)
- [React Aria Meter](https://react-aria.adobe.com/Meter)

# Progress

작업 완료율 또는 진행량을 표시하는 가로 막대형 headless Progress다. Root는 진행
상태와 접근성 의미를 관리하며, 사용처는 Parts의 모양과 모션을 스타일링한다.

`Root`는 `div`에 `role="progressbar"`를 제공한다. `Label`과 `Value`는 `span`,
`Track`과 `Indicator`는 `div`다. 모든 Part는 Root 안에서 사용한다. Root의 ref는
실제 `HTMLDivElement`를 가리키며 네이티브 `<progress>`의 `position`은 제공하지
않는다. 네이티브 요소를 숨겨서 추가하지 않는다.

`Label`, `Value`, `Track`, `Indicator`는 `render={<요소 />}`로 기본 요소를 교체할 수
있다. 사용자 지정 컴포넌트를 전달한다면 Coral이 합성한 `id`, `children`, `style`,
`data-*` 속성을 실제 DOM까지 전달해야 한다.

`value`를 생략하거나 `undefined`로 전달하면 불확정 상태다. 유한한 숫자는 `0`부터
`max`까지 제한한다. `undefined`를 제외한 숫자가 아닌 런타임 값과 유한하지 않은 숫자는 확정 상태의
`0`으로 처리한다. `max`의 기본값은 `100`이며, 유한한 양수여야 한다. `null`은
공개 타입에서 허용하지 않는다. `defaultValue`, 별도 `indeterminate` Prop, 상태
변경 콜백은 제공하지 않는다.

`format?: (value: number) => string`에는 제한한 실제 값을 전달한다. 반환 문자열은
`Value`의 내용과 자동 `aria-valuetext`에 사용한다. `Value`는 `children`을 받지
않으며, `render` 요소에 children이 있더라도 계산한 표시값으로 대체한다.
`format`을 생략하면 런타임 기본 로케일의 백분율을 표시한다. 불확정 상태에서는
포맷 함수를 호출하지 않고 `Value`의 내용과 자동 `aria-valuetext`를 생략한다.
특정 로케일은 사용처가 포맷 함수에서 `Intl.NumberFormat`으로 지정한다.

Root는 값과 범위 ARIA, 접근 가능한 이름을 제공한다. 불확정 상태에서는
`aria-valuenow`를 생략한다. Root가 기본 Label ID를 만들고 한 Root의 Label 하나에
전달한다. 기본 Label은 서버 HTML에서도 Root의 `aria-labelledby`에 연결된다.
Label에 직접 `id`를 지정하면 Root의 `aria-labelledby`에도 같은 ID를 지정해야 한다.
Label을 생략하면 Root에 `aria-label` 또는 `aria-labelledby`로 이름을 제공한다.
명시적인 `aria-labelledby` 또는 `aria-label`이 자동 연결보다 우선한다.

```tsx
<Progress.Root value={25} aria-labelledby="upload-label">
  <Progress.Label id="upload-label">파일 업로드</Progress.Label>
</Progress.Root>
```

`role="status"`, 자동 live region, 키보드 조작, Focus 이동과 Form 참여는 제공하지
않는다. 작업 결과 알림은 사용처가 별도 요소에 구성한다.

확정 상태에서 Indicator의 `inlineSize`는 `value / max`의 백분율이다. 다른 사용자
스타일은 유지한다. 불확정 상태에는 계산한 길이를 적용하지 않으며 사용처가
`data-indeterminate`를 이용해 길이와 모션을 정한다. 해당 상태에 따라 모든 Part에
`data-indeterminate`, `data-progressing`, `data-complete` 중 하나가 적용된다.

- [HTML Progress](https://html.spec.whatwg.org/multipage/form-elements.html#the-progress-element)
- [HTML Progress 렌더링](https://html.spec.whatwg.org/multipage/rendering.html#the-progress-element-2)
- [WAI-ARIA progressbar](https://www.w3.org/TR/wai-aria-1.2/#progressbar)

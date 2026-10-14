# Collapsible

단일 콘텐츠 영역을 여닫는 구조와 상태를 제공하는 React 컴포넌트다.

## 사용법

```tsx
import { Collapsible } from "@coral/react/collapsible";

<Collapsible.Root defaultOpen={false}>
  <Collapsible.Trigger>자세히 보기</Collapsible.Trigger>
  <Collapsible.Panel>추가 내용</Collapsible.Panel>
</Collapsible.Root>;
```

`Root`는 `open`과 `onOpenChange`로 제어하거나 `defaultOpen`으로 내부 상태를
사용한다. `onOpenChange`는 Trigger가 눌렸을 때 다음 펼침 상태와 이벤트 정보를
받는다. 비제어 상태의 변경은 이벤트 정보의 `cancel()`로 취소할 수 있다.
`disabled`는 Trigger를 비활성화하며 현재 펼침 상태는 유지한다.

`Trigger`는 네이티브 `<button type="button">`을 렌더링한다. 버튼의 콘텐츠나
`aria-label`로 접근 가능한 이름을 제공해야 한다. Coral은 `aria-expanded`와
`aria-controls`를 설정하고, `Panel`의 ID를 연결한다. Enter와 Space 활성화는
브라우저가 처리한다. `Panel`은 DOM에 남아 있으며 닫힌 동안 `hidden` 상태가
된다. 닫힌 패널 안의 내용과 컨트롤은 탐색 및 키보드 순서에서 제외된다.

펼친 상태의 `Trigger`에는 `data-expanded`를, `Root`와 `Panel`에는
`data-open`을 설정한다.

`Root`와 `Panel`의 `render`에는 같은 의미의 요소를 렌더링하는 React 요소를
전달할 수 있다. 사용자 지정 컴포넌트는 전달받은 Props와 Ref를 최종 DOM 요소에
연결해야 한다. Trigger는 버튼의 의미, 키보드 동작과 `disabled`를 유지하기 위해
요소 교체를 지원하지 않는다.

네이티브 `<details>`와 `<summary>`는 별도의 상태 관리가 필요 없는 단순한
공개·숨김에 사용할 수 있다. Collapsible은 제어 상태, 변경 취소와 비활성화가
필요한 경우에 사용한다. 여러 섹션 사이의 펼침 상태를 조정할 때는 Accordion을
사용한다.

- [HTML Standard: details and summary](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-details-element)
- [WAI-ARIA APG Disclosure Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)

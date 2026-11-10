# Portal

자식을 `document.body` 또는 지정한 DOM 컨테이너에 렌더링합니다.
부모의 React 컨텍스트와 이벤트 연결은 유지됩니다.

```tsx
import { Portal } from "@coral/react/portal";

<Portal className="portal">
  <div>다른 DOM 위치에 표시할 내용</div>
</Portal>;
```

루트의 `import { Portal } from "@coral/react"`도 지원합니다.
기본 요소는 `div`입니다. `container?: HTMLElement | null`에 대상 컨테이너를
전달할 수 있습니다. 생략하거나 `null`이면 body에 렌더링합니다.
대상을 변경하면 자식을 새 컨테이너로 옮깁니다.

서버 HTML에는 포털 내용을 포함하지 않습니다. 클라이언트 마운트 후에
렌더링합니다. `ref`는 대상 컨테이너 안의 실제 요소를 가리킵니다.
`render`는 사용자 요소와 Props, 이벤트, Ref를 합성합니다.

Portal은 자체 열림 상태, 접근성 역할과 포커스 이동을 제공하지 않습니다.
표시 여부는 사용처가 정합니다. 팝업의 상위 표시 계층 진입과 배치가 필요하면
[Positioner](../positioner/README.md)와 조합합니다.
Portal만으로 요소가 다른 요소 위에 표시되는 순서가 정해지지는 않습니다.

Autocomplete, Popover, Dialog와 AlertDialog의 Portal Part는 각 패턴의 열림
상태에 맞춰 표시됩니다. 이 Parts에서는 사용처가 `open`을 다시 연결하지 않습니다.

## 검증

브라우저 테스트는 기본 대상, 대상 변경, React 컨텍스트와 이벤트 연결,
`render`와 Ref 합성, 제거와 SSR hydration을 검증합니다.

```sh
pnpm --filter @coral/react exec vitest run src/portal/portal.test.tsx
```

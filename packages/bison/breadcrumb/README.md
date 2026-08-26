# Breadcrumb

Breadcrumb는 현재 페이지의 위치를 상위 페이지부터 계층 순서대로 보여 주는 탐색
패턴이다.

## Parts

- `Root`: Breadcrumb 전체를 포함하는 이름 있는 navigation landmark다.
- `Link`: 계층의 페이지로 이동하는 탐색 가능한 네이티브 `<a href>`다. 현재 페이지를
  가리키는 Link는 `current` 상태를 가지며 `aria-current="page"`로 노출된다.

`Link` Props는 네이티브 `<a href>` 또는 최종적으로 네이티브 anchor를 렌더링하는
Router Link에 연결해야 한다. Bison은 custom `role="link"` 요소를 지원하지 않으며,
`role`, `href`, `tabIndex`, `onClick`이나 키보드 동작을 추가하지 않는다. 목적지는
사용처가 제공하고 탐색과 키보드 동작은 네이티브 anchor가 담당한다.

현재 페이지가 링크가 아니라면 `Link` part를 사용하지 않아도 되며 `aria-current`는
선택 사항이다. Link의 실제 목록 구조와 시각적 구분자는 렌더러와 스타일 계층이
담당한다.

## State와 Event

Breadcrumb에는 별도의 상태나 event가 없다. `current`는 각 Link를 연결할 때
사용처가 제공하는 상태이며 Bison은 이를 ARIA 속성으로 변환한다.

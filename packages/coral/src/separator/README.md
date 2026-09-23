# Separator

네이티브 `<hr>`의 주제 전환 의미를 유지하면서 방향과 장식용 처리를 제공하는
정적 구분선이다. 항상 `<hr>`를 렌더링하며 `render`를 지원하지 않는다.

## 사용법

```tsx
import { Separator } from "@coral/react/separator";

<>
  <p>첫 번째 주제</p>
  <Separator />
  <p>다음 주제</p>
</>;
```

루트 `@coral/react`에서도 `Separator`와 `SeparatorProps`를 가져올 수 있다.
컴포넌트가 관리하는 `aria-orientation`과 `aria-hidden`을 제외한 React의 `<hr>` Props와
`HTMLHRElement` Ref를 그대로 계승한다. 자식 콘텐츠 등 `<hr>`의 제약은 React와 HTML의
계약을 따르며 Coral에서 별도로 제한하거나 검증하지 않는다.

## 방향과 장식용 구분선

```tsx
<Separator orientation="vertical" className="vertical-separator" />;
<Separator decorative className="decorative-separator" />;
```

`orientation`은 `"horizontal"` 또는 `"vertical"`이며 기본값은 `"horizontal"`이다.
`data-orientation`은 항상 현재 방향을 제공한다. 의미 있는 세로 구분선에만
`aria-orientation="vertical"`을 추가하며, 가로 방향은 네이티브 역할의 기본값을 사용한다.

`decorative`의 기본값은 `false`다. 시각적 구분만 필요하면 `decorative`를 지정한다.
이때 `aria-hidden="true"`로 접근성 트리에서 제외하고 `aria-orientation`을 생략한다.

Coral은 CSS를 추가하거나 브라우저의 `<hr>` 기본 스타일을 초기화하지 않는다.
제품은 `className`, `style`과 `[data-orientation]`을 사용해 구분선의 모양을 정한다.
특히 `orientation="vertical"` 자체가 선을 회전하거나 높이를 지정하지 않으므로,
세로 구분선의 높이, 너비, 테두리와 간격은 제품 CSS에서 지정해야 한다.

## 접근성과 지원 범위

기본적으로 `<hr>`의 암묵적 separator 역할을 사용하며 명시적인 `role`을 추가하지 않는다.
정적 구분선에는 접근 가능한 이름이 필수는 아니다. `aria-orientation`과
`aria-hidden`은 컴포넌트가 관리하고, 제품은 `orientation`과 `decorative`로 의미를 선택한다.

`role`, `tabIndex`, `autoFocus` 등 네이티브 Props는 그대로 전달한다.
Coral은 키보드·포인터 동작, Focus 이동, Disabled 상태와 Form 참여를 추가하지 않는다.
패널 크기 조절과 드래그는 지원하지 않는다.

Browser Test는 네이티브 구조, 방향과 장식용 처리 및 axe가 감지하는 접근성 위반을 검증한다.
실제 스크린 리더의 음성 출력과 제품 CSS를 적용한 최종 화면은 자동 검증 범위에 포함하지 않는다.

- [HTML: The hr element](https://html.spec.whatwg.org/multipage/grouping-content.html#the-hr-element)
- [WAI-ARIA: separator](https://www.w3.org/TR/wai-aria-1.2/#separator)

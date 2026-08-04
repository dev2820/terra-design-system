# Terra Foundations

Terra의 Foundation은 제품의 완성된 모습을 정하는 스타일 모음이 아니라, 여러
제품이 일관된 의미와 품질을 유지하면서 각자의 맥락에 맞는 표현을 만들기 위한
공통 기반이다.

Foundation은 색상, 타이포그래피, 간격처럼 제품 전반에 반복되는 시각적 결정을
다룬다. 시스템은 공통된 의미와 관계, 기본값과 확장 경계를 제공하고, 제품은 그
계약을 지키면서 값을 재매핑하거나 제품에만 필요한 의미를 추가할 수 있다.

## 토큰 계층

### Primitive token

Primitive token은 색상값, 크기, 간격과 같은 원시 값과 척도를 관리한다. Terra의
기본 표현과 테마를 구성하는 재료이며, 제품 화면과 컴포넌트가 직접 사용하는
계약은 아니다.

제품은 테마를 구성하기 위해 Primitive token을 교체하거나 추가할 수 있다.
Primitive의 변경으로 Semantic token의 의미, 위계와 접근성 계약이
깨지지 않는지는 제품 테마에서 다시 검증한다.

### Semantic token

Semantic token은 값이 수행하는 역할과 사용 조건을 나타낸다. Terra는 여러
제품에서 공유해야 하는 Semantic token의 이름과 의미, 토큰 사이의 관계를
소유하고 공식 기본값을 제공한다.

제품은 Semantic token의 의미를 바꾸지 않는 범위에서 값을 재매핑할 수 있다.
Terra의 공통 의미로 설명할 수 없는 필요에는 제품 범위의 Semantic token을
추가할 수 있으며, 제품에서 추가한 토큰은 반복되는 공통 필요가 확인되기 전까지
Terra의 공통 토큰이 되지 않는다.

### Component와 Pattern

컴포넌트와 패턴은 Foundation의 표현 자원을 실제 요소의 의미와 위계에
연결한다. 컴포넌트는 우선 Semantic token을 사용하며, 전역 의미와 독립적으로
변경할 필요가 있거나 공식적인 확장 지점이 필요한 경우에만 Component token을
추가한다.

제품은 개별 인스턴스에서 원시 값을 덮어쓰기보다, 문서화된 컴포넌트·패턴
recipe 또는 제품 테마를 통해 표현을 변경한다.

## Foundation 문서

- [Color](./foundations/color.md): 색상의 토큰 계층, 행동 색상의 Tone과 Emphasis,
  위계 recipe와 확장 계약
- [Foreground](./foundations/foreground.md): Surface 위의 Content Foreground와
  Color 표현에 대응하는 On-color의 사용 규칙
- [Surface](./foundations/surface.md): 콘텐츠가 놓이는 배경의 Base와 Layer 구조,
  사용 규칙과 확장 경계
- [Boundary](./foundations/boundary.md): 요소와 정보 단위의 경계 역할, 강도와
  표현 및 확장 규칙
- [Elevation](./foundations/elevation.md): 기준면으로부터의 절대적인 시각적 높이,
  단계 관계와 확장 경계
- [State](./foundations/state.md): 행동 가능성, 현재 상호작용, 입력 위치와 선택
  여부를 나타내는 공통 상태와 전환 제약
- [Radius](./foundations/radius.md)
- [Typography](./foundations/typography.md)
- [Spacing](./foundations/spacing.md)
- [Motion](./foundations/motion.md)

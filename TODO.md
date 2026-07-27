# TODO

## Color

- [ ] 행동 색상 외에 Terra가 공통으로 소유할 Semantic color의 범위를 정한다.
  `Surface`, `Content`, `Border`, `Feedback`, `Focus`와 `Selection`을 후보로
  검토한다.
- [ ] Foreground와 Background를 검증된 하나의 표현 쌍으로 제공할지, 독립적인
  Semantic role로 제공할지 정한다.
- [ ] 위험한 행동을 나타내는 `Action Danger`와 오류·위험 상태를 전달하는
  `Feedback Error/Danger`의 의미와 관계를 정한다.
- [ ] Light, Dark 등 Color mode와 제품 테마가 동일한 의미와 위계를 유지하기
  위한 계약을 정한다.
- [ ] Semantic color의 이름 구조와 공통으로 제공할 최소 Token 목록을 정한다.
- [ ] 색상 대비와 비색상 단서 등 접근성 검증 기준과 검증 대상을 구체화한다.
- [ ] `Hover`, `Pressed`, `Disabled`, `Focus` 등 Interaction state의 표현과
  제품이 변경할 수 있는 범위를 정한다.
- [ ] Semantic color를 구성할 Primitive palette의 척도와 공식 기본값을 정한다.
- [ ] Component와 Pattern의 행동 위계 recipe 및 Component token이 필요한
  조건을 구체화한다.

## Elevation

- [ ] Elevation을 Surface와 분리된 Foundation으로 정의하고, 시각적 단계와
  기본값, 실제 겹침 순서와의 관계를 정한다.
- [ ] Surface의 의미를 유지하면서 Elevation을 연결하거나 제품별로 재매핑할 수
  있는 공식 recipe와 확장 범위를 정한다.

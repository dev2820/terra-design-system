# 2026-07-25 — Tone과 관계없이 Solid·Soft·Ghost 강조 관계 유지하기

## 문제

행동 색상의 Tone과 행동 위계를 분리하면 Brand, Neutral, Danger를 맥락에 맞게
선택할 수 있지만, 서로 다른 Tone 사이의 시각적 강약을 어떻게 보장할지가 새로운
문제가 되었다. Tone마다 독립적으로 강도를 정하면 Brand Solid를 Primary에
사용하면서 Neutral Solid를 Secondary에 사용하는 것처럼, 같은 정도로 강한
표현이 서로 다른 행동 위계에 놓일 수 있었다. 실제 색상에 따라 Neutral Solid가
Brand Solid보다 더 강하게 보이면 토큰 이름과 사용자가 인식하는 위계가
뒤집힐 수도 있었다.

Semantic color가 행동 위계를 직접 나타내지 않는 구조에서는 표현 토큰 사이의
관계도 정하지 않을 경우 위계 보장의 책임이 다시 개별 사용처로 넘어간다.
제품마다 다른 Tone을 사용할 수 있게 하면서도, 같은 행동 그룹 안에서 표현의
강약을 예측할 수 있는 공통 계약이 필요했다.

## 접근 방식

한 가지 방법은 각 Tone 안에서만 강약을 정하고 서로 다른 Tone 사이의 관계는
recipe를 만드는 사람이 판단하게 하는 것이었다. 이 방식은 색조와 브랜드
특성에 가장 유연하지만, 같은 행동 그룹에서 Tone을 섞을 때마다 시각적 우위를
다시 판단해야 하고 제품마다 다른 결과가 생길 수 있었다.

다른 방법은 Tone과 무관한 공통 Emphasis 단계를 두는 것이었다. Brand, Neutral,
Danger 각각에 강한 표현과 약한 표현을 제공하되, 같은 단계는 Tone이 달라도
동일한 위계 등급으로 취급하는 방식이다. 이 경우 서로 다른 Tone을 선택할 수
있으면서도 강한 단계가 낮은 행동 위계에 중복되는 것을 막을 수 있다.

강조 단계의 이름으로는 `Solid·Weak·Ghost`, `Strong·Subtle·Ghost`,
`Solid·Tint·Ghost` 등을 검토했다. `Weak`는 관계는 분명하지만 부정적인 인상을
줄 수 있었고, `Strong·Subtle·Ghost`는 강조도와 시각적 처리 방식이 한 묶음에
섞였다. `Tint`는 특정한 색상 생성 방법을 암시해 어두운 테마 등에서 실제 표현과
어긋날 수 있었다. `Solid·Soft·Ghost`는 세 이름이 모두 컨테이너의 시각적 처리
방식을 설명하면서 밝고 어두운 테마에 함께 적용할 수 있어 가장 적합하다고
판단했다.

또한 세 단계를 항상 모두 사용해야 하는지도 검토했다. 중간 위계의 행동이 없는
상황에서 Soft를 억지로 추가할 이유는 없었고, Primary와 낮은 우선순위의 행동
사이를 더 명확히 구분하기 위해 Solid와 Ghost를 직접 조합할 수도 있었다. 이
논의를 통해 행동의 우선순위와 시각적 강조 단계는 고정된 일대일 관계가 아니라는
점을 분명히 했다.

## 해결

Terra는 행동 색상의 표현 단계를 `Solid`, `Soft`, `Ghost`로 정하고 각각 Strong,
Moderate, Minimal 강조 단계에 대응시키기로 했다. 같은 표면과 같은 행동 그룹
안에서는 Tone과 관계없이 `Solid > Soft > Ghost` 관계를 유지한다.

Brand Solid, Neutral Solid와 Danger Solid는 모두 Strong 등급이다. 따라서 한
Solid를 Primary에 사용하면서 다른 Tone의 Solid를 Secondary처럼 더 낮은 위계에
사용하지 않는다. Secondary나 Tertiary에 다른 Tone이 필요하다면 Soft 또는
Ghost처럼 더 낮은 Emphasis를 사용한다.

모든 Emphasis 단계를 반드시 사용할 필요는 없다. 중간 단계를 생략해 Primary에
Solid, Secondary에 Ghost를 사용할 수 있으며, 이때 Ghost는 Minimal 표현이지만
실제 행동 사이에서는 Secondary일 수 있다. `Primary·Secondary·Tertiary`는 행동의
우선순위이고 `Solid·Soft·Ghost`는 시각적 강조 단계이므로 둘을 같은 개념으로
취급하지 않는다.

같은 Emphasis 등급이라는 것은 서로 다른 Tone이 지각상 정확히 같은 정도로
눈에 띈다는 뜻이 아니다. 색조, 채도, 명도와 주변 표면에 따라 실제 주목도는
달라질 수 있다. 따라서 공식 테마에서 의도한 관계가 성립하는지 확인하고,
관계를 유지할 수 없는 값이나 조합은 조정하거나 같은 행동 그룹에서 함께
사용하지 않는 것을 이 계약의 경계로 삼았다.

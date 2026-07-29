# 2026-07-29 — Color 표현의 On-color를 하나로 제한하기

## 문제

하나의 Color Background 안에 제목, 본문과 보조 정보를 넣으려면 Strong,
Default와 Muted처럼 여러 Foreground 강도가 필요할 수 있다. Background마다
여러 On-color를 제공하면 색이 있는 카드와 복잡한 행동 컨테이너를 구성할 수
있지만, Tone과 Emphasis마다 Foreground 단계가 늘어나고 Color 표현과 Surface의
책임이 겹치게 된다.

Terra의 Color Foundation은 현재 Brand·Neutral·Danger Tone과
Solid·Soft·Ghost Emphasis로 행동 색상을 다룬다. 이 범위를 유지하면서도 하나의
Color 표현이 몇 개의 On-color를 가져야 하는지, 여러 단계의 정보를 담는
컨테이너까지 Color Background로 지원할지를 결정해야 했다.

## 접근 방식

Background마다 여러 On-color를 제공하는 방식은 색이 있는 영역에서도 텍스트의
위계를 세밀하게 표현할 수 있다. 반면 모든 Tone과 Emphasis에 여러 Foreground
단계를 조합하면 토큰 구조가 빠르게 커지고, Background별로 각 단계의 대비를
검증해야 한다. 사용자가 행동 색상을 일반적인 카드 Surface처럼 사용할 수 있어
Color와 Surface 중 어느 체계를 선택해야 하는지도 불명확해진다.

On-color를 하나로 제한하면 Color 표현 안에서 라벨과 아이콘이 같은 강도를
사용하므로 선택과 검증이 단순해진다. 대신 여러 단계의 정보를 담은 Colored
Card 같은 표현은 만들기 어렵다. 그러나 복잡한 정보 위계는 이미 Surface와
Content Foreground가 담당하며, 행동 색상의 컨테이너는 하나의 행동을 전달하는
단순한 구조로 제한할 수 있다고 판단했다.

## 해결

모든 공식 Color 표현은 대응하는 On-color를 하나만 가진다. Solid와 Soft뿐
아니라 투명한 Background를 가진 Ghost에도 하나의 On-color를 제공한다. 하나의
Color 표현 안에서 텍스트, 아이콘과 의미를 전달하는 기호는 모두 그 On-color를
사용한다.

여러 Foreground 강도가 필요한 복잡한 정보 컨테이너는 Color Background가 아니라
Surface와 Content Foreground로 구성한다. 행동 색상의 Background는 여러 단계의
제목, 본문과 보조 정보를 가진 Colored Card를 만들기 위한 일반 Surface로
사용하지 않는다.

새로운 Tone을 추가하더라도 기존 Solid·Soft·Ghost Emphasis 구조를 따르며,
실제로 제공하는 각 Color 표현에는 On-color 하나를 함께 제공한다. 이 제한은
표현 가능성을 무조건 늘리기보다 Color와 Surface의 책임을 분명히 하고, 공식
조합의 수와 검증 범위를 컴팩트하게 유지하기 위한 경계다.

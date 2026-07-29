# 2026-07-29 — 하나의 테마에서 Surface Foreground 반전을 허용하지 않기

## 문제

Surface의 Base, Layer 1과 Layer 2는 특정 색상값이 아니라 정보가 중첩된 위치를
나타낸다. 따라서 테마가 각 Surface에 서로 다른 색을 연결할 수 있지만, 밝은
Base 안에 어두운 Layer를 두는 것처럼 명암 차이가 커지면 하나의 Content
Foreground 집합으로 모든 Surface의 가독성을 보장할 수 없다.

Surface마다 Foreground의 명암을 반전하려면 Inverse Foreground, Surface별
Foreground 또는 문맥에 따른 토큰 재연결이 필요하다. 이런 구조는 반전된
Surface를 유연하게 지원하지만, Content Foreground의 종류와 사용 규칙을
늘리고 같은 토큰의 값이 위치에 따라 달라지게 한다. Terra가 Surface의 표현
자유와 Foreground 체계의 단순성 중 어디에 경계를 둘지 결정해야 했다.

## 접근 방식

한 가지 방법은 새로운 Surface 맥락에서 같은 Content Foreground 토큰을 밝은
값으로 다시 연결하는 것이었다. 밝은 화면 안의 어두운 패널처럼 복잡한 반전
영역을 지원할 수 있고, `Inverse`라는 별도 의미를 추가하지 않아도 된다.
그러나 사용자는 현재 어떤 Surface 맥락에 있는지 알아야 하고, Base와 Layer의
중첩에 더해 Foreground 재연결 경계까지 추적해야 한다.

별도의 Inverse Foreground나 Surface별 Foreground 집합을 제공하는 방법도
검토했다. 관계는 명시적으로 드러나지만 공통 Foreground 목록이 커지고, 어떤
Surface에서 어떤 집합을 선택해야 하는지 추가 규칙이 필요하다.

반대로 하나의 테마에서 모든 Surface가 같은 명암 방향을 유지하도록 제한하면
반전된 복잡한 Surface는 지원할 수 없다. 대신 Base와 모든 Layer에서 같은
Content Foreground 집합을 그대로 사용할 수 있고, Surface의 단계가 달라져도
Foreground 선택 규칙이 변하지 않는다. Terra는 Foreground 체계를 더 확장하지
않고 가장 간단한 규칙을 유지하는 쪽을 선택했다.

## 해결

하나의 테마 안에서 Base와 모든 Layer는 동일한 Content Foreground 집합과 명암
방향을 공유한다. Surface의 실제 색상은 서로 다를 수 있지만, Content
Foreground를 밝은 색에서 어두운 색으로 반전해야 할 정도로 차이가 커져서는
안 된다. 새로운 독립된 맥락에서 Base를 다시 시작하더라도 같은 테마 안에서는
이 명암 방향을 바꾸지 않는다.

Terra는 Inverse Foreground, Surface별 Foreground와 Surface 내부의 문맥별
Foreground 재연결을 제공하지 않는다. 반전된 Foreground를 요구하는 복잡한
Surface는 공통 Foundation의 지원 범위에 포함하지 않는다. 단순한 Color 표현은
대응하는 On-color를 사용할 수 있지만, 여러 단계의 정보 위계를 가진 반전
영역을 Surface의 예외로 추가하지 않는다.

이 제한은 Light Theme과 Dark Theme 사이의 전체 전환을 금지하지 않는다.
Light Theme에서는 모든 Surface와 Content Foreground를 밝은 배경과 어두운
콘텐츠의 관계로, Dark Theme에서는 어두운 배경과 밝은 콘텐츠의 관계로 함께
변경할 수 있다. 금지하는 것은 한 테마 안에서 Surface마다 서로 다른 명암
방향을 사용하는 것이다.

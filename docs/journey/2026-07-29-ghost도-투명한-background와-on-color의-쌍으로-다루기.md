# 2026-07-29 — Ghost도 투명한 Background와 On-color의 쌍으로 다루기

## 문제

Terra는 Surface에는 Content Foreground를, Color 표현에는 On-color를 사용하도록
영역을 분리했다. 그러나 Ghost는 기본 상태에서 컨테이너가 보이지 않고 실제
Background 값이 투명하다. 화면에 보이는 결과만 기준으로 보면 Ghost의 콘텐츠는
Surface 바로 위에 놓이므로 Content Foreground를 사용해야 하는 것처럼 보였다.

Ghost만 Content Foreground를 사용하면 Solid와 Soft는 Background와 On-color의
쌍이고 Ghost는 Surface와 Content Foreground의 조합이 된다. 같은 Tone과
Emphasis 체계에 속한 Color 표현이 서로 다른 Foreground 규칙을 따르게 되어,
단순하게 나눈 사용 영역에 예외가 생기는 문제가 있었다.

## 접근 방식

한 가지 방법은 Ghost에 보이는 Background가 없다는 사실을 우선해 Content
Foreground를 사용하는 것이었다. 실제 렌더링 구조를 직접 설명할 수 있지만,
Brand Ghost나 Danger Ghost가 Color 표현이면서도 Surface 콘텐츠용 토큰을
빌려 쓰게 된다. Content Foreground와 On-color의 경계가 흐려지고, 사용자는
Ghost에서만 다른 선택 규칙을 기억해야 한다.

다른 방법은 화면에 칠해진 색이 아니라 콘텐츠를 소유한 의미적 표현을 기준으로
판단하는 것이었다. Ghost의 Background 값이 투명하더라도 Ghost 자체는 여전히
Tone과 Emphasis를 가진 공식 Color 표현이다. 따라서 투명한 Background와 전용
On-color의 쌍으로 정의하면 Solid, Soft와 같은 계약을 유지할 수 있다.

투명한 Background는 On-color의 가독성을 스스로 보장할 수 없다는 제약도
검토했다. 이 문제는 Ghost를 Content Foreground의 예외로 만드는 대신, Ghost가
사용되는 Surface와 On-color의 최종 조합을 검증하는 방식으로 다룰 수 있다고
판단했다.

## 해결

Ghost는 실제 Background 값이 투명하더라도 의미적으로 Background를 가진 공식
Color 표현으로 다룬다. Brand·Neutral·Danger Ghost에는 각각 대응하는 On-color를
제공하며, Ghost 내부의 텍스트, 아이콘과 의미를 전달하는 기호는 Content
Foreground가 아니라 그 On-color를 사용한다.

이 선택으로 Solid, Soft와 Ghost는 모두 `Background + On-color`라는 동일한
구조를 갖는다. Surface 위의 일반 콘텐츠만 Content Foreground를 사용한다는
경계에도 예외를 만들지 않는다.

다만 Ghost의 Background가 투명하므로 On-color의 가독성은 아래에 놓인 Surface의
영향을 받는다. 따라서 공식 Ghost 표현은 사용할 수 있는 모든 Surface와의
조합에서 검증해야 하며, 테마가 Surface나 On-color 값을 변경하면 이 관계도
다시 확인해야 한다.

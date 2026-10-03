# 2026-10-03 — Meter와 Progress의 Label ID 연결을 사용처가 명시하기

## 문제

Meter와 Progress의 Root는 보이는 Label의 텍스트를 접근 가능한 이름으로 사용할 수 있어야 한다. 초기 방식에서는 Label이 자신의 ID를 effect로 Root에 등록하고, Root가 이를 `aria-labelledby`에 반영했다. 이 경우 클라이언트에서 연결이 완성되지만 서버가 처음 출력한 HTML에는 참조가 없고, 등록에 따른 추가 렌더링도 발생한다.

Root가 기본 Label ID를 먼저 만들고 참조하는 방식도 검토했다. 이 방식은 기본 Label이 있을 때 서버 HTML부터 연결된다. 그러나 Label이 없으면 Root가 존재하지 않는 ID를 가리킬 수 있고, Label에 사용자 지정 ID를 주면 Root가 자식의 최종 ID를 서버 렌더링 중 알 수 없다. Label은 선택적인 Part이므로 이 경계가 실제 사용법에 영향을 준다.

## 접근 방식

첫 번째 방법은 Label의 ID를 effect로 Root에 올리는 것이었다. Label의 등장과 제거, 사용자 지정 ID를 자동으로 반영할 수 있지만 서버 HTML의 연결과 추가 렌더링 문제가 남는다.

두 번째 방법은 Root가 기본 ID를 만들고 Label에 내려주는 것이었다. 기본 조합의 SSR 연결에는 유리하지만, Label이 없는 경우와 사용자 지정 ID를 함께 처리하려면 별도 규칙이나 양방향 등록이 필요하다. 결국 모든 조합에서 자동 연결을 보장하기 어렵다.

세 번째 방법은 Root가 자동으로 Label의 존재를 추측하지 않고 사용처가 ARIA 참조를 명시하는 것이었다. Label을 사용할 때 ID 두 곳을 지정하는 부담은 생기지만, 처음 렌더링한 HTML에서 참조 관계가 완성되고 존재하지 않는 기본 ID도 만들지 않는다. 사용자와 Coral의 책임도 분명해진다.

## 해결

Meter와 Progress는 Label ID를 생성하거나 Root의 `aria-labelledby`를 자동 설정하지 않는다. 보이는 Label을 이름으로 사용할 때는 사용처가 Label의 `id`와 Root의 `aria-labelledby`에 같은 값을 전달한다. 여러 인스턴스에서 고유한 ID가 필요하면 사용처가 `React.useId()` 등을 사용할 수 있다.

Label을 생략하면 사용처가 Root에 `aria-label`을 주거나 외부 텍스트를 `aria-labelledby`로 참조한다. 이름을 전혀 제공하지 않은 Root는 접근 가능한 이름이 없으므로 올바른 사용법으로 안내하지 않는다. 이 계약과 예시는 [Meter 문서](../../packages/coral/src/meter/README.md)와 [Progress 문서](../../packages/coral/src/progress/README.md)에 둔다.

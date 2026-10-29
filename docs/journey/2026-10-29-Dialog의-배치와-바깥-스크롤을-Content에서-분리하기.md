# 2026-10-29 — Dialog의 배치와 바깥 스크롤을 Content에서 분리하기

## 문제

Coral Dialog의 Parts를 정하면서 배치를 담당하는 Positioner를 Content와 별도로
제공할지 검토했다. 단순한 중앙 배치는 Content 자체를 고정 위치에 놓는 것으로
구성할 수 있다. 그러나 사용자는 긴 콘텐츠를 다루는 두 가지 사용 사례를 함께
제시했다. 하나는 Dialog 전체가 길어지고 그 바깥 영역을 스크롤하는 구성이며,
다른 하나는 Dialog의 크기를 제한하고 내부 본문에 스크롤을 두는 구성이다.

두 구성은 스크롤하는 요소와 높이를 제한하는 위치가 다르다. 배치와 스크롤을
Content 하나의 역할로 고정하면, 사용처가 다른 구성을 선택할 때 같은 Part에
서로 다른 책임을 부여해야 한다. Dialog의 의미와 포커스 경계는 유지하면서도
배치와 스크롤 구성을 바꿀 수 있는 구조가 필요했다.

## 접근 방식

첫 번째 방식은 별도 Positioner 없이 Content 자체에 위치와 크기, 스크롤을
설정하는 것이었다. 중앙에 놓인 일반적인 Dialog에는 조합이 간단하다. 내부 본문만
스크롤하려면 Content의 높이를 제한하고 본문 영역을 별도로 구성할 수 있다.
다만 긴 Dialog 전체를 바깥에서 스크롤하려면 Content를 감싸는 외부 컨테이너도
함께 구성해야 한다. 따라서 Content 자체의 배치만을 모든 사용 사례의 기본
구조로 삼기에는 범위가 부족했다.

두 번째 방식은 배치와 바깥 스크롤을 담당하는 Positioner를 별도 Part로 제공하는
것이었다. 바깥 스크롤 구성에서는 Positioner를 뷰포트 크기의 스크롤 컨테이너로
두고 Content가 본문 길이대로 늘어나게 할 수 있다. 내부 스크롤 구성에서는
Positioner가 Dialog의 위치를 잡고, Content의 높이를 제한한 뒤 Body만 스크롤하게
할 수 있다. 두 경우 모두 Content가 실제 Dialog 영역이라는 의미를 유지한다.

Positioner를 분리하면 조합할 요소가 하나 늘어난다. 반면 배치와 스크롤의 변경이
Dialog의 의미나 포커스 경계를 바꾸지 않도록 책임을 나눌 수 있다. 사용자는
일반적인 중앙 배치에서 Positioner를 생략할 수 있는지도 확인했다. 모든 구성에
Positioner를 요구할 필요는 없으므로, 필요한 배치와 바깥 스크롤에 선택적으로
사용하는 구조로 정리했다.

## 해결

Dialog는 Positioner와 Content를 분리한다. Positioner는 Content의 배치와 바깥
스크롤을 구성하는 선택적인 컨테이너다. Content는 Dialog의 접근성 의미와
포커스 경계를 담당한다. Positioner가 뷰포트 전체를 덮더라도 실제 Dialog 영역과
외부 클릭의 경계는 Content를 기준으로 판단한다.

사용처는 긴 Content를 Positioner 안에서 스크롤하거나, Content의 높이를 제한하고
Body만 스크롤하는 구성을 선택할 수 있다. Content 자체를 고정 위치에 놓는
중앙 배치에는 Positioner를 생략할 수 있다. Coral은 이 조합을 위한 Parts를
제공하고, 구체적인 정렬, 크기와 overflow 스타일은 사용처가 정한다. 이 경계를
통해 두 스크롤 구성을 지원하면서도 하나의 배치 방식을 모든 Dialog에 강제하지
않는다.

두 구성은 페이지 스크롤을 잠근 상태에서도 해당 스크롤 영역이 PageDown 입력으로
움직이는지 브라우저에서 확인했다. 세부 구성과 스타일 예시는
[Dialog 문서](../../packages/coral/src/dialog/README.md)에 두고, 실제 동작의 검증은
[Dialog 브라우저 테스트](../../packages/coral/src/dialog/dialog.test.tsx)에 남긴다.

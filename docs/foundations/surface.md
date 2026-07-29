# Surface

Surface는 콘텐츠가 놓이는 배경으로, 정보가 같은 맥락에 속하는지 또는 새로운
맥락으로 구분되는지를 화면에 드러낸다.

Terra는 Surface를 `Base`, `Layer 1`, `Layer 2`로 구분한다. 이 구분은 정보의
중요도나 색상의 강도가 아니라, 현재 맥락 안에서 Surface가 중첩된 위치를
나타낸다.

## Base

Base는 현재 화면이나 독립된 맥락의 기준이 되는 Surface다. 다른 Surface의
위치는 Base를 기준으로 판단한다.

Base는 특정한 색상값을 뜻하지 않는다. 테마에 따라 실제 값이 달라져도 현재
맥락의 기준이라는 의미는 유지한다.

## Layer 1

Layer 1은 Base 안에서 처음으로 구분한 Surface다. 같은 Base 안에서 나란히
존재하는 Surface는 같은 Layer 1에 속한다.

## Layer 2

Layer 2는 Layer 1 안에서 다시 구분한 Surface다. Layer 2는 Layer 1을 거치지
않고 Base 위에 바로 사용하지 않는다.

## 사용 규칙

```text
Base
└─ Layer 1
   └─ Layer 2
```

- Layer의 숫자는 정보의 중요도나 색상의 강도를 뜻하지 않는다.
- 같은 부모 Surface에 속한 형제 Surface는 같은 Layer를 사용한다.
- 구현 구조가 중첩되었다는 이유만으로 다음 Layer를 사용하지 않는다. 새로운
  정보 경계를 Surface로 구분할 때만 Layer를 추가한다.
- 새로운 독립된 맥락이 시작되면 Base부터 Surface 관계를 다시 구성할 수 있다.
- 필요한 정보 관계를 더 단순한 구조로 충분히 설명할 수 있다면 불필요한 Layer를
  만들지 않는다.

## 색상 관계

Base, Layer 1과 Layer 2의 실제 색상값은 서로 다를 수 있다. 다만 하나의 테마
안에서는 모든 Surface가 동일한 Content Foreground 집합과 명암 방향을 공유할 수
있어야 한다.

Surface 사이의 색상 차이는 정보의 경계를 드러낼 수 있지만, Content Foreground를
밝은 색에서 어두운 색으로 반전해야 할 정도로 커서는 안 된다. 새로운 Base가
시작되더라도 같은 테마 안에서는 이 명암 방향을 변경하지 않는다.

Light Theme과 Dark Theme처럼 테마 전체에서 Surface와 Content Foreground의 명암
방향을 함께 변경하는 것은 허용한다.

Surface와 Content Foreground의 조합 규칙은
[Foreground](foreground.md)에서 정의한다.

## 확장

Terra는 공통 Surface를 `Base`, `Layer 1`, `Layer 2`로 시작한다. 더 깊은
Surface 중첩이 반복적으로 필요하면 같은 규칙에 따라 `Layer 3`, `Layer 4`로
확장할 수 있다.

새로운 Layer는 단순히 더 많은 색상 선택지를 제공하기 위해 추가하지 않는다.
기존 Layer만으로 표현할 수 없는 중첩 구조가 확인될 때 추가한다.

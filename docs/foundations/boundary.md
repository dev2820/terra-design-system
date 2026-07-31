# Boundary

Boundary는 요소나 정보 단위의 경계를 선으로 드러내는 구조적 표현이다.
Boundary를 사용해도 새로운 Surface나 Elevation이 생기지 않는다.

## 역할

Terra는 Boundary의 역할을 `Enclosure`와 `Separation`으로 구분한다.

### Enclosure

Enclosure는 하나의 요소나 정보 영역이 어디까지인지 둘러싸서 보여준다. 경계
안의 내용을 하나의 단위로 인식하거나 입력 요소와 같은 조작 범위를 식별해야
할 때 사용한다.

### Separation

Separation은 같은 맥락 안에서 인접한 정보나 요소를 나눈다. 목록의 항목, 표의
행과 열처럼 Surface를 새로 만들지 않고 단위 사이의 구분을 드러낼 때 사용한다.

Enclosure와 Separation은 선의 방향이나 길이가 아니라 전달하는 역할로
구분한다. Border와 Divider 같은 구체적인 형태는 Recipe에서 결정한다.

## 범위

다음 의미는 Boundary가 소유하지 않는다.

- Focus와 Selected 같은 State
- Danger와 Error 같은 상태나 결과
- Link의 상호작용 가능성
- Timeline과 Tree 같은 Pattern의 연결 관계

이 의미를 소유한 State와 Recipe는 Boundary를 표현 자원으로 사용할 수 있지만,
그 의미가 Boundary의 새로운 역할이나 Tone이 되지는 않는다.

장식용 선은 Terra의 공통 Boundary에 포함하지 않는다. 제품에서 장식적인 선이
필요하면 제품 범위의 표현으로 확장한다.

## Surface와의 관계

새로운 정보 맥락이 시작되면 Surface의 다음 Layer를 사용하고, 같은 Surface
안에서 요소의 범위나 인접한 단위만 구분하려면 Boundary를 사용한다.

간격이나 Layer의 색상 차이만으로 정보 관계와 범위를 충분히 이해할 수 있다면
Boundary를 추가하지 않는다. Layer의 경계가 충분히 식별되지 않을 때에는
Boundary로 외곽을 보강할 수 있지만 Surface의 중첩 단계는 바뀌지 않는다.

같은 관계를 설명하는 Boundary가 맞닿거나 겹치면 하나의 표현으로 공유한다.

## 강도

Terra는 Boundary의 강도를 `Subtle`과 `Default`로 구분한다.

```text
Subtle < Default
```

Subtle은 반복되는 구분이 지나치게 눈에 띄지 않아야 할 때 사용한다. Default는
요소의 범위나 Surface 사이의 경계를 더 분명하게 식별해야 할 때 사용한다.

강도는 정보의 중요도나 상태를 뜻하지 않는다. Enclosure와 Separation도 특정
강도에 고정하지 않으며, Recipe가 경계를 얼마나 분명하게 보여줘야 하는지에
따라 선택한다.

## 표현

공통 Boundary는 Neutral Tone과 Solid Style만 제공한다. 모든 Boundary는 하나의
동일한 Width를 사용하며, Subtle과 Default의 강도 차이는 Surface와의 색상
대비로만 표현한다.

Base, Layer 1과 Layer 2는 같은 Boundary 집합과 Width를 공유한다.

실제 색상과 Width 값은 Token과 Theme에서 정한다.

## 접근성

Subtle과 Default는 모든 공식 Surface에서 경계로 식별할 수 있어야 한다.
Subtle은 Default보다 약하지만 경계를 인식할 수 없을 정도로 흐려져서는 안 되며,
Default는 같은 Surface에서 Subtle보다 분명해야 한다.

Theme이나 Token 값을 변경하면 이 관계와 요소의 범위나 정보 단위를 구분할 수
있는지를 다시 확인한다. 컴포넌트와 Pattern은 Boundary가 실제로 사용되는
맥락에서 최종 결과를 검증한다.

## 확장

Terra는 공통 Boundary에 `Strong`, 다른 Width와 Dashed·Dotted 등의 Style을
미리 제공하지 않는다. 반복되는 제품 요구가 확인되면 제품 범위에서 추가할 수
있으며, 공통 Boundary의 역할과 `Subtle < Default` 관계를 변경하지 않는다.

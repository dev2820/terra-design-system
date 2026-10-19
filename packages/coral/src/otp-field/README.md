# OTP Field

숫자·영문·영숫자 인증번호를 자리별 입력으로 조합하는 Headless 컴포넌트다. 상태, 입력 분배,
포커스 이동과 접근성 연결을 제공하며 스타일은 제품이 정한다.

## 사용법

```tsx
import { OtpField } from "@coral/react/otp-field";

<OtpField.Root length={6} name="code" required>
  <OtpField.Label>인증번호</OtpField.Label>
  <OtpField.Control>
    <OtpField.Input index={0} aria-label="인증번호 6자리 중 1번째" />
    <OtpField.Input index={1} aria-label="인증번호 6자리 중 2번째" />
    <OtpField.Input index={2} aria-label="인증번호 6자리 중 3번째" />
    <OtpField.Separator>−</OtpField.Separator>
    <OtpField.Input index={3} aria-label="인증번호 6자리 중 4번째" />
    <OtpField.Input index={4} aria-label="인증번호 6자리 중 5번째" />
    <OtpField.Input index={5} aria-label="인증번호 6자리 중 6번째" />
  </OtpField.Control>
  <OtpField.HiddenInput />
</OtpField.Root>;
```

루트 import인 `import { OtpField } from "@coral/react"`도 지원한다. 일반 HTML
요소로 입력을 더 묶을 수 있다. `index`는 0부터 시작하며 각 자리에 하나씩
배치한다. 시각적인 순서와 index 순서를 일치시킨다.

## Parts

| Part        | 요소                            | 책임                                                             |
| ----------- | ------------------------------- | ---------------------------------------------------------------- |
| Root        | div                             | 자리별 값, 제어·비제어 상태와 공통 설정을 소유한다.              |
| Label       | label                           | 첫 입력을 가리키며 Control의 접근 가능한 이름을 제공한다.        |
| Control     | div                             | 입력 묶음에 group 역할, 이름과 설명을 제공한다.                  |
| Input       | input type=text                 | index에 해당하는 한 자리를 입력하고 포커스를 이동한다.           |
| HiddenInput | 시각적으로 숨긴 input type=text | 전체 값을 Form에 제출하고 네이티브 검증과 Field 연결을 담당한다. |
| Separator   | span                            | 제품이 지정한 시각적인 구분자를 표시하며 보조 기술에서 숨긴다.   |

`HiddenInput`은 제품이 명시적으로 배치한다. `type="hidden"`은 제약 검증에
참여하지 않으므로 시각적으로 숨긴 텍스트 입력을 사용한다. 탭 순서와 접근성
트리에서 제외하고, 라벨이나 폼 검증이 이 입력에 포커스를 주면 표시된 입력으로
이동한다. 각 Input에는 name을 주지 않으므로 FormData에는 전체 문자열 하나만
포함된다. `form`은 Root에 전달해 외부 Form과 연결할 수 있다.

Separator는 `render`로 다른 비상호작용 요소와 합성할 수 있다. Props, Ref와
이벤트를 합성하며 `aria-hidden="true"`와 상태 표식을 유지한다.
예를 들어 `<OtpField.Separator render={<div />}>−</OtpField.Separator>`로 사용한다.
그 외 Part는 네이티브 요소와 구조의 계약을 유지하며 `render`를 제공하지 않는다.
각 Part의 Ref는 해당 DOM 요소에 연결된다.

## 값과 상태

- Root의 `length`는 양의 안전한 정수이며 기본값은 6이다.
- `value`와 `defaultValue`는 자리별 문자열 배열이다. 빈 자리는 `""`로 표현한다.
  삭제해도 뒤의 값이 앞으로 이동하지 않는다. 짧은 배열은 빈 자리로 채운다.
- `onValueChange(value, details)`는 다음 배열과 변경 이유를 전달한다. 이유는
  `input-change`, `input-paste`, `keyboard`다. `details.cancel()`로 변경을 취소한다.
- `onValueComplete(value, details)`는 사용자 입력으로 모든 자리가 채워진 값이
  실제 상태에 반영되면 호출한다. 초기값, 외부 value 변경과 폼 초기화는 호출하지
  않는다. 완료 후 다른 문자로 수정하면 다시 호출한다. 자동 제출은 하지 않는다.
  제어 모드에서는 부모가 `onValueChange`에서 값을 동기적으로 반영해야 한다.
  부모가 값을 반영하지 않으면 완료 요청을 폐기하며, 나중의 외부 값 변경은 완료 알림을 보내지 않는다.
- `validationType`은 기본값 `"numeric"`에서 ASCII 0–9를 허용한다.
  `"alphabet"`은 ASCII A–Z, a–z를 허용하고 `"alphanumeric"`은 숫자도 함께 허용한다.
  영문 대소문자는 그대로 보존한다.
  직접 입력, 초기값, 제어 값, 붙여넣기와 HiddenInput의 pattern에 같은 규칙을 적용한다.
  유효하지 않은 입력은 거부한다. 붙여넣기와
  여러 문자 입력에서 공백은 제거하며 최대 length까지만 사용한다.
- 허용하지 않는 초기값과 외부 값은 해당 자리를 비운다. length를 넘는 자리는
  사용하지 않는다. Form에는 빈 자리를 제외한 문자열을 전달하며 완료 여부는
  자리별 상태와 pattern으로 검사한다.
- `disabled`, `readOnly`, `required`, `invalid`, `name`, `form`은 Root에서 설정한다.
  Field와 Coral Fieldset의 disabled 상태도 상속한다.
- 폼 초기화는 비제어 값을 defaultValue로 복원한다. 제어 값은 제품이 관리한다.
  reset 이벤트를 취소하면 값을 복원하지 않는다. 초기화는 변경 콜백을 호출하지 않는다.
- `data-complete`, `data-disabled`, `data-readonly`, `data-required`, `data-invalid`를
  상태가 성립하는 Part에 제공한다.

```tsx
const [value, setValue] = React.useState<string[]>([]);

<OtpField.Root value={value} onValueChange={setValue} length={4}>
  <OtpField.Label>인증번호</OtpField.Label>
  <OtpField.Control>
    {Array.from({ length: 4 }, (_, index) => (
      <OtpField.Input key={index} index={index} aria-label={`인증번호 ${index + 1}번째 자리`} />
    ))}
  </OtpField.Control>
  <OtpField.HiddenInput />
</OtpField.Root>;
```

영문 코드는 Root에 `validationType="alphabet"`을 지정한다.
영숫자 코드는 `validationType="alphanumeric"`을 지정한다.

```tsx
<OtpField.Root length={4} validationType="alphanumeric" name="recoveryCode" required>
  <OtpField.Label>복구 코드</OtpField.Label>
  <OtpField.Control>
    {Array.from({ length: 4 }, (_, index) => (
      <OtpField.Input key={index} index={index} aria-label={`복구 코드 ${index + 1}번째 자리`} />
    ))}
  </OtpField.Control>
  <OtpField.HiddenInput />
</OtpField.Root>
```

## 입력과 포커스

- 허용한 문자를 입력하면 현재 자리를 교체하고 다음 입력으로 이동한다. 마지막 입력은
  포커스를 유지한다. 포커스를 받은 입력은 기존 문자를 선택한다.
- 왼쪽·오른쪽 방향키는 이전·다음 입력으로 이동한다. Home과 End는 첫·마지막
  입력으로 이동한다. Tab과 Shift+Tab은 네이티브 순서를 따른다.
- Backspace는 현재 문자를 지운다. 현재 자리가 비었으면 이전 문자를 지우고
  이전 입력으로 이동한다. Delete는 현재 문자를 지우고 포커스를 유지한다.
- 붙여넣은 값은 현재 자리부터 분배한다. 전체 길이 이상의 값은 첫 자리부터
  교체한다. 브라우저가 자동완성으로 전달하는 여러 문자도 같은 방식으로 분배한다.
- 제품의 Input 이벤트 핸들러가 preventDefault를 호출하면 해당 입력 처리를 취소한다.

inputMode는 숫자 모드에서 numeric, 영문·영숫자 모드에서 text를 사용한다. 기본
autoCapitalize는 none이며 첫 Input은 autoComplete="one-time-code"를 사용한다.
자동완성은 브라우저와 운영체제에 따라 달라지므로 실제 SMS 자동완성은 지원
환경에서 확인해야 한다. 각 자리의 네이티브 입력 힌트 Prop도 지정할 수 있다.

## Field와 접근성

```tsx
<Field.Root name="code" validationMode="onBlur">
  <Field.Label>인증번호</Field.Label>
  <OtpField.Root length={6} required>
    <OtpField.Control>
      {Array.from({ length: 6 }, (_, index) => (
        <OtpField.Input key={index} index={index} aria-label={`인증번호 ${index + 1}번째 자리`} />
      ))}
    </OtpField.Control>
    <OtpField.HiddenInput />
  </OtpField.Root>
  <Field.Description>문자로 받은 6자리 숫자를 입력해 주세요.</Field.Description>
  <Field.Error>6자리 숫자를 입력해 주세요.</Field.Error>
</Field.Root>
```

Field의 라벨, 설명, 오류 ID와 invalid 상태를 입력 묶음과 각 입력에 연결한다.
자리 사이의 포커스 이동은 Field를 blur 처리하지 않는다. 제품은 각 자리의
순서를 알 수 있도록 현지화한 aria-label을 제공한다. Label을 생략하면 Root에
aria-label 또는 aria-labelledby로 입력 묶음의 이름을 제공한다.

빈 값도 거부하려면 required를 사용한다. 선택 입력에서도 일부만 채운 값은
전체 길이 pattern을 충족하지 못한다. 잘못된 폼 제출은 첫 빈 자리로 포커스를
이동한다. 검증 메시지와 인증 요청은 제품이 제공한다.

## 참고와 명세

- [Ark UI Pin Input](https://ark-ui.com/docs/components/pin-input): 명시적인 Label, Control, Input, HiddenInput 조합과 자리별 값 배열을 참고했다.
- [Base UI OTP Field](https://base-ui.com/react/components/otp-field): 자리별 입력, Separator, 붙여넣기와 키보드 동작을 참고했다.
- [WHATWG: Text state](<https://html.spec.whatwg.org/multipage/input.html#text-(type=text)-state-and-search-state-(type=search)>)
- [WHATWG: Hidden state](<https://html.spec.whatwg.org/multipage/input.html#hidden-state-(type=hidden)>)
- [WHATWG: pattern](https://html.spec.whatwg.org/multipage/input.html#the-pattern-attribute)
- [WHATWG: inputmode](https://html.spec.whatwg.org/multipage/interaction.html#attr-inputmode)
- [WHATWG: autocapitalize](https://html.spec.whatwg.org/multipage/interaction.html#attr-autocapitalize)
- [WHATWG: autocomplete](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls:-the-autocomplete-attribute)

OTP 전용 APG 위젯 패턴을 가정하지 않는다. 보조 기술의 실제 읽기 결과와 SMS
자동완성은 제품의 지원 환경에서 별도로 확인해야 한다.

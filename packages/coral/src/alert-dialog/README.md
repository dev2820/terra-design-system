# AlertDialog

중요한 메시지를 알리고 사용자의 응답을 받는 모달 대화상자다. 포커스 이동·복원,
외부 영역 비활성화와 Scroll Lock을 제공한다. 바깥 영역을 눌러도 닫히지 않는다.
배치, 크기와 배경 효과는 사용처가 제공한다.

```tsx
import * as React from "react";
import { AlertDialog } from "@coral/react/alert-dialog";

function DeleteDialog({ onDelete }: { onDelete: () => void }) {
  const titleId = React.useId();
  const descriptionId = React.useId();

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>항목 삭제</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop className="backdrop" />
        <AlertDialog.Positioner className="positioner">
          <AlertDialog.Content
            className="content"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
          >
            <AlertDialog.Title id={titleId}>항목을 삭제할까요?</AlertDialog.Title>
            <AlertDialog.Description id={descriptionId}>
              삭제한 항목은 복구할 수 없습니다.
            </AlertDialog.Description>
            <AlertDialog.Close>취소</AlertDialog.Close>
            <AlertDialog.Close onClick={onDelete}>삭제</AlertDialog.Close>
          </AlertDialog.Content>
        </AlertDialog.Positioner>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
```

`Content`는 `role="alertdialog"`와 `aria-modal="true"`를 제공한다. 사용처는
`aria-labelledby` 또는 `aria-label`로 이름을 제공하고, `aria-describedby`로 짧은
경고 메시지를 연결한다. Root는 DOM을 만들지 않는다. Trigger, Portal, Backdrop,
Positioner, Content, Header, Title, Description, Body, Footer와 Close는 각각
`render`를 지원한다.

Root는 `open`, `defaultOpen`, `onOpenChange`를 지원한다. 모달 여부는
바꿀 수 없다. Close는 필요한 만큼 사용할 수 있다. 기본 요소는
`<button type="button">`이며 누르면 닫기 요청을 보낸다. 실제 작업은 사용처가
해당 Close의 `onClick`에서 처리한다.
`onOpenChange`의 이벤트 정보와 변경 취소 방식은 Dialog와 같다.

열릴 때 기본 초기 포커스 규칙을 따른다. 일반적으로 첫 번째 Tab 가능
요소로 이동하고, 터치로 열면 가상 키보드를 피하기 위해 Content에 포커스를 둔다.
되돌리기 어려운 작업에서는 취소 버튼을 먼저 배치하거나 `Content.initialFocus`로
취소 버튼을 지정한다. Tab과 Shift+Tab은 모달 안에서 순환한다. Escape는 닫기를
요청하고, 닫힐 때 Trigger 또는 이전 포커스로 복원한다. 바깥 포인터 클릭은 닫기
요청을 만들지 않는다.

## 설계 근거

- [WHATWG dialog](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element):
  네이티브 모달의 외부 비활성화와 닫기 요청 동작을 참고했다. Dialog와 동일한
  배치 구조를 유지하기 위해 `div`와 ARIA 역할을 사용한다.
- [APG Alert Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/):
  모달 동작, 이름, 경고 메시지 연결과 내부 포커스의 기준이다.
- [APG Modal Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/):
  키보드, 포커스 순환·복원과 되돌리기 어려운 작업에서의 초기 포커스 기준이다.

[브라우저 테스트](./alert-dialog.test.tsx)에서 역할과 접근 가능한 이름·설명, 포커스,
바깥 클릭, 닫기 요청, 외부 비활성화, Scroll Lock, render·Ref와 중첩 모달을 검증한다.

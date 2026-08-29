import type { ElementProps, NormalizeProps } from "@bison/core";
import { afterEach, describe, expect, it, vi } from "vitest";
import { userEvent } from "vitest/browser";

import { connect } from "./connect";
import { machine } from "./machine";
import type {
  CarouselActor,
  CarouselApi,
  CarouselProps,
  CarouselPropTypes,
  CarouselRotationApi,
  CarouselState,
} from "./types";

interface TestElementProps {
  id?: string;
  role?: string;
  hidden?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-roledescription"?: string;
  "aria-atomic"?: boolean;
  "aria-live"?: "off" | "polite";
  onFocusCapture?: (event: FocusEvent) => void;
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
}

interface TestButtonProps {
  type?: "button";
  disabled?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-controls"?: string;
  onClick?: () => void;
}

interface TestCarouselPropTypes extends CarouselPropTypes {
  element: TestElementProps;
  button: TestButtonProps;
}

const normalize: NormalizeProps<TestCarouselPropTypes> = {
  element: (props: ElementProps) => props as TestElementProps,
  button: (props: ElementProps) => props as TestButtonProps,
};

const slides = ["first", "second", "third"] as const;
const fixtureRoots: HTMLElement[] = [];
const clickHandlers = new WeakMap<HTMLButtonElement, TestButtonProps["onClick"]>();

afterEach(() => {
  for (const root of fixtureRoots) {
    root.remove();
  }

  fixtureRoots.length = 0;
});

function setOptionalAttribute(element: Element, name: string, value: string | boolean | undefined) {
  if (value === undefined) {
    element.removeAttribute(name);
    return;
  }

  element.setAttribute(name, String(value));
}

function applyElementProps(element: HTMLElement, props: TestElementProps) {
  setOptionalAttribute(element, "id", props.id);
  setOptionalAttribute(element, "role", props.role);
  setOptionalAttribute(element, "aria-label", props["aria-label"]);
  setOptionalAttribute(element, "aria-labelledby", props["aria-labelledby"]);
  setOptionalAttribute(element, "aria-roledescription", props["aria-roledescription"]);
  setOptionalAttribute(element, "aria-atomic", props["aria-atomic"]);
  setOptionalAttribute(element, "aria-live", props["aria-live"]);
  element.hidden = props.hidden ?? false;
}

function applyButtonProps(element: HTMLButtonElement, props: TestButtonProps) {
  element.type = props.type ?? "submit";
  element.disabled = props.disabled ?? false;
  setOptionalAttribute(element, "aria-label", props["aria-label"]);
  setOptionalAttribute(element, "aria-labelledby", props["aria-labelledby"]);
  setOptionalAttribute(element, "aria-controls", props["aria-controls"]);
  clickHandlers.set(element, props.onClick);
}

interface SetupOptions {
  region?: boolean;
  rootName?: { label: string } | { labelledBy: string };
}

function setup(props: CarouselProps = { id: "featured", slides }, options: SetupOptions = {}) {
  const fixtureRoot = document.createElement("div");
  const form = document.createElement("form");
  const heading = document.createElement("h2");
  const root = document.createElement("div");
  const rotationControl = props.autoRotate === true ? document.createElement("button") : undefined;
  const previousTrigger = document.createElement("button");
  const nextTrigger = document.createElement("button");
  const slidesElement = document.createElement("div");
  const trailingButton = document.createElement("button");
  const slideElements = new Map<string, HTMLElement>();
  const slideLinks = new Map<string, HTMLAnchorElement>();
  let state: CarouselState = machine.initial(props);
  let rootEventProps: TestElementProps = {};
  let api: CarouselApi<boolean, TestCarouselPropTypes>;
  let rotation: CarouselRotationApi | undefined;
  let submissionCount = 0;

  heading.id = "featured-heading";
  heading.textContent = "추천 콘텐츠";
  previousTrigger.textContent = "이전";
  nextTrigger.textContent = "다음";
  trailingButton.type = "button";
  trailingButton.textContent = "캐러셀 다음 요소";
  rotationControl?.replaceChildren("자동 회전");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submissionCount += 1;
  });
  root.addEventListener(
    "focus",
    (event) => rootEventProps.onFocusCapture?.(event as FocusEvent),
    true,
  );
  root.addEventListener("pointerenter", () => rootEventProps.onPointerEnter?.());
  root.addEventListener("pointerleave", () => rootEventProps.onPointerLeave?.());
  previousTrigger.addEventListener("click", () => clickHandlers.get(previousTrigger)?.());
  nextTrigger.addEventListener("click", () => clickHandlers.get(nextTrigger)?.());
  rotationControl?.addEventListener("click", () => clickHandlers.get(rotationControl)?.());

  for (const [index, value] of slides.entries()) {
    const slide = document.createElement("section");
    const link = document.createElement("a");

    link.href = `#${value}`;
    link.textContent = `${index + 1}번 링크`;
    slide.append(link);
    slidesElement.append(slide);
    slideElements.set(value, slide);
    slideLinks.set(value, link);
  }

  if (rotationControl) {
    root.append(rotationControl);
  }

  root.append(previousTrigger, nextTrigger, slidesElement);
  form.append(heading, root, trailingButton);
  fixtureRoot.append(form);
  document.body.append(fixtureRoot);
  fixtureRoots.push(fixtureRoot);

  const actor: CarouselActor = {
    getSnapshot: () => ({ props, state }),
    send(event) {
      state = machine.transition(state, event, props);
      render();
    },
  };

  function render() {
    api = connect(actor, normalize);
    const rootName = options.rootName ?? { label: "추천 콘텐츠" };
    const rootProps = api.getRootProps({
      ...rootName,
      roleDescription: "캐러셀",
      ...(options.region === undefined ? {} : { region: options.region }),
    });

    rootEventProps = rootProps;
    applyElementProps(root, rootProps);
    applyElementProps(slidesElement, api.getSlidesProps());
    applyButtonProps(previousTrigger, api.getPreviousTriggerProps({ label: "이전 슬라이드" }));
    applyButtonProps(nextTrigger, api.getNextTriggerProps({ label: "다음 슬라이드" }));

    for (const [index, value] of slides.entries()) {
      const slide = slideElements.get(value);

      if (!slide) {
        throw new Error(`Slide를 찾을 수 없습니다: ${value}`);
      }

      applyElementProps(
        slide,
        api.getSlideProps({
          value,
          label: `${index + 1} / ${slides.length}`,
          roleDescription: "슬라이드",
        }),
      );
    }

    if (props.autoRotate === true && rotationControl) {
      const autoRotateApi = api as CarouselApi<true, TestCarouselPropTypes>;

      rotation = autoRotateApi.rotation;
      applyButtonProps(
        rotationControl,
        autoRotateApi.getRotationControlProps({
          startLabel: "자동 회전 시작",
          stopLabel: "자동 회전 정지",
        }),
      );
    }
  }

  render();

  function getSlide(value: string) {
    const slide = slideElements.get(value);

    if (!slide) {
      throw new Error(`Slide를 찾을 수 없습니다: ${value}`);
    }

    return slide;
  }

  function getSlideLink(value: string) {
    const link = slideLinks.get(value);

    if (!link) {
      throw new Error(`Slide Link를 찾을 수 없습니다: ${value}`);
    }

    return link;
  }

  return {
    form,
    getSlide,
    getSlideLink,
    heading,
    nextTrigger,
    previousTrigger,
    root,
    rotationControl,
    slidesElement,
    trailingButton,
    get submissionCount() {
      return submissionCount;
    },
    get value() {
      return api.value;
    },
    get rotation() {
      return rotation;
    },
    setValue(value: string) {
      api.setValue(value);
    },
    tick() {
      rotation?.tick();
    },
  };
}

describe("Carousel", () => {
  describe("connect", () => {
    describe("html", () => {
      it("이전과 다음 Control을 button으로 만들어 form을 제출하지 않는다", async () => {
        const fixture = setup();

        await userEvent.click(fixture.nextTrigger);
        await userEvent.click(fixture.previousTrigger);

        expect(fixture.nextTrigger.type).toBe("button");
        expect(fixture.previousTrigger.type).toBe("button");
        expect(fixture.submissionCount).toBe(0);
      });

      it("현재 Slide만 표시한다", () => {
        const fixture = setup();

        expect(fixture.getSlide("first").hidden).toBe(false);
        expect(fixture.getSlide("second").hidden).toBe(true);
        expect(fixture.getSlide("third").hidden).toBe(true);
      });

      it("loop가 true이면 다음과 이전 Control로 Slide를 순환한다", async () => {
        const fixture = setup({ id: "featured", slides, loop: true });

        await userEvent.click(fixture.previousTrigger);
        expect(fixture.value).toBe("third");

        await userEvent.click(fixture.nextTrigger);
        expect(fixture.value).toBe("first");
      });

      it("loop가 false이면 양쪽 경계의 Trigger를 native disabled로 설정한다", async () => {
        const fixture = setup();

        expect(fixture.previousTrigger.disabled).toBe(true);
        expect(fixture.nextTrigger.disabled).toBe(false);

        await userEvent.click(fixture.nextTrigger);
        await userEvent.click(fixture.nextTrigger);

        expect(fixture.value).toBe("third");
        expect(fixture.previousTrigger.disabled).toBe(false);
        expect(fixture.nextTrigger.disabled).toBe(true);
        expect(fixture.nextTrigger.hasAttribute("aria-disabled")).toBe(false);
      });

      it("loop가 true이면 경계의 Trigger를 활성 상태로 유지한다", () => {
        const first = setup({ id: "first", slides, loop: true });
        const last = setup({ id: "last", slides, value: "third", loop: true });

        expect(first.previousTrigger.disabled).toBe(false);
        expect(last.nextTrigger.disabled).toBe(false);
      });

      it("controlled value에 해당하는 Slide를 표시한다", () => {
        const fixture = setup({ id: "featured", slides, value: "second" });

        expect(fixture.getSlide("first").hidden).toBe(true);
        expect(fixture.getSlide("second").hidden).toBe(false);
      });

      it("외부에서 현재 Slide를 설정한다", () => {
        const fixture = setup();

        fixture.setValue("second");

        expect(fixture.getSlide("second").hidden).toBe(false);
      });

      it("숨긴 Slide의 링크를 Tab 순서에서 제외한다", async () => {
        const fixture = setup();

        fixture.getSlideLink("first").focus();
        await userEvent.tab();

        expect(document.activeElement).toBe(fixture.trailingButton);
      });
    });

    describe("accessibility", () => {
      it("Carousel을 이름과 설명이 있는 group으로 노출한다", () => {
        const fixture = setup();

        expect(fixture.root.getAttribute("role")).toBe("group");
        expect(fixture.root.getAttribute("aria-label")).toBe("추천 콘텐츠");
        expect(fixture.root.getAttribute("aria-roledescription")).toBe("캐러셀");
      });

      it("요청하면 Carousel을 이름이 있는 region으로 노출한다", () => {
        const fixture = setup(
          { id: "featured", slides },
          { region: true, rootName: { labelledBy: "featured-heading" } },
        );

        expect(fixture.root.getAttribute("role")).toBe("region");
        expect(fixture.root.getAttribute("aria-labelledby")).toBe(fixture.heading.id);
        expect(fixture.root.hasAttribute("aria-label")).toBe(false);
      });

      it("각 Slide를 이름과 설명이 있는 group으로 노출한다", () => {
        const fixture = setup();
        const firstSlide = fixture.getSlide("first");

        expect(firstSlide.getAttribute("role")).toBe("group");
        expect(firstSlide.getAttribute("aria-label")).toBe("1 / 3");
        expect(firstSlide.getAttribute("aria-roledescription")).toBe("슬라이드");
      });

      it("이전과 다음 Control을 실제 Slide container에 연결한다", () => {
        const fixture = setup();

        expect(fixture.previousTrigger.getAttribute("aria-controls")).toBe(
          fixture.slidesElement.id,
        );
        expect(fixture.nextTrigger.getAttribute("aria-controls")).toBe(fixture.slidesElement.id);
        expect(document.getElementById(fixture.slidesElement.id)).toBe(fixture.slidesElement);
      });

      it("수동 Carousel의 변경을 polite live region으로 알린다", () => {
        const fixture = setup();

        expect(fixture.slidesElement.getAttribute("aria-live")).toBe("polite");
        expect(fixture.slidesElement.getAttribute("aria-atomic")).toBe("false");
        expect(fixture.rotationControl).toBeUndefined();
      });

      it("자동 회전 중에는 live region을 끈다", () => {
        const fixture = setup({
          id: "featured",
          slides,
          autoRotate: true,
          defaultPlaying: true,
        });

        expect(fixture.rotation?.shouldRotate).toBe(true);
        expect(fixture.slidesElement.getAttribute("aria-live")).toBe("off");
      });

      it("Focus가 들어오면 자동 회전과 tick을 지속해서 멈춘다", async () => {
        const fixture = setup({
          id: "featured",
          slides,
          autoRotate: true,
          defaultPlaying: true,
        });

        await userEvent.click(fixture.nextTrigger);
        const valueAfterFocus = fixture.value;
        fixture.tick();
        fixture.trailingButton.focus();
        fixture.tick();

        expect(fixture.value).toBe(valueAfterFocus);
        expect(fixture.rotation?.paused.focus).toBe(true);
        expect(fixture.rotation?.shouldRotate).toBe(false);
        expect(fixture.slidesElement.getAttribute("aria-live")).toBe("polite");
      });

      it("Carousel 내부의 Focus 이동은 새 일시정지를 만들지 않는다", async () => {
        const fixture = setup({
          id: "featured",
          slides,
          autoRotate: true,
          defaultPlaying: true,
        });

        fixture.previousTrigger.focus();
        await userEvent.click(fixture.rotationControl!);
        await userEvent.unhover(fixture.root);
        fixture.nextTrigger.focus();

        expect(fixture.rotation?.paused.focus).toBe(false);
        expect(fixture.rotation?.shouldRotate).toBe(true);
      });

      it("Hover 중 자동 회전을 멈추고 떠나면 다시 허용한다", () => {
        const fixture = setup({
          id: "featured",
          slides,
          autoRotate: true,
          defaultPlaying: true,
        });

        fixture.root.dispatchEvent(new PointerEvent("pointerenter"));
        fixture.tick();

        expect(fixture.value).toBe("first");
        expect(fixture.rotation?.paused.hover).toBe(true);
        expect(fixture.slidesElement.getAttribute("aria-live")).toBe("polite");

        fixture.root.dispatchEvent(new PointerEvent("pointerleave"));
        fixture.tick();

        expect(fixture.value).toBe("second");
        expect(fixture.rotation?.paused.hover).toBe(false);
        expect(fixture.slidesElement.getAttribute("aria-live")).toBe("off");
      });

      it("Rotation Control은 상태에 맞는 동작 이름을 제공하고 aria-pressed를 쓰지 않는다", async () => {
        const fixture = setup({
          id: "featured",
          slides,
          autoRotate: true,
          defaultPlaying: true,
        });
        const rotationControl = fixture.rotationControl!;

        expect(rotationControl.getAttribute("aria-label")).toBe("자동 회전 정지");
        expect(rotationControl.hasAttribute("aria-pressed")).toBe(false);
        expect(rotationControl.getAttribute("aria-controls")).toBe(fixture.slidesElement.id);

        rotationControl.focus();
        expect(rotationControl.getAttribute("aria-label")).toBe("자동 회전 시작");

        await userEvent.click(rotationControl);
        expect(rotationControl.getAttribute("aria-label")).toBe("자동 회전 정지");
        expect(fixture.rotation?.paused.hover).toBe(true);
        await userEvent.unhover(fixture.root);
        expect(fixture.rotation?.shouldRotate).toBe(true);

        await userEvent.click(rotationControl);
        expect(rotationControl.getAttribute("aria-label")).toBe("자동 회전 시작");
        expect(fixture.rotation?.playing).toBe(false);
      });

      it("재생 상태와 Slide 변경을 각각 알린다", async () => {
        const onPlayingChange = vi.fn();
        const onValueChange = vi.fn();
        const fixture = setup({
          id: "featured",
          slides,
          autoRotate: true,
          onPlayingChange,
          onValueChange,
        });

        await userEvent.click(fixture.rotationControl!);
        await userEvent.unhover(fixture.root);
        fixture.tick();

        expect(onPlayingChange).toHaveBeenCalledWith(true);
        expect(onValueChange).toHaveBeenCalledWith("second");
      });
    });

    describe("keyboard", () => {
      it.skip("Enter와 Space로 Carousel Control을 활성화한다", () => {
        // 네이티브 <button>이 보장하는 동작이므로 Bison에서는 테스트하지 않는다.
      });

      it.skip("Tab으로 Carousel Control과 현재 Slide의 대화형 요소를 탐색한다", () => {
        // 네이티브 <button>, <a>와 hidden 속성이 보장하는 동작이므로 Bison에서는 테스트하지 않는다.
      });
    });
  });
});

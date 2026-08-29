import { describe, expect, it, vi } from "vitest";

import type { CarouselProps } from "./index";
import { machine } from "./machine";

const slides = ["first", "second", "third"] as const;

describe("Carousel", () => {
  describe("machine", () => {
    it("첫 번째 Slide로 시작한다", () => {
      expect(machine.initial({ id: "featured", slides })).toMatchObject({ value: "first" });
    });

    it("유효한 defaultValue로 시작한다", () => {
      expect(machine.initial({ id: "featured", slides, defaultValue: "second" })).toMatchObject({
        value: "second",
      });
    });

    it("유효하지 않은 defaultValue는 첫 번째 Slide로 대체한다", () => {
      expect(machine.initial({ id: "featured", slides, defaultValue: "missing" })).toMatchObject({
        value: "first",
      });
    });

    it("loop가 false이면 마지막 Slide에서 다음 이동을 무시한다", () => {
      const onValueChange = vi.fn();
      const props = {
        id: "featured",
        slides,
        defaultValue: "third",
        onValueChange,
      } satisfies CarouselProps;
      const state = machine.initial(props);

      expect(machine.transition(state, { type: "slide.next" }, props)).toBe(state);
      expect(onValueChange).not.toHaveBeenCalled();
    });

    it("loop가 false이면 첫 번째 Slide에서 이전 이동을 무시한다", () => {
      const onValueChange = vi.fn();
      const props = { id: "featured", slides, onValueChange } satisfies CarouselProps;
      const state = machine.initial(props);

      expect(machine.transition(state, { type: "slide.previous" }, props)).toBe(state);
      expect(onValueChange).not.toHaveBeenCalled();
    });

    it("loop가 true이면 양쪽 경계에서 순환한다", () => {
      const nextProps = {
        id: "next",
        slides,
        defaultValue: "third",
        loop: true,
      } satisfies CarouselProps;
      const previousProps = { id: "previous", slides, loop: true } satisfies CarouselProps;

      expect(
        machine.transition(machine.initial(nextProps), { type: "slide.next" }, nextProps),
      ).toMatchObject({ value: "first" });
      expect(
        machine.transition(
          machine.initial(previousProps),
          { type: "slide.previous" },
          previousProps,
        ),
      ).toMatchObject({ value: "third" });
    });

    it("controlled value를 기준으로 이동한다", () => {
      const props = { id: "featured", slides, value: "second" } satisfies CarouselProps;
      const state = machine.initial(props);

      expect(machine.transition(state, { type: "slide.next" }, props)).toMatchObject({
        value: "third",
      });
    });

    it("외부에서 유효한 Slide를 설정하고 변경을 알린다", () => {
      const onValueChange = vi.fn();
      const props = { id: "featured", slides, onValueChange } satisfies CarouselProps;
      const state = machine.initial(props);

      const nextState = machine.transition(state, { type: "slide.set", value: "second" }, props);

      expect(nextState).toMatchObject({ value: "second" });
      expect(onValueChange).toHaveBeenCalledOnce();
      expect(onValueChange).toHaveBeenCalledWith("second");
    });

    it("같거나 유효하지 않은 Slide 설정을 무시한다", () => {
      const onValueChange = vi.fn();
      const props = { id: "featured", slides, onValueChange } satisfies CarouselProps;
      const state = machine.initial(props);

      expect(machine.transition(state, { type: "slide.set", value: "first" }, props)).toBe(state);
      expect(machine.transition(state, { type: "slide.set", value: "missing" }, props)).toBe(state);
      expect(onValueChange).not.toHaveBeenCalled();
    });

    it("수동 Carousel에서는 자동 회전 event를 무시한다", () => {
      const props = { id: "featured", slides } satisfies CarouselProps;
      const state = machine.initial(props);

      expect(machine.transition(state, { type: "rotation.tick" }, props)).toBe(state);
      expect(machine.transition(state, { type: "rotation.toggle" }, props)).toBe(state);
      expect(machine.transition(state, { type: "root.focus.enter" }, props)).toBe(state);
      expect(machine.transition(state, { type: "root.hover.enter" }, props)).toBe(state);
    });

    it("자동 회전은 기본적으로 정지하고 defaultPlaying을 지원한다", () => {
      expect(machine.initial({ id: "stopped", slides, autoRotate: true })).toMatchObject({
        playing: false,
      });
      expect(
        machine.initial({ id: "playing", slides, autoRotate: true, defaultPlaying: true }),
      ).toMatchObject({ playing: true });
    });

    it("재생 중 tick을 받으면 다음 Slide로 이동한다", () => {
      const props = {
        id: "featured",
        slides,
        autoRotate: true,
        defaultPlaying: true,
      } satisfies CarouselProps;
      const state = machine.initial(props);

      expect(machine.transition(state, { type: "rotation.tick" }, props)).toMatchObject({
        value: "second",
      });
    });

    it("loop가 false이면 마지막 Slide를 표시한 뒤 자동 회전을 종료한다", () => {
      const onPlayingChange = vi.fn();
      const props = {
        id: "featured",
        slides,
        defaultValue: "second",
        autoRotate: true,
        defaultPlaying: true,
        onPlayingChange,
      } satisfies CarouselProps;
      const state = machine.initial(props);

      expect(machine.transition(state, { type: "rotation.tick" }, props)).toMatchObject({
        value: "third",
        playing: false,
      });
      expect(onPlayingChange).toHaveBeenCalledWith(false);
    });

    it("controlled value가 마지막 Slide로 향할 때도 자동 회전 종료를 알린다", () => {
      const onPlayingChange = vi.fn();
      const onValueChange = vi.fn();
      const props = {
        id: "featured",
        slides,
        value: "second",
        autoRotate: true,
        playing: true,
        onPlayingChange,
        onValueChange,
      } satisfies CarouselProps;
      const state = machine.initial(props);

      machine.transition(state, { type: "rotation.tick" }, props);

      expect(onValueChange).toHaveBeenCalledWith("third");
      expect(onPlayingChange).toHaveBeenCalledWith(false);
    });

    it("loop가 true이면 마지막 Slide 이후에도 자동 회전을 계속한다", () => {
      const props = {
        id: "featured",
        slides,
        defaultValue: "third",
        loop: true,
        autoRotate: true,
        defaultPlaying: true,
      } satisfies CarouselProps;
      const state = machine.initial(props);

      expect(machine.transition(state, { type: "rotation.tick" }, props)).toMatchObject({
        value: "first",
        playing: true,
      });
    });

    it("종료된 자동 회전을 다시 시작하면 첫 번째 Slide에서 재생한다", () => {
      const props = {
        id: "featured",
        slides,
        defaultValue: "third",
        autoRotate: true,
      } satisfies CarouselProps;
      const state = machine.initial(props);

      expect(machine.transition(state, { type: "rotation.toggle" }, props)).toMatchObject({
        value: "first",
        playing: true,
      });
    });

    it("Focus가 들어오면 회전을 지속해서 일시정지한다", () => {
      const props = {
        id: "featured",
        slides,
        autoRotate: true,
        defaultPlaying: true,
      } satisfies CarouselProps;
      const state = machine.initial(props);
      const pausedState = machine.transition(state, { type: "root.focus.enter" }, props);

      expect(pausedState).toMatchObject({ playing: true, focusPaused: true });
      expect(machine.transition(pausedState, { type: "rotation.tick" }, props)).toBe(pausedState);
    });

    it("명시적으로 다시 재생하면 Focus 일시정지를 해제한다", () => {
      const props = {
        id: "featured",
        slides,
        autoRotate: true,
        defaultPlaying: true,
      } satisfies CarouselProps;
      const state = machine.initial(props);
      const pausedState = machine.transition(state, { type: "root.focus.enter" }, props);

      expect(machine.transition(pausedState, { type: "rotation.toggle" }, props)).toMatchObject({
        playing: true,
        focusPaused: false,
      });
    });

    it("Hover 중 회전을 일시정지하고 떠나면 다시 허용한다", () => {
      const props = {
        id: "featured",
        slides,
        autoRotate: true,
        defaultPlaying: true,
      } satisfies CarouselProps;
      const state = machine.initial(props);
      const pausedState = machine.transition(state, { type: "root.hover.enter" }, props);

      expect(pausedState).toMatchObject({ playing: true, hoverPaused: true });
      expect(machine.transition(pausedState, { type: "rotation.tick" }, props)).toBe(pausedState);
      expect(machine.transition(pausedState, { type: "root.hover.leave" }, props)).toMatchObject({
        playing: true,
        hoverPaused: false,
      });
    });

    it("Focus를 다시 재생해도 Hover 중에는 회전을 계속 막는다", () => {
      const props = {
        id: "featured",
        slides,
        autoRotate: true,
        defaultPlaying: true,
      } satisfies CarouselProps;
      const state = machine.initial(props);
      const focusPaused = machine.transition(state, { type: "root.focus.enter" }, props);
      const bothPaused = machine.transition(focusPaused, { type: "root.hover.enter" }, props);
      const focusResumed = machine.transition(bothPaused, { type: "rotation.toggle" }, props);

      expect(focusResumed).toMatchObject({ focusPaused: false, hoverPaused: true });
      expect(machine.transition(focusResumed, { type: "rotation.tick" }, props)).toBe(focusResumed);
    });

    it("회전 Control로 재생 상태를 바꾸고 변경을 알린다", () => {
      const onPlayingChange = vi.fn();
      const props = {
        id: "featured",
        slides,
        autoRotate: true,
        defaultPlaying: true,
        onPlayingChange,
      } satisfies CarouselProps;
      const state = machine.initial(props);

      const stoppedState = machine.transition(state, { type: "rotation.toggle" }, props);

      expect(stoppedState).toMatchObject({ playing: false });
      expect(onPlayingChange).toHaveBeenCalledOnce();
      expect(onPlayingChange).toHaveBeenCalledWith(false);
    });

    it("controlled playing을 기준으로 회전 Control을 전환한다", () => {
      const onPlayingChange = vi.fn();
      const props = {
        id: "featured",
        slides,
        autoRotate: true,
        playing: false,
        onPlayingChange,
      } satisfies CarouselProps;
      const state = machine.initial(props);

      machine.transition(state, { type: "rotation.toggle" }, props);

      expect(onPlayingChange).toHaveBeenCalledWith(true);
    });

    it("Focus와 Hover 일시정지는 재생 상태 변경으로 알리지 않는다", () => {
      const onPlayingChange = vi.fn();
      const props = {
        id: "featured",
        slides,
        autoRotate: true,
        defaultPlaying: true,
        onPlayingChange,
      } satisfies CarouselProps;
      const state = machine.initial(props);

      machine.transition(state, { type: "root.focus.enter" }, props);
      machine.transition(state, { type: "root.hover.enter" }, props);
      machine.transition({ ...state, hoverPaused: true }, { type: "root.hover.leave" }, props);

      expect(onPlayingChange).not.toHaveBeenCalled();
    });
  });
});

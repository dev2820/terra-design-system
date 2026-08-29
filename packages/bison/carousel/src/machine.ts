import type { Machine } from "@bison/core";

import type { CarouselEvent, CarouselProps, CarouselState } from "./types";

function getValue(state: CarouselState, props: CarouselProps) {
  const value = props.value ?? state.value;

  return props.slides.includes(value) ? value : props.slides[0];
}

function getPlaying(state: CarouselState, props: CarouselProps) {
  return props.autoRotate === true ? (props.playing ?? state.playing) : false;
}

function shouldRotate(state: CarouselState, props: CarouselProps) {
  return getPlaying(state, props) && !state.focusPaused && !state.hoverPaused;
}

function updateValue(state: CarouselState, props: CarouselProps, value: string) {
  if (!props.slides.includes(value) || getValue(state, props) === value) {
    return state;
  }

  props.onValueChange?.(value);

  return { ...state, value };
}

function moveValue(state: CarouselState, props: CarouselProps, offset: -1 | 1) {
  const currentIndex = props.slides.indexOf(getValue(state, props));
  const candidateIndex = currentIndex + offset;
  const isOutOfBounds = candidateIndex < 0 || candidateIndex >= props.slides.length;

  if (isOutOfBounds && props.loop !== true) {
    return state;
  }

  const nextIndex = (candidateIndex + props.slides.length) % props.slides.length;

  return updateValue(state, props, props.slides[nextIndex] ?? props.slides[0]);
}

function isLastValue(state: CarouselState, props: CarouselProps) {
  return getValue(state, props) === props.slides[props.slides.length - 1];
}

function updatePlaying(state: CarouselState, props: CarouselProps, playing: boolean) {
  if (props.autoRotate !== true || getPlaying(state, props) === playing) {
    return state;
  }

  props.onPlayingChange?.(playing);

  return { ...state, playing };
}

export const machine = {
  initial(props: CarouselProps): CarouselState {
    const defaultValue = props.defaultValue ?? props.slides[0];

    return {
      value: props.slides.includes(defaultValue) ? defaultValue : props.slides[0],
      playing: props.autoRotate === true ? (props.defaultPlaying ?? false) : false,
      focusPaused: false,
      hoverPaused: false,
    };
  },

  transition(state: CarouselState, event: CarouselEvent, props: CarouselProps): CarouselState {
    switch (event.type) {
      case "slide.previous":
        return moveValue(state, props, -1);

      case "slide.next":
        return moveValue(state, props, 1);

      case "slide.set":
        return updateValue(state, props, event.value);

      case "rotation.tick": {
        if (!shouldRotate(state, props)) {
          return state;
        }

        const currentIndex = props.slides.indexOf(getValue(state, props));
        const reachesEnd = props.loop !== true && currentIndex >= props.slides.length - 2;
        const nextState = moveValue(state, props, 1);

        return reachesEnd ? updatePlaying(nextState, props, false) : nextState;
      }

      case "rotation.toggle": {
        if (props.autoRotate !== true) {
          return state;
        }

        const playing = getPlaying(state, props);
        const willStart = !playing || state.focusPaused;

        if (!willStart) {
          return updatePlaying(state, props, false);
        }

        let nextState = state.focusPaused ? { ...state, focusPaused: false } : state;

        if (props.loop !== true && isLastValue(nextState, props)) {
          nextState = updateValue(nextState, props, props.slides[0]);
        }

        return playing ? nextState : updatePlaying(nextState, props, true);
      }

      case "root.focus.enter":
        return props.autoRotate === true && !state.focusPaused
          ? { ...state, focusPaused: true }
          : state;

      case "root.hover.enter":
        return props.autoRotate === true && !state.hoverPaused
          ? { ...state, hoverPaused: true }
          : state;

      case "root.hover.leave":
        return props.autoRotate === true && state.hoverPaused
          ? { ...state, hoverPaused: false }
          : state;
    }
  },
} satisfies Machine<CarouselProps, CarouselState, CarouselEvent>;

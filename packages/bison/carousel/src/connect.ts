import type { Actor, NormalizeProps } from "@bison/core";

import type {
  CarouselAccessibleName,
  CarouselApi,
  CarouselEvent,
  CarouselProps,
  CarouselPropTypes,
  CarouselRootProps,
  CarouselRotationControlProps,
  CarouselSlideProps,
  CarouselState,
  CarouselTriggerProps,
} from "./types";

function getSlidesId(id: string) {
  return `${id}-slides`;
}

function getSlideId(id: string, value: string) {
  return `${id}-slide-${encodeURIComponent(value)}`;
}

function getAccessibleName(props: CarouselAccessibleName) {
  return {
    "aria-label": "label" in props ? props.label : undefined,
    "aria-labelledby": props.labelledBy,
  };
}

export function connect<MachineProps extends CarouselProps, Props extends CarouselPropTypes>(
  actor: Actor<MachineProps, CarouselState, CarouselEvent>,
  normalize: NormalizeProps<Props>,
): CarouselApi<MachineProps extends { autoRotate: true } ? true : false, Props> {
  const { props, state } = actor.getSnapshot();
  const candidateValue = props.value ?? state.value;
  const value = props.slides.includes(candidateValue) ? candidateValue : props.slides[0];
  const autoRotate = props.autoRotate === true;
  const playing = autoRotate ? (props.playing ?? state.playing) : false;
  const shouldRotate = playing && !state.focusPaused && !state.hoverPaused;
  const slidesId = getSlidesId(props.id);
  const currentIndex = props.slides.indexOf(value);
  const hasMultipleSlides = props.slides.length > 1;
  const canMovePrevious = hasMultipleSlides && (props.loop === true || currentIndex > 0);
  const canMoveNext =
    hasMultipleSlides && (props.loop === true || currentIndex < props.slides.length - 1);

  const api = {
    value,
    setValue(nextValue: string) {
      actor.send({ type: "slide.set", value: nextValue });
    },
    getRootProps(rootProps: CarouselRootProps) {
      return normalize.element({
        role: rootProps.region ? "region" : "group",
        "aria-roledescription": rootProps.roleDescription,
        ...getAccessibleName(rootProps),
        ...(autoRotate
          ? {
              onFocusCapture(event: FocusEvent) {
                const currentTarget = event.currentTarget as Node | null;
                const relatedTarget = event.relatedTarget as Node | null;

                if (currentTarget && relatedTarget && currentTarget.contains(relatedTarget)) {
                  return;
                }

                actor.send({ type: "root.focus.enter" });
              },
              onPointerEnter() {
                actor.send({ type: "root.hover.enter" });
              },
              onPointerLeave() {
                actor.send({ type: "root.hover.leave" });
              },
            }
          : {}),
      });
    },
    getSlidesProps: () =>
      normalize.element({
        id: slidesId,
        "aria-atomic": false,
        "aria-live": shouldRotate ? "off" : "polite",
      }),
    getSlideProps(slideProps: CarouselSlideProps) {
      return normalize.element({
        id: getSlideId(props.id, slideProps.value),
        role: "group",
        "aria-roledescription": slideProps.roleDescription,
        ...getAccessibleName(slideProps),
        hidden: slideProps.value !== value,
      });
    },
    getPreviousTriggerProps(triggerProps: CarouselTriggerProps) {
      return normalize.button({
        type: "button",
        disabled: !canMovePrevious,
        "aria-controls": slidesId,
        ...getAccessibleName(triggerProps),
        onClick() {
          actor.send({ type: "slide.previous" });
        },
      });
    },
    getNextTriggerProps(triggerProps: CarouselTriggerProps) {
      return normalize.button({
        type: "button",
        disabled: !canMoveNext,
        "aria-controls": slidesId,
        ...getAccessibleName(triggerProps),
        onClick() {
          actor.send({ type: "slide.next" });
        },
      });
    },
  };

  if (!autoRotate) {
    return api as CarouselApi<MachineProps extends { autoRotate: true } ? true : false, Props>;
  }

  const willStart = !playing || state.focusPaused;

  return {
    ...api,
    rotation: {
      playing,
      shouldRotate,
      paused: {
        focus: state.focusPaused,
        hover: state.hoverPaused,
      },
      tick() {
        actor.send({ type: "rotation.tick" });
      },
    },
    getRotationControlProps(controlProps: CarouselRotationControlProps) {
      return normalize.button({
        type: "button",
        "aria-controls": slidesId,
        "aria-label": willStart ? controlProps.startLabel : controlProps.stopLabel,
        onClick() {
          actor.send({ type: "rotation.toggle" });
        },
      });
    },
  } as CarouselApi<MachineProps extends { autoRotate: true } ? true : false, Props>;
}

import type { Actor, ElementProps, MachineSnapshot, PatternTypes } from "@bison/core";

export type CarouselSlides = readonly [string, ...string[]];

interface CarouselCommonProps {
  id: string;
  /** Ordered, unique slide values. */
  slides: CarouselSlides;
  /** Whether previous and next navigation wraps at the sequence boundaries. */
  loop?: boolean;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

interface ManualCarouselProps extends CarouselCommonProps {
  autoRotate?: false;
  playing?: never;
  defaultPlaying?: never;
  onPlayingChange?: never;
}

interface AutoRotatingCarouselProps extends CarouselCommonProps {
  /** Enables the accessible rotation contract. The consumer still owns the timer. */
  autoRotate: true;
  /** Requested playback state. Focus and pointer pauses can still block rotation. */
  playing?: boolean;
  defaultPlaying?: boolean;
  onPlayingChange?: (playing: boolean) => void;
}

export type CarouselProps<AutoRotate extends boolean = boolean> = AutoRotate extends true
  ? AutoRotatingCarouselProps
  : ManualCarouselProps;

export interface CarouselState {
  value: string;
  playing: boolean;
  focusPaused: boolean;
  hoverPaused: boolean;
}

export type CarouselEvent =
  | { type: "slide.previous" }
  | { type: "slide.next" }
  | { type: "slide.set"; value: string }
  | { type: "rotation.toggle" }
  | { type: "rotation.tick" }
  | { type: "root.focus.enter" }
  | { type: "root.hover.enter" }
  | { type: "root.hover.leave" };

export type CarouselSnapshot<AutoRotate extends boolean = boolean> = MachineSnapshot<
  CarouselProps<AutoRotate>,
  CarouselState
>;

export type CarouselActor<AutoRotate extends boolean = boolean> = Actor<
  CarouselProps<AutoRotate>,
  CarouselState,
  CarouselEvent
>;

export type CarouselAccessibleName =
  | {
      label: string;
      labelledBy?: never;
    }
  | {
      label?: never;
      labelledBy: string;
    };

export type CarouselRootProps = CarouselAccessibleName & {
  region?: boolean;
  roleDescription: string;
};

export type CarouselSlideProps = CarouselAccessibleName & {
  value: string;
  roleDescription: string;
};

export type CarouselTriggerProps = CarouselAccessibleName;

export interface CarouselRotationControlProps {
  startLabel: string;
  stopLabel: string;
}

export interface CarouselPropTypes {
  element: unknown;
  button: unknown;
}

interface DefaultCarouselPropTypes {
  element: ElementProps;
  button: ElementProps;
}

export interface CarouselRotationApi {
  /** Requested playback state, independent of temporary accessibility pauses. */
  playing: boolean;
  /** Whether the consumer's timer may currently request rotation. */
  shouldRotate: boolean;
  paused: {
    focus: boolean;
    hover: boolean;
  };
  /** Requests one timer step and is a no-op whenever rotation is blocked. */
  tick: () => void;
}

interface CarouselCommonApi<Props extends CarouselPropTypes> {
  value: string;
  setValue: (value: string) => void;
  getRootProps: (props: CarouselRootProps) => Props["element"];
  getSlidesProps: () => Props["element"];
  getSlideProps: (props: CarouselSlideProps) => Props["element"];
  getPreviousTriggerProps: (props: CarouselTriggerProps) => Props["button"];
  getNextTriggerProps: (props: CarouselTriggerProps) => Props["button"];
}

interface AutoRotatingCarouselApi<
  Props extends CarouselPropTypes,
> extends CarouselCommonApi<Props> {
  rotation: CarouselRotationApi;
  getRotationControlProps: (props: CarouselRotationControlProps) => Props["button"];
}

export type CarouselApi<
  AutoRotate extends boolean = boolean,
  Props extends CarouselPropTypes = DefaultCarouselPropTypes,
> = AutoRotate extends true ? AutoRotatingCarouselApi<Props> : CarouselCommonApi<Props>;

export interface CarouselPatternTypes extends PatternTypes {
  api: this["props"] extends CarouselProps
    ? this["propTypes"] extends CarouselPropTypes
      ? CarouselApi<this["props"] extends { autoRotate: true } ? true : false, this["propTypes"]>
      : never
    : never;
}

import type { Pattern } from "@bison/core";

import { connect } from "./connect";
import { machine } from "./machine";
import type {
  CarouselEvent,
  CarouselPatternTypes,
  CarouselProps,
  CarouselPropTypes,
  CarouselState,
} from "./types";

export type {
  CarouselAccessibleName,
  CarouselApi,
  CarouselProps,
  CarouselRootProps,
  CarouselRotationApi,
  CarouselRotationControlProps,
  CarouselSlideProps,
  CarouselSlides,
  CarouselTriggerProps,
} from "./types";

export const carousel = {
  machine,
  connect,
} as Pattern<CarouselProps, CarouselState, CarouselEvent, CarouselPropTypes, CarouselPatternTypes>;

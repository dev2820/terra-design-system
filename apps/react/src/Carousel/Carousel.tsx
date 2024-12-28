import { Carousel } from '@ark-ui/react';
import { IDENTIFIER } from 'env';

import {
  ComponentProps,
  forwardRef,
  ElementRef,
  ComponentPropsWithoutRef,
} from 'react';

import { createReactContext } from '../create-react-context';
import { cx } from '../cx';
import { tv } from '../tv';

export const carouselVariants = tv({
  base: `${IDENTIFIER.scope} carousel`,
  slots: {
    root: 'trds-w-full trds-relative',
    viewport:
      'trds-overflow-hidden trds-rounded-2xl trds-bg-layer1 trds-w-full trds-h-auto',
    item: 'trds-aspect-video trds-object-cover',
    itemGroup:
      'trds-transition-all trds-duration-normal trds-w-full trds-flex trds-flex-row trds-justify-between trds-items-center trds-cursor-pointer disabled:trds-text-disabled disabled:trds-cursor-not-allowed',
    indicatorGroup:
      'trds-flex trds-flex-row trds-gap-2 trds-justify-center trds-items-center trds-mx-8',
    indicator:
      'trds-w-2.5 trds-h-2.5 trds-rounded-full trds-bg-layer1 trds-cursor-pointer trds-duration-normal data-current:trds-bg-neutral-pressed data-readonly:trds-bg-muted data-readonly:trds-cursor-not-allowed',
    control:
      'trds-w-full trds-px-4 trds-flex trds-flex-row trds-justify-center trds-items-center trds-mt-4',
    prevTrigger:
      'trds-rounded-full trds-cursor-pointer trds-transition-colors trds-text-neutral enabled:hover:trds-text-neutral-hover enabled:active:trds-text-neutral-pressed disabled:trds-cursor-not-allowed disabled:trds-text-muted',
    nextTrigger:
      'trds-rounded-full trds-cursor-pointer trds-transition-colors trds-text-neutral enabled:hover:trds-text-neutral-hover enabled:active:trds-text-neutral-pressed disabled:trds-cursor-not-allowed disabled:trds-text-muted',
  },
});

type CarouselProviderProps = {
  classes: ReturnType<typeof carouselVariants>;
};

const [CarouselProvider, useCarouselContext] =
  createReactContext<CarouselProviderProps>({
    name: 'carousel',
    hookName: 'useCarouselContext',
    providerName: 'CarouselProvider',
    defaultValue: {
      classes: {} as ReturnType<typeof carouselVariants>,
    },
  });

export type RootProps = ComponentProps<typeof Root>;
const Root = forwardRef<
  ElementRef<typeof Carousel.Root>,
  ComponentPropsWithoutRef<typeof Carousel.Root> & CarouselProviderProps
>(function (props, ref) {
  const { slidesPerView, children, className, ...rest } = props;
  const classes = carouselVariants();

  const ctx = {
    classes,
  };

  return (
    <CarouselProvider value={ctx}>
      <Carousel.Root
        ref={ref}
        className={cx(classes.root(), className)}
        slidesPerView={slidesPerView}
        {...rest}
      >
        {children}
      </Carousel.Root>
    </CarouselProvider>
  );
});
Root.displayName = 'Carousel.Root';

export type ViewportProps = ComponentProps<typeof Viewport>;
const Viewport = forwardRef<
  ElementRef<typeof Carousel.Viewport>,
  ComponentPropsWithoutRef<typeof Carousel.Viewport>
>(({ children, className, ...props }, ref) => {
  const { classes } = useCarouselContext();

  return (
    <Carousel.Viewport
      ref={ref}
      className={cx(classes.viewport(), className)}
      {...props}
    >
      {children}
    </Carousel.Viewport>
  );
});
Viewport.displayName = 'Carousel.Viewport';

export type ControlProps = ComponentProps<typeof Control>;
const Control = forwardRef<
  ElementRef<typeof Carousel.Control>,
  ComponentPropsWithoutRef<typeof Carousel.Control>
>(({ children, className, ...props }, ref) => {
  const { classes } = useCarouselContext();

  return (
    <Carousel.Control
      ref={ref}
      className={cx(classes.control(), className)}
      {...props}
    >
      {children}
    </Carousel.Control>
  );
});
Control.displayName = 'Carousel.Control';

export type PrevTriggerProps = ComponentProps<typeof PrevTrigger>;
const PrevTrigger = forwardRef<
  ElementRef<typeof Carousel.PrevTrigger>,
  ComponentPropsWithoutRef<typeof Carousel.PrevTrigger>
>(({ children, className, ...props }, ref) => {
  const { classes } = useCarouselContext();

  return (
    <Carousel.PrevTrigger
      ref={ref}
      className={cx(classes.prevTrigger(), className)}
      {...props}
    >
      {children}
    </Carousel.PrevTrigger>
  );
});
PrevTrigger.displayName = 'Carousel.PrevTrigger';

export type NextTriggerProps = ComponentProps<typeof NextTrigger>;
const NextTrigger = forwardRef<
  ElementRef<typeof Carousel.NextTrigger>,
  ComponentPropsWithoutRef<typeof Carousel.NextTrigger>
>(({ children, className, ...props }, ref) => {
  const { classes } = useCarouselContext();

  return (
    <Carousel.NextTrigger
      ref={ref}
      className={cx(classes.nextTrigger(), className)}
      {...props}
    >
      {children}
    </Carousel.NextTrigger>
  );
});
NextTrigger.displayName = 'Carousel.NextTrigger';

export type ItemGroupProps = ComponentProps<typeof ItemGroup>;
const ItemGroup = forwardRef<
  ElementRef<typeof Carousel.ItemGroup>,
  ComponentPropsWithoutRef<typeof Carousel.ItemGroup>
>(({ children, className, ...props }, ref) => {
  const { classes } = useCarouselContext();

  return (
    <Carousel.ItemGroup
      ref={ref}
      className={cx(classes.itemGroup(), className)}
      {...props}
    >
      {children}
    </Carousel.ItemGroup>
  );
});
ItemGroup.displayName = 'Carousel.ItemGroup';

export type IndicatorGroupProps = ComponentProps<typeof IndicatorGroup>;
const IndicatorGroup = forwardRef<
  ElementRef<typeof Carousel.IndicatorGroup>,
  ComponentPropsWithoutRef<typeof Carousel.IndicatorGroup>
>(({ children, className, ...props }, ref) => {
  const { classes } = useCarouselContext();

  return (
    <Carousel.IndicatorGroup
      ref={ref}
      className={cx(classes.indicatorGroup(), className)}
      {...props}
    >
      {children}
    </Carousel.IndicatorGroup>
  );
});
IndicatorGroup.displayName = 'Carousel.IndicatorGroup';

export type IndicatorProps = ComponentProps<typeof Indicator>;
const Indicator = forwardRef<
  ElementRef<typeof Carousel.Indicator>,
  ComponentPropsWithoutRef<typeof Carousel.Indicator>
>(({ children, className, ...props }, ref) => {
  const { classes } = useCarouselContext();

  return (
    <Carousel.Indicator
      ref={ref}
      className={cx(classes.indicator(), className)}
      {...props}
    >
      {children}
    </Carousel.Indicator>
  );
});
Indicator.displayName = 'Carousel.Indicator';

export type ItemProps = ComponentProps<typeof Item>;
const Item = forwardRef<
  ElementRef<typeof Carousel.Item>,
  ComponentPropsWithoutRef<typeof Carousel.Item>
>(({ children, className, ...props }, ref) => {
  const { classes } = useCarouselContext();

  return (
    <Carousel.Item
      ref={ref}
      className={cx(classes.item(), className)}
      {...props}
    >
      {children}
    </Carousel.Item>
  );
});
Item.displayName = 'Carousel.Item';

export {
  Root,
  Control,
  Viewport,
  PrevTrigger,
  NextTrigger,
  IndicatorGroup,
  Indicator,
  ItemGroup,
  Item,
};

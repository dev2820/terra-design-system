import { Carousel } from '@ark-ui/react';
import { IDENTIFIER } from 'env';
import { ChevronLeftCircleIcon, ChevronRightCircleIcon } from 'lucide-react';
import { isNumber, range } from 'utils';

import {
  ComponentProps,
  forwardRef,
  ElementRef,
  ComponentPropsWithoutRef,
  Children,
  useRef,
} from 'react';

import { createReactContext } from '../create-react-context';
import { cx } from '../cx';
import { tv } from '../tv';

export const carouselVariants = tv({
  base: `${IDENTIFIER.scope} carousel`,
  slots: {
    root: 'trds-w-full trds-relative',
    viewport:
      'trds-overflow-hidden trds-rounded-2xl trds-bg-neutral-200 trds-w-full trds-h-auto',
    item: 'trds-aspect-[16/9] trds-object-cover',
    itemGroup:
      'trds-transition-all trds-duration-normal trds-w-full trds-py-4 trds-flex trds-flex-row trds-justify-between trds-items-center trds-cursor-pointer disabled:trds-text-disabled disabled:trds-cursor-not-allowed',
    indicatorGroup:
      'trds-flex trds-flex-row trds-gap-2 trds-justify-center trds-items-center trds-mx-8',
    indicator:
      'trds-w-2.5 trds-h-2.5 trds-rounded-full trds-bg-neutral-200 trds-cursor-pointer trds-duration-normal data-[current]:trds-bg-neutral-500 data-[readonly]:trds-bg-disabled data-[readonly]:trds-cursor-not-allowed',
    control:
      'trds-z-100 trds-w-full trds-px-4 trds-flex trds-flex-row trds-justify-center trds-items-center trds-mt-4',
    prevTrigger:
      'trds-rounded-full trds-cursor-pointer trds-transition-colors trds-text-neutral-300 enabled:hover:trds-text-neutral-500 enabled:active:trds-text-neutral-600 disabled:trds-cursor-not-allowed disabled:trds-text-disabled',
    nextTrigger:
      'trds-rounded-full trds-cursor-pointer trds-transition-colors trds-text-neutral-300 enabled:hover:trds-text-neutral-500 enabled:active:trds-text-neutral-600 disabled:trds-cursor-not-allowed disabled:trds-text-disabled',
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
  ComponentPropsWithoutRef<typeof Carousel.Root> &
    CarouselProviderProps & {
      showControl: boolean;
      readonly: boolean;
    }
>(function (props, ref) {
  const {
    showControl = true,
    readonly = false,
    slidesPerView,
    children,
    className,
    ...rest
  } = props;
  const classes = carouselVariants();
  const totalItem = Children.count(children);
  const totalSlide = Math.ceil(
    totalItem / (isNumber(slidesPerView) ? slidesPerView : 1),
  );

  const ctx = {
    classes,
  };

  const prevBtnRef = useRef<ElementRef<typeof Carousel.PrevTrigger>>(null);
  const nextBtnRef = useRef<ElementRef<typeof Carousel.NextTrigger>>(null);
  return (
    <CarouselProvider value={ctx}>
      <Carousel.Root
        ref={ref}
        className={cx(classes.root(), className)}
        slidesPerView={slidesPerView}
        {...rest}
      >
        <Carousel.Viewport className={classes.viewport()}>
          <Carousel.ItemGroup>{children}</Carousel.ItemGroup>
        </Carousel.Viewport>
        <Carousel.Control className={classes.control()}>
          <Carousel.PrevTrigger
            className={cx(
              classes.prevTrigger(),
              !showControl || readonly ? 'trds-hidden' : 'trds-visible',
            )}
            ref={prevBtnRef}
          >
            <ChevronLeftCircleIcon size={32} />
          </Carousel.PrevTrigger>
          <Carousel.IndicatorGroup className={classes.indicatorGroup()}>
            {range(0, totalSlide, 1).map(idx => (
              <Carousel.Indicator
                index={idx}
                key={idx}
                className={classes.indicator()}
                readOnly={readonly}
              ></Carousel.Indicator>
            ))}
          </Carousel.IndicatorGroup>
          <Carousel.NextTrigger
            className={cx(
              classes.nextTrigger(),
              !showControl || readonly ? 'trds-hidden' : 'trds-visible',
            )}
            ref={nextBtnRef}
          >
            <ChevronRightCircleIcon size={32} />
          </Carousel.NextTrigger>
        </Carousel.Control>
      </Carousel.Root>
    </CarouselProvider>
  );
});

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

export { Root, Item };

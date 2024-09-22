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
    root: 'w-full relative',
    viewport: 'overflow-hidden rounded-2xl bg-layer1 w-full h-auto',
    item: 'aspect-video object-cover',
    itemGroup:
      'transition-all duration-normal w-full py-4 flex flex-row justify-between items-center cursor-pointer disabled:text-disabled disabled:cursor-not-allowed',
    indicatorGroup: 'flex flex-row gap-2 justify-center items-center mx-8',
    indicator:
      'w-2.5 h-2.5 rounded-full bg-layer1 cursor-pointer duration-normal data-current:bg-neutral-pressed data-readonly:bg-muted data-readonly:cursor-not-allowed',
    control: 'w-full px-4 flex flex-row justify-center items-center mt-4',
    prevTrigger:
      'rounded-full cursor-pointer transition-colors text-neutral enabled:hover:text-neutral-hover enabled:active:text-neutral-pressed disabled:cursor-not-allowed disabled:text-muted',
    nextTrigger:
      'rounded-full cursor-pointer transition-colors text-neutral enabled:hover:text-neutral-hover enabled:active:text-neutral-pressed disabled:cursor-not-allowed disabled:text-muted',
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
              !showControl || readonly ? 'hidden' : 'visible',
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
              !showControl || readonly ? 'hidden' : 'visible',
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

import { carouselAnatomy } from '@ark-ui/anatomy';
import { Carousel } from '@ark-ui/react';
import { ChevronLeftCircleIcon, ChevronRightCircleIcon } from 'lucide-react';
import { isNumber, range } from 'utils';

import {
  ComponentProps,
  forwardRef,
  ElementRef,
  ComponentPropsWithoutRef,
  Children,
} from 'react';

import { sva, cx } from '../../styled-system/css';
import { createReactContext } from '../create-react-context';

export const carouselVariants = sva({
  className: 'carousel',
  slots: carouselAnatomy.keys(),
  base: {
    root: {
      w: 'full',
      position: 'relative',
    },
    viewport: {
      overflow: 'hidden',
      rounded: '2xl',
      bg: 'neutral.200',
      w: 'full',
      h: 'auto',
    },
    item: {
      aspectRatio: '16 / 9',
      objectFit: 'cover',
    },
    itemGroup: {
      transitionProperty: 'all',
      transitionDuration: 'normal',
      w: 'full',
      paddingY: '1rem',
      display: 'flex',
      flexDir: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'pointer',
      _disabled: {
        color: 'disabled',
        cursor: 'not-allowed',
      },
    },
    indicatorGroup: {
      display: 'flex',
      flexDir: 'row',
      gap: 2,
      justifyContent: 'center',
      alignItems: 'center',
      marginX: 8,
    },
    indicator: {
      width: 2.5,
      height: 2.5,
      rounded: 'full',
      bg: 'neutral.300',
      cursor: 'pointer',
      transitionDuration: 'normal',
      '&[data-current]': {
        bg: 'neutral.500',
      },
    },
    control: {
      zIndex: 100,
      width: 'full',
      paddingX: 4,
      display: 'flex',
      flexDir: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 4,
    },
    prevTrigger: {
      rounded: 'full',
      cursor: 'pointer',
      transitionProperty: ['colors'],
      color: 'neutral.300',
      _hover: {
        color: 'neutral.500',
      },
      _active: {
        color: 'neutral.600',
      },
      _disabled: {
        cursor: 'not-allowed',
        color: 'disabled',
        _hover: {
          color: 'disabled',
        },
        _active: {
          color: 'disabled',
        },
      },
    },
    nextTrigger: {
      rounded: 'full',
      cursor: 'pointer',
      transitionProperty: ['colors'],
      color: 'neutral.300',
      _hover: {
        color: 'neutral.500',
      },
      _active: {
        color: 'neutral.600',
      },
      _disabled: {
        cursor: 'not-allowed',
        color: 'disabled',
        _hover: {
          color: 'disabled',
        },
        _active: {
          color: 'disabled',
        },
      },
    },
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
      classes: {},
    },
  });

export type RootProps = ComponentProps<typeof Root>;
const Root = forwardRef<
  ElementRef<typeof Carousel.Root>,
  ComponentPropsWithoutRef<typeof Carousel.Root> &
    CarouselProviderProps & {
      hideControl: boolean;
    }
>(function (props, ref) {
  const {
    hideControl = false,
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

  return (
    <CarouselProvider value={ctx}>
      <Carousel.Root
        ref={ref}
        className={cx(classes.root, className)}
        slidesPerView={slidesPerView}
        {...rest}
      >
        <Carousel.Viewport className={classes.viewport}>
          <Carousel.ItemGroup>{children}</Carousel.ItemGroup>
        </Carousel.Viewport>
        <Carousel.Control className={classes.control}>
          {!hideControl && (
            <Carousel.PrevTrigger className={classes.prevTrigger}>
              <ChevronLeftCircleIcon size={32} />
            </Carousel.PrevTrigger>
          )}
          <Carousel.IndicatorGroup className={classes.indicatorGroup}>
            {range(0, totalSlide, 1).map(idx => (
              <Carousel.Indicator
                index={idx}
                key={idx}
                className={classes.indicator}
              ></Carousel.Indicator>
            ))}
          </Carousel.IndicatorGroup>
          {!hideControl && (
            <Carousel.NextTrigger className={classes.nextTrigger}>
              <ChevronRightCircleIcon size={32} />
            </Carousel.NextTrigger>
          )}
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
    <Carousel.Item ref={ref} className={cx(classes.item, className)} {...props}>
      {children}
    </Carousel.Item>
  );
});

export { Root, Item };

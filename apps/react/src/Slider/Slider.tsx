import { Slider } from '@ark-ui/react';
import { IDENTIFIER } from 'env';

import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  forwardRef,
  type ElementRef,
  ReactNode,
} from 'react';

import { cx } from '../cx';
import { tv, VariantProps } from '../tv';

export const sliderVariants = tv({
  base: `${IDENTIFIER.scope} slider`,
  slots: {
    root: 'trds-flex trds-flex-col trds-gap-1 trds-w-full',
    control: 'trds-relative trds-flex trds-items-center',
    track:
      'trds-bg-track trds-rounded-full trds-overflow-hidden trds-flex-1 trds-cursor-pointer data-disabled:trds-cursor-not-allowed',
    range: 'trds-bg-primary data-disabled:trds-bg-muted',
    thumb:
      'trds-bg-white trds-border-primary trds-rounded-full trds-border-2 trds-shadow-md trds-outline-none trds-z-1 trds-cursor-pointer data-disabled:trds-border-muted data-disabled:trds-cursor-not-allowed',
    markerGroup: '-trds-mt-1',
    marker:
      "trds-text-current before:trds-bg-white before:trds-rounded-full before:trds-content-[''] before:trds-block before:trds-left-1/2 before:trds-relative before:-trds-translate-x-1/2",
  },
  variants: {
    size: {
      sm: {
        control: 'trds-h-4',
        range: 'trds-h-1.5',
        track: 'trds-h-1.5',
        thumb: 'trds-h-4 trds-w-4',
        marker:
          'trds-text-sm before:trds-h-1 before:-trds-top-2.5 before:trds-w-0.5',
      },
      md: {
        control: 'trds-h-5',
        range: 'trds-h-2',
        track: 'trds-h-2',
        thumb: 'trds-h-5 trds-w-5',
        marker:
          'trds-text-sm before:trds-h-1 before:-trds-top-3 before:trds-w-0.5',
      },
      lg: {
        control: 'trds-h-6',
        range: 'trds-h-2.5',
        track: 'trds-h-2.5',
        thumb: 'trds-h-6 trds-w-6',
        marker:
          'trds-text-md before:trds-h-1.5 before:trds-top-[-15px] before:trds-w-0.5',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type RootProps = ComponentProps<typeof Root>;
const Root = forwardRef<
  ElementRef<typeof Slider.Root>,
  Omit<ComponentPropsWithoutRef<typeof Slider.Root>, 'children'> &
    VariantProps<typeof sliderVariants> & {
      markers?: { value: number; marker: ReactNode }[];
      multiple?: boolean;
    }
>((props, ref) => {
  const { size, multiple = false, markers = [], className, ...rest } = props;
  const classes = sliderVariants({ size });

  return (
    <Slider.Root ref={ref} className={cx(classes.root(), className)} {...rest}>
      <Slider.Control className={classes.control()}>
        <Slider.Track className={classes.track()}>
          <Slider.Range className={classes.range()} />
        </Slider.Track>
        <Slider.Thumb index={0} className={classes.thumb()}>
          <Slider.HiddenInput />
        </Slider.Thumb>
        {multiple && (
          <Slider.Thumb index={1} className={classes.thumb()}>
            <Slider.HiddenInput />
          </Slider.Thumb>
        )}
      </Slider.Control>
      {markers.length > 0 && (
        <Slider.MarkerGroup className={classes.markerGroup()}>
          {markers.map(({ value, marker }) => (
            <Slider.Marker value={value} className={classes.marker()}>
              {marker}
            </Slider.Marker>
          ))}
        </Slider.MarkerGroup>
      )}
    </Slider.Root>
  );
});

export { Root };

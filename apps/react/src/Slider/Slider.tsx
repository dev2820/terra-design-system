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
    root: 'flex flex-col gap-1 w-full',
    control: 'relative flex items-center',
    track:
      'bg-track rounded-full overflow-hidden flex-1 cursor-pointer data-disabled:cursor-not-allowed',
    range: 'bg-primary data-disabled:bg-muted',
    thumb:
      'bg-white border-primary rounded-full border-2 shadow-md outline-none z-1 cursor-pointer data-disabled:border-muted data-disabled:cursor-not-allowed',
    markerGroup: '-mt-1',
    marker:
      "text-current before:bg-white before:rounded-full before:content-[''] before:block before:left-1/2 before:relative before:-translate-x-1/2",
  },
  variants: {
    size: {
      sm: {
        control: 'h-4',
        range: 'h-1.5',
        track: 'h-1.5',
        thumb: 'h-4 w-4',
        marker: 'text-sm before:h-1 before:-top-2.5 before:w-0.5',
      },
      md: {
        control: 'h-5',
        range: 'h-2',
        track: 'h-2',
        thumb: 'h-5 w-5',
        marker: 'text-sm before:h-1 before:-top-3 before:w-0.5',
      },
      lg: {
        control: 'h-6',
        range: 'h-2.5',
        track: 'h-2.5',
        thumb: 'h-6 w-6',
        marker: 'text-md before:h-1.5 before:top-[-15px] before:w-0.5',
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

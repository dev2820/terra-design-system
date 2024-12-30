import { Slider } from '@ark-ui/react';
import { IDENTIFIER } from 'env';

import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  forwardRef,
  type ElementRef,
} from 'react';

import { createReactContext } from '../create-react-context';
import { cx } from '../cx';
import { tv, VariantProps } from '../tv';

export const sliderVariants = tv({
  base: `${IDENTIFIER.scope} slider`,
  slots: {
    root: 'trds-flex trds-flex-col trds-gap-1 trds-w-full',
    label: '',
    control: 'trds-relative trds-flex trds-items-center',
    track:
      'trds-bg-track trds-rounded-full trds-overflow-hidden trds-flex-1 trds-cursor-pointer data-disabled:trds-cursor-not-allowed',
    range: 'trds-bg-primary data-disabled:trds-bg-muted',
    thumb:
      'trds-bg-white trds-border-primary trds-rounded-full trds-border-2 trds-shadow-md trds-outline-none trds-z-elevated trds-cursor-pointer data-disabled:trds-border-muted data-disabled:trds-cursor-not-allowed',
    markerGroup: '-trds-mt-1',
    marker:
      "trds-text-current before:trds-bg-white before:trds-rounded-full before:trds-content-[''] before:trds-block before:trds-left-1/2 before:trds-relative before:-trds-translate-x-1/2",
    valueText: '',
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

type SliderProviderProps = {
  classes: ReturnType<typeof sliderVariants>;
} & VariantProps<typeof sliderVariants>;

const [SliderProvider, useSliderContext] =
  createReactContext<SliderProviderProps>({
    name: 'slider',
    hookName: 'useSliderContext',
    providerName: 'SliderProvider',
    defaultValue: {
      classes: {} as ReturnType<typeof sliderVariants>,
      size: 'md',
    },
  });

export type RootProps = ComponentProps<typeof Root>;
const Root = forwardRef<
  ElementRef<typeof Slider.Root>,
  ComponentPropsWithoutRef<typeof Slider.Root> &
    VariantProps<typeof sliderVariants>
>((props, ref) => {
  const { size, className, children, ...rest } = props;
  const classes = sliderVariants({ size });
  const ctx = { classes };

  return (
    <SliderProvider value={ctx}>
      <Slider.Root
        ref={ref}
        className={cx(classes.root(), className)}
        {...rest}
      >
        {children}
      </Slider.Root>
    </SliderProvider>
  );
});

export type ControlProps = ComponentProps<typeof Control>;
const Control = forwardRef<
  ElementRef<typeof Slider.Control>,
  ComponentPropsWithoutRef<typeof Slider.Control>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useSliderContext();

  return (
    <Slider.Control
      className={cx(classes.control(), className)}
      ref={ref}
      {...rest}
    />
  );
});
Control.displayName = 'Slider.Control';

export type TrackProps = ComponentProps<typeof Track>;
const Track = forwardRef<
  ElementRef<typeof Slider.Track>,
  ComponentPropsWithoutRef<typeof Slider.Track>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useSliderContext();

  return (
    <Slider.Track
      className={cx(classes.track(), className)}
      ref={ref}
      {...rest}
    />
  );
});
Track.displayName = 'Slider.Track';

export type ThumbProps = ComponentProps<typeof Thumb>;
const Thumb = forwardRef<
  ElementRef<typeof Slider.Thumb>,
  ComponentPropsWithoutRef<typeof Slider.Thumb>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useSliderContext();

  return (
    <Slider.Thumb
      className={cx(classes.thumb(), className)}
      ref={ref}
      {...rest}
    />
  );
});
Thumb.displayName = 'Slider.Thumb';

export type RangeProps = ComponentProps<typeof Range>;
const Range = forwardRef<
  ElementRef<typeof Slider.Range>,
  ComponentPropsWithoutRef<typeof Slider.Range>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useSliderContext();

  return (
    <Slider.Range
      className={cx(classes.range(), className)}
      ref={ref}
      {...rest}
    />
  );
});
Range.displayName = 'Slider.Range';

export type MarkerGroupProps = ComponentProps<typeof MarkerGroup>;
const MarkerGroup = forwardRef<
  ElementRef<typeof Slider.MarkerGroup>,
  ComponentPropsWithoutRef<typeof Slider.MarkerGroup>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useSliderContext();

  return (
    <Slider.MarkerGroup
      className={cx(classes.markerGroup(), className)}
      ref={ref}
      {...rest}
    />
  );
});
MarkerGroup.displayName = 'Slider.MarkerGroup';

export type MarkerProps = ComponentProps<typeof Marker>;
const Marker = forwardRef<
  ElementRef<typeof Slider.Marker>,
  ComponentPropsWithoutRef<typeof Slider.Marker>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useSliderContext();

  return (
    <Slider.Marker
      className={cx(classes.marker(), className)}
      ref={ref}
      {...rest}
    />
  );
});
Marker.displayName = 'Slider.Marker';

export type LabelProps = ComponentProps<typeof Label>;
const Label = forwardRef<
  ElementRef<typeof Slider.Label>,
  ComponentPropsWithoutRef<typeof Slider.Label>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useSliderContext();

  return (
    <Slider.Label
      className={cx(classes.label(), className)}
      ref={ref}
      {...rest}
    />
  );
});
Label.displayName = 'Slider.Label';

export type ValueTextProps = ComponentProps<typeof ValueText>;
const ValueText = forwardRef<
  ElementRef<typeof Slider.ValueText>,
  ComponentPropsWithoutRef<typeof Slider.ValueText>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useSliderContext();

  return (
    <Slider.ValueText
      className={cx(classes.valueText(), className)}
      ref={ref}
      {...rest}
    />
  );
});
ValueText.displayName = 'Slider.ValueText';

export type HiddenInputProps = ComponentProps<typeof HiddenInput>;
const HiddenInput = forwardRef<
  ElementRef<typeof Slider.HiddenInput>,
  ComponentPropsWithoutRef<typeof Slider.HiddenInput>
>(function (props, ref) {
  const { className, ...rest } = props;

  return <Slider.HiddenInput className={className} ref={ref} {...rest} />;
});
HiddenInput.displayName = 'Slider.HiddenInput';

export {
  Root,
  Thumb,
  Track,
  Control,
  Range,
  HiddenInput,
  Marker,
  MarkerGroup,
  Label,
  ValueText,
};

import {
  ColorPicker,
  type ColorPickerContextProps,
} from '@ark-ui/react/color-picker';
import { IDENTIFIER } from 'env';

import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  forwardRef,
  type ElementRef,
} from 'react';

import { createReactContext } from '../create-react-context';
import { cx } from '../cx';
import { tv } from '../tv';

export const colorPickerVariants = tv({
  base: `${IDENTIFIER.scope} colorPicker`,
  slots: {
    root: 'trds-flex trds-flex-col trds-gap-1.5',
    control: 'trds-flex trds-flex-row trds-gap-2',
    context: '',
    trigger: '',
    content:
      'trds-bg-white trds-rounded-lg trds-shadow-lg trds-flex trds-flex-col trds-max-w-sm trds-p-4 trds-z-dropdown data-open:trds-animate-fade-in data-closed:trds-animate-fade-out',
    area: 'trds-h-36 trds-rounded-lg trds-overflow-hidden',
    areaThumb:
      'trds-rounded-full trds-h-2.5 trds-w-2.5 trds-shadow-[0_0_0_2px_white,0_0_2px_1px_black] trds-outline-none',
    areaBackground: 'trds-h-full',
    eyeDropperTrigger: '',
    channelInput: '',
    channelSlider: 'trds-rounded-lg',
    channelSliderTrack: 'trds-h-3 trds-rounded-lg',
    swatchGroup: 'trds-grid trds-grid-cols-7 trds-gap-2 trds-bg-white',
    swatch:
      'trds-h-7 trds-w-7 trds-rounded-lg trds-shadow-[0_0_0_3px_white] trds-cursor-pointer',
    channelSliderThumb:
      'trds-rounded-full trds-h-2.5 trds-w-2.5 trds-shadow-[0_0_0_2px_white,0_0_2px_1px_black] -trds-translate-x-1/2 -trds-translate-y-1/2 trds-outline-none',
    transparencyGrid: 'trds-rounded-lg',
    positioner: '',
    swatchTrigger: '',
  },
});

type ColorPickerProviderProps = {
  classes: ReturnType<typeof colorPickerVariants>;
};
const [ColorPickerProvider, useColorPickerContext] =
  createReactContext<ColorPickerProviderProps>({
    name: 'collapsible',
    hookName: 'useCollapsibleContext',
    providerName: 'CollapsibleProvider',
    defaultValue: {
      classes: {} as ReturnType<typeof colorPickerVariants>,
    },
  });

export type RootProps = ComponentProps<typeof Root>;
const Root = forwardRef<
  ElementRef<typeof ColorPicker.Root>,
  ComponentPropsWithoutRef<typeof ColorPicker.Root> & ColorPickerProviderProps
>(({ children, className, ...props }, ref) => {
  const classes = colorPickerVariants();
  const ctx = {
    classes,
  };

  return (
    <ColorPickerProvider value={ctx}>
      <ColorPicker.Root
        className={cx(classes.root(), className)}
        ref={ref}
        {...props}
      >
        {children}
      </ColorPicker.Root>
    </ColorPickerProvider>
  );
});

export type ContextProps = ColorPickerContextProps;
const Context = ColorPicker.Context;

export type ControlProps = ComponentProps<typeof Control>;
const Control = forwardRef<
  ElementRef<typeof ColorPicker.Control>,
  ComponentPropsWithoutRef<typeof ColorPicker.Control>
>(function (props, ref) {
  const { classes } = useColorPickerContext();
  const { children, className, ...rest } = props;

  return (
    <ColorPicker.Control
      className={cx(classes.control(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </ColorPicker.Control>
  );
});
Control.displayName = 'ColorPicker.Control';

export type ContentProps = ComponentProps<typeof Content>;
const Content = forwardRef<
  ElementRef<typeof ColorPicker.Content>,
  ComponentPropsWithoutRef<typeof ColorPicker.Content>
>(function (props, ref) {
  const { classes } = useColorPickerContext();
  const { children, className, ...rest } = props;

  return (
    <ColorPicker.Content
      className={cx(classes.content(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </ColorPicker.Content>
  );
});
Content.displayName = 'ColorPicker.Content';

export type TriggerProps = ComponentProps<typeof Trigger>;
const Trigger = forwardRef<
  ElementRef<typeof ColorPicker.Trigger>,
  ComponentPropsWithoutRef<typeof ColorPicker.Trigger>
>(function (props, ref) {
  const { classes } = useColorPickerContext();
  const { children, className, ...rest } = props;

  return (
    <ColorPicker.Trigger
      className={cx(classes.trigger(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </ColorPicker.Trigger>
  );
});
Trigger.displayName = 'ColorPicker.Trigger';

export type ChannelInputProps = ComponentProps<typeof Control>;
const ChannelInput = forwardRef<
  ElementRef<typeof ColorPicker.ChannelInput>,
  ComponentPropsWithoutRef<typeof ColorPicker.ChannelInput>
>(function (props, ref) {
  const { classes } = useColorPickerContext();
  const { children, className, ...rest } = props;

  return (
    <ColorPicker.ChannelInput
      className={cx(classes.channelInput(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </ColorPicker.ChannelInput>
  );
});
ChannelInput.displayName = 'ColorPicker.ChannelInput';

export type PositionerProps = ComponentProps<typeof Positioner>;
const Positioner = forwardRef<
  ElementRef<typeof ColorPicker.Positioner>,
  ComponentPropsWithoutRef<typeof ColorPicker.Positioner>
>(function (props, ref) {
  const { classes } = useColorPickerContext();
  const { children, className, ...rest } = props;

  return (
    <ColorPicker.Positioner
      className={cx(classes.positioner(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </ColorPicker.Positioner>
  );
});
Positioner.displayName = 'ColorPicker.Positioner';

export type SwatchProps = ComponentProps<typeof Swatch>;
const Swatch = forwardRef<
  ElementRef<typeof ColorPicker.Swatch>,
  ComponentPropsWithoutRef<typeof ColorPicker.Swatch>
>(function (props, ref) {
  const { classes } = useColorPickerContext();
  const { children, className, ...rest } = props;

  return (
    <ColorPicker.Swatch
      className={cx(classes.swatch(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </ColorPicker.Swatch>
  );
});
Swatch.displayName = 'ColorPicker.Swatch';

export type AreaProps = ComponentProps<typeof Area>;
const Area = forwardRef<
  ElementRef<typeof ColorPicker.Area>,
  ComponentPropsWithoutRef<typeof ColorPicker.Area>
>(function (props, ref) {
  const { classes } = useColorPickerContext();
  const { children, className, ...rest } = props;

  return (
    <ColorPicker.Area
      className={cx(classes.area(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </ColorPicker.Area>
  );
});
Area.displayName = 'ColorPicker.Area';

export type AreaBackgroundProps = ComponentProps<typeof AreaBackground>;
const AreaBackground = forwardRef<
  ElementRef<typeof ColorPicker.AreaBackground>,
  ComponentPropsWithoutRef<typeof ColorPicker.AreaBackground>
>(function (props, ref) {
  const { classes } = useColorPickerContext();
  const { children, className, ...rest } = props;

  return (
    <ColorPicker.AreaBackground
      className={cx(classes.areaBackground(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </ColorPicker.AreaBackground>
  );
});
AreaBackground.displayName = 'ColorPicker.AreaBackground';

export type AreaThumbProps = ComponentProps<typeof AreaThumb>;
const AreaThumb = forwardRef<
  ElementRef<typeof ColorPicker.AreaThumb>,
  ComponentPropsWithoutRef<typeof ColorPicker.AreaThumb>
>(function (props, ref) {
  const { classes } = useColorPickerContext();
  const { children, className, ...rest } = props;

  return (
    <ColorPicker.AreaThumb
      className={cx(classes.areaThumb(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </ColorPicker.AreaThumb>
  );
});
AreaThumb.displayName = 'ColorPicker.AreaThumb';

export type EyeDropperTriggerProps = ComponentProps<typeof EyeDropperTrigger>;
const EyeDropperTrigger = forwardRef<
  ElementRef<typeof ColorPicker.EyeDropperTrigger>,
  ComponentPropsWithoutRef<typeof ColorPicker.EyeDropperTrigger>
>(function (props, ref) {
  const { classes } = useColorPickerContext();
  const { children, className, ...rest } = props;

  return (
    <ColorPicker.EyeDropperTrigger
      className={cx(classes.eyeDropperTrigger(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </ColorPicker.EyeDropperTrigger>
  );
});
EyeDropperTrigger.displayName = 'ColorPicker.EyeDropperTrigger';

export type ChannelSliderProps = ComponentProps<typeof ChannelSlider>;
const ChannelSlider = forwardRef<
  ElementRef<typeof ColorPicker.ChannelSlider>,
  ComponentPropsWithoutRef<typeof ColorPicker.ChannelSlider>
>(function (props, ref) {
  const { classes } = useColorPickerContext();
  const { children, className, ...rest } = props;

  return (
    <ColorPicker.ChannelSlider
      className={cx(classes.channelSlider(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </ColorPicker.ChannelSlider>
  );
});
ChannelSlider.displayName = 'ColorPicker.ChannelSlider';

export type ChannelSliderTrackProps = ComponentProps<typeof ChannelSliderTrack>;
const ChannelSliderTrack = forwardRef<
  ElementRef<typeof ColorPicker.ChannelSliderTrack>,
  ComponentPropsWithoutRef<typeof ColorPicker.ChannelSliderTrack>
>(function (props, ref) {
  const { classes } = useColorPickerContext();
  const { children, className, ...rest } = props;

  return (
    <ColorPicker.ChannelSliderTrack
      className={cx(classes.channelSliderTrack(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </ColorPicker.ChannelSliderTrack>
  );
});
ChannelSliderTrack.displayName = 'ColorPicker.ChannelSliderTrack';

export type ChannelSliderThumbProps = ComponentProps<typeof ChannelSliderThumb>;
const ChannelSliderThumb = forwardRef<
  ElementRef<typeof ColorPicker.ChannelSliderThumb>,
  ComponentPropsWithoutRef<typeof ColorPicker.ChannelSliderThumb>
>(function (props, ref) {
  const { classes } = useColorPickerContext();
  const { children, className, ...rest } = props;

  return (
    <ColorPicker.ChannelSliderThumb
      className={cx(classes.channelSliderThumb(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </ColorPicker.ChannelSliderThumb>
  );
});
ChannelSliderThumb.displayName = 'ColorPicker.ChannelSliderThumb';

export type TransparencyGridProps = ComponentProps<typeof TransparencyGrid>;
const TransparencyGrid = forwardRef<
  ElementRef<typeof ColorPicker.TransparencyGrid>,
  ComponentPropsWithoutRef<typeof ColorPicker.TransparencyGrid>
>(function (props, ref) {
  const { classes } = useColorPickerContext();
  const { children, className, ...rest } = props;

  return (
    <ColorPicker.TransparencyGrid
      className={cx(classes.transparencyGrid(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </ColorPicker.TransparencyGrid>
  );
});
TransparencyGrid.displayName = 'ColorPicker.TransparencyGrid';

export type SwatchGroupProps = ComponentProps<typeof SwatchGroup>;
const SwatchGroup = forwardRef<
  ElementRef<typeof ColorPicker.SwatchGroup>,
  ComponentPropsWithoutRef<typeof ColorPicker.SwatchGroup>
>(function (props, ref) {
  const { classes } = useColorPickerContext();
  const { children, className, ...rest } = props;

  return (
    <ColorPicker.SwatchGroup
      className={cx(classes.swatchGroup(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </ColorPicker.SwatchGroup>
  );
});
SwatchGroup.displayName = 'ColorPicker.SwatchGroup';

export type SwatchTriggerProps = ComponentProps<typeof SwatchTrigger>;
const SwatchTrigger = forwardRef<
  ElementRef<typeof ColorPicker.SwatchTrigger>,
  ComponentPropsWithoutRef<typeof ColorPicker.SwatchTrigger>
>(function (props, ref) {
  const { classes } = useColorPickerContext();
  const { children, className, ...rest } = props;

  return (
    <ColorPicker.SwatchTrigger
      className={cx(classes.swatchTrigger(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </ColorPicker.SwatchTrigger>
  );
});
SwatchTrigger.displayName = 'ColorPicker.SwatchTrigger';

export {
  Root,
  SwatchTrigger,
  Swatch,
  SwatchGroup,
  Trigger,
  Context,
  Content,
  EyeDropperTrigger,
  TransparencyGrid,
  Control,
  AreaBackground,
  AreaThumb,
  Area,
  Positioner,
  ChannelInput,
  ChannelSlider,
  ChannelSliderThumb,
  ChannelSliderTrack,
};

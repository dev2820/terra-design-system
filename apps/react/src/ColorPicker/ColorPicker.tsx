import { colorPickerAnatomy } from '@ark-ui/anatomy';
import { ColorPicker } from '@ark-ui/react';

import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  forwardRef,
  type ElementRef,
} from 'react';

import { sva, cx } from '../../styled-system/css';
import { createReactContext } from '../create-react-context';

export const colorPickerVariants = sva({
  className: 'colorPicker',
  slots: colorPickerAnatomy.keys(),
  base: {
    root: {
      w: 'full',
      bg: 'white',
      rounded: 'md',
    },
    trigger: {
      w: 'full',
      h: 10,
      paddingX: 4,
      cursor: 'pointer',
      _disabled: {
        opacity: 40,
        cursor: 'not-allowed',
      },
    },
    content: {
      paddingX: 4,
      borderTop: '1px solid',
      borderColor: 'neutral.300',
      overflow: 'hidden',
      _open: {
        animation: 'collapse-in 0.15s ease-in-out',
      },
      _closed: {
        animation: 'collapse-out 0.15s ease-in-out',
      },
      _disabled: {
        opacity: 40,
        cursor: 'not-allowed',
      },
    },
  },
});

type ColorPickerProviderProps = {
  classes: ReturnType<typeof colorPickerVariants>;
};
const [ColorPickerProvider, useColorPickerContext] =
  createReactContext<ColorPickerProviderProps>({
    name: 'colorPicker',
    hookName: 'useColorPickerContext',
    providerName: 'ColorPickerProvider',
    defaultValue: {
      classes: {},
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
        ref={ref}
        className={cx(classes.root, className)}
        {...props}
      >
        <ColorPicker.Label>Color</ColorPicker.Label>
        <ColorPicker.Control>
          <ColorPicker.ChannelInput channel="hex" />
          <ColorPicker.ChannelInput channel="alpha" />
          <ColorPicker.ValueText />
          <ColorPicker.Trigger>
            <ColorPicker.TransparencyGrid />
            {/* <ColorPicker.ValueSwatch /> */}
          </ColorPicker.Trigger>
        </ColorPicker.Control>
        <ColorPicker.Positioner>
          <ColorPicker.Content>
            <ColorPicker.FormatTrigger>
              Toggle ColorFormat
            </ColorPicker.FormatTrigger>
            <ColorPicker.FormatSelect />
            <ColorPicker.Area>
              <ColorPicker.AreaBackground />
              <ColorPicker.AreaThumb />
            </ColorPicker.Area>
            <ColorPicker.ChannelSlider channel="hue">
              <ColorPicker.ChannelSliderTrack />
              <ColorPicker.ChannelSliderThumb />
            </ColorPicker.ChannelSlider>
            <ColorPicker.ChannelSlider channel="alpha">
              <ColorPicker.TransparencyGrid />
              <ColorPicker.ChannelSliderTrack />
              <ColorPicker.ChannelSliderThumb />
            </ColorPicker.ChannelSlider>
            <ColorPicker.SwatchGroup>
              <ColorPicker.SwatchTrigger value="red">
                <ColorPicker.Swatch value="red">
                  <ColorPicker.SwatchIndicator>✓</ColorPicker.SwatchIndicator>
                </ColorPicker.Swatch>
              </ColorPicker.SwatchTrigger>
              <ColorPicker.SwatchTrigger value="blue">
                <ColorPicker.Swatch value="blue">
                  <ColorPicker.SwatchIndicator>✓</ColorPicker.SwatchIndicator>
                </ColorPicker.Swatch>
              </ColorPicker.SwatchTrigger>
              <ColorPicker.SwatchTrigger value="green">
                <ColorPicker.Swatch value="green">
                  <ColorPicker.SwatchIndicator>✓</ColorPicker.SwatchIndicator>
                </ColorPicker.Swatch>
              </ColorPicker.SwatchTrigger>
            </ColorPicker.SwatchGroup>
            <ColorPicker.View format="rgba">
              <ColorPicker.ChannelInput channel="hex" />
              <ColorPicker.ChannelInput channel="alpha" />
            </ColorPicker.View>
            <ColorPicker.View format="hsla">
              <ColorPicker.ChannelInput channel="hue" />
              <ColorPicker.ChannelInput channel="saturation" />
              <ColorPicker.ChannelInput channel="lightness" />
            </ColorPicker.View>
            <ColorPicker.EyeDropperTrigger>
              Pick color
            </ColorPicker.EyeDropperTrigger>
          </ColorPicker.Content>
        </ColorPicker.Positioner>
        <ColorPicker.HiddenInput />
      </ColorPicker.Root>
    </ColorPickerProvider>
  );
});

// export type TriggerProps = ComponentProps<typeof Trigger>;
// const Trigger = forwardRef<
//   ElementRef<typeof colorPicker.Trigger>,
//   ComponentPropsWithoutRef<typeof colorPicker.Trigger>
// >(function (props, ref) {
//   const { classes } = usecolorPickerContext();
//   const { children, className, ...rest } = props;

//   return (
//     <ColorPicker.Trigger
//       className={cx(classes.trigger, className)}
//       ref={ref}
//       {...rest}
//     >
//       {children}
//     </ColorPicker.Trigger>
//   );
// });

// export type ContentProps = ComponentProps<typeof Content>;
// const Content = forwardRef<
//   ElementRef<typeof ColorPicker.Content>,
//   ComponentPropsWithoutRef<typeof ColorPicker.Content>
// >(function (props, ref) {
//   const { classes } = useColorPickerContext();
//   const { children, className, ...rest } = props;

//   return (
//     <ColorPicker.Content
//       className={cx(classes.content, className)}
//       ref={ref}
//       {...rest}
//     >
//       {children}
//     </ColorPicker.Content>
//   );
// });

export { Root };

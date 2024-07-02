import { colorPickerAnatomy } from '@ark-ui/anatomy';
import { ColorPicker } from '@ark-ui/react';
import { PipetteIcon } from 'lucide-react';

import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  forwardRef,
  type ElementRef,
} from 'react';

import { sva, cx, css } from '../../styled-system/css';
import { flex } from '../../styled-system/patterns';
import { IconButton } from '../IconButton';
import { Input } from '../Input';

export const colorPickerVariants = sva({
  className: 'colorPicker',
  slots: colorPickerAnatomy.keys(),
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5',
    },
    control: {
      display: 'flex',
      flexDirection: 'row',
      gap: 2,
    },
    content: {
      background: 'white',
      borderRadius: 'lg',
      boxShadow: 'lg',
      display: 'flex',
      flexDirection: 'column',
      maxWidth: 'sm',
      p: '4',
      zIndex: 'dropdown',
      _open: {
        animation: 'fade-in 0.25s ease-out',
      },
      _closed: {
        animation: 'fade-out 0.2s ease-out',
      },
    },
    area: {
      height: 36,
      borderRadius: 'lg',
      overflow: 'hidden',
    },
    areaThumb: {
      borderRadius: 'full',
      height: 2.5,
      width: 2.5,
      boxShadow: 'white 0px 0px 0px 2px, black 0px 0px 2px 1px',
      outline: 'none',
    },
    areaBackground: {
      height: 'full',
    },
    channelSlider: {
      borderRadius: 'lg',
    },
    channelSliderTrack: {
      height: '3',
      borderRadius: 'lg',
    },
    swatchGroup: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: 2,
      background: 'white',
    },
    swatch: {
      height: 7,
      width: 7,
      borderRadius: 'lg',
      boxShadow: 'white 0px 0px 0px 3px',
      cursor: 'pointer',
    },
    channelSliderThumb: {
      borderRadius: 'full',
      height: '2.5',
      width: '2.5',
      boxShadow: 'white 0px 0px 0px 2px, black 0px 0px 2px 1px',
      transform: 'translate(-50%, -50%)',
      outline: 'none',
    },
    transparencyGrid: {
      borderRadius: 'lg',
    },
  },
});

type ColorPickerProviderProps = {
  classes: ReturnType<typeof colorPickerVariants>;
};

export type RootProps = ComponentProps<typeof Root>;
const Root = forwardRef<
  ElementRef<typeof ColorPicker.Root>,
  ComponentPropsWithoutRef<typeof ColorPicker.Root> & ColorPickerProviderProps
>(({ children, className, ...props }, ref) => {
  const classes = colorPickerVariants();

  return (
    <ColorPicker.Root
      className={cx(classes.root, className)}
      ref={ref}
      {...props}
    >
      <ColorPicker.Context>
        {api => (
          <>
            <ColorPicker.Control className={classes.control}>
              <ColorPicker.ChannelInput channel="hex" asChild>
                <Input className={css({ flex: 1 })} />
              </ColorPicker.ChannelInput>
              <ColorPicker.Trigger asChild>
                <IconButton variant="outline" className={css({ flex: 'none' })}>
                  <ColorPicker.Swatch
                    value={api.value}
                    className={classes.swatch}
                  />
                </IconButton>
              </ColorPicker.Trigger>
            </ColorPicker.Control>
            <ColorPicker.Positioner className={classes.positioner}>
              <ColorPicker.Content className={classes.content}>
                <div className={flex({ gap: 3, direction: 'column' })}>
                  <ColorPicker.Area className={classes.area}>
                    <ColorPicker.AreaBackground
                      className={classes.areaBackground}
                    />
                    <ColorPicker.AreaThumb className={classes.areaThumb} />
                  </ColorPicker.Area>
                  <div className={flex({ direction: 'row', gap: 3 })}>
                    <ColorPicker.EyeDropperTrigger asChild>
                      <IconButton
                        variant="outline"
                        size="sm"
                        aria-label="Pick a color"
                      >
                        <PipetteIcon size={20} />
                      </IconButton>
                    </ColorPicker.EyeDropperTrigger>
                    <div
                      className={cx(
                        flex({ gap: 2, direction: 'column' }),
                        css({ flex: '1' }),
                      )}
                    >
                      <ColorPicker.ChannelSlider
                        channel="hue"
                        className={classes.channelSlider}
                      >
                        <ColorPicker.ChannelSliderTrack
                          className={classes.channelSliderTrack}
                        />
                        <ColorPicker.ChannelSliderThumb
                          className={classes.channelSliderThumb}
                        />
                      </ColorPicker.ChannelSlider>
                      <ColorPicker.ChannelSlider
                        channel="alpha"
                        className={classes.channelSlider}
                      >
                        <ColorPicker.TransparencyGrid
                          size="8px"
                          className={classes.transparencyGrid}
                        />
                        <ColorPicker.ChannelSliderTrack
                          className={classes.channelSliderTrack}
                        />
                        <ColorPicker.ChannelSliderThumb
                          className={classes.channelSliderThumb}
                        />
                      </ColorPicker.ChannelSlider>
                    </div>
                  </div>
                  <div className={cx(flex({ gap: 2 }), css({ flex: '1' }))}>
                    <ColorPicker.ChannelInput channel="hex" asChild>
                      <Input />
                    </ColorPicker.ChannelInput>
                    <ColorPicker.ChannelInput channel="alpha" asChild>
                      <Input />
                    </ColorPicker.ChannelInput>
                  </div>
                  <div className={cx(flex({ gap: 1.5, direction: 'column' }))}>
                    <ColorPicker.SwatchGroup className={classes.swatchGroup}>
                      {presets.map((color, id) => (
                        <ColorPicker.SwatchTrigger
                          key={id}
                          value={color}
                          className={classes.swatchTrigger}
                        >
                          <ColorPicker.Swatch
                            value={color}
                            className={classes.swatch}
                          />
                        </ColorPicker.SwatchTrigger>
                      ))}
                    </ColorPicker.SwatchGroup>
                  </div>
                </div>
              </ColorPicker.Content>
            </ColorPicker.Positioner>
          </>
        )}
      </ColorPicker.Context>
    </ColorPicker.Root>
  );
});

const presets = [
  'hsl(10, 81%, 59%)',
  'hsl(60, 81%, 59%)',
  'hsl(100, 81%, 59%)',
  'hsl(175, 81%, 59%)',
  'hsl(190, 81%, 59%)',
  'hsl(205, 81%, 59%)',
  'hsl(220, 81%, 59%)',
  'hsl(250, 81%, 59%)',
  'hsl(280, 81%, 59%)',
  'hsl(350, 81%, 59%)',
];

export { Root };

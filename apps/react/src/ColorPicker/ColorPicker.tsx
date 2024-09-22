import { ColorPicker } from '@ark-ui/react';
import { IDENTIFIER } from 'env';
import { PipetteIcon } from 'lucide-react';

import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  forwardRef,
  type ElementRef,
} from 'react';

import { cx } from '../cx';
import { IconButton } from '../IconButton';
import { Input } from '../Input';
import { tv } from '../tv';

export const colorPickerVariants = tv({
  base: `${IDENTIFIER.scope} colorPicker`,
  slots: {
    root: 'flex flex-col gap-1.5',
    control: 'flex flex-row gap-2',
    content:
      'bg-white rounded-lg shadow-lg flex flex-col max-w-sm p-4 z-dropdown data-open:animate-fade-in data-closed:animate-fade-out',
    area: 'h-36 rounded-lg overflow-hidden',
    areaThumb:
      'rounded-full h-2.5 w-2.5 shadow-[0_0_0_2px_white,0_0_2px_1px_black] outline-none',
    areaBackground: 'h-full',
    channelSlider: 'rounded-lg',
    channelSliderTrack: 'h-3 rounded-lg',
    swatchGroup: 'grid grid-cols-7 gap-2 bg-white',
    swatch: 'h-7 w-7 rounded-lg shadow-[0_0_0_3px_white] cursor-pointer',
    channelSliderThumb:
      'rounded-full h-2.5 w-2.5 shadow-[0_0_0_2px_white,0_0_2px_1px_black] -translate-x-1/2 -translate-y-1/2 outline-none',
    transparencyGrid: 'rounded-lg',
    positioner: '',
    swatchTrigger: '',
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
      className={cx(classes.root(), className)}
      ref={ref}
      {...props}
    >
      <ColorPicker.Context>
        {api => (
          <>
            <ColorPicker.Control className={classes.control()}>
              <ColorPicker.ChannelInput channel="hex" asChild>
                <Input className="flex-1" />
              </ColorPicker.ChannelInput>
              <ColorPicker.Trigger asChild>
                <IconButton variant="outline" className="flex-none">
                  <ColorPicker.Swatch
                    value={api.value}
                    className={classes.swatch()}
                  />
                </IconButton>
              </ColorPicker.Trigger>
            </ColorPicker.Control>
            <ColorPicker.Positioner className={classes.positioner()}>
              <ColorPicker.Content className={classes.content()}>
                <div className="flex flex-col gap-3">
                  <ColorPicker.Area className={classes.area()}>
                    <ColorPicker.AreaBackground
                      className={classes.areaBackground()}
                    />
                    <ColorPicker.AreaThumb className={classes.areaThumb()} />
                  </ColorPicker.Area>
                  <div className="flex flex-row gap-3">
                    <ColorPicker.EyeDropperTrigger asChild>
                      <IconButton
                        variant="outline"
                        size="sm"
                        aria-label="Pick a color"
                      >
                        <PipetteIcon size={20} />
                      </IconButton>
                    </ColorPicker.EyeDropperTrigger>
                    <div className={cx('flex flex-col gap-2 flex-1')}>
                      <ColorPicker.ChannelSlider
                        channel="hue"
                        className={classes.channelSlider()}
                      >
                        <ColorPicker.ChannelSliderTrack
                          className={classes.channelSliderTrack()}
                        />
                        <ColorPicker.ChannelSliderThumb
                          className={classes.channelSliderThumb()}
                        />
                      </ColorPicker.ChannelSlider>
                      <ColorPicker.ChannelSlider
                        channel="alpha"
                        className={classes.channelSlider()}
                      >
                        <ColorPicker.TransparencyGrid
                          size="8px"
                          className={classes.transparencyGrid()}
                        />
                        <ColorPicker.ChannelSliderTrack
                          className={classes.channelSliderTrack()}
                        />
                        <ColorPicker.ChannelSliderThumb
                          className={classes.channelSliderThumb()}
                        />
                      </ColorPicker.ChannelSlider>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-1">
                    <ColorPicker.ChannelInput channel="hex" asChild>
                      <Input />
                    </ColorPicker.ChannelInput>
                    <ColorPicker.ChannelInput channel="alpha" asChild>
                      <Input />
                    </ColorPicker.ChannelInput>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <ColorPicker.SwatchGroup className={classes.swatchGroup()}>
                      {presets.map((color, id) => (
                        <ColorPicker.SwatchTrigger
                          key={id}
                          value={color}
                          className={classes.swatchTrigger()}
                        >
                          <ColorPicker.Swatch
                            value={color}
                            className={classes.swatch()}
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

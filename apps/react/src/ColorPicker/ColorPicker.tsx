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
    root: 'trds-flex trds-flex-col trds-gap-1.5',
    control: 'trds-flex trds-flex-row trds-gap-2',
    content:
      'trds-bg-white trds-rounded-lg trds-shadow-lg trds-flex trds-flex-col trds-max-w-sm trds-p-4 trds-z-dropdown data-open:trds-animate-fade-in data-closed:trds-animate-fade-out',
    area: 'trds-h-36 trds-rounded-lg trds-overflow-hidden',
    areaThumb:
      'trds-rounded-full trds-h-2.5 trds-w-2.5 trds-shadow-[0_0_0_2px_white,0_0_2px_1px_black] trds-outline-none',
    areaBackground: 'trds-h-full',
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
                <Input className="trds-flex-1" />
              </ColorPicker.ChannelInput>
              <ColorPicker.Trigger asChild>
                <IconButton variant="outline" className="trds-flex-none">
                  <ColorPicker.Swatch
                    value={api.value}
                    className={classes.swatch()}
                  />
                </IconButton>
              </ColorPicker.Trigger>
            </ColorPicker.Control>
            <ColorPicker.Positioner className={classes.positioner()}>
              <ColorPicker.Content className={classes.content()}>
                <div className="trds-flex trds-flex-col trds-gap-3">
                  <ColorPicker.Area className={classes.area()}>
                    <ColorPicker.AreaBackground
                      className={classes.areaBackground()}
                    />
                    <ColorPicker.AreaThumb className={classes.areaThumb()} />
                  </ColorPicker.Area>
                  <div className="trds-flex trds-flex-row trds-gap-3">
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
                        'trds-flex trds-flex-col trds-gap-2 trds-flex-1',
                      )}
                    >
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
                  <div className="trds-flex trds-gap-2 trds-flex-1">
                    <ColorPicker.ChannelInput channel="hex" asChild>
                      <Input />
                    </ColorPicker.ChannelInput>
                    <ColorPicker.ChannelInput channel="alpha" asChild>
                      <Input />
                    </ColorPicker.ChannelInput>
                  </div>
                  <div className="trds-flex trds-flex-col trds-gap-1.5">
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

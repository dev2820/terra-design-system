import { PipetteIcon } from 'lucide-react';

import { cx } from '../cx';
import { IconButton } from '../IconButton';
import { Input } from '../Input';
import { ColorPicker, type ColorPickerProps } from './index';

export default {
  title: 'Components/ColorPicker',
  component: ColorPicker.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

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

export const Default = {
  args: {
    defaultValue: '#eb5e41',
  },
  render: (props: ColorPickerProps['root']) => {
    return (
      <div className="trds-flex trds-w-[600px] trds-h-[500px]">
        <ColorPicker.Root {...props}>
          <ColorPicker.Context>
            {api => (
              <>
                <ColorPicker.Control>
                  <ColorPicker.ChannelInput channel="hex" asChild>
                    <Input className="trds-flex-1" />
                  </ColorPicker.ChannelInput>
                  <ColorPicker.Trigger asChild>
                    <IconButton variant="outline" className="trds-flex-none">
                      <ColorPicker.Swatch value={api.value} />
                    </IconButton>
                  </ColorPicker.Trigger>
                </ColorPicker.Control>
                <ColorPicker.Positioner>
                  <ColorPicker.Content>
                    <div className="trds-flex trds-flex-col trds-gap-3">
                      <ColorPicker.Area>
                        <ColorPicker.AreaBackground />
                        <ColorPicker.AreaThumb />
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
                          <ColorPicker.ChannelSlider channel="hue">
                            <ColorPicker.ChannelSliderTrack />
                            <ColorPicker.ChannelSliderThumb />
                          </ColorPicker.ChannelSlider>
                          <ColorPicker.ChannelSlider channel="alpha">
                            <ColorPicker.TransparencyGrid size="8px" />
                            <ColorPicker.ChannelSliderTrack />
                            <ColorPicker.ChannelSliderThumb />
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
                        <ColorPicker.SwatchGroup>
                          {presets.map((color, id) => (
                            <ColorPicker.SwatchTrigger key={id} value={color}>
                              <ColorPicker.Swatch value={color} />
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
      </div>
    );
  },
};

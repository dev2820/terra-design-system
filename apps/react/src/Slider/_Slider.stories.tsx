import { Slider, type SliderProps } from './index';

export default {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
    },
  },
  args: {
    disabled: false,
  },
};

export const Default = {
  args: {
    defaultValue: [30],
    className: 'trds-w-48',
  },
  render: (props: SliderProps['Root']) => {
    return (
      <Slider.Root {...props}>
        <Slider.Label>Label</Slider.Label>
        <Slider.ValueText />
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb index={0}>
            <Slider.HiddenInput />
          </Slider.Thumb>
        </Slider.Control>
      </Slider.Root>
    );
  },
};

export const Disabled = {
  args: {
    defaultValue: [30],
    disabled: true,
    className: 'trds-w-48',
  },
  render: (props: SliderProps['Root']) => {
    return (
      <Slider.Root {...props}>
        <Slider.Label>Label</Slider.Label>
        <Slider.ValueText />
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb index={0}>
            <Slider.HiddenInput />
          </Slider.Thumb>
        </Slider.Control>
      </Slider.Root>
    );
  },
};

export const Step = {
  args: {
    min: 0,
    max: 100,
    step: 10,
    defaultValue: [30],
    className: 'trds-w-48',
  },
  render: (props: SliderProps['Root']) => {
    return (
      <Slider.Root {...props}>
        <Slider.Label>Label</Slider.Label>
        <Slider.ValueText />
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb index={0}>
            <Slider.HiddenInput />
          </Slider.Thumb>
        </Slider.Control>
      </Slider.Root>
    );
  },
};

export const Size = {
  args: {
    min: 0,
    max: 100,
    defaultValue: [30],
    className: 'trds-w-48',
  },
  render: (props: SliderProps) => {
    return (
      <div className="trds-flex trds-flex-col trds-gap-4">
        <Slider.Root {...props} size="sm">
          <Slider.Label>Label</Slider.Label>
          <Slider.ValueText />
          <Slider.Control>
            <Slider.Track>
              <Slider.Range />
            </Slider.Track>
            <Slider.Thumb index={0}>
              <Slider.HiddenInput />
            </Slider.Thumb>
          </Slider.Control>
        </Slider.Root>
        <Slider.Root {...props} size="md">
          <Slider.Label>Label</Slider.Label>
          <Slider.ValueText />
          <Slider.Control>
            <Slider.Track>
              <Slider.Range />
            </Slider.Track>
            <Slider.Thumb index={0}>
              <Slider.HiddenInput />
            </Slider.Thumb>
          </Slider.Control>
        </Slider.Root>
        <Slider.Root {...props} size="lg">
          <Slider.Label>Label</Slider.Label>
          <Slider.ValueText />
          <Slider.Control>
            <Slider.Track>
              <Slider.Range />
            </Slider.Track>
            <Slider.Thumb index={0}>
              <Slider.HiddenInput />
            </Slider.Thumb>
          </Slider.Control>
        </Slider.Root>
      </div>
    );
  },
};

export const Markers = {
  args: {
    min: 0,
    max: 100,
    defaultValue: [30],
    className: 'trds-w-48',
  },
  render: (props: SliderProps['Root']) => {
    return (
      <Slider.Root {...props}>
        <Slider.Label>Label</Slider.Label>
        <Slider.ValueText />
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb index={0}>
            <Slider.HiddenInput />
          </Slider.Thumb>
        </Slider.Control>
        <Slider.MarkerGroup>
          <Slider.Marker value={0}>0</Slider.Marker>
          <Slider.Marker value={25}>25</Slider.Marker>
          <Slider.Marker value={50}>50</Slider.Marker>
          <Slider.Marker value={75}>75</Slider.Marker>
        </Slider.MarkerGroup>
      </Slider.Root>
    );
  },
};

export const Multiple = {
  args: {
    min: 0,
    max: 100,
    defaultValue: [30, 60],
    className: 'trds-w-48',
  },
  render: (props: SliderProps['Root']) => {
    return (
      <Slider.Root {...props}>
        <Slider.Label>Label</Slider.Label>
        <Slider.ValueText />
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb index={0}>
            <Slider.HiddenInput />
          </Slider.Thumb>
          <Slider.Thumb index={1}>
            <Slider.HiddenInput />
          </Slider.Thumb>
        </Slider.Control>
      </Slider.Root>
    );
  },
};

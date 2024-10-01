import { Slider, type SliderProps } from './index';

/**
 * based on https://ark-ui.com/react/docs/components/collapsible
 */
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
  },
  render: (props: SliderProps) => {
    return <Slider {...props} className="trds-w-48" />;
  },
};

export const Disabled = {
  args: {
    defaultValue: [30],
  },
  render: (props: SliderProps) => {
    return <Slider {...props} className="trds-w-48" disabled={true} />;
  },
};

export const Step = {
  args: {
    min: 0,
    max: 100,
    step: 10,
    defaultValue: [30],
  },
  render: (props: SliderProps) => {
    return <Slider {...props} className="trds-w-48" />;
  },
};

export const Size = {
  args: {
    min: 0,
    max: 100,
    defaultValue: [30],
  },
  render: (props: SliderProps) => {
    return (
      <div className="trds-flex trds-flex-col trds-gap-4">
        <Slider {...props} size={'sm'} className="trds-w-48" />
        <Slider {...props} size={'md'} className="trds-w-48" />
        <Slider {...props} size={'lg'} className="trds-w-48" />
      </div>
    );
  },
};

export const Markers = {
  args: {
    min: 0,
    max: 100,
    defaultValue: [30],
  },
  render: (props: SliderProps) => {
    const markers = [
      { value: 0, marker: '0' },
      { value: 20, marker: '20' },
      { value: 40, marker: '40' },
      { value: 60, marker: '60' },
      { value: 80, marker: '80' },
      { value: 100, marker: '100' },
    ];

    return (
      <Slider
        {...props}
        markers={markers}
        className="trds-w-48 trds-text-blackAlpha-500"
      />
    );
  },
};

export const Multiple = {
  args: {
    min: 0,
    max: 100,
    defaultValue: [30, 60],
  },
  render: (props: SliderProps) => {
    return <Slider {...props} multiple={true} className="trds-w-48" />;
  },
};

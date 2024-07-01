import { css } from '../../styled-system/css';
import { flex } from '../../styled-system/patterns';
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
  argTypes: {},
  args: {},
};

export const Default = {
  args: {
    defaultValue: [30],
  },
  render: (props: SliderProps) => {
    return <Slider {...props} className={css({ width: 200 })} />;
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
    return <Slider {...props} className={css({ width: 200 })} />;
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
      <div className={flex({ direction: 'column', gap: 8 })}>
        <Slider {...props} size={'sm'} className={css({ width: 200 })} />
        <Slider {...props} size={'md'} className={css({ width: 200 })} />
        <Slider {...props} size={'lg'} className={css({ width: 200 })} />
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
        className={css({ width: 200, color: 'blackAlpha.500' })}
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
    return (
      <Slider {...props} multiple={true} className={css({ width: 200 })} />
    );
  },
};

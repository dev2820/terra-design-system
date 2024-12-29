import { RadioGroup, type RadioGroupProps } from './index';

const sizes = ['sm', 'md', 'lg'] as RadioGroupProps['Root']['size'][];

export default {
  title: 'Components/RadioGroup',
  component: RadioGroup.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: sizes,
      control: { type: 'select' },
    },
  },
  args: {
    size: sizes[1],
  },
};

export const Default = {
  args: {},
  render: (props: RadioGroupProps['Root']) => {
    return (
      <RadioGroup.Root {...props}>
        <RadioGroup.Label>Framework</RadioGroup.Label>
        <RadioGroup.Indicator />
        {['vue', 'react', 'solid'].map(framework => (
          <RadioGroup.Item key={framework} value={framework}>
            <RadioGroup.ItemControl />
            <RadioGroup.ItemText>{framework}</RadioGroup.ItemText>
            <RadioGroup.ItemHiddenInput />
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>
    );
  },
};

export const Sizes = {
  args: {
    defaultValue: 'vue',
  },
  render: (props: RadioGroupProps['Root']) => {
    return (
      <>
        <div className="trds-w-48 trds-flex trds-flex-col trds-gap-4">
          <RadioGroup.Root {...props} size="sm">
            <RadioGroup.Label>Framework</RadioGroup.Label>
            <RadioGroup.Indicator />
            {['vue', 'react', 'solid'].map(framework => (
              <RadioGroup.Item key={framework} value={framework}>
                <RadioGroup.ItemControl />
                <RadioGroup.ItemText>{framework}</RadioGroup.ItemText>
                <RadioGroup.ItemHiddenInput />
              </RadioGroup.Item>
            ))}
          </RadioGroup.Root>
          <hr />
          <RadioGroup.Root size="md" {...props}>
            <RadioGroup.Label>Framework</RadioGroup.Label>
            <RadioGroup.Indicator />
            {['vue', 'react', 'solid'].map(framework => (
              <RadioGroup.Item key={framework} value={framework}>
                <RadioGroup.ItemControl />
                <RadioGroup.ItemText>{framework}</RadioGroup.ItemText>
                <RadioGroup.ItemHiddenInput />
              </RadioGroup.Item>
            ))}
          </RadioGroup.Root>
          <hr />
          <RadioGroup.Root size="lg" {...props}>
            <RadioGroup.Label>Framework</RadioGroup.Label>
            <RadioGroup.Indicator />
            {['vue', 'react', 'solid'].map(framework => (
              <RadioGroup.Item key={framework} value={framework}>
                <RadioGroup.ItemControl />
                <RadioGroup.ItemText>{framework}</RadioGroup.ItemText>
                <RadioGroup.ItemHiddenInput />
              </RadioGroup.Item>
            ))}
          </RadioGroup.Root>
        </div>
      </>
    );
  },
};

export const Disabled = {
  args: {
    defaultValue: 'item1',
  },
  render: (props: RadioGroupProps['Root']) => {
    return (
      <>
        <div className="trds-w-48 trds-flex trds-flex-col trds-gap-4">
          <RadioGroup.Root {...props} disabled>
            <RadioGroup.Label>Framework</RadioGroup.Label>
            <RadioGroup.Indicator />
            <RadioGroup.Item value={'item1'}>
              <RadioGroup.ItemControl />
              <RadioGroup.ItemText>item1</RadioGroup.ItemText>
              <RadioGroup.ItemHiddenInput />
            </RadioGroup.Item>
            <RadioGroup.Item value={'item2'}>
              <RadioGroup.ItemControl />
              <RadioGroup.ItemText>item2</RadioGroup.ItemText>
              <RadioGroup.ItemHiddenInput />
            </RadioGroup.Item>
          </RadioGroup.Root>
          <hr />
          <RadioGroup.Root {...props}>
            <RadioGroup.Label>Framework</RadioGroup.Label>
            <RadioGroup.Indicator />
            <RadioGroup.Item value={'item1'} disabled>
              <RadioGroup.ItemControl />
              <RadioGroup.ItemText>item1</RadioGroup.ItemText>
              <RadioGroup.ItemHiddenInput />
            </RadioGroup.Item>
            <RadioGroup.Item value={'item2'}>
              <RadioGroup.ItemControl />
              <RadioGroup.ItemText>item2</RadioGroup.ItemText>
              <RadioGroup.ItemHiddenInput />
            </RadioGroup.Item>
          </RadioGroup.Root>
        </div>
      </>
    );
  },
};

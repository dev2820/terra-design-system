import { css } from '../../styled-system/css';
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
  render: (props: RadioGroupProps) => {
    return (
      <RadioGroup.Root {...props}>
        <RadioGroup.Item value="react">React</RadioGroup.Item>
        <RadioGroup.Item value="vue">Vue</RadioGroup.Item>
        <RadioGroup.Item value="svelte">Svelte</RadioGroup.Item>
        <RadioGroup.Item value="solid">Solid</RadioGroup.Item>
      </RadioGroup.Root>
    );
  },
};

export const Sizes = {
  args: {},
  render: () => {
    return (
      <>
        <div
          className={css({
            width: 400,
            display: 'flex',
            flexDir: 'column',
            gap: 4,
          })}
        >
          <RadioGroup.Root size="sm" defaultValue="item 1">
            <RadioGroup.Item value="item 1">item 1</RadioGroup.Item>
            <RadioGroup.Item value="item 2">item 2</RadioGroup.Item>
          </RadioGroup.Root>
          <hr />
          <RadioGroup.Root size="md" defaultValue="item 1">
            <RadioGroup.Item value="item 1">item 1</RadioGroup.Item>
            <RadioGroup.Item value="item 2">item 2</RadioGroup.Item>
          </RadioGroup.Root>
          <hr />
          <RadioGroup.Root size="lg" defaultValue="item 1">
            <RadioGroup.Item value="item 1">item 1</RadioGroup.Item>
            <RadioGroup.Item value="item 2">item 2</RadioGroup.Item>
          </RadioGroup.Root>
        </div>
      </>
    );
  },
};

export const Disabled = {
  args: {},
  render: () => {
    return (
      <>
        <div
          className={css({
            width: 400,
            display: 'flex',
            flexDir: 'column',
            gap: 4,
          })}
        >
          <RadioGroup.Root defaultValue="item 1" disabled>
            <RadioGroup.Item value="item 1">item 1</RadioGroup.Item>
            <RadioGroup.Item value="item 2">item 2</RadioGroup.Item>
          </RadioGroup.Root>
          <hr />
          <RadioGroup.Root size="md" defaultValue="item 1">
            <RadioGroup.Item value="item 1" disabled>
              item 1
            </RadioGroup.Item>
            <RadioGroup.Item value="item 2">item 2</RadioGroup.Item>
          </RadioGroup.Root>
        </div>
      </>
    );
  },
};

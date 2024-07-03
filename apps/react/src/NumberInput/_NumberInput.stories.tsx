import { NumberInput, type NumberInputProps } from './index';

export default {
  title: 'Components/NumberInput',
  component: NumberInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
    },
    invalid: {
      control: { type: 'boolean' },
    },
    type: {
      options: ['text', 'password', 'number', 'file', 'date'],
      control: { type: 'select' },
    },
  },
  args: {
    disabled: false,
    invalid: false,
    type: 'text',
  },
};

export const Default = {
  args: {
    placeholder: 'input number',
    defaultValue: 0,
  },
  render: (props: NumberInputProps) => {
    return <NumberInput {...props} />;
  },
};

export const Disabled = {
  args: {
    placeholder: 'input number',
  },
  render: (props: NumberInputProps) => {
    return <NumberInput {...props} disabled />;
  },
};

export const Invalid = {
  args: {
    placeholder: 'input number',
  },
  render: (props: NumberInputProps) => {
    return <NumberInput {...props} invalid />;
  },
};

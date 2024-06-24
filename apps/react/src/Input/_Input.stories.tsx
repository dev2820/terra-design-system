import { Input, InputProps } from './Input';

export default {
  title: 'Components/Input',
  component: Input,
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
    placeholder: 'input email',
  },
  render: (props: InputProps) => {
    return <Input {...props} />;
  },
};

export const Disabled = {
  args: {},
  render: () => {
    return <Input placeholder="input email" disabled />;
  },
};

export const Invalid = {
  args: {},
  render: () => {
    return <Input placeholder="input email" invalid />;
  },
};

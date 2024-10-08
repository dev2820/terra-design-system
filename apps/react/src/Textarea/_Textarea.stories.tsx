import { Textarea, TextareaProps } from './index';

const sizes = ['sm', 'md', 'lg'] as TextareaProps['size'][];

export default {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: sizes,
      control: { type: 'select' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    invalid: {
      control: { type: 'boolean' },
    },
  },
  args: {
    size: sizes[1],
    disabled: false,
    invalid: false,
  },
};

export const Default = {
  args: {},
  render: (props: TextareaProps) => {
    return <Textarea {...props}></Textarea>;
  },
};

export const Sizes = {
  args: {},
  render: () => {
    return (
      <div className="trds-flex trds-flex-row trds-items-start trds-gap-4 trds-w-96 trds-h-48">
        <Textarea size="sm" />
        <Textarea size="md" />
        <Textarea size="lg" />
      </div>
    );
  },
};

export const Disabled = {
  args: {},
  render: () => {
    return <Textarea disabled>Hello world</Textarea>;
  },
};

export const Invalid = {
  args: {},
  render: () => {
    return <Textarea invalid>Hello world</Textarea>;
  },
};

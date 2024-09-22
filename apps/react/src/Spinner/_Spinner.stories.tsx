import { Spinner, type SpinnerProps } from './index';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as SpinnerProps['size'][];

export default {
  title: 'Components/Spinner',
  component: Spinner,
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
    size: sizes[2],
  },
};

export const Default = {
  args: {
    label: 'loading...',
  },
  render: (props: SpinnerProps) => {
    return <Spinner {...props} />;
  },
};

export const Size = {
  args: {
    label: 'loading...',
  },
  render: (props: SpinnerProps) => {
    return (
      <div className="flex flex-row gap-4">
        {sizes.map(size => (
          <Spinner {...props} size={size} key={size} />
        ))}
      </div>
    );
  },
};

export const Color = {
  args: {
    label: 'loading...',
  },
  render: (props: SpinnerProps) => {
    return (
      <Spinner {...props} className="border-b-blue-500 border-l-blue-500" />
    );
  },
};

export const Track = {
  args: {
    label: 'loading...',
  },
  render: (props: SpinnerProps) => {
    return <Spinner {...props} className="border-green-500" />;
  },
};

export const Width = {
  args: {
    label: 'loading...',
  },
  render: (props: SpinnerProps) => {
    return <Spinner {...props} className="border-4" />;
  },
};

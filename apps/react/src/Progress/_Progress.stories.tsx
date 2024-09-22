import { Progress, ProgressProps } from './index';

const sizes = ['sm', 'md', 'lg', 'icon'] as ProgressProps['size'][];
const variants = ['linear', 'circular'] as ProgressProps['variant'][];

export default {
  title: 'Components/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: sizes,
      control: { type: 'select' },
    },
    variant: {
      options: variants,
      control: { type: 'select' },
    },
  },
  args: {
    size: sizes[1],
    variant: variants[0],
  },
};

export const Default = {
  args: {},
  render: (props: ProgressProps) => {
    return <Progress {...props} className="w-48" />;
  },
};

export const Variant = {
  args: {},
  render: () => {
    return (
      <div className="w-48 flex flex-col gap-4">
        {variants.map(variant => (
          <Progress variant={variant} key={variant}></Progress>
        ))}
      </div>
    );
  },
};

export const Sizes = {
  args: {},
  render: () => {
    return (
      <>
        <div className="w-48 flex flex-col gap-4 mb-4">
          <Progress size="sm"></Progress>
          <Progress size="md"></Progress>
          <Progress size="lg"></Progress>
        </div>
        <div className="flex flex-row gap-4">
          <Progress size="sm" variant="circular"></Progress>
          <Progress size="md" variant="circular"></Progress>
          <Progress size="lg" variant="circular"></Progress>
        </div>
      </>
    );
  },
};

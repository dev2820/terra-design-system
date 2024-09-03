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
    return <Progress {...props} className="trds-w-48" />;
  },
};

export const Variant = {
  args: {},
  render: () => {
    return (
      <div className="trds-w-48 trds-flex trds-flex-col trds-gap-4">
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
        <div className="trds-w-48 trds-flex trds-flex-col trds-gap-4 trds-mb-4">
          <Progress size="sm"></Progress>
          <Progress size="md"></Progress>
          <Progress size="lg"></Progress>
        </div>
        <div className="trds-flex trds-flex-row trds-gap-4">
          <Progress size="sm" variant="circular"></Progress>
          <Progress size="md" variant="circular"></Progress>
          <Progress size="lg" variant="circular"></Progress>
        </div>
      </>
    );
  },
};

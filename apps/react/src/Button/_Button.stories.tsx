import { EllipsisIcon, SearchIcon } from 'lucide-react';

import { Button, ButtonProps } from './Button';

const sizes = ['xs', 'sm', 'md', 'lg'] as ButtonProps['size'][];
const colors = [
  'primary',
  'neutral',
  'whiteAlpha',
  'danger',
] as ButtonProps['theme'][];
const variants = ['filled', 'outline', 'ghost'] as ButtonProps['variant'][];

export default {
  title: 'Components/Button',
  component: Button,
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
    theme: {
      options: colors,
      control: { type: 'select' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
  },
  args: {
    size: sizes[2],
    variant: variants[0],
    theme: colors[1],
    disabled: false,
    loading: false,
  },
};

export const Default = {
  args: {},
  render: (props: ButtonProps) => {
    return <Button {...props}>Click me</Button>;
  },
};

export const Variant = {
  args: {},
  render: () => {
    return (
      <div className="trds-flex trds-flex-row trds-gap-4">
        {variants.map(variant => (
          <Button variant={variant} theme="neutral" key={variant}>
            Click me
          </Button>
        ))}
      </div>
    );
  },
};

export const ColorScheme = {
  args: {},
  render: () => {
    return (
      <div className="trds-flex trds-flex-row trds-gap-4">
        {colors.map(color => (
          <Button theme={color} key={color}>
            Click me
          </Button>
        ))}
      </div>
    );
  },
};

export const Sizes = {
  args: {},
  render: () => {
    return (
      <div className="trds-flex trds-flex-row trds-gap-4">
        <Button size="xs">Click me</Button>
        <Button size="sm">Click me</Button>
        <Button size="md">Click me</Button>
        <Button size="lg">Click me</Button>
      </div>
    );
  },
};

export const Loading = {
  args: {},
  render: () => {
    return (
      <div className="trds-flex trds-flex-row trds-gap-4">
        <Button loading>Click me</Button>
        <Button loading loadingIcon={<EllipsisIcon size={20} />}>
          Click me
        </Button>
      </div>
    );
  },
};

export const Icon = {
  args: {},
  render: () => {
    return (
      <div className="trds-flex trds-flex-row trds-gap-4">
        <Button leftIcon={<SearchIcon size={20} />}>Click me</Button>
        <Button rightIcon={<SearchIcon size={20} />}>Click me</Button>
      </div>
    );
  },
};

export const Disabled = {
  args: {},
  render: () => {
    return (
      <div className="trds-flex trds-flex-row trds-gap-4">
        <Button disabled>Click me</Button>
      </div>
    );
  },
};

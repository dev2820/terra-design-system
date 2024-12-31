import { EllipsisIcon, SearchIcon } from 'lucide-react';

import { IconButton, IconButtonProps } from './IconButton';

const sizes = ['xs', 'sm', 'md', 'lg'] as IconButtonProps['size'][];
const colors = ['primary', 'grayscale'] as IconButtonProps['theme'][];
const variants = ['filled', 'outline', 'ghost'] as IconButtonProps['variant'][];

export default {
  title: 'Components/IconButton',
  component: IconButton,
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
    size: sizes[1],
    variant: variants[0],
    theme: colors[1],
    disabled: false,
    loading: false,
  },
};

export const Default = {
  args: {},
  render: (props: IconButtonProps) => {
    return (
      <IconButton {...props}>
        <SearchIcon size={20} />
      </IconButton>
    );
  },
};

export const Variant = {
  args: {},
  render: () => {
    return (
      <div className="trds-flex trds-flex-row trds-gap-4">
        {variants.map(variant => (
          <IconButton variant={variant} theme="grayscale" key={variant}>
            <SearchIcon size={20} />
          </IconButton>
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
          <IconButton theme={color} key={color}>
            <SearchIcon size={20} />
          </IconButton>
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
        <IconButton size="xs">
          <SearchIcon size={20} />
        </IconButton>
        <IconButton size="sm">
          <SearchIcon size={20} />
        </IconButton>
        <IconButton size="md">
          <SearchIcon size={20} />
        </IconButton>
        <IconButton size="lg">
          <SearchIcon size={20} />
        </IconButton>
      </div>
    );
  },
};

export const Loading = {
  args: {},
  render: () => {
    return (
      <div className="trds-flex trds-flex-row trds-gap-4">
        <IconButton loading>
          <SearchIcon size={20} />
        </IconButton>
        <IconButton loading loadingIcon={<EllipsisIcon size={20} />}>
          <SearchIcon size={20} />
        </IconButton>
      </div>
    );
  },
};

export const Disabled = {
  args: {},
  render: () => {
    return (
      <div className="trds-flex trds-flex-row trds-gap-4">
        <IconButton disabled>
          <SearchIcon size={20} />
        </IconButton>
      </div>
    );
  },
};

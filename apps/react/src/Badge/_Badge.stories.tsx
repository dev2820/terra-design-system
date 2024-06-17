import { css } from '../../styled-system/css';
import { Badge, type BadgeProps } from './index';

const themes = [
  'primary',
  'error',
  'warning',
  'info',
  'success',
] as BadgeProps['theme'][];
const variants = ['filled', 'outline', 'subtle'] as BadgeProps['variant'][];

export default {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: variants,
      control: { type: 'select' },
    },
    theme: {
      options: themes,
      control: { type: 'select' },
    },
  },
  args: {
    variant: variants[0],
    theme: themes[0],
  },
};

export const Default = {
  args: {
    text: 'new',
  },
  render: (props: BadgeProps) => {
    return <Badge {...props} />;
  },
};

export const Variant = {
  args: {
    text: 'new',
  },
  render: (props: BadgeProps) => {
    return (
      <div className={css({ display: 'flex', flexDir: 'row', gap: 4 })}>
        {variants.map(variant => (
          <Badge {...props} variant={variant} key={variant} />
        ))}
      </div>
    );
  },
};

export const Theme = {
  args: {
    text: 'new',
  },
  render: (props: BadgeProps) => {
    return (
      <div className={css({ display: 'flex', flexDir: 'row', gap: 4 })}>
        {themes.map(color => (
          <Badge {...props} theme={color} key={color} />
        ))}
      </div>
    );
  },
};

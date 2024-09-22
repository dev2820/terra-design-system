import { Badge, type BadgeProps } from './index';

const themes = [
  'primary',
  'error',
  'warning',
  'info',
  'success',
] as BadgeProps['theme'][];
const variants = ['filled', 'subtle', 'outline'] as BadgeProps['variant'][];

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
      <div className="flex flex-row gap-4">
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
      <div className="grid grid-rows-3 grid-cols-5 gap-4">
        {themes.map(color => (
          <Badge {...props} theme={color} key={color} />
        ))}
        {themes.map(color => (
          <Badge
            {...props}
            theme={color}
            key={`subtle-` + color}
            variant="subtle"
          />
        ))}
        {themes.map((color, i) => (
          <Badge
            {...props}
            theme={color}
            key={`outline-` + color}
            className={`columns-${i}`}
            variant="outline"
          />
        ))}
      </div>
    );
  },
};

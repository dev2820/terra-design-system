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
    children: 'new',
  },
  render: (props: BadgeProps) => {
    return <Badge {...props} />;
  },
};

export const Variant = {
  args: {
    children: 'new',
  },
  render: (props: BadgeProps) => {
    return (
      <div className="trds-flex trds-flex-row trds-gap-4">
        {variants.map(variant => (
          <Badge {...props} variant={variant} key={variant} />
        ))}
      </div>
    );
  },
};

export const Theme = {
  args: {
    children: 'new',
  },
  render: (props: BadgeProps) => {
    return (
      <div className="trds-grid trds-grid-rows-3 trds-grid-cols-5 trds-gap-4">
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
            className={`trds-columns-${i}`}
            variant="outline"
          />
        ))}
      </div>
    );
  },
};

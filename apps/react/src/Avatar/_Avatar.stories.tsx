import { UserIcon } from 'lucide-react';

import { Avatar, type AvatarProps } from './index';

const sizes = ['sm', 'md', 'lg', 'xl', '2xl'] as AvatarProps['size'][];
/**
 * based on https://ark-ui.com/react/docs/components/avatar
 */
export default {
  title: 'Components/Avatar',
  component: Avatar,
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
  args: {},
};

export const Default = {
  args: {
    alt: 'pravatar',
    src: 'https://i.pravatar.cc/500',
    size: 'md',
  },
  render: (props: AvatarProps) => {
    return <Avatar {...props} />;
  },
};

export const Size = {
  args: {
    alt: 'pravatar',
    src: 'https://i.pravatar.cc/500',
  },
  render: (props: AvatarProps) => {
    return (
      <div className={'trds-flex trds-flex-row trds-gap-1'}>
        {sizes.map(size => (
          <Avatar size={size} key={size} {...props} />
        ))}
      </div>
    );
  },
};

export const ImageWithChildren = {
  args: {
    children: <img src="https://i.pravatar.cc/500" alt="pravatar" />,
  },
  render: ({ children, ...props }: AvatarProps) => {
    return <Avatar {...props}>{children}</Avatar>;
  },
};

export const Fallback = {
  args: {
    alt: 'pravatar',
    fallback: <UserIcon size={40} className={'trds-bg-neutral-200'} />,
  },
  render: (props: AvatarProps) => {
    return <Avatar {...props} />;
  },
};

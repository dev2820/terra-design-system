import { UserIcon } from 'lucide-react';

import { Avatar, type AvatarProps } from './index';

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
  argTypes: {},
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
    const sizes = ['sm', 'md', 'lg'] as AvatarProps['size'][];
    return (
      <div className={'flex flex-row gap-1'}>
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
    fallback: <UserIcon size={40} className={'bg-neutral-200'} />,
  },
  render: (props: AvatarProps) => {
    return <Avatar {...props} />;
  },
};

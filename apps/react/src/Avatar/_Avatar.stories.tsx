import { UserIcon } from 'lucide-react';

import { Avatar, type AvatarProps } from './index';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as AvatarProps['size'][];

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
    alt: 'dev2820',
    src: 'https://avatars.githubusercontent.com/u/40891497?v=4',
    size: 'md',
  },
  render: (props: AvatarProps) => {
    return <Avatar {...props} />;
  },
};

export const Size = {
  args: {
    alt: 'dev2820',
    src: 'https://avatars.githubusercontent.com/u/40891497?v=4',
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

export const SizeWithNumber = {
  args: {
    alt: 'dev2820',
    src: 'https://avatars.githubusercontent.com/u/40891497?v=4',
    size: 128,
  },
  render: (props: AvatarProps) => {
    return <Avatar {...props} />;
  },
};

export const ImageWithChildren = {
  args: {
    children: (
      <img
        src="https://avatars.githubusercontent.com/u/40891497?v=4"
        alt="dev2820"
      />
    ),
  },
  render: ({ children, ...props }: AvatarProps) => {
    return <Avatar {...props}>{children}</Avatar>;
  },
};

export const Fallback = {
  args: {
    alt: 'dev2820',
    fallback: <UserIcon size={40} />,
  },
  render: (props: AvatarProps) => {
    return <Avatar {...props} />;
  },
};

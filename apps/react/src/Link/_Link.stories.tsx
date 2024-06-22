import { ExternalLinkIcon, LinkIcon } from 'lucide-react';

import { useEffect, useRef } from 'react';

import { css } from '../../styled-system/css';
import { Link, type LinkProps } from './index';

export default {
  title: 'Components/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

export const Default = {
  args: {
    href: 'https://www.google.com',
  },
  render: (props: LinkProps) => {
    return <Link {...props}>Google</Link>;
  },
};

export const WithIcon = {
  args: {
    href: 'https://google.com',
    target: '_blank',
  },
  render: (props: LinkProps) => {
    return (
      <div className={css({ display: 'flex', flexDir: 'column', gap: 4 })}>
        <Link {...props} leftIcon={<ExternalLinkIcon size={16} />}>
          Google
        </Link>
        <Link {...props} rightIcon={<LinkIcon size={16} />}>
          Google
        </Link>
      </div>
    );
  },
};

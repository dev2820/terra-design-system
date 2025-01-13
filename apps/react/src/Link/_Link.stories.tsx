import { ExternalLinkIcon, LinkIcon } from 'lucide-react';

import { Button } from '../Button';
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
    href: 'https://github.com/dev2820/terra-design-system',
  },
  render: (props: LinkProps) => {
    return <Link {...props}>Github</Link>;
  },
};

export const Theme = {
  args: {
    href: 'https://github.com/dev2820/terra-design-system',
  },
  render: (props: LinkProps) => {
    return (
      <div className="trds-flex trds-flex-col trds-gap-4">
        <Link {...props} theme="default">
          Github
        </Link>
        <Link {...props} theme="primary">
          Github
        </Link>
      </div>
    );
  },
};
export const Variant = {
  args: {
    href: 'https://github.com/dev2820/terra-design-system',
  },
  render: (props: LinkProps) => {
    return (
      <div className="trds-flex trds-flex-col trds-gap-4">
        <Link {...props} variant="plain">
          Github
        </Link>
        <Link {...props} variant="underline">
          Github
        </Link>
      </div>
    );
  },
};

export const WithIcon = {
  args: {
    href: 'https://github.com/dev2820/terra-design-system',
    target: '_blank',
  },
  render: (props: LinkProps) => {
    return (
      <div className="trds-flex trds-flex-col trds-gap-4">
        <Link {...props} leftIcon={<LinkIcon size={16} />}>
          Github
        </Link>
        <Link {...props} rightIcon={<ExternalLinkIcon size={16} />}>
          Github
        </Link>
      </div>
    );
  },
};

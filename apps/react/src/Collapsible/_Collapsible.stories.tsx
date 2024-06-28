import { ChevronDownIcon } from 'lucide-react';

import { css } from '../../styled-system/css';
import { flex, spacer } from '../../styled-system/patterns';
import { Collapsible, type CollapsibleProps } from './index';

/**
 * based on https://ark-ui.com/react/docs/components/collapsible
 */
export default {
  title: 'Components/Collapsible',
  component: Collapsible.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

export const Default = {
  args: {},
  render: (props: CollapsibleProps['root']) => {
    return (
      <div className={css({ width: '600px', height: '500px' })}>
        <Collapsible.Root {...props}>
          <Collapsible.Trigger>
            <div className={flex({ alignItems: 'center' })}>
              <span>Loream Ipsume</span>
              <div className={spacer()}></div>
              <ChevronDownIcon size={24} />
            </div>
          </Collapsible.Trigger>
          <Collapsible.Content>
            <div className={css({ paddingY: 4 })}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
          </Collapsible.Content>
        </Collapsible.Root>
      </div>
    );
  },
};

export const WithIcon = {
  args: {},
  render: (props: CollapsibleProps['root']) => {
    return (
      <div className={css({ width: '600px', height: '500px' })}>
        <Collapsible.Root {...props}>
          <Collapsible.Trigger
            className={css({
              display: 'flex',
              alignItems: 'center',
              _open: { '& > svg': { rotate: '-180deg' } },
            })}
          >
            <div>Loream Ipsume</div>
            <div className={spacer()}></div>
            <ChevronDownIcon
              size={24}
              className={css({
                transformOrigin: 'center',
                transitionDuration: 'normal',
                transitionProperty: 'all',
              })}
            />
          </Collapsible.Trigger>
          <Collapsible.Content>
            <div className={css({ paddingY: 4 })}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
          </Collapsible.Content>
        </Collapsible.Root>
      </div>
    );
  },
};

export const Disabled = {
  args: {
    disabled: true,
  },
  render: (props: CollapsibleProps['root']) => {
    return (
      <div className={css({ width: '600px', height: '500px' })}>
        <Collapsible.Root {...props}>
          <Collapsible.Trigger>
            <div className={flex({ alignItems: 'center' })}>
              <span>Loream Ipsume</span>
              <div className={spacer()}></div>
              <ChevronDownIcon size={24} />
            </div>
          </Collapsible.Trigger>
          <Collapsible.Content>
            <div className={css({ paddingY: 4 })}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
          </Collapsible.Content>
        </Collapsible.Root>
      </div>
    );
  },
};

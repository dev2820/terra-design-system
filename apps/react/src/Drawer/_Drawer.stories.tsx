import { Portal } from '@ark-ui/react';
import { XIcon } from 'lucide-react';

import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { Drawer, type DrawerProps } from './index';

const variants = ['left', 'right', 'bottom'];
/**
 * based on https://ark-ui.com/react/docs/components/dialog
 */
export default {
  title: 'Components/Drawer',
  component: Drawer.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: variants,
      control: { type: 'select' },
    },
  },
  args: {
    variant: 'left',
  },
};

export const Default = {
  args: {},
  render: (props: DrawerProps['root']) => {
    return (
      <Drawer.Root {...props}>
        <Drawer.Trigger asChild>
          <Button>Open Drawer</Button>
        </Drawer.Trigger>
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content className="trds-w-[400px] trds-p-4">
              <Drawer.Header>
                <Drawer.Title className="trds-flex trds-flex-row trds-justify-between trds-mb-4">
                  <span className="trds-leading-[200%]">Lorem Ipsum</span>
                  <Drawer.CloseTrigger asChild>
                    <IconButton size="sm" variant="ghost">
                      <XIcon size={16} />
                    </IconButton>
                  </Drawer.CloseTrigger>
                </Drawer.Title>
                <Drawer.Description className="trds-mb-4">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </Drawer.Description>
              </Drawer.Header>
              <Drawer.Body>Hello World</Drawer.Body>
              <Drawer.Footer>
                <div className="trds-flex trds-flex-row-reverse trds-gap-2 trds-w-full">
                  <Button variant="filled" theme="primary">
                    Confirm
                  </Button>
                  <Drawer.CloseTrigger asChild>
                    <Button
                      variant="outline"
                      theme="neutral"
                      aria-label="Close Drawer"
                    >
                      Close
                    </Button>
                  </Drawer.CloseTrigger>
                </div>
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    );
  },
};

export const Variant = {
  args: {
    variant: 'left',
  },
  render: (props: DrawerProps['root']) => {
    return (
      <Drawer.Root {...props}>
        <Drawer.Trigger asChild>
          <Button>Open Drawer</Button>
        </Drawer.Trigger>
        <Drawer.Content className="trds-w-[400px] trds-p-4">
          <Drawer.Header>
            <Drawer.Title className="trds-flex trds-flex-row trds-justify-between trds-mb-4">
              <span className="trds-leading-[200%]">Lorem Ipsum</span>
              <Drawer.CloseTrigger asChild>
                <IconButton size="sm" variant="ghost">
                  <XIcon size={16} />
                </IconButton>
              </Drawer.CloseTrigger>
            </Drawer.Title>
            <Drawer.Description>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </Drawer.Description>
          </Drawer.Header>
          <Drawer.Body>Hello World</Drawer.Body>
          <Drawer.Footer>
            <div className="trds-flex trds-flex-row-reverse trds-gap-2 trds-w-full">
              <Button variant="filled" theme="primary">
                Confirm
              </Button>
              <Drawer.CloseTrigger asChild>
                <Button
                  variant="outline"
                  theme="neutral"
                  aria-label="Close Drawer"
                >
                  Close
                </Button>
              </Drawer.CloseTrigger>
            </div>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Root>
    );
  },
};

export const VariantBottom = {
  args: {
    variant: 'bottom',
  },
  render: (props: DrawerProps['root']) => {
    return (
      <Drawer.Root {...props}>
        <Drawer.Trigger asChild>
          <Button>Open Drawer</Button>
        </Drawer.Trigger>
        <Drawer.Content className="trds-h-[400px] trds-p-4">
          <Drawer.Header>
            <Drawer.Title className="trds-flex trds-flex-row trds-justify-between trds-mb-4">
              <span className="trds-leading-[200%]">Lorem Ipsum</span>
              <Drawer.CloseTrigger asChild>
                <IconButton size="sm" variant="ghost">
                  <XIcon size={16} />
                </IconButton>
              </Drawer.CloseTrigger>
            </Drawer.Title>
            <Drawer.Description>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </Drawer.Description>
          </Drawer.Header>
          <Drawer.Body>Hello World</Drawer.Body>
          <Drawer.Footer>
            <div className="trds-flex trds-flex-row-reverse trds-gap-2 trds-w-full">
              <Button variant="filled" theme="primary">
                Confirm
              </Button>
              <Drawer.CloseTrigger asChild>
                <Button
                  variant="outline"
                  theme="neutral"
                  aria-label="Close Drawer"
                >
                  Close
                </Button>
              </Drawer.CloseTrigger>
            </div>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Root>
    );
  },
};

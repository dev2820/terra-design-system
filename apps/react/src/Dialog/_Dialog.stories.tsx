import { Portal } from '@ark-ui/react';
import { XIcon } from 'lucide-react';

import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { Dialog, type DialogProps } from './index';

/**
 * based on https://ark-ui.com/react/docs/components/dialog
 */
export default {
  title: 'Components/Dialog',
  component: Dialog.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

export const Default = {
  args: {},
  render: (props: DialogProps['root']) => {
    return (
      <Dialog.Root {...props}>
        <Dialog.Trigger asChild>
          <Button>Open Dialog</Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content className="trds-w-[400px] trds-p-4">
              <Dialog.CloseTrigger asChild>
                <IconButton
                  className="trds-absolute trds-right-4 trds-top-3"
                  size="sm"
                  variant="ghost"
                >
                  <XIcon size={16} />
                </IconButton>
              </Dialog.CloseTrigger>
              <Dialog.Title>Lorem Ipsume</Dialog.Title>
              <Dialog.Description>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </Dialog.Description>
              <div className="trds-flex trds-flex-row-reverse trds-gap-2 trds-w-full">
                <Button variant="filled" theme="primary">
                  Confirm
                </Button>
                <Dialog.CloseTrigger asChild>
                  <Button
                    variant="outline"
                    theme="neutral"
                    aria-label="Close Dialog"
                  >
                    Close
                  </Button>
                </Dialog.CloseTrigger>
              </div>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    );
  },
};

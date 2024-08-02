import { XIcon } from 'lucide-react';

import { css } from '../../styled-system/css';
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
      <div className={css({ width: '600px', height: '500px' })}>
        <Dialog.Root {...props}>
          <Dialog.Trigger>
            <Button>Open Dialog</Button>
          </Dialog.Trigger>
          <Dialog.Content className={css({ w: 400, p: 4 })}>
            <Dialog.CloseTrigger asChild>
              <IconButton
                className={css({ position: 'absolute', right: 4, top: 3 })}
                size="sm"
                variant="ghost"
              >
                <XIcon size={16} />
              </IconButton>
            </Dialog.CloseTrigger>
            <Dialog.Title className={css({ mb: 4 })}>Lorem Ipsume</Dialog.Title>
            <Dialog.Description className={css({ mb: 4 })}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </Dialog.Description>
            <div
              className={css({
                display: 'flex',
                flexDir: 'row-reverse',
                gap: 2,
                w: 'full',
              })}
            >
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
        </Dialog.Root>
      </div>
    );
  },
};

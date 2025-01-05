import { XIcon } from 'lucide-react';

import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { Toast, type ToastProps } from './index';

export default {
  title: 'Components/Toast',
  component: Toast.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

export const Default = {
  args: {},
  render: (props: ToastProps['Root']) => {
    const toaster = Toast.createToaster({
      placement: 'bottom-end',
      overlap: true,
      gap: 16,
      removeDelay: 300,
      duration: 5000,
    });

    const showToast = () => {
      toaster.create({
        title: 'Lorem Ipsum',
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        type: 'info',
      });
    };
    return (
      <div className="trds-w-96 trds-h-96">
        <Button onClick={showToast}>Show Toast</Button>
        <Toast.Toaster toaster={toaster}>
          {toast => (
            <Toast.Root {...props} key={toast.id}>
              <Toast.Title>{toast.title}</Toast.Title>
              <Toast.Description>{toast.description}</Toast.Description>
              <Toast.ActionTrigger asChild>
                <Button size="md" theme="primary">
                  Confirm
                </Button>
              </Toast.ActionTrigger>
              <Toast.CloseTrigger asChild>
                <IconButton size="xs" variant="ghost">
                  <XIcon size={16} />
                </IconButton>
              </Toast.CloseTrigger>
            </Toast.Root>
          )}
        </Toast.Toaster>
      </div>
    );
  },
};

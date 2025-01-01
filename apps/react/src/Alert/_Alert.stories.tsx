import {
  AlertCircleIcon,
  CircleCheckIcon,
  InfoIcon,
  RocketIcon,
  StarIcon,
  TriangleAlertIcon,
} from 'lucide-react';

import { Alert, type AlertProps } from './index';

const themes = [
  'info',
  'success',
  'danger',
  'warning',
] as AlertProps['Root']['theme'][];

export default {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      options: themes,
      control: { type: 'select' },
    },
  },
  args: {
    theme: themes[0],
  },
};

export const Default = {
  args: {},
  render: (props: AlertProps['Root']) => {
    return (
      <Alert.Root {...props}>
        <RocketIcon size={20} />
        <Alert.Title>Lorem ipsume</Alert.Title>
        <Alert.Description>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Alert.Description>
      </Alert.Root>
    );
  },
};

export const OnlyTitle = {
  args: {},
  render: (props: AlertProps['Root']) => {
    return (
      <Alert.Root {...props}>
        <RocketIcon size={20} />
        <Alert.Title>Lorem ipsume</Alert.Title>
      </Alert.Root>
    );
  },
};

export const WithoutIcon = {
  args: {},
  render: (props: AlertProps['Root']) => {
    return (
      <Alert.Root {...props}>
        <Alert.Title>Lorem ipsume</Alert.Title>
        <Alert.Description>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Alert.Description>
      </Alert.Root>
    );
  },
};

export const Theme = {
  args: {},
  render: (props: AlertProps['Root']) => {
    return (
      <>
        <Alert.Root {...props} className={'trds-mb-4'} theme={'danger'}>
          <AlertCircleIcon size={20} />
          <Alert.Title>Lorem ipsume</Alert.Title>
          <Alert.Description>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Alert.Description>
        </Alert.Root>
        <Alert.Root {...props} className={'trds-mb-4'} theme={'warning'}>
          <TriangleAlertIcon size={20} />
          <Alert.Title>Lorem ipsume</Alert.Title>
          <Alert.Description>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Alert.Description>
        </Alert.Root>
        <Alert.Root {...props} className={'trds-mb-4'} theme={'success'}>
          <CircleCheckIcon size={20} />
          <Alert.Title>Lorem ipsume</Alert.Title>
          <Alert.Description>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Alert.Description>
        </Alert.Root>
        <Alert.Root {...props} className={'trds-mb-4'} theme={'info'}>
          <InfoIcon size={20} />
          <Alert.Title>Lorem ipsume</Alert.Title>
          <Alert.Description>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Alert.Description>
        </Alert.Root>
      </>
    );
  },
};

import { InfoIcon, TriangleAlertIcon } from 'lucide-react';

import { Input } from '../Input';
import { Field, type FieldProps } from './index';

export default {
  title: 'Components/Field',
  component: Field.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

export const Default = {
  args: {},
  render: (props: FieldProps['Root']) => {
    return (
      <Field.Root {...props}>
        <Field.Label htmlFor="input-default">Email</Field.Label>
        <Input id="input-default" placeholder="email@example.com" />
        <Field.HelperText>
          <InfoIcon size={16} />
          Enter your email address
        </Field.HelperText>
        <Field.ErrorText>
          <TriangleAlertIcon size={16} />
          Invalid email address
        </Field.ErrorText>
      </Field.Root>
    );
  },
};

export const Invalid = {
  args: {
    invalid: true,
  },
  render: (props: FieldProps['Root']) => {
    return (
      <Field.Root {...props}>
        <Field.Label>Email</Field.Label>
        <Input id="input-default" placeholder="email@example.com" invalid />
        <Field.HelperText>
          <InfoIcon size={16} />
          Enter your email address
        </Field.HelperText>
        <Field.ErrorText>
          <TriangleAlertIcon size={16} />
          Invalid email address
        </Field.ErrorText>
      </Field.Root>
    );
  },
};

export const Disabled = {
  args: {
    disabled: true,
  },
  render: (props: FieldProps['Root']) => {
    return (
      <Field.Root {...props}>
        <Field.Label>Email</Field.Label>
        <Input id="input-default" placeholder="email@example.com" disabled />
        <Field.HelperText>
          <InfoIcon size={16} />
          Enter your email address
        </Field.HelperText>
        <Field.ErrorText>
          <TriangleAlertIcon size={16} />
          Invalid email address
        </Field.ErrorText>
      </Field.Root>
    );
  },
};

export const ReadOnly = {
  args: {
    readOnly: true,
  },
  render: (props: FieldProps['Root']) => {
    return (
      <Field.Root {...props}>
        <Field.Label>Email</Field.Label>
        <Input id="input-default" placeholder="email@example.com" readOnly />
        <Field.HelperText>
          <InfoIcon size={16} />
          Enter your email address
        </Field.HelperText>
        <Field.ErrorText>
          <TriangleAlertIcon size={16} />
          Invalid email address
        </Field.ErrorText>
      </Field.Root>
    );
  },
};

export const Required = {
  args: {
    required: true,
  },
  render: (props: FieldProps['Root']) => {
    return (
      <Field.Root {...props}>
        <Field.Label>Email</Field.Label>
        <Input id="input-default" placeholder="email@example.com" required />
        <Field.HelperText>
          <InfoIcon size={16} />
          Enter your email address
        </Field.HelperText>
        <Field.ErrorText>
          <TriangleAlertIcon size={16} />
          Invalid email address
        </Field.ErrorText>
      </Field.Root>
    );
  },
};

import { RatingGroup, type RatingGroupProps } from './index';

/**
 * based on https://ark-ui.com/react/docs/components/select
 *
 */
export default {
  title: 'Components/RatingGroup',
  component: RatingGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    count: {
      control: { type: 'number' },
    },
    defaultValue: {
      control: { type: 'number' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    readOnly: {
      control: { type: 'boolean' },
    },
  },
  args: {
    count: 5,
    defaultValue: 3,
    disabled: false,
    readOnly: false,
  },
};

export const Default = {
  args: {},
  render: (props: RatingGroupProps) => {
    return <RatingGroup {...props} />;
  },
};

export const AllowHalf = {
  args: {},
  render: (props: RatingGroupProps) => {
    return <RatingGroup {...props} allowHalf />;
  },
};

export const Size = {
  args: {},
  render: (props: RatingGroupProps) => {
    return (
      <div className="trds-flex trds-flex-col trds-gap-4">
        <RatingGroup {...props} size="sm" />
        <RatingGroup {...props} size="md" />
        <RatingGroup {...props} size="lg" />
      </div>
    );
  },
};

export const Disabled = {
  args: {},
  render: (props: RatingGroupProps) => {
    return <RatingGroup {...props} disabled />;
  },
};

export const ReadOnly = {
  args: {
    defaultValue: 2.5,
  },
  render: (props: RatingGroupProps) => {
    return <RatingGroup {...props} allowHalf readOnly />;
  },
};

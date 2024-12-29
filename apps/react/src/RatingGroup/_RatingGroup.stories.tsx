import { RatingGroup, type RatingGroupProps } from './index';

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
  render: (props: RatingGroupProps['Root']) => {
    return (
      <RatingGroup.Root {...props}>
        <RatingGroup.Control>
          <RatingGroup.Context>
            {({ items }) =>
              items.map(item => (
                <RatingGroup.Item key={item} index={item}>
                  <RatingGroup.ItemContext>
                    {({ half, highlighted }) => {
                      if (half && highlighted) {
                        return <RatingGroup.HalfStarIcon />;
                      }
                      if (highlighted) {
                        return <RatingGroup.FullStarIcon />;
                      }
                      return <RatingGroup.EmptyStarIcon />;
                    }}
                  </RatingGroup.ItemContext>
                </RatingGroup.Item>
              ))
            }
          </RatingGroup.Context>
        </RatingGroup.Control>
        <RatingGroup.HiddenInput />
      </RatingGroup.Root>
    );
  },
};

export const AllowHalf = {
  args: {
    allowHalf: true,
  },
  render: (props: RatingGroupProps['Root']) => {
    return (
      <RatingGroup.Root {...props}>
        <RatingGroup.Control>
          <RatingGroup.Context>
            {({ items }) =>
              items.map(item => (
                <RatingGroup.Item key={item} index={item}>
                  <RatingGroup.ItemContext>
                    {({ half, highlighted }) => {
                      if (half && highlighted) {
                        return <RatingGroup.HalfStarIcon />;
                      }
                      if (highlighted) {
                        return <RatingGroup.FullStarIcon />;
                      }
                      return <RatingGroup.EmptyStarIcon />;
                    }}
                  </RatingGroup.ItemContext>
                </RatingGroup.Item>
              ))
            }
          </RatingGroup.Context>
        </RatingGroup.Control>
        <RatingGroup.HiddenInput />
      </RatingGroup.Root>
    );
  },
};

export const Size = {
  args: {},
  render: (props: RatingGroupProps) => {
    return (
      <div className="trds-flex trds-flex-col trds-gap-4">
        <RatingGroup.Root {...props} size="sm">
          <RatingGroup.Control>
            <RatingGroup.Context>
              {({ items }) =>
                items.map(item => (
                  <RatingGroup.Item key={item} index={item}>
                    <RatingGroup.ItemContext>
                      {({ half, highlighted }) => {
                        if (half && highlighted) {
                          return <RatingGroup.HalfStarIcon />;
                        }
                        if (highlighted) {
                          return <RatingGroup.FullStarIcon />;
                        }
                        return <RatingGroup.EmptyStarIcon />;
                      }}
                    </RatingGroup.ItemContext>
                  </RatingGroup.Item>
                ))
              }
            </RatingGroup.Context>
          </RatingGroup.Control>
          <RatingGroup.HiddenInput />
        </RatingGroup.Root>
        <RatingGroup.Root {...props} size="md">
          <RatingGroup.Control>
            <RatingGroup.Context>
              {({ items }) =>
                items.map(item => (
                  <RatingGroup.Item key={item} index={item}>
                    <RatingGroup.ItemContext>
                      {({ half, highlighted }) => {
                        if (half && highlighted) {
                          return <RatingGroup.HalfStarIcon />;
                        }
                        if (highlighted) {
                          return <RatingGroup.FullStarIcon />;
                        }
                        return <RatingGroup.EmptyStarIcon />;
                      }}
                    </RatingGroup.ItemContext>
                  </RatingGroup.Item>
                ))
              }
            </RatingGroup.Context>
          </RatingGroup.Control>
          <RatingGroup.HiddenInput />
        </RatingGroup.Root>
        <RatingGroup.Root {...props} size="lg">
          <RatingGroup.Control>
            <RatingGroup.Context>
              {({ items }) =>
                items.map(item => (
                  <RatingGroup.Item key={item} index={item}>
                    <RatingGroup.ItemContext>
                      {({ half, highlighted }) => {
                        if (half && highlighted) {
                          return <RatingGroup.HalfStarIcon />;
                        }
                        if (highlighted) {
                          return <RatingGroup.FullStarIcon />;
                        }
                        return <RatingGroup.EmptyStarIcon />;
                      }}
                    </RatingGroup.ItemContext>
                  </RatingGroup.Item>
                ))
              }
            </RatingGroup.Context>
          </RatingGroup.Control>
          <RatingGroup.HiddenInput />
        </RatingGroup.Root>
      </div>
    );
  },
};

export const Disabled = {
  args: { disabled: true },
  render: (props: RatingGroupProps) => {
    return (
      <RatingGroup.Root {...props}>
        <RatingGroup.Control>
          <RatingGroup.Context>
            {({ items }) =>
              items.map(item => (
                <RatingGroup.Item key={item} index={item}>
                  <RatingGroup.ItemContext>
                    {({ half, highlighted }) => {
                      if (half && highlighted) {
                        return <RatingGroup.HalfStarIcon />;
                      }
                      if (highlighted) {
                        return <RatingGroup.FullStarIcon />;
                      }
                      return <RatingGroup.EmptyStarIcon />;
                    }}
                  </RatingGroup.ItemContext>
                </RatingGroup.Item>
              ))
            }
          </RatingGroup.Context>
        </RatingGroup.Control>
        <RatingGroup.HiddenInput />
      </RatingGroup.Root>
    );
  },
};

export const ReadOnly = {
  args: {
    allowHalf: true,
    defaultValue: 2.5,
    readOnly: true,
  },
  render: (props: RatingGroupProps) => {
    return (
      <RatingGroup.Root {...props}>
        <RatingGroup.Control>
          <RatingGroup.Context>
            {({ items }) =>
              items.map(item => (
                <RatingGroup.Item key={item} index={item}>
                  <RatingGroup.ItemContext>
                    {({ half, highlighted }) => {
                      if (half && highlighted) {
                        return <RatingGroup.HalfStarIcon />;
                      }
                      if (highlighted) {
                        return <RatingGroup.FullStarIcon />;
                      }
                      return <RatingGroup.EmptyStarIcon />;
                    }}
                  </RatingGroup.ItemContext>
                </RatingGroup.Item>
              ))
            }
          </RatingGroup.Context>
        </RatingGroup.Control>
        <RatingGroup.HiddenInput />
      </RatingGroup.Root>
    );
  },
};

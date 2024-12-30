import { ChevronRightIcon } from 'lucide-react';

import { TreeView, type TreeViewProps } from './index';

export default {
  title: 'Components/TreeView',
  component: TreeView.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

export const Default = {
  args: {
    defaultExpandedValue: ['2.1'],
  },
  render: (props: TreeViewProps['Root']) => {
    return (
      <div className="trds-w-96 trds-h-72">
        <TreeView.Root {...props}>
          <TreeView.Tree>
            <TreeView.Item value="1.0">
              <TreeView.ItemText>1.0</TreeView.ItemText>
            </TreeView.Item>
            <TreeView.Branch value="2.0">
              <TreeView.BranchControl>
                <TreeView.BranchIndicator>
                  <ChevronRightIcon size={16} />
                </TreeView.BranchIndicator>
                <TreeView.BranchText>2.0</TreeView.BranchText>
              </TreeView.BranchControl>
              <TreeView.BranchContent>
                <TreeView.Branch value="2.1" id="2.1">
                  <TreeView.BranchControl>
                    <TreeView.BranchIndicator>
                      <ChevronRightIcon size={16} />
                    </TreeView.BranchIndicator>
                    <TreeView.BranchText>2.1</TreeView.BranchText>
                  </TreeView.BranchControl>
                  <TreeView.BranchContent>
                    <TreeView.Item value="2.1.1">
                      <TreeView.ItemText>2.1.1</TreeView.ItemText>
                    </TreeView.Item>
                    <TreeView.Item value="2.1.2">
                      <TreeView.ItemText>2.1.2</TreeView.ItemText>
                    </TreeView.Item>
                  </TreeView.BranchContent>
                </TreeView.Branch>
                <TreeView.Item value="2.2" disabled>
                  <TreeView.ItemText>2.2</TreeView.ItemText>
                </TreeView.Item>
              </TreeView.BranchContent>
            </TreeView.Branch>
          </TreeView.Tree>
        </TreeView.Root>
      </div>
    );
  },
};

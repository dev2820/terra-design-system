import { Trash2Icon } from 'lucide-react';

import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { FileUpload, type FileUploadProps } from './index';

/**
 * based on https://ark-ui.com/react/docs/components/file-upload
 *
 */
export default {
  title: 'Components/FileUpload',
  component: FileUpload.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

export const Default = {
  args: {
    maxFiles: 3,
    className: 'trds-w-full',
  },
  render: (props: FileUploadProps['root']) => {
    return (
      <div className="trds-w-[600px]">
        <FileUpload.Root maxFiles={3} {...props}>
          <FileUpload.Dropzone>
            <FileUpload.Label>Drop your files here</FileUpload.Label>
            <FileUpload.Trigger asChild>
              <Button size="md" theme="primary" variant="outline">
                Open Dialog
              </Button>
            </FileUpload.Trigger>
          </FileUpload.Dropzone>
          <FileUpload.ItemGroup>
            <FileUpload.Context>
              {({ acceptedFiles }) =>
                acceptedFiles.map((file, id) => (
                  <FileUpload.Item key={id} file={file}>
                    <FileUpload.ItemPreview type="image/*">
                      <FileUpload.ItemPreviewImage />
                    </FileUpload.ItemPreview>
                    <FileUpload.ItemName />
                    <FileUpload.ItemSizeText />
                    <FileUpload.ItemDeleteTrigger asChild>
                      <IconButton variant="ghost" size="sm" theme="blackAlpha">
                        <Trash2Icon size={16} />
                      </IconButton>
                    </FileUpload.ItemDeleteTrigger>
                  </FileUpload.Item>
                ))
              }
            </FileUpload.Context>
          </FileUpload.ItemGroup>
        </FileUpload.Root>
      </div>
    );
  },
};

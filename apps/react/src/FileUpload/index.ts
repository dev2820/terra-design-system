import {
  Root,
  Dropzone,
  Trigger,
  Label,
  ItemGroup,
  Item,
  ItemPreview,
  ItemPreviewImage,
  ItemSizeText,
  ItemName,
  ItemDeleteTrigger,
  HiddenInput,
  Context,
} from './FileUpload';
import type {
  RootProps,
  DropzoneProps,
  TriggerProps,
  LabelProps,
  ItemGroupProps,
  ItemProps,
  ItemPreviewProps,
  ItemPreviewImageProps,
  ItemSizeTextProps,
  ItemNameProps,
  ItemDeleteTriggerProps,
  HiddenInputProps,
  ContextProps,
} from './FileUpload';

export const FileUpload = {
  Root,
  Dropzone,
  Trigger,
  Label,
  ItemGroup,
  Item,
  ItemPreview,
  ItemPreviewImage,
  ItemSizeText,
  ItemName,
  ItemDeleteTrigger,
  HiddenInput,
  Context,
};

export type * from '@ark-ui/react/file-upload';
export type FileUploadProps = {
  Root: RootProps;
  Dropzone: DropzoneProps;
  Trigger: TriggerProps;
  Label: LabelProps;
  ItemGroup: ItemGroupProps;
  Item: ItemProps;
  ItemPreview: ItemPreviewProps;
  ItemPreviewImage: ItemPreviewImageProps;
  ItemSizeText: ItemSizeTextProps;
  ItemName: ItemNameProps;
  ItemDeleteTrigger: ItemDeleteTriggerProps;
  HiddenInput: HiddenInputProps;
  Context: ContextProps;
};

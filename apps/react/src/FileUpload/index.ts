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
  Context,
};

export type FileUploadProps = {
  root: RootProps;
  dropzone: DropzoneProps;
  trigger: TriggerProps;
  label: LabelProps;
  itemGroup: ItemGroupProps;
  item: ItemProps;
  itemPreview: ItemPreviewProps;
  itemPreviewImage: ItemPreviewImageProps;
  itemSizeText: ItemSizeTextProps;
  itemName: ItemNameProps;
  itemDeleteTrigger: ItemDeleteTriggerProps;
  context: ContextProps;
};

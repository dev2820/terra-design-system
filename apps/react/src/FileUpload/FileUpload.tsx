import { FileUpload } from '@ark-ui/react/file-upload';
import { IDENTIFIER } from 'env';

import {
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
} from 'react';

import { createReactContext } from '../create-react-context';
import { cx } from '../cx';
import { tv, VariantProps } from '../tv';

export const fileUploadVariant = tv({
  base: `${IDENTIFIER.scope} fileUpload`,
  slots: {
    root: 'trds-flex trds-flex-col trds-gap-4 trds-w-full',
    label: 'trds-font-medium trds-text-sm',
    dropzone:
      'trds-flex trds-items-center trds-justify-center trds-flex-col trds-bg-white trds-rounded-md trds-border trds-border-boundary trds-min-h-xs trds-px-6 trds-py-4 trds-gap-3',
    trigger: '',
    item: 'trds-grid trds-grid-cols-[auto_1fr_auto] [grid-template-areas:"preview_name_delete""preview_size_delete"] trds-bg-white trds-rounded-md trds-border trds-border-boundary trds-gap-x-3 trds-p-4 trds-animate-fade-in',
    itemGroup: 'trds-flex trds-flex-col trds-gap-3',
    itemName:
      'trds-text-fg-title trds-font-medium trds-text-sm [grid-area:name]',
    itemSizeText: 'trds-text-fg-description trds-text-sm [grid-area:size]',
    itemDeleteTrigger: 'trds-self-start [grid-area:delete]',
    itemPreview: '[grid-area:preview]',
    itemPreviewImage:
      'trds-aspect-square trds-h-10 trds-w-10 trds-object-scale-down',
  },
});

type FileUploadProviderProps = {
  classes: ReturnType<typeof fileUploadVariant>;
} & VariantProps<typeof fileUploadVariant>;

const [FileUploadProvider, useFileUploadContext] =
  createReactContext<FileUploadProviderProps>({
    name: 'fileUpload',
    hookName: 'useFileUploadContext',
    providerName: 'FileUploadProvider',
    defaultValue: {
      classes: {} as ReturnType<typeof fileUploadVariant>,
    },
  });

export type RootProps = FileUpload.RootProps &
  VariantProps<typeof fileUploadVariant> & {
    placeholder?: string;
  };

const Root = forwardRef<ElementRef<typeof FileUpload.Root>, RootProps>(
  function (props, ref) {
    const { placeholder, className, children, ...rest } = props;
    const classes = fileUploadVariant();
    const ctx = {
      classes,
    };

    return (
      <FileUploadProvider value={ctx}>
        <FileUpload.Root
          ref={ref}
          className={cx(classes.root(), className)}
          {...rest}
        >
          {children}
          <FileUpload.HiddenInput />
        </FileUpload.Root>
      </FileUploadProvider>
    );
  },
);

export type DropzoneProps = ComponentProps<typeof Dropzone>;
const Dropzone = forwardRef<
  ElementRef<typeof FileUpload.Dropzone>,
  ComponentPropsWithoutRef<typeof FileUpload.Dropzone>
>(function (props, ref) {
  const { className, children, ...rest } = props;
  const { classes } = useFileUploadContext();

  return (
    <FileUpload.Dropzone
      className={cx(classes.dropzone(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </FileUpload.Dropzone>
  );
});

export type LabelProps = ComponentProps<typeof Label>;
const Label = forwardRef<
  ElementRef<typeof FileUpload.Label>,
  ComponentPropsWithoutRef<typeof FileUpload.Label>
>(function (props, ref) {
  const { className, children, ...rest } = props;
  const { classes } = useFileUploadContext();

  return (
    <FileUpload.Label
      className={cx(classes.label(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </FileUpload.Label>
  );
});

export type TriggerProps = ComponentProps<typeof Trigger>;
const Trigger = forwardRef<
  ElementRef<typeof FileUpload.Trigger>,
  ComponentPropsWithoutRef<typeof FileUpload.Trigger>
>(function (props, ref) {
  const { className, children, ...rest } = props;
  const { classes } = useFileUploadContext();

  return (
    <FileUpload.Trigger
      className={cx(classes.trigger(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </FileUpload.Trigger>
  );
});

export type ItemGroupProps = ComponentProps<typeof ItemGroup>;
const ItemGroup = forwardRef<
  ElementRef<typeof FileUpload.ItemGroup>,
  ComponentPropsWithoutRef<typeof FileUpload.ItemGroup>
>(function (props, ref) {
  const { className, children, ...rest } = props;
  const { classes } = useFileUploadContext();

  return (
    <FileUpload.ItemGroup
      className={cx(classes.itemGroup(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </FileUpload.ItemGroup>
  );
});

export type ItemProps = ComponentProps<typeof Item>;
const Item = forwardRef<
  ElementRef<typeof FileUpload.Item>,
  ComponentPropsWithoutRef<typeof FileUpload.Item>
>(function (props, ref) {
  const { className, children, ...rest } = props;
  const { classes } = useFileUploadContext();

  return (
    <FileUpload.Item
      className={cx(classes.item(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </FileUpload.Item>
  );
});

export type ItemPreviewProps = ComponentProps<typeof ItemPreview>;
const ItemPreview = forwardRef<
  ElementRef<typeof FileUpload.ItemPreview>,
  ComponentPropsWithoutRef<typeof FileUpload.ItemPreview>
>(function (props, ref) {
  const { className, children, ...rest } = props;
  const { classes } = useFileUploadContext();

  return (
    <FileUpload.ItemPreview
      className={cx(classes.itemPreview(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </FileUpload.ItemPreview>
  );
});

export type ItemPreviewImageProps = ComponentProps<typeof ItemPreviewImage>;
const ItemPreviewImage = forwardRef<
  ElementRef<typeof FileUpload.ItemPreviewImage>,
  ComponentPropsWithoutRef<typeof FileUpload.ItemPreviewImage>
>(function (props, ref) {
  const { className, children, ...rest } = props;
  const { classes } = useFileUploadContext();

  return (
    <FileUpload.ItemPreviewImage
      className={cx(classes.itemPreviewImage(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </FileUpload.ItemPreviewImage>
  );
});

export type ItemNameProps = ComponentProps<typeof ItemName>;
const ItemName = forwardRef<
  ElementRef<typeof FileUpload.ItemName>,
  ComponentPropsWithoutRef<typeof FileUpload.ItemName>
>(function (props, ref) {
  const { className, children, ...rest } = props;
  const { classes } = useFileUploadContext();

  return (
    <FileUpload.ItemName
      className={cx(classes.itemName(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </FileUpload.ItemName>
  );
});

export type ItemSizeTextProps = ComponentProps<typeof ItemSizeText>;
const ItemSizeText = forwardRef<
  ElementRef<typeof FileUpload.ItemSizeText>,
  ComponentPropsWithoutRef<typeof FileUpload.ItemSizeText>
>(function (props, ref) {
  const { className, children, ...rest } = props;
  const { classes } = useFileUploadContext();

  return (
    <FileUpload.ItemSizeText
      className={cx(classes.itemSizeText(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </FileUpload.ItemSizeText>
  );
});

export type ItemDeleteTriggerProps = ComponentProps<typeof ItemDeleteTrigger>;
const ItemDeleteTrigger = forwardRef<
  ElementRef<typeof FileUpload.ItemDeleteTrigger>,
  ComponentPropsWithoutRef<typeof FileUpload.ItemDeleteTrigger>
>(function (props, ref) {
  const { className, children, ...rest } = props;
  const { classes } = useFileUploadContext();

  return (
    <FileUpload.ItemDeleteTrigger
      className={cx(classes.itemDeleteTrigger(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </FileUpload.ItemDeleteTrigger>
  );
});

export type ContextProps = FileUpload.ContextProps;
const Context = FileUpload.Context;

export {
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

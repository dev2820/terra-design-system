import { Accordion } from '@ark-ui/react/accordion';
import { IDENTIFIER } from 'env';
import { ChevronDownIcon } from 'lucide-react';

import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  forwardRef,
  type ElementRef,
} from 'react';

import { createReactContext } from '../create-react-context';
import { cx } from '../cx';
import { tv } from '../tv';

export const accordionVariants = tv({
  base: `${IDENTIFIER.scope} accordion`,
  slots: {
    root: 'trds-w-full',
    item: 'trds-border-b trds-border-secondary-300',
    itemTrigger:
      'trds-transition-all trds-duration-normal trds-w-full trds-py-4 trds-flex trds-flex-row trds-justify-between trds-items-center trds-cursor-pointer disabled:trds-text-muted disabled:trds-cursor-not-allowed',
    itemIndicator:
      'trds-origin-center trds-transition-all trds-duration-normal data-open:trds-rotate-180',
    itemContent:
      'trds-overflow-hidden data-open:trds-animate-collapse-in data-closed:trds-animate-collapse-out',
  },
});

type AccordionProviderProps = {};
const [AccordionProvider, useAccordionContext] = createReactContext<{
  classes: ReturnType<typeof accordionVariants>;
}>({
  name: 'accordion',
  hookName: 'useAccordionContext',
  providerName: 'AccordionProvider',
  defaultValue: {
    classes: {} as ReturnType<typeof accordionVariants>,
  },
});

export type RootProps = ComponentProps<typeof Root>;
const Root = forwardRef<
  ElementRef<typeof Accordion.Root>,
  ComponentPropsWithoutRef<typeof Accordion.Root> & AccordionProviderProps
>((props, ref) => {
  const { children, className, ...rest } = props;
  const classes = accordionVariants();
  const ctx = {
    classes,
  };

  return (
    <AccordionProvider value={ctx}>
      <Accordion.Root
        ref={ref}
        className={cx(classes.root(), className)}
        {...rest}
      >
        {children}
      </Accordion.Root>
    </AccordionProvider>
  );
});
Root.displayName = 'Accordion.Root';

export type ItemProps = ComponentProps<typeof Item>;
const Item = forwardRef<
  ElementRef<typeof Accordion.Item>,
  ComponentPropsWithoutRef<typeof Accordion.Item>
>((props, ref) => {
  const { children, className, ...rest } = props;
  const { classes } = useAccordionContext();

  return (
    <Accordion.Item
      ref={ref}
      className={cx(classes.item(), className)}
      {...rest}
    >
      {children}
    </Accordion.Item>
  );
});
Item.displayName = 'Accordion.Item';

export type ItemTriggerProps = ComponentProps<typeof ItemTrigger>;
const ItemTrigger = forwardRef<
  ElementRef<typeof Accordion.ItemTrigger>,
  ComponentPropsWithoutRef<typeof Accordion.ItemTrigger>
>((props, ref) => {
  const { children, className, ...rest } = props;
  const { classes } = useAccordionContext();

  return (
    <Accordion.ItemTrigger
      ref={ref}
      className={cx(classes.itemTrigger(), className)}
      {...rest}
    >
      {children}
    </Accordion.ItemTrigger>
  );
});
ItemTrigger.displayName = 'Accordion.ItemTrigger';

export type ItemIndicatorProps = ComponentProps<typeof ItemIndicator>;
const ItemIndicator = forwardRef<
  ElementRef<typeof Accordion.ItemIndicator>,
  ComponentPropsWithoutRef<typeof Accordion.ItemIndicator>
>((props, ref) => {
  const { children, className, ...rest } = props;
  const { classes } = useAccordionContext();

  return (
    <Accordion.ItemIndicator
      ref={ref}
      className={cx(classes.itemIndicator(), className)}
      {...rest}
    >
      {children ?? <ChevronDownIcon size={20} />}
    </Accordion.ItemIndicator>
  );
});
ItemIndicator.displayName = 'Accordion.ItemIndicator';

export type ContentProps = ComponentProps<typeof Content>;
const Content = forwardRef<
  ElementRef<typeof Accordion.ItemContent>,
  ComponentPropsWithoutRef<typeof Accordion.ItemContent>
>((props, ref) => {
  const { children, className, ...rest } = props;
  const { classes } = useAccordionContext();

  return (
    <Accordion.ItemContent
      ref={ref}
      className={cx(classes.itemContent(), className)}
      {...rest}
    >
      {children}
    </Accordion.ItemContent>
  );
});
Content.displayName = 'Accordion.Content';

export { Root, Item, ItemIndicator, ItemTrigger, Content };

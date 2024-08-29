import { Accordion } from '@ark-ui/react';
import { ChevronDownIcon } from 'lucide-react';

import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  forwardRef,
  type ElementRef,
  ReactNode,
} from 'react';

import { createReactContext } from '../create-react-context';
import { cx } from '../cx';
import { tv } from "../tv"

export const accordionVariants = tv({
  slots: {
    root: 'trds-w-full',
    item: 'trds-border-b trds-border-boundary',
    itemTrigger:
      'trds-transition-all trds-duration-normal trds-w-full trds-py-4 trds-flex trds-flex-row trds-justify-between trds-items-center trds-cursor-pointer disabled:trds-text-muted disabled:trds-cursor-not-allowed',
    itemIndicator:
      'trds-origin-center trds-transition-all trds-duration-normal data-open:trds-rotate-180 trds-color-fg-neutral',
    itemContent:
      'trds-overflow-hidden data-open:trds-animate-collapse-in data-closed:trds-animate-collapse-out',
  },
});

type AccordionProviderProps = {
  indicator: ReactNode;
};
const [AccordionProvider, useAccordionContext] = createReactContext<{
  indicator: ReactNode;
  classes: ReturnType<typeof accordionVariants>;
}>({
  name: 'accordion',
  hookName: 'useAccordionContext',
  providerName: 'AccordionProvider',
  defaultValue: {
    indicator: null,
    classes: {} as ReturnType<typeof accordionVariants>,
  },
});

export type RootProps = ComponentProps<typeof Root>;
const Root = forwardRef<
  ElementRef<typeof Accordion.Root>,
  ComponentPropsWithoutRef<typeof Accordion.Root> & AccordionProviderProps
>(({ indicator, children, className, ...props }, ref) => {
  const classes = accordionVariants();
  const ctx = {
    indicator: indicator ?? (
      <ChevronDownIcon size={20} className={classes.itemIndicator()} />
    ),
    classes,
  };

  return (
    <AccordionProvider value={ctx}>
      <Accordion.Root
        ref={ref}
        className={cx(classes.root(), className)}
        {...props}
      >
        {children}
      </Accordion.Root>
    </AccordionProvider>
  );
});

export type ItemProps = ComponentProps<typeof Item>;
const Item = forwardRef<
  ElementRef<typeof Accordion.Item>,
  ComponentPropsWithoutRef<typeof Accordion.Item>
>(({ children, className, ...props }, ref) => {
  const { classes } = useAccordionContext();

  return (
    <Accordion.Item
      ref={ref}
      className={cx(classes.item(), className)}
      {...props}
    >
      {children}
    </Accordion.Item>
  );
});

export type TriggerProps = ComponentProps<typeof Trigger>;
const Trigger = forwardRef<
  ElementRef<typeof Accordion.ItemTrigger>,
  ComponentPropsWithoutRef<typeof Accordion.ItemTrigger>
>(({ children, className, ...props }, ref) => {
  const { indicator, classes } = useAccordionContext();

  return (
    <Accordion.ItemTrigger
      ref={ref}
      className={cx(classes.itemTrigger(), className)}
      {...props}
    >
      {children}
      <Accordion.ItemIndicator className={classes.itemIndicator()} asChild>
        {indicator}
      </Accordion.ItemIndicator>
    </Accordion.ItemTrigger>
  );
});

export type ContentProps = ComponentProps<typeof Content>;
const Content = forwardRef<
  ElementRef<typeof Accordion.ItemContent>,
  ComponentPropsWithoutRef<typeof Accordion.ItemContent>
>(({ children, className, ...props }, ref) => {
  const { classes } = useAccordionContext();

  return (
    <Accordion.ItemContent
      ref={ref}
      className={cx(classes.itemContent(), className)}
      {...props}
    >
      {children}
    </Accordion.ItemContent>
  );
});

export { Root, Item, Trigger, Content };

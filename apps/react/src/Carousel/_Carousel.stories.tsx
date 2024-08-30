/**
 * api reference: https://ark-ui.com/react/docs/components/carousel
 *
 * TODO: Swipe event
 * Maybe change to https://www.embla-carousel.com/get-started/react/
 */
import { Carousel, type CarouselProps } from './index';

export default {
  title: 'Components/Carousel',
  component: Carousel.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

const images = [
  'https://tinyurl.com/5b6ka8jd',
  'https://tinyurl.com/7rmccdn5',
  'https://tinyurl.com/59jxz9uu',
];

export const Default = {
  args: {
    defaultIndex: 1,
  },
  render: (props: CarouselProps['Root']) => {
    return (
      <Carousel.Root {...props}>
        {images.map((image, idx) => (
          <Carousel.Item key={image} index={idx} asChild>
            <img src={image} alt={`Slide ${idx}`} />
          </Carousel.Item>
        ))}
      </Carousel.Root>
    );
  },
};

export const HideControl = {
  args: {
    defaultIndex: 1,
    showControl: false,
  },
  render: (props: CarouselProps['Root']) => {
    return (
      <Carousel.Root {...props}>
        {images.map((image, idx) => (
          <Carousel.Item key={image} index={idx} asChild>
            <img src={image} alt={`Slide ${idx}`} />
          </Carousel.Item>
        ))}
      </Carousel.Root>
    );
  },
};

export const Readonly = {
  args: {
    defaultIndex: 1,
    readonly: true,
    hideControl: true,
  },
  render: (props: CarouselProps['Root']) => {
    return (
      <Carousel.Root {...props}>
        {images.map((image, idx) => (
          <Carousel.Item key={image} index={idx} asChild>
            <img src={image} alt={`Slide ${idx}`} />
          </Carousel.Item>
        ))}
      </Carousel.Root>
    );
  },
};

export const Loop = {
  args: {
    defaultIndex: 1,
    loop: true,
  },
  render: (props: CarouselProps['Root']) => {
    return (
      <Carousel.Root {...props}>
        {images.map((image, idx) => (
          <Carousel.Item key={image} index={idx} asChild>
            <img src={image} alt={`Slide ${idx}`} />
          </Carousel.Item>
        ))}
      </Carousel.Root>
    );
  },
};

export const ObjectFit = {
  args: {
    defaultIndex: 1,
    loop: true,
  },
  render: (props: CarouselProps['Root']) => {
    return (
      <Carousel.Root {...props}>
        {images.map((image, idx) => (
          <Carousel.Item
            key={image}
            className="trds-object-contain"
            index={idx}
            asChild
          >
            <img src={image} alt={`Slide ${idx}`} />
          </Carousel.Item>
        ))}
      </Carousel.Root>
    );
  },
};

export const SlidesPerView = {
  args: {
    slidesPerView: 2,
  },
  render: (props: CarouselProps['Root']) => {
    return (
      <Carousel.Root {...props}>
        {images.map((image, idx) => (
          <Carousel.Item
            key={image}
            className="trds-object-cover trds-aspect-square"
            index={idx}
            asChild
          >
            <img src={image} alt={`Slide ${idx}`} />
          </Carousel.Item>
        ))}
      </Carousel.Root>
    );
  },
};

export const Spacing = {
  args: {
    align: 'center',
    spacing: '32px',
  },
  render: (props: CarouselProps['Root']) => {
    return (
      <Carousel.Root {...props}>
        {images.map((image, idx) => (
          <Carousel.Item key={image} index={idx} asChild>
            <img src={image} alt={`Slide ${idx}`} />
          </Carousel.Item>
        ))}
      </Carousel.Root>
    );
  },
};

/**
 * api reference: https://ark-ui.com/react/docs/components/carousel
 */
import { css } from '../../styled-system/css';
import { Carousel, type CarouselProps } from './index';

/**
 * based on https://ark-ui.com/react/docs/components/accordion
 */
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
            className={css({ objectFit: 'contain' })}
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
            className={css({ objectFit: 'contain' })}
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

import { cva } from '../styled-system/css';

const displayVariants = cva({
  base: {
    lineHeight: 'normal',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  variants: {
    size: {
      lg: {
        fontSize: 66,
        sm: {
          fontSize: 40,
        },
      },
      md: {
        fontSize: 50,
        sm: {
          fontSize: 32,
        },
      },
      sm: {
        fontSize: 40,
        sm: {
          fontSize: 25,
        },
      },
    },
  },
});
const headingVariants = cva({
  base: {
    lineHeight: 'normal',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  variants: {
    size: {
      lg: {
        fontSize: 50,
        sm: {
          fontSize: 40,
        },
      },
      md: {
        fontSize: 40,
        sm: {
          fontSize: 32,
        },
      },
      sm: {
        fontSize: 32,
        sm: {
          fontSize: 25,
        },
      },
    },
  },
});
const titleVariants = cva({
  base: {
    lineHeight: 'normal',
    fontWeight: 'bold',
  },
  variants: {
    size: {
      '2xl': {
        letterSpacing: 1,
        fontSize: 32,
        sm: {
          fontSize: 25,
        },
      },
      xl: {
        fontSize: 25,
      },
      lg: {
        fontSize: 21,
      },
      md: {
        fontSize: 19,
      },
      sm: {
        fontSize: 17,
      },
      xs: {
        fontSize: 15,
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const bodyVariants = cva({
  base: {
    lineHeight: 'normal',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  variants: {
    size: {
      lg: {
        fontSize: 19,
      },
      md: {
        fontSize: 17,
      },
      sm: {
        fontSize: 15,
      },
    },
    weight: {
      bold: {
        fontWeight: 'bold',
      },
      normal: {
        fontWeight: 'normal',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    weight: 'normal',
  },
});

const detailVariants = cva({
  base: {
    lineHeight: 'normal',
    fontWeight: 'normal',
    letterSpacing: 0,
  },
  variants: {
    size: {
      lg: {
        fontSize: 19,
      },
      md: {
        fontSize: 17,
      },
      sm: {
        fontSize: 15,
      },
      xs: {
        fontSize: 13,
      },
    },
    weight: {
      bold: {
        fontWeight: 'bold',
      },
      normal: {
        fontWeight: 'normal',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    weight: 'normal',
  },
});

const labelVariants = cva({
  base: {
    lineHeight: 'normal',
    fontWeight: 'normal',
    letterSpacing: 0,
  },
  variants: {
    size: {
      lg: {
        fontSize: 19,
      },
      md: {
        fontSize: 17,
      },
      sm: {
        fontSize: 15,
      },
    },
    weight: {
      bold: {
        fontWeight: 'bold',
      },
      normal: {
        fontWeight: 'normal',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    weight: 'normal',
  },
});

export {
  displayVariants,
  headingVariants,
  titleVariants,
  bodyVariants,
  detailVariants,
  labelVariants,
};

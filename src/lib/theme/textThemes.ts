import { MantineTheme, TextStylesParams } from '@mantine/core';
import { ExtraHover, PrimaryBlue, TextLight } from '../../colors';
import { rem } from 'polished';

export const textTheme = {
  defaultProps: {
    size: rem(14),
    weight: 'normal',
  },
  styles: (theme: MantineTheme, params: TextStylesParams) => ({
    root: {
      // This allows us to use the color prop to set the color of the text
      ...(!params.color && {
        color: TextLight,
      }),
      letterSpacing: rem(0.2),
      lineHeight: rem(20),
      transition: '150ms color ease',
      ...(params.variant === 'link' && linkVariantStyles),
    },
  }),
};

const linkVariantStyles = {
  color: PrimaryBlue,
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
    '&:not(:active)': {
      color: ExtraHover,
    },
  },
};

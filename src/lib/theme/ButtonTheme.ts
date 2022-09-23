import { ButtonStylesParams, MantineTheme } from '@mantine/core';
import { DarkGray, ExtraHover, ExtraPressed, PrimaryBlue, TextGray, White } from '../../colors';
import { rem } from 'polished';

export const buttonTheme = {
  defaultProps: {
    radius: 6,
    uppercase: true,
    variant: 'filled',
  },
  styles: (theme: MantineTheme, params: ButtonStylesParams) => ({
    root: {
      borderWidth: rem(2),
      letterSpacing: rem(2),
      transition: '150ms background ease, 150ms color ease, 150ms border ease',
      ...(params.variant === 'filled' && buttonFilled),
      ...(params.variant === 'outline' && buttonOutline),
    },
  }),
};

const buttonFilled = {
  backgroundColor: PrimaryBlue,
  '&:disabled': {
    backgroundColor: DarkGray,
    '.mantine-Button-label': {
      color: TextGray,
    },
  },
  '&:active:not(:disabled)': {
    backgroundColor: ExtraPressed,
  },
  '&:hover:not(:disabled)': {
    backgroundColor: ExtraHover,
  },
  '&[data-loading]': {
    backgroundColor: PrimaryBlue,
    '.mantine-Button-label': {
      color: White,
    },
  },
};

const buttonOutline = {
  backgroundColor: 'transparent',
  borderColor: TextGray,
  color: White,
  '&:disabled': {
    backgroundColor: 'transparent',
    borderColor: TextGray,
    '.mantine-Button-label': {
      color: TextGray,
    },
  },
  '&:active:not(:disabled)': {
    borderColor: ExtraPressed,
    color: ExtraPressed,
  },
  '&:hover:not(:disabled)': {
    borderColor: ExtraHover,
    color: ExtraHover,
  },
};

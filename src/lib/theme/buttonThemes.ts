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
      ...(params.variant === 'filled' &&
        (!params.color || params.color === 'blue') &&
        buttonFilled),
      ...(params.variant === 'outline' &&
        (!params.color || params.color === 'blue') &&
        buttonOutline),
    },
  }),
};

export const buttonFilled = {
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
    backgroundColor: DarkGray,
    '.mantine-Button-label': {
      color: TextGray,
    },
    '&::before': {
      content: 'none',
    },
  },
};

export const buttonOutline = {
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
  '&[data-loading]': {
    '.mantine-Button-label': {
      color: TextGray,
    },
    '::before': {
      content: 'none',
    },
  },
};

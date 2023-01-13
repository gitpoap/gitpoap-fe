import { BaseSelectProps, MantineTheme } from '@mantine/core';
import { rem } from 'polished';
import {
  BackgroundPanel,
  BackgroundPanel2,
  DarkGray,
  ExtraHover,
  ExtraRed,
  TextDarkGray,
  TextGray,
  TextLight,
  White,
} from '../../colors';

export const selectThemes = {
  defaultProps: {
    radius: 6,
  },
  styles: (theme: MantineTheme, params: BaseSelectProps) => ({
    dropdown: {
      background: BackgroundPanel,
    },
    input: {
      background: BackgroundPanel,
      border: `${rem(1)} solid transparent`,
      color: White,
      '&:hover:not(:disabled):not(:focus)': {
        backgroundColor: BackgroundPanel2,
      },
      '&:focus': {
        backgroundColor: BackgroundPanel,
        border: `${rem(1)} solid ${DarkGray} !important`,
      },
      '&::placeholder': {
        color: TextDarkGray,
      },
      '&.mantine-TextInput-invalid': {
        color: ExtraRed,
      },
    },
    item: {
      color: 'white',
      '&:hover': {
        color: ExtraHover,
      },
    },
    label: {
      color: params.disabled ? TextGray : TextLight,
      fontSize: rem(11),
      fontWeight: 700,
      letterSpacing: rem(1.2),
      lineHeight: rem(18),
      marginBottom: rem(11),
      textTransform: 'uppercase' as const,
    },
  }),
};

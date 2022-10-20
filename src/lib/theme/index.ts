import { BREAKPOINTS } from '../../constants';
import { MantineProviderProps } from '@mantine/core';
import { BackgroundPanel, ExtraHover, MidnightBlue } from '../../colors';
import { darken, rem } from 'polished';

import { buttonTheme } from './ButtonTheme';
import { datePickerTheme } from './DatePickerTheme';

export const theme: MantineProviderProps['theme'] = {
  breakpoints: BREAKPOINTS,
  colorScheme: 'dark',
  respectReducedMotion: false,
  components: {
    Button: buttonTheme,
    DatePicker: datePickerTheme,
    Modal: {
      styles: {
        modal: {
          background: MidnightBlue,
        },
        overlay: {
          backgroundColor: `${darken(1, MidnightBlue)} !important`,
        },
      },
    },
    Menu: {
      styles: {
        dropdown: {
          background: BackgroundPanel,
        },
        item: {
          color: 'white',
          '&:hover': {
            color: ExtraHover,
          },
        },
      },
    },
    NavLink: {
      styles: {
        root: {
          borderRadius: rem(6),
        },
      },
    },
  },
  fontFamily: 'PT Mono, monospace',
  headings: {
    fontFamily: 'PT Mono, monospace',
  },
};

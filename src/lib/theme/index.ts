import { BREAKPOINTS } from '../../constants';
import { MantineProviderProps } from '@mantine/core';
import { BackgroundPanel, Black, ExtraHover, MidnightBlue, TextLight } from '../../colors';
import { rem } from 'polished';

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
      defaultProps: {
        overlayColor: Black,
      },
      styles: {
        modal: {
          background: MidnightBlue,
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
    Text: {
      defaultProps: {
        size: rem(14),
        weight: 'normal',
      },
      styles: {
        root: {
          color: TextLight,
          letterSpacing: rem(0.2),
          lineHeight: rem(20),
        },
      },
    },
  },
  fontFamily: 'PT Mono, monospace',
  headings: {
    fontFamily: 'PT Mono, monospace',
  },
};

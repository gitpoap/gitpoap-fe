import { BREAKPOINTS } from '../constants';
import { MantineProviderProps } from '@mantine/core';
import { BackgroundPanel, ExtraHover } from '../colors';
import { rem } from 'polished';

export const theme: MantineProviderProps['theme'] = {
  breakpoints: BREAKPOINTS,
  colorScheme: 'dark',
  respectReducedMotion: false,
  components: {
    Modal: {
      styles: {
        modal: {
          background: BackgroundPanel,
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

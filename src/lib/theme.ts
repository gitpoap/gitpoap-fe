import { BREAKPOINTS } from '../constants';
import { MantineProviderProps } from '@mantine/core';
import { BackgroundPanel } from '../colors';

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
  },
};

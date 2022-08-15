import { BREAKPOINTS } from '../constants';
import { MantineTheme } from '@mantine/core';

export const theme: Partial<MantineTheme> = {
  breakpoints: BREAKPOINTS,
  colorScheme: 'dark',
  respectReducedMotion: false,
};

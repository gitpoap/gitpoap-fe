import { MantineTheme, NavLinkStylesParams } from '@mantine/core';
import { rem } from 'polished';
import { BackgroundPanel, PrimaryBlue, White } from '../../colors';

export const navLinkThemes = {
  styles: (theme: MantineTheme, params: NavLinkStylesParams) => ({
    ...((!params.color || params.color === 'blue') && {
      root: {
        borderRadius: rem(6),
        '&:hover': {
          backgroundColor: BackgroundPanel,
          '&[data-active]': {
            backgroundColor: PrimaryBlue,
          },
        },
        '&[data-active]': {
          backgroundColor: PrimaryBlue,
        },
      },
      label: {
        color: White,
      },
    }),
  }),
};

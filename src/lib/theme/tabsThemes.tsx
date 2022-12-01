import { MantineTheme, TabsStylesParams } from '@mantine/core';
import { BackgroundPanel, PrimaryBlue, White } from '../../colors';

export const tabsThemes = {
  defaultProps: {
    radius: 6,
  },
  styles: (theme: MantineTheme, params: TabsStylesParams) => ({
    ...(params.variant === 'pills' &&
      (!params.color || params.color === 'blue') && {
        tab: {
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
        tabLabel: {
          color: White,
        },
      }),
  }),
};

import { BREAKPOINTS } from '../../constants';
import { MantineProviderProps } from '@mantine/core';
import { BackgroundPanel, Black, ExtraHover, MidnightBlue } from '../../colors';
import { rem } from 'polished';
import { buttonTheme } from './buttonThemes';
import { datePickerTheme } from './datePickerThemes';
import { textTheme } from './textThemes';
import { tooltipThemes } from './tooltipThemes';
import { paginationThemes } from './paginationThemes';
import { badgeThemes } from './badgeThemes';
import { actionIconThemes } from './actionIconThemes';
import { tabsThemes } from './tabsThemes';

export const theme: MantineProviderProps['theme'] = {
  breakpoints: BREAKPOINTS,
  colorScheme: 'dark',
  respectReducedMotion: false,
  components: {
    ActionIcon: actionIconThemes,
    Badge: badgeThemes,
    Button: buttonTheme,
    DatePicker: datePickerTheme,
    InputWrapper: {
      styles: {
        error: {
          fontSize: `${rem(12)} !important`,
        },
      },
    },
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
    Pagination: paginationThemes,
    Text: textTheme,
    Tabs: tabsThemes,
    Tooltip: tooltipThemes,
  },
  fontFamily: 'PT Mono, monospace',
  headings: {
    fontFamily: 'PT Mono, monospace',
  },
};

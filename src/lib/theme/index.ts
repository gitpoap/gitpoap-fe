import { MantineProviderProps } from '@mantine/core';
import { rem } from 'polished';

import { BackgroundPanel, Black, ExtraHover, MidnightBlue } from '../../colors';
import { BREAKPOINTS } from '../../constants';

import { actionIconThemes } from './actionIconThemes';
import { badgeThemes } from './badgeThemes';
import { buttonTheme } from './buttonThemes';
import { datePickerTheme } from './datePickerThemes';
import { paginationThemes } from './paginationThemes';
import { cardThemes } from './cardThemes';
import { tabsThemes } from './tabsThemes';
import { textTheme } from './textThemes';
import { tooltipThemes } from './tooltipThemes';
import { selectThemes } from './selectThemes';
import { navLinkThemes } from './navLinkThemes';

export const theme: MantineProviderProps['theme'] = {
  breakpoints: BREAKPOINTS,
  colorScheme: 'dark',
  respectReducedMotion: false,
  components: {
    ActionIcon: actionIconThemes,
    Badge: badgeThemes,
    Button: buttonTheme,
    Card: cardThemes,
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
    NavLink: navLinkThemes,
    Pagination: paginationThemes,
    Select: selectThemes,
    Tabs: tabsThemes,
    Text: textTheme,
    Tooltip: tooltipThemes,
  },
  fontFamily: 'PT Mono, monospace',
  headings: {
    fontFamily: 'PT Mono, monospace',
  },
};

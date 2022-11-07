import { BadgeStylesParams, MantineTheme } from '@mantine/core';
import { rem } from 'polished';
import { PrimaryBlue } from '../../colors';

export const badgeThemes = {
  styles: (theme: MantineTheme, params: BadgeStylesParams) => ({
    root: {
      ...(!params.color && {
        background: PrimaryBlue,
      }),
      fontFamily: 'PT Mono',
      letterSpacing: rem(1),
    },
  }),
};

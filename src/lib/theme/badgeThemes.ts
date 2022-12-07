import { BadgeStylesParams, MantineTheme } from '@mantine/core';
import { rem } from 'polished';
import { ExtraRedDark, PrimaryBlue } from '../../colors';

export const badgeThemes = {
  styles: (theme: MantineTheme, params: BadgeStylesParams) => ({
    root: {
      ...((!params.color || params.color === 'blue') && {
        background: PrimaryBlue,
      }),
      ...(params.color === 'red' && {
        background: ExtraRedDark,
      }),
      fontFamily: 'PT Mono',
      letterSpacing: rem(1),
    },
  }),
};

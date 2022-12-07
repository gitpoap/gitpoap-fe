import { ActionIconStylesParams, MantineTheme } from '@mantine/core';
import { buttonFilled, buttonOutline } from './buttonThemes';

export const actionIconThemes = {
  defaultProps: {
    radius: 6,
  },
  styles: (theme: MantineTheme, params: ActionIconStylesParams) => ({
    root: {
      transition: '150ms background ease, 150ms color ease, 150ms border ease',
      ...(params.variant === 'filled' &&
        (!params.color || params.color === 'blue') &&
        buttonFilled),
      ...(params.variant === 'outline' &&
        (!params.color || params.color === 'blue') &&
        buttonOutline),
    },
  }),
};

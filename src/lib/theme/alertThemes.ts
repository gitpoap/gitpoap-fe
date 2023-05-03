import { AlertStylesParams, MantineTheme } from '@mantine/core';

export const alertTheme = {
  styles: (theme: MantineTheme, params: AlertStylesParams) => ({
    root: {
      // This allows us to use the color prop to set the color of the text
      ...(params.variant === 'outline' && {
        background: 'transparent',
      }),
    },
  }),
};

import { ExtraHover, ExtraPressed, PrimaryBlue } from '../../colors';

export const actionIconThemes = {
  styles: () => ({
    root: {
      background: PrimaryBlue,
      transition: 'background 200ms ease',
      '&:hover': {
        background: ExtraHover,
      },
      '&:active': {
        background: ExtraPressed,
      },
    },
  }),
};

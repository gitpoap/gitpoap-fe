import { BackgroundPanel2, PrimaryBlue } from '../../colors';

export const paginationThemes = {
  styles: () => ({
    root: {
      fontFamily: 'PT Mono',
    },
    item: {
      backgroundColor: BackgroundPanel2,
      fontFamily: 'PT Mono',
      color: 'white',
      '&[data-active="true"]': {
        backgroundColor: PrimaryBlue,
        color: 'white',
      },
    },
  }),
};

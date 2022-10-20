import { BackgroundPanel, BackgroundPanel2, DarkGray, TextLight } from '../../colors';
import { rem } from 'polished';

export const datePickerTheme = {
  defaultProps: {
    radius: rem(6),
  },
  styles: {
    dropdown: {
      backgroundColor: BackgroundPanel,
      borderColor: DarkGray,
      color: TextLight,
    },
    calendarHeaderLevel: {
      color: TextLight,
      '&:hover': {
        backgroundColor: BackgroundPanel2,
      },
    },
    monthPickerControl: {
      '&:hover:not([data-selected]):not(.mantine-DatePicker-monthPickerControlActive)': {
        backgroundColor: BackgroundPanel2,
      },
      color: TextLight,
    },
    yearPickerControl: {
      '&:hover:not([data-selected]):not(.mantine-DatePicker-yearPickerControlActive)': {
        backgroundColor: BackgroundPanel2,
      },
      color: TextLight,
    },
    calendarHeaderControl: {
      '&:hover': {
        backgroundColor: BackgroundPanel2,
      },
    },
    day: {
      '&:hover:not([data-selected])': {
        backgroundColor: BackgroundPanel2,
      },
      color: TextLight,
    },
    weekday: {
      color: TextLight,
    },
  },
};

import { DarkGray, TextLight } from '../../../colors';
import { Tooltip as TooltipUI } from '@mantine/core';

type Props = React.ComponentProps<typeof TooltipUI>;

export const Tooltip = (props: Props) => {
  return (
    <TooltipUI
      {...props}
      styles={{
        tooltip: {
          background: DarkGray,
          color: TextLight,
        },
        arrow: {
          backgroundColor: DarkGray,
          borderColor: DarkGray,
        },
      }}
    />
  );
};

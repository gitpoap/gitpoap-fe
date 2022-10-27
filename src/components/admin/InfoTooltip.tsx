import { Box } from '@mantine/core';
import { Tooltip } from '@mantine/core';

type Props = {
  children: React.ReactNode;
  text: string;
};

export const InfoTooltip = ({ text, children }: Props) => {
  return (
    <Tooltip
      label={text}
      position="bottom"
      events={{ hover: true, focus: true, touch: false }}
      radius="md"
      withArrow
      multiline
      width={320}
    >
      <Box>{children}</Box>
    </Tooltip>
  );
};

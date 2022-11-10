import { Box, Group, Popover } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { rem } from 'polished';
import { BackgroundPanel2 } from '../../../colors';
import { BREAKPOINTS } from '../../../constants';
import { GitPOAPBadge } from '../../shared/elements';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  imageUrl: string;
};

export const GitPOAPBadgePopover = ({ isOpen, onClose, onOpen, imageUrl }: Props) => {
  const matchesBreakpointSmall = useMediaQuery(`(max-width: ${rem(BREAKPOINTS.sm)})`, false);

  return (
    <Popover
      opened={isOpen}
      onClose={onClose}
      position="left"
      withArrow
      trapFocus={false}
      closeOnEscape={false}
      transition="pop-top-left"
      styles={{
        dropdown: {
          backgroundColor: BackgroundPanel2,
          borderColor: BackgroundPanel2,
        },
      }}
      radius="lg"
    >
      <Popover.Target>
        <Box onMouseEnter={onOpen} onMouseLeave={onClose}>
          {matchesBreakpointSmall ? (
            <GitPOAPBadge imgUrl={imageUrl} altText="preview" size="sm" />
          ) : (
            <GitPOAPBadge imgUrl={imageUrl} altText="preview" size="xs" />
          )}
        </Box>
      </Popover.Target>
      <Popover.Dropdown>
        <Group>
          <GitPOAPBadge imgUrl={imageUrl} altText="preview" size="lg" />
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
};

import { Box, Group, Popover } from '@mantine/core';
import { rem } from 'polished';
import styled from 'styled-components';
import { BackgroundPanel2 } from '../../../colors';
import { GitPOAPBadge, Sizes } from '../../shared/elements';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  imageUrl: string;
  showWithoutTemplate?: boolean;
  size?: Sizes;
};

const POAP = styled.img`
  border-radius: 50%;
  background: ${BackgroundPanel2};
  width: ${rem(375)};
  height: ${rem(375)};
`;

export const GitPOAPBadgePopover = ({
  isOpen,
  onClose,
  onOpen,
  imageUrl,
  showWithoutTemplate,
  size = 'sm',
}: Props) => {
  return (
    <Popover
      opened={isOpen}
      onClose={onClose}
      position="left"
      withArrow
      withinPortal
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
          <GitPOAPBadge imgUrl={imageUrl} altText="preview" size={size} />
        </Box>
      </Popover.Target>
      <Popover.Dropdown>
        <Group align="center" position="left">
          <GitPOAPBadge imgUrl={imageUrl} altText="preview" size="lg" />
          {showWithoutTemplate && <POAP src={imageUrl} />}
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
};

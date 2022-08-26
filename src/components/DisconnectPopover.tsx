import React, { useEffect } from 'react';
import { Box, Group, Popover } from '@mantine/core';
import { Button } from './shared/elements/Button';

const POPOVER_HOVER_TIME = 400;

type DisconnectPopoverProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  target: React.ReactNode;
  onMouseEnter: React.MouseEventHandler;
  onMouseLeave: React.MouseEventHandler;
  onClose: () => void;
  handleOnClick: () => void;
  icon: React.ReactNode;
  buttonText: string;
  isHovering: boolean;
};

export const DisconnectPopover = ({
  isOpen,
  setIsOpen,
  target,
  onMouseEnter,
  onMouseLeave,
  handleOnClick,
  onClose,
  icon,
  buttonText,
  isHovering,
}: DisconnectPopoverProps) => {
  /* Opens & closes the popover on hover with a time delay */
  useEffect(() => {
    if (isHovering && !isOpen) {
      const timeout = setTimeout(() => setIsOpen(true), POPOVER_HOVER_TIME);
      return () => clearTimeout(timeout);
    } else if (!isHovering && isOpen) {
      const timeout = setTimeout(() => setIsOpen(false), POPOVER_HOVER_TIME);
      return () => clearTimeout(timeout);
    }
  }, [isHovering, isOpen, setIsOpen]);

  return (
    <Popover
      opened={isOpen}
      onClose={onClose}
      position="bottom"
      closeOnClickOutside
      trapFocus={false}
      withArrow
      radius="md"
      styles={{
        dropdown: {
          margin: 0,
          padding: 5,
        },
      }}
    >
      <Popover.Target>
        <Box onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          {target}
        </Box>
      </Popover.Target>
      <Popover.Dropdown>
        <Group onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          <Button variant="outline" onClick={handleOnClick} rightIcon={icon}>
            {buttonText}
          </Button>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
};

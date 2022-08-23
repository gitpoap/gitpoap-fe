import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Popover } from '@mantine/core';
import { DarkGray, TextLight } from '../../colors';
import { People } from '../shared/elements/icons/People';
import { GitPOAP } from '../shared/elements/icons/GitPOAP';
import { Star } from '../shared/elements/icons/Star';

type Props = {
  target: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const PopoverContent = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background: ${DarkGray};
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  font-family: PT Mono;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem(14)};
  line-height: ${rem(18)};
  letter-spacing: ${rem(0.2)};
  color: ${TextLight};

  &:not(:last-child) {
    margin-bottom: ${rem(10)};
  }

  > svg {
    margin-right: ${rem(10)};
  }
`;

export const RecentlyAddedPopover = ({ target, isOpen, onClose }: Props) => {
  return (
    <Popover
      opened={isOpen}
      onClose={onClose}
      position="bottom"
      withArrow
      trapFocus={false}
      closeOnEscape={false}
      transition="pop-top-left"
      width={180}
      radius="md"
      styles={{
        dropdown: { PointerEvent: 'none', borderColor: DarkGray },
        arrow: {
          backgroundColor: DarkGray,
          borderColor: DarkGray,
          width: rem(14),
          height: rem(14),
        },
      }}
    >
      <Popover.Target>{target}</Popover.Target>
      <Popover.Dropdown>
        <PopoverContent>
          <Item>
            <People height="14" width="14" />
            {'Contributors'}
          </Item>
          <Item>
            <GitPOAP height="14" width="14" />
            {'GitPOAPs'}
          </Item>
          <Item>
            <Star height="14" width="14" />
            {'Stars'}
          </Item>
        </PopoverContent>
      </Popover.Dropdown>
    </Popover>
  );
};

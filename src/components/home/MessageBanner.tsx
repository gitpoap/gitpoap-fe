import React from 'react';
import { rem } from 'polished';
import styled from 'styled-components';
import { Group, Text, TextProps, Notification } from '@mantine/core';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import { BackgroundPanel2, BackgroundPanel3, TextGray, TextLight } from '../../colors';
import { BREAKPOINTS } from '../../constants';

const MessageBannerContainer = styled(Group)`
  position: absolute;
  width: 100%;
  z-index: 1;

  @media (max-width: ${BREAKPOINTS.lg}px) {
    position: relative;
  }
`;

const MessageBannerContent = styled(Notification)`
  max-width: 90%;
  background-color: ${BackgroundPanel2};
  cursor: pointer;

  &:hover {
    background-color: ${BackgroundPanel3};
  }
`;

const Title = styled(Text)<TextProps>`
  color: ${TextLight};
`;
const Message = styled(Text)<TextProps>`
  color: ${TextGray};
`;
const RightIconContainer = styled(Group)`
  color: ${TextGray};
`;

type MessageBannerProps = {
  title: string;
  message: string;
  href: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export const MessageBanner = ({
  title,
  message,
  leftIcon,
  rightIcon,
  href,
}: MessageBannerProps) => {
  const matchesBreakpointSmall = useMediaQuery(`(max-width: ${rem(BREAKPOINTS.sm)})`, false);
  const [isOpen, { open, close }] = useDisclosure(true);

  if (!isOpen) {
    return null;
  }

  return (
    <MessageBannerContainer position="center" my={rem(20)}>
      <MessageBannerContent
        icon={leftIcon}
        title={
          <Title size={16} weight="bold">
            {title}
          </Title>
        }
        radius="md"
        py={rem(16)}
        px={rem(20)}
        onClose={() => close()}
      >
        <a href={href} target="_blank" rel="noreferrer">
          <Group align="center" spacing="sm" noWrap>
            <Message size={14}>{message}</Message>
            <RightIconContainer align="center">
              {!matchesBreakpointSmall && rightIcon ? rightIcon : ''}
            </RightIconContainer>
          </Group>
        </a>
      </MessageBannerContent>
    </MessageBannerContainer>
  );
};

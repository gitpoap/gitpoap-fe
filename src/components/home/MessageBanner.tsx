import React from 'react';
import Link from 'next/link';
import { rem } from 'polished';
import styled from 'styled-components';
import { Group, Text, Notification } from '@mantine/core';
import { BackgroundPanel2, BackgroundPanel3, TextLight, TextGray } from '../../colors';
import { BREAKPOINTS } from '../../constants';

const MessageBannerContainer = styled(Group)`
  position: absolute;
  width: 100%;
  z-index: 1;

  @media (max-width: ${BREAKPOINTS.md}px) {
    position: relative;
  }
`;

const MessageBannerContent = styled(Notification)`
  max-width: 90%;
  background-color: ${BackgroundPanel2};
  cursor: pointer;
  transition: background-color 200ms ease;

  &:hover {
    background-color: ${BackgroundPanel3};
  }
`;

type MessageBannerProps = {
  title: string;
  message: string;
  href: string;
  leftIcon?: React.ReactNode;
};

export const MessageBanner = ({ title, message, leftIcon, href }: MessageBannerProps) => {
  return (
    <MessageBannerContainer position="center" my={rem(20)}>
      <Link href={href} target="_blank" rel="noreferrer">
        <MessageBannerContent
          icon={leftIcon}
          title={
            <Text
              size={16}
              sx={{
                color: TextLight,
              }}
              weight="bold"
            >
              {title}
            </Text>
          }
          radius="md"
          py={rem(16)}
          px={rem(20)}
          disallowClose
        >
          <Group align="center" spacing="sm" noWrap>
            <Text
              size={14}
              sx={{
                color: TextGray,
              }}
            >
              {message}
            </Text>
          </Group>
        </MessageBannerContent>
      </Link>
    </MessageBannerContainer>
  );
};

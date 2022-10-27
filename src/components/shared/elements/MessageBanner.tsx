import React from 'react';
import Link from 'next/link';
import { rem } from 'polished';
import styled from 'styled-components';
import { Group, Text, TextProps, Alert } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { BackgroundPanel2, TextGray, TextLight } from '../../../colors';
import { BREAKPOINTS } from '../../../constants';

const MessageBannerContent = styled(Alert)`
  background-color: ${BackgroundPanel2};
  cursor: pointer;
`;

const Title = styled(Text)<TextProps>`
  color: ${TextLight};
`;
const Message = styled(Text)<TextProps>`
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
  return (
    <Group position="center" my={rem(20)}>
      <Link href={href}>
        <MessageBannerContent
          icon={leftIcon}
          title={
            <Title size={16} weight="bold">
              {title}
            </Title>
          }
          radius="md"
        >
          <Group align="center" spacing="sm">
            <Message size={14}>{message}</Message>
            {!matchesBreakpointSmall && rightIcon ? rightIcon : ''}
          </Group>
        </MessageBannerContent>
      </Link>
    </Group>
  );
};

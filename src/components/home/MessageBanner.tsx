import React from 'react';
import Link from 'next/link';
import { rem } from 'polished';
import styled from 'styled-components';
import { Group, Stack, Text, TextProps } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { BackgroundPanel2, TextGray, TextLight } from '../../colors';
import { BREAKPOINTS } from '../../constants';

const MessageBannerContent = styled(Group)`
  background-color: ${BackgroundPanel2};
  border-radius: ${rem(10)};
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
        <MessageBannerContent spacing="md" align="center" py={rem(20)} px={rem(15)} noWrap>
          {!matchesBreakpointSmall && leftIcon ? leftIcon : ''}

          <Stack justify="center" align="start" spacing="xs">
            <Title size={20}>{title}</Title>
            <Message size={16}>{message}</Message>
          </Stack>

          {!matchesBreakpointSmall && rightIcon ? rightIcon : ''}
        </MessageBannerContent>
      </Link>
    </Group>
  );
};

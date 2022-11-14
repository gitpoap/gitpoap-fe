import React from 'react';
import { Link } from '../shared/compounds/Link';
import { rem } from 'polished';
import { Group, Text, Notification } from '@mantine/core';
import { BackgroundPanel2, BackgroundPanel3, PrimaryBlue, TextGray } from '../../colors';

type MessageBannerProps = {
  title: string;
  message: string;
  href: string;
  leftIcon?: React.ReactNode;
};

export const MessageBanner = ({ title, message, leftIcon, href }: MessageBannerProps) => {
  return (
    <Group position="center" my={rem(20)}>
      <Link href={href} target="_blank" rel="noreferrer">
        <Notification
          icon={leftIcon}
          title={
            <Text size={16} weight="bold">
              {title}
            </Text>
          }
          radius="md"
          py={rem(16)}
          px={rem(20)}
          disallowClose
          styles={{
            root: {
              backgroundColor: BackgroundPanel2,
              cursor: 'pointer',
              transition: 'background-color 200ms ease',
              '&:hover': {
                backgroundColor: BackgroundPanel3,
              },
            },
            icon: {
              backgroundColor: `${PrimaryBlue} !important`,
            },
          }}
        >
          <Group align="center" spacing="sm" noWrap>
            <Text sx={{ color: TextGray }}>{message}</Text>
          </Group>
        </Notification>
      </Link>
    </Group>
  );
};

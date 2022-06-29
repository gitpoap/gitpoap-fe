import React from 'react';
import { rem } from 'polished';
import { Skeleton } from '@mantine/core';
import { BackgroundPanel2, BackgroundPanel } from '../../../colors';

export const POAPBadgeSkeleton = (props: React.ComponentProps<typeof Skeleton>) => {
  return (
    <Skeleton
      height={rem(150)}
      circle
      sx={(_) => ({
        '&::after': {
          backgroundColor: BackgroundPanel,
        },
        '&::before': {
          backgroundColor: BackgroundPanel2,
        },
      })}
      {...props}
    />
  );
};

export const ProfileImageSkeleton = (props: React.ComponentProps<typeof Skeleton>) => {
  return (
    <Skeleton
      height={rem(160)}
      width={rem(160)}
      circle
      sx={(_) => ({
        '&::after': {
          backgroundColor: BackgroundPanel,
        },
        '&::before': {
          backgroundColor: BackgroundPanel2,
        },
      })}
      {...props}
    />
  );
};

export const TextSkeleton = (props: React.ComponentProps<typeof Skeleton>) => {
  return (
    <Skeleton
      height={rem(20)}
      width={rem(200)}
      sx={(_) => ({
        '&::after': {
          backgroundColor: BackgroundPanel,
        },
        '&::before': {
          backgroundColor: BackgroundPanel2,
        },
      })}
      {...props}
    />
  );
};

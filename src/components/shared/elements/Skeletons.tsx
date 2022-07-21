import React from 'react';
import { rem } from 'polished';
import { Skeleton } from '@mantine/core';
import { BackgroundPanel2, BackgroundPanel } from '../../../colors';

export const BaseSkeleton = (props: React.ComponentProps<typeof Skeleton>) => {
  return (
    <Skeleton
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

export const POAPBadgeSkeleton = (props: React.ComponentProps<typeof Skeleton>) => {
  return <BaseSkeleton height={rem(150)} circle {...props} />;
};

export const ProfileImageSkeleton = (props: React.ComponentProps<typeof Skeleton>) => {
  return <BaseSkeleton height={rem(160)} width={rem(160)} circle {...props} />;
};

export const TextSkeleton = (props: React.ComponentProps<typeof Skeleton>) => {
  return <BaseSkeleton height={rem(20)} width={rem(200)} {...props} />;
};

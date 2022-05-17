import React from 'react';
import { rem } from 'polished';
import { Skeleton } from '@mantine/core';
import { BackgroundPanel2, BackgroundPanel } from '../../../colors';

type Props = {
  height?: string;
};

export const POAPBadgeSkeleton = (props: Props & React.ComponentProps<typeof Skeleton>) => {
  return (
    <Skeleton
      height={props.height ?? rem(150)}
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

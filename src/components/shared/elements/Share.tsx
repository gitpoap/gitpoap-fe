import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { useClipboard } from '@mantine/hooks';
import { Box, Group, GroupProps, Tooltip } from '@mantine/core';
import { FiShare } from 'react-icons/fi';
import { LinkStyles } from '../../../components/shared/elements/NavLink';

type Props = {
  className?: string;
  textToCopy: string;
} & GroupProps;

const ShareText = styled(Box)`
  ${LinkStyles}
  cursor: pointer;
`;

const Icon = styled(FiShare)`
  margin-left: ${rem(5)};
`;

export const Share = ({ className, textToCopy, ...groupProps }: Props) => {
  const clipboard = useClipboard({ timeout: 1500 });

  return (
    <Group
      className={className}
      onClick={() => clipboard.copy(textToCopy)}
      position="center"
      align="center"
      spacing={0}
      sx={{ display: 'inline-flex' }}
      {...groupProps}
    >
      <Tooltip opened={clipboard.copied} label="Copied!" withArrow position="right">
        <ShareText>
          {'Share'}
          <Icon />
        </ShareText>
      </Tooltip>
    </Group>
  );
};

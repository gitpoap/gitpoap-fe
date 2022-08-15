import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Tooltip } from './Tooltip';
import { FiShare } from 'react-icons/fi';
import { LinkStyles } from '../../../components/shared/elements/NavLink';
import { useClipboard } from '@mantine/hooks';
import { Box } from '@mantine/core';

type Props = {
  className?: string;
  textToCopy: string;
};

const Container = styled.div`
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ShareText = styled(Box)`
  ${LinkStyles}
  cursor: pointer;
`;

const Icon = styled(FiShare)`
  margin-left: ${rem(5)};
`;

export const Share = ({ className, textToCopy }: Props) => {
  const clipboard = useClipboard({ timeout: 1500 });

  return (
    <Container className={className} onClick={() => clipboard.copy(textToCopy)}>
      <Tooltip opened={clipboard.copied} label="Copied!" withArrow position="right">
        <ShareText>
          {'Share'}
          <Icon />
        </ShareText>
      </Tooltip>
    </Container>
  );
};

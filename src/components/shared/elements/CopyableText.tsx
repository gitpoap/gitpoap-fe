import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Box, Tooltip } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { FiCopy } from 'react-icons/fi';
import { Title } from './Title';
import { TextGray } from '../../../colors';

type Props = {
  className?: string;
  text: string;
  textToCopy: string;
};

const CopyableTextStyled = styled(Title)`
  display: flex;
  flex-direction: row;
  font-weight: normal;
  font-size: ${rem(14)};
  line-height: ${rem(18)};
  letter-spacing: ${rem(-0.5)};
  color: ${TextGray};
`;

export const CopyableText = ({ className, text, textToCopy }: Props) => {
  const clipboard = useClipboard({ timeout: 1500 });

  return (
    <CopyableTextStyled className={className} onClick={() => clipboard.copy(textToCopy)}>
      {text}
      <Tooltip opened={clipboard.copied} label="Copied!" withArrow position="right-end">
        <Box>
          <FiCopy style={{ marginLeft: rem(6) }} />
        </Box>
      </Tooltip>
    </CopyableTextStyled>
  );
};

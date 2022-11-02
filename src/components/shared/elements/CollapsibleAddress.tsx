import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { useClipboard } from '@mantine/hooks';
import { FiCopy } from 'react-icons/fi';
import { Box, Tooltip } from '@mantine/core';
import { utils } from 'ethers';
import { Title } from '../../shared/elements/Title';
import { TextGray } from '../../../colors';
import { truncateAddress } from '../../../helpers';

type Props = {
  className?: string;
  address: string;
  isCollapsed: boolean;
};

const Address = styled(Title)`
  display: flex;
  flex-direction: row;
  font-weight: normal;
  font-size: ${rem(14)};
  line-height: ${rem(18)};
  letter-spacing: ${rem(-0.5)};
  color: ${TextGray};
`;

export const CollapsibleAddress = ({ className, address, isCollapsed }: Props) => {
  const checksumAddress = utils.getAddress(address);
  const clipboard = useClipboard({ timeout: 1500 });
  const truncatedAddress = truncateAddress(checksumAddress);

  return (
    <Address className={className} onClick={() => clipboard.copy(checksumAddress)}>
      {isCollapsed ? truncatedAddress : checksumAddress}
      <Tooltip opened={clipboard.copied} label="Copied!" withArrow position="right">
        <Box>
          <FiCopy style={{ marginLeft: rem(6) }} />
        </Box>
      </Tooltip>
    </Address>
  );
};

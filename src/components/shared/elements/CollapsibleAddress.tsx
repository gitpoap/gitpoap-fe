import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { useClipboard } from '@mantine/hooks';
import { FiCopy } from 'react-icons/fi';
import { Tooltip } from './Tooltip';
import { Title } from '../../shared/elements/Title';
import { TextGray } from '../../../colors';
import { truncateAddress } from '../../../helpers';

type Props = {
  className?: string;
  address: string;
  isCollapsed: boolean;
};

const Address = styled(Title)`
  font-family: PT Mono;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem(14)};
  line-height: ${rem(18)};
  letter-spacing: ${rem(-0.5)};
  color: ${TextGray};
`;

export const CollapsibleAddress = ({ className, address, isCollapsed }: Props) => {
  const clipboard = useClipboard({ timeout: 1500 });
  const truncatedAddress = truncateAddress(address);

  return (
    <Address className={className} onClick={() => clipboard.copy(address)}>
      {isCollapsed ? truncatedAddress : address}
      <Tooltip opened={clipboard.copied} label="Copied!" withArrow position="right" placement="end">
        <FiCopy style={{ marginLeft: rem(6) }} />
      </Tooltip>
    </Address>
  );
};

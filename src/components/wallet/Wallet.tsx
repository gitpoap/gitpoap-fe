import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { WalletStatus } from './WalletStatus';
import { useWeb3Context } from './Web3ContextProvider';
import { Button } from '../shared/elements/Button';
import { FaEthereum } from 'react-icons/fa';
import { DisconnectPopover } from '../DisconnectPopover';
import { useRouter } from 'next/router';

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: white;
`;

type Props = {
  hideText?: boolean;
};

export const Wallet = ({ hideText }: Props) => {
  const { connectionStatus, address, connect, disconnect, ensName } = useWeb3Context();
  const [isHovering, setIsHovering] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  /* Ensure the popover is closed when the button switches to a connected state */
  useEffect(() => {
    if (connectionStatus === 'connected') {
      setIsOpen(false);
      setIsHovering(false);
    }
  }, [connectionStatus]);

  return (
    <Content>
      {connectionStatus === 'connected' && address ? (
        <DisconnectPopover
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClose={() => setIsOpen(false)}
          handleOnClick={() => {
            setIsOpen(false);
            setIsHovering(false);
            disconnect();
          }}
          icon={<FaEthereum size={16} />}
          buttonText={'DISCONNECT'}
          isHovering={isHovering}
          target={
            <WalletStatus
              onClick={() => {
                router.push(`/p/${ensName ?? address}`);
              }}
              address={address}
              ensName={ensName}
              hideText={hideText}
            />
          }
        />
      ) : (
        <Button onClick={() => connect()}>
          {!hideText ? 'Connect Wallet' : <FaEthereum size={16} />}
        </Button>
      )}
    </Content>
  );
};

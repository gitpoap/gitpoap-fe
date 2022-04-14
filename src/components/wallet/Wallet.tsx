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

export const Wallet = () => {
  const { isConnected, address, connect, disconnect, ensName } = useWeb3Context();
  const [isHovering, setIsHovering] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      setIsOpen(false);
      setIsHovering(false);
    }
  }, [isConnected]);

  return (
    <Content>
      {!isConnected && <Button onClick={() => connect()}>{'Connect Wallet'}</Button>}
      {isConnected && (
        <DisconnectPopover
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClose={() => setIsOpen(false)}
          handleOnClick={() => disconnect()}
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
            />
          }
        />
      )}
    </Content>
  );
};

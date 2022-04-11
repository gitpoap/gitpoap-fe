import React from 'react';
import styled from 'styled-components';
import { WalletStatus } from './WalletStatus';
import { useWeb3Context } from './Web3ContextProvider';
import { Button } from '../shared/elements/Button';
import { Tooltip } from '../shared/elements/Tooltip';

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: white;
`;

export const Wallet = () => {
  const { isConnected, address, connect, disconnect, ensName } = useWeb3Context();

  return (
    <Content>
      {!isConnected && <Button onClick={() => connect()}>{'Connect Wallet'}</Button>}
      {isConnected && (
        <Tooltip label={'Disconnect wallet'} withArrow>
          <WalletStatus
            onClick={() => {
              disconnect();
            }}
            address={address}
            ensName={ensName}
          />
        </Tooltip>
      )}
    </Content>
  );
};

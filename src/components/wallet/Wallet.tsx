import React from 'react';
import styled from 'styled-components';
import { WalletStatus } from './WalletStatus';
import { useWeb3Context } from './Web3ContextProvider';
import { Button } from '../shared/elements/Button';
import { FaEthereum } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { Box, Menu } from '@mantine/core';
import { NextLink } from '@mantine/next';

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: white;
`;

const POPOVER_HOVER_TIME = 400;

type Props = {
  hideText?: boolean;
};

export const Wallet = ({ hideText }: Props) => {
  const { connectionStatus, address, connect, disconnect, ensName } = useWeb3Context();
  const router = useRouter();

  return (
    <Content>
      {connectionStatus === 'connected' && address ? (
        <Menu
          closeDelay={POPOVER_HOVER_TIME}
          closeOnClickOutside
          openDelay={POPOVER_HOVER_TIME}
          radius="md"
          trigger="hover"
          width={160}
        >
          <Menu.Target>
            <Box>
              <WalletStatus
                onClick={() => {
                  router.push(`/p/${ensName ?? address}`);
                }}
                address={address}
                ensName={ensName}
                hideText={hideText}
              />
            </Box>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item component={NextLink} href={`/p/${ensName ?? address}`}>
              {'Profile'}
            </Menu.Item>
            <Menu.Item component={NextLink} href="/settings">
              {'Settings'}
            </Menu.Item>
            <Menu.Item component="a" href="https://docs.gitpoap.io" target="_blank">
              {'Help'}
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item onClick={() => disconnect()}>{'Disconnect'}</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ) : (
        <Button onClick={() => connect()}>
          {!hideText ? 'Connect Wallet' : <FaEthereum size={16} />}
        </Button>
      )}
    </Content>
  );
};

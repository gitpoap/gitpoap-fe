import { Box, Group, Menu } from '@mantine/core';
import { NextLink } from '@mantine/next';
import React from 'react';
import { FaEthereum } from 'react-icons/fa';
import styled from 'styled-components';
import { WalletStatus } from './WalletStatus';
import { useWeb3Context } from './Web3Context';
import { Button } from '../shared/elements/Button';
import { useUser } from '../../hooks/useUser';
import { shortenAddress } from '../../helpers';

const MenuHeader = styled(Menu.Label)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

const POPOVER_HOVER_TIME = 400;

type Props = {
  hideText?: boolean;
  isMobile: boolean;
};

export const Wallet = ({ hideText, isMobile }: Props) => {
  const { connectionStatus, address, connect, disconnectWallet } = useWeb3Context();
  const user = useUser();
  const ensName = user?.ensName ?? null;
  const ensAvatarUrl = user?.ensAvatarImageUrl ?? null;

  return (
    <Group position="center" align="center">
      {connectionStatus === 'connected-to-wallet' && address ? (
        !isMobile ? (
          <Menu
            closeDelay={POPOVER_HOVER_TIME}
            closeOnClickOutside
            closeOnEscape
            openDelay={POPOVER_HOVER_TIME}
            position="bottom-end"
            radius="md"
            trigger="click"
            width={160}
          >
            <Menu.Target>
              <Box>
                <WalletStatus
                  address={address}
                  ensName={ensName}
                  ensAvatarUrl={ensAvatarUrl}
                  hideText={hideText}
                />
              </Box>
            </Menu.Target>
            <Menu.Dropdown>
              <MenuHeader>{ensName ?? shortenAddress(address)}</MenuHeader>
              <Menu.Divider />
              <Menu.Item component={NextLink} href={`/p/${ensName ?? address}`}>
                {'Profile'}
              </Menu.Item>
              <Menu.Item component={NextLink} href={'/me/gitpoaps'}>
                {'My GitPOAPs'}
              </Menu.Item>
              <Menu.Item component={NextLink} href="/settings">
                {'Settings'}
              </Menu.Item>
              <Menu.Item component="a" href="https://docs.gitpoap.io" target="_blank">
                {'Help'}
              </Menu.Item>
              {user?.permissions.isAdmin && (
                <Menu.Item component={NextLink} href="/admin">
                  {'Admin'}
                </Menu.Item>
              )}
              <Menu.Divider />
              <Menu.Item onClick={() => disconnectWallet()}>{'Disconnect'}</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : (
          <WalletStatus
            address={address}
            ensName={ensName}
            ensAvatarUrl={ensAvatarUrl}
            hideText={hideText}
          />
        )
      ) : (
        <Button leftIcon={!hideText && <FaEthereum size={16} />} onClick={() => connect()}>
          {!hideText ? 'Sign In' : <FaEthereum size={16} />}
        </Button>
      )}
    </Group>
  );
};

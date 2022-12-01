import { Box, Group, Menu } from '@mantine/core';
import { NextLink } from '@mantine/next';
import React from 'react';
import { FaEthereum } from 'react-icons/fa';
import { JazzIconNoText, StyledAvatar, WalletStatus } from './WalletStatus';
import { useWeb3React } from '@web3-react/core';
import ConnectWallet from '../wallet/ConnectWallet';
import { useUser } from '../../hooks/useUser';
import { shortenAddress } from '../../helpers';

const POPOVER_HOVER_TIME = 400;

type Props = {
  hideText?: boolean;
  isMobile: boolean;
};

export const Wallet = ({ hideText, isMobile }: Props) => {
  const { account, library, deactivate } = useWeb3React();
  const isConnected = typeof account === 'string' && !!library;
  const user = useUser();
  const ensName = user?.ensName ?? null;
  const ensAvatarUrl = user?.ensAvatarImageUrl ?? null;

  return (
    <Group position="center" align="center">
      {isConnected ? (
        !isMobile ? (
          <Menu
            closeDelay={POPOVER_HOVER_TIME}
            closeOnClickOutside
            closeOnEscape
            openDelay={POPOVER_HOVER_TIME}
            position="bottom-end"
            radius="md"
            trigger="click"
          >
            <Menu.Target>
              <Box>
                <WalletStatus
                  address={account}
                  ensName={ensName}
                  ensAvatarUrl={ensAvatarUrl}
                  hideText={hideText}
                />
              </Box>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item component={NextLink} href={`/p/${ensName ?? account}`}>
                <Group noWrap>
                  {ensAvatarUrl ? (
                    <StyledAvatar src={ensAvatarUrl} useDefaultImageTag />
                  ) : (
                    <JazzIconNoText address={account} />
                  )}
                  {ensName ?? shortenAddress(account)}
                </Group>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item component={NextLink} href={'/me/gitpoaps'}>
                {'My GitPOAPs'}
              </Menu.Item>
              <Menu.Item component={NextLink} href="/settings">
                {'Settings'}
              </Menu.Item>
              <Menu.Item component="a" href="https://docs.gitpoap.io" target="_blank">
                {'Help'}
              </Menu.Item>
              {user?.permissions.isStaff && (
                <Menu.Item component={NextLink} href="/admin">
                  {'Admin'}
                </Menu.Item>
              )}
              <Menu.Divider />
              <Menu.Item onClick={deactivate}>{'Disconnect'}</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : (
          <WalletStatus
            address={account}
            ensName={ensName}
            ensAvatarUrl={ensAvatarUrl}
            hideText={hideText}
          />
        )
      ) : (
        <ConnectWallet leftIcon={!hideText && <FaEthereum size={16} />}>
          {!hideText ? 'Sign In' : <FaEthereum size={16} />}
        </ConnectWallet>
      )}
    </Group>
  );
};

import { Box, Group, Menu } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import { FaEthereum } from 'react-icons/fa';
import { JazzIconNoText, StyledAvatar, WalletStatus } from './WalletStatus';
import { ConnectWalletButton } from '../wallet/ConnectWallet';
import { useUser } from '../../hooks/useUser';
import { shortenAddress } from '../../helpers';
import { useWeb3Context, ConnectionStatus } from './Web3Context';

const POPOVER_HOVER_TIME = 400;

type Props = {
  hideText?: boolean;
  isMobile: boolean;
};

export const Wallet = ({ hideText, isMobile }: Props) => {
  const { connectionStatus, address: connectedAddress, disconnectWallet } = useWeb3Context();
  const user = useUser();
  const ensName = user?.ensName ?? null;
  const ensAvatarUrl = user?.ensAvatarImageUrl ?? null;

  return (
    <Group position="center" align="center">
      {connectedAddress && connectionStatus === ConnectionStatus.CONNECTED_TO_WALLET ? (
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
                  address={connectedAddress}
                  ensName={ensName}
                  ensAvatarUrl={ensAvatarUrl}
                  hideText={hideText}
                />
              </Box>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item component={Link} href={`/p/${ensName ?? connectedAddress}`}>
                <Group noWrap>
                  {ensAvatarUrl ? (
                    <StyledAvatar src={ensAvatarUrl} useDefaultImageTag />
                  ) : (
                    <JazzIconNoText address={connectedAddress} />
                  )}
                  {ensName ?? shortenAddress(connectedAddress)}
                </Group>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item component={Link} href={'/me/gitpoaps'}>
                {'GitPOAP Requests'}
              </Menu.Item>
              {user?.permissions.isStaff && (
                <Menu.Item component={Link} href={'/me/teams'}>
                  {'Teams'}
                </Menu.Item>
              )}
              <Menu.Item component={Link} href="/settings">
                {'Settings'}
              </Menu.Item>
              <Menu.Item component="a" href="https://docs.gitpoap.io" target="_blank">
                {'Help'}
              </Menu.Item>
              {user?.permissions.isStaff && (
                <Menu.Item component={Link} href="/admin">
                  {'Admin'}
                </Menu.Item>
              )}
              <Menu.Divider />
              <Menu.Item onClick={disconnectWallet}>{'Disconnect'}</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : (
          <WalletStatus
            address={connectedAddress}
            ensName={ensName}
            ensAvatarUrl={ensAvatarUrl}
            hideText={hideText}
          />
        )
      ) : (
        <ConnectWalletButton leftIcon={!hideText && <FaEthereum size={16} />}>
          {!hideText ? 'Sign In' : <FaEthereum size={16} />}
        </ConnectWalletButton>
      )}
    </Group>
  );
};

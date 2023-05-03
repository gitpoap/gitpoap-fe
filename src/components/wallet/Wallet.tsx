import { Box, Group, Menu } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import { FaEthereum } from 'react-icons/fa';
import { JazzIconNoText, WalletStatus } from './WalletStatus';
import { ConnectWalletButton } from '../wallet/ConnectWallet';
import { useAuthContext } from '../../hooks/useAuthContext';
import { shortenAddress } from '../../helpers';
import { Avatar } from '../shared/elements';

const POPOVER_HOVER_TIME = 400;

type Props = {
  hideText?: boolean;
  isMobile: boolean;
};

export const Wallet = ({ hideText, isMobile }: Props) => {
  const { disconnect } = useAuthContext();
  const { user } = useAuthContext();
  const ensName = user?.ensName ?? null;
  const ensAvatarUrl = user?.ensAvatarImageUrl ?? null;
  const connectedAddress = user?.address ?? '';
  const email = user?.emailAddress ?? '';
  const accountValue = connectedAddress ? ensName ?? shortenAddress(connectedAddress) : email;

  return (
    <Group position="center" align="center">
      {connectedAddress || email ? (
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
                  accountValue={accountValue}
                  ensAvatarUrl={ensAvatarUrl}
                  hideText={hideText}
                />
              </Box>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item component={Link} href={`/p/${ensName ?? connectedAddress}`}>
                <Group noWrap>
                  {ensAvatarUrl ? (
                    <Avatar src={ensAvatarUrl} useDefaultImageTag size={16} />
                  ) : (
                    <JazzIconNoText address={accountValue} />
                  )}
                  {accountValue}
                </Group>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item component={Link} href={'/me/gitpoaps'}>
                {'GitPOAP Requests'}
              </Menu.Item>
              <Menu.Item component={Link} href={'/me/teams'}>
                {'My Teams'}
              </Menu.Item>
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
              <Menu.Item onClick={disconnect}>{'Disconnect'}</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : (
          <WalletStatus accountValue={accountValue} ensAvatarUrl={ensAvatarUrl} hideText={false} />
        )
      ) : (
        <ConnectWalletButton leftIcon={!hideText && <FaEthereum size={16} />}>
          {!hideText ? 'Sign In' : <FaEthereum size={16} />}
        </ConnectWalletButton>
      )}
    </Group>
  );
};

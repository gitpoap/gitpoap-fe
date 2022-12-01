import { useEffect, useCallback } from 'react';
import { Box, Group, Menu } from '@mantine/core';
import { NextLink } from '@mantine/next';
import React from 'react';
import { FaEthereum } from 'react-icons/fa';
import { useWeb3React } from '@web3-react/core';
import { JsonRpcSigner } from '@ethersproject/providers';
import styled from 'styled-components';
import { WalletStatus } from './WalletStatus';
import ConnectWallet from '../wallet/ConnectWallet';
import { useUser } from '../../hooks/useUser';
import { shortenAddress } from '../../helpers';
import { useApi } from '../../hooks/useApi';
import { useIndexedDB } from '../../hooks/useIndexedDB';
import { AuthenticateResponse } from '../../lib/api/auth';
import { useConnectionStatus, ConnectionStatus } from '../../hooks/useConnectionStatus';

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
  const { account, library, deactivate } = useWeb3React();
  const { connectionStatus, setConnectionStatus } = useConnectionStatus();
  const isConnected = typeof account === 'string' && !!library;
  const user = useUser();
  const ensName = user?.ensName ?? null;
  const ensAvatarUrl = user?.ensAvatarImageUrl ?? null;

  const api = useApi();

  const { value: signature, setValue: setSignature } = useIndexedDB(account ?? '', null);

  const authenticate = useCallback(async () => {
    console.log('authenticate', signature);

    const signer: JsonRpcSigner = library.getSigner();
    console.log('ask sign');
    const authData: AuthenticateResponse | null = await api.auth.authenticate(signer);
    console.log('get auth data', authData);

    if (authData) {
      // set signature data into IndexedDB
      setSignature({
        signature: authData.signatureString,
        message: authData.signatureData.message,
        createdAt: authData.signatureData.createdAt,
      });
      // update connection status
      setConnectionStatus(ConnectionStatus.CONNECTED_TO_WALLET);
    }
  }, [library, api.auth, setSignature, setConnectionStatus]);

  useEffect(() => {
    console.log('account', account, signature);
    // if there is existing signature signed by current connected address, we will just get jwt token from its signature

    // we make a call to authenticate only if wallet is connected and not previously signed address
    if (isConnected && account && !signature) {
      void authenticate();
    }
  }, [account, isConnected, authenticate, signature]);

  return (
    <Group position="center" align="center">
      {account && connectionStatus === ConnectionStatus.CONNECTED_TO_WALLET ? (
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
                  address={account}
                  ensName={ensName}
                  ensAvatarUrl={ensAvatarUrl}
                  hideText={hideText}
                />
              </Box>
            </Menu.Target>
            <Menu.Dropdown>
              <MenuHeader>{ensName ?? shortenAddress(account)}</MenuHeader>
              <Menu.Divider />
              <Menu.Item component={NextLink} href={`/p/${ensName ?? account}`}>
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

import { useEffect, useCallback } from 'react';
import { Box, Group, Menu } from '@mantine/core';
import { NextLink } from '@mantine/next';
import React from 'react';
import { FaEthereum } from 'react-icons/fa';
import { JazzIconNoText, StyledAvatar, WalletStatus } from './WalletStatus';
import { useWeb3React } from '@web3-react/core';
import { JsonRpcSigner } from '@ethersproject/providers';
import ConnectWallet from '../wallet/ConnectWallet';
import { useUser } from '../../hooks/useUser';
import { shortenAddress } from '../../helpers';
import { useApi } from '../../hooks/useApi';
import { useIndexedDB } from '../../hooks/useIndexedDB';
import { AuthenticateResponse } from '../../lib/api/auth';
import { useConnectionStatus, ConnectionStatus } from '../../hooks/useConnectionStatus';
import { sign, generateSignatureData } from '../../helpers';
import { SignatureType } from '../../types';

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

  const authenticate = useCallback(
    async (address: string, signature: SignatureType) => {
      const authData: AuthenticateResponse | null = await api.auth.authenticate(address, signature);
      console.log('get auth data', authData);

      if (authData) {
        // set signature data into IndexedDB
        setSignature({
          ...authData.signatureData,
        });
        // update connection status
        setConnectionStatus(ConnectionStatus.CONNECTED_TO_WALLET);
      }
    },
    [api.auth, setConnectionStatus, setSignature],
  );

  const authenticateWithoutSignature = useCallback(async () => {
    // set connection status as connecting
    setConnectionStatus(ConnectionStatus.CONNECTING_WALLET);

    const signer: JsonRpcSigner = library.getSigner();
    const address = await signer.getAddress();
    const signatureData = generateSignatureData(address);
    const signatureString = await sign(signer, signatureData.message);

    if (!signatureString) return;

    await authenticate(address, {
      signature: signatureString,
      ...signatureData,
    });
  }, [library, authenticate, setConnectionStatus]);

  const authenticateWithSignature = useCallback(
    async (signature: SignatureType) => {
      if (!account) return;

      // set connection status as connecting
      setConnectionStatus(ConnectionStatus.CONNECTING_WALLET);

      await authenticate(account, signature);
    },
    [authenticate, account, setConnectionStatus],
  );

  useEffect(() => {
    console.log('account', account, signature);
    // if wallet is not connected, do no thing
    if (!isConnected) return;
    // if wallet is connecting or connected, disconnecting, do nothing
    if (connectionStatus !== ConnectionStatus.UNINITIALIZED) return;

    if (signature) {
      void authenticateWithSignature(signature);
    } else {
      // we make a call to authenticate only if wallet is connected and not previously signed address
      void authenticateWithoutSignature();
    }
  }, [
    account,
    isConnected,
    authenticate,
    signature,
    authenticateWithSignature,
    authenticateWithoutSignature,
    connectionStatus,
  ]);

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

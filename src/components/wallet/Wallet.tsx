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
import { sign, generateSignatureData } from '../../helpers';
import { SignatureType } from '../../types';
import { useWeb3Context, ConnectionStatus } from './Web3Context';

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
  const {
    connectionStatus,
    setConnectionStatus,
    address: connectedAddress,
    setAddress: setConnectedAddress,
  } = useWeb3Context();
  const isConnected = typeof account === 'string' && !!library;
  const user = useUser();
  const ensName = user?.ensName ?? null;
  const ensAvatarUrl = user?.ensAvatarImageUrl ?? null;

  const api = useApi();

  const {
    value: signature,
    setValue: setSignature,
    isLoaded: isSignatureLoaded,
  } = useIndexedDB(account ?? '', null);

  const authenticate = useCallback(
    async (signature: SignatureType) => {
      const authData: AuthenticateResponse | null = await api.auth.authenticate(signature);

      if (!authData) {
        // update signature
        setSignature(null);
        // update connection status
        setConnectionStatus(ConnectionStatus.UNINITIALIZED);
        return;
      }

      // set signature data into IndexedDB
      setSignature({
        ...authData.signatureData,
      });
      // update connection status
      setConnectionStatus(ConnectionStatus.CONNECTED_TO_WALLET);
      setConnectedAddress(authData.signatureData.address);
    },
    [setConnectionStatus, setSignature, setConnectedAddress, api.auth],
  );

  const authenticateWithoutSignature = useCallback(async () => {
    const signer: JsonRpcSigner = library.getSigner();
    const address = await signer.getAddress();
    const signatureData = generateSignatureData(address);
    const signatureString = await sign(signer, signatureData.message);

    if (!signatureString) return;

    await authenticate({
      ...signatureData,
      signature: signatureString,
      address,
    });
  }, [library, authenticate]);

  const authenticateWithSignature = useCallback(
    async (signature: SignatureType) => {
      await authenticate(signature);
    },
    [authenticate],
  );

  useEffect(() => {
    // if wallet is not connected, do no thing
    if (!isConnected) return;
    // do nothing if signature is not loaded yet from indexedDB
    if (!isSignatureLoaded || (signature && signature.address !== account)) return;
    // if wallet is connecting, do nothing
    if (connectionStatus === ConnectionStatus.CONNECTING_WALLET) return;
    // if wallet is connected signed by current address, do nothing
    if (connectionStatus === ConnectionStatus.CONNECTED_TO_WALLET && connectedAddress === account)
      return;

    // now that we go through authentication
    // set connection status as connecting
    setConnectionStatus(ConnectionStatus.CONNECTING_WALLET);

    if (signature) {
      void authenticateWithSignature(signature);
    } else {
      // we ask to sign a signature only if there is no signature for connected address
      void authenticateWithoutSignature();
    }
  }, [
    account,
    connectedAddress,
    isConnected,
    signature,
    connectionStatus,
    isSignatureLoaded,
    authenticateWithSignature,
    authenticateWithoutSignature,
    setConnectionStatus,
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

import { useCallback } from 'react';
import { Button, ButtonProps } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import WalletModal from './WalletModal';
import { truncateAddress } from '../../helpers';
import { useWeb3Context, ConnectionStatus } from './Web3Context';
import { Loader } from '../shared/elements';
import { DateTime } from 'luxon';
import { useTokens } from '../../hooks/useTokens';
import { useApi } from '../../hooks/useApi';
import { ONE_MONTH_IN_S } from '../../constants';

const ConnectWallet = (props: ButtonProps) => {
  const { address, ensName, connectionStatus, setAddress, setConnectionStatus, disconnectWallet } =
    useWeb3Context();

  const api = useApi();

  const [opened, { close, open }] = useDisclosure(false);

  const { tokens, payload, refreshTokenPayload, setAccessToken, setRefreshToken } = useTokens();

  const refreshToken = useCallback(
    async (address: string) => {
      const tokens = await api.auth.refresh();

      if (tokens?.accessToken && tokens?.refreshToken) {
        setAccessToken(tokens.accessToken);
        setRefreshToken(tokens.refreshToken);

        // update connection status
        setConnectionStatus(ConnectionStatus.CONNECTED_TO_WALLET);
        setAddress(address);
      } else {
        disconnectWallet();
      }
    },
    [api.auth, setAccessToken, setRefreshToken, setConnectionStatus, setAddress, disconnectWallet],
  );

  const handleConnect = useCallback(async () => {
    // if previous access token exists, we check if refresh token is valid or not
    // if valid, we use it to refresh access token, no need to ask to sign
    const issuedAt = refreshTokenPayload?.iat ?? 0;
    const isExpired = DateTime.now().toUnixInteger() >= issuedAt + ONE_MONTH_IN_S;
    if (tokens && payload?.address && !isExpired && tokens.refreshToken) {
      // use existing refresh token to refresh access token
      setConnectionStatus(ConnectionStatus.CONNECTING_WALLET);
      void refreshToken(payload.address);
    } else {
      // otherwise, open wallet connect modal
      open();
    }
  }, [tokens, payload, open, refreshToken, setConnectionStatus, refreshTokenPayload?.iat]);

  if (address && connectionStatus === ConnectionStatus.CONNECTED_TO_WALLET) {
    return <Button {...props}>{ensName || `${truncateAddress(address, 4)}`}</Button>;
  }

  if (connectionStatus === ConnectionStatus.CONNECTING_WALLET) {
    return (
      <Button>
        <Loader size="sm" />
      </Button>
    );
  }

  return (
    <div>
      <Button {...props} onClick={handleConnect}>
        {props.children}
      </Button>
      <WalletModal isOpen={opened} closeModal={close} />
    </div>
  );
};

export default ConnectWallet;

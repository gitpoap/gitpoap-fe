import styled from 'styled-components';
import { Center, Container, Loader, Stack } from '@mantine/core';
import { Page } from '../_app';
import { SEO } from '../../components/shared/compounds/SEO';
import { UserGitPOAPRequestList } from '../../components/settings/UserGitPOAPRequestList';
import { useWeb3Context } from '../../components/wallet/Web3Context';
import { Button, Header } from '../../components/shared/elements';
import { ProfileProvider } from '../../components/profile/ProfileContext';
import { FaEthereum } from 'react-icons/fa';

const CGRequests: Page = () => {
  const { address, connect, connectionStatus } = useWeb3Context();

  return (
    <>
      <SEO
        title={`CG Requests | GitPOAP`}
        description={`GitPOAP - a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs.`}
        image={'https://gitpoap.io/og-image-512x512.png'}
        url={`https://gitpoap.io/settings`}
      />
      {address && connectionStatus === 'connected-to-wallet' ? (
        <ProfileProvider addressOrEns={address}>
          <UserGitPOAPRequestList />
        </ProfileProvider>
      ) : (
        <Center style={{ width: '100%', height: 600 }}>
          {connectionStatus === 'disconnected' && (
            <Stack spacing={32}>
              <Header>{'Sign In to Continue'}</Header>
              <Button leftIcon={<FaEthereum size={16} />} onClick={() => connect()}>
                {'Connect Wallet'}
              </Button>
            </Stack>
          )}
          {connectionStatus === 'connecting-wallet' && <Loader />}
        </Center>
      )}
    </>
  );
};

export default CGRequests;

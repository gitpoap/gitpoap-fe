import styled from 'styled-components';
import { Center, Container, Loader, Stack } from '@mantine/core';
import { Page } from '../_app';
import { SEO } from '../../components/shared/compounds/SEO';
import { SettingsPage } from '../../components/settings/SettingsPage';
import { useWeb3Context } from '../../components/wallet/Web3Context';
import { Button, Header } from '../../components/shared/elements';
import { ProfileProvider } from '../../components/profile/ProfileContext';
import { FaEthereum } from 'react-icons/fa';
import { SettingsPageLayout } from '../../components/settings/SettingsPageLayout';
import React from 'react';
import { useUser } from '../../hooks/useUser';

const Wrapper = styled(Container)`
  width: 100vw;
`;

const Settings: Page = () => {
  const { address, connect, connectionStatus } = useWeb3Context();

  return (
    <>
      <SEO
        title={`Settings | GitPOAP`}
        description={`GitPOAP - a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs.`}
        image={'https://gitpoap.io/og-image-512x512.png'}
        url={`https://gitpoap.io/settings`}
      />
      {address && connectionStatus === 'connected-to-wallet' ? (
        <ProfileProvider addressOrEns={address}>
          <SettingsPageLayout>
            <Wrapper size={600} style={{ width: '100%' }}>
              <SettingsPage />
            </Wrapper>
          </SettingsPageLayout>
        </ProfileProvider>
      ) : (
        <Wrapper size={600} style={{ width: '100%' }}>
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
        </Wrapper>
      )}
    </>
  );
};

// Settings.getLayout = function getLayout(page: React.ReactNode) {
//   return <SettingsPageLayout>{page}</SettingsPageLayout>;
// };

export default Settings;

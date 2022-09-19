import { Page } from '../_app';
import { SEO } from '../../components/SEO';
import { SettingsPage } from '../../components/settings/SettingsPage';
import { useWeb3Context } from '../../components/wallet/Web3ContextProvider';
import styled from 'styled-components';
import { Center, Container, Loader } from '@mantine/core';
import { Button } from '../../components/shared/elements';
import { ProfileProvider } from '../../components/profile/ProfileContext';

const Wrapper = styled(Container)`
  width: 100vw;
`;

const Settings: Page = () => {
  const { address, connect, connectionStatus } = useWeb3Context();

  return (
    <Wrapper size={600} my={48}>
      <SEO
        title={`Settings | GitPOAP`}
        description={`GitPOAP - a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs.`}
        image={'https://gitpoap.io/og-image-512x512.png'}
        url={`https://gitpoap.io/settings`}
      />
      {connectionStatus === 'connected' ? (
        <ProfileProvider addressOrEns={address}>
          <SettingsPage />
        </ProfileProvider>
      ) : (
        <Center style={{ width: '100%', height: 600 }}>
          {connectionStatus === 'disconnected' && (
            <Button onClick={() => connect()}>{'Connect Wallet'}</Button>
          )}
          {connectionStatus === 'connecting' && <Loader />}
        </Center>
      )}
    </Wrapper>
  );
};

export default Settings;

import styled from 'styled-components';
import { Container } from '@mantine/core';
import { NextPageWithLayout } from '../_app';
import { SEO } from '../../components/shared/compounds/SEO';
import { SettingsPage } from '../../components/settings/SettingsPage';
import { ProfileProvider } from '../../components/profile/ProfileContext';
import { Login } from '../../components/Login';
import { useAuthContext } from '../../hooks/useAuthContext';

const Wrapper = styled(Container)`
  width: 100vw;
`;

const Settings: NextPageWithLayout = () => {
  const { user } = useAuthContext();
  const address = user?.address ?? null;

  return (
    <Wrapper size={600} my={48}>
      <SEO
        title={`Settings | GitPOAP`}
        description={`GitPOAP - a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs.`}
        image={'https://gitpoap.io/og-image-512x512.png'}
        url={`https://gitpoap.io/settings`}
      />
      {user ? (
        <ProfileProvider addressOrEns={address}>
          <SettingsPage />
        </ProfileProvider>
      ) : (
        <Login />
      )}
    </Wrapper>
  );
};

export default Settings;

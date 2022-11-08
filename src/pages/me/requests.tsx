import { Grid } from '@mantine/core';
import { Page } from '../_app';
import { SEO } from '../../components/shared/compounds/SEO';
import { UserGitPOAPRequestList } from '../../components/request/UserGitPOAPRequestList';
import { ProfileProvider } from '../../components/profile/ProfileContext';
import { rem } from 'polished';
import { Login } from '../../components/Login';
import { useUser } from '../../hooks/useUser';

const UserGitPOAPRequests: Page = () => {
  const user = useUser();
  const address = user?.address;

  return (
    <>
      <SEO
        title={`Requests | GitPOAP`}
        description={`GitPOAP - a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs.`}
        image={'https://gitpoap.io/og-image-512x512.png'}
        url={`https://gitpoap.io/settings`}
      />
      <Grid justify="center" mt={rem(20)} mb={rem(20)} style={{ flex: 1 }}>
        <Grid.Col xs={10} sm={10} md={10} lg={10} xl={10}>
          {address ? (
            <ProfileProvider addressOrEns={address}>
              <UserGitPOAPRequestList />
            </ProfileProvider>
          ) : (
            <Login />
          )}
        </Grid.Col>
      </Grid>
    </>
  );
};

export default UserGitPOAPRequests;

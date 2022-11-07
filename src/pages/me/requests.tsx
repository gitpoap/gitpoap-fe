import { Grid } from '@mantine/core';
import { Page } from '../_app';
import { SEO } from '../../components/shared/compounds/SEO';
import { UserGitPOAPRequestList } from '../../components/request/UserGitPOAPRequestList';
import { useWeb3Context } from '../../components/wallet/Web3Context';
import { ProfileProvider } from '../../components/profile/ProfileContext';
import { rem } from 'polished';
import { Login } from '../../components/Login';

const UserGitPOAPRequests: Page = () => {
  const { address, connectionStatus } = useWeb3Context();

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
          {address && connectionStatus === 'connected-to-wallet' ? (
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

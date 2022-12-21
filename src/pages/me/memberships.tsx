import { Grid } from '@mantine/core';
import { Page } from '../_app';
import { SEO } from '../../components/shared/compounds/SEO';
import { rem } from 'polished';
import { Login } from '../../components/Login';
import { useUser } from '../../hooks/useUser';
import { UserMembershipList } from '../../components/profile/UserMembershipList';

const UserMemberships: Page = () => {
  const user = useUser();
  const address = user?.address;

  return (
    <>
      <SEO
        title={`Team Memberships | GitPOAP`}
        description={`GitPOAP - a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs.`}
        image={'https://gitpoap.io/og-image-512x512.png'}
        url={`https://gitpoap.io/settings`}
      />
      <Grid justify="center" mt={rem(20)} mb={rem(20)} style={{ flex: 1 }}>
        <Grid.Col xs={10} sm={10} md={10} lg={10} xl={10}>
          {address ? <UserMembershipList /> : <Login />}
        </Grid.Col>
      </Grid>
    </>
  );
};

export default UserMemberships;

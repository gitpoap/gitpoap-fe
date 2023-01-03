import { Grid } from '@mantine/core';
import { rem } from 'polished';
import Head from 'next/head';
import { NextPageWithLayout } from '../_app';
import { Login } from '../../components/Login';
import { useUser } from '../../hooks/useUser';
import { UserMembershipList } from '../../components/profile/UserMembershipList';

const UserMemberships: NextPageWithLayout = () => {
  const user = useUser();
  const address = user?.address;

  return (
    <>
      <Head>
        <title>{'Memberships | GitPOAP'}</title>
        <meta name="Memberships" content="Memberships" />
      </Head>
      <Grid justify="center" mt={rem(20)} mb={rem(20)} style={{ flex: 1 }}>
        <Grid.Col xs={10} sm={10} md={10} lg={10} xl={10}>
          {address ? <UserMembershipList /> : <Login />}
        </Grid.Col>
      </Grid>
    </>
  );
};

export default UserMemberships;

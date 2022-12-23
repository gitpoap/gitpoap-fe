import { Grid } from '@mantine/core';
import { NextPageWithLayout } from '../_app';
import { rem } from 'polished';
import { Login } from '../../components/Login';
import { useUser } from '../../hooks/useUser';
import { UserMembershipList } from '../../components/profile/UserMembershipList';

const UserMemberships: NextPageWithLayout = () => {
  const user = useUser();
  const address = user?.address;

  return (
    <>
      <Grid justify="center" mt={rem(20)} mb={rem(20)} style={{ flex: 1 }}>
        <Grid.Col xs={10} sm={10} md={10} lg={10} xl={10}>
          {address ? <UserMembershipList /> : <Login />}
        </Grid.Col>
      </Grid>
    </>
  );
};

export default UserMemberships;

import { Grid } from '@mantine/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { rem } from 'polished';
import { ManageGitPOAP } from '../../../components/gitpoap/manage/ManageGitPOAP';
import { Login } from '../../../components/Login';
import { useUser } from '../../../hooks/useUser';
import Custom404 from '../../404';

const ManageGitPOAPPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const user = useUser();
  const address = user?.address;

  if (typeof id !== 'string') {
    return <></>;
  }

  const gitPOAPId = parseInt(id);

  if (gitPOAPId && isNaN(gitPOAPId)) {
    return <Custom404 />;
  }

  return (
    <>
      <Head>
        <title>{'Manage GitPOAP | GitPOAP'}</title>
        <meta
          name="Manage GitPOAP on GitPOAP - a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs."
          content="Manage GiPOAPs"
        />
      </Head>
      <Grid justify="center" mt={rem(20)} mb={rem(20)} style={{ zIndex: 1, flex: 1 }}>
        <Grid.Col xs={10} sm={10} md={10} lg={10} xl={10}>
          {address && user.permissions.isAdmin ? (
            <ManageGitPOAP gitPOAPId={gitPOAPId} />
          ) : (
            <Login />
          )}
        </Grid.Col>
      </Grid>
    </>
  );
};

export default ManageGitPOAPPage;

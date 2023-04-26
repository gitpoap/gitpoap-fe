import { Grid } from '@mantine/core';
import { NextPageWithLayout } from '../../_app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { rem } from 'polished';
import { ManageGitPOAPContainer } from '../../../components/gitpoap/manage/ManageGitPOAPContainer';
import { Login } from '../../../components/Login';
import { useAuthContext } from '../../../hooks/useAuthContext';
import Custom404 from '../../404';

const ManageGitPOAPPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuthContext();

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
          {user ? <ManageGitPOAPContainer gitPOAPId={gitPOAPId} user={user} /> : <Login />}
        </Grid.Col>
      </Grid>
    </>
  );
};

export default ManageGitPOAPPage;

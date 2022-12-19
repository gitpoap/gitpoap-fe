import { Grid } from '@mantine/core';
import { NextPageWithLayout } from '../_app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { EditContainer } from '../../components/create/EditContainer';
import { BackgroundHexes } from '../../components/gitpoap/BackgroundHexes';
import { Login } from '../../components/Login';
import { useUser } from '../../hooks/useUser';
import Custom404 from '../404';

const Create: NextPageWithLayout = () => {
  const router = useRouter();
  const user = useUser();
  const address = user?.address;

  const { id } = router.query;

  if (typeof id !== 'string') {
    return <></>;
  }

  const gitPOAPId = parseInt(id);

  if (isNaN(gitPOAPId)) {
    return <Custom404 />;
  }

  return (
    <>
      <Head>
        <title>{'Create | GitPOAP'}</title>
        <meta name="Create a GitPOAP" content="Create a GiPOAP" />
      </Head>
      <Grid justify="center" style={{ zIndex: 1 }}>
        {address ? (
          <>
            <BackgroundHexes />
            <EditContainer gitPOAPId={gitPOAPId} user={user} />
          </>
        ) : (
          <Login />
        )}
      </Grid>
    </>
  );
};

export default Create;

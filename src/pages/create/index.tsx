import { Grid } from '@mantine/core';
import { NextPageWithLayout } from '../_app';
import Head from 'next/head';
import { CreationForm } from '../../components/create/CreationForm';
import { BackgroundHexes } from '../../components/gitpoap/BackgroundHexes';
import { Login } from '../../components/Login';
import { PausedPage } from '../../components/create/PausedPage';
import { useAuthContext } from '../../hooks/useAuthContext';

const Create: NextPageWithLayout = () => {
  const { user } = useAuthContext();
  const canCreateCGs = user?.permissions.canCreateCGs;

  return (
    <>
      <Head>
        <title>{'Create | GitPOAP'}</title>
        <meta name="Create a GitPOAP" content="Create a GiPOAP" />
      </Head>
      <Grid justify="center" style={{ zIndex: 1 }}>
        {user ? (
          canCreateCGs ? (
            <>
              <BackgroundHexes />
              <CreationForm />
            </>
          ) : (
            <PausedPage />
          )
        ) : (
          <Login />
        )}
      </Grid>
    </>
  );
};

export default Create;

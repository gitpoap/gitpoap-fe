import { Grid } from '@mantine/core';
import { NextPageWithLayout } from '../_app';
import Head from 'next/head';
import { CreationForm } from '../../components/create/CreationForm';
import { BackgroundHexes } from '../../components/gitpoap/BackgroundHexes';
import { Login } from '../../components/Login';
import { useUser } from '../../hooks/useUser';
import { PausedPage } from '../../components/create/PausedPage';

const Create: NextPageWithLayout = () => {
  const user = useUser();
  const address = user?.address;
  const canCreateCGs = user?.permissions.canCreateCGs;

  return (
    <>
      <Head>
        <title>{'Create | GitPOAP'}</title>
        <meta name="Create a GitPOAP" content="Create a GiPOAP" />
      </Head>
      <Grid justify="center" style={{ zIndex: 1 }}>
        {address ? (
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

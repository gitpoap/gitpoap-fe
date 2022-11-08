import { Grid } from '@mantine/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import { CreationForm } from '../../components/create/CreationForm';
import { BackgroundHexes } from '../../components/gitpoap/BackgroundHexes';
import { Login } from '../../components/Login';
import { useUser } from '../../hooks/useUser';

const Create: NextPage = () => {
  const user = useUser();
  const address = user?.address;

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
            <CreationForm />
          </>
        ) : (
          <Login />
        )}
      </Grid>
    </>
  );
};

export default Create;

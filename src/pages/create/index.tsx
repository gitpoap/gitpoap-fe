import { Grid } from '@mantine/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import { CreationForm } from '../../components/create/CreationForm';
import { Background } from '../gp/[id]';

const Create: NextPage = () => {
  return (
    <>
      <Head>
        <title>{'Create | GitPOAP'}</title>
        <meta
          name="Create a custom GitPOAP - a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs."
          content="Create Custom GiPOAPs"
        />
      </Head>
      <Grid justify="center" style={{ zIndex: 1 }}>
        <Background />
        <CreationForm />
      </Grid>
    </>
  );
};

export default Create;

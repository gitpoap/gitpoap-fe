import { Grid } from '@mantine/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { CreationForm } from '../../components/create/CreationForm';
import { EditContainer } from '../../components/create/EditContainer';
import { BackgroundHexes } from '../../components/gitpoap/BackgroundHexes';
import { Login } from '../../components/Login';
import { useWeb3Context } from '../../components/wallet/Web3Context';
import Custom404 from '../404';

const Create: NextPage = () => {
  const router = useRouter();
  const { address } = useWeb3Context();

  const { id } = router.query;
  let gitPOAPId;

  if (id) {
    gitPOAPId = parseInt(Array.isArray(id) ? id[0] : id);
  }

  if (gitPOAPId && isNaN(gitPOAPId)) {
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
            {gitPOAPId ? <EditContainer gitPOAPId={gitPOAPId} /> : <CreationForm />}
          </>
        ) : (
          <Login />
        )}
      </Grid>
    </>
  );
};

export default Create;

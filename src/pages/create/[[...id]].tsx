import { Grid } from '@mantine/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { CreationForm } from '../../components/create/CreationForm';
import { EditContainer } from '../../components/create/EditContainer';
import { BackgroundHexes } from '../../components/gitpoap/BackgroundHexes';
import Custom404 from '../404';

const Create: NextPage = () => {
  const router = useRouter();
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
        <BackgroundHexes />
        {gitPOAPId ? <EditContainer gitPOAPId={gitPOAPId} /> : <CreationForm />}
      </Grid>
    </>
  );
};

export default Create;

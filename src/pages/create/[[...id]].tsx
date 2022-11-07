import { Grid } from '@mantine/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { CreationForm } from '../../components/create/CreationForm';
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
        <meta
          name="Create a custom GitPOAP - a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs."
          content="Create Custom GiPOAPs"
        />
      </Head>
      <Grid justify="center" style={{ zIndex: 1 }}>
        <BackgroundHexes />
        <CreationForm gitPOAPId={gitPOAPId} />
      </Grid>
    </>
  );
};

export default Create;

import { Grid } from '@mantine/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { rem } from 'polished';
import { EditGitPOAPForm } from '../../../components/gitpoap/edit/EditGitPOAPForm';
import Custom404 from '../../404';

const EditGitPOAP: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

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
        <title>{'Edit GitPOAP | GitPOAP'}</title>
        <meta
          name="Edit GitPOAP on GitPOAP - a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs."
          content="Edit GiPOAPs"
        />
      </Head>
      <Grid justify="center" mt={rem(20)} mb={rem(20)} style={{ zIndex: 1, flex: 1 }}>
        <Grid.Col xs={10} sm={10} md={10} lg={10} xl={10}>
          <EditGitPOAPForm gitPOAPId={gitPOAPId} />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default EditGitPOAP;

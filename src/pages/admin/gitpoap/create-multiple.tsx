import { rem } from 'polished';
import Head from 'next/head';
import { Grid } from '@mantine/core';
import { ConnectGitHub } from '../../../components/admin/ConnectGitHub';
import { CreateMultiple } from '../../../components/admin/CreateMultiple';
import { useIsStaff } from '../../../hooks/useIsStaff';
import { Page } from '../../_app';

const CreateMultipleForm: Page = () => {
  const isStaff = useIsStaff();

  return (
    <Grid justify="center" mt={rem(20)}>
      <Head>
        <title>{'Create Multiple GitPOAPs | GitPOAP'}</title>
        <meta name="description" content="GitPOAP Admin" />
      </Head>
      <Grid.Col xs={10} sm={10} md={10} lg={10} xl={10}>
        {isStaff ? <CreateMultiple /> : <ConnectGitHub />}
      </Grid.Col>
    </Grid>
  );
};

export default CreateMultipleForm;

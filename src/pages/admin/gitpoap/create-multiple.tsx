import { useState } from 'react';
import { rem } from 'polished';
import type { NextPage } from 'next';
import Head from 'next/head';
import { HiPlus } from 'react-icons/hi';
import { Grid, Group } from '@mantine/core';
import { Button, Header } from '../../../components/shared/elements';
import { Divider } from '../../../components/shared/elements';
import { useAuthContext } from '../../../components/github/AuthContext';
import { CreateRow } from '../../../components/admin/CreateRow';
import { ConnectGitHub } from '../../../components/admin/ConnectGitHub';

const CreateMultiple: NextPage = () => {
  const { isLoggedIntoGitHub } = useAuthContext();
  const [rowCount, setRowCount] = useState<number>(1);

  return (
    <div>
      <Head>
        <title>{'Create Multiple GitPOAPs | GitPOAP'}</title>
        <meta name="description" content="GitPOAP Frontend App" />
      </Head>
      <Grid justify="center" style={{ marginTop: rem(20) }}>
        <Grid.Col xs={10} sm={10} md={10} lg={10} xl={10}>
          {isLoggedIntoGitHub ? (
            <Group direction="row" position="center">
              <Group direction="column">
                <Group position="apart" style={{ width: '100%' }}>
                  <Header style={{ alignSelf: 'start' }}>{'Admin - Create New  GitPOAPs'}</Header>
                  <Button
                    leftIcon={<HiPlus size={18} />}
                    onClick={() => setRowCount(rowCount + 1)}
                    style={{}}
                  >
                    {`Add Row (${rowCount})`}
                  </Button>
                </Group>

                <Divider style={{ width: '100%', marginTop: rem(10), marginBottom: rem(10) }} />

                {[...Array(rowCount)].map((_, index) => {
                  return <CreateRow key={index} rowNumber={index + 1} />;
                })}
              </Group>
              <Button
                leftIcon={<HiPlus size={18} />}
                onClick={() => setRowCount(rowCount + 1)}
                style={{ marginTop: rem(20), marginBottom: rem(35) }}
              >
                {`Add Row (${rowCount})`}
              </Button>
            </Group>
          ) : (
            <ConnectGitHub />
          )}
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default CreateMultiple;

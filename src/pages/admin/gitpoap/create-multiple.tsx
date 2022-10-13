import { useState, useCallback } from 'react';
import { rem } from 'polished';
import type { NextPage } from 'next';
import Head from 'next/head';
import { HiPlus } from 'react-icons/hi';
import { Grid, Group, Stack } from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';
import { Button, Header } from '../../../components/shared/elements';
import { Divider } from '../../../components/shared/elements';
import { CreateRow } from '../../../components/admin/CreateRow';
import { ConnectGitHub } from '../../../components/admin/ConnectGitHub';
import { useIsAdmin } from '../../../hooks/useIsAdmin';

type Row = { id: string };

const CreateMultiple: NextPage = () => {
  const isAdmin = useIsAdmin();
  const [rows, setRows] = useState<Row[]>([{ id: uuidv4() }]);

  const deleteRow = useCallback(
    (id: string) => setRows(rows.filter((row) => row.id !== id)),
    [rows],
  );

  return (
    <div>
      <Head>
        <title>{'Create Multiple GitPOAPs | GitPOAP'}</title>
        <meta name="description" content="GitPOAP Admin" />
      </Head>
      <Grid justify="center" style={{ marginTop: rem(20) }}>
        <Grid.Col xs={10} sm={10} md={10} lg={10} xl={10}>
          {isAdmin ? (
            <Group position="center">
              <Stack style={{ width: '100%' }}>
                <Group position="apart" style={{ width: '100%' }}>
                  <Header style={{ alignSelf: 'start' }}>{'Admin - Create New  GitPOAPs'}</Header>
                  <Button
                    leftIcon={<HiPlus size={18} />}
                    onClick={() => setRows([...rows, { id: uuidv4() }])}
                    style={{}}
                  >
                    {`Add Row (${rows.length})`}
                  </Button>
                </Group>
                <Divider style={{ width: '100%', marginTop: rem(10), marginBottom: rem(10) }} />
                {rows.map((row, index) => {
                  return (
                    <CreateRow
                      key={row.id}
                      rowNumber={index + 1}
                      onDelete={deleteRow}
                      rowId={row.id}
                    />
                  );
                })}
              </Stack>
              <Button
                leftIcon={<HiPlus size={18} />}
                onClick={() => setRows([...rows, { id: uuidv4() }])}
                style={{ marginTop: rem(20), marginBottom: rem(35) }}
              >
                {`Add Row (${rows.length})`}
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

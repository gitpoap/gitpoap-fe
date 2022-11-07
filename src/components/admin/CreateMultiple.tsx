import React, { useCallback, useState } from 'react';
import { rem } from 'polished';
import { HiPlus } from 'react-icons/hi';
import { Group, Stack } from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';
import { Button, Header } from '../shared/elements';
import { Divider } from '../shared/elements';
import { CreateRow } from './CreateRow';

type Row = { id: string };

export const CreateMultiple = () => {
  const [rows, setRows] = useState<Row[]>([{ id: uuidv4() }]);

  const deleteRow = useCallback(
    (id: string) => setRows(rows.filter((row) => row.id !== id)),
    [rows],
  );

  return (
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
        {rows.map((row, index) => (
          <CreateRow key={row.id} rowNumber={index + 1} onDelete={deleteRow} rowId={row.id} />
        ))}
      </Stack>
      <Button
        leftIcon={<HiPlus size={18} />}
        onClick={() => setRows([...rows, { id: uuidv4() }])}
        style={{ marginTop: rem(20), marginBottom: rem(35) }}
      >
        {`Add Row (${rows.length})`}
      </Button>
    </Group>
  );
};

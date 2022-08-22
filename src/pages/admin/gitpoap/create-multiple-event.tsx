import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import type { NextPage } from 'next';
import Head from 'next/head';
import { z } from 'zod';
import { HiPlus } from 'react-icons/hi';
import { Grid, Group } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { v4 as uuidv4 } from 'uuid';
import { DateTime } from 'luxon';
import { Input, Button, NumberInput, Header, Checkbox } from '../../../components/shared/elements';
import { Divider } from '../../../components/shared/elements';
import { useAuthContext } from '../../../components/github/AuthContext';
import { DateInput } from '../../../components/shared/elements/DateInput';
import { EventCreateRow } from '../../../components/admin/EventCreateRow';
import { ConnectGitHub } from '../../../components/admin/ConnectGitHub';
import { THIS_YEAR } from '../../../constants';

const FormInput = styled(Input)`
  width: ${rem(375)};
  margin-bottom: ${rem(20)};
`;

const FormNumberInput = styled(NumberInput)`
  width: ${rem(150)};
  margin-bottom: ${rem(20)};
`;

const FormDatePicker = styled(DateInput)`
  width: ${rem(200)};
  margin-bottom: ${rem(20)};
`;

const schema = z.object({
  eventName: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  expiryDate: z.date(),
  codeCount: z.number(),
  hasYear: z.boolean(),
  city: z.string().optional(),
  country: z.string().optional(),
  isEnabled: z.boolean(),
});

const DEFAULT_START_DATE = DateTime.local().toJSDate();
const DEFAULT_END_DATE = DateTime.local().toJSDate();
const DEFAULT_EXPIRY_DATE = DateTime.local(THIS_YEAR + 1, 4, 1).toJSDate();

type Row = { id: string };

const CreateMultipleEvent: NextPage = () => {
  const { isLoggedIntoGitHub, tokens } = useAuthContext();
  const [rows, setRows] = useState<Row[]>([{ id: uuidv4() }]);
  const { values, setFieldValue, getInputProps } = useForm<z.infer<typeof schema>>({
    schema: zodResolver(schema),
    initialValues: {
      eventName: '',
      startDate: DEFAULT_START_DATE,
      endDate: DEFAULT_END_DATE,
      expiryDate: DEFAULT_EXPIRY_DATE,
      codeCount: 10,
      hasYear: true,
      city: undefined,
      country: undefined,
      isEnabled: true,
    },
  });

  const deleteRow = useCallback(
    (id: string) => setRows(rows.filter((row) => row.id !== id)),
    [rows],
  );

  /* Hook to update the expiry date if the start date changes */
  useEffect(() => {
    const startDateYear = values.startDate.getFullYear();
    const expiryDateYear = values.expiryDate.getFullYear();
    if (startDateYear + 1 !== expiryDateYear) {
      const newExpiryDate = DateTime.fromJSDate(values.expiryDate)
        .set({ year: startDateYear + 1 })
        .toJSDate();
      setFieldValue('expiryDate', newExpiryDate);
    }
    /* do not include setFieldValue below */
  }, [values.startDate, values.expiryDate]);

  return (
    <div>
      <Head>
        <title>{'Create GitPOAPs for Events | GitPOAP'}</title>
        <meta name="description" content="GitPOAP Admin" />
      </Head>
      <Grid justify="center" style={{ marginTop: rem(20) }}>
        <Grid.Col xs={10} sm={10} md={10} lg={10} xl={10}>
          {isLoggedIntoGitHub && tokens ? (
            <Group direction="row" position="center">
              <Group direction="column">
                <Header style={{ alignSelf: 'start' }}>
                  {'Admin - Create New Event GitPOAPs'}
                </Header>

                <Group position="apart" style={{ width: '100%' }}>
                  <Header style={{ alignSelf: 'start', fontSize: rem(24) }}>
                    {'Enter values below to automatically generate values in the form'}
                  </Header>
                  <Button
                    leftIcon={<HiPlus size={18} />}
                    onClick={() => setRows([...rows, { id: uuidv4() }])}
                  >
                    {`Add Row (${rows.length})`}
                  </Button>
                </Group>

                <Group style={{ gap: '0 16px' }}>
                  <Group>
                    <FormInput
                      required
                      label={'Event Name'}
                      name={'eventName'}
                      {...getInputProps('eventName')}
                    />
                    <FormNumberInput
                      required
                      label={'Requested Codes'}
                      name={'codeCount'}
                      placeholder={'10'}
                      hideControls
                      {...getInputProps('codeCount')}
                    />
                    <Checkbox
                      mt="md"
                      label="Enabled?"
                      defaultChecked
                      {...getInputProps('isEnabled', { type: 'checkbox' })}
                    />
                  </Group>
                  <Group>
                    <FormDatePicker
                      required
                      clearable={false}
                      label={'Event Start Date'}
                      name={'startDate'}
                      {...getInputProps('startDate')}
                    />
                    <FormDatePicker
                      required
                      clearable={false}
                      label={'Event End Date'}
                      name={'endDate'}
                      {...getInputProps('endDate')}
                    />
                    <FormDatePicker
                      required
                      clearable={false}
                      label={'POAP Expiration Date'}
                      name={'expiryDate'}
                      {...getInputProps('expiryDate')}
                    />
                    <Checkbox
                      mt="md"
                      label="Include year?"
                      defaultChecked
                      {...getInputProps<'hasYear', 'checkbox'>('hasYear')}
                    />
                  </Group>
                  <Group>
                    <FormInput
                      style={{ width: rem(200) }}
                      label={'City'}
                      placeholder="(optional)"
                      name={'city'}
                      {...getInputProps('city')}
                    />
                    <FormInput
                      style={{ width: rem(200) }}
                      label={'Country'}
                      placeholder="(optional)"
                      name={'country'}
                      {...getInputProps('country')}
                    />
                  </Group>
                </Group>
                <Divider style={{ width: '100%', marginTop: rem(10), marginBottom: rem(10) }} />

                {rows.map((row, index) => {
                  return (
                    <EventCreateRow
                      key={row.id}
                      rowId={row.id}
                      onDelete={deleteRow}
                      token={tokens.accessToken}
                      rowNumber={index + 1}
                      eventName={values.eventName}
                      eventStartDate={values.startDate}
                      eventEndDate={values.endDate}
                      expiry={values.expiryDate}
                      codeCount={values.codeCount}
                      hasYear={values.hasYear}
                      city={values.city}
                      country={values.country}
                      isEnabled={values.isEnabled}
                    />
                  );
                })}
              </Group>
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

export default CreateMultipleEvent;

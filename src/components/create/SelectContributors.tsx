import {
  CloseButton,
  Container,
  Divider,
  Grid,
  Group,
  List,
  ScrollArea,
  Stack,
} from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { rem } from 'polished';
import { useState } from 'react';
import { MdOutlineFileUpload } from 'react-icons/md';
import styled from 'styled-components';
import {
  BackgroundPanel,
  BackgroundPanel2,
  BackgroundPanel3,
  DarkGray,
  ExtraRed,
} from '../../colors';
import { Button, Input, Text, TextArea } from '../shared/elements';
import { FormReturnTypes } from './types';
import Papa from 'papaparse';

const Contributor = styled(Group)`
  button {
    opacity: 0;
  }
  &:hover > button {
    opacity: 1;
  }
`;

const StyledTextArea = styled(TextArea)`
  .mantine-Textarea-input {
    border: ${rem(1)} solid ${DarkGray} !important;
  }
`;

type Props = {
  contributors: string[];
  errors: FormReturnTypes['errors'];
  setFieldValue: FormReturnTypes['setFieldValue'];
};

export const SelectContributors = ({ contributors, errors, setFieldValue }: Props) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [contributorsTA, setContributorsTA] = useState('');
  const filteredContributors = contributors.filter((contributor) =>
    searchValue ? contributor.toLowerCase().includes(searchValue.toLowerCase()) : true,
  );

  return (
    <Grid sx={{ backgroundColor: BackgroundPanel, borderRadius: 12 }}>
      <Grid.Col p={16} span={6}>
        <Stack>
          <StyledTextArea
            label="Enter GitHub Handles, E-Mails, Eth or ENS Addresses (Separated by Commas)"
            placeholder="colfax23, mail@gmail.com, dude.eth, 0x1234567890b"
            value={contributorsTA}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setContributorsTA(e.target.value);
            }}
            id="contributorsInput"
          />
          <Button
            disabled={contributorsTA.length === 0}
            onClick={() => {
              setFieldValue('contributors', [
                ...new Set([
                  ...contributors,
                  ...contributorsTA
                    .split(',')
                    .map((element) => element.trim())
                    .filter((element) => element.length),
                ]),
              ]);
              setContributorsTA('');
            }}
          >
            {'Add'}
          </Button>
          <Divider />
          <Text>{'Upload CSV'}</Text>
          <Dropzone
            accept={['text/csv']}
            onDrop={(files) => {
              Papa.parse(files[0], {
                complete: (results) => {
                  const data = results.data[0] as string[];
                  setFieldValue('contributors', [...new Set([...contributors, ...data])]);
                },
              });
            }}
            styles={() => ({
              root: {
                backgroundColor: BackgroundPanel,
                border: `${rem(2)} dashed ${BackgroundPanel3}`,
                height: 160,
                '&:hover': {
                  backgroundColor: BackgroundPanel2,
                },
              },
              inner: {
                alignItems: 'center',
                display: 'flex',
                height: '100%',
                justifyContent: 'center',
              },
            })}
          >
            <Stack align="center">
              <MdOutlineFileUpload size={48} />
              <Text>{'Upload CSV'}</Text>
            </Stack>
          </Dropzone>
        </Stack>
      </Grid.Col>
      <Grid.Col p={16} span={6} sx={{ backgroundColor: BackgroundPanel2, borderRadius: 12 }}>
        <Container
          p="0"
          sx={{
            border: `${rem(1)} solid ${BackgroundPanel2}`,
          }}
        >
          <Text mb="xs">{`${contributors.length} Selected`}</Text>
          <ScrollArea
            pl={rem(16)}
            sx={{
              height: rem(320),
              maxHeight: '80vh',
              borderTop: `${rem(1)} solid ${BackgroundPanel3}`,
              borderBottom: `${rem(1)} solid ${BackgroundPanel3}`,
            }}
          >
            <List listStyleType="none" pb={rem(10)}>
              {filteredContributors.map((contributor) => {
                return (
                  <List.Item key={contributor + 'list-item'}>
                    <Contributor key={contributor} mt="xs" position="apart">
                      <Text>{contributor}</Text>
                      <CloseButton
                        size="sm"
                        color="red"
                        onClick={() => {
                          setFieldValue('contributors', [
                            ...contributors.filter((c) => c !== contributor),
                          ]);
                        }}
                      />
                    </Contributor>
                  </List.Item>
                );
              })}
            </List>
          </ScrollArea>
          <Input
            placeholder={'QUICK SEARCH...'}
            value={searchValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchValue(e.target.value);
            }}
            sx={{ width: '100%' }}
            mt={20}
          />
        </Container>

        {errors.repos && (
          <Text sx={{ color: ExtraRed }} size="xl" mt="xl" inline>
            {errors.repos}
          </Text>
        )}
      </Grid.Col>
    </Grid>
  );
};

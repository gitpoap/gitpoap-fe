import {
  ActionIcon,
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
import Papa from 'papaparse';
import { CreationFormReturnTypes } from './useCreationForm';
import { GitPOAPRequestCreateValues } from '../../lib/api/gitpoapRequest';
import { isValidEmailAddress, isValidGithubHandle } from '../../helpers';
import { isAddress } from 'ethers/lib/utils';
import { VscTrash } from 'react-icons/vsc';

const StyledTextArea = styled(TextArea)`
  .mantine-Textarea-input {
    border: ${rem(1)} solid ${DarkGray} !important;
  }
`;

type Props = {
  contributors: GitPOAPRequestCreateValues['contributors'];
  errors: CreationFormReturnTypes['errors'];
  setFieldValue: CreationFormReturnTypes['setFieldValue'];
};

type ConnectionType = keyof GitPOAPRequestCreateValues['contributors'];
type Contributor = {
  type: ConnectionType;
  value: string;
};

const formatContributors = (
  newContributors: string[],
  oldContributors: GitPOAPRequestCreateValues['contributors'],
): GitPOAPRequestCreateValues['contributors'] => {
  return newContributors.reduce((obj: GitPOAPRequestCreateValues['contributors'], c) => {
    if (isValidGithubHandle(c)) {
      obj['githubHandles'] = obj['githubHandles'] || [];
      obj['githubHandles'].push(c);
    } else if (isAddress(c)) {
      obj['ethAddresses'] = obj['ethAddresses'] || [];
      obj['ethAddresses'].push(c);
    } else if (c.length > 4 && c.endsWith('.eth')) {
      obj['ensNames'] = obj['ensNames'] || [];
      obj['ensNames'].push(c);
    } else if (isValidEmailAddress(c)) {
      obj['emails'] = obj['emails'] || [];
      obj['emails'].push(c);
    }
    return obj;
  }, oldContributors ?? {});
};

export const SelectContributors = ({ contributors, errors, setFieldValue }: Props) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [contributorsTA, setContributorsTA] = useState('');

  const flattenedContributors: Contributor[] = Object.entries(contributors)
    .map(([key, value]) => value.map((v) => ({ type: key as ConnectionType, value: v })))
    .flat();
  const filteredContributors = flattenedContributors.filter((contributor) =>
    searchValue ? contributor.value.toLowerCase().includes(searchValue.toLowerCase()) : true,
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
              setFieldValue(
                'contributors',
                formatContributors(
                  contributorsTA
                    .split(',')
                    .map((element) => element.trim())
                    .filter((element) => element.length),
                  contributors,
                ),
              );
              // setFieldValue('contributors', [
              //   ...new Set([
              //     ...contributors,
              //     ...contributorsTA
              //       .split(',')
              //       .map((element) => element.trim())
              //       .filter((element) => element.length),
              //   ]),
              // ]);
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
                  setFieldValue(
                    'contributors',
                    formatContributors(
                      data.map((element) => element.trim()).filter((element) => element.length),
                      contributors,
                    ),
                    // [...new Set([...contributors, ...data])]
                  );
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
          <Text mb="xs">{`${flattenedContributors.length} Selected`}</Text>
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
              {filteredContributors.map(({ type, value }: Contributor) => {
                return (
                  <List.Item key={value + 'list-item'}>
                    <Group key={value} mt="xs" position="apart">
                      <Stack spacing={0}>
                        <Text>{value}</Text>
                        <Text size="xs" color="grey">
                          {
                            {
                              githubHandles: 'github',
                              ethAddresses: 'eth',
                              ensNames: 'ens',
                              emails: 'e-mail',
                            }[type]
                          }
                        </Text>
                      </Stack>
                      <ActionIcon
                        onClick={() => {
                          const newContributors = flattenedContributors
                            .filter((c) => c.value !== value)
                            .reduce(
                              (group: GitPOAPRequestCreateValues['contributors'], contributor) => {
                                const { type, value }: Contributor = contributor;
                                group[type] = group[type] || [];
                                group[type]?.push(value);
                                return group;
                              },
                              {},
                            );
                          setFieldValue('contributors', newContributors);
                        }}
                      >
                        {<VscTrash />}
                      </ActionIcon>
                    </Group>
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

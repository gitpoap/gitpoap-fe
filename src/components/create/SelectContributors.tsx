import {
  ActionIcon,
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
import { isValidEmailAddress, isValidGithubHandle, truncateAddress } from '../../helpers';
import { isAddress } from 'ethers/lib/utils';
import { VscTrash } from 'react-icons/vsc';

const StyledTextArea = styled(TextArea)`
  .mantine-Textarea-input {
    border: ${rem(1)} solid ${DarkGray} !important;
  }
`;

type ConnectionType = keyof GitPOAPRequestCreateValues['contributors'];
export type Contributor = {
  type: ConnectionType;
  value: string;
};

type Props = {
  contributors: Contributor[];
  setContributors: (contributors: Contributor[]) => void;
  errors: CreationFormReturnTypes['errors'];
};

const formatContributors = (
  newContributors: string[],
  oldContributors: Contributor[],
): Contributor[] => {
  return newContributors.reduce((obj, c) => {
    // We can assume values are unique because of the filter later in this function
    if (obj.some((contributor) => contributor.value === c)) {
      return obj;
    }

    if (isValidGithubHandle(c)) {
      obj.push({ type: 'githubHandles', value: c });
    } else if (isAddress(c)) {
      obj.push({ type: 'ethAddresses', value: c });
    } else if (c.length > 4 && c.endsWith('.eth')) {
      obj.push({ type: 'ensNames', value: c });
    } else if (isValidEmailAddress(c)) {
      obj.push({ type: 'emails', value: c });
    }

    return obj;
  }, oldContributors ?? []);
};

export const SelectContributors = ({ contributors, errors, setContributors }: Props) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [contributorsTA, setContributorsTA] = useState('');

  const filteredContributors = contributors.filter((contributor) =>
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
              setContributors(
                formatContributors(
                  contributorsTA
                    .split(',')
                    .map((element) => element.trim())
                    .filter((element) => element.length),
                  contributors,
                ),
              );
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
                  setContributors(
                    formatContributors(
                      data.map((element) => element.trim()).filter((element) => element.length),
                      contributors,
                    ),
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
              {filteredContributors.map(({ type, value }: Contributor) => {
                return (
                  <List.Item key={value + '-' + type}>
                    <Group mt="xs" position="apart">
                      <Stack spacing={0}>
                        <Text>
                          {type === 'ethAddresses' ? truncateAddress(value, 4, 4) : value}
                        </Text>
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
                          setContributors(contributors.filter((c) => c.value !== value));
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

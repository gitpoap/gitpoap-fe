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
import { validate } from 'email-validator';
import { rem } from 'polished';
import { useState } from 'react';
import { MdOutlineFileUpload } from 'react-icons/md';
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
import { isValidGithubHandle, truncateAddress } from '../../helpers';
import { isAddress } from 'ethers/lib/utils';
import { VscTrash } from 'react-icons/vsc';

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

export const SelectContributors = ({ contributors, errors, setContributors }: Props) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [contributorsText, setContributorsText] = useState('');

  const filteredContributors = contributors.filter((contributor) =>
    searchValue ? contributor.value.toLowerCase().includes(searchValue.toLowerCase()) : true,
  );

  const addContributors = (newContributors: string[]) => {
    setContributors(
      newContributors
        .map((contributor) => contributor.trim())
        .filter((contributor) => contributor.length)
        .reduce((newList, value) => {
          // This prevents duplicates
          if (newList.some((contributor) => contributor.value === value)) {
            return newList;
          }

          if (isValidGithubHandle(value)) {
            newList.push({ type: 'githubHandles', value });
          } else if (isAddress(value)) {
            newList.push({ type: 'ethAddresses', value });
          } else if (value.length > 4 && value.endsWith('.eth')) {
            newList.push({ type: 'ensNames', value });
          } else if (validate(value)) {
            newList.push({ type: 'emails', value });
          }

          return newList;
        }, contributors ?? []),
    );
  };

  const handleSubmitTextArea = () => {
    Papa.parse(contributorsText, {
      complete: (results) => {
        addContributors(results.data[0] as string[]);
        setContributorsText('');
      },
    });
  };

  const handleSubmitDropzone = (files: File[]) => {
    Papa.parse(files[0], {
      complete: (results) => {
        addContributors(results.data[0] as string[]);
      },
    });
  };

  return (
    <Grid sx={{ backgroundColor: BackgroundPanel, borderRadius: 12 }}>
      <Grid.Col p={16} span={6}>
        <Stack>
          <TextArea
            label="Enter GitHub handles, emails, ETH addresses, or ENS names separated by commas"
            placeholder="colfax23, mail@gmail.com, dude.eth, 0x1234567890b"
            value={contributorsText}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setContributorsText(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key == 'Enter' && e.shiftKey == false) {
                e.preventDefault();
                handleSubmitTextArea();
              }
            }}
            id="contributorsText"
            styles={{
              input: {
                border: `${rem(1)} solid ${DarkGray} !important`,
              },
            }}
          />
          <Button disabled={contributorsText.length === 0} onClick={handleSubmitTextArea}>
            {'Add'}
          </Button>
          <Divider />
          <Text>{'Upload CSV'}</Text>
          <Dropzone
            accept={['text/csv']}
            onDrop={handleSubmitDropzone}
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

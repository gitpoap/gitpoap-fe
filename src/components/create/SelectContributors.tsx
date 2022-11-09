import {
  ActionIcon,
  Badge,
  Container,
  Divider,
  Grid,
  Group,
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
import { GitPOAPRequestCreateValues } from '../../lib/api/gitpoapRequest';
import { isValidGithubHandle, truncateAddress } from '../../helpers';
import { isAddress } from 'ethers/lib/utils';
import { VscTrash } from 'react-icons/vsc';

type ConnectionType = keyof GitPOAPRequestCreateValues['contributors'];
export type Contributor = {
  type: ConnectionType;
  value: string;
};

const BadgeText = {
  githubHandles: 'github',
  ethAddresses: 'eth',
  ensNames: 'ens',
  emails: 'e-mail',
};

type Props = {
  contributors: Contributor[];
  setContributors: (contributors: Contributor[]) => void;
};

export const SelectContributors = ({ contributors, setContributors }: Props) => {
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
    <Grid my={32} sx={{ backgroundColor: BackgroundPanel, borderRadius: 12 }}>
      <Grid.Col p={16} sm={6} span={12}>
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
      <Grid.Col
        p={16}
        sm={6}
        span={12}
        sx={{ backgroundColor: BackgroundPanel2, borderRadius: 12 }}
      >
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
            <Stack pb={rem(10)}>
              {filteredContributors.map(({ type, value }: Contributor) => {
                return (
                  <Group key={value + '-' + type} mt="xs" position="apart">
                    <Group position="left">
                      <Text>{type === 'ethAddresses' ? truncateAddress(value, 4, 4) : value}</Text>

                      <Badge size="sm" variant="filled" style={{ letterSpacing: rem(1) }}>
                        {BadgeText[type]}
                      </Badge>
                    </Group>
                    <ActionIcon
                      onClick={() => {
                        setContributors(contributors.filter((c) => c.value !== value));
                      }}
                      sx={{ '&:hover': { background: 'none', color: ExtraRed } }}
                    >
                      <VscTrash />
                    </ActionIcon>
                  </Group>
                );
              })}
            </Stack>
          </ScrollArea>
          <Input
            placeholder={'QUICK SEARCH...'}
            value={searchValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchValue(e.target.value);
            }}
            sx={{ width: '100%' }}
            styles={{
              input: {
                border: `${rem(1)} solid ${DarkGray} !important`,
              },
            }}
            mt={20}
          />
        </Container>
      </Grid.Col>
    </Grid>
  );
};

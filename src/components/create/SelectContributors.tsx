import {
  ActionIcon,
  Badge,
  Container,
  Divider,
  Input as InputUI,
  Grid,
  Group,
  ScrollArea,
  Stack,
  Popover,
} from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { useDisclosure } from '@mantine/hooks';
import { validate } from 'email-validator';
import { rem } from 'polished';
import { useState } from 'react';
import { MdHelpOutline, MdOutlineFileUpload } from 'react-icons/md';
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
import { isValidGithubHandleWithout0x, shortenAddress } from '../../helpers';
import { isAddress } from 'ethers/lib/utils';
import { VscTrash } from 'react-icons/vsc';

// There may be a better way to do this, but this will work for now
type ConnectionType = keyof GitPOAPRequestCreateValues['contributors'] | 'invalid';
export type Contributor = {
  type: ConnectionType;
  value: string;
};

const BadgeText = {
  githubHandles: 'github',
  ethAddresses: 'eth',
  ensNames: 'ens',
  emails: 'e-mail',
  invalid: 'invalid',
};

type Props = {
  contributors: Contributor[];
  setContributors: (contributors: Contributor[]) => void;
};

export const SelectContributors = ({ contributors, setContributors }: Props) => {
  const [opened, { close, open }] = useDisclosure(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [contributorsText, setContributorsText] = useState('');

  const filteredContributors = contributors.filter((contributor) =>
    searchValue ? contributor.value.toLowerCase().includes(searchValue.toLowerCase()) : true,
  );
  const invalidContributors = contributors.filter((contributor) => contributor.type === 'invalid');

  const addContributors = (newContributors: string[]) => {
    const contributorsToSet = newContributors
      .map((contributor) => contributor.trim())
      .filter((contributor) => contributor.length)
      .reduce((newList, value) => {
        // This prevents duplicates
        if (newList.some((contributor) => contributor.value === value)) {
          return newList;
        }

        if (isValidGithubHandleWithout0x(value)) {
          newList.push({ type: 'githubHandles', value });
        } else if (isAddress(value)) {
          newList.push({ type: 'ethAddresses', value });
        } else if (value.length > 4 && value.endsWith('.eth')) {
          newList.push({ type: 'ensNames', value });
        } else if (validate(value)) {
          newList.push({ type: 'emails', value });
        } else {
          newList.push({ type: 'invalid', value });
        }

        return newList;
      }, contributors ?? []);
    setContributors([...contributorsToSet]);
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
        addContributors(results.data.flat() as string[]);
      },
    });
  };

  return (
    <Grid sx={{ backgroundColor: BackgroundPanel, borderRadius: 12 }}>
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
          <Divider label={<Text>OR</Text>} labelPosition="center" />
          <Group>
            <Popover width={300} position="right" withArrow opened={opened}>
              <Popover.Target>
                <Text>
                  {'Upload CSV '}
                  <MdHelpOutline onMouseEnter={open} onMouseLeave={close} />
                </Text>
              </Popover.Target>
              <Popover.Dropdown sx={{ pointerEvents: 'none' }}>
                <Text>
                  {
                    'A single column of identifiers (GitHub handles, emails, ETH addresses, or ENS names) without a header'
                  }
                </Text>
              </Popover.Dropdown>
            </Popover>
          </Group>
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
          <Group position="apart">
            <Text mb="xs">{`${contributors.length} Selected`}</Text>
            {invalidContributors.length && (
              <Text color="red" mb="xs">{`${invalidContributors.length} Invalid`}</Text>
            )}
          </Group>
          <ScrollArea
            pl={rem(16)}
            sx={{
              height: rem(335),
              maxHeight: '80vh',
              borderTop: `${rem(1)} solid ${BackgroundPanel3}`,
              borderBottom: `${rem(1)} solid ${BackgroundPanel3}`,
            }}
          >
            <Stack py="xs">
              {filteredContributors.map(({ type, value }: Contributor) => {
                return (
                  <Group key={value + '-' + type} position="apart">
                    <Group position="left">
                      <Text>{type === 'ethAddresses' ? shortenAddress(value, 4) : value}</Text>

                      <Badge
                        color={type === 'invalid' ? 'red' : undefined}
                        size="sm"
                        variant="filled"
                        style={{ letterSpacing: rem(1) }}
                      >
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
            placeholder={'Search Entries'}
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
          <>
            {invalidContributors.length ? (
              <InputUI.Error mt="lg">Remove invalid contributors</InputUI.Error>
            ) : (
              <></>
            )}
          </>
        </Container>
      </Grid.Col>
    </Grid>
  );
};

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
import { isValidGithubHandleWithout0x, shortenAddress } from '../../helpers';
import { isAddress } from 'ethers/lib/utils';
import { VscTrash } from 'react-icons/vsc';
import { UnvalidatedContributor } from '../../lib/api/gitpoapRequest';

const BadgeText = {
  githubHandles: 'github',
  ethAddresses: 'eth',
  ensNames: 'ens',
  emails: 'e-mail',
  invalid: 'invalid',
};

type Props = {
  contributors: UnvalidatedContributor[];
  addContributor: (item: UnvalidatedContributor) => void;
  removeContributor: (index: number) => void;
};

export const SelectContributors = ({ contributors, addContributor, removeContributor }: Props) => {
  const [opened, { close, open }] = useDisclosure(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [contributorsText, setContributorsText] = useState('');

  const invalidContributorsCount = contributors.filter(
    (contributor) => contributor.type === 'invalid',
  ).length;

  const addContributors = (newContributors: string[]) => {
    const formattedContributors = [
      ...new Set(newContributors.map((value) => value.trim()).filter((value) => value.length)),
    ];

    formattedContributors.forEach((value) => {
      if (contributors.some((contributor) => contributor.value === value)) {
        return;
      }

      if (isValidGithubHandleWithout0x(value)) {
        addContributor({ type: 'githubHandles', value });
      } else if (isAddress(value)) {
        addContributor({ type: 'ethAddresses', value });
      } else if (value.length > 4 && value.endsWith('.eth')) {
        addContributor({ type: 'ensNames', value });
      } else if (validate(value)) {
        addContributor({ type: 'emails', value });
      } else {
        addContributor({ type: 'invalid', value });
      }
    });
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
            {invalidContributorsCount && (
              <Text color="red" mb="xs">{`${invalidContributorsCount} Invalid`}</Text>
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
              {contributors
                // include original index, necessary for removeContributor
                .map((contributor, index) => ({ contributor, index }))
                // filter by search
                .filter(({ contributor }) =>
                  searchValue
                    ? contributor.value.toLowerCase().includes(searchValue.toLowerCase())
                    : true,
                )
                .map(({ contributor, index }) => (
                  <Group noWrap key={'contributor-' + index} position="apart">
                    <Group noWrap position="left" sx={{ maxWidth: '100%' }}>
                      <Text>
                        {contributor.type === 'ethAddresses'
                          ? shortenAddress(contributor.value, 4)
                          : contributor.value}
                      </Text>
                      <Badge
                        color={contributor.type === 'invalid' ? 'red' : undefined}
                        size="sm"
                        variant="filled"
                        style={{ letterSpacing: rem(1) }}
                      >
                        {BadgeText[contributor.type]}
                      </Badge>
                    </Group>
                    <ActionIcon
                      onClick={() => removeContributor(index)}
                      sx={{ '&:hover': { background: 'none', color: ExtraRed } }}
                    >
                      <VscTrash />
                    </ActionIcon>
                  </Group>
                ))}
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
            {invalidContributorsCount ? (
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

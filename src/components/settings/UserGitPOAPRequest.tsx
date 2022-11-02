import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Stack, Group, Divider as DividerUI, Popover, Modal, TextProps } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Text, Button } from '../../components/shared/elements';
import { GitPOAPBadge } from '../shared/elements/GitPOAPBadge';
import { Header } from '../shared/elements/Header';
import { Link } from '../shared/compounds/Link';
import { BackgroundPanel2, TextLight, TextGray } from '../../colors';
import { BREAKPOINTS } from '../../constants';
import { useApi } from '../../hooks/useApi';
import { GitPoapRequestsQuery } from '../../graphql/generated-gql';

type ContributorsType = {
  githubHandles?: string[];
  ethAddresses?: string[];
  ensNames?: string[];
  emails?: string[];
};

type GitPOAPRequestRawType = GitPoapRequestsQuery['gitPOAPRequests'][number];

export interface GitPOAPRequestType extends GitPOAPRequestRawType {
  contributors: ContributorsType;
}

type Props = {
  gitPOAPRequest: GitPOAPRequestType;
};

const Value = styled(Text)<TextProps>`
  font-family: VT323;
  line-height: ${rem(24)};
`;

const Label = styled(Text)<TextProps>`
  color: ${TextGray};
  line-height: ${rem(15)};
`;

const Divider = styled(DividerUI)`
  border-top-color: ${BackgroundPanel2};
  width: 100%;

  &:last-child {
    display: none;
  }
`;

const ButtonContainer = styled(Stack)`
  @media (max-width: ${rem(BREAKPOINTS.md)}) {
    flex-direction: revert;
    justify-content: space-around;
    width: 100%;
  }
`;

const generateS3ImageUrl = (imageKey: string): string => {
  return `https://s3.us-east-2.amazonaws.com/${imageKey}`;
};

export const UserGitPOAPRequest = ({ gitPOAPRequest }: Props) => {
  const api = useApi();

  const [isContributorModalOpen, { open: openContributorModal, close: closeContributorModal }] =
    useDisclosure(false);
  const [isImagePopoverOpen, { open: openImagePopover, close: closeImagePopover }] =
    useDisclosure(false);
  const matchesBreakpointSmall = useMediaQuery(`(max-width: ${rem(BREAKPOINTS.sm)})`, false);

  const project = gitPOAPRequest.project?.repos[0];
  const organization = gitPOAPRequest.project?.repos[0]?.organization;

  return (
    <>
      <Group align="center" position="center" spacing="md">
        <Popover
          opened={isImagePopoverOpen}
          onClose={closeImagePopover}
          position="left"
          withArrow
          trapFocus={false}
          closeOnEscape={false}
          transition="pop-top-left"
          styles={{
            dropdown: {
              backgroundColor: BackgroundPanel2,
              borderColor: BackgroundPanel2,
            },
          }}
          radius="lg"
        >
          <Popover.Target>
            <div onMouseEnter={openImagePopover} onMouseLeave={closeImagePopover}>
              {matchesBreakpointSmall ? (
                <GitPOAPBadge
                  imgUrl={generateS3ImageUrl(gitPOAPRequest.imageKey)}
                  altText="preview"
                  size={'md'}
                />
              ) : (
                <GitPOAPBadge
                  imgUrl={generateS3ImageUrl(gitPOAPRequest.imageKey)}
                  altText="preview"
                  size={'sm'}
                />
              )}
            </div>
          </Popover.Target>
          <Popover.Dropdown>
            <Group>
              <GitPOAPBadge
                imgUrl={generateS3ImageUrl(gitPOAPRequest.imageKey)}
                altText="preview"
                size={'lg'}
              />
            </Group>
          </Popover.Dropdown>
        </Popover>
        <Group align="start" spacing="sm">
          <Stack>
            <Group spacing="sm">
              <Label size={12}>{'Name:'}</Label>
              <Value size={20} color={TextLight} weight="normal">
                {gitPOAPRequest.name}
              </Value>
            </Group>
            <Group spacing="sm">
              <Label size={12}>{'Description:'}</Label>
              <Value size={20} color={TextLight} weight="normal">
                {gitPOAPRequest.description}
              </Value>
            </Group>
            <Group spacing="sm">
              <Label size={12}>{'Email:'}</Label>
              <Value size={20} color={TextLight} weight="normal">
                {gitPOAPRequest.email}
              </Value>
            </Group>
            {project && (
              <Group spacing="sm">
                <Label size={12}>{'Project:'}</Label>
                <Link href={`/rp/${project.id}`}>
                  <Value variant="link" size={20} underline={false}>
                    {project.name}
                  </Value>
                </Link>
              </Group>
            )}
            {organization && (
              <Group spacing="sm">
                <Label size={12}>{'Organization:'}</Label>
                <Link href={`/org/${organization.id}`}>
                  <Value variant="link" size={20} underline={false}>
                    {organization.name}
                  </Value>
                </Link>
              </Group>
            )}
          </Stack>
          <Stack>
            <Group spacing="sm">
              <Label size={12}>{'StartedAt:'}</Label>
              <Value size={20} color={TextLight} weight="normal">
                {gitPOAPRequest.startDate}
              </Value>
            </Group>
            <Group spacing="sm">
              <Label size={12}>{'EndAt:'}</Label>
              <Value size={20} color={TextLight} weight="normal">
                {gitPOAPRequest.endDate}
              </Value>
            </Group>
            <Group spacing="sm">
              <Label size={12}>{'ExpiryAt:'}</Label>
              <Value size={20} color={TextLight} weight="normal">
                {gitPOAPRequest.expiryDate}
              </Value>
            </Group>
            <Group spacing="sm">
              <Label size={12}>{'RequestCodes:'}</Label>
              <Value size={20} color={TextLight} weight="normal">
                {gitPOAPRequest.numRequestedCodes}
              </Value>
            </Group>
            <Group spacing="sm">
              <Value variant="link" onClick={openContributorModal} size={20} underline={false}>
                {'Show Contributors'}
              </Value>
              <Modal
                centered
                opened={isContributorModalOpen}
                onClose={closeContributorModal}
                title={<Header size={30}>{'Contributors'}</Header>}
              >
                {gitPOAPRequest.contributors.githubHandles &&
                  gitPOAPRequest.contributors.githubHandles.map((githubHandle) => (
                    <Text key={githubHandle}>{githubHandle}</Text>
                  ))}
                {gitPOAPRequest.contributors.ethAddresses &&
                  gitPOAPRequest.contributors.ethAddresses.map((ethAddress) => (
                    <Text key={ethAddress}>{ethAddress}</Text>
                  ))}
                {gitPOAPRequest.contributors.ensNames &&
                  gitPOAPRequest.contributors.ensNames.map((ensName) => (
                    <Text key={ensName}>{ensName}</Text>
                  ))}
                {gitPOAPRequest.contributors.emails &&
                  gitPOAPRequest.contributors.emails.map((email) => <p key={email}>{email}</p>)}
              </Modal>
            </Group>
          </Stack>
        </Group>
        <ButtonContainer align="center" spacing="md">
          <Button>{'View'}</Button>
          <Button>{'Edit'}</Button>
        </ButtonContainer>
      </Group>
      <Divider />
    </>
  );
};

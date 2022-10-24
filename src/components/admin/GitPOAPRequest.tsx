import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Stack, Group, Divider as DividerUI, Popover, Modal } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useAuthContext } from '../../components/github/AuthContext';
import { Text, Button } from '../../components/shared/elements';
import { GitPOAPBadge } from '../shared/elements/GitPOAPBadge';
import { Header } from '../shared/elements/Header';
import { SubmitButtonRow, ButtonStatus } from './SubmitButtonRow';
import { BackgroundPanel2, TextLight, TextGray, ExtraHover, ExtraRed } from '../../colors';
import { approveGitPOAPRequest, rejectGitPOAPRequest } from '../../lib/gitpoapRequest';
import { ContributorsType } from './GitPOAPRequestList';
import { BREAKPOINTS } from '../../constants';

export type GitPOAPRequestType = {
  __typename?: 'GitPOAPRequest';
  id: number;
  name: string;
  description: string;
  imageKey: string;
  startDate: string;
  endDate: string;
  expiryDate: string;
  numRequestedCodes: number;
  email: string;
  contributors: ContributorsType;
  project?: {
    __typename?: 'Project';
    repos: Array<{
      __typename?: 'Repo';
      id: number;
      name: string;
      organization: { __typename?: 'Organization'; id: number; name: string };
    }>;
  } | null;
};

type Props = {
  gitPOAPRequest: GitPOAPRequestType;
};

const Value = styled(Text)`
  font-family: VT323;
  font-weight: normal;
  color: ${TextLight};
  font-size: ${rem(20)};
  line-height: ${rem(24)};
`;

const Label = styled(Text)`
  font-family: PT Mono, monospace;
  font-style: normal;
  font-weight: normal;
  color: ${TextGray};
  font-size: ${rem(12)};
  line-height: ${rem(15)};
`;

const Link = styled.a`
  font-family: VT323;
  font-weight: normal;
  color: ${TextLight};
  font-size: ${rem(20)};
  line-height: ${rem(24)};
  cursor: pointer;

  &:hover {
    color: ${ExtraHover};
  }
`;

const Divider = styled(DividerUI)`
  border-top-color: ${BackgroundPanel2};
  width: 100%;

  &:last-child {
    display: none;
  }
`;

const HeaderStyled = styled(Header)`
  font-size: ${rem(30)};
  line-height: ${rem(48)};

  @media (max-width: ${BREAKPOINTS.md}px) {
    font-size: ${rem(40)};
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

export const GitPOAPRequest = ({ gitPOAPRequest }: Props) => {
  const { canSeeAdmin, tokens } = useAuthContext();
  const [isContributorModalOpen, { open: openContributorModal, close: closeContributorModal }] =
    useDisclosure(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [approveStatus, setApproveStatus] = useState<ButtonStatus>(ButtonStatus.INITIAL);
  const [rejectStatus, setRejectStatus] = useState<ButtonStatus>(ButtonStatus.INITIAL);
  const matchesBreakpointSmall = useMediaQuery(`(max-width: ${rem(BREAKPOINTS.sm)})`, false);

  const accessToken = tokens?.accessToken ?? '';
  const project = gitPOAPRequest.project?.repos[0];
  const organization = gitPOAPRequest.project?.repos[0]?.organization;

  const submitApproveGitPOAPRequest = useCallback(async () => {
    setApproveStatus(ButtonStatus.LOADING);

    const data = await approveGitPOAPRequest(gitPOAPRequest.id, accessToken);

    if (data === null) {
      setApproveStatus(ButtonStatus.ERROR);
      return;
    }

    setApproveStatus(ButtonStatus.SUCCESS);
  }, [gitPOAPRequest.id, accessToken]);

  const submitRejectGitPOAPRequest = useCallback(async () => {
    setRejectStatus(ButtonStatus.LOADING);

    const data = await rejectGitPOAPRequest(gitPOAPRequest.id, accessToken);

    if (data === null) {
      setRejectStatus(ButtonStatus.ERROR);
      return;
    }

    setRejectStatus(ButtonStatus.SUCCESS);
  }, [gitPOAPRequest.id, accessToken]);

  return (
    <>
      <Group align="center" position="center" spacing="md">
        <Popover
          opened={isPopoverOpen}
          onClose={() => setIsPopoverOpen(false)}
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
            <div
              onMouseEnter={() => setIsPopoverOpen(true)}
              onMouseLeave={() => setIsPopoverOpen(false)}
            >
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
              <Label>{'Name:'}</Label>
              <Value>{gitPOAPRequest.name}</Value>
            </Group>
            <Group spacing="sm">
              <Label>{'Description:'}</Label>
              <Value>{gitPOAPRequest.description}</Value>
            </Group>
            <Group spacing="sm">
              <Label>{'Email:'}</Label>
              <Value>{gitPOAPRequest.email}</Value>
            </Group>
            {project && (
              <Group spacing="sm">
                <Label>{'Project:'}</Label>
                <Link href={`/rp/${project.id}`}>{project.name}</Link>
              </Group>
            )}
            {organization && (
              <Group spacing="sm">
                <Label>{'Organization:'}</Label>
                <Link href={`/org/${organization.id}`}>{organization.name}</Link>
              </Group>
            )}
          </Stack>
          <Stack>
            <Group spacing="sm">
              <Label>{'StartedAt:'}</Label>
              <Value>{gitPOAPRequest.startDate}</Value>
            </Group>
            <Group spacing="sm">
              <Label>{'EndAt:'}</Label>
              <Value>{gitPOAPRequest.endDate}</Value>
            </Group>
            <Group spacing="sm">
              <Label>{'ExpiryAt:'}</Label>
              <Value>{gitPOAPRequest.expiryDate}</Value>
            </Group>
            <Group spacing="sm">
              <Label>{'RequestCodes:'}</Label>
              <Value>{gitPOAPRequest.numRequestedCodes}</Value>
            </Group>
            <Group spacing="sm">
              <Link onClick={openContributorModal}>{'Show Contributors'}</Link>
              <Modal
                centered
                opened={isContributorModalOpen}
                onClose={closeContributorModal}
                title={<HeaderStyled>{'Contributors'}</HeaderStyled>}
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
          <Button
            onClick={submitApproveGitPOAPRequest}
            loading={approveStatus === ButtonStatus.LOADING}
            disabled={
              approveStatus === ButtonStatus.LOADING || rejectStatus === ButtonStatus.LOADING
            }
          >
            {'Approve'}
          </Button>
          <Button
            onClick={submitRejectGitPOAPRequest}
            loading={rejectStatus === ButtonStatus.LOADING}
            disabled={
              approveStatus === ButtonStatus.LOADING || rejectStatus === ButtonStatus.LOADING
            }
          >
            {'Reject'}
          </Button>
        </ButtonContainer>
      </Group>
      <Divider />
    </>
  );
};

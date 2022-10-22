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
    repos: Array<{ __typename?: 'Repo'; id: number; name: string }>;
  } | null;
  organization?: { __typename?: 'Organization'; id: number; name: string } | null;
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

export const GitPOAPRequest = ({ gitPOAPRequest }: Props) => {
  const { canSeeAdmin, tokens } = useAuthContext();
  const [opened, { open, close }] = useDisclosure(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [approveStatus, setApproveStatus] = useState<ButtonStatus>(ButtonStatus.INITIAL);
  const [rejectStatus, setRejectStatus] = useState<ButtonStatus>(ButtonStatus.INITIAL);
  const matchesBreakpointSmall = useMediaQuery(`(max-width: ${rem(BREAKPOINTS.sm)})`, false);

  const accessToken = tokens?.accessToken ?? '';

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
                  imgUrl={
                    'https://assets.poap.xyz/geos-second-foundation-drop-party-2021-logo-1633391228062.png'
                  }
                  altText="preview"
                  size={'md'}
                />
              ) : (
                <GitPOAPBadge
                  imgUrl={
                    'https://assets.poap.xyz/geos-second-foundation-drop-party-2021-logo-1633391228062.png'
                  }
                  altText="preview"
                  size={'sm'}
                />
              )}
            </div>
          </Popover.Target>
          <Popover.Dropdown>
            <div style={{ display: 'flex' }}>
              <GitPOAPBadge
                imgUrl={
                  'https://assets.poap.xyz/geos-second-foundation-drop-party-2021-logo-1633391228062.png'
                }
                altText="preview"
                size={'lg'}
              />
            </div>
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
            {gitPOAPRequest.project && gitPOAPRequest.project.repos && (
              <Group spacing="sm">
                <Label>{'Project:'}</Label>
                <Link href={`/rp/${gitPOAPRequest.project.repos[0].id}`}>
                  {gitPOAPRequest.project.repos[0].name}
                </Link>
              </Group>
            )}
            {gitPOAPRequest.organization && (
              <Group spacing="sm">
                <Label>{'Organization:'}</Label>
                <Link href={`/org/${gitPOAPRequest.organization.id}`}>
                  {gitPOAPRequest.organization.name}
                </Link>
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
              <Link onClick={open}>{'Show Contributors'}</Link>
              <Modal
                centered
                opened={opened}
                onClose={close}
                title={<HeaderStyled>{'Contributors'}</HeaderStyled>}
              >
                {gitPOAPRequest.contributors.githubHandles &&
                  gitPOAPRequest.contributors.githubHandles.map((githubHandle) => (
                    <p key={githubHandle}>{githubHandle}</p>
                  ))}
                {gitPOAPRequest.contributors.ethAddresses &&
                  gitPOAPRequest.contributors.ethAddresses.map((ethAddress) => (
                    <p key={ethAddress}>{ethAddress}</p>
                  ))}
                {gitPOAPRequest.contributors.ensNames &&
                  gitPOAPRequest.contributors.ensNames.map((ensName) => (
                    <p key={ensName}>{ensName}</p>
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
            {'Accept'}
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

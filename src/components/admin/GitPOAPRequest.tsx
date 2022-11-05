import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import {
  Stack,
  Group,
  Divider as DividerUI,
  Popover,
  Modal,
  TextProps,
  Box,
  Badge,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Text, Button } from '../../components/shared/elements';
import { GitPOAPBadge } from '../shared/elements/GitPOAPBadge';
import { Header } from '../shared/elements/Header';
import { Link } from '../shared/compounds/Link';
import { ButtonStatus } from './SubmitButtonRow';
import { BackgroundPanel2, ExtraRedDark, PrimaryBlue, TextGray } from '../../colors';
import { BREAKPOINTS } from '../../constants';
import { useApi } from '../../hooks/useApi';
import { AdminApprovalStatus, GitPoapRequestsQuery } from '../../graphql/generated-gql';
import { getS3URL } from '../../helpers';
import { DateTime } from 'luxon';
import { BsPeopleFill } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';
import { MdError } from 'react-icons/md';

type Props = {
  gitPOAPRequest: GitPOAPRequestType;
};

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

const Value = styled(Text)<TextProps>`
  max-width: ${rem(500)};
`;

const Label = styled(Text)<TextProps>`
  color: ${TextGray};
`;

const Divider = styled(DividerUI)`
  border-top-color: ${BackgroundPanel2};
  width: 100%;

  &:last-child {
    display: none;
  }
`;

const RequestAttribute = ({ label, value }: { label: string; value: string | number }) => {
  return (
    <Group spacing="xs" align="flex-start">
      <Label weight="bold">{label}</Label>
      <Value>{value}</Value>
    </Group>
  );
};

const ButtonIcon = ({ status }: { status: ButtonStatus }) => {
  return status === ButtonStatus.SUCCESS ? (
    <FaCheckCircle size={18} />
  ) : status === ButtonStatus.ERROR ? (
    <MdError size={18} />
  ) : null;
};

const RequestStatusBadge = ({ status }: { status: AdminApprovalStatus }) => {
  return (
    <Badge
      size="sm"
      variant="filled"
      style={{
        backgroundColor: status === AdminApprovalStatus.Rejected ? ExtraRedDark : PrimaryBlue,
      }}
    >
      {status}
    </Badge>
  );
};

export const GitPOAPRequest = ({ gitPOAPRequest }: Props) => {
  const api = useApi();

  const [isContributorModalOpen, { open: openContributorModal, close: closeContributorModal }] =
    useDisclosure(false);
  const [isImagePopoverOpen, { open: openImagePopover, close: closeImagePopover }] =
    useDisclosure(false);
  const [approveStatus, setApproveStatus] = useState<ButtonStatus>(ButtonStatus.INITIAL);
  const [rejectStatus, setRejectStatus] = useState<ButtonStatus>(ButtonStatus.INITIAL);
  const matchesBreakpointSmall = useMediaQuery(`(max-width: ${rem(BREAKPOINTS.sm)})`, false);

  const project = gitPOAPRequest.project?.repos[0];
  const organization = gitPOAPRequest.project?.repos[0]?.organization;

  const contributors = gitPOAPRequest.contributors;
  const githubHandles = contributors.githubHandles;
  const ethAddresses = contributors.ethAddresses;
  const ensNames = contributors.ensNames;
  const emails = contributors.emails;

  const areButtonsDisabled =
    approveStatus === ButtonStatus.LOADING ||
    rejectStatus === ButtonStatus.LOADING ||
    approveStatus === ButtonStatus.SUCCESS ||
    rejectStatus === ButtonStatus.SUCCESS;

  const submitApproveGitPOAPRequest = useCallback(async () => {
    setApproveStatus(ButtonStatus.LOADING);

    const data = await api.gitPOAPRequest.approve(gitPOAPRequest.id);

    if (data === null) {
      setApproveStatus(ButtonStatus.ERROR);
      return;
    }

    setApproveStatus(ButtonStatus.SUCCESS);
  }, [gitPOAPRequest.id, api.gitPOAPRequest]);

  const submitRejectGitPOAPRequest = useCallback(async () => {
    setRejectStatus(ButtonStatus.LOADING);

    const data = await api.gitPOAPRequest.reject(gitPOAPRequest.id);

    if (data === null) {
      setRejectStatus(ButtonStatus.ERROR);
      return;
    }

    setRejectStatus(ButtonStatus.SUCCESS);
  }, [gitPOAPRequest.id, api.gitPOAPRequest]);

  return (
    <>
      <Stack>
        <Group mb={rem(10)} position="left">
          <Text size={12}>{`Request ID: ${gitPOAPRequest.id}`}</Text>
          <RequestStatusBadge status={gitPOAPRequest.adminApprovalStatus} />
        </Group>
        <Group align="center" position="left" spacing="md" mb={rem(20)}>
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
              <Box onMouseEnter={openImagePopover} onMouseLeave={closeImagePopover}>
                {matchesBreakpointSmall ? (
                  <GitPOAPBadge
                    imgUrl={getS3URL('gitpoap-request-images-test', gitPOAPRequest.imageKey)}
                    altText="preview"
                    size={'md'}
                  />
                ) : (
                  <GitPOAPBadge
                    imgUrl={getS3URL('gitpoap-request-images-test', gitPOAPRequest.imageKey)}
                    altText="preview"
                    size={'sm'}
                  />
                )}
              </Box>
            </Popover.Target>
            <Popover.Dropdown>
              <Group>
                <GitPOAPBadge
                  imgUrl={getS3URL('gitpoap-request-images-test', gitPOAPRequest.imageKey)}
                  altText="preview"
                  size={'lg'}
                />
              </Group>
            </Popover.Dropdown>
          </Popover>
          <Group align="start" spacing="sm">
            <Stack spacing="xs">
              <RequestAttribute label="Name:" value={gitPOAPRequest.name} />
              <RequestAttribute label="Description:" value={gitPOAPRequest.description} />
              <RequestAttribute label="Email:" value={gitPOAPRequest.email} />
              {project && (
                <Group spacing="sm">
                  <Label>{'Project:'}</Label>
                  <Link href={`/rp/${project.id}`}>
                    <Value variant="link" underline={false}>
                      {project.name}
                    </Value>
                  </Link>
                </Group>
              )}
              {organization && (
                <Group spacing="sm">
                  <Label>{'Organization:'}</Label>
                  <Link href={`/org/${organization.id}`}>
                    <Value variant="link" underline={false}>
                      {organization.name}
                    </Value>
                  </Link>
                </Group>
              )}
            </Stack>
            <Stack spacing="xs">
              <RequestAttribute
                label="Start Date:"
                value={DateTime.fromISO(gitPOAPRequest.startDate).toFormat('yyyy-MM-dd')}
              />
              <RequestAttribute
                label="End Date:"
                value={DateTime.fromISO(gitPOAPRequest.endDate).toFormat('yyyy-MM-dd')}
              />
              <RequestAttribute
                label="Expiry Date:"
                value={DateTime.fromISO(gitPOAPRequest.expiryDate).toFormat('yyyy-MM-dd')}
              />
              <RequestAttribute label="Request Codes:" value={gitPOAPRequest.numRequestedCodes} />

              <Group spacing="sm">
                <Button onClick={openContributorModal} leftIcon={<BsPeopleFill />}>
                  {'Contributors'}
                </Button>
                <Modal
                  centered
                  opened={isContributorModalOpen}
                  onClose={closeContributorModal}
                  title={<Header style={{ fontSize: rem(30) }}>{'Contributors'}</Header>}
                >
                  <Text weight="bold">{'GitHub Handles:'}</Text>
                  {githubHandles?.map((githubHandle) => (
                    <Text key={githubHandle}>{githubHandle}</Text>
                  ))}

                  <Text weight="bold" mt={rem(16)}>
                    {'ETH Addresses:'}
                  </Text>
                  {ethAddresses?.map((ethAddress) => (
                    <Text key={ethAddress}>{ethAddress}</Text>
                  ))}

                  <Text weight="bold" mt={rem(16)}>
                    {'ENS Names:'}
                  </Text>
                  {ensNames?.map((ensName) => (
                    <Text key={ensName}>{ensName}</Text>
                  ))}

                  <Text weight="bold" mt={rem(16)}>
                    {'Emails:'}
                  </Text>
                  {emails?.map((email) => (
                    <Text key={email}>{email}</Text>
                  ))}
                </Modal>
              </Group>
            </Stack>
          </Group>
        </Group>
        <Group align="center" spacing="md" mb={rem(20)}>
          <Button
            onClick={submitApproveGitPOAPRequest}
            loading={approveStatus === ButtonStatus.LOADING}
            disabled={areButtonsDisabled}
            leftIcon={<ButtonIcon status={approveStatus} />}
          >
            {'Approve'}
          </Button>
          <Button
            variant="outline"
            onClick={submitRejectGitPOAPRequest}
            loading={rejectStatus === ButtonStatus.LOADING}
            disabled={areButtonsDisabled}
            leftIcon={<ButtonIcon status={rejectStatus} />}
          >
            {'Reject'}
          </Button>
        </Group>
      </Stack>
      <Divider />
    </>
  );
};

import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Stack, Group, Divider as DividerUI } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Text } from '../../shared/elements';
import { StatusButton } from '../../shared/compounds/StatusButton';
import { ButtonStatus } from '../SubmitButtonRow';
import { BackgroundPanel2 } from '../../../colors';
import { useApi } from '../../../hooks/useApi';
import { RequestStatusBadge } from '../../request/RequestItem/RequestStatusBadge';
import { GitPOAPBadgePopover } from '../../request/RequestItem/GitPOAPBadgePopover';
import { GitPOAPRequestType, RequestData } from '../../request/RequestItem/RequestData';

type Props = {
  gitPOAPRequest: GitPOAPRequestType;
};

const Divider = styled(DividerUI)`
  border-top-color: ${BackgroundPanel2};
  width: 100%;

  &:last-child {
    display: none;
  }
`;

export const AdminGitPOAPRequest = ({ gitPOAPRequest }: Props) => {
  const api = useApi();

  const [isContributorModalOpen, { open: openContributorModal, close: closeContributorModal }] =
    useDisclosure(false);
  const [isImagePopoverOpen, { open: openImagePopover, close: closeImagePopover }] =
    useDisclosure(false);
  const [approveStatus, setApproveStatus] = useState<ButtonStatus>(ButtonStatus.INITIAL);
  const [rejectStatus, setRejectStatus] = useState<ButtonStatus>(ButtonStatus.INITIAL);

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
          <GitPOAPBadgePopover
            isOpen={isImagePopoverOpen}
            onClose={closeImagePopover}
            onOpen={openImagePopover}
            imageUrl={gitPOAPRequest.imageUrl}
          />
          <RequestData
            gitPOAPRequest={gitPOAPRequest}
            openContributorModal={openContributorModal}
            isContributorModalOpen={isContributorModalOpen}
            closeContributorModal={closeContributorModal}
          />
        </Group>
        <Group align="center" spacing="md" mb={rem(20)}>
          {['PENDING', 'REJECTED'].includes(gitPOAPRequest.adminApprovalStatus) && (
            <StatusButton
              status={approveStatus}
              onClick={submitApproveGitPOAPRequest}
              isDisabled={areButtonsDisabled}
            >
              {'Approve'}
            </StatusButton>
          )}

          {gitPOAPRequest.adminApprovalStatus === 'PENDING' && (
            <StatusButton
              status={rejectStatus}
              onClick={submitRejectGitPOAPRequest}
              isDisabled={areButtonsDisabled}
              variant="outline"
            >
              {'Reject'}
            </StatusButton>
          )}
        </Group>
      </Stack>
      <Divider />
    </>
  );
};

import { Group, Text, Modal, ActionIcon } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { rem } from 'polished';
import React from 'react';
import { FiLink } from 'react-icons/fi';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { GitPoapRequestsQuery } from '../../../../graphql/generated-gql';
import { useClipboardWithNotification } from '../../../../hooks/useClipboardWithNotification';
import { RequestStatusBadge } from '../../../request/RequestItem/RequestStatusBadge';
import { GitPOAPRequestModalContent } from './DetailsContent';

type ModalProps = {
  gitPOAPRequest: Exclude<GitPoapRequestsQuery['gitPOAPRequests'], undefined | null>[number];
  opened: boolean;
  onClose: () => void;
  nextActiveGitPOAPRequest: () => void;
  prevActiveGitPOAPRequest: () => void;
  setApproveGitPOAPRequest: (id: number | null) => void;
  setRejectGitPOAPRequest: (id: number | null) => void;
};

export const GitPOAPRequestModal = ({
  gitPOAPRequest,
  opened,
  onClose,
  nextActiveGitPOAPRequest,
  prevActiveGitPOAPRequest,
  setApproveGitPOAPRequest,
  setRejectGitPOAPRequest,
}: ModalProps) => {
  const { id, staffApprovalStatus } = gitPOAPRequest;
  const matches420 = useMediaQuery(`(max-width: ${rem(420)})`, false);
  const clipboard = useClipboardWithNotification();

  return (
    <Modal
      centered
      opened={opened}
      onClose={onClose}
      size="auto"
      styles={() => ({
        title: {
          width: '100%',
        },
      })}
      title={
        <Group position="apart">
          <Group>
            <Text>
              {!matches420 ? 'Request ID: ' : ''}
              {id}
            </Text>
            <RequestStatusBadge status={staffApprovalStatus} />
          </Group>
          <Group>
            <ActionIcon onClick={prevActiveGitPOAPRequest}>
              <MdKeyboardArrowLeft />
            </ActionIcon>
            <ActionIcon onClick={nextActiveGitPOAPRequest}>
              <MdKeyboardArrowRight />
            </ActionIcon>
            <ActionIcon
              onClick={() =>
                clipboard.copy(`${window.location.href.split('?')[0]}/${gitPOAPRequest.id}`)
              }
            >
              <FiLink />
            </ActionIcon>
          </Group>
        </Group>
      }
    >
      <GitPOAPRequestModalContent
        gitPOAPRequest={gitPOAPRequest}
        onClickApprove={() => setApproveGitPOAPRequest(id)}
        onClickReject={() => setRejectGitPOAPRequest(id)}
      />
    </Modal>
  );
};

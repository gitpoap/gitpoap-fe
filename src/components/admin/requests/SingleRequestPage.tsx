import React from 'react';
import { ActionIcon, Group, Stack, Text } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import Link from 'next/link';
import { rem } from 'polished';
import { GitPoapRequestQuery } from '../../../graphql/generated-gql';
import { RequestStatusBadge } from '../../request/RequestItem/RequestStatusBadge';
import { GitPOAPRequestApproveModal } from './modals/Approve';
import { GitPOAPRequestRejectModal } from './modals/Reject';
import { GitPOAPRequestModalContent } from './modals/DetailsContent';
import { FiLink } from 'react-icons/fi';
import { useClipboardWithNotification } from '../../../hooks/useClipboardWithNotification';

type ModalProps = {
  gitPOAPRequest: Exclude<GitPoapRequestQuery['gitPOAPRequest'], undefined | null>;
};

export const SingleRequestPage = ({ gitPOAPRequest }: ModalProps) => {
  const { id, staffApprovalStatus } = gitPOAPRequest;

  const clipboard = useClipboardWithNotification();
  const [isApprovalModalOpen, { open: openApprovalModal, close: closeApprovalModal }] =
    useDisclosure(false);
  const [isRejectionModalOpen, { open: openRejectionModal, close: closeRejectionModal }] =
    useDisclosure(false);
  const matches420 = useMediaQuery(`(max-width: ${rem(420)})`, false);

  return (
    <Stack>
      <Group position="apart" align="end">
        <Stack>
          <Link href={`/admin/gitpoap/requests`}>{'< View all requests'}</Link>
          <Group>
            <Text>
              {!matches420 ? 'Request ID: ' : ''}
              {id}
            </Text>
            <RequestStatusBadge status={staffApprovalStatus} />
          </Group>
        </Stack>
        <ActionIcon onClick={() => clipboard.copy(window.location.href)}>
          <FiLink />
        </ActionIcon>
      </Group>
      <GitPOAPRequestModalContent
        gitPOAPRequest={gitPOAPRequest}
        onClickApprove={openApprovalModal}
        onClickReject={openRejectionModal}
      />
      {isApprovalModalOpen && (
        <GitPOAPRequestApproveModal
          gitPOAPRequestId={id}
          onClose={closeApprovalModal}
          onSubmit={() => {
            closeApprovalModal();
            closeRejectionModal();
          }}
        />
      )}
      {isRejectionModalOpen && (
        <GitPOAPRequestRejectModal
          gitPOAPRequestId={id}
          onClose={closeRejectionModal}
          onSubmit={() => {
            closeApprovalModal();
            closeRejectionModal();
          }}
        />
      )}
    </Stack>
  );
};

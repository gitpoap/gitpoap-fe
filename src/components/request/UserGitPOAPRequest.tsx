import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Stack, Group, Divider as DividerUI } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Text, Button } from '../shared/elements';
import { BackgroundPanel2 } from '../../colors';
import { GitPOAPBadgePopover } from './RequestItem/GitPOAPBadgePopover';
import { RequestStatusBadge } from './RequestItem/RequestStatusBadge';
import { GitPOAPRequestType, RequestData } from './RequestItem/RequestData';
import { Link } from '../shared/compounds/Link';

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

export const UserGitPOAPRequest = ({ gitPOAPRequest }: Props) => {
  const [isContributorModalOpen, { open: openContributorModal, close: closeContributorModal }] =
    useDisclosure(false);
  const [isImagePopoverOpen, { open: openImagePopover, close: closeImagePopover }] =
    useDisclosure(false);

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
          <Link href={`/create/${gitPOAPRequest.id}`} passHref>
            <Button>{'View & Edit'}</Button>
          </Link>
        </Group>
      </Stack>
      <Divider />
    </>
  );
};

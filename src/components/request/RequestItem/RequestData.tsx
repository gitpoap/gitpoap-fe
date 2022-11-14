import { Button, Group, Stack } from '@mantine/core';
import { DateTime } from 'luxon';
import { BsPeopleFill } from 'react-icons/bs';
import { GitPoapRequestsQuery } from '../../../graphql/generated-gql';
import { ContributorModal, ContributorsType } from './ContributorModal';
import { RequestAttribute, RequestAttributeLink } from './RequestAttribute';

type GitPOAPRequestRawType = GitPoapRequestsQuery['gitPOAPRequests'][number];

export interface GitPOAPRequestType extends GitPOAPRequestRawType {
  contributors: ContributorsType;
}

type Props = {
  gitPOAPRequest: GitPOAPRequestType;
  openContributorModal: () => void;
  isContributorModalOpen: boolean;
  closeContributorModal: () => void;
};
export const RequestData = ({
  gitPOAPRequest,
  openContributorModal,
  isContributorModalOpen,
  closeContributorModal,
}: Props) => {
  const project = gitPOAPRequest.project?.repos[0];
  const organization = gitPOAPRequest.project?.repos[0]?.organization;

  return (
    <Group align="start" spacing="sm">
      <Stack spacing="xs">
        <RequestAttribute label="Name:" value={gitPOAPRequest.name} />
        <RequestAttribute label="Description:" value={gitPOAPRequest.description} />
        <RequestAttribute label="Email:" value={gitPOAPRequest.creatorEmail.emailAddress} />
        {project && (
          <RequestAttributeLink label="Project:" value={project.name} href={`/rp/${project.id}`} />
        )}
        {organization && (
          <RequestAttributeLink
            label="Organization:"
            value={organization.name}
            href={`/org/${organization.id}`}
          />
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
        <RequestAttribute label="Request Codes:" value={gitPOAPRequest.numRequestedCodes} />

        <Group spacing="sm">
          <Button onClick={openContributorModal} leftIcon={<BsPeopleFill />}>
            {'Contributors'}
          </Button>
          <ContributorModal
            isOpen={isContributorModalOpen}
            onClose={closeContributorModal}
            contributors={gitPOAPRequest.contributors}
          />
        </Group>
      </Stack>
    </Group>
  );
};

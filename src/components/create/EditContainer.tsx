import { Center, Loader, Stack, Text } from '@mantine/core';
import { useGitPoapRequestQuery } from '../../graphql/generated-gql';
import { Link } from '../shared/compounds/Link';
import { Header } from '../shared/elements';
import { convertContributorsObjectToList } from './convertContributorsObjectToList';
import { EditForm } from './EditForm';

function addTimezoneOffset(date: Date) {
  const timezoneOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() + timezoneOffset);
}

type Props = {
  address: string;
  gitPOAPId: number;
};

export const EditContainer = ({ address, gitPOAPId }: Props) => {
  const [result] = useGitPoapRequestQuery({
    variables: {
      gitPOAPRequestId: gitPOAPId,
    },
  });

  if (result.fetching) {
    return (
      <Center mt={44} style={{ width: 400, height: 400 }}>
        <Loader />
      </Center>
    );
  }

  const gitPOAPRequest = result.data?.gitPOAPRequest;

  if (result.error || !gitPOAPRequest) {
    return (
      <Center mt={44} style={{ width: 400, height: 400 }}>
        <Header>Error</Header>
      </Center>
    );
  }

  if (gitPOAPRequest.address.ethAddress !== address) {
    return (
      <Center mt={44} style={{ width: 400, height: 400 }}>
        <Header>Unauthorized</Header>
      </Center>
    );
  }

  if (gitPOAPRequest.adminApprovalStatus === 'APPROVED') {
    return (
      <Center mt={44} style={{ width: 400, height: 400, zIndex: 1 }}>
        <Stack align="center" justify="center">
          <Header align="center">GitPOAP Request has been approved!</Header>
          <Text>
            {'You can edit your contributors '}
            <Link href={`/gp/${gitPOAPRequest.gitPOAPId}/manage`}>{'here'}</Link>
          </Text>
        </Stack>
      </Center>
    );
  }

  return (
    <EditForm
      adminApprovalStatus={gitPOAPRequest.adminApprovalStatus}
      creatorEmail={gitPOAPRequest.creatorEmail.emailAddress}
      initialValues={{
        name: gitPOAPRequest.name,
        description: gitPOAPRequest.description,
        startDate: addTimezoneOffset(new Date(gitPOAPRequest.startDate)),
        endDate: addTimezoneOffset(new Date(gitPOAPRequest.endDate)),
        contributors: convertContributorsObjectToList(gitPOAPRequest.contributors),
        image: null,
      }}
      gitPOAPRequestId={gitPOAPId}
      savedImageUrl={gitPOAPRequest.imageUrl}
    />
  );
};

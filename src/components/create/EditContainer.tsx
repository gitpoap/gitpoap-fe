import { useGitPoapRequestQuery } from '../../graphql/generated-gql';
import { GitPOAPRequestEditValues } from '../../lib/api/gitpoapRequest';
import { EditForm } from './EditForm';

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
    return <div>Loading...</div>;
  }

  const gitPOAPRequest = result.data?.gitPOAPRequest;

  if (result.error || !gitPOAPRequest) {
    return <div>Error</div>;
  }

  if (gitPOAPRequest.address.ethAddress !== address) {
    return <div>Unauthorized</div>;
  }

  const initialValues: GitPOAPRequestEditValues = {
    name: gitPOAPRequest.name,
    description: gitPOAPRequest.description,
    startDate: new Date(gitPOAPRequest.startDate),
    endDate: new Date(gitPOAPRequest.endDate),
    expiryDate: new Date(gitPOAPRequest.expiryDate),
    eventUrl: gitPOAPRequest.eventUrl,
    contributors: gitPOAPRequest.contributors,
  };

  return (
    <EditForm
      adminApprovalStatus={gitPOAPRequest.adminApprovalStatus}
      creatorEmail={gitPOAPRequest.creatorEmail.emailAddress}
      initialValues={initialValues}
      gitPOAPRequestId={gitPOAPId}
      imageUrl={gitPOAPRequest.imageUrl}
    />
  );
};

import { useRouter } from 'next/router';
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
  const router = useRouter();

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

  if (gitPOAPRequest.adminApprovalStatus === 'APPROVED') {
    void router.push(`/gp/${gitPOAPId}/manage`);
    return;
  }

  const initialValues: GitPOAPRequestEditValues = {
    name: gitPOAPRequest.name,
    description: gitPOAPRequest.description,
    startDate: new Date(gitPOAPRequest.startDate),
    endDate: new Date(gitPOAPRequest.endDate),
    contributors: gitPOAPRequest.contributors,
    image: null,
  };

  return (
    <EditForm
      adminApprovalStatus={gitPOAPRequest.adminApprovalStatus}
      creatorEmail={gitPOAPRequest.creatorEmail.emailAddress}
      initialValues={initialValues}
      gitPOAPRequestId={gitPOAPId}
      savedImageUrl={gitPOAPRequest.imageUrl}
    />
  );
};

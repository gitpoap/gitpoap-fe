import { useGitPoapRequestQuery } from '../../graphql/generated-gql';
import { CreationForm } from './CreationForm';

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

  return <CreationForm gitPOAPRequest={gitPOAPRequest} />;
};

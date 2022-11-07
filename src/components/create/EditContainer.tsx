import { useGitPoapRequestQuery } from '../../graphql/generated-gql';
import { CreationForm } from './CreationForm';

type Props = {
  gitPOAPId: number;
};

export const EditContainer = ({ gitPOAPId }: Props) => {
  const [result] = useGitPoapRequestQuery({
    variables: {
      gitPOAPRequestId: gitPOAPId,
    },
  });

  if (result.fetching) {
    return <div>Loading...</div>;
  }

  if (result.error) {
    return <div>Error</div>;
  }

  return <CreationForm gitPOAPRequest={result.data?.gitPOAPRequest} />;
};

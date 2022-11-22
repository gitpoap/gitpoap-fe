import { Button, Center, Stack } from '@mantine/core';
import { rem } from 'polished';
import { useGitPoapEventQuery } from '../../../graphql/generated-gql';
import { useUser } from '../../../hooks/useUser';
import { Link } from '../../shared/compounds/Link';
import { Header, Loader } from '../../shared/elements';
import { ManageGitPOAP } from './ManageGitPOAP';

type Props = {
  gitPOAPId: number;
};

export const ManageGitPOAPContainer = ({ gitPOAPId }: Props) => {
  const user = useUser();
  const [results] = useGitPoapEventQuery({
    variables: {
      id: gitPOAPId,
    },
    requestPolicy: 'cache-and-network',
  });

  const creatorAddress = results.data?.gitPOAPEvent?.gitPOAP.creatorAddress?.ethAddress;
  const isCreator = !!creatorAddress && !!user && creatorAddress === user.address;

  if (results.fetching) {
    return (
      <Center mt={240}>
        <Loader />
      </Center>
    );
  }

  if (!isCreator) {
    return (
      <Center py={0} px={rem(20)} sx={{ width: '100%', height: 600 }}>
        <Stack align="center" justify="center" spacing="xs" style={{ width: '100%' }}>
          <Center>
            <Stack align="center">
              <Header pb={rem(16)}>{'You do not have permission to manage this GitPOAP'}</Header>
              <Link href={`/gp/${gitPOAPId}`}>
                <Button>{'Go Back'}</Button>
              </Link>
            </Stack>
          </Center>
        </Stack>
      </Center>
    );
  }

  return <ManageGitPOAP gitPOAPId={gitPOAPId} />;
};

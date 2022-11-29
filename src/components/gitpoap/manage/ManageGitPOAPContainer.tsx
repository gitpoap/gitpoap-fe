import { Alert, Button, Center, Group, Stack } from '@mantine/core';
import { rem } from 'polished';
import { FiAlertCircle } from 'react-icons/fi';
import { useGitPoapEventQuery } from '../../../graphql/generated-gql';
import { User } from '../../../hooks/useUser';
import { Link } from '../../shared/compounds/Link';
import { Header, Loader } from '../../shared/elements';
import { ManageGitPOAP } from './ManageGitPOAP';

type Props = {
  gitPOAPId: number;
  user: User;
};

export const ManageGitPOAPContainer = ({ gitPOAPId, user }: Props) => {
  const [results] = useGitPoapEventQuery({
    variables: {
      id: gitPOAPId,
    },
    requestPolicy: 'cache-and-network',
  });

  const creatorAddress = results.data?.gitPOAPEvent?.gitPOAP.creatorAddress?.ethAddress;
  const isCreator = !!creatorAddress && creatorAddress === user.address;

  if (results.fetching) {
    return (
      <Center mt={240}>
        <Loader />
      </Center>
    );
  }

  if (!isCreator && !user.permissions.isStaff) {
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

  return (
    <>
      {!isCreator && (
        <Group position="center">
          <Alert color="yellow" icon={<FiAlertCircle />} py={rem(6)}>
            {'Viewing as Staff'}
          </Alert>
        </Group>
      )}
      <ManageGitPOAP gitPOAPId={gitPOAPId} />
    </>
  );
};

import { Stack } from '@mantine/core';
import { CreateAGitPOAP } from './CreateAGitPOAP';
import { TeamGitPOAPs } from './TeamGitPOAPs';

type Props = {
  teamId: number;
};

export const TeamDashboard = ({ teamId }: Props) => {
  return (
    <Stack>
      <CreateAGitPOAP />
      <TeamGitPOAPs teamId={teamId} />
    </Stack>
  );
};

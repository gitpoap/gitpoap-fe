import { Stack } from '@mantine/core';
import { rem } from 'polished';
import { CreateAGitPOAP } from './CreateAGitPOAP';
import { TeamGitPOAPs } from './TeamGitPOAPs';

type Props = {
  teamId: number;
};

export const TeamDashboard = ({ teamId }: Props) => {
  return (
    <Stack pl={rem(32)}>
      <CreateAGitPOAP />
      <TeamGitPOAPs teamId={teamId} />
    </Stack>
  );
};

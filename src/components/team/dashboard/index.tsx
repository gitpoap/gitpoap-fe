import { Stack } from '@mantine/core';
import { rem } from 'polished';
import { CreateAGitPOAP } from './CreateAGitPOAP';
import { TeamGitPOAPs } from './TeamGitPOAPs';

export const TeamDashboard = () => {
  return (
    <Stack pl={rem(32)}>
      <CreateAGitPOAP />
      <TeamGitPOAPs />
    </Stack>
  );
};

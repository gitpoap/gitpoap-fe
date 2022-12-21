import { Stack } from '@mantine/core';
import { rem } from 'polished';
import { CreateAGitPOAP } from './CreateAGitPOAP';
import { TeamGitPOAPRequests } from './TeamGitPOAPRequests';

export const TeamDashboard = () => {
  return (
    <Stack pl={rem(32)}>
      <CreateAGitPOAP />
      <TeamGitPOAPRequests />
    </Stack>
  );
};

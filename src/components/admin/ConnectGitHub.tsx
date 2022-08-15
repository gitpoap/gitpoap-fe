import { Stack } from '@mantine/core';
import { rem } from 'polished';
import { Header } from '../shared/elements';

export const ConnectGitHub = () => {
  return (
    <Stack justify="center" align="center">
      <Header style={{ marginTop: rem(250) }}>{'Please connect your GitHub account'}</Header>
    </Stack>
  );
};

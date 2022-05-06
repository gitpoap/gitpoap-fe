import { Group } from '@mantine/core';
import { rem } from 'polished';
import { Header } from '../shared/elements';

export const ConnectGitHub = () => {
  return (
    <Group direction="column" position="center" align="center" grow>
      <Header style={{ marginTop: rem(250) }}>{'Please connect your GitHub account'}</Header>
    </Group>
  );
};

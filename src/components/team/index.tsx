import { Stack, Tabs } from '@mantine/core';
import { rem } from 'polished';
import styled from 'styled-components';
import { User } from '../../hooks/useUser';
import { Header } from '../shared/elements';
import { TeamDashboard } from './dashboard';
import { TeamGitPOAPRequests } from './dashboard/TeamGitPOAPRequests';
import { TeamSettings } from './settings';

const Panel = styled(Tabs.Panel)`
  overflow: hidden;
  width: 100%;
`;

enum Section {
  Dashboard = 'dashboard',
  Requests = 'requests',
  Members = 'members',
  Settings = 'settings',
}

type Props = {
  teamId: number;
  user: User;
};

export const TeamContainer = ({ teamId, user }: Props) => {
  if (!user) {
    return <div>Not logged in</div>;
  }

  return (
    <Stack m={rem(20)}>
      <Header style={{ alignSelf: 'start' }}>{'Team Name'}</Header>
      <Tabs defaultValue={Section.Dashboard} orientation="vertical" variant="pills">
        <Tabs.List pt={rem(10)}>
          <Tabs.Tab value={Section.Dashboard}>{'Dashboard'}</Tabs.Tab>
          <Tabs.Tab value={Section.Requests}>{'Requests'}</Tabs.Tab>
          <Tabs.Tab value={Section.Members}>{'Members'}</Tabs.Tab>
          <Tabs.Tab value={Section.Settings}>{'Settings'}</Tabs.Tab>
        </Tabs.List>

        <Panel value={Section.Dashboard}>
          <TeamDashboard teamId={teamId} />
        </Panel>

        <Panel value={Section.Requests}>
          <Stack pl={rem(32)}>
            <TeamGitPOAPRequests teamId={teamId} />
          </Stack>
        </Panel>

        <Panel value={Section.Members}>
          <div>Members</div>
        </Panel>

        <Panel value={Section.Settings}>
          <TeamSettings teamId={teamId} />
        </Panel>
      </Tabs>
    </Stack>
  );
};

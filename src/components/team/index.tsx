import { Stack, Tabs } from '@mantine/core';
import { useRouter } from 'next/router';
import { rem } from 'polished';
import styled from 'styled-components';
import { User } from '../../hooks/useUser';
import { Header } from '../shared/elements';
import { TeamDashboard } from './dashboard';

const Panel = styled(Tabs.Panel)`
  overflow: hidden;
  width: 100%;
`;

enum Section {
  Dashboard = 'dashboard',
  Members = 'members',
  Settings = 'settings',
}

type Props = {
  user: User;
};

export const TeamContainer = ({ user }: Props) => {
  const router = useRouter();

  if (!user) {
    return <div>Not logged in</div>;
  }

  return (
    <Stack m={rem(20)}>
      <Header style={{ alignSelf: 'start' }}>{'Team Name'}</Header>
      <Tabs
        defaultValue={Section.Dashboard}
        orientation="vertical"
        onTabChange={(value) =>
          router.push({ query: { filter: value } }, undefined, { shallow: true })
        }
        value={router.query.filter as string}
        variant="pills"
      >
        <Tabs.List pt={rem(10)}>
          <Tabs.Tab value={Section.Dashboard}>{'Dashboard'}</Tabs.Tab>
          <Tabs.Tab value={Section.Members}>{'Members'}</Tabs.Tab>
          <Tabs.Tab value={Section.Settings}>{'Settings'}</Tabs.Tab>
        </Tabs.List>

        <Panel value={Section.Dashboard}>
          <TeamDashboard />
        </Panel>

        <Panel value={Section.Members}>
          <div>Members</div>
        </Panel>

        <Panel value={Section.Settings}>
          <div>Settings</div>
        </Panel>
      </Tabs>
    </Stack>
  );
};

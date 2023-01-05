import { Button, Menu, Stack, Tabs } from '@mantine/core';
import { useRouter } from 'next/router';
import { rem } from 'polished';
import styled from 'styled-components';
import { User } from '../../hooks/useUser';
import { Header } from '../shared/elements';
import { TeamDashboard } from './dashboard';
import { MembershipList } from './dashboard/Members/MembershipList';
import { TeamGitPOAPRequests } from './dashboard/TeamGitPOAPRequests';
import { TeamSettings } from './settings';
import { TeamLogo } from './settings/TeamLogo';
import { useTeamsContext } from './TeamsContext';

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
  user: User;
};

export const TeamContainer = ({ user }: Props) => {
  const router = useRouter();
  const teams = useTeamsContext();

  if (!user) {
    return <div>Not logged in</div>;
  }

  if (!teams || !teams.teamsData || !teams.teamId) {
    return <div>No Teams</div>;
  }

  const currTeam = teams.teamsData.find((team) => team.id === teams.teamId);

  if (!currTeam) {
    return <div>Team not found</div>;
  }

  return (
    <Stack m={rem(20)}>
      <Menu position="bottom-start">
        <Menu.Target>
          <Button
            px={32}
            py={16}
            leftIcon={<TeamLogo name={currTeam?.name} size={32} imageUrl={currTeam.logoImageUrl} />}
            sx={{
              boxSizing: 'content-box',
              width: 'fit-content',
            }}
            variant="outline"
          >
            <Header style={{ fontSize: rem(32) }}>{currTeam?.name}</Header>
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            icon={<TeamLogo name={currTeam.name} size={32} imageUrl={currTeam.logoImageUrl} />}
            sx={{ pointerEvents: 'none' }}
          >
            {currTeam.name}
          </Menu.Item>
          <Menu.Divider />
          {teams.teamsData.map(
            (team) =>
              team.id !== teams.teamId && (
                <Menu.Item
                  icon={<TeamLogo name={team.name} size={32} imageUrl={team.logoImageUrl} />}
                  key={`team-${team.id}`}
                  onClick={() => teams.setTeamId(team.id)}
                >
                  {team.name}
                </Menu.Item>
              ),
          )}
        </Menu.Dropdown>
      </Menu>
      <Tabs
        defaultValue={Section.Dashboard}
        onTabChange={(value) =>
          router.push({ query: { section: value } }, undefined, { shallow: true })
        }
        value={router.query.section as string}
        orientation="vertical"
        variant="pills"
      >
        <Tabs.List pt={rem(10)}>
          <Tabs.Tab value={Section.Dashboard}>{'Dashboard'}</Tabs.Tab>
          <Tabs.Tab value={Section.Requests}>{'Requests'}</Tabs.Tab>
          <Tabs.Tab value={Section.Members}>{'Members'}</Tabs.Tab>
          <Tabs.Tab value={Section.Settings}>{'Settings'}</Tabs.Tab>
        </Tabs.List>

        <Panel value={Section.Dashboard}>
          <TeamDashboard teamId={teams.teamId} />
        </Panel>

        <Panel value={Section.Requests}>
          <Stack pl={rem(32)}>
            <TeamGitPOAPRequests teamId={teams.teamId} />
          </Stack>
        </Panel>

        <Panel value={Section.Members}>
          <MembershipList teamId={teams.teamId} />
        </Panel>

        <Panel value={Section.Settings}>
          <TeamSettings teamId={teams.teamId} />
        </Panel>
      </Tabs>
    </Stack>
  );
};

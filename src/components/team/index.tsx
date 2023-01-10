import { Center, Group, Menu, Stack, Tabs, Text, UnstyledButton } from '@mantine/core';
import { useRouter } from 'next/router';
import { rem } from 'polished';
import { MdKeyboardArrowDown } from 'react-icons/md';
import styled from 'styled-components';
import { User } from '../../hooks/useUser';
import { Header, Loader } from '../shared/elements';
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

export enum TeamRoutes {
  Dashboard = 'dashboard',
  Requests = 'requests',
  Members = 'members',
  Settings = 'settings',
}

type Props = {
  page: TeamRoutes;
  user: User;
};

export const TeamContainer = ({ page, user }: Props) => {
  const router = useRouter();
  const teams = useTeamsContext();

  if (!user) {
    return <div>Not logged in</div>;
  }

  if (!teams.hasFetchedTeams) {
    return (
      <Center my={240}>
        <Loader />
      </Center>
    );
  }

  if (!teams || !teams.currTeam) {
    return (
      <Center my={240}>
        <Header>No Teams</Header>
      </Center>
    );
  }

  const currTeam = teams.currTeam;

  return (
    <Stack m={rem(20)}>
      <Tabs
        defaultValue={TeamRoutes.Dashboard}
        onTabChange={(value) => router.push(`/app/team/${value}`, undefined, { shallow: true })}
        value={page}
        orientation="vertical"
        variant="pills"
      >
        <Tabs.List pt={rem(10)}>
          <Menu position="bottom-start">
            <Menu.Target>
              <UnstyledButton
                sx={{
                  height: 'auto',
                  width: rem(220),
                }}
                mb={rem(16)}
              >
                <Group spacing={12} noWrap>
                  <TeamLogo
                    name={currTeam.name}
                    size={32}
                    color={currTeam.color}
                    imageUrl={currTeam.logoImageUrl}
                  />
                  <Text
                    sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                    weight="bold"
                  >
                    {currTeam.name}
                  </Text>
                  <MdKeyboardArrowDown size={20} style={{ flex: 'none', marginLeft: 'auto' }} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                icon={
                  <TeamLogo
                    name={currTeam.name}
                    size={32}
                    color={currTeam.color}
                    imageUrl={currTeam.logoImageUrl}
                  />
                }
                sx={{ pointerEvents: 'none' }}
              >
                {currTeam.name}
              </Menu.Item>
              <Menu.Divider />
              {teams.teamsData?.map(
                (team) =>
                  team.id !== currTeam.id && (
                    <Menu.Item
                      icon={
                        <TeamLogo
                          name={team.name}
                          size={32}
                          color={team.color}
                          imageUrl={team.logoImageUrl}
                        />
                      }
                      key={`team-${team.id}`}
                      onClick={() => teams.setTeamId(team.id)}
                    >
                      {team.name}
                    </Menu.Item>
                  ),
              )}
            </Menu.Dropdown>
          </Menu>
          <Tabs.Tab value={TeamRoutes.Dashboard}>{'Dashboard'}</Tabs.Tab>
          <Tabs.Tab value={TeamRoutes.Requests}>{'Requests'}</Tabs.Tab>
          <Tabs.Tab value={TeamRoutes.Members}>{'Members'}</Tabs.Tab>
          <Tabs.Tab value={TeamRoutes.Settings}>{'Settings'}</Tabs.Tab>
        </Tabs.List>

        <Panel value={TeamRoutes.Dashboard}>
          <TeamDashboard teamId={currTeam.id} />
        </Panel>

        <Panel value={TeamRoutes.Requests}>
          <Stack pl={rem(32)}>
            <TeamGitPOAPRequests teamId={currTeam.id} />
          </Stack>
        </Panel>

        <Panel value={TeamRoutes.Members}>
          <MembershipList teamId={currTeam.id} />
        </Panel>

        <Panel value={TeamRoutes.Settings}>
          <TeamSettings teamData={currTeam} />
        </Panel>
      </Tabs>
    </Stack>
  );
};

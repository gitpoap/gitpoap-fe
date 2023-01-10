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

  if (!teams.hasFetchedTeams) {
    return (
      <Center my={240}>
        <Loader />
      </Center>
    );
  }

  if (!teams || !teams.teamsData || !teams.teamId) {
    return (
      <Center my={240}>
        <Header>No Teams</Header>
      </Center>
    );
  }

  const currTeam = teams.teamsData.find((team) => team.id === teams.teamId);

  // This should never happen, but just in case
  if (!currTeam) {
    return (
      <Center my={240}>
        <Stack align="center">
          <Header>An Issue Occured</Header>
          <Header>Contact Support</Header>
        </Stack>
      </Center>
    );
  }

  return (
    <Stack m={rem(20)}>
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
                    name={currTeam?.name}
                    size={32}
                    color={currTeam.color}
                    imageUrl={currTeam.logoImageUrl}
                  />
                  <Text
                    sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                    weight="bold"
                  >
                    {currTeam?.name}
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
              {teams.teamsData.map(
                (team) =>
                  team.id !== teams.teamId && (
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
          <TeamSettings teamData={currTeam} />
        </Panel>
      </Tabs>
    </Stack>
  );
};

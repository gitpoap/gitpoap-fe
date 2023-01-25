import { Button, ButtonProps, Center, Group, Menu, Text } from '@mantine/core';
import { rem } from 'polished';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { Header, Loader } from '../shared/elements';
import { TeamLogo } from './settings/TeamLogo';
import { useTeamsContext } from './TeamsContext';

export const TeamSwitcher = (props: ButtonProps) => {
  const teams = useTeamsContext();

  if (!teams.hasFetchedTeams) {
    return (
      <Center
        sx={{
          width: rem(220),
        }}
      >
        <Loader />
      </Center>
    );
  }

  if (!teams || !teams.currTeam) {
    return (
      <Center
        sx={{
          width: rem(220),
        }}
      >
        <Header>No Teams</Header>
      </Center>
    );
  }

  const currTeam = teams.currTeam;

  return (
    <Menu position="bottom-start">
      <Menu.Target>
        <Button mb={rem(16)} p={rem(4)} variant="subtle" {...props}>
          <Group spacing={12} position="apart" noWrap sx={{ width: '100%' }}>
            <Group noWrap>
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
            </Group>
            <MdKeyboardArrowDown size={20} style={{ flex: 'none', marginLeft: 'auto' }} />
          </Group>
        </Button>
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
        {teams.teamsData && teams.teamsData.length > 1 && (
          <>
            <Menu.Divider />
            {teams.teamsData.map(
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
          </>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

import { Button, ButtonProps, Center, Group, Menu, Text } from '@mantine/core';
import { rem } from 'polished';
import { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { CreateTeamModal } from '../profile/CreateTeamModal';
import { Header, Loader } from '../shared/elements';
import { TeamLogo } from './settings/TeamLogo';
import { useTeamsContext } from './TeamsContext';

type Props = ButtonProps & {
  canCreateTeams?: boolean;
  dropdownWidth?: number | 'target';
};

export const TeamSwitcher = ({
  canCreateTeams = false,
  dropdownWidth: popoverWidth,
  sx,
  styles,
  ...props
}: Props) => {
  const teams = useTeamsContext();
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);

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
    <Menu position="bottom-start" transition="pop" width={popoverWidth}>
      <Menu.Target>
        <Button
          mb={rem(16)}
          p={rem(4)}
          variant="subtle"
          sx={{
            height: 'auto',
            ...sx,
          }}
          styles={{
            inner: {
              width: '100%',
            },
            label: {
              width: '100%',
            },
            ...styles,
          }}
          {...props}
        >
          <Group spacing={12} position="apart" noWrap sx={{ width: '100%', maxWidth: '100%' }}>
            <Group noWrap sx={{ overflow: 'hidden' }}>
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
        {canCreateTeams && (
          <Menu.Item onClick={() => setIsCreateTeamModalOpen(true)}>
            <Center>{'+ CREATE TEAM'}</Center>
          </Menu.Item>
        )}
      </Menu.Dropdown>
      {canCreateTeams && (
        <CreateTeamModal
          isOpen={isCreateTeamModalOpen}
          onClose={() => setIsCreateTeamModalOpen(false)}
        />
      )}
    </Menu>
  );
};

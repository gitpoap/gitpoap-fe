import { Center, Grid, NavLink, Stack } from '@mantine/core';
import { rem } from 'polished';
import { Link } from '../shared/compounds/Link';
import { Header } from '../shared/elements';
import { TableLoader } from '../shared/elements/Table';
import { TeamDashboard } from './dashboard';
import { MembershipList } from './dashboard/Members/MembershipList';
import { TeamGitPOAPRequests } from './dashboard/TeamGitPOAPRequests';
import { TeamSettings } from './settings';
import { useTeamsContext } from './TeamsContext';
import { TeamSwitcher } from './TeamSwitcher';

export enum TeamRoutes {
  Dashboard = 'dashboard',
  Requests = 'requests',
  Members = 'members',
  Settings = 'settings',
}

type Props = {
  page: TeamRoutes;
};

export const TeamContainer = ({ page }: Props) => {
  const teams = useTeamsContext();

  if (!teams.hasFetchedTeams) {
    return <TableLoader />;
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
    <Grid p={rem(20)} align="top">
      <Grid.Col span="content">
        <Stack p={0} spacing={6}>
          <TeamSwitcher sx={{ width: rem(220) }} canCreateTeams={true} />
          <Link href={`/app/team/dashboard`} shallow={true}>
            <NavLink label={'Dashboard'} active={page === TeamRoutes.Dashboard} />
          </Link>
          <Link href={`/app/team/requests`} shallow={true}>
            <NavLink label={'Requests'} active={page === TeamRoutes.Requests} />
          </Link>
          <Link href={`/app/team/members`} shallow={true}>
            <NavLink label={'Members'} active={page === TeamRoutes.Members} />
          </Link>
          <Link href={`/app/team/settings`} shallow={true}>
            <NavLink label={'Settings'} active={page === TeamRoutes.Settings} />
          </Link>
        </Stack>
      </Grid.Col>
      <Grid.Col span="auto" pl={20}>
        {
          {
            [TeamRoutes.Dashboard]: <TeamDashboard teamId={currTeam.id} />,
            [TeamRoutes.Requests]: <TeamGitPOAPRequests teamId={currTeam.id} />,
            [TeamRoutes.Members]: <MembershipList teamId={currTeam.id} />,
            [TeamRoutes.Settings]: <TeamSettings teamData={currTeam} />,
          }[page]
        }
      </Grid.Col>
    </Grid>
  );
};

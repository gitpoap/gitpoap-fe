import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { DateTime } from 'luxon';
import Head from 'next/head';
import {
  useClaimsInLastWeekQuery,
  useGitPoaPsAddedInLastWeekQuery,
  useOrgsAddedInLastWeekQuery,
  useProfilesAddedInLastWeekQuery,
  useReposAddedInLastWeekQuery,
} from '../../graphql/generated-gql';
import { Grid } from '@mantine/core';
import { useAuthContext } from '../github/AuthContext';
import { ConnectGitHub } from './ConnectGitHub';
import { Header } from '../shared/elements';

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ItemName = styled.div``;

const ItemValue = styled.div``;

const Dashboard = styled.div`
  max-width: ${rem(500)};
`;

type ItemProps = {
  name: string;
  value?: string | number;
};

const DashboardItem = ({ name, value }: ItemProps) => {
  return (
    <ItemContainer>
      <ItemName>{`${name}: `}</ItemName>
      <ItemValue>{value}</ItemValue>
    </ItemContainer>
  );
};

export const VitalsDashboard = () => {
  const todayMinus7Days = DateTime.local().minus({ days: 7 }).toFormat('yyyy-MM-dd');
  const [claimsResult] = useClaimsInLastWeekQuery({
    variables: { date: todayMinus7Days },
  });
  const [reposResult] = useReposAddedInLastWeekQuery({
    variables: { date: todayMinus7Days },
  });
  const [orgsResult] = useOrgsAddedInLastWeekQuery({ variables: { date: todayMinus7Days } });
  const [gitPOAPsResult] = useGitPoaPsAddedInLastWeekQuery({
    variables: { date: todayMinus7Days },
  });
  const [profilesResult] = useProfilesAddedInLastWeekQuery({
    variables: { date: todayMinus7Days },
  });

  return (
    <>
      <Head>
        <title>{'Vitals | GitPOAP'}</title>
        <meta name="description" content="GitPOAP Admin" />
      </Head>
      <Grid
        justify="center"
        style={{
          flex: 1,
          marginTop: rem(20),
          marginBottom: rem(20),
        }}
      >
        <Grid.Col span={10}>
          <Dashboard>
            <Header>{'Vitals Dashboard'}</Header>
            <DashboardItem name={'Mints (last 7 days)'} value={claimsResult.data?.claims.length} />
            <DashboardItem
              name={'Repos Added (last 7 days)'}
              value={reposResult.data?.repos.length}
            />
            <DashboardItem
              name={'Orgs Added (last 7 days)'}
              value={orgsResult.data?.organizations.length}
            />
            <DashboardItem
              name={'GitPOAPs Added (last 7 days)'}
              value={gitPOAPsResult.data?.gitPOAPS.length}
            />
            <DashboardItem
              name={'Profiles Added (last 7 days)'}
              value={profilesResult.data?.profiles.length}
            />
            <DashboardItem name={'Claim %'} value={'TBD'} />
          </Dashboard>
        </Grid.Col>
      </Grid>
    </>
  );
};

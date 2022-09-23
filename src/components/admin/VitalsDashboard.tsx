import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { DateTime } from 'luxon';
import {
  useClaimsCountQuery,
  useClaimsSinceQuery,
  useCountClaimsWithPullRequestEarnedQuery,
  useGitPoaPsSinceQuery,
  useMintedClaimsCountQuery,
  useUnverifiedClaimsCountQuery,
  useOrgsSinceQuery,
  useProfilesSinceQuery,
  useReposSinceQuery,
  useTotalDistinctUsersWithClaimsQuery,
  useTotalProfilesQuery,
  useTotalProfilesWithGitHubHandleQuery,
  useTotalProfilesHiddenQuery,
  useTotalUsersQuery,
} from '../../graphql/generated-gql';
import useSWR from 'swr';
import { Header, LinkHoverStyles } from '../shared/elements';
import { Box, Group, BoxProps, Stack } from '@mantine/core';
import { Link } from '../shared/compounds/Link';
import { TextLight } from '../../colors';

const ItemContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${rem(4)};
  color: ${TextLight};
`;

const ItemName = styled.div``;

const ItemValue = styled.div``;

const Dashboard = styled.div`
  width: ${rem(500)};
`;

const StyledLink = styled(Link)`
  ${LinkHoverStyles}
  color: ${TextLight};
  text-decoration: none;
`;

const HeaderContainer = styled.div`
  margin-bottom: ${rem(20)};
  margin-top: ${rem(20)};
`;

type ItemProps = BoxProps &
  React.ComponentPropsWithoutRef<'div'> & {
    name: string;
    value?: string | number;
    href?: string;
  };

const fetchWithToken = async (url: string, token: string | null) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};

const DashboardItem = ({ name, value, href, ...restProps }: ItemProps) => {
  return (
    <ItemContainer {...restProps}>
      {href ? (
        <StyledLink href={href} passHref>
          <ItemName>{`${name}: `}</ItemName>
        </StyledLink>
      ) : (
        <ItemName>{`${name}: `}</ItemName>
      )}
      <ItemValue>{value}</ItemValue>
    </ItemContainer>
  );
};

const getPercent = (numerator?: number, denominator?: number) => {
  if (!numerator || !denominator) {
    return '';
  }

  return ((numerator / denominator) * 100).toFixed(2) + '%';
};

const getFormattedDate = (date?: string) =>
  date ? DateTime.fromISO(date).toFormat('dd-LLL-yy HH:mm') : '';

type Props = {
  accessToken: string | null;
};

export const VitalsDashboard = (props: Props) => {
  const todayMinus7Days = DateTime.local().minus({ days: 7 }).toFormat('yyyy-MM-dd');
  const todayMinus30Days = DateTime.local().minus({ days: 30 }).toFormat('yyyy-MM-dd');
  const todayMinus90Days = DateTime.local().minus({ days: 90 }).toFormat('yyyy-MM-dd');
  const today = DateTime.local().toFormat('yyyy-MM-dd');
  const [claimsResult] = useClaimsSinceQuery({
    variables: { date: todayMinus7Days },
  });
  const [dailyClaimsResult] = useClaimsSinceQuery({
    variables: { date: today },
  });
  const [monthlyClaimsResult] = useClaimsSinceQuery({
    variables: { date: todayMinus30Days },
  });
  const [threeMonthClaimsResult] = useClaimsSinceQuery({
    variables: { date: todayMinus90Days },
  });
  const [reposResult] = useReposSinceQuery({
    variables: { date: todayMinus7Days },
  });
  const [orgsResult] = useOrgsSinceQuery({ variables: { date: todayMinus7Days } });
  const [gitPOAPsResult] = useGitPoaPsSinceQuery({
    variables: { date: todayMinus7Days },
  });
  const [profilesResult] = useProfilesSinceQuery({
    variables: { date: todayMinus7Days },
  });

  const [totalProfilesResults] = useTotalProfilesQuery();
  const [totalProfilesGitHubResults] = useTotalProfilesWithGitHubHandleQuery();
  const [totalProfilesHiddenResults] = useTotalProfilesHiddenQuery();
  const [totalClaimsResult] = useClaimsCountQuery();
  const [mintedClaimsResult] = useMintedClaimsCountQuery();
  const [unverifiedClaimsResult] = useUnverifiedClaimsCountQuery();
  const [totalUsersResult] = useTotalUsersQuery();
  const [totalUsersWithClaimsResult] = useTotalDistinctUsersWithClaimsQuery();
  const [totalClaimsWithPullRequestEarnedResult] = useCountClaimsWithPullRequestEarnedQuery();

  const { data: ongoingIssuanceResult } = useSWR<{ lastRun: string }>(
    [`${process.env.NEXT_PUBLIC_GITPOAP_API_URL}/vitals/ongoing-issuance`, props.accessToken],
    fetchWithToken,
  );
  const { data: checkForCodesResult } = useSWR<{ lastRun: string }>(
    [`${process.env.NEXT_PUBLIC_GITPOAP_API_URL}/vitals/check-for-codes`, props.accessToken],
    fetchWithToken,
  );
  const { data: botInstallResults } = useSWR<{ totalInstalls: number }>(
    [`https://bot.gitpoap.io/api/stats/bot-installs`],
    (url) => fetch(url).then((res) => res.json()),
  );

  const totalProfiles = totalProfilesResults?.data?.aggregateProfile?._count?.id;
  const totalProfilesGitHub = totalProfilesGitHubResults?.data?.aggregateProfile?._count?.id;
  const totalProfilesHidden = totalProfilesHiddenResults?.data?.aggregateProfile?._count?.id;
  const totalClaims = totalClaimsResult.data?.aggregateClaim._count?.id;
  const mintedClaims = mintedClaimsResult.data?.aggregateClaim._count?.id;
  const unverifiedClaims = unverifiedClaimsResult.data?.aggregateClaim._count?.id;
  const totalUsers = totalUsersResult.data?.aggregateUser._count?.githubHandle;
  const totalUsersWithClaims = totalUsersWithClaimsResult.data?.claims.length;
  const totalClaimsWithPREarned =
    totalClaimsWithPullRequestEarnedResult.data?.aggregateClaim._count?.id;

  return (
    <Group position="center">
      <Stack>
        <Dashboard>
          <HeaderContainer>
            <Header>{'Vitals Dashboard'}</Header>
          </HeaderContainer>

          {/* Mints Section */}
          <DashboardItem
            name={'Mints (today)'}
            value={dailyClaimsResult.data?.claims.length}
            href={'/admin/gitpoap/claims'}
          />
          <DashboardItem
            name={'Mints (last 7 days)'}
            value={claimsResult.data?.claims.length}
            href={'/admin/gitpoap/claims'}
          />
          <DashboardItem
            name={'Mints (last 30 days)'}
            value={monthlyClaimsResult.data?.claims.length}
            href={'/admin/gitpoap/claims'}
          />
          <DashboardItem
            name={'Mints (last 90 days)'}
            value={threeMonthClaimsResult.data?.claims.length}
            href={'/admin/gitpoap/claims'}
            style={{ marginBottom: rem(15) }}
          />

          {/* Entities Added Section */}
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
            style={{ marginBottom: rem(15) }}
          />

          {/* Claims Stats Section */}
          <DashboardItem
            name={'Total minted claims'}
            value={`${mintedClaims} (${getPercent(mintedClaims, totalClaims)})`}
          />
          <DashboardItem
            name={'Total unminted claims'}
            value={getPercent((totalClaims ?? 0) - (mintedClaims ?? 0), totalClaims)}
          />
          <DashboardItem
            name={'Total unverified claims'}
            value={`${unverifiedClaims} (${getPercent(unverifiedClaims, totalClaims)})`}
          />
          <DashboardItem
            name={'Total claims'}
            value={totalClaims}
            style={{ marginBottom: rem(15) }}
          />
          <DashboardItem
            name={'Claims With PR Earned (%)'}
            value={getPercent(totalClaimsWithPREarned, totalClaims)}
            style={{ marginBottom: rem(15) }}
          />

          {/* Profiles Section */}
          <DashboardItem name={'Total profiles'} value={totalProfiles} />
          <DashboardItem
            name={'Total profiles with GitHub Handle'}
            value={`${totalProfilesGitHub} (${getPercent(totalProfilesGitHub, totalProfiles)})`}
          />
          <DashboardItem
            name={'Total hidden profiles'}
            value={`${totalProfilesHidden} (${getPercent(totalProfilesHidden, totalProfiles)})`}
            style={{ marginBottom: rem(15) }}
          />

          {/* Users Section */}
          <DashboardItem
            name={'Total users with mints'}
            value={`${totalUsersWithClaims} (${getPercent(totalUsersWithClaims, totalUsers)})`}
          />
          <DashboardItem name={'Total users'} value={totalUsers} />

          {/* Last Run Vitals */}
          <DashboardItem
            name={'Ongoing Issuance Last Run'}
            value={getFormattedDate(ongoingIssuanceResult?.lastRun)}
          />
          <DashboardItem
            name={'Check for Codes Last Run'}
            value={getFormattedDate(checkForCodesResult?.lastRun)}
            style={{ marginBottom: rem(15) }}
          />

          {/* Bot Vitals  */}
          <DashboardItem
            name={'GitPOAP Bot Installs'}
            value={botInstallResults?.totalInstalls}
            style={{ marginBottom: rem(15) }}
          />
        </Dashboard>
      </Stack>
    </Group>
  );
};

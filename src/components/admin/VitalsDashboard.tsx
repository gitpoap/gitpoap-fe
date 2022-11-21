import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { DateTime } from 'luxon';
import {
  useTotalGitPoapCountQuery,
  useTotalAnnualGitPoapCountQuery,
  useTotalCustomGitPoapCountQuery,
  useClaimsCountQuery,
  useClaimsWithGithubHandleCountQuery,
  useClaimsWithEmailCountQuery,
  useClaimsWithIssuedAddressCountQuery,
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
  useTotalAddressesQuery,
  useTotalAddressesWithEnsNamesQuery,
  useTotalAddressesWithEnsAvatarsQuery,
  useTotalAddressesWithClaimsQuery,
  useTotalEmailsQuery,
  useTotalEmailsValidatedQuery,
  useTotalEmailsWithClaimsQuery,
} from '../../graphql/generated-gql';
import useSWR from 'swr';
import { Header, LinkHoverStyles } from '../shared/elements';
import { Box, Group, Stack, Text, GroupProps, Tooltip } from '@mantine/core';
import { Link } from '../shared/compounds/Link';
import { TextLight } from '../../colors';
import { useTokens } from '../../hooks/useTokens';
import { useApi } from '../../hooks/useApi';

const Dashboard = styled.div`
  width: ${rem(500)};
`;

const StyledLink = styled(Link)`
  ${LinkHoverStyles}
  color: ${TextLight};
  text-decoration: none;
`;

type ItemProps = GroupProps & {
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
    <Group mb={rem(8)} position="apart" {...restProps}>
      {href ? (
        <StyledLink href={href} passHref>
          <Text size={16} color={TextLight}>{`${name}: `}</Text>
        </StyledLink>
      ) : (
        <Text size={16} color={TextLight}>{`${name}: `}</Text>
      )}
      <Text size={16} color={TextLight}>
        {value}
      </Text>
    </Group>
  );
};

type DashboardItemWithTriggerProps = GroupProps & {
  name: string;
  value: string | number;
};

const DashboardItemWithTrigger = ({ name, value, ...restProps }: DashboardItemWithTriggerProps) => {
  return (
    <Group mb={rem(8)} position="apart" {...restProps}>
      <Tooltip label="Click to run the 'Check for Codes' job" withArrow>
        <Text size={16} variant="link">{`${name}: `}</Text>
      </Tooltip>
      <Text size={16} color={TextLight}>
        {value}
      </Text>
    </Group>
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

export const VitalsDashboard = () => {
  const { tokens } = useTokens();
  const api = useApi();
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
  const [totalGitPOAPsResult] = useTotalGitPoapCountQuery();
  const [totalAnnualGitPOAPsResult] = useTotalAnnualGitPoapCountQuery();
  const [totalCustomGitPOAPsResult] = useTotalCustomGitPoapCountQuery();
  const [totalClaimsResult] = useClaimsCountQuery();
  const [totalClaimsWithGithubHandleResult] = useClaimsWithGithubHandleCountQuery();
  const [totalClaimsWithEmailResult] = useClaimsWithEmailCountQuery();
  const [totalClaimsWithIssuedAddressResult] = useClaimsWithIssuedAddressCountQuery();
  const [mintedClaimsResult] = useMintedClaimsCountQuery();
  const [unverifiedClaimsResult] = useUnverifiedClaimsCountQuery();
  const [totalUsersResult] = useTotalUsersQuery();
  const [totalUsersWithClaimsResult] = useTotalDistinctUsersWithClaimsQuery();
  const [totalClaimsWithPullRequestEarnedResult] = useCountClaimsWithPullRequestEarnedQuery();
  const [totalAddressesResult] = useTotalAddressesQuery();
  const [totalAddressesWithEnsNamesResult] = useTotalAddressesWithEnsNamesQuery();
  const [totalAddressesWithEnsAvatarsResult] = useTotalAddressesWithEnsAvatarsQuery();
  const [totalAddressesWithClaimsResult] = useTotalAddressesWithClaimsQuery();
  const [totalEmailsResult] = useTotalEmailsQuery();
  const [totalEmailsValidatedResult] = useTotalEmailsValidatedQuery();
  const [totalEmailsWithClaimsResult] = useTotalEmailsWithClaimsQuery();

  const { data: ongoingIssuanceResult } = useSWR<{ lastRun: string }>(
    [
      `${process.env.NEXT_PUBLIC_GITPOAP_API_URL}/vitals/ongoing-issuance`,
      tokens?.accessToken ?? null,
    ],
    fetchWithToken,
  );
  const { data: checkForCodesResult } = useSWR<{ lastRun: string }>(
    [
      `${process.env.NEXT_PUBLIC_GITPOAP_API_URL}/vitals/check-for-codes`,
      tokens?.accessToken ?? null,
    ],
    fetchWithToken,
  );
  const { data: botInstallResults } = useSWR<{ totalInstalls: number }>(
    [`https://bot.gitpoap.io/api/stats/bot-installs`],
    (url) => fetch(url).then((res) => res.json()),
  );

  const totalProfiles = totalProfilesResults?.data?.aggregateProfile?._count?.id;
  const totalProfilesGitHub = totalProfilesGitHubResults?.data?.aggregateProfile?._count?.id;
  const totalProfilesHidden = totalProfilesHiddenResults?.data?.aggregateProfile?._count?.id;
  const totalGitPOAPs = totalGitPOAPsResult.data?.aggregateGitPOAP._count?.id;
  const totalAnnualGitPOAPs = totalAnnualGitPOAPsResult.data?.aggregateGitPOAP._count?.id;
  const totalCustomGitPOAPs = totalCustomGitPOAPsResult.data?.aggregateGitPOAP._count?.id;
  const totalClaims = totalClaimsResult.data?.aggregateClaim._count?.id;
  const totalClaimsWithGithubHandle =
    totalClaimsWithGithubHandleResult.data?.aggregateClaim._count?.id;
  const totalClaimsWithEmail = totalClaimsWithEmailResult.data?.aggregateClaim._count?.id;
  const totalClaimsWithIssuedAddress =
    totalClaimsWithIssuedAddressResult.data?.aggregateClaim._count?.id;
  const totalClaimsWithPREarned =
    totalClaimsWithPullRequestEarnedResult.data?.aggregateClaim._count?.id;
  const mintedClaims = mintedClaimsResult.data?.aggregateClaim._count?.id;
  const unmintedClaims = (totalClaims ?? 0) - (mintedClaims ?? 0);
  const unverifiedClaims = unverifiedClaimsResult.data?.aggregateClaim._count?.id;
  const totalUsers = totalUsersResult.data?.aggregateGithubUser._count?.githubHandle;
  const totalUsersWithClaims = totalUsersWithClaimsResult.data?.claims.length;
  const totalAddresses = totalAddressesResult.data?.aggregateAddress._count?.id;
  const totalAddressesWithEnsNames =
    totalAddressesWithEnsNamesResult.data?.aggregateAddress._count?.id;
  const totalAddressesWithEnsAvatars =
    totalAddressesWithEnsAvatarsResult.data?.aggregateAddress._count?.id;
  const totalAddressesWithClaims = totalAddressesWithClaimsResult.data?.claims.length;
  const totalEmails = totalEmailsResult.data?.aggregateEmail._count?.id;
  const totalEmailsValidated = totalEmailsValidatedResult.data?.aggregateEmail?._count?.id;
  const totalEmailsWithClaims = totalEmailsWithClaimsResult.data?.claims.length;

  return (
    <Group position="center">
      <Stack>
        <Dashboard>
          <Box my={rem(20)}>
            <Header>{'Vitals Dashboard'}</Header>
          </Box>

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
            mb={rem(20)}
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
            mb={rem(20)}
          />

          {/* GitPOAP Types Section */}
          <DashboardItem name={'Total GitPOAPs'} value={totalGitPOAPs} />
          <DashboardItem
            name={'Total ANNUAL GitPOAPs'}
            value={`${totalAnnualGitPOAPs ?? ''} (${getPercent(
              totalAnnualGitPOAPs,
              totalGitPOAPs,
            )})`}
          />
          <DashboardItem
            name={'Total CUSTOM GitPOAPs'}
            value={`${totalCustomGitPOAPs ?? ''} (${getPercent(
              totalCustomGitPOAPs,
              totalGitPOAPs,
            )})`}
            mb={rem(20)}
          />

          {/* Claims Stats Section */}
          <DashboardItem
            name={'Total minted claims'}
            value={`${mintedClaims ?? ''} (${getPercent(mintedClaims, totalClaims)})`}
          />
          <DashboardItem
            name={'Total unminted claims'}
            value={`${unmintedClaims} (${getPercent(unmintedClaims, totalClaims)})`}
          />
          <DashboardItem
            name={'Total unverified claims'}
            value={`${unverifiedClaims ?? ''} (${getPercent(unverifiedClaims, totalClaims)})`}
          />
          <DashboardItem name={'Total claims'} value={totalClaims} mb={rem(20)} />
          <DashboardItem
            name={'Claims based on GitHub users'}
            value={`${totalClaimsWithGithubHandle ?? ''} (${getPercent(
              totalClaimsWithGithubHandle,
              totalClaims,
            )})`}
          />
          <DashboardItem
            name={'Claims based on emails'}
            value={`${totalClaimsWithEmail ?? ''} (${getPercent(
              totalClaimsWithEmail,
              totalClaims,
            )})`}
          />
          <DashboardItem
            name={'Claims based on addresses'}
            value={`${totalClaimsWithIssuedAddress ?? ''} (${getPercent(
              totalClaimsWithIssuedAddress,
              totalClaims,
            )})`}
            mb={rem(20)}
          />

          <DashboardItem
            name={'Claims With PR Earned'}
            value={`${totalClaimsWithPREarned ?? ''} (${getPercent(
              totalClaimsWithPREarned,
              totalClaims,
            )})`}
            mb={rem(20)}
          />

          {/* Profiles Section */}
          <DashboardItem name={'Total profiles'} value={totalProfiles} />
          <DashboardItem
            name={'Total profiles with GitHub Handle'}
            value={`${totalProfilesGitHub ?? ''} (${getPercent(
              totalProfilesGitHub,
              totalProfiles,
            )})`}
          />
          <DashboardItem
            name={'Total hidden profiles'}
            value={`${totalProfilesHidden ?? ''} (${getPercent(
              totalProfilesHidden,
              totalProfiles,
            )})`}
            mb={rem(20)}
          />

          {/* Addresses Section */}
          <DashboardItem name={'Total addresses'} value={totalAddresses} />
          <DashboardItem
            name={'Total addresses with ENS names'}
            value={`${totalAddressesWithEnsNames ?? ''} (${getPercent(
              totalAddressesWithEnsNames,
              totalAddresses,
            )})`}
          />
          <DashboardItem
            name={'Total addresses with ENS avatars'}
            value={`${totalAddressesWithEnsAvatars ?? ''} (${getPercent(
              totalAddressesWithEnsAvatars,
              totalAddresses,
            )})`}
          />
          <DashboardItem
            name={'Total issued-to addresses with mints'}
            value={`${totalAddressesWithClaims ?? ''} (${getPercent(
              totalAddressesWithClaims,
              totalAddresses,
            )})`}
            mb={rem(20)}
          />

          {/* GitHub Users Section */}
          <DashboardItem name={'Total emails'} value={totalEmails} />
          <DashboardItem
            name={'Total emails validated'}
            value={`${totalEmailsValidated ?? ''} (${getPercent(
              totalEmailsValidated,
              totalEmails,
            )})`}
          />
          <DashboardItem
            name={'Total emails with mints'}
            value={`${totalEmailsWithClaims ?? ''} (${getPercent(
              totalEmailsWithClaims,
              totalEmails,
            )})`}
            mb={rem(20)}
          />

          {/* Emails Section */}
          <DashboardItem name={'Total GitHub users'} value={totalUsers} />
          <DashboardItem
            name={'Total GitHub users with mints'}
            value={`${totalUsersWithClaims ?? ''} (${getPercent(
              totalUsersWithClaims,
              totalUsers,
            )})`}
            mb={rem(20)}
          />

          {/* Last Run Vitals */}
          <DashboardItem
            name={'Ongoing Issuance Last Run'}
            value={getFormattedDate(ongoingIssuanceResult?.lastRun)}
          />
          <DashboardItemWithTrigger
            name={'Check for Codes Last Run'}
            value={getFormattedDate(checkForCodesResult?.lastRun)}
            onClick={async () => await api.triggers.checkForCodes()}
            mb={rem(20)}
          />

          {/* Bot Vitals  */}
          <DashboardItem
            name={'GitPOAP Bot Installs'}
            value={botInstallResults?.totalInstalls}
            mb={rem(20)}
          />
        </Dashboard>
      </Stack>
    </Group>
  );
};

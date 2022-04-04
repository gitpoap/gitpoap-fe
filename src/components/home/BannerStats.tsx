import React from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import { useQuery, gql } from 'urql';
import { InfoHexMetric } from './InfoHexMetric';
import { GitPOAP } from '../shared/elements/icons/GitPOAP';
import { People } from '../shared/elements/icons/People';
import { Project } from '../shared/elements/icons/Project';
import { ExtraHover, TextAccent } from '../../colors';

export type Stats = {
  value: number;
  unit: string;
  rate: number;
  icon: string;
};

const StatsQuery = gql`
  query GetAllStats {
    totalContributors
    lastMonthContributors
    totalGitPOAPs
    lastMonthGitPOAPs
    totalRepos
    lastMonthRepos
  }
`;

const CustomIconStyled = css`
  path,
  &:hover > path,
  &:active > path {
    fill: ${ExtraHover};
  }
`;

const PeopleIcon = styled(People)`
  ${CustomIconStyled}
`;
const GitPOAPIcon = styled(GitPOAP)`
  ${CustomIconStyled}
`;
const ProjectIcon = styled(Project)`
  ${CustomIconStyled}
`;

const ICONS: Record<string, React.ReactNode> = {
  people: <PeopleIcon style={{ height: rem(70), width: rem(70) }} />,
  gitPOAP: <GitPOAPIcon style={{ height: rem(70), width: rem(70) }} />,
  project: <ProjectIcon style={{ height: rem(70), width: rem(70) }} />,
};

const StatsStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const InfoHexMetricStyled = styled(InfoHexMetric)`
  &:not(:last-child) {
    margin-right: ${rem(30)};
  }
`;

export const BannerStats = () => {
  const [result] = useQuery<{
    totalContributors: number;
    lastMonthContributors: number;
    totalGitPOAPs: number;
    lastMonthGitPOAPs: number;
    totalRepos: number;
    lastMonthRepos: number;
  }>({
    query: StatsQuery,
  });

  if (result.fetching) return null;
  if (result.error) return null;
  if (!result.data) return null;

  const stats: Stats[] = [
    {
      value: result.data.totalContributors,
      unit: 'contributors',
      rate: result.data.lastMonthContributors,
      icon: 'people',
    },
    {
      value: result.data.totalGitPOAPs,
      unit: 'GitPOAPs',
      rate: result.data.lastMonthGitPOAPs,
      icon: 'gitPOAP',
    },
    {
      value: result.data.totalRepos,
      unit: 'projects',
      rate: result.data.lastMonthRepos,
      icon: 'project',
    },
  ];

  return (
    <StatsStyled>
      {stats.map((stat, i) => {
        return (
          <InfoHexMetricStyled
            value={Number(stat.value).toLocaleString()}
            key={stat.unit + '-' + i}
            unit={stat.unit}
            rate={`${stat.rate >= 0 && '+'}${stat.rate} / past month`}
            icon={ICONS[stat.icon]}
          />
        );
      })}
    </StatsStyled>
  );
};

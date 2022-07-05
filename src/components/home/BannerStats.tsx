import React from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import { InfoHexMetric } from './InfoHexMetric';
import { GitPOAP, People, Project, Forked } from '../shared/elements/icons';
import { ExtraHover } from '../../colors';
import { useGetAllStatsQuery } from '../../graphql/generated-gql';

export type Stats = {
  value: number;
  unit: string;
  rate: number;
  icon: string;
  href?: string;
};

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
const RepoIcon = styled(Forked)`
  ${CustomIconStyled}
`;

const ICONS: Record<string, React.ReactNode> = {
  people: <PeopleIcon style={{ height: rem(70), width: rem(70) }} />,
  gitPOAP: <GitPOAPIcon style={{ height: rem(70), width: rem(70) }} />,
  project: <ProjectIcon style={{ height: rem(70), width: rem(70) }} />,
  repo: <RepoIcon style={{ height: rem(70), width: rem(70) }} />,
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
  const [result] = useGetAllStatsQuery();

  if (result.fetching) return null;
  if (result.error) return null;
  if (!result.data) return null;

  const stats: Stats[] = [
    {
      value: result.data.totalContributors,
      unit: 'Contributors',
      rate: result.data.lastMonthContributors,
      icon: 'people',
    },
    {
      value: result.data.totalClaims,
      unit: 'GitPOAPs',
      rate: result.data.lastMonthClaims,
      icon: 'gitPOAP',
    },
    {
      value: result.data.totalRepos,
      unit: 'Repos',
      rate: result.data.lastMonthRepos,
      icon: 'project',
      href: '/repos',
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
            href={stat.href}
          />
        );
      })}
    </StatsStyled>
  );
};

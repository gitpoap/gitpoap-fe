import { graphql } from 'msw';
import { UserPOAPsQueryRes } from '../../components/profile/AllPOAPs';
import { GitPOAPHoldersQueryRes } from '../../components/gitpoap/GitPOAPHolders';
import { GitPOAPEventQueryRes } from '../../components/gitpoap/Header';
import {
  gitPOAPs,
  stats,
  leaderData,
  projectData,
  rawPOAPs,
  mostClaimed,
  gitPOAPHolders,
  gitPOAPEvent,
} from './index';

export const GetAllStatsHandler = graphql.query('GetAllStats', (req, res, ctx) => {
  return res(
    ctx.data({
      totalContributors: stats[0].value,
      lastMonthContributors: stats[0].rate,
      totalGitPOAPs: stats[1].value,
      lastMonthGitPOAPs: stats[1].rate,
      totalRepos: stats[2].value,
      lastMonthRepos: stats[2].rate,
    }),
  );
});

export const MostClaimedGitPoapsHandler = graphql.query('mostClaimedGitPoaps', (req, res, ctx) => {
  return res(
    ctx.data({
      mostClaimedGitPOAPs: mostClaimed,
    }),
  );
});

export const LeadersHandler = graphql.query('leaders', (req, res, ctx) => {
  return res(
    ctx.data({
      mostHonoredContributors: leaderData,
    }),
  );
});

export const RecentProjectsHandler = graphql.query('recentProjects', (req, res, ctx) => {
  return res(
    ctx.data({
      recentlyAddedProjects: projectData,
    }),
  );
});

export const AllPOAPsHandler = graphql.query<UserPOAPsQueryRes>('allPOAPs', (req, res, ctx) => {
  return res(
    ctx.data({
      userPOAPs: {
        totalPOAPs: rawPOAPs.length,
        poaps: rawPOAPs,
      },
    }),
  );
});

export const GitPOAPHoldersHandler = graphql.query<GitPOAPHoldersQueryRes>(
  'gitPOAPHoldersQuery',
  (req, res, ctx) => {
    return res(
      ctx.data({
        totalHolders: gitPOAPHolders.length,
        holders: gitPOAPHolders,
      }),
    );
  },
);

export const GitPOAPEventHandler = graphql.query<GitPOAPEventQueryRes>(
  'gitPOAPEventQuery',
  (req, res, ctx) => {
    return res(ctx.data(gitPOAPEvent));
  },
);

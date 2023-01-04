import { graphql } from 'msw';
import { GitPoapHoldersQuery, AllPoapsQuery, GitPoapEventQuery } from '../../graphql/generated-gql';
import {
  stats,
  leaderData,
  projectData,
  rawPOAPs,
  mostClaimed,
  gitPOAPHolders,
  gitPOAPEvent,
  gitPOAPRequests,
  userMemberships,
  teamMemberships,
} from './index';

export const GetAllStatsHandler = graphql.query('GetAllStats', (req, res, ctx) => {
  return res(
    ctx.data({
      totalContributors: stats[0].value,
      lastMonthContributors: stats[0].rate,
      totalClaims: stats[1].value,
      lastMonthClaims: stats[1].rate,
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

export const AllPOAPsHandler = graphql.query<AllPoapsQuery>('allPOAPs', (req, res, ctx) => {
  return res(
    ctx.data({
      userPOAPs: {
        totalPOAPs: rawPOAPs.length,
        poaps: rawPOAPs,
      },
    }),
  );
});

export const GitPOAPHoldersHandler = graphql.query<GitPoapHoldersQuery>(
  'gitPOAPHoldersQuery',
  (req, res, ctx) => {
    const { gitPOAPId } = req.variables;
    return res(
      ctx.data({
        gitPOAPHolders: {
          totalHolders: gitPOAPId ? gitPOAPHolders.length : 0,
          holders: gitPOAPId ? gitPOAPHolders : [],
        },
      }),
    );
  },
);

export const GitPOAPEventHandler = graphql.query<GitPoapEventQuery>(
  'gitPOAPEventQuery',
  (req, res, ctx) => {
    return res(ctx.data(gitPOAPEvent));
  },
);

export const GitPOAPRequestsHandler = graphql.query('gitPOAPRequests', (req, res, ctx) => {
  return res(
    ctx.data({
      gitPOAPRequests,
    }),
  );
});

export const UserMembershipsHandler = graphql.query('userMemberships', (req, res, ctx) => {
  return res(
    ctx.data({
      userMemberships,
    }),
  );
});

export const TeamMembershipsHandler = graphql.query('teamMemberships', (req, res, ctx) => {
  return res(
    ctx.data({
      teamMemberships,
    }),
  );
});

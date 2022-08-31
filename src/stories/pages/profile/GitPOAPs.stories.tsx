import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GitPOAPs } from '../../../components/profile/GitPOAPs';
import { FeaturedPOAPsProvider } from '../../../components/profile/FeaturedPOAPsContext';
import { graphql } from 'msw';
import { ClaimStatus, GitPoapsQuery } from '../../../graphql/generated-gql';

export default {
  title: 'Profile/GitPOAPs',
  component: GitPOAPs,
} as ComponentMeta<typeof GitPOAPs>;

const Template: ComponentStory<typeof GitPOAPs> = (args) => {
  return (
    <FeaturedPOAPsProvider>
      <GitPOAPs {...args} />
    </FeaturedPOAPsProvider>
  );
};

export const Default = Template.bind({});
Default.args = { address: '0xaE32D159BB3ABFcAdFaBE7aBB461C2AB4805596D' };

const GitPoapEventQueryResponse: GitPoapsQuery = {
  userPOAPs: {
    totalGitPOAPs: 2,
    gitPOAPs: [
      {
        claim: {
          pullRequestEarned: {
            id: 82331,
            repo: {
              name: 'gitpoap-docs',
              organization: {
                name: 'gitpoap',
              },
            },
          },
          gitPOAP: {
            id: 401,
          },
          status: ClaimStatus.Claimed,
          poapTokenId: '5548399',
        },
        event: {
          name: 'GitPOAP: 2022 GitPOAP Contributor',
          image_url:
            'https://assets.poap.xyz/gitpoap-2022-gitpoap-annual-contributor-contributor-2022-logo-1660919139356.png',
          description:
            'You made at least one contribution to the GitPOAP Annual Contributor project in 2022. Your contributions are greatly appreciated!',
        },
        prCount: 1,
      },
      {
        claim: {
          pullRequestEarned: {
            id: 82331,
            repo: {
              name: 'gitpoap-docs',
              organization: {
                name: 'gitpoap',
              },
            },
          },
          gitPOAP: {
            id: 182,
          },
          status: ClaimStatus.Claimed,
          poapTokenId: '5481765',
        },
        event: {
          name: 'GitPOAP: 2022 gitpoap-docs Contributor',
          image_url:
            'https://assets.poap.xyz/gitpoap-2022-gitpoap-docs-contributor-2022-logo-1656525957069.png',
          description:
            'You made at least one contribution to the gitpoap-docs project in 2022. Your contributions are greatly appreciated!',
        },
        prCount: 6,
      },
    ],
  },
};

Default.parameters = {
  msw: {
    handlers: [
      graphql.query('gitPoaps', (req, res, ctx) => res(ctx.data(GitPoapEventQueryResponse))),
    ],
  },
};

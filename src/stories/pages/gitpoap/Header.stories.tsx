import { graphql } from 'msw';
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Header } from '../../../components/gitpoap/Header';
import { GitPoapEventQuery } from '../../../graphql/generated-gql';

export default {
  title: 'GitPOAP/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => {
  return <Header {...args} />;
};

export const Default = Template.bind({});
Default.args = { gitPOAPId: 5 };

const GitPoapEventQueryResponse: GitPoapEventQuery = {
  gitPOAPEvent: {
    gitPOAP: {
      id: 1,
      project: {
        repos: [...Array(100)].map((d, i) => ({
          id: i,
          name: `repo${i}`,
          organization: {
            id: 1,
            name: 'org',
            description: null,
            twitterHandle: null,
            url: null,
          },
        })),
      },
    },
    event: {
      name: '2022 PoolTogether Contributor',
      image_url: '',
      description: 'Event Description',
    },
  },
};

Default.parameters = {
  msw: {
    handlers: [
      graphql.query('gitPoapEvent', (req, res, ctx) => res(ctx.data(GitPoapEventQueryResponse))),
    ],
  },
};

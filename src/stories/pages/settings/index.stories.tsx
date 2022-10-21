import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Layout } from '../../../components/Layout';
import { SettingsPage } from '../../../components/settings/SettingsPage';
import { ProfileProvider } from '../../../components/profile/ProfileContext';
import { graphql, rest } from 'msw';
import { ProfileQuery } from '../../../graphql/generated-gql';
import { Container } from '@mantine/core';

export default {
  title: 'Pages/Settings',
  component: SettingsPage,
} as ComponentMeta<typeof SettingsPage>;

const Template: ComponentStory<typeof SettingsPage> = () => (
  <Layout>
    <ProfileProvider addressOrEns="asdfasdfasdf">
      <Container my={48} size={600} style={{ width: '100%' }}>
        <SettingsPage />
      </Container>
    </ProfileProvider>
  </Layout>
);

const ProfileQueryResponse: ProfileQuery = {
  profileData: {
    address: '0x02738d122e0970aaf8deadf0c6a217a1923e1e99',
    bio: 'Developer!',
    ensAvatarImageUrl: null,
    ensName: 'lamberti.eth',
    githubHandle: 'gitpoapdev',
    id: 7,
    isVisibleOnLeaderboard: true,
    name: 'Aldo Lamberti',
    personalSiteUrl: null,
    twitterHandle: null,
  },
};

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  msw: {
    handlers: [
      graphql.query('profile', (req, res, ctx) => res(ctx.data(ProfileQueryResponse))),
      rest.get('*/email/asdfasdfasdf', (req, res, ctx) => {
        return res(
          ctx.json({
            email: null,
          }),
        );
      }),
      rest.post('*/email', (req, res, ctx) => {
        return res(
          ctx.json({
            msg: 'ADDED',
          }),
        );
      }),
    ],
  },
};

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Layout } from '../../../components/Layout';
import { ProfileSettings } from '../../../components/settings/Profile';

export default {
  title: 'Pages/Settings',
  component: ProfileSettings,
} as ComponentMeta<typeof ProfileSettings>;

const Template: ComponentStory<typeof ProfileSettings> = () => {
  const profileData = {
    address: '0x02738d122e0970aaf8deadf0c6a217a1923e1e99',
    bio: 'I like surfing!!',
    ensAvatarImageUrl: null,
    ensName: 'lamberti.eth',
    githubHandle: null,
    id: 7,
    isVisibleOnLeaderboard: true,
    name: 'Aldo Lamberti',
    personalSiteUrl: null,
    twitterHandle: null,
  };

  return (
    <Layout>
      <ProfileSettings profileData={profileData} refetch={() => {}} />
    </Layout>
  );
};

export const Default = Template.bind({});
Default.args = {};

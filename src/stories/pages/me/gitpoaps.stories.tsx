import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import UserGitPOAPs from '../../../pages/me/gitpoaps';
import { Layout } from '../../../components/Layout';

export default {
  title: 'Pages/Me/GitPOAPs',
  component: UserGitPOAPs,
} as ComponentMeta<typeof UserGitPOAPs>;

const Template: ComponentStory<typeof UserGitPOAPs> = () => {
  return (
    <Layout>
      <UserGitPOAPs />
    </Layout>
  );
};

export const Default = Template.bind({});

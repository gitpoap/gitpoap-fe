import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import GitPOAPRequests from '../../../pages/me/requests';
import { Layout } from '../../../components/Layout';

export default {
  title: 'Pages/Me/Requests',
  component: GitPOAPRequests,
} as ComponentMeta<typeof GitPOAPRequests>;

const Template: ComponentStory<typeof GitPOAPRequests> = () => {
  return (
    <Layout>
      <GitPOAPRequests />
    </Layout>
  );
};

export const Default = Template.bind({});

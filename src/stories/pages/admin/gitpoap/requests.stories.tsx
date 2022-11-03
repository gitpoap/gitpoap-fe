import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import GitPOAPRequestsDashboard from '../../../../pages/admin/gitpoap/requests';
import { Layout } from '../../../../components/Layout';

export default {
  title: 'Pages/Admin/GitPOAP/Requests',
  component: GitPOAPRequestsDashboard,
} as ComponentMeta<typeof GitPOAPRequestsDashboard>;

const Template: ComponentStory<typeof GitPOAPRequestsDashboard> = () => {
  return (
    <Layout>
      <GitPOAPRequestsDashboard />
    </Layout>
  );
};

export const Default = Template.bind({});

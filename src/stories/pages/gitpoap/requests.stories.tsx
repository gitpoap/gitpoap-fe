import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CGRequests from '../../../pages/gitpoaps/requests';
import { Layout } from '../../../components/Layout';

export default {
  title: 'Pages/GitPOAP/Requests',
  component: CGRequests,
} as ComponentMeta<typeof CGRequests>;

const Template: ComponentStory<typeof CGRequests> = () => {
  return (
    <Layout>
      <CGRequests />
    </Layout>
  );
};

export const Default = Template.bind({});

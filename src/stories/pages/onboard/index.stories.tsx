import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Layout } from '../../../components/Layout';
import { OnboardingPage } from '../../../components/onboard';

export default {
  title: 'Pages/Onboard',
  component: OnboardingPage,
} as ComponentMeta<typeof OnboardingPage>;

const Template: ComponentStory<typeof OnboardingPage> = () => {
  return (
    <Layout>
      <OnboardingPage />
    </Layout>
  );
};

export const ConnectGithub = Template.bind({});
ConnectGithub.args = {};

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Container } from '@mantine/core';
import { Layout } from '../../../components/Layout';
import { OnboardingPage } from '../../../components/onboarding';

export default {
  title: 'Pages/Onboarding',
  component: OnboardingPage,
} as ComponentMeta<typeof OnboardingPage>;

const Template: ComponentStory<typeof OnboardingPage> = () => {
  return (
    <Layout>
      <Container size={800} mt="xl" style={{ width: '100%' }}>
        <OnboardingPage />
      </Container>
    </Layout>
  );
};

export const ConnectGithub = Template.bind({});
ConnectGithub.args = {};

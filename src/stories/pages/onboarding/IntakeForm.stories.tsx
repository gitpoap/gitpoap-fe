import React from 'react';
import withMock from 'storybook-addon-mock';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Container } from '@mantine/core';
import { Layout } from '../../../components/Layout';
import { IntakeForm as Component } from '../../../components/onboarding/IntakeForm';
import { ReposResponse } from './data';

export default {
  title: 'Pages/Onboarding',
  component: Component,
  decorators: [withMock],
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = () => {
  return (
    <Layout>
      <Container size={800} mt="xl" style={{ width: '100%' }}>
        <Component accessToken="1234567890" githubHandle="aldolamb" />
      </Container>
    </Layout>
  );
};

export const IntakeForm = Template.bind({});
IntakeForm.args = {};

IntakeForm.parameters = {
  mockData: [
    {
      url: 'http://localhost:3001/onboarding/github/repos',
      method: 'GET',
      status: 200,
      response: ReposResponse,
    },
  ],
};

export const IntakeFormNoRepos = Template.bind({});
IntakeFormNoRepos.args = {};

IntakeFormNoRepos.parameters = {
  mockData: [
    {
      url: 'http://localhost:3001/onboarding/github/repos',
      method: 'GET',
      status: 200,
      response: [],
    },
  ],
};

export const IntakeFormNoAdminRepos = Template.bind({});
IntakeFormNoAdminRepos.args = {};

IntakeFormNoAdminRepos.parameters = {
  mockData: [
    {
      url: 'http://localhost:3001/onboarding/github/repos',
      method: 'GET',
      status: 200,
      response: [ReposResponse[0]],
    },
  ],
};

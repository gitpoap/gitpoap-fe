import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Container } from '@mantine/core';
import { rest } from 'msw';
import { Layout } from '../../../components/Layout';
import { IntakeForm as Component } from '../../../components/onboard/IntakeForm';
import { generateListOfRepos, ReposResponse } from './data';

export default {
  title: 'Pages/Onboard',
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = () => {
  return (
    <Layout>
      <Container size={800}>
        <Component accessToken="1234567890" githubHandle="aldolamb" />
      </Container>
    </Layout>
  );
};

export const IntakeForm = Template.bind({});
IntakeForm.args = {};

IntakeForm.parameters = {
  msw: {
    handlers: [
      rest.get('*/onboarding/github/repos', (req, res, ctx) => {
        return res(ctx.json(ReposResponse));
      }),
      rest.post('*/onboarding/intake-form', (req, res, ctx) => {
        return res(
          ctx.json({
            formData: req.body,
            queueNumber: 22,
            msg: 'Successfully submitted intake form',
          }),
        );
      }),
    ],
  },
};

export const IntakeFormManyRepos = Template.bind({});
IntakeFormManyRepos.args = {};

IntakeFormManyRepos.parameters = {
  msw: {
    handlers: [
      rest.get('*/onboarding/github/repos', (req, res, ctx) => {
        return res(ctx.json(generateListOfRepos(1000)));
      }),
      rest.post('*/onboarding/intake-form', (req, res, ctx) => {
        return res(
          ctx.json({
            formData: req.body,
            queueNumber: 22,
            msg: 'Successfully submitted intake form',
          }),
        );
      }),
    ],
  },
};

export const IntakeFormNoRepos = Template.bind({});
IntakeFormNoRepos.args = {};

IntakeFormNoRepos.parameters = {
  msw: {
    handlers: [
      rest.get('*/onboarding/github/repos', (req, res, ctx) => {
        return res(ctx.json([]));
      }),
    ],
  },
};

export const IntakeFormNoAdminRepos = Template.bind({});
IntakeFormNoAdminRepos.args = {};

IntakeFormNoAdminRepos.parameters = {
  msw: {
    handlers: [
      rest.get('*/onboarding/github/repos', (req, res, ctx) => {
        return res(ctx.json([ReposResponse[0]]));
      }),
    ],
  },
};

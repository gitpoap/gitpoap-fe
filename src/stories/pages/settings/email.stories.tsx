import { Container } from '@mantine/core';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { rest } from 'msw';
import React from 'react';

import { Layout } from '../../../components/Layout';
import { ProfileProvider } from '../../../components/profile/ProfileContext';
import { EmailConnection } from '../../../components/settings/EmailConnection';
import { ONE_DAY_IN_S } from '../../../constants';
import { EmailReturnType } from '../../../hooks/useGetUserEmailAddress';

export default {
  title: 'Pages/Settings/Email',
  component: EmailConnection,
} as ComponentMeta<typeof EmailConnection>;

const Template: ComponentStory<typeof EmailConnection> = ({ ethAddress }) => (
  <Layout>
    <ProfileProvider addressOrEns="asdfasdfasdf">
      <Container my={48} size={600} style={{ width: '100%' }}>
        <EmailConnection ethAddress={ethAddress} />
      </Container>
    </ProfileProvider>
  </Layout>
);

const DefaultQueryResponse: EmailReturnType = {
  id: 1,
  emailAddress: 'test@gitpoap.io',
  isValidated: true,
  tokenExpiresAt: new Date(new Date().getTime() + ONE_DAY_IN_S * 1000),
};

export const Connected = Template.bind({});
Connected.args = { ethAddress: 'connected' };
Connected.parameters = {
  msw: {
    handlers: [
      rest.get('*/email/connected', (req, res, ctx) => {
        return res(
          ctx.json({
            email: { ...DefaultQueryResponse },
          }),
        );
      }),
    ],
  },
};

export const Disconnected = Template.bind({});
Disconnected.args = { ethAddress: 'disconnected' };
Disconnected.parameters = {
  msw: {
    handlers: [
      rest.get('*/email/disconnected', (req, res, ctx) => {
        return res(
          ctx.json({
            email: null,
          }),
        );
      }),
    ],
  },
};

export const Pending = Template.bind({});
Pending.args = { ethAddress: 'pending' };
Pending.parameters = {
  msw: {
    handlers: [
      rest.get('*/email/pending', (req, res, ctx) => {
        return res(
          ctx.json({
            email: { ...DefaultQueryResponse, isValidated: false },
          }),
        );
      }),
    ],
  },
};

export const Expired = Template.bind({});
Expired.args = { ethAddress: 'expired' };
Expired.parameters = {
  msw: {
    handlers: [
      rest.get('*/email/expired', (req, res, ctx) => {
        return res(
          ctx.json({
            email: { ...DefaultQueryResponse, isValidated: false, tokenExpiresAt: new Date() },
          }),
        );
      }),
    ],
  },
};

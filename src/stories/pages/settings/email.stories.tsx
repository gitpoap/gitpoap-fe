import { Container } from '@mantine/core';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { graphql } from 'msw';
import React from 'react';

import { Layout } from '../../../components/Layout';
import { ProfileProvider } from '../../../components/profile/ProfileContext';
import { EmailConnection } from '../../../components/settings/EmailConnection';
import { ONE_DAY_IN_S } from '../../../constants';
import { UserEmailQuery } from '../../../graphql/generated-gql';

export default {
  title: 'Pages/Settings/Email',
  component: EmailConnection,
} as ComponentMeta<typeof EmailConnection>;

const Template: ComponentStory<typeof EmailConnection> = () => (
  <Layout>
    <ProfileProvider addressOrEns="asdfasdfasdf">
      <Container my={48} size={600} style={{ width: '100%' }}>
        <EmailConnection ethAddress="1q2w4r6tyy78ui9i0o" />
      </Container>
    </ProfileProvider>
  </Layout>
);

const DefaultQueryResponse: UserEmailQuery['userEmail'] = {
  id: 1,
  emailAddress: 'test@gitpoap.io',
  isValidated: true,
  tokenExpiresAt: new Date(new Date().getTime() + ONE_DAY_IN_S * 1000),
};

export const Connected = Template.bind({});
Connected.args = {};
Connected.parameters = {
  msw: {
    handlers: [
      graphql.query('userEmail', (req, res, ctx) =>
        res(ctx.data({ userEmail: { ...DefaultQueryResponse } })),
      ),
    ],
  },
};

export const Disconnected = Template.bind({});
Disconnected.args = {};
Disconnected.parameters = {
  msw: {
    handlers: [graphql.query('userEmail', (req, res, ctx) => res(ctx.data({})))],
  },
};

export const Pending = Template.bind({});
Pending.args = {};
Pending.parameters = {
  msw: {
    handlers: [
      graphql.query('userEmail', (req, res, ctx) =>
        res(ctx.data({ userEmail: { ...DefaultQueryResponse, isValidated: false } })),
      ),
    ],
  },
};

export const Expired = Template.bind({});
Expired.args = {};
Expired.parameters = {
  msw: {
    handlers: [
      graphql.query('userEmail', (req, res, ctx) =>
        res(
          ctx.data({
            userEmail: { ...DefaultQueryResponse, isValidated: false, tokenExpiresAt: new Date() },
          }),
        ),
      ),
    ],
  },
};

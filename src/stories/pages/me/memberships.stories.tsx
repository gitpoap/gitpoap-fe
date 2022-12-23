import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { createClient, Provider as URQLProvider } from 'urql';
import UserMemberships from '../../../pages/me/memberships';
import { Layout } from '../../../components/Layout';
import { urqlClientOptions } from '../../../lib/urql';

export default {
  title: 'Pages/Me/Memberships',
  component: UserMemberships,
} as ComponentMeta<typeof UserMemberships>;

const client = createClient(urqlClientOptions);

const Template: ComponentStory<typeof UserMemberships> = () => {
  return (
    <URQLProvider value={client}>
      <Layout>
        <UserMemberships />
      </Layout>
    </URQLProvider>
  );
};

export const Default = Template.bind({});

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import UserMemberships from '../../../pages/me/memberships';
import { Layout } from '../../../components/Layout';

export default {
  title: 'Pages/Me/Memberships',
  component: UserMemberships,
} as ComponentMeta<typeof UserMemberships>;

const Template: ComponentStory<typeof UserMemberships> = () => {
  return (
    <Layout>
      <UserMemberships />
    </Layout>
  );
};

export const Default = Template.bind({});

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { UserMembershipList } from '../../../components/profile/UserMembershipList';

export default {
  title: 'Components/profile/UserMembershipList',
  component: UserMembershipList,
} as ComponentMeta<typeof UserMembershipList>;

const Template: ComponentStory<typeof UserMembershipList> = () => {
  return <UserMembershipList />;
};

export const Default = Template.bind({});

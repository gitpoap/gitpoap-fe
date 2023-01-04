import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MembershipList } from '../../../components/team/dashboard/Members/MembershipList';

export default {
  title: 'Components/team/MembershipList',
  component: MembershipList,
} as ComponentMeta<typeof MembershipList>;

const Template: ComponentStory<typeof MembershipList> = () => {
  return <MembershipList teamId={2} />;
};

export const Default = Template.bind({});

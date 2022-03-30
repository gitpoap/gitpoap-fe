import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { EditProfileModal } from '../../components/profile/EditProfileModal';

export default {
  title: 'Modals/EditProfile',
  component: EditProfileModal,
  argTypes: {},
} as ComponentMeta<typeof EditProfileModal>;

const Template: ComponentStory<typeof EditProfileModal> = (args) => {
  return <EditProfileModal {...args} />;
};

export const SingleClaim = Template.bind({});
SingleClaim.args = { isOpen: true };

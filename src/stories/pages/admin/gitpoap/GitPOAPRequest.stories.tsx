import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AdminGitPOAPRequest } from '../../../../components/admin/requests/AdminGitPOAPRequest';
import { gitPOAPRequests } from '../../../data';

export default {
  title: 'Admin/GitPOAPRequest',
  component: AdminGitPOAPRequest,
} as ComponentMeta<typeof AdminGitPOAPRequest>;

const Template: ComponentStory<typeof AdminGitPOAPRequest> = (args) => {
  return <AdminGitPOAPRequest {...args} />;
};

export const Default = Template.bind({});
Default.args = { gitPOAPRequest: gitPOAPRequests[0] };

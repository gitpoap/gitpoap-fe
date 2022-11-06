import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GitPOAPRequest } from '../../../../components/admin/GitPOAPRequest';
import { gitPOAPRequests } from '../../../data';

export default {
  title: 'Admin/GitPOAPRequest',
  component: GitPOAPRequest,
} as ComponentMeta<typeof GitPOAPRequest>;

const Template: ComponentStory<typeof GitPOAPRequest> = (args) => {
  return <GitPOAPRequest {...args} />;
};

export const Default = Template.bind({});
Default.args = { gitPOAPRequest: gitPOAPRequests[0] };

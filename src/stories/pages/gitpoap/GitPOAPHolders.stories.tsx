import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GitPOAPHolders } from '../../../components/gitpoap/GitPOAPHolders';

export default {
  title: 'GitPOAP/GitPOAPHolders',
  component: GitPOAPHolders,
} as ComponentMeta<typeof GitPOAPHolders>;

const Template: ComponentStory<typeof GitPOAPHolders> = (args) => {
  return <GitPOAPHolders {...args} />;
};

export const Default = Template.bind({});
Default.args = { gitPOAPId: 1 };

export const Empty = Template.bind({});
Empty.args = { gitPOAPId: 0 };

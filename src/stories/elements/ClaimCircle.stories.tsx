import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ClaimCircle } from '../../components/shared/elements/ClaimCircle';

export default {
  title: 'Elements/ClaimCircle',
  component: ClaimCircle,
} as ComponentMeta<typeof ClaimCircle>;

const Template: ComponentStory<typeof ClaimCircle> = (args) => {
  return <ClaimCircle {...args}>{'Exchanges'}</ClaimCircle>;
};

export const Default = Template.bind({});
Default.args = { value: 10 };

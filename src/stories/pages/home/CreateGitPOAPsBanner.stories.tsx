import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CreateGitPOAPsBanner } from '../../../components/home/HomeBanners';

export default {
  title: 'Home/CreateGitPOAPsBanner',
  component: CreateGitPOAPsBanner,
} as ComponentMeta<typeof CreateGitPOAPsBanner>;

const Template: ComponentStory<typeof CreateGitPOAPsBanner> = () => {
  return <CreateGitPOAPsBanner />;
};

export const Default = Template.bind({});

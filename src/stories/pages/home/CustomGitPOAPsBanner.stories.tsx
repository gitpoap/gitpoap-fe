import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CustomGitPOAPsBanner } from '../../../components/home/HomeBanners';

export default {
  title: 'Home/CustomGitPOAPsBanner',
  component: CustomGitPOAPsBanner,
} as ComponentMeta<typeof CustomGitPOAPsBanner>;

const Template: ComponentStory<typeof CustomGitPOAPsBanner> = () => {
  return <CustomGitPOAPsBanner />;
};

export const Default = Template.bind({});

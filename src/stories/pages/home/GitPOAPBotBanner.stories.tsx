import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GitPOAPBotBanner } from '../../../components/home/HomeBanners';

export default {
  title: 'Home/GitPOAPBotBanner',
  component: GitPOAPBotBanner,
} as ComponentMeta<typeof GitPOAPBotBanner>;

const Template: ComponentStory<typeof GitPOAPBotBanner> = () => {
  return <GitPOAPBotBanner />;
};

export const Default = Template.bind({});

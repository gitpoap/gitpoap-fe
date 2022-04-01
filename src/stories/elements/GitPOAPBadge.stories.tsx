import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GitPOAPBadge } from '../../components/shared/elements/GitPOAPBadge';
import badgeImg1 from '../assets/gitPOAPs/badge1.png';

const url = badgeImg1 as unknown as string;

export default {
  title: 'Elements/GitPOAPBadge',
  component: GitPOAPBadge,
  argTypes: {},
} as ComponentMeta<typeof GitPOAPBadge>;

const Template: ComponentStory<typeof GitPOAPBadge> = (args) => {
  return <GitPOAPBadge {...args} />;
};

export const Default = Template.bind({});
Default.args = { imgUrl: url, size: 'md' };

export const DefaultSmall = Template.bind({});
DefaultSmall.args = { imgUrl: url, size: 'sm' };

export const Disabled = Template.bind({});
Disabled.args = { imgUrl: url, size: 'md', disabled: true };

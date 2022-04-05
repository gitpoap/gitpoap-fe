import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { RoundedGitPOAPBadge } from '../../components/shared/elements/RoundedGitPOAPBadge';
import badgeImg1 from '../assets/gitPOAPs/badge1.png';

const url = badgeImg1 as unknown as string;

export default {
  title: 'Elements/RoundedGitPOAPBadge',
  component: RoundedGitPOAPBadge,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
} as ComponentMeta<typeof RoundedGitPOAPBadge>;

const Template: ComponentStory<typeof RoundedGitPOAPBadge> = (args) => {
  return <RoundedGitPOAPBadge {...args} />;
};

export const Default = Template.bind({});
Default.args = { imgUrl: url, size: 'md' };

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box } from '@mantine/core';
import { GitPOAPBadgeRounded } from '../components/shared/elements/GitPOAPBadgeRounded';
import badgeImg1 from './assets/gitPOAPs/badge1.png';
import { rem } from 'polished';

const url = badgeImg1 as unknown as string;

export default {
  title: 'Elements/GitPOAPBadgeRounded',
  component: GitPOAPBadgeRounded,
  argTypes: {},
} as ComponentMeta<typeof GitPOAPBadgeRounded>;

const Template: ComponentStory<typeof GitPOAPBadgeRounded> = (args) => {
  return (
    <Box sx={{ marginTop: rem(30) }}>
      <GitPOAPBadgeRounded {...args} />;
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = { imgUrl: url, size: 'md' };

export const DefaultSmall = Template.bind({});
DefaultSmall.args = { imgUrl: url, size: 'sm' };

export const Disabled = Template.bind({});
Disabled.args = { imgUrl: url, size: 'md', disabled: true };

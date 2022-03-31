import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TwitterShareButton } from '../components/shared/elements/TwitterShareButton';

export default {
  title: 'Elements/TwitterShareButton',
  component: TwitterShareButton,
} as ComponentMeta<typeof TwitterShareButton>;

const Template: ComponentStory<typeof TwitterShareButton> = (args) => {
  return <TwitterShareButton {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  gitPOAPCount: 42,
};

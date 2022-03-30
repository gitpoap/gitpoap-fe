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

export const OnePOAPLink = Template.bind({});
OnePOAPLink.args = {
  hashtags: 'poap,gitpoap',
  label: 'Tweet',
  text: `I was just awarded 1 POAP for contributions I've made to open source!`,
  url: '\n' + [1].map((claimedId) => `https://gitpoap.com/gitpoaps/${claimedId}`).join('\n') + '\n',
};

const claimedIds = [1, 2, 3, 4, 5, 6, 7, 8];
export const MaxPOAPLinks = Template.bind({});
MaxPOAPLinks.args = {
  hashtags: 'poap,gitpoap',
  label: 'Tweet',
  text: `I was just awarded ${claimedIds.length} POAPs for contributions I've made to open source!`,
  url:
    '\n' +
    claimedIds.map((claimedId) => `https://gitpoap.com/gitpoaps/${claimedId}`).join('\n') +
    '\n',
};

export const ProfileLink = Template.bind({});
ProfileLink.args = {
  hashtags: 'poap,gitpoap',
  label: 'Tweet',
  text: `I was just awarded 9001 POAPs for contributions I've made to open source!`,
  url: '\nhttps://gitpoap.com/p/1\n',
};

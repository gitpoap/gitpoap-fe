import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TwitterShareButton } from '../../components/shared/elements/TwitterShareButton';
import { ClaimStatus } from '../../graphql/generated-gql';

export default {
  title: 'Elements/TwitterShareButton',
  component: TwitterShareButton,
} as ComponentMeta<typeof TwitterShareButton>;

const CLAIMS = [
  {
    claim: {
      id: 1,
      status: ClaimStatus.Claimed,
      gitPOAP: { id: 1 },
    },
    event: {
      name: 'test_event1',
      image_url: 'https://test.test.com/1',
      description: 'test_event1_description',
    },
  },
  {
    claim: {
      id: 2,
      status: ClaimStatus.Claimed,
      gitPOAP: { id: 2 },
    },
    event: {
      name: 'test_event2',
      image_url: 'https://test.test.com/2',
      description: 'test_event2_description',
    },
  },
];

const Template: ComponentStory<typeof TwitterShareButton> = (args) => {
  return <TwitterShareButton {...args} />;
};

export const SingleClaim = Template.bind({});
SingleClaim.args = {
  claimedCount: 1,
  address: '0x1234567890123456789012345678901234567890',
  ensName: 'gitpoap.eth',
  claims: [CLAIMS[0]],
};

export const MultipleClaims = Template.bind({});
MultipleClaims.args = {
  claimedCount: 2,
  address: '0x1234567890123456789012345678901234567890',
  ensName: 'gitpoap.eth',
  claims: CLAIMS,
};

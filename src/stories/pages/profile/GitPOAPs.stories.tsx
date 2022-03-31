import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GitPOAPs } from '../../../components/profile/GitPOAPs';
import { FeaturedPOAPsProvider } from '../../../components/profile/FeaturedPOAPsContext';

export default {
  title: 'Profile/GitPOAPs',
  component: GitPOAPs,
} as ComponentMeta<typeof GitPOAPs>;

const Template: ComponentStory<typeof GitPOAPs> = (args) => {
  return (
    <FeaturedPOAPsProvider
      ensName={'peebeejay.eth'}
      profileAddress={'0xaE32D159BB3ABFcAdFaBE7aBB461C2AB4805596D'}
    >
      <GitPOAPs {...args} />
    </FeaturedPOAPsProvider>
  );
};

export const Default = Template.bind({});
Default.args = { address: '0xaE32D159BB3ABFcAdFaBE7aBB461C2AB4805596D' };

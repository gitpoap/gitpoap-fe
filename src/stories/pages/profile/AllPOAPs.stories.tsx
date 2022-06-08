import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AllPOAPs } from '../../../components/profile//AllPOAPs';
import { FeaturedPOAPsProvider } from '../../../components/profile/FeaturedPOAPsContext';

export default {
  title: 'Profile/AllPOAPs',
  component: AllPOAPs,
} as ComponentMeta<typeof AllPOAPs>;

const Template: ComponentStory<typeof AllPOAPs> = (args) => {
  return (
    <FeaturedPOAPsProvider>
      <AllPOAPs {...args} />
    </FeaturedPOAPsProvider>
  );
};

export const Default = Template.bind({});
Default.args = { address: '0xaE32D159BB3ABFcAdFaBE7aBB461C2AB4805596D' };

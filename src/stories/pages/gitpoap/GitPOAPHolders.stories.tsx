import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GitPOAPHolders } from '../../../components/gitpoap/GitPOAPHolders';

export default {
  title: 'GitPOAP/GitPOAPHolders',
  component: GitPOAPHolders,
} as ComponentMeta<typeof GitPOAPHolders>;

const Template: ComponentStory<typeof GitPOAPHolders> = (args) => {
  return (
    <>
      <GitPOAPHolders {...args} />
      <GitPOAPHolders {...args} variant={1} />
      <GitPOAPHolders {...args} variant={2} />
      <GitPOAPHolders {...args} variant={3} />
      <GitPOAPHolders {...args} variant={4} />
      <GitPOAPHolders {...args} variant={5} />
      <GitPOAPHolders {...args} variant={6} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = { gitPOAPId: 5 };

export const HighNumber = Template.bind({});
HighNumber.args = { gitPOAPId: 5, highNumberTest: true, showBorder: true };

export const Empty = Template.bind({});
Empty.args = { gitPOAPId: 0 };

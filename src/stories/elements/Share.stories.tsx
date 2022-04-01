import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Share } from '../../components/shared/elements/Share';

export default {
  title: 'Elements/Share',
  component: Share,
} as ComponentMeta<typeof Share>;

const Template: ComponentStory<typeof Share> = (args) => {
  return <Share {...args} />;
};

export const Default = Template.bind({});
Default.args = { textToCopy: 'gitpoap.io' };

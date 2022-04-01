import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { IconCount } from '../../components/shared/elements/IconCount';
import { GitPOAP } from '../../components/shared/elements/icons/GitPOAP';

export default {
  title: 'Elements/IconCount',
  component: IconCount,
  argTypes: {},
} as ComponentMeta<typeof IconCount>;

const Template: ComponentStory<typeof IconCount> = (args) => {
  return <IconCount {...args} />;
};

export const Default = Template.bind({});
Default.args = { count: 10, icon: <GitPOAP />, href: 'gitpoap.io' };

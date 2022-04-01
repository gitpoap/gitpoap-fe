import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Badge } from '../../components/shared/elements/Badge';

export default {
  title: 'Elements/Badge',
  component: Badge,
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = (args) => {
  return <Badge {...args}>{'Exchanges'}</Badge>;
};

export const Default = Template.bind({});
Default.args = {};

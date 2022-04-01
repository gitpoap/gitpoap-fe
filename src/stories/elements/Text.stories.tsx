import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Text } from '../../components/shared/elements/Text';

export default {
  title: 'Elements/Text',
  component: Text,
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => {
  return <Text {...args}>{'Exchanges'}</Text>;
};

export const Default = Template.bind({});
Default.args = {};

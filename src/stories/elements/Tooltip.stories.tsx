import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Tooltip } from '../../components/shared/elements/Tooltip';
import { Text } from '../../components/shared/elements/Text';

export default {
  title: 'Elements/Tooltip',
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => {
  return (
    <Tooltip {...args}>
      <Text>{'Exchanges'}</Text>
    </Tooltip>
  );
};

export const Default = Template.bind({});
Default.args = { label: 'An exchange is a place where things are exchanged', withArrow: true };

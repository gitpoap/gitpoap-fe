import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CollapsibleAddress } from '../../components/shared/elements/CollapsibleAddress';

export default {
  title: 'Elements/CollapsibleAddress',
  component: CollapsibleAddress,
} as ComponentMeta<typeof CollapsibleAddress>;

const Template: ComponentStory<typeof CollapsibleAddress> = (args) => {
  return <CollapsibleAddress {...args}></CollapsibleAddress>;
};

export const Default = Template.bind({});
Default.args = { address: '0xe4feb387cb1daff4bf9108581b116e5fa737bea2', isCollapsed: true };

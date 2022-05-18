import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Checkbox } from '../../components/shared/elements/Checkbox';

export default {
  title: 'Elements/Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => {
  return <Checkbox {...args} />;
};

export const Primary = Template.bind({});
Primary.args = {};

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };

export const WithLabel = Template.bind({});
WithLabel.args = { label: 'Is Open' };

export const WithLabelDisabled = Template.bind({});
WithLabelDisabled.args = { label: 'Is Open', disabled: true };

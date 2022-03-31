import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '../components/shared/elements/Button';

export default {
  title: 'Elements/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => {
  return <Button {...args} />;
};

export const Primary = Template.bind({});
Primary.args = { children: 'Mint All' };

export const PrimaryDisabled = Template.bind({});
PrimaryDisabled.args = { children: 'Mint All', disabled: true };

export const PrimaryLoading = Template.bind({});
PrimaryLoading.args = { children: 'Mint All', disabled: true, loading: true };

export const Outline = Template.bind({});
Outline.args = { children: 'Mint All', variant: 'outline' };

export const OutlineDisabled = Template.bind({});
OutlineDisabled.args = { children: 'Mint All', variant: 'outline', disabled: true };

export const OutlineLoading = Template.bind({});
OutlineLoading.args = { children: 'Mint All', variant: 'outline', disabled: true, loading: true };

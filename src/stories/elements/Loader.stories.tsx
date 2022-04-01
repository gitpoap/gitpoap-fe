import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Loader } from '../../components/shared/elements/Loader';

export default {
  title: 'Elements/Loader',
  component: Loader,
} as ComponentMeta<typeof Loader>;

const Template: ComponentStory<typeof Loader> = (args) => {
  return <Loader {...args} />;
};

export const Default = Template.bind({});
Default.args = {};

export const LargeLoader = Template.bind({});
LargeLoader.args = { size: 'lg' };

export const Dots = Template.bind({});
Dots.args = { variant: 'dots' };

export const Bars = Template.bind({});
Bars.args = { variant: 'bars' };

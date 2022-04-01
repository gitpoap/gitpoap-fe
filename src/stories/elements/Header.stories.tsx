import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Header } from '../../components/shared/elements/Header';

export default {
  title: 'Elements/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => {
  return <Header {...args}>{'Most claimed POAPs last week'}</Header>;
};

export const Default = Template.bind({});
Default.args = {};

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FaEdge, FaArrowRight } from 'react-icons/fa';
import { MessageBanner } from '../../components/shared/elements/MessageBanner';

export default {
  title: 'Elements/MessageBanner',
  component: MessageBanner,
} as ComponentMeta<typeof MessageBanner>;

const Template: ComponentStory<typeof MessageBanner> = (args) => {
  return <MessageBanner {...args}>{'Exchanges'}</MessageBanner>;
};

export const Default = Template.bind({});
Default.args = {
  title: 'title',
  message: 'message',
  href: '/',
  leftIcon: <FaEdge />,
  rightIcon: <FaArrowRight />,
};

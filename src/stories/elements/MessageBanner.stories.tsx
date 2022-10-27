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
  title: 'GitPOAP Swag at Devcon Bogota',
  message:
    'If you are going to Devcon, register at swag.gitpoap.io to get your personalized GitPOAP swag!',
  href: '/',
  leftIcon: <FaEdge />,
  rightIcon: <FaArrowRight />,
};

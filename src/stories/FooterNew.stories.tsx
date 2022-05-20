import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Footer } from '../components/FooterNew';

export default {
  title: 'Layout/FooterNew',
  component: Footer,
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = () => {
  return <Footer />;
};

export const Default = Template.bind({});
Default.args = {};
